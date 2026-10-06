import { Link } from 'react-router-dom'
import { ModalitiesHeading } from './ModalitiesShared'

function ModalitiesClosing() {
  return <section className="experience-dark modalities-final"><div className="modalities-container"><ModalitiesHeading number="07" label="Cierre" description="el siguiente paso" /><h2>¿Listo para sumarte?</h2><p>Elige cómo comenzar tu camino y encuentra una modalidad que se adapte a ti.</p><Link className="experience-button experience-button--light" to="/contacto">Habla con un asesor <span aria-hidden="true">→</span></Link></div></section>
}

export default ModalitiesClosing
