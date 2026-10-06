import { Eyebrow, Placeholder, SectionHeading } from './AboutShared'

function AboutVision() {
  return (
    <section className="experience-dark">
      <div className="experience-container experience-split">
        <div>
          <SectionHeading number="05" label="Nuestra visión" description="una visión que mira más allá del salón de clase" />
          <Eyebrow>Una visión Towers</Eyebrow>
          <h2>Una visión que mira más allá del salón de clase.</h2>
          <p>TOWERS plantea para 2027 consolidarse como un centro activo de idiomas con una propuesta de enseñanza que conecta el conocimiento con la experiencia cotidiana.</p>
          <p>Un lugar donde el aprendizaje de una lengua extranjera contribuya a que niños, jóvenes y adultos puedan desenvolverse en nuevos contextos, fortalecer sus habilidades comunicativas y alcanzar las oportunidades que se proponen.</p>
        </div>
        <Placeholder label="Fotografía real · visión de futuro · contexto educativo Towers" />
      </div>
    </section>
  )
}

export default AboutVision
