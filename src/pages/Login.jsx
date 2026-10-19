import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../auth/useAuth'

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const { signIn, session, loading, configurationError } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    const formData = new FormData(event.currentTarget)
    try {
      await signIn(String(formData.get('email')).trim(), String(formData.get('password')), formData.get('remember') === 'on')
      navigate(location.state?.from || '/dashboard', { replace: true })
    } catch (submitError) {
      const message = submitError.message || ''
      setError(/invalid login credentials/i.test(message)
        ? 'El correo o la contraseña no son correctos.'
        : message || 'No se pudo iniciar sesión. Revisa tus datos e inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <main className="grid min-h-screen place-items-center text-sm text-[#627b9e]">Verificando acceso…</main>
  if (session) return <Navigate to="/dashboard" replace />

  return (
    <>
      <Navbar />
      <main className="login-page">
        <div className="login-shell">
          <section className="login-welcome" aria-label="Acceso administrativo de Towers">
            
            <h1>Gestiona el aprendizaje desde un solo lugar.</h1>
            <p>Ingresa al portal de administración de Towers para continuar.</p>
            
            <div className="login-decoration login-decoration--one" />
            <div className="login-decoration login-decoration--two" />
          </section>

          <section className="login-card">
            <a className="login-brand" href="/" aria-label="Towers, ir al inicio">
              <img src="/images/Towers_logo.png" alt="Towers Centro activo de idiomas" />
            </a>
            <span className="login-card__eyebrow">ACCESO PARA ADMINISTRATIVOS</span>
            <h2>Inicia sesión</h2>
            <p className="login-card__intro">Ingresa las credenciales que te entregó el equipo de Towers.</p>

            {configurationError && <p className="mb-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900" role="status">{configurationError}</p>}
            {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800" role="alert">{error}</p>}

            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="login-email">Correo electrónico</label>
              <div className="login-input-wrap">
                <Mail size={18} aria-hidden="true" />
                <input id="login-email" name="email" type="email" placeholder="tu@correo.com" autoComplete="email" required />
              </div>

              <div className="login-password-heading">
                <label htmlFor="login-password">Contraseña</label>
                
              </div>
              <div className="login-input-wrap">
                <LockKeyhole size={18} aria-hidden="true" />
                <input id="login-password" name="password" type={isPasswordVisible ? 'text' : 'password'} placeholder="Ingresa tu contraseña" autoComplete="current-password" required />
                <button
                  className="login-show-password"
                  type="button"
                  aria-label={isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={() => setIsPasswordVisible((visible) => !visible)}
                >
                  {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <label className="login-remember"><input type="checkbox" name="remember" /> <span>Recordarme en este dispositivo</span></label>
              <button className="login-submit" type="submit" disabled={isSubmitting || Boolean(configurationError)}>{isSubmitting ? 'Ingresando…' : 'Ingresar'} <ArrowRight size={18} /></button>
            </form>

            <p className="login-signup">¿Aún no tienes credenciales? <a href="/contacto">Solicita tu acceso al equipo de Towers</a></p>
            <p className="login-visual-note">Portal interno · Las cuentas son creadas por Towers desde el panel administrativo.</p>
          </section>
        </div>
      </main>
    </>
  )
}

export default Login
