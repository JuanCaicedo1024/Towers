import { BookOpen, MessageCircle, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const goals = [
  ['CONVERSACIÓN', 'Desarrollo progresivo de la capacidad de expresarte y participar en diferentes situaciones.', MessageCircle],
  ['COMPRENSIÓN AUDITIVA', 'Trabajo orientado a comprender mensajes, conversaciones e información oral.', Star],
  ['COMUNICACIÓN PROFESIONAL', 'Práctica del idioma aplicada a situaciones relacionadas con contextos laborales.', BookOpen],
]

function FreeClassIntro() {
  return (
    <>
      <Navbar />
      <main className="free-class-intro">
        <section className="free-class-intro__hero">
          <div className="free-class-intro__hero-grid">
            <div>
              <h1>Descubre cómo puede sentirse aprender un idioma en TOWERS.</h1>
              <p>Accede a una clase introductoria y conoce de cerca nuestra forma de enseñar, practicar e interactuar antes de decidir tu siguiente paso.</p>
              <Link className="free-class-intro__button" to="/contacto?source=clase-introductoria&class=Clase%20introductoria">
                Regístrate para tu clase gratuita <span aria-hidden="true">→</span>
              </Link>
              <small>Completa tu registro breve para obtener acceso.</small>
            </div>
            <div className="free-class-intro__video" role="img" aria-label="Vista previa de una clase en Towers">
              <img src="/images/Sinfoto.png" alt="" />
              <div aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="free-class-intro__goals">
          <h2>Lo que vas a trabajar</h2>
          <p>Esta clase introductoria te permite conocer una parte de la experiencia de aprendizaje de TOWERS.</p>
          <div className="free-class-intro__cards">
            {goals.map(([title, description, Icon], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="free-class-intro__cta">
          <h2>¿Quieres continuar aprendiendo?</h2>
          <p>Regístrate para recibir tu acceso y vivir una clase introductoria con Towers.</p>
          <Link to="/contacto?source=clase-introductoria&class=Clase%20introductoria">Regístrate para tu clase gratuita <span aria-hidden="true">→</span></Link>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default FreeClassIntro
