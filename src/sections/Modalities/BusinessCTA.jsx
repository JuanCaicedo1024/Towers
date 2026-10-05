function BusinessCTA() {
  return (
    <section className="mt-12 flex flex-col justify-between gap-6 rounded-2xl border border-dashed border-[#aeb8c5] bg-[#f8fafc] p-7 sm:flex-row sm:items-center">
      <div>
        <h2 className="m-0 text-2xl font-semibold text-[#071026]">
          ¿Buscas formación para tu equipo?
        </h2>
        <p className="mt-2 text-base text-[#627493]">
          Diseñamos procesos y propuestas para empresas.
        </p>
      </div>
      <button className="inline-flex w-fit items-center gap-5 rounded-xl bg-[#E83E33] px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_18px_rgb(232_62_51_/_22%)] transition hover:-translate-y-0.5 hover:bg-[#cf3028] hover:shadow-[0_10px_22px_rgb(232_62_51_/_32%)]" type="button">
        Towers para empresas
        <span aria-hidden="true" className="text-xl leading-none">→</span>
      </button>
    </section>
  )
}

export default BusinessCTA
