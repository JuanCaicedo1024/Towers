import { ModalitiesHeading, ModalitiesPlaceholder } from './ModalitiesShared'

const steps = [['01', 'Comprendes'], ['02', 'Practicas'], ['03', 'Aplicas'], ['04', 'Consolidas'], ['05', 'Avanzas']]

function ClassExperience() {
  return <section className="experience-dark"><div className="modalities-container"><ModalitiesHeading number="03" label="Cómo es una clase" description="la calidad de la experiencia" /><h2>Cómo es una clase en Towers</h2><div className="modalities-class-steps">{steps.map(([number, title]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>Descripción operativa por definir con academia.</p></article>)}</div><ModalitiesPlaceholder className="modalities-class-image" label="Fotografía real · momento de clase (presencial u online)" /></div></section>
}

export default ClassExperience
