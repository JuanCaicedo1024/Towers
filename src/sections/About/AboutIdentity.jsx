import AnimatedText from '@/components/ui/AnimatedText';
import { Eyebrow, Placeholder, SectionHeading } from './AboutShared'

function AboutIdentity() {
  return (
    <section className="experience-light">
      <div className="experience-container experience-split">
        <div>
          <SectionHeading number="02" label="Quiénes somos" description="composición editorial de la cultura" />
          <Eyebrow>Quiénes somos</Eyebrow>
          <h2><AnimatedText>Aprender otro idioma también es ampliar la forma en que te conectas con el mundo.</AnimatedText></h2>
          <p><AnimatedText>En TOWERS entendemos el aprendizaje de una segunda lengua como una herramienta de comunicación, crecimiento personal y desarrollo profesional.</AnimatedText></p>
          <p><AnimatedText>Nuestra propuesta combina enseñanza, interacción y experiencias de aprendizaje pensadas para que niños, jóvenes y adultos puedan desarrollar sus habilidades y utilizar el idioma en diferentes contextos de su vida.</AnimatedText></p>
        </div>
        <Placeholder label="Fotografía real · experiencia Towers · contexto institucional" />
      </div>
    </section>
  )
}

export default AboutIdentity
