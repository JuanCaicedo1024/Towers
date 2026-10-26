const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export async function requestFreeClass(payload) {
  if (!supabaseUrl || !anonKey) throw new Error('El acceso a la clase no está configurado. Contacta con Towers.')
  const response = await fetch(`${supabaseUrl}/functions/v1/free-class`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    body: JSON.stringify({ action: 'register', ...payload }),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.error || 'No se pudo registrar tu solicitud.')
  return result
}

export async function redeemFreeClass(token) {
  if (!supabaseUrl || !anonKey) throw new Error('El acceso a la clase no está configurado.')
  const response = await fetch(`${supabaseUrl}/functions/v1/free-class`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    body: JSON.stringify({ action: 'access', token }),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.error || 'Este enlace no es válido o ya venció.')
  return result
}
