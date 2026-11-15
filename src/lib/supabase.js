const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const sessionKey = 'towers-admin-session'

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

function requireConfig() {
  if (!isSupabaseConfigured) {
    throw new Error('Falta configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el archivo .env.local.')
  }
}

function readStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(sessionKey) || sessionStorage.getItem(sessionKey) || 'null')
  } catch {
    localStorage.removeItem(sessionKey)
    sessionStorage.removeItem(sessionKey)
    return null
  }
}

function storeSession(session, remember = localStorage.getItem(sessionKey) !== null) {
  if (session) {
    const withExpiry = session.expires_at ? session : { ...session, expires_at: Math.floor(Date.now() / 1000) + (session.expires_in || 3600) }
    const storage = remember ? localStorage : sessionStorage
    storage.setItem(sessionKey, JSON.stringify(withExpiry))
    const otherStorage = remember ? sessionStorage : localStorage
    otherStorage.removeItem(sessionKey)
  }
  else {
    localStorage.removeItem(sessionKey)
    sessionStorage.removeItem(sessionKey)
  }
}

async function parseResponse(response) {
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message = body.msg || body.message || body.error_description || body.error || 'No se pudo completar la solicitud.'
    throw new Error(message)
  }
  return body
}

async function authRequest(path, body, accessToken) {
  requireConfig()
  const response = await fetch(`${supabaseUrl}/auth/v1/${path}`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify(body),
  })
  return parseResponse(response)
}

export async function signIn(email, password, remember = true) {
  const session = await authRequest('token?grant_type=password', { email, password })
  storeSession(session, remember)
  let isAdmin
  try {
    isAdmin = await isCampaignAdmin(session.access_token) || await isSiteOwner(session.access_token)
  } catch (error) {
    storeSession(null)
    throw new Error(`No se pudo validar el permiso de administrador. Ejecuta la configuración de Supabase y vuelve a intentar. ${error.message}`, { cause: error })
  }
  if (!isAdmin) {
    storeSession(null)
    throw new Error('Esta cuenta no tiene acceso al panel de campañas. Solicita acceso a un administrador de Towers.')
  }
  return session
}

export async function signOut() {
  const session = readStoredSession()
  try {
    if (session?.access_token && isSupabaseConfigured) {
      await authRequest('logout', {}, session.access_token)
    }
  } finally {
    storeSession(null)
  }
}

export async function getSession() {
  requireConfig()
  const session = readStoredSession()
  if (!session?.refresh_token) return null
  if (session.expires_at && session.expires_at * 1000 > Date.now() + 60_000) {
    if (await isCampaignAdmin(session.access_token) || await isSiteOwner(session.access_token)) return session
    storeSession(null)
    return null
  }

  try {
    const refreshed = await authRequest('token?grant_type=refresh_token', { refresh_token: session.refresh_token })
    storeSession(refreshed)
    if (!await isCampaignAdmin(refreshed.access_token) && !await isSiteOwner(refreshed.access_token)) {
      storeSession(null)
      return null
    }
    return refreshed
  } catch {
    storeSession(null)
    return null
  }
}

async function restRequest(path, { method = 'GET', body, token, prefer, cache } = {}) {
  requireConfig()
  let accessToken = token
  const storedSession = readStoredSession()
  if (storedSession?.refresh_token && (!storedSession.expires_at || storedSession.expires_at * 1000 <= Date.now() + 60_000)) {
    accessToken = (await getSession())?.access_token || accessToken
  }
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    method,
    ...(cache ? { cache } : {}),
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${accessToken || supabaseAnonKey}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(prefer ? { Prefer: prefer } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  return parseResponse(response)
}

export async function isCampaignAdmin(accessToken) {
  const result = await restRequest('rpc/is_campaign_admin', { method: 'POST', body: {}, token: accessToken })
  return result === true
}

export async function isSiteOwner(accessToken) {
  const result = await restRequest('rpc/is_site_owner', { method: 'POST', body: {}, token: accessToken })
  return result === true
}

export async function getHomeContent() {
  const rows = await restRequest('home_content?id=eq.home&select=content', { cache: 'no-store' })
  if (!rows.length) throw new Error('Supabase no devolvió el registro home. Verifica que home-content-admin.sql se ejecutó y que existe la política de lectura pública.')
  return rows[0]?.content || {}
}

export async function saveHomeContent(content, accessToken) {
  const rows = await restRequest('home_content?id=eq.home', {
    method: 'PATCH', body: { content }, token: accessToken, prefer: 'return=representation',
  })
  if (!rows.length) throw new Error('Supabase no confirmó ningún cambio. Verifica que tu cuenta aparezca en site_owners y que se ejecutó home-content-admin.sql.')
  return rows[0].content
}

export async function uploadHomeImage(file, accessToken, onProgress) {
  requireConfig()
  const currentSession = await getSession()
  const token = currentSession?.access_token || accessToken
  const safeName = file.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]/g, '-')
  const path = `${Date.now()}-${crypto.randomUUID()}-${safeName}`
  const url = `${supabaseUrl}/storage/v1/object/site-content/${path.split('/').map(encodeURIComponent).join('/')}`
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('POST', url)
    request.setRequestHeader('apikey', supabaseAnonKey)
    request.setRequestHeader('Authorization', `Bearer ${token}`)
    request.setRequestHeader('Content-Type', file.type)
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100))
    }
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        resolve(`${supabaseUrl}/storage/v1/object/public/site-content/${path.split('/').map(encodeURIComponent).join('/')}`)
      } else {
        try { reject(new Error(JSON.parse(request.responseText).message || 'No se pudo cargar la imagen.')) }
        catch { reject(new Error('No se pudo cargar la imagen.')) }
      }
    }
    request.onerror = () => reject(new Error('Error de conexión durante la carga de la imagen.'))
    request.onabort = () => reject(new Error('La carga de la imagen fue cancelada.'))
    request.send(file)
  })
}

export async function deleteHomeImage(imageUrl, accessToken) {
  if (!imageUrl) return
  const marker = '/storage/v1/object/public/site-content/'
  const index = imageUrl.indexOf(marker)
  if (index < 0) return
  const currentSession = await getSession()
  const token = currentSession?.access_token || accessToken
  const path = imageUrl.slice(index + marker.length).split('/').map(decodeURIComponent).join('/')
  await fetch(`${supabaseUrl}/storage/v1/object/site-content`, {
    method: 'DELETE',
    headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ prefixes: [path] }),
  }).then(parseResponse)
}

export async function listCampaigns(accessToken) {
  return restRequest('campaigns?select=*&order=created_at.desc', { token: accessToken })
}

export async function getCampaignById(id, accessToken) {
  const rows = await restRequest(`campaigns?id=eq.${encodeURIComponent(id)}&select=*`, { token: accessToken })
  return rows[0] || null
}

export async function saveCampaign(campaign, accessToken) {
  const path = campaign.id
    ? `campaigns?id=eq.${encodeURIComponent(campaign.id)}`
    : 'campaigns'
  const rows = await restRequest(path, {
    method: campaign.id ? 'PATCH' : 'POST',
    body: campaign,
    token: accessToken,
    prefer: 'return=representation',
  })
  return rows[0]
}

export async function deleteCampaign(id, accessToken) {
  await restRequest(`campaigns?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    token: accessToken,
  })
}

export async function getPublishedCampaign(slug) {
  const query = new URLSearchParams({ slug: `eq.${slug}`, status: 'eq.published', select: 'id,slug,name,channel,status,content,created_at,updated_at' })
  const rows = await restRequest(`campaigns?${query.toString()}`)
  return rows[0] || null
}
