import { Eyebrow, SectionHeading } from './AboutShared'

const principles = [
  ['01', 'Compromiso', 'Trabajar para que el aprendizaje contribuya al crecimiento y desarrollo de nuestros estudiantes.'],
  ['02', 'Responsabilidad', 'Revisar y fortalecer continuamente la manera en que acompañamos el proceso de aprendizaje.'],
  ['03', 'Transparencia', 'Actuar de manera clara y responsable frente a los estudiantes y los servicios que ofrecemos.'],
  ['04', 'Emocionalidad', 'Reconocer que aprender un nuevo idioma también implica motivación, confianza y nuevas posibilidades.'],
  ['05', 'Empatía', 'Comprender que cada estudiante llega con necesidades, intereses y objetivos diferentes.'],
  ['06', 'Resiliencia', 'Acompañar el aprendizaje como un proceso de adaptación continuo frente a nuevos retos y oportunidades.'],
]

function AboutPrinciples() {
  return (
    <section className="experience-light">
      <div className="experience-container">
        <SectionHeading number="06" label="Lo que nos guía" description="valores institucionales adaptados para vivir" />
        <Eyebrow>Nuestros principios</Eyebrow>
        <h2>Principios que orientan cómo enseñamos y cómo acompañamos.</h2>
        <div className="about-principles">
          {principles.map(([number, title, description]) => (
            <article key={number}><strong>{number}</strong><div><h3>{title}</h3><p>{description}</p></div></article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutPrinciples
