import AnimatedText from '@/components/ui/AnimatedText';
import { Headphones, Mic, PenLine, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Eyebrow } from './AboutShared'

const skills = [
  ['Escucha', Headphones],
  ['Habla', Mic],
  ['Lectura', Star],
  ['Escritura', PenLine],
]

function AboutProposal() {
  return (
    <section className="experience-dark">
      <div className="experience-container experience-split about-proposal-split">
        <div className="about-proposal-copy">
          
          <h2><AnimatedText>La interacción está en el centro de nuestra propuesta.</AnimatedText></h2>
          <p><AnimatedText>La filosofía de TOWERS parte de que aprender un idioma cobra sentido cuando puedes usarlo para comunicarte, resolver situaciones y compartir con otros.</AnimatedText></p>
          <p><AnimatedText>Por eso el aprendizaje incluye escuchar, hablar, leer y escribir en contextos reales, acompañados por docentes que orientan el proceso.</AnimatedText></p>
          <Link className="experience-button experience-button--orange" to="/metodologia">Conoce nuestra metodología <span aria-hidden="true">→</span></Link>
        </div>
        <div className="methodology-card methodology-card--quote about-proposal-card">
          <Eyebrow>Declaración conceptual</Eyebrow>
          <h3><AnimatedText>No solo estudiar el idioma. Usarlo, practicarlo e interactuar.</AnimatedText></h3>
          <div className="about-skill-grid">
            {skills.map(([skill, Icon]) => (
              <span key={skill}>
                <i><Icon aria-hidden="true" /></i>
                {skill}
              </span>
            ))}
          </div>
       
        </div>
      </div>
    </section>
  )
}

export default AboutProposal
