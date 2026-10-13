import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const studyOptions = [
  {
    title: 'Clases grupales',
    description: 'Aprende en comunidad',
    path: '/modalidades',
    icon: UsersRound,
  },
  {
    title: 'Clases personalizadas',
    description: 'Un plan para ti',
    path: '/modalidades',
    icon: UserRoundCheck,
  },
  {
    title: 'Inglés empresarial',
    description: 'Impulsa tu negocio',
    path: '/experiencia-towers',
    icon: BriefcaseBusiness,
  },
]

function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white px-[5%] pb-20 pt-14 text-white sm:pb-24 sm:pt-16 lg:px-[7%]">
      <div
        className="absolute inset-x-0 bottom-[90px] top-0 bg-cover bg-center"
        style={{ backgroundImage: "url('')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-[90px] top-0 bg-[linear-gradient(90deg,rgb(3_24_58_/_88%)_0%,rgb(10_25_57_/_70%)_38%,rgb(136_20_35_/_72%)_72%,rgb(239_58_48_/_76%)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1320px]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1fr] lg:gap-14">
          <div className="max-w-[700px]">
            
            <h2 className="m-0 max-w-[620px] text-3xl font-bold italic leading-[1.02] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
              Una sola experiencia,
              <br />
              distintas formas.
            </h2>
            <p className="mt-5 max-w-[600px] text-base leading-[1.5] text-white/85 sm:text-lg">
              Puedes estudiar presencialmente en la sede de Cúcuta, online en vivo desde donde estés, o combinando ambas. La metodología, los profesores y el enfoque de interacción se mantienen igual.
            </p>
            <NavLink
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#f33d35] px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_25px_rgb(0_0_0_/_15%)] transition hover:-translate-y-0.5 hover:bg-[#df3029] sm:max-w-[520px]"
              to="/modalidades"
            >
              Conocer cómo estudiar
              <ArrowRight className="ml-3 h-6 w-6" aria-hidden="true" />
            </NavLink>
          </div>

          <div className="rounded-[1.4rem] bg-white p-4 text-[#071026] shadow-[0_20px_50px_rgb(0_0_0_/_20%)] sm:p-5">
            <div className="space-y-3">
              {studyOptions.map(({ title, description, path, icon: Icon }) => (
                <NavLink
                  className="group flex items-center gap-4 rounded-xl p-2 transition hover:bg-[#fff1ee]"
                  key={title}
                  to={path}
                >
                  <span className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-[1.2rem] bg-[#fff0eb] text-[#7d2118]">
                    <Icon className="h-10 w-10" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block text-xl font-bold leading-tight sm:text-2xl">
                      {title}
                    </strong>
                    <span className="mt-1 block text-base text-[#8a919b]">
                      {description}
                    </span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#fff0eb] text-[#7d2118] transition group-hover:bg-[#f33d35] group-hover:text-white">
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-10 flex translate-y-1/2 flex-col justify-between gap-4 rounded-[1.3rem] bg-white p-5 text-[#071026] shadow-[0_16px_35px_rgb(0_0_0_/_25%)] sm:flex-row sm:items-center sm:p-6 lg:mt-12">
          <div>
            <h3 className="m-0 text-2xl font-bold italic tracking-[-0.04em] sm:text-3xl">
              ¿Buscas formación para tu equipo?
            </h3>
            <p className="mt-2 text-sm text-[#405878] sm:text-base">
              Proceso y propuesta diferenciados para empresas.
            </p>
          </div>
          <NavLink
            className="inline-flex items-center justify-center rounded-lg bg-[#f33d35] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#df3029] sm:min-w-[320px]"
            to="/contacto"
          >
            Towers para empresas
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
