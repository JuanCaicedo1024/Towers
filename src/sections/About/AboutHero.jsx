import AnimatedText from '@/components/ui/AnimatedText';
import { Link } from 'react-router-dom'
import { Eyebrow, SectionHeading } from './AboutShared'

function AboutHero() {
  return (
    <section className="experience-dark experience-hero">
      <div className="experience-container">
      
        <div className="experience-split about-hero-split">
          <div className="about-hero-copy">
            
            <h1><AnimatedText>Un lugar para aprender un idioma a través de la interacción.</AnimatedText></h1>
            <p><AnimatedText>En TOWERS creemos que aprender un idioma es una experiencia que se construye con otras personas. Por eso creamos espacios para practicar, participar y avanzar acompañado.</AnimatedText></p>
            <div className="experience-actions">
              <Link className="experience-button experience-button--orange" to="/idiomas">Conoce nuestros programas <span aria-hidden="true">→</span></Link>
              
            </div>
          </div>
          <div className="about-hero-image">
            <img src="/images/Sinfoto.png" alt="Espacio de aprendizaje Towers" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
