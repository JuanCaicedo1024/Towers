import {
  ArrowRight,
  Award,
  ChartNoAxesColumnIncreasing,
  Clock3,
  Laptop,
  Layers3,
  ListChecks,
  MessageCircle,
  Target,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const languages = [
  {
    name: 'Inglés',
    image: '/images/languages/backgrounds/english.webp',
    testUrl: 'https://admin.towers.com.co/quiz/link/placement_test',
  },
  {
    name: 'Francés',
    image: '/images/languages/backgrounds/french.webp',
    testUrl: 'https://admin.towers.com.co/quiz/link/test_de_niveau',
  },
  {
    name: 'Alemán',
    image: '/images/languages/backgrounds/german.webp',
    testUrl: 'https://admin.towers.com.co/quiz/link/einstufungstest',
  },
  {
    name: 'Portugués',
    image: '/images/languages/backgrounds/portuguese.webp',
    testUrl: 'https://admin.towers.com.co/quiz/link/teste_de_nivelamento',
  },
  {
    name: 'Italiano',
    image: '/images/languages/backgrounds/italian.webp',
    testUrl: 'https://admin.towers.com.co/quiz/link/test_di_collocamento',
  },
]

const steps = [
  {
    title: 'Elige tu idioma',
    description: 'Selecciona el idioma que quieres evaluar.',
    Icon: Laptop,
  },
  {
    title: 'Responde el cuestionario',
    description: 'Contesta unas preguntas breves sobre tus conocimientos.',
    Icon: ListChecks,
  },
  {
    title: 'Recibe orientación y siguiente paso',
    description: 'Obtén un resultado orientativo y conoce el programa más adecuado para ti.',
    Icon: Award,
  },
]

const benefits = [
  { text: 'La prueba no toma mucho tiempo.', Icon: Clock3 },
  { text: 'Te ayudará a identificar el programa más adecuado.', Icon: Layers3 },
  { text: 'Si prefieres, también puedes hablar con un asesor.', Icon: MessageCircle },
]

function LevelTest() {
  return (
    <>
      <Navbar />
      <main className="text-[#111827]">
        <section className="relative overflow-hidden bg-[#fff7f5]">
          <div className="pointer-events-none absolute -left-16 bottom-[-4rem] h-40 w-40 rounded-full bg-[#fce5e1]" aria-hidden="true" />
          <div className="pointer-events-none absolute right-[-3rem] top-24 h-44 w-44 rounded-full bg-[#fce5e1]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 px-[6%] py-12 sm:py-16 lg:min-h-[500px] lg:grid-cols-[1fr_0.95fr] lg:gap-14 lg:py-16">
            <div className="relative z-10">
              <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#e83e33]">
                <ChartNoAxesColumnIncreasing className="h-6 w-6" strokeWidth={2.5} aria-hidden="true" />
                Prueba de nivel
              </p>
              <h1 className="mt-5 max-w-[650px] text-[clamp(2.5rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#111827]">
                Descubre tu nivel y encuentra el mejor camino para <span className="text-[#e83e33]">aprender un idioma.</span>
              </h1>
              <p className="mt-5 max-w-[590px] text-base leading-7 text-[#4b5563] sm:text-lg">
                Elige un idioma, responde un breve cuestionario y te guiaremos con
                una recomendación para avanzar en tu aprendizaje.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#e83e33] px-6 py-3 text-base font-bold text-white shadow-[0_8px_18px_rgb(232_62_51_/_22%)] transition hover:-translate-y-0.5 hover:bg-[#cf3028] hover:shadow-[0_12px_24px_rgb(232_62_51_/_28%)]"
                  href="#idiomas"
                >
                  Empezar ahora
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-[#8493a8] bg-white/70 px-6 py-3 text-base font-semibold text-[#111827] transition hover:-translate-y-0.5 hover:border-[#111827] hover:bg-white"
                  to="/idiomas"
                >
                  Conocer programas
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-[#4b5563]">
                <span className="inline-flex items-center gap-2"><Zap className="h-5 w-5 text-[#e83e33]" aria-hidden="true" />Rápido</span>
                <span className="hidden h-6 border-l border-[#efb8b0] sm:block" aria-hidden="true" />
                <span className="inline-flex items-center gap-2"><Target className="h-5 w-5 text-[#e83e33]" aria-hidden="true" />Orientativo</span>
                <span className="hidden h-6 border-l border-[#efb8b0] sm:block" aria-hidden="true" />
                <span className="inline-flex items-center gap-2"><Laptop className="h-5 w-5 text-[#e83e33]" aria-hidden="true" />100% online</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] lg:justify-self-end">
              <div className="absolute -inset-4 rotate-[-4deg] rounded-[2.5rem] bg-[#f7d8d4]" aria-hidden="true" />
              <img
                className="relative aspect-[1.2/1] w-full rounded-[2rem] border-[6px] border-white object-cover object-center shadow-[0_18px_40px_rgb(23_35_58_/_18%)]"
                src="/images/classroom/DSC06726.webp"
                alt="Estudiantes aprendiendo idiomas durante una clase en Towers"
                fetchPriority="high"
              />
              <span className="absolute -right-2 -top-5 rotate-12 text-5xl font-black tracking-[-0.2em] text-[#e83e33]" aria-hidden="true">!!!</span>
            </div>
          </div>
        </section>

        <section id="idiomas" className="scroll-mt-24 bg-white px-[6%] py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1320px] text-center">
            <h2 className="text-3xl font-bold tracking-[-0.045em] text-[#111827] sm:text-4xl">
              Selecciona el idioma que quieres evaluar
            </h2>
            <p className="mt-3 text-base text-[#4b5563] sm:text-lg">
              Elige una opción para continuar al cuestionario correspondiente.
            </p>
            <div className="mt-9 grid grid-cols-2 justify-items-center gap-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
              {languages.map(({ name, image, testUrl }) => (
                <a
                  className="group relative aspect-square w-full max-w-[220px] overflow-hidden rounded-full shadow-[0_10px_24px_rgb(23_35_58_/_15%)] transition duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_18px_32px_rgb(23_35_58_/_24%)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#e83e33]"
                  href={testUrl}
                  key={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Iniciar prueba de nivel de ${name} (abre en una pestaña nueva)`}
                >
                  <img className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src={image} alt="" aria-hidden="true" />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#071026]/75 via-[#071026]/10 to-transparent" aria-hidden="true" />
                  <span className="absolute inset-x-2 bottom-[27%] text-2xl font-bold tracking-[-0.04em] text-white drop-shadow sm:text-3xl">
                    {name}
                  </span>
                  <span className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#111827] transition-colors group-hover:bg-[#e83e33] group-hover:text-white">
                    Iniciar
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-[6%] pb-14 sm:pb-16 lg:pb-20">
          <div className="mx-auto max-w-[1320px]">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#e83e33]">
              Cómo funciona
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.045em] text-[#111827] sm:text-4xl">
              Un proceso simple y rápido
            </h2>
            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              {steps.map(({ title, description, Icon }, index) => (
                <article className="relative rounded-2xl border border-[#e7e9ed] bg-white p-6 shadow-[0_8px_22px_rgb(23_35_58_/_5%)]" key={title}>
                  <Icon className="h-10 w-10 text-[#e83e33]" strokeWidth={1.8} aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-[#111827]">{title}</h3>
                  <p className="mt-2 text-base leading-6 text-[#4b5563]">{description}</p>
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 bg-white p-1 text-[#e83e33] lg:block" aria-hidden="true" />
                  )}
                </article>
              ))}
            </div>
            <div className="mt-7 grid gap-5 rounded-2xl bg-[#fff7f5] px-5 py-6 sm:grid-cols-3 sm:px-7">
              {benefits.map(({ text, Icon }) => (
                <div className="flex items-center gap-4 text-sm font-medium leading-5 text-[#4b5563]" key={text}>
                  <Icon className="h-8 w-8 shrink-0 text-[#e83e33]" strokeWidth={1.8} aria-hidden="true" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default LevelTest
