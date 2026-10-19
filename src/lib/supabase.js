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
    isAdmin = await isCampaignAdmin(session.access_token)
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
    if (await isCampaignAdmin(session.access_token)) return session
    storeSession(null)
    return null
  }

  try {
    const refreshed = await authRequest('token?grant_type=refresh_token', { refresh_token: session.refresh_token })
    storeSession(refreshed)
    if (!await isCampaignAdmin(refreshed.access_token)) {
      storeSession(null)
      return null
    }
    return refreshed
  } catch {
    storeSession(null)
    return null
  }
}

async function restRequest(path, { method = 'GET', body, token, prefer } = {}) {
  requireConfig()
  let accessToken = token
  const storedSession = readStoredSession()
  if (storedSession?.refresh_token && (!storedSession.expires_at || storedSession.expires_at * 1000 <= Date.now() + 60_000)) {
    accessToken = (await getSession())?.access_token || accessToken
  }
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    method,
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

export async function getPublishedCampaign(slug) {
  const query = new URLSearchParams({ slug: `eq.${slug}`, status: 'eq.published', select: 'id,slug,name,channel,status,content,created_at,updated_at' })
  const rows = await restRequest(`campaigns?${query.toString()}`)
  return rows[0] || null
}
