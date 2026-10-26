import { useState } from 'react'
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { requestFreeClass } from '../lib/freeClass'

const initialForm = { name: '', whatsapp: '', email: '', language: '', goal: 'Trabajo', consent: false }

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const location = useLocation()

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
    if (status.type !== 'loading') setStatus({ type: 'idle', message: '' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (status.type === 'loading') return
    setStatus({ type: 'loading', message: 'Registrando tus datos y preparando el acceso…' })
    try {
      const params = new URLSearchParams(location.search)
      const result = await requestFreeClass({
        name: form.name,
        email: form.email,
        phone: form.whatsapp,
        className: params.get('class') || `Clase gratuita de ${form.language}`,
        source: params.get('source') || location.pathname,
        goal: form.goal,
        consent: form.consent,
      })
      window.location.assign(result.accessUrl)
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'No pudimos completar el registro. Inténtalo de nuevo.' })
    }
  }

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-hero__glow contact-hero__glow--top" aria-hidden="true" />
          <div className="contact-hero__glow contact-hero__glow--bottom" aria-hidden="true" />
          <div className="contact-hero__brand" aria-hidden="true">TOWERS</div>
          <div className="contact-hero__inner">
            <div className="contact-intro">
              <h1>Cuéntanos un<br />poco sobre ti y<br /><em>accede a la clase.</em></h1>
              <p>Completa estos datos para desbloquear el contenido y comenzar tu experiencia Towers.</p>
              <div className="contact-intro__line" aria-hidden="true" />
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <ContactField label="Nombre" htmlFor="contact-name">
                <input id="contact-name" name="name" autoComplete="name" maxLength={100} value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Tu nombre" required />
              </ContactField>
              <ContactField label="WhatsApp" htmlFor="contact-whatsapp">
                <input id="contact-whatsapp" name="whatsapp" type="tel" autoComplete="tel" maxLength={30} value={form.whatsapp} onChange={(event) => update('whatsapp', event.target.value)} placeholder="Tu número de WhatsApp" required />
              </ContactField>
              <ContactField label="Email" htmlFor="contact-email">
                <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="Tu correo electrónico" required />
              </ContactField>
              <ContactField label="Idioma que te interesa" htmlFor="contact-language">
                <select id="contact-language" name="language" value={form.language} onChange={(event) => update('language', event.target.value)} required>
                  <option value="" disabled>Selecciona un idioma</option>
                  <option>Inglés</option><option>Francés</option><option>Portugués</option><option>Alemán</option><option>Italiano</option>
                </select>
                <small>Italiano sujeto posteriormente a validación comercial.</small>
              </ContactField>
              <ContactField label="¿Qué quieres conseguir?" htmlFor="contact-goal">
                <select id="contact-goal" name="goal" value={form.goal} onChange={(event) => update('goal', event.target.value)}>
                  <option>Trabajo</option><option>Viajes</option><option>Estudios</option><option>Crecimiento personal</option><option>Prepararme para un examen</option>
                </select>
              </ContactField>

              <label className="contact-consent">
                <input type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} required />
                <span>Acepto el tratamiento de mis datos. <a href="/contacto#politica">Política de tratamiento de datos</a></span>
              </label>
              <button className="contact-submit" type="submit" disabled={status.type === 'loading'}>
                {status.type === 'loading' ? <><LoaderCircle className="contact-spinner" size={16} aria-hidden="true" /> Registrando…</> : <>Ver mi clase gratis <ArrowRight size={16} aria-hidden="true" /></>}
              </button>
              {status.message && <p className={`contact-feedback contact-feedback--${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>{status.type === 'success' && <CheckCircle2 size={16} />}{status.message}</p>}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function ContactField({ label, htmlFor, children }) {
  return <label className="contact-field" htmlFor={htmlFor}><span>{label}</span>{children}</label>
}

export default Contact
