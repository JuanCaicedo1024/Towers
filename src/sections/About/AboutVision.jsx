import AnimatedText from '@/components/ui/AnimatedText';
import { Link } from 'react-router-dom'
import { Eyebrow, SectionHeading } from './AboutShared'

function AboutVision() {
  return (
    <section className="experience-dark">
      <div className="experience-container experience-split about-vision-split">
        <div className="about-vision-copy">
          
          <h2 className="about-vision-heading"><AnimatedText>Una visión que mira más allá del salón de clase.</AnimatedText></h2>
          <p><AnimatedText>TOWERS plantea para 2027 consolidarse como un centro activo de idiomas con una propuesta de enseñanza que conecta el conocimiento con la experiencia cotidiana.</AnimatedText></p>
          <p><AnimatedText>Un lugar donde el aprendizaje de una lengua extranjera contribuya a que niños, jóvenes y adultos puedan desenvolverse en nuevos contextos, fortalecer sus habilidades comunicativas y alcanzar las oportunidades que se proponen.</AnimatedText></p>
          <div className="experience-actions">
            <Link className="experience-button experience-button--orange" to="/idiomas">Conoce nuestros programas <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="about-vision-image">
          <img src="/images/Sinfoto.png" alt="Visión educativa de Towers" />
        </div>
      </div>
    </section>
  )
}

export default AboutVision
