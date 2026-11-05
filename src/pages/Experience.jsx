import AnimatedText from '@/components/ui/AnimatedText';
import {
  AudioLines,
  BookOpen,
  FileText,
  Globe,
  MessageCircle,
  Play,
  Star,
} from 'lucide-react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const experienceSkills = [
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
    icon: FileText,
  },
  {
    title: 'Confianza al hablar',
    description: 'Generar más oportunidades de participación y práctica durante el proceso.',
    icon: Globe,
  },
]

function Eyebrow({ children }) {
  return <span className="experience-eyebrow">{children}</span>
}

function Experience() {
  return (
    <>
      <Navbar />
      <main className="experience-page">
        <section className="experience-dark experience-hero">
          <div className="experience-container">
            <div className="experience-split experience-feature experience-feature--hero">
              <div className="experience-feature__copy">
                <Eyebrow>Experiencia Towers</Eyebrow>
                <h1><AnimatedText>Aprender un idioma significa usarlo.</AnimatedText></h1>
                <p>
                  <AnimatedText>En TOWERS, el aprendizaje parte de la interacción. No se trata únicamente de estudiar estructuras o memorizar contenidos, sino de desarrollar la capacidad de comprender, comunicarte y utilizar el idioma en diferentes situaciones.</AnimatedText>
                </p>
              </div>
              <div className="experience-feature__visual experience-feature__visual--hero">
                <img
                  src="/images/TOWERS/TOWERS/fotos/DSC06700.jpg.jpeg"
                  alt="Estudiantes de Towers practicando inglés en clase"
                  fetchPriority="high"
                />
                <span className="experience-feature__shade" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <section className="experience-light">
          <div className="experience-container experience-split experience-feature experience-feature--community">
            <div className="experience-feature__visual experience-feature__visual--community">
              <img
                src="/images/TOWERS/TOWERS/fotos/DSC06683.jpg.jpeg"
                alt="Estudiantes compartiendo y practicando en comunidad"
                loading="lazy"
              />
              <span className="experience-feature__shade" aria-hidden="true" />
            </div>
            <div className="experience-feature__copy">
              <Eyebrow>Comunidad Towers</Eyebrow>
              <h2><AnimatedText>El idioma se practica mejor cuando también forma parte de tu vida.</AnimatedText></h2>
              <p>
                <AnimatedText>TOWERS cuenta con espacios de comunidad y encuentro donde los estudiantes
                pueden compartir, conversar y seguir usando el idioma en un entorno diferente
                al de una clase tradicional.</AnimatedText>
              </p>
              <p>
                <AnimatedText>La idea es crear más oportunidades para interactuar, perder el miedo a
                participar y relacionar lo aprendido con conversaciones y situaciones más naturales.</AnimatedText>
              </p>
            </div>
          </div>
        </section>

        <section className="methodology-intro experience-intro">
          <div className="methodology-intro__container">
            <div className="methodology-intro__copy">
              <Eyebrow>Modalidades</Eyebrow>
              <h2 className="methodology-intro__title">
                <AnimatedText>Clase introductoria</AnimatedText>
              </h2>
              <p>
                <AnimatedText>Conoce una experiencia de aprendizaje basada en práctica e interacción.</AnimatedText>
              </p>
            </div>
            <div
              className="methodology-intro__video"
              role="img"
              aria-label="Vista previa de una clase de idiomas de Towers"
            >
              <img src="/images/TOWERS/TOWERS/fotos/DSC06726.jpg.jpeg" alt="" loading="lazy" />
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

        <section className="methodology-learning experience-skills" aria-labelledby="experience-skills-title">
          <div className="methodology-learning__container">
            <header className="methodology-learning__header">
              <p className="methodology-learning__eyebrow">Competencias</p>
              <h2 id="experience-skills-title">
                El idioma cobra sentido cuando aparece fuera del ejercicio.
              </h2>
              <div className="methodology-learning__copy">
                <p className="methodology-learning__lead">
                  La documentación de TOWERS señala el uso de situaciones de la vida cotidiana como parte de su enfoque.
                </p>
                <p className="methodology-learning__description">
                  El objetivo es que el estudiante pueda relacionar lo aprendido con contextos en los que necesita comprender, responder o comunicarse.
                </p>
              </div>
            </header>
            <div className="methodology-learning__grid">
              {experienceSkills.map(({ title, description, icon: Icon }, index) => (
                <article className="methodology-learning__card" key={title}>
                  <div className="methodology-learning__meta">
                    <span className="methodology-learning__number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="methodology-learning__icon-wrap">
                      <Icon
                        className="methodology-learning__icon"
                        size={28}
                        strokeWidth={2.2}
                        aria-hidden="true"
                      />
                    </span>
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

export default Experience
