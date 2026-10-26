const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
})

const requiredEnv = (name: string) => {
  const value = Deno.env.get(name)
  if (!value) throw new Error(`Falta configurar ${name} en Supabase.`)
  return value
}

async function db(path: string, init: RequestInit = {}) {
  const base = requiredEnv('SUPABASE_URL').replace(/\/$/, '')
  const key = requiredEnv('SUPABASE_SERVICE_ROLE_KEY')
  const response = await fetch(`${base}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
  const text = await response.text()
  if (!response.ok) throw new Error(`Supabase respondió ${response.status}: ${text.slice(0, 250)}`)
  return text ? JSON.parse(text) : null
}

async function sha256(value: string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function register(body: Record<string, unknown>) {
  const name = String(body.name || '').trim().replace(/\s+/g, ' ')
  const email = String(body.email || '').trim().toLowerCase()
  const phone = String(body.phone || '').trim()
  const className = String(body.className || '').trim().replace(/\s+/g, ' ')
  const source = String(body.source || '').trim()
  const goal = String(body.goal || '').trim()
  if (body.consent !== true) return json({ error: 'Debes aceptar el tratamiento de tus datos.' }, 400)
  if (name.length < 2 || name.length > 100) return json({ error: 'Revisa el nombre ingresado.' }, 400)
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Revisa el correo electrónico ingresado.' }, 400)
  if (phone.length > 30 || (phone && !/^[+\d()\s.-]+$/.test(phone))) return json({ error: 'Revisa el teléfono ingresado.' }, 400)
  if (className.length < 2 || className.length > 120 || source.length < 1 || source.length > 200 || goal.length > 100) return json({ error: 'Los datos de la clase o su origen no son válidos.' }, 400)

  const leads = await db('free_class_leads?on_conflict=email,source&select=id,name,email,phone,class_name,source,goal,registered_at', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify({ name, email, phone, class_name: className, source, goal }),
  })
  const lead = leads?.[0]
  if (!lead?.id) throw new Error('No se pudo confirmar el registro.')

  // Hojas recibe solo datos de registro. No recibe tokens ni hashes de acceso.
  const sheetResponse = await fetch(requiredEnv('GOOGLE_APPS_SCRIPT_URL'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: requiredEnv('GOOGLE_APPS_SCRIPT_SECRET'),
      lead_id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      class_name: lead.class_name,
      source: lead.source,
      registered_at: lead.registered_at,
    }),
  })
  if (!sheetResponse.ok) throw new Error('Google Sheets no confirmó el registro.')
  const sheetResult = await sheetResponse.json().catch(() => ({}))
  if (sheetResult.ok !== true) throw new Error('Google Sheets no confirmó el registro.')

  // Renovar el acceso previo para la misma persona y origen.
  await db(`free_class_tokens?lead_id=eq.${encodeURIComponent(lead.id)}&revoked_at=is.null`, {
    method: 'PATCH', body: JSON.stringify({ revoked_at: new Date().toISOString() }),
  })
  const random = crypto.getRandomValues(new Uint8Array(32))
  const token = btoa(String.fromCharCode(...random)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  const tokenHash = await sha256(token)
  const ttl = Math.min(72, Math.max(1, Number(Deno.env.get('FREE_CLASS_TOKEN_TTL_HOURS') || 24)))
  const expiresAt = new Date(Date.now() + ttl * 60 * 60 * 1000).toISOString()
  await db('free_class_tokens', {
    method: 'POST', headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ token_hash: tokenHash, lead_id: lead.id, expires_at: expiresAt }),
  })
  const appBase = requiredEnv('APP_BASE_URL').replace(/\/$/, '')
  return json({ accessUrl: `${appBase}/clase-gratis?token=${encodeURIComponent(token)}`, expiresAt })
}

async function access(body: Record<string, unknown>) {
  const token = String(body.token || '')
  if (!/^[A-Za-z0-9_-]{40,50}$/.test(token)) return json({ error: 'El enlace no es válido o ya fue utilizado.' }, 401)
  const content = Deno.env.get('FREE_CLASS_CONTENT_TEXT')
  if (!content) return json({ error: 'El contenido de la clase aún no está configurado.' }, 503)
  const consumed = await db('rpc/consume_free_class_token', {
    method: 'POST', body: JSON.stringify({ p_token_hash: await sha256(token) }),
  })
  if (consumed !== true) return json({ error: 'El enlace no es válido, ya venció o ya fue utilizado.' }, 401)
  return json({ content })
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method !== 'POST') return json({ error: 'Método no permitido.' }, 405)
  try {
    const body = await request.json()
    if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ error: 'Solicitud inválida.' }, 400)
    if (body.action === 'register') return await register(body)
    if (body.action === 'access') return await access(body)
    return json({ error: 'Acción no válida.' }, 400)
  } catch (error) {
    console.error('free-class:', error)
    return json({ error: 'No se pudo completar la solicitud. Inténtalo de nuevo más tarde.' }, 500)
  }
})
