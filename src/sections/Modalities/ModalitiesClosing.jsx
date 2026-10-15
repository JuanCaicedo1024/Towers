import { Link } from 'react-router-dom'
import { ModalitiesHeading } from './ModalitiesShared'

function ModalitiesClosing() {
  return <section className="bg-[#102d55] text-white"><div className="mx-auto max-w-[1240px] px-[6%] py-16 lg:py-20"><ModalitiesHeading number="07" label="Cierre" description="el siguiente paso" /><h2 className="mt-8 text-4xl font-extrabold tracking-[-0.045em] text-white sm:text-5xl">¿Listo para sumarte?</h2><p className="mt-[18px] max-w-[680px] text-lg leading-[1.6] text-[#d8e5f1]">Elige cómo comenzar tu camino y encuentra una modalidad que se adapte a ti.</p><Link className="mt-6 inline-flex items-center gap-4 rounded-lg bg-[#f13d35] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#d92f29]" to="/contacto">Habla con un asesor <span aria-hidden="true">→</span></Link></div></section>
}

export default ModalitiesClosing
