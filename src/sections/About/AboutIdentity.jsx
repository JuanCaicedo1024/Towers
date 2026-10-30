import AnimatedText from '@/components/ui/AnimatedText';
import { Link } from 'react-router-dom'

function AboutIdentity() {
  return (
    <section className="experience-dark">
      <div className="experience-container experience-split about-identity-split">
        <div className="about-identity-copy">
         
         
          <h2 className="about-identity-heading"><AnimatedText>Aprender otro idioma también es ampliar la forma en que te conectas con el mundo.</AnimatedText></h2>
          <p><AnimatedText>En TOWERS entendemos el aprendizaje de una segunda lengua como una herramienta de comunicación, crecimiento personal y desarrollo profesional.</AnimatedText></p>
          <p><AnimatedText>Nuestra propuesta combina enseñanza, interacción y experiencias de aprendizaje pensadas para que niños, jóvenes y adultos puedan desarrollar sus habilidades y utilizar el idioma en diferentes contextos de su vida.</AnimatedText></p>
          <div className="experience-actions">
            <Link className="experience-button experience-button--orange" to="/idiomas">Conoce nuestros programas <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="about-identity-image">
          <img src="/images/Sinfoto.png" alt="Experiencia de aprendizaje Towers" />
        </div>
      </div>
    </section>
  )
}

export default AboutIdentity
