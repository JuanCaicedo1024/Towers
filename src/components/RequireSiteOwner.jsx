import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { isSiteOwner } from '../lib/supabase'

function RequireSiteOwner({ children }) {
  const { session, loading } = useAuth()
  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    let active = true
    if (!session?.access_token) {
      setAllowed(false)
      setChecking(false)
      return undefined
    }
    setChecking(true)
    isSiteOwner(session.access_token)
      .then((result) => { if (active) setAllowed(result) })
      .catch(() => { if (active) setAllowed(false) })
      .finally(() => { if (active) setChecking(false) })
    return () => { active = false }
  }, [session?.access_token])

  if (loading || checking) return <main className="grid min-h-screen place-items-center text-sm text-[#627b9e]">Verificando acceso…</main>
  if (!session) return <Navigate to="/login" replace />
  if (!allowed) return <Navigate to="/dashboard" replace />
  return children
}

export default RequireSiteOwner
