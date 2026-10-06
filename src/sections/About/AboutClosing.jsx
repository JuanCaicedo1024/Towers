import { Link } from 'react-router-dom'
import { Eyebrow, SectionHeading } from './AboutShared'

function AboutClosing() {
  return (
    <section className="experience-light experience-final">
      <div className="experience-container experience-centered">
        <SectionHeading number="08" label="Cierre" description="el siguiente paso" />
        <Eyebrow>Tu siguiente paso</Eyebrow>
        <h2>Conoce una forma diferente de vivir el aprendizaje de un idioma.</h2>
        <p>Explora nuestros programas y encuentra una alternativa que se adapte a lo que quieres conseguir.</p>
        <div className="experience-actions">
          <Link className="experience-button experience-button--light" to="/idiomas">Encuentra tu programa <span aria-hidden="true">→</span></Link>
          <Link className="experience-text-link" to="/contacto">Habla con un asesor</Link>
        </div>
      </div>
    </section>
  )
}

export default AboutClosing
