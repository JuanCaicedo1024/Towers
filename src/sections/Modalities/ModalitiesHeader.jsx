import { ModalitiesEyebrow } from './ModalitiesShared'

function ModalitiesHeader() {
  return (
    <section className="bg-[#fff8f6] text-[#17233a]">
  <div className="mx-auto max-w-[1240px] px-5 sm:px-[6%]">
    <div className="grid min-h-[520px] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">

      {/* Texto de la izquierda */}
      <div className="px-5 py-10 sm:px-10 lg:pl-[3%] lg:pr-0">
        <ModalitiesEyebrow>
          Modalidades
        </ModalitiesEyebrow>

        <h1 className="mt-3 max-w-[540px] text-[clamp(2.2rem,2.8vw,3.5rem)] font-bold italic leading-[0.98] tracking-[-0.055em] text-[#171c20]">
          Una sola experiencia de Towers, en distintas formas.
        </h1>

        <p className="mt-5 max-w-[540px] text-[15px] leading-[1.8] text-[#49617d] sm:text-[17px]">
          Puedes estudiar presencialmente en nuestra sede en Cúcuta,
          online en vivo desde donde estés, o combinando ambas.
          La metodología, los profesores y el enfoque de interacción
          se mantienen igual.
        </p>
      </div>

      {/* Fotografía de la clase */}
      <div className="relative min-h-[280px] overflow-hidden rounded-[1.7rem] lg:h-[440px] lg:min-h-0 lg:rounded-[1.7rem]">

        <img
          src="/images/Sinfoto.png"
          alt="Profesora impartiendo una clase de Towers"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Degradado oscuro inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

        {/* Nombre de la profesora */}
        <strong className="absolute bottom-8 left-5 right-5 text-center text-[clamp(1.3rem,2.2vw,2rem)] font-bold italic tracking-[-0.04em] text-white sm:bottom-10">
          Clases con Laura Martínez
        </strong>

      </div>
    </div>
  </div>
</section>

  )
}

export default ModalitiesHeader
