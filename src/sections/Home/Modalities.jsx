function Modalities() {
  return (
    <section className="bg-white px-[6%] py-16 text-[#17233a] lg:px-[12%] lg:py-20">
      <div className="mx-auto max-w-[1120px]">
        

        <div className="mt-7 grid items-center gap-10 border-b border-dashed border-[#d5deea] pb-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="max-w-[400px]">
            <h2 className="m-0 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#071026] sm:text-4xl">
              El idioma no termina cuando termina la clase.
            </h2>
            <p className="mt-4 text-base leading-[1.55] text-[#71809a]">
              Comunidad y actividades reales de interacción, conversación y ocio donde el idioma se practica fuera del salón.
            </p>
            <button className="mt-6 inline-flex min-w-[270px] items-center justify-between gap-5 rounded-xl bg-[#E83E33] px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_18px_rgb(232_62_51_/_22%)] transition hover:-translate-y-0.5 hover:bg-[#cf3028] hover:shadow-[0_10px_22px_rgb(232_62_51_/_32%)]" type="button">
              Conocer la experiencia Towers
              <span aria-hidden="true" className="text-xl leading-none">→</span>
            </button>
          </div>

          <div className="overflow-hidden rounded-[2rem]" aria-label="Estudiantes practicando en una actividad del club">
            <img
              className="h-auto w-full object-contain transition duration-500 hover:scale-[1.02]"
              src="/images/Modalities.png"
              alt="Estudiantes de Towers practicando idiomas y participando en el Club Mundialista"
            />
          </div>
        </div>

        
        
      </div>
    </section>
  )
}

export default Modalities
