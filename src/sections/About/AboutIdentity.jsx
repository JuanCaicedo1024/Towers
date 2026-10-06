import { Eyebrow, Placeholder, SectionHeading } from './AboutShared'

function AboutIdentity() {
  return (
    <section className="experience-light">
      <div className="experience-container experience-split">
        <div>
          <SectionHeading number="02" label="Quiénes somos" description="composición editorial de la cultura" />
          <Eyebrow>Quiénes somos</Eyebrow>
          <h2>Aprender otro idioma también es ampliar la forma en que te conectas con el mundo.</h2>
          <p>En TOWERS entendemos el aprendizaje de una segunda lengua como una herramienta de comunicación, crecimiento personal y desarrollo profesional.</p>
          <p>Nuestra propuesta combina enseñanza, interacción y experiencias de aprendizaje pensadas para que niños, jóvenes y adultos puedan desarrollar sus habilidades y utilizar el idioma en diferentes contextos de su vida.</p>
        </div>
        <Placeholder label="Fotografía real · experiencia Towers · contexto institucional" />
      </div>
    </section>
  )
}

export default AboutIdentity
