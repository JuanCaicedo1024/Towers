import { ModalitiesHeading, ModalitiesPlaceholder } from './ModalitiesShared'

function ModalitiesLocation() {
  return <section className="bg-[#f7f9fc] text-[#17233a]"><div className="mx-auto grid max-w-[1240px] items-center gap-10 px-[6%] py-16 lg:grid-cols-2 lg:gap-[72px] lg:py-20"><div><ModalitiesHeading number="04" label="Sede" description="dirección confirmada" /><h2 className="mt-8 text-4xl font-extrabold tracking-[-0.045em] text-[#10254a] sm:text-5xl">Nuestra sede</h2><p className="mt-[18px] text-lg leading-[1.6] text-[#71809a]"><strong className="text-[#10254a]">TOWERS Cúcuta</strong><br />Av. 0 #16-90<br />La Playa<br />Cúcuta, Norte de Santander, Colombia</p><small className="mt-6 block text-xs text-[#8c9ab0]">Por validar: disponibilidad de horarios</small></div><ModalitiesPlaceholder label="Placeholder mapa · ubicación sede" /></div></section>
}

export default ModalitiesLocation
