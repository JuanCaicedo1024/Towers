import { Link } from 'react-router-dom'
import { ModalitiesEyebrow, ModalitiesHeading } from './ModalitiesShared'

function ModalitiesMethodology() {
  return <section className="experience-dark"><div className="modalities-container"><ModalitiesHeading number="05" label="Metodología" description="la misma en cualquier forma" /><ModalitiesEyebrow>Metodología Towers</ModalitiesEyebrow><h2>La metodología no cambia con la modalidad.</h2><p>Sea presencial u online, la experiencia se mantiene con el mismo enfoque de interacción.</p><Link className="experience-small-button" to="/metodologia">Conocer metodología</Link></div></section>
}

export default ModalitiesMethodology
