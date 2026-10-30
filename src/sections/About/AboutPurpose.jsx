import AnimatedText from '@/components/ui/AnimatedText';
import { Link } from 'react-router-dom'
import { Eyebrow, SectionHeading } from './AboutShared'

function AboutPurpose() {
  return (
    <section className="experience-light">
      <div className="experience-container experience-split about-purpose-split">
        <div className="about-purpose-image">
          <img src="/images/Sinfoto.png" alt="Aprendizaje en acción en Towers" />
        </div>
        <div className="about-purpose-copy">
     
          <h2 className="about-purpose-heading"><AnimatedText>Hacer del aprendizaje de un idioma una herramienta para avanzar.</AnimatedText></h2>
          <p><AnimatedText>TOWERS busca promover el aprendizaje de una segunda lengua como una herramienta fundamental para la comunicación y para el desarrollo personal y profesional.</AnimatedText></p>
         
          <div className="experience-actions">
            <Link className="experience-button experience-button--orange" to="/idiomas">Conoce nuestros programas <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPurpose
