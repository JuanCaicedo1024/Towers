import { Link } from 'react-router-dom'
import { ModalitiesHeading } from './ModalitiesShared'

const options = [
  ['Presencial en la sede de Cúcuta', 'Misma metodología, misma interacción.'],
  ['Online en vivo, desde donde estés', 'Misma metodología, misma interacción.'],
  ['Combinando ambas según tu momento', 'Misma metodología, misma interacción.'],
]

function StudyOptions() {
  return (
    <section className="modalities-light">
      <div className="modalities-container">
        <ModalitiesHeading number="02" label="Cómo puedes estudiar" description="mismo enfoque, distinta forma" />
        <h2>Tres formas de vivir la experiencia</h2>
        <p>Elige cómo sumarte a la clase. El resto es la misma experiencia Towers.</p>
        <div className="modalities-options">
          {options.map(([title, description]) => (
            <article key={title}><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
        <small className="modalities-validation">Por validar: combinación entre presencial y online para continuar con Towers</small>
        <Link className="experience-small-button" to="/contacto">Consultar modalidades</Link>
      </div>
    </section>
  )
}

export default StudyOptions
