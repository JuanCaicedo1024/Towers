import { ArrowRight, BookOpen, BriefcaseBusiness, Building2, ChartNoAxesColumnIncreasing, ChartNoAxesCombined, GraduationCap, MessagesSquare, Mic, Plane, MessageCircle, Monitor, Star, Trophy, UsersRound } from 'lucide-react'
import { NavLink, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import FAQ from '../sections/Home/FAQ'

const languagePrograms = {
  ingles: { name: 'inglés', flag: '🇬🇧', intro: 'Programa de Inglés con enfoque de interacción: práctica guiada con profesores y aplicación del idioma en situaciones reales.', levels: 'Inicial · Básico · Intermedio · Avanzado', image: '/images/Ingles.png' },
  frances: { name: 'francés', flag: '🇫🇷', intro: 'Aprende francés con práctica guiada, interacción y aplicación en situaciones cotidianas.', levels: 'Inicial · Básico · Intermedio', image: '/images/frances.png' },
  portugues: { name: 'portugués', flag: '🇧🇷', intro: 'Comunícate en portugués con confianza a través de práctica guiada y situaciones de la vida real.', levels: 'Inicial · Básico · Intermedio', image: '/images/brazil.png' },
  aleman: { name: 'alemán', flag: '🇩🇪', intro: 'Construye una base sólida en alemán con estructura, práctica guiada e interacción.', levels: 'Inicial · Básico · Intermedio', image: '/images/alemania.png' },
  italiano: { name: 'italiano', flag: '🇮🇹', intro: 'Acércate al italiano a través de la práctica, la interacción y su cultura.', levels: 'Inicial · Básico', image: '/images/italia.png' },
}

const highlights = [
  { label: 'Método práctico y conversacional', icon: UsersRound },
  { label: 'Profesores expertos', icon: ChartNoAxesColumnIncreasing },
  { label: 'Resultados reales en tu vida', icon: Star },
]
const goals = [
  ['Crecer profesionalmente', BriefcaseBusiness],
  ['Vivir en otro país', Plane],
  ['Estudiar', GraduationCap],
  ['Viajar', Plane],
  ['Comunicarte con confianza', MessageCircle],
]
const methodologySteps = [
  ['Comprendes', 'Bases sólidas de gramática y vocabulario en contextos reales.', BookOpen],
  ['Practicas', 'Conversación constante y actividades dinámicas.', Mic],
  ['Aplicas', 'Usas lo aprendido en situaciones de tu vida real.', MessagesSquare],
  ['Consolidas', 'Refuerzas tu aprendizaje con retroalimentación continua.', ChartNoAxesCombined],
  ['Avanzas', 'Alcanzas tus objetivos con el acompañamiento de nuestros profesores.', Trophy],
]
const modalities = [
  ['Presencial', UsersRound],
  ['Online', Monitor],
  ['Híbrida', Building2],
]
const teachers = [
  ['Salman Khan', 'Founder and CEO of Khan Academy', 'Salman Amin Khan, referente internacional en educación y aprendizaje accesible.'],
  ['Carlos Hernández', 'Docente de Inglés', 'Enseñanza de inglés para niños, adolescentes y adultos de diferentes niveles.'],
  ['Ricardo Suarez Blanco', 'Docente de Inglés', 'Docente de lenguas extranjeras enfocado en desarrollar habilidades comunicativas.'],
]

function LanguageTemplate() {
  const { language } = useParams()
  const program = languagePrograms[language?.toLowerCase()]

  if (!program) return <><Navbar /><main className="grid min-h-[60vh] place-items-center px-6 text-center"><div><h1 className="text-4xl font-semibold text-[#071026]">Idioma no encontrado</h1><NavLink className="mt-6 inline-flex rounded-xl bg-[#e83e33] px-5 py-3 font-semibold text-white" to="/idiomas">Ver todos los idiomas</NavLink></div></main><Footer /></>

  const whatsappMessage = `Hola, quiero información sobre el curso de ${program.name}.`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <>
      <Navbar />
      <main className="bg-[#f7f4f3] text-[#071026]">
        <section className="overflow-hidden px-[6%] py-14 lg:px-[10%] lg:py-20">
          <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div className="max-w-[590px]">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#f13d35]">
                IDIOMAS
              </p>
              <h1 className="mt-4 text-4xl font-bold italic leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Aprende {program.name} para
                <br />
                usarlo donde realmente
                <br />
                importa.
              </h1>
              <p className="mt-6 max-w-[530px] text-base leading-[1.55] text-[#183454] sm:text-lg">
                {program.intro}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#f13d35] px-6 py-4 text-base font-bold text-white shadow-[0_8px_18px_rgb(241_61_53_/_22%)] transition hover:-translate-y-0.5 hover:bg-[#d92f29]"
                  href={whatsappUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Escríbenos por WhatsApp
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <NavLink
                  className="inline-flex items-center justify-center rounded-xl border-2 border-[#f13d35] px-6 py-3.5 text-base font-bold text-[#f13d35] transition hover:bg-[#fff0eb]"
                  to="/prueba-de-nivel"
                >
                  Haz tu prueba de nivel
                </NavLink>
              </div>

              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                {highlights.map(({ label, icon: Icon }) => (
                  <div className="flex min-h-[62px] items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-[0_5px_15px_rgb(23_35_58_/_8%)]" key={label}>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#fff0eb] text-[#8c281f]">
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="text-[11px] leading-[1.25] text-[#71809a]">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#183454] via-[#315d87] to-[#f13d35] sm:min-h-[470px] lg:min-h-[560px]">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 0 2px, transparent 3px), radial-gradient(circle at 80% 70%, white 0 2px, transparent 3px)', backgroundSize: '34px 34px, 48px 48px' }} aria-hidden="true" />
              <div className="absolute bottom-6 right-5 flex flex-row items-center gap-3 rounded-[8px] bg-white px-4 py-3 text-[#101820] shadow-[0_6px_16px_rgb(0_0_0_/_16%)] sm:bottom-8 sm:right-8">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#e6e9ed] bg-[#fff9f7] text-3xl leading-none" aria-label={`Bandera de ${program.name}`}>
                  {program.image ? (
                    <img src={program.image} alt={`Bandera de ${program.name}`} className="h-full w-full object-cover" />
                  ) : (
                    program.flag
                  )}
                </span>
                <span className="w-[145px] text-sm font-semibold leading-[1.15] sm:text-base">
                  Un mundo de oportunidades
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white px-[6%] py-14 lg:px-[10%] lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#071026]">
              LAS PERSONAS DETRÁS DE TU APRENDIZAJE
            </p>
            <h2 className="mt-5 max-w-[1100px] text-4xl font-bold italic leading-[1.02] tracking-[-0.05em] text-[#101820] sm:text-5xl lg:text-6xl">
              ¿Para qué quieres aprender un idioma?
            </h2>
            <p className="mt-6 text-base font-medium leading-[1.45] text-[#294d78] sm:text-lg">
              Estas categorías te ayudan a orientar tu búsqueda.
            </p>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
              {goals.map(([label, Icon]) => (
                <div
                  className={`group relative flex min-h-[158px] items-center gap-6 overflow-hidden rounded-[1.7rem] border-2 border-[#ead3cb] bg-white px-7 py-6 shadow-[0_8px_20px_rgb(23_35_58_/_8%)] transition duration-500 hover:-translate-y-2 hover:border-[#e83e33] hover:shadow-[0_18px_30px_rgb(232_62_51_/_18%)] ${label === 'Viajar' ? 'lg:col-start-2' : ''} lg:col-span-2`}
                  key={label}
                >
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#fff0eb] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                  <span className="relative grid h-[76px] w-[76px] shrink-0 place-items-center rounded-[1.35rem] bg-[#fff0eb] text-[#8b2b20] transition duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#f13d35] group-hover:text-white">
                    <Icon className="h-10 w-10 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="relative min-w-0 flex-1 text-xl font-bold leading-[1.15] text-[#071026] transition-colors duration-300 group-hover:text-[#e83e33] sm:text-2xl">
                    {label}
                  </span>
                  <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#fff0eb] text-[#8b2b20] transition duration-500 group-hover:translate-x-1 group-hover:bg-[#f13d35] group-hover:text-white">
                    <ArrowRight className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={2.2} aria-hidden="true" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#f7f4f3] px-[6%] py-14 lg:px-[3.55%] lg:py-20">
          <div className="mx-auto max-w-[1340px]">
            <h2 className="text-4xl font-bold italic leading-[1.05] tracking-[-0.045em] text-[#101820] sm:text-5xl lg:text-6xl">
              Así aprendes en Towers
            </h2>
            <p className="mt-3 max-w-[760px] text-base leading-6 text-[#183454] sm:text-lg">
              Interacción, cuatro habilidades, grupos semipersonalizados y aplicación en situaciones cotidianas.
            </p>

            <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
              {methodologySteps.map(([title, description, Icon], index) => (
                <article
                  className="flex min-h-[296px] min-w-[258px] snap-start flex-1 flex-col rounded-xl border border-[#d9dfe8] bg-white px-3.5 py-4 text-[#111827] shadow-[0_5px_8px_rgb(0_0_0_/_18%)] transition-transform duration-300 hover:-translate-y-1 sm:min-w-[270px] lg:min-h-0 lg:min-w-0 lg:aspect-[258/296]"
                  key={title}
                >
                  <span className="self-start text-left text-sm font-semibold text-[#9ca3af]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <Icon className="h-[112px] w-[112px] text-[#ff2d4d]" strokeWidth={1.8} aria-hidden="true" />
                    <h3 className="mt-5 text-[27px] font-extrabold leading-none tracking-[-0.045em]">
                      {title}
                    </h3>
                    <p className="mt-3 text-lg leading-6 text-[#263244]">{description}</p>
                  </div>
                </article>
              ))}
            </div>

            <NavLink
              className="mx-auto mt-5 flex max-w-[785px] items-center justify-center rounded-xl bg-[#f33d34] px-5 py-3.5 text-xl font-bold text-white shadow-sm transition hover:bg-[#df3029]"
              to="/metodologia"
            >
              Conocer nuestra metodología
              <ArrowRight className="ml-2 h-6 w-6" aria-hidden="true" />
            </NavLink>
          </div>
        </section>
        <section className="bg-white px-[6%] py-14 lg:px-[3.55%] lg:py-20">
          <div className="mx-auto max-w-[1340px]">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#071026]">
              MODALIDADES
            </p>
            <h2 className="mt-5 text-4xl font-bold italic leading-[1.05] tracking-[-0.045em] text-[#101820] sm:text-5xl lg:text-6xl">
              Cómo puedes estudiar
            </h2>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {modalities.map(([title, Icon]) => (
                <article
                  className="overflow-hidden rounded-xl border border-[#d9dfe8] bg-white shadow-[0_5px_8px_rgb(0_0_0_/_18%)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgb(23_35_58_/_14%)]"
                  key={title}
                >
                  <div className="relative flex h-[180px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#183454] to-[#f13d35]">
                    <span className="grid h-24 w-24 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                      <Icon className="h-12 w-12" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="absolute bottom-0 left-7 grid h-[82px] w-[102px] translate-y-1/2 place-items-center rounded-t-2xl bg-white text-[#f13d35]">
                      <Icon className="h-11 w-11" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="px-7 pb-6 pt-12">
                    <h3 className="text-2xl font-bold text-[#071026]">{title}</h3>
                    <p className="mt-4 min-h-[58px] text-base leading-6 text-[#4b5563]">
                      Salman Amin Khan, fundador y CEO de Khan Academy.
                    </p>
                    <NavLink
                      className="mt-5 flex items-center justify-center rounded-xl bg-[#08244a] px-5 py-3 text-lg font-bold text-white transition hover:bg-[#123b6e]"
                      to="/modalidades"
                    >
                      Ver perfil
                    </NavLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#f7f4f3] px-[6%] py-14 lg:px-[8%] lg:py-20">
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#071026]">
              LAS PERSONAS DETRÁS DE TU APRENDIZAJE
            </p>
            <h2 className="mt-5 max-w-[1100px] text-4xl font-bold italic leading-[1.02] tracking-[-0.05em] text-[#101820] sm:text-5xl lg:text-6xl">
              Conoce quién va a acompañar tu aprendizaje
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {teachers.map(([name, role, description]) => (
                <article
                  className="group relative overflow-hidden rounded-[1.5rem] border border-[#d9dfe8] bg-white shadow-[0_10px_24px_rgb(23_35_58_/_10%)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_20px_34px_rgb(23_35_58_/_18%)]"
                  key={name}
                >
                  <div className="relative flex h-[220px] items-end overflow-hidden bg-gradient-to-br from-[#183454] via-[#315d87] to-[#f13d35] p-6">
                    <div className="absolute -right-8 -top-10 h-44 w-44 rounded-full border-[24px] border-white/15 transition duration-500 group-hover:scale-125" aria-hidden="true" />
                    <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full border-[26px] border-white/10 transition duration-500 group-hover:scale-110" aria-hidden="true" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/15 text-4xl font-bold text-white backdrop-blur-sm">
                      {name.charAt(0)}
                    </div>
                    <span className="absolute bottom-4 right-4 grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-white text-3xl leading-none shadow-md" aria-label={`Bandera de ${program.name}`}>
                      {program.flag}
                    </span>
                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#e83e33] backdrop-blur-sm">
                      Towers team
                    </span>
                  </div>
                  <div className="relative p-6">
                    <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-[#071026]">{name}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#e83e33]">{role}</p>
                    <p className="mt-4 min-h-[72px] text-base leading-6 text-[#4b5563]">{description}</p>
                    <NavLink
                      className="mt-5 flex items-center justify-between rounded-xl bg-[#08244a] px-5 py-3 text-base font-bold text-white transition group-hover:bg-[#e83e33]"
                      to="/contacto"
                    >
                      <span>Conocer perfil</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </NavLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="overflow-hidden bg-white px-[6%] py-14 lg:px-[8%] lg:py-20">
          <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="max-w-[540px]">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#f13d35]">
                IDIOMAS
              </p>
              <h2 className="mt-5 text-5xl font-bold italic leading-[1.02] tracking-[-0.05em] text-[#101820] sm:text-6xl">
                La práctica continúa fuera del salón
              </h2>
              <p className="mt-7 max-w-[500px] text-lg leading-7 text-[#294d78]">
                Club y comunidad, actividades e interacción entre estudiantes.
              </p>
              <NavLink
                className="mt-8 inline-flex items-center gap-5 rounded-xl bg-[#f13d35] px-8 py-4 text-lg font-bold text-white shadow-[0_8px_18px_rgb(241_61_53_/_22%)] transition hover:-translate-y-0.5 hover:bg-[#d92f29]"
                to="/experiencia-towers"
              >
                Descubrir Experiencia Towers
                <ArrowRight className="h-6 w-6" aria-hidden="true" />
              </NavLink>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                'Comunidad que te impulsa',
                'Actividades en la vida real',
              ].map((title, index) => (
                <NavLink
                  className={`group relative min-h-[390px] overflow-hidden rounded-[2rem] ${index === 0 ? 'bg-[#183454]' : 'bg-[#f13d35]'}`}
                  key={title}
                  to="/experiencia-towers"
                >
                  <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full border-[34px] border-white/15 transition duration-500 group-hover:scale-125" aria-hidden="true" />
                  <div className="absolute -bottom-24 -left-12 h-72 w-72 rounded-full border-[42px] border-white/10 transition duration-500 group-hover:rotate-12 group-hover:scale-110" aria-hidden="true" />
                  <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#f13d35]/90 text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:bg-[#f13d35]">
                    <span className="ml-1 text-3xl" aria-hidden="true">▶</span>
                  </span>
                  <span className="absolute bottom-7 left-6 right-6 text-3xl font-bold italic leading-[1.05] text-white sm:text-4xl">
                    {title}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </section>
      </main>


      
      <FAQ />
      <Footer />
    </>
  )
}

export default LanguageTemplate
