const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export async function submitEnterpriseLead(form) {
  if (!supabaseUrl || !anonKey) {
    throw new Error('El registro de solicitudes empresariales no está configurado. Contacta con Towers.')
  }

  const response = await fetch(`${supabaseUrl}/functions/v1/enterprise-lead`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify(form),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.error || 'No se pudo registrar la solicitud.')
  return result
}
