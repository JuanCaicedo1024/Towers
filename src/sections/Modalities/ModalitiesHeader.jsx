import { ModalitiesEyebrow } from './ModalitiesShared'

function ModalitiesHeader() {
  return (
    <section className="bg-white text-[#17233a]">
      <div className="mx-auto max-w-[1240px] px-[6%] py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-[72px]">
          <div>
            <ModalitiesEyebrow>Modalidades</ModalitiesEyebrow>
            <h1 className="max-w-[680px] text-[clamp(3rem,5.4vw,5.5rem)] font-extrabold italic leading-[1.04] tracking-[-0.055em] text-[#101820]">Una sola experiencia de Towers, en distintas formas.</h1>
            <p className="mt-[18px] max-w-[680px] text-lg leading-[1.6] text-[#294d78]">Puedes estudiar presencialmente en nuestra sede en Cúcuta, online o vivir una combinación de ambas. El resultado es la misma experiencia Towers.</p>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] shadow-[0_22px_42px_rgb(18_42_75_/_18%)]" aria-label="Clase de Towers">
            <img src="/images/Sinfoto.png" alt="Estudiantes de Towers aprendiendo en comunidad" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" aria-hidden="true" />
            <strong className="absolute bottom-10 left-[12%] text-[clamp(1.9rem,3vw,3.2rem)] font-bold italic leading-none tracking-[-0.04em] text-[#f13d35]">Clases con Laura Martínez</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ModalitiesHeader
