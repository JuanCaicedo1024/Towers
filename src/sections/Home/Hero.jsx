function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid min-h-[620px] max-w-[1440px] grid-cols-1 items-center gap-8 px-[6%] pb-16 pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4 lg:px-[6%] lg:pb-0 lg:pt-0">
        <div className="relative z-10 max-w-[620px]">
          <h1 className="m-0 max-w-[590px] text-[clamp(2.8rem,5.3vw,5.4rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#101820]">
            Aprende un idioma
            <br />
            para usarlo donde
            <br />
            <span className="text-[#E83E33]">realmente importa.</span>
          </h1>
          <p className="mt-6 max-w-[590px] text-base font-medium leading-[1.45] text-[#294d78] sm:text-lg">
            Aprende inglés y otros idiomas a través de clases interactivas,
            profesores preparados y experiencias que llevan el idioma a
            situaciones reales.
          </p>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button className="inline-flex min-w-[250px] items-center justify-between gap-6 rounded-xl bg-[#E83E33] px-7 py-4 text-sm font-semibold text-white shadow-[0_8px_18px_rgb(232_62_51_/_22%)] transition hover:-translate-y-0.5 hover:bg-[#cf3028] hover:shadow-[0_10px_22px_rgb(232_62_51_/_32%)]" type="button">
              Encuentra tu programa
              <span aria-hidden="true" className="text-xl leading-none">→</span>
            </button>
            <button className="inline-flex min-w-[250px] items-center justify-center gap-3 rounded-xl border border-[#9eabb9] bg-[#edf1f5] px-7 py-4 text-sm font-semibold text-[#183454] shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md" type="button">
              Conoce más
              <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full bg-[#183454] text-sm text-white">+</span>
            </button>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#C83A2F]">
            <span>Presencial</span>
            <span className="text-[#183454]">·</span>
            <span>Online</span>
            <span className="text-[#183454]">·</span>
            <span>Grupos semipersonalizados</span>
            <span className="text-[#183454]">·</span>
            <span>Cúcuta</span>
          </div>
        </div>

        <div className="relative flex min-h-[430px] items-end justify-center self-stretch lg:min-h-[620px]">
          <img
            className="relative z-10 h-auto w-[82%] max-w-[540px] object-contain object-bottom [mask-image:radial-gradient(ellipse_at_center,black_64%,transparent_100%)] lg:absolute lg:bottom-0 lg:right-[-4%] lg:w-[570px] lg:max-w-none"
            src="/images/hero.png"
            alt="Mujer aprendiendo idiomas con un globo terráqueo frente a la Estatua de la Libertad"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
