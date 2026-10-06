import { ModalitiesHeading } from './ModalitiesShared'

const questions = ['¿Qué necesito para empezar?', '¿Cómo funcionan los horarios?', '¿Puedo cambiar entre presencial y online?', '¿Cómo es la dinámica de clase?', '¿Qué pasa después de solicitar información?']

function ModalitiesFaq() {
  return <section className="modalities-light"><div className="modalities-container modalities-faq"><ModalitiesHeading number="06" label="FAQ" description="eliminar opciones" /><h2>Preguntas frecuentes</h2><div>{questions.map((question) => <details key={question}><summary>{question}</summary><p>Un asesor Towers puede orientarte sobre esta modalidad y los siguientes pasos.</p></details>)}</div></div></section>
}

export default ModalitiesFaq
