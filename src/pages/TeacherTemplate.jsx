import AnimatedText from '@/components/ui/AnimatedText'
import { ArrowRight, AudioLines, BookOpen, FileText, Globe2, MessageCircle, Star } from 'lucide-react'
import { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { getTeacherById } from '../data/teachers'

const teachingSkills = [
  {
    title: 'Conversación',
    description: 'Desarrollo progresivo de la capacidad de expresarse y participar en diferentes situaciones.',
    Icon: MessageCircle,
  },
  {
    title: 'Comprensión auditiva',
    description: 'Trabajo orientado a comprender mensajes, conversaciones e información oral.',
    Icon: Star,
  },
  {
    title: 'Comunicación profesional',
    description: 'Práctica del idioma aplicada a situaciones relacionadas con contextos laborales.',
    Icon: BookOpen,
  },
  {
    title: 'Pronunciación',
    description: 'Acompañamiento para mejorar claridad, comprensión y seguridad al expresarse.',
    Icon: AudioLines,
  },
  {
    title: 'Vocabulario en contexto',
    description: 'Aprender vocabulario relacionado con situaciones y objetivos concretos.',
    Icon: FileText,
  },
  {
    title: 'Confianza al hablar',
    description: 'Generar más oportunidades de participación y práctica durante el proceso.',
    Icon: Globe2,
  },
]

function TeacherTemplate() {
  const { id } = useParams()
  const teacher = getTeacherById(id)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!teacher) {
    return (
      <>
        <Navbar />
        <main className="grid min-h-[60vh] place-items-center bg-[#fff8f6] px-6 text-center text-[#17233a]">
          <div>
            <h1 className="text-4xl font-semibold"><AnimatedText>Docente no encontrado</AnimatedText></h1>
            <NavLink className="mt-6 inline-flex rounded-xl bg-[#f13d35] px-5 py-3 font-semibold text-white" to="/idiomas">Ver idiomas</NavLink>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="language-template language-template--enter bg-[#fff8f6] text-[#17233a]" key={teacher.id}>
        <section className="teacher-profile-hero overflow-hidden bg-white px-[6%] py-14 lg:px-[10%] lg:py-20">
          <div className="teacher-profile-hero__grid mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="teacher-profile-hero__copy min-w-0">
              <h1 className="text-4xl font-extrabold italic leading-[1.02] tracking-[-0.05em] text-black sm:text-5xl lg:text-6xl">
                <AnimatedText>{teacher.name}</AnimatedText>
              </h1>
              <p className="teacher-profile-hero__details mt-2 text-sm font-bold text-[#f13d35]">
                <AnimatedText delay={0.15}>
                  {`Docente de ${teacher.languageName} · ${teacher.location} · ${teacher.modality.join(' · ')}`}
                </AnimatedText>
              </p>
              <p className="mt-5 max-w-[590px] text-base leading-[1.6] text-black sm:text-lg">
                <AnimatedText delay={0.3}>{teacher.biography}</AnimatedText>
              </p>
              <NavLink
                className="language-action mt-6 flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#f13d35] px-6 py-4 text-base font-bold text-white shadow-[0_8px_18px_rgb(241_61_53_/_22%)]"
                to={`/idiomas/${teacher.language}`}
              >
                Ver programas de {teacher.languageName} <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </NavLink>
            </div>
            <div className="teacher-profile-hero__portrait relative mx-auto min-h-[360px] w-full max-w-[590px] overflow-hidden rounded-[2rem] border-[7px] border-white bg-[#f5f5f5] shadow-[0_14px_36px_rgb(23_35_58_/_18%)] sm:min-h-[470px] lg:min-h-[560px]">
              <img src={teacher.photo} alt={`Foto de ${teacher.name}`} className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="teacher-profile-story bg-white px-[6%] py-14 lg:px-[10%] lg:py-20">
          <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
            <div className="teacher-profile-story__copy min-w-0">
              <p className="font-mono text-xs font-extrabold uppercase tracking-[0.12em] text-[#f13d35]">
                IDIOMAS
              </p>
              <h2 className="mt-1 max-w-[700px] text-4xl font-extrabold italic leading-[1.02] tracking-[-0.05em] text-black sm:text-5xl lg:text-6xl">
                <AnimatedText per="line">Enseñar un idioma también significa crear espacios para utilizarlo.</AnimatedText>
              </h2>
              <p className="mt-4 text-base leading-7 text-black sm:text-lg">
                {teacher.biography}
              </p>
              <p className="mt-2 text-base leading-7 text-black sm:text-lg">
                En sus clases, la participación tiene un papel central: preguntar, escuchar, responder y volver a intentar forman parte natural del aprendizaje.
              </p>
              <NavLink
                className="language-action mt-5 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#f13d35] px-6 py-4 text-base font-bold text-white shadow-[0_8px_18px_rgb(241_61_53_/_22%)] sm:w-auto"
                to="/experiencia-towers"
              >
                Descubrir Experiencia Towers <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </NavLink>
            </div>
            <div className="teacher-profile-story__image group relative min-h-[320px] overflow-hidden rounded-[2rem] bg-[#17233a] sm:min-h-[440px] lg:min-h-[560px]">
              <img
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/images/Sinfoto.png"
                alt="Imagen de perfil docente pendiente"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" aria-hidden="true" />
              <p className="absolute inset-x-5 bottom-6 text-center text-3xl font-extrabold italic leading-tight text-white drop-shadow-lg sm:inset-x-8 sm:bottom-8 sm:text-5xl">
                <AnimatedText>{`Clases con ${teacher.name}`}</AnimatedText>
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-[6%] py-14 lg:px-[10%] lg:py-20">
          <div className="mx-auto max-w-[920px]">
            <p className="text-center font-mono text-xs font-extrabold uppercase tracking-[0.12em] text-[#f13d35]">
              FORMACIÓN
            </p>
            <h2 className="mt-2 text-center text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] text-black sm:text-5xl">
              Preparación académica para enseñar.
            </h2>
            <ol className="mx-auto mt-12 max-w-[760px] space-y-10 border-l-2 border-[#d1d5db] pl-7 text-left sm:pl-10">
              {teacher.certifications.map((certification, index) => (
                <li className="relative" key={certification}>
                  <span
                    className="absolute -left-[2.18rem] top-1 h-4 w-4 rounded-full border-[3px] border-[#294d78] bg-white sm:-left-[2.93rem]"
                    aria-hidden="true"
                  />
                  <p className="font-mono text-sm font-extrabold text-[#f13d35]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-2 text-lg leading-7 text-black sm:text-xl">
                    {certification}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#f7f7f7] px-[6%] py-14 lg:px-[8%] lg:py-20">
          <div className="mx-auto max-w-[1440px]">
            
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {teachingSkills.map(({ title, description, Icon }, index) => (
                <article
                  className="teacher-skill-card rounded-2xl bg-white p-6 shadow-[0_8px_20px_rgb(0_0_0_/_7%)]"
                  key={title}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xl font-extrabold text-[#9ca3af]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Icon className="h-8 w-8 text-[#f13d35]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold uppercase tracking-[-0.035em] text-black">
                    {title}
                  </h3>
                  <p className="mt-3 text-base leading-6 text-black">
                    {description}
                  </p>
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

export default TeacherTemplate
