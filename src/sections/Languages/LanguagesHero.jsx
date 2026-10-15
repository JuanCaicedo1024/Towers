import { ArrowRight, ChartNoAxesColumnIncreasing, Star, UsersRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const highlights = [
  { label: 'Método práctico y conversacional', icon: UsersRound },
  { label: 'Profesores expertos', icon: ChartNoAxesColumnIncreasing },
  { label: 'Resultados reales en tu vida', icon: Star },
]

function LanguagesHero() {
  return (
    <section className="overflow-hidden bg-[#f7f4f3] px-[6%] py-14 text-[#071026] lg:px-[10%] lg:py-20">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="max-w-[590px]">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#f13d35]">
            IDIOMAS
          </p>
          <h1 className="mt-4 text-4xl font-bold italic leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            ¿Qué idioma quieres
            <br />
            aprender?
          </h1>
          <p className="mt-6 max-w-[530px] text-base leading-[1.55] text-[#183454] sm:text-lg">
            Towers ofrece distintas alternativas para aprender una segunda lengua mediante un enfoque de interacción: el idioma se practica y se aplica en situaciones reales.
          </p>
          <NavLink
            className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-[#f13d35] px-6 py-4 text-base font-bold text-white shadow-[0_8px_18px_rgb(241_61_53_/_22%)] transition hover:-translate-y-0.5 hover:bg-[#d92f29] sm:max-w-[315px]"
            to="#programas"
          >
            Encuentra tu programa
            <ArrowRight className="ml-3 h-5 w-5" aria-hidden="true" />
          </NavLink>

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

        <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[#d8c9c6] sm:min-h-[470px] lg:min-h-[560px]">
          <img
            className="absolute inset-0 h-full w-full object-cover object-center"
            src="/images/Lenguajes.png"
            alt="Estudiante de Towers aprendiendo idiomas"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#193454]/25 via-transparent to-white/15" aria-hidden="true" />
          <p className="absolute left-8 top-8 max-w-[180px] text-2xl font-semibold italic leading-[1.05] text-white drop-shadow-md sm:left-12 sm:top-10 sm:text-3xl">
            El mejor lugar
            <br />
            para aprender
            <br />
            y crecer
          </p>
        </div>
      </div>
    </section>
  )
}

export default LanguagesHero
