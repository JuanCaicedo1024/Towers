import AnimatedText from '@/components/ui/AnimatedText';
import {
  AudioLines,
  BookOpen,
  Globe,
  MessageCircle,
  Play,
  Star,
  StickyNote,
} from 'lucide-react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const learningGoals = [
  {
    title: 'Conversación',
    description: 'Desarrollo progresivo de la capacidad de expresarse y participar en diferentes situaciones.',
    icon: MessageCircle,
  },
  {
    title: 'Comprensión auditiva',
    description: 'Trabajo orientado a comprender mensajes, conversaciones e información oral.',
    icon: Star,
  },
  {
    title: 'Comunicación profesional',
    description: 'Práctica del idioma aplicada a situaciones relacionadas con contextos laborales.',
    icon: BookOpen,
  },
  {
    title: 'Pronunciación',
    description: 'Acompañamiento para mejorar claridad, comprensión y seguridad al expresarse.',
    icon: AudioLines,
  },
  {
    title: 'Vocabulario en contexto',
    description: 'Aprender vocabulario relacionado con situaciones y objetivos concretos.',
    icon: StickyNote,
  },
  {
    title: 'Confianza al hablar',
    description: 'Generar más oportunidades de participación y práctica durante el proceso.',
    icon: Globe,
  },
]

function SectionLabel({ children, dark = false }) {
  return <span className={`methodology-label ${dark ? 'text-[#71809a]' : ''}`}>{children}</span>
}

function Methodology() {
  return (
    <>
      <Navbar />
      <main className="methodology-page">
        <section className="methodology-dark methodology-hero">
          <div className="methodology-container">
            
            <div className="methodology-split">
              <div className="methodology-hero-copy">
                <SectionLabel dark="true">Metodología Towers</SectionLabel>
                <h1 className="m-0 max-w-[680px] text-[clamp(2.6rem,5.5vw,5.3rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[#101820]">
                  <AnimatedText per="line">Aprender un idioma</AnimatedText>
                  <span>
                    <AnimatedText per="line">significa usarlo.</AnimatedText>
                  </span>
                </h1>
              <p>
                <AnimatedText>En TOWERS, el aprendizaje parte de la interacción. No se trata
                únicamente de estudiar estructuras o memorizar contenidos, sino de
                desarrollar la capacidad de comprender, comunicarte y utilizar el idioma
                en diferentes situaciones.</AnimatedText>
              </p>
                
              </div>
              <img
                className="methodology-hero-image"
                src="/images/Presencial.jpg"
                alt="Docente impartiendo una clase presencial a sus estudiantes"
              />
            </div>
          </div>
        </section>

        <section className="methodology-intro">
          <div className="methodology-intro__container">
            <div className="methodology-intro__copy">
              <SectionLabel>Modalidades</SectionLabel>
              <h2 className="methodology-intro__title">
                <AnimatedText>Clase introductoria</AnimatedText>
              </h2>
              <p>
                <AnimatedText>
                  Conoce una experiencia de aprendizaje basada en práctica e interacción.
                </AnimatedText>
              </p>
            </div>

            <div
              className="methodology-intro__video"
              role="img"
              aria-label="Vista previa de una clase de idiomas de Towers"
            >
              <img
                src="/images/TOWERS/TOWERS/fotos/DSC06726.jpg.jpeg"
                alt=""
              />
              <div className="methodology-intro__video-veil" aria-hidden="true" />
              <span className="methodology-intro__play" aria-hidden="true">
                <Play fill="currentColor" size={30} />
              </span>
              <div className="methodology-intro__controls" aria-hidden="true">
                <span className="methodology-intro__progress"><span /></span>
                <span>5:23</span>
                <span className="methodology-intro__duration">15:45</span>
              </div>
            </div>
          </div>
        </section>

        <section className="methodology-learning" aria-labelledby="methodology-learning-title">
          <div className="methodology-learning__container">
            <h2 className="sr-only" id="methodology-learning-title">
              Lo que trabajamos en clase
            </h2>
            <div className="methodology-learning__grid">
              {learningGoals.map(({ title, description, icon: Icon }, index) => (
                <article className="methodology-learning__card" key={title}>
                  <div className="methodology-learning__meta">
                    <span className="methodology-learning__number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Icon
                      className="methodology-learning__icon"
                      size={42}
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Methodology
