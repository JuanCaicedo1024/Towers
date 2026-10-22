import AnimatedText from '@/components/ui/AnimatedText';
import { Eyebrow, Placeholder, SectionHeading } from './AboutShared'

function AboutVision() {
  return (
    <section className="experience-dark">
      <div className="experience-container experience-split">
        <div>
          <SectionHeading number="05" label="Nuestra visión" description="una visión que mira más allá del salón de clase" />
          <Eyebrow>Una visión Towers</Eyebrow>
          <h2><AnimatedText>Una visión que mira más allá del salón de clase.</AnimatedText></h2>
          <p><AnimatedText>TOWERS plantea para 2027 consolidarse como un centro activo de idiomas con una propuesta de enseñanza que conecta el conocimiento con la experiencia cotidiana.</AnimatedText></p>
          <p><AnimatedText>Un lugar donde el aprendizaje de una lengua extranjera contribuya a que niños, jóvenes y adultos puedan desenvolverse en nuevos contextos, fortalecer sus habilidades comunicativas y alcanzar las oportunidades que se proponen.</AnimatedText></p>
        </div>
        <Placeholder label="Fotografía real · visión de futuro · contexto educativo Towers" />
      </div>
    </section>
  )
}

export default AboutVision
