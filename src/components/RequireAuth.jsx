import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

function RequireAuth({ children }) {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) return <main className="grid min-h-screen place-items-center text-sm text-[#627b9e]">Verificando acceso…</main>
  if (!session) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}

export default RequireAuth
