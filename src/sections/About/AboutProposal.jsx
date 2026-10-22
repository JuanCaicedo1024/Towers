import AnimatedText from '@/components/ui/AnimatedText';
import { Link } from 'react-router-dom'
import { Eyebrow, SectionHeading } from './AboutShared'

function AboutProposal() {
  return (
    <section className="experience-dark">
      <div className="experience-container experience-split">
        <div>
          <SectionHeading number="03" label="Nuestra propuesta" description="la interacción es el centro" />
          <Eyebrow>Aprender para interactuar</Eyebrow>
          <h2><AnimatedText>La interacción está en el centro de nuestra propuesta.</AnimatedText></h2>
          <p><AnimatedText>La filosofía de TOWERS parte de que aprender un idioma cobra sentido cuando puedes usarlo para comunicarte, resolver situaciones y compartir con otros.</AnimatedText></p>
          <p><AnimatedText>Por eso el aprendizaje incluye escuchar, hablar, leer y escribir en contextos reales, acompañados por docentes que orientan el proceso.</AnimatedText></p>
          <Link className="experience-small-button" to="/metodologia">Conoce nuestra metodología</Link>
        </div>
        <div className="methodology-card methodology-card--quote">
          <Eyebrow>Declaración conceptual</Eyebrow>
          <h3><AnimatedText>No solo estudiar el idioma. Usarlo, practicarlo e interactuar.</AnimatedText></h3>
          <div className="about-skill-grid">
            {['Escucha', 'Habla', 'Lectura', 'Escritura'].map((skill) => <span key={skill}>{skill}</span>)}
          </div>
          <small>Las cuatro habilidades forman parte de una misma experiencia de aprendizaje.</small>
        </div>
      </div>
    </section>
  )
}

export default AboutProposal
