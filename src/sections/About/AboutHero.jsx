import { Link } from 'react-router-dom'
import { Eyebrow, Placeholder, SectionHeading } from './AboutShared'

function AboutHero() {
  return (
    <section className="experience-dark experience-hero">
      <div className="experience-container">
        <SectionHeading number="01" label="HERO" description="un lugar para aprender un idioma a través de la interacción" />
        <div className="experience-split">
          <div>
            <Eyebrow>Sobre Towers</Eyebrow>
            <h1>Un lugar para aprender un idioma a través de la interacción.</h1>
            <p>En TOWERS creemos que aprender un idioma es una experiencia que se construye con otras personas. Por eso creamos espacios para practicar, participar y avanzar acompañado.</p>
            <div className="experience-actions">
              <Link className="experience-button experience-button--light" to="/idiomas">Conoce nuestros programas <span aria-hidden="true">→</span></Link>
              <Link className="experience-text-link" to="/contacto">Habla con un asesor</Link>
            </div>
          </div>
          <Placeholder className="experience-hero-placeholder" label="Fotografía real requerida: estudiantes y profesores en contexto Towers" />
        </div>
      </div>
    </section>
  )
}

export default AboutHero
