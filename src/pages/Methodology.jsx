import AnimatedText from '@/components/ui/AnimatedText';
import {
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  MessageCircle,
  Play,
  Plane,
  UsersRound,
} from 'lucide-react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const learningContexts = [
  {
    title: 'Una conversación',
    description: 'Expresa tus ideas, escucha y responde con naturalidad.',
    icon: MessageCircle,
  },
  {
    title: 'Una situación cotidiana',
    description: 'Usa el idioma en actividades y momentos de todos los días.',
    icon: MapPin,
  },
  {
    title: 'Un viaje',
    description: 'Comunícate al pedir indicaciones, hacer reservas y conocer lugares.',
    icon: Plane,
  },
  {
    title: 'Un contexto académico',
    description: 'Comprende instrucciones, participa en clase y comparte tus ideas.',
    icon: GraduationCap,
  },
  {
    title: 'Un contexto profesional',
    description: 'Aplica el idioma en reuniones, tareas y conversaciones de trabajo.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Interacción social',
    description: 'Conecta con otras personas y participa en distintos espacios sociales.',
    icon: UsersRound,
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
            <header className="methodology-learning__header">
              <p className="methodology-learning__eyebrow">Contextos reales</p>
              <h2 id="methodology-learning-title">
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
              {learningContexts.map(({ title, description, icon: Icon }, index) => (
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

export default Methodology
