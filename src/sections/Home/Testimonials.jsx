function Testimonials() {
  return (
    <section className="bg-[#f1f6fc] px-[6%] py-16 text-[#17233a] lg:px-[12%] lg:py-20">
      <div className="mx-auto max-w-[1120px]">
        <div className="border-b border-dashed border-[#d5deea] pb-4">
          <p className="m-0 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#71809a]">
            06&nbsp;&nbsp; CÓMO PUEDES ESTUDIAR
            <span className="normal-case tracking-normal"> — una sola experiencia, distintas formas</span>
          </p>
        </div>

        <div className="mt-9 grid items-center gap-10 lg:grid-cols-[1fr_1.08fr] lg:gap-16">
          <div className="max-w-[620px]">
            <h2 className="m-0 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#071026] sm:text-4xl">
              Una sola experiencia, distintas formas.
            </h2>
            <p className="mt-4 text-base leading-[1.55] text-[#627493]">
              Puedes estudiar presencialmente en la sede de Cúcuta, online en vivo desde donde estés, o combinando ambas. La metodología, los profesores y el enfoque de interacción se mantienen igual.
            </p>
            <button className="mt-7 rounded border border-[#dce4ee] bg-white px-4 py-3 text-sm font-medium text-[#17233a] shadow-sm transition hover:-translate-y-0.5 hover:border-[#71809a] hover:shadow-md" type="button">
              Conocer cómo estudiar
            </button>
          </div>

          <div
            className="grid min-h-[300px] place-items-center border border-dashed border-[#aeb8c5] bg-[#f1f5fa] bg-[linear-gradient(135deg,transparent_49.5%,#dce3ed_50%,transparent_50.5%),linear-gradient(45deg,transparent_49.5%,#dce3ed_50%,transparent_50.5%)]"
            aria-label="Clase Towers presencial u online"
          >
            <span className="max-w-[90%] text-center font-mono text-[10px] tracking-[0.12em] text-[#627493]">
              FOTOGRAFÍA REAL — CLASE TOWERS (PRESENCIAL U
              <br />
              ONLINE)
            </span>
          </div>
        </div>

        <div className="mt-9 flex flex-col justify-between gap-5 rounded-md border border-dashed border-[#aeb8c5] bg-white p-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="m-0 text-xl font-semibold tracking-[-0.03em] text-[#071026]">
              ¿Buscas formación para tu equipo?
            </h3>
            <p className="mt-2 text-sm text-[#71809a]">
              Proceso y propuesta diferenciados para empresas.
            </p>
          </div>
          <button className="inline-flex w-fit items-center gap-5 rounded-md border border-[#dce4ee] bg-white px-4 py-3 text-sm font-medium text-[#17233a] shadow-sm transition hover:-translate-y-0.5 hover:border-[#71809a] hover:shadow-md" type="button">
            Towers para empresas
            <span aria-hidden="true" className="text-xl">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
