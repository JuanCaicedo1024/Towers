import AnimatedText from '@/components/ui/AnimatedText';
import { Building2, Monitor, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ModalitiesHeading } from './ModalitiesShared'

const options = [
  ['Presencial', '/images/Sinfoto.png', UsersRound],
  ['Online', '/images/Sinfoto.png', Monitor],
  ['Híbrida', '/images/Sinfoto.png', Building2],
]

function StudyOptions() {
  return (
    <section className="bg-white text-[#17233a]">
      <div className="mx-auto max-w-[1240px] px-[6%] py-16 lg:py-20">
        
        <h2 className="mt-8 text-4xl font-extrabold tracking-[-0.045em] text-[#171c20] sm:text-5xl lg:text-6xl"><AnimatedText>Cómo puedes estudiar</AnimatedText></h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {options.map(([title, image, Icon]) => (
            <article className="group relative overflow-visible rounded-xl border border-[#d9dfe8] bg-white shadow-[0_5px_8px_rgb(0_0_0_/_18%)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_18px_30px_rgb(23_35_58_/_16%)]" key={title}>
              <div className="relative h-[250px] overflow-hidden rounded-t-xl">
                <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={image} alt={`Modalidad ${title}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071026]/30 to-transparent" aria-hidden="true" />
              </div>
              <span className="absolute left-7 top-[209px] z-50 grid h-[82px] w-[102px] place-items-center rounded-t-2xl bg-white text-[#f13d35] shadow-[0_-5px_15px_rgb(0_0_0_/_12%)] transition duration-300 group-hover:text-[#10254a]">
                <Icon className="relative z-[60] h-11 w-11 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div className="px-7 pb-6 pt-12">
                <h3 className="text-2xl font-bold text-[#071026]">{title}</h3>
                <p className="mt-4 min-h-[58px] text-base leading-6 text-[#4b5563]">
                  Salman Amin Khan, fundador y CEO de Khan Academy.
                </p>
                <Link className="mt-5 flex items-center justify-center rounded-xl bg-[#08244a] px-5 py-3 text-lg font-bold text-white transition hover:bg-[#f13d35]" to="/modalidades">
                  Ver perfil
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StudyOptions
