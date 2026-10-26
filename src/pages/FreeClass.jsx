import { useEffect, useState } from 'react'
import { BookOpen, MessageCircle, Play, Star } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { redeemFreeClass } from '../lib/freeClass'

const learningGoals = [
  {
    title: 'Conversación',
    description: 'Desarrollo progresivo de la capacidad de expresarte y participar en diferentes situaciones.',
    icon: MessageCircle,
  },
  {
    title: 'Comprensión auditiva',
    description: 'Trabajo orientado a comprender mensajes, conversaciones e información oral.',
    icon: Star,
  },
  {
    title: 'Comunicación profesional',
    description: 'Práctica del idioma aplicada a situaciones relacionadas con contextos laborales.',
    icon: BookOpen,
  },
]

function FreeClass() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [state, setState] = useState(() => token
    ? { status: 'loading', content: '', error: '' }
    : { status: 'error', content: '', error: 'El enlace no contiene un código de acceso.' })

  useEffect(() => {
    let active = true
    if (!token) return () => { active = false }
    redeemFreeClass(token)
      .then(({ content }) => {
        if (active) {
          window.history.replaceState({}, '', '/clase-gratis')
          setState({ status: 'ready', content, error: '' })
        }
      })
      .catch((error) => { if (active) setState({ status: 'error', content: '', error: error.message }) })
    return () => { active = false }
  }, [token])

  if (state.status === 'loading') return <main className="free-class-state" role="status">Validando tu acceso…</main>
  if (state.status === 'error') return <main className="free-class-state"><section><h1>No pudimos abrir la clase</h1><p role="alert">{state.error}</p><p>Los enlaces son personales y de un solo uso. Solicita un nuevo acceso desde Towers.</p><Link to="/contacto">Solicitar acceso</Link></section></main>

  return (
    <>
      <Navbar />
      <main className="free-class-page">
        <section className="free-class-hero">
          <div className="mx-auto max-w-[1320px]">
            <p className="free-class-eyebrow">TOWERS</p>
            <h1>Clase introductoria</h1>
            <p className="free-class-lead">Conoce una experiencia de aprendizaje basada en práctica e interacción.</p>

            <div className="free-class-video" role="img" aria-label="Vista previa de la clase introductoria">
              <img src="/images/Sinfoto.png" alt="" />
              <div className="free-class-video__veil" aria-hidden="true" />
              <button className="free-class-video__play" type="button" aria-label="Reproducir vista previa">
                <Play fill="currentColor" size={30} aria-hidden="true" />
              </button>
              <div className="free-class-video__controls" aria-hidden="true">
                <span className="free-class-video__progress"><span /></span>
                <span>5:23</span>
                <span className="ml-auto">15:45</span>
              </div>
            </div>
          </div>
        </section>

        <section className="free-class-goals">
          <div className="mx-auto max-w-[1240px]">
            <h2>Lo que vas a trabajar</h2>
            <p className="free-class-section-lead">En esta clase introductoria pondrás en práctica tu capacidad de comunicarte en Towers.</p>
            <div className="free-class-goals__grid">
              {learningGoals.map(({ title, description, icon: Icon }, index) => (
                <article className="free-class-goal" key={title}>
                  <span className="free-class-goal__number">{String(index + 1).padStart(2, '0')}</span>
                  <Icon className="free-class-goal__icon" size={27} strokeWidth={1.8} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <details className="free-class-details">
              <summary>Ver el contenido de tu clase</summary>
              <div className="free-class-content__body">{state.content}</div>
            </details>
          </div>
        </section>

        <section className="free-class-cta">
          <div className="free-class-cta__decoration free-class-cta__decoration--left" aria-hidden="true" />
          <div className="free-class-cta__decoration free-class-cta__decoration--right" aria-hidden="true" />
          <div className="relative mx-auto max-w-[620px]">
            <h2>¿Quieres continuar aprendiendo?</h2>
            <p>Conoce los programas disponibles o conversa con un asesor para encontrar una opción adecuada para ti.</p>
            <Link to="/modalidades">Conoce nuestros programas <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default FreeClass
