import {
  BookOpen,
  ChartNoAxesCombined,
  MessagesSquare,
  Mic,
  Trophy,
} from 'lucide-react'

const methodologySteps = [
  {
    number: '01',
    title: 'Comprendes',
    description: 'Escuchas + lees.',
    icon: BookOpen,
  },
  {
    number: '02',
    title: 'Practicas',
    description: 'Conversación + interacción.',
    icon: Mic,
  },
  {
    number: '03',
    title: 'Aplicas',
    description: 'Situaciones reales.',
    icon: MessagesSquare,
  },
  {
    number: '04',
    title: 'Consolidas',
    description: 'Hablas + escribes.',
    icon: ChartNoAxesCombined,
  },
  {
    number: '05',
    title: 'Avanzas',
    description: 'Progreso y acompañamiento.',
    icon: Trophy,
  },
]

function Methodology() {
  return (
    <section
      className="relative overflow-hidden bg-white bg-no-repeat px-5 py-24 text-white sm:px-8 sm:py-28 lg:aspect-[2048/1080] lg:px-[3.55%] lg:py-0"
      style={{
        backgroundImage: "url('/images/fondo.png')",
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1340px] lg:pt-[11.7%]">
        <div className="mx-auto max-w-[1340px]">
          <h2 className="m-0 text-4xl font-bold italic tracking-[-0.045em] sm:text-5xl lg:text-[3.85rem] lg:leading-[1.05]">
            Así aprendes en Towers
          </h2>
          <p className="mt-3 max-w-[760px] text-base leading-6 text-white/90 sm:text-lg">
            Interacción, cuatro habilidades, grupos semipersonalizados y aplicación en situaciones cotidianas.
          </p>
        </div>

        <div className="mt-8 flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-4 sm:gap-3 lg:mt-[3.05%] lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {methodologySteps.map(({ number, title, description, icon: Icon }) => (
            <article
              className="flex min-h-[296px] min-w-[258px] snap-start flex-1 flex-col rounded-xl border border-[#d9dfe8] bg-white px-3.5 py-4 text-center text-[#111827] shadow-[0_5px_8px_rgb(0_0_0_/_18%)] transition-transform duration-300 hover:-translate-y-1 sm:min-w-[270px] lg:min-h-0 lg:min-w-0 lg:aspect-[258/296]"
              key={number}
            >
              <span className="self-start text-left text-sm font-semibold text-[#9ca3af]">{number}</span>
              <div className="flex flex-1 flex-col items-center justify-center">
                <Icon
                  aria-hidden="true"
                  className="h-[112px] w-[112px] stroke-[1.8] text-[#ff2d4d]"
                />
                <h3 className="mt-5 text-[27px] font-extrabold leading-none tracking-[-0.045em]">
                  {title}
                </h3>
                <p className="mt-3 text-lg leading-6 text-[#263244]">{description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-3 max-w-[785px] lg:mt-[2%]">
          <button
            className="w-full rounded-xl bg-[#f33d34] px-5 py-3.5 text-xl font-bold text-white shadow-sm transition hover:bg-[#df3029] focus:outline-none focus:ring-4 focus:ring-white/30"
            type="button"
          >
            Conocer nuestra metodología <span aria-hidden="true" className="ml-1">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Methodology
