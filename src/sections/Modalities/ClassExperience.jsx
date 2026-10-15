import { ModalitiesHeading, ModalitiesPlaceholder } from './ModalitiesShared'

const steps = [['01', 'Comprendes'], ['02', 'Practicas'], ['03', 'Aplicas'], ['04', 'Consolidas'], ['05', 'Avanzas']]

function ClassExperience() {
  return <section className="bg-white text-[#17233a]"><div className="mx-auto max-w-[1240px] px-[6%] py-16 lg:py-20"><ModalitiesHeading number="03" label="Cómo es una clase" description="la calidad de la experiencia" /><h2 className="mt-8 text-4xl font-extrabold tracking-[-0.045em] text-[#10254a] sm:text-5xl">Cómo es una clase en Towers</h2><div className="mt-8 grid gap-4 md:grid-cols-5">{steps.map(([number, title]) => <article className="rounded-2xl border border-[#dce4ed] bg-[#f7f9fc] p-5 transition hover:-translate-y-1 hover:border-[#f13d35]" key={number}><span className="text-xs font-bold text-[#9aaac0]">{number}</span><h3 className="mt-10 text-xl font-bold text-[#10254a]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#71809a]">Descripción operativa por definir con academia.</p></article>)}</div><ModalitiesPlaceholder className="mt-8" label="Fotografía real · momento de clase (presencial u online)" /></div></section>
}

export default ClassExperience
