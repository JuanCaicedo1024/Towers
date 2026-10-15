import { Link } from 'react-router-dom'
import { ModalitiesEyebrow, ModalitiesHeading } from './ModalitiesShared'

function ModalitiesMethodology() {
  return <section className="bg-white text-[#17233a]"><div className="mx-auto max-w-[1240px] px-[6%] py-16 lg:py-20"><ModalitiesHeading number="05" label="Metodología" description="la misma en cualquier forma" /><ModalitiesEyebrow>Metodología Towers</ModalitiesEyebrow><h2 className="text-4xl font-extrabold tracking-[-0.045em] text-[#10254a] sm:text-5xl">La metodología no cambia con la modalidad.</h2><p className="mt-[18px] max-w-[680px] text-lg leading-[1.6] text-[#71809a]">Sea presencial u online, la experiencia se mantiene con el mismo enfoque de interacción.</p><Link className="mt-6 inline-flex rounded-lg bg-[#17233a] px-4 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#f13d35]" to="/metodologia">Conocer metodología</Link></div></section>
}

export default ModalitiesMethodology
