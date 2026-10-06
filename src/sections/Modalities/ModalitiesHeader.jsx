import { Link } from 'react-router-dom'
import { ModalitiesEyebrow, ModalitiesHeading, ModalitiesPlaceholder } from './ModalitiesShared'

function ModalitiesHeader() {
  return (
    <section className="experience-dark experience-hero">
      <div className="experience-container">
        <ModalitiesHeading number="01" label="HERO" description="una sola experiencia de estudio" />
        <div className="experience-split">
          <div>
            <ModalitiesEyebrow>Modalidades</ModalitiesEyebrow>
            <h1>Una sola experiencia de Towers, en distintas formas.</h1>
            <p>Puedes estudiar presencialmente en nuestra sede en Cúcuta, online o vivir una combinación de ambas. El resultado es la misma experiencia Towers.</p>
            <div className="experience-actions">
              <Link className="experience-button experience-button--light" to="/contacto">Conoce nuestras modalidades <span aria-hidden="true">→</span></Link>
              <Link className="experience-text-link" to="/prueba-de-nivel">Haz tu prueba de nivel</Link>
            </div>
          </div>
          <ModalitiesPlaceholder className="experience-hero-placeholder" label="Fotografía real · clase Towers (presencial u online)" />
        </div>
      </div>
    </section>
  )
}

export default ModalitiesHeader
