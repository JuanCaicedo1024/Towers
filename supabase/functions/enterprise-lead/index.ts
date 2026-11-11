const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
})

const choices = {
  teamSize: ['1–10', '11–25', '26–50', '51–100', 'Más de 100'],
  language: ['Inglés', 'Francés', 'Alemán', 'Portugués', 'Italiano'],
  modality: ['In-company', 'Online', 'Híbrida', 'Por definir'],
}

function cleanText(value: unknown) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : ''
}

function requiredEnv(name: string) {
  const value = Deno.env.get(name)
  if (!value) throw new Error(`Falta configurar ${name} en Supabase.`)
  return value
}

async function submit(body: Record<string, unknown>) {
  const company = cleanText(body.company)
  const name = cleanText(body.name)
  const role = cleanText(body.role)
  const email = cleanText(body.email).toLowerCase()
  const phone = cleanText(body.phone)
  const teamSize = cleanText(body.teamSize)
  const language = cleanText(body.language)
  const modality = cleanText(body.modality)
  const objective = cleanText(body.objective)

  if (body.consent !== true) return json({ error: 'Debes aceptar el tratamiento de tus datos.' }, 400)
  if (company.length < 2 || company.length > 150) return json({ error: 'Revisa el nombre de la empresa.' }, 400)
  if (name.length < 2 || name.length > 150) return json({ error: 'Revisa el nombre ingresado.' }, 400)
  if (role.length < 2 || role.length > 150) return json({ error: 'Revisa el cargo ingresado.' }, 400)
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Revisa el correo electrónico ingresado.' }, 400)
  if (phone.length < 5 || phone.length > 30 || !/^[+\d()\s.-]+$/.test(phone)) return json({ error: 'Revisa el teléfono ingresado.' }, 400)
  if (!choices.teamSize.includes(teamSize)) return json({ error: 'Selecciona el número de colaboradores.' }, 400)
  if (!choices.language.includes(language)) return json({ error: 'Selecciona un idioma válido.' }, 400)
  if (!choices.modality.includes(modality)) return json({ error: 'Selecciona una modalidad válida.' }, 400)
  if (objective.length < 2 || objective.length > 1200) return json({ error: 'Revisa el objetivo o necesidad ingresado.' }, 400)

  const payload = {
    action: 'enterprise',
    secret: requiredEnv('GOOGLE_APPS_SCRIPT_SECRET'),
    lead_id: crypto.randomUUID(),
    registered_at: new Date().toISOString(),
    source: '/empresas',
    company,
    name,
    role,
    email,
    phone,
    team_size: teamSize,
    language,
    modality,
    objective,
    consent: true,
  }
  const response = await fetch(requiredEnv('GOOGLE_APPS_SCRIPT_URL'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`Google Apps Script respondió ${response.status}.`)
  const result = await response.json().catch(() => ({}))
  if (result.ok !== true) throw new Error('Google Sheets no confirmó el registro.')
  return json({ ok: true })
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method !== 'POST') return json({ error: 'Método no permitido.' }, 405)
  try {
    const body = await request.json()
    if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ error: 'Solicitud inválida.' }, 400)
    return await submit(body)
  } catch (error) {
    console.error('enterprise-lead:', error)
    return json({ error: 'No se pudo registrar la solicitud. Inténtalo de nuevo más tarde.' }, 500)
  }
})
