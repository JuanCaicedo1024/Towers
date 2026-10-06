import { Eyebrow, Placeholder, SectionHeading } from './AboutShared'

function AboutPurpose() {
  return (
    <section className="experience-light">
      <div className="experience-container experience-split">
        <Placeholder label="Fotografía real · contexto Towers · aprendizaje en acción" />
        <div>
          <SectionHeading number="04" label="Nuestro propósito" description="educación editorial de misión institucional" />
          <Eyebrow>Nuestro propósito</Eyebrow>
          <h2>Hacer del aprendizaje de un idioma una herramienta para avanzar.</h2>
          <p>TOWERS busca promover el aprendizaje de una segunda lengua como una herramienta fundamental para la comunicación y para el desarrollo personal y profesional.</p>
          <p>A través de espacios de aprendizaje interactivos, la institución busca acompañar a niños, jóvenes y adultos en el desarrollo de conocimientos y habilidades que puedan aportar al cumplimiento de sus objetivos.</p>
        </div>
      </div>
    </section>
  )
}

export default AboutPurpose
