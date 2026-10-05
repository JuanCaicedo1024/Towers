const languages = [
  {
    name: "Inglés",
    image: "/images/Ingles.png",
    description: "Programa principal. Niveles desde inicial hasta avanzado.",
    modalities: "PRESENCIAL · ONLINE",
    featured: true,
  },
  {
    name: "Francés",
    image: "/images/frances.png",
    description: "Enfoque conversacional y uso cotidiano.",
    modalities: "PRESENCIAL · ONLINE",
  },
  {
    name: "Portugués",
    image: "/images/brazil.png",
    description: "Comprensión y conversación aplicada.",
    modalities: "PRESENCIAL",
  },
  {
    name: "Alemán",
    image: "/images/alemania.png",
    description: "Base estructural + práctica guiada.",
    modalities: "PRESENCIAL",
  },
  {
    name: "Italiano",
    image: "/images/italia.png",
    description: "Base estructural y práctica aplicada.",
    modalities: "MODALIDADES POR CONFIRMAR",
  },
];

function Languages() {
  return (
    <section className="bg-white px-[6%] py-16 text-[#17233a] lg:px-[12%] lg:py-20">
      <div className="mx-auto max-w-[1120px]">
        <div className="mt-8">
          <h2 className="m-0 text-3xl font-semibold tracking-[-0.04em] text-[#071026] sm:text-4xl">
            ¿Qué idioma quieres aprender?
          </h2>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {languages.map((language) => (
              <article
                className={`group flex flex-col rounded-[1.5rem] border bg-[#fff9f7] p-5 ${
                  language.featured
                    ? "border-2 border-[#c2b9b6] shadow-sm"
                    : "border-[#e3d7d4]"
                } transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#71809a] hover:shadow-[0_12px_24px_rgb(23_35_58_/_12%)]`}
                key={language.name}
              >
                <div className="grid h-[185px] place-items-center overflow-hidden rounded-[1.25rem] bg-[#fff9f7] transition-transform duration-300 group-hover:scale-[1.02]">
                  <img
                    className="h-full w-full object-contain"
                    src={language.image}
                    alt={`Bandera de ${language.name}`}
                  />
                </div>
                <h3 className="mb-1 mt-4 text-lg font-semibold text-[#071026]">
                  {language.name}
                </h3>
                <p className="min-h-[70px] text-base leading-[1.35] text-[#17233a]">
                  {language.description}
                </p>
                <button
                  className="mt-auto rounded-xl border border-[#183454] bg-transparent px-3 py-3 text-sm font-bold text-[#183454] shadow-sm transition hover:bg-[#183454] hover:text-white hover:shadow"
                  type="button"
                >
                  Ver programa
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Languages;
