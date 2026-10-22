import AnimatedText from '@/components/ui/AnimatedText';
import { ArrowRight, BookOpen, ChartNoAxesCombined, MessagesSquare, Mic, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = [
  ['Comprendes', 'Bases sólidas de gramática y vocabulario en contextos reales.', BookOpen],
  ['Practicas', 'Conversación constante y actividades dinámicas.', Mic],
  ['Aplicas', 'Usas lo aprendido en situaciones de tu vida real.', MessagesSquare],
  ['Consolidas', 'Refuerzas tu aprendizaje con retroalimentación continua.', ChartNoAxesCombined],
  ['Avanzas', 'Alcanzas tus objetivos con el acompañamiento de nuestros profesores.', Trophy],
]

function ClassExperience() {
  return (
    <section className="bg-white text-[#17233a]">
      <div className="mx-auto max-w-[1240px] px-[6%] py-16 lg:py-20">
        <h2 className="text-4xl font-extrabold tracking-[-0.045em] text-[#171c20] sm:text-5xl">
          <AnimatedText>Cómo es una clase en Towers</AnimatedText>
        </h2>
        <div className="mt-8 grid gap-2 md:grid-cols-5">
          {steps.map(([title, description, Icon], index) => (
            <article
              className="min-h-[185px] rounded-xl border border-[#dce4ed] bg-white p-3 shadow-[0_5px_8px_rgb(0_0_0_/_12%)]"
              key={title}
            >
              <span className="text-[10px] font-semibold text-[#9aaac0]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col items-center text-center">
                <Icon className="mt-2 h-[76px] w-[76px] text-[#ff304b]" strokeWidth={1.8} aria-hidden="true" />
                <h3 className="mt-2 text-lg font-extrabold leading-none text-[#171c20]">{title}</h3>
                <p className="mt-2 text-xs leading-4 text-[#263244]">{description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 overflow-hidden rounded-[1.5rem]">
          <img
            className="h-[320px] w-full object-cover object-center sm:h-[420px] lg:h-[500px]"
            src="/images/Sinfoto.png"
            alt="Clase de idiomas en Towers"
          />
        </div>
        <Link
          className="mx-auto mt-8 flex max-w-[480px] items-center justify-center rounded-xl bg-[#f33d34] px-5 py-3.5 text-base font-bold text-white transition hover:bg-[#df3029]"
          to="/metodologia"
        >
          Conocer nuestra metodología
          <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export default ClassExperience
