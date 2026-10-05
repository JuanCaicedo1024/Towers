const studyOptions = [
  {
    title: 'Presencial',
    description: 'Aprende en nuestra sede, con interacción directa y acompañamiento cercano.',
    detail: 'Sede Towers Cúcuta',
  },
  {
    title: 'Online',
    description: 'Conéctate a clases en vivo desde donde estés, con la misma metodología.',
    detail: 'Clases en vivo',
  },
  {
    title: 'Combinada',
    description: 'Alterna entre presencial y online según tus tiempos y necesidades.',
    detail: 'Flexibilidad Towers',
  },
]

function StudyOptions() {
  return (
    <section className="mt-12">
      <div className="grid gap-4 lg:grid-cols-3">
        {studyOptions.map((option, index) => (
          <article
            className={`rounded-2xl border bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E83E33] hover:shadow-[0_14px_28px_rgb(23_35_58_/_12%)] ${
              index === 0 ? 'border-[#E83E33]' : 'border-[#dce4ee]'
            }`}
            key={option.title}
          >
            <span className="font-mono text-xs font-bold tracking-[0.12em] text-[#E83E33]">
              0{index + 1}
            </span>
            <h2 className="mt-8 text-2xl font-semibold text-[#071026]">{option.title}</h2>
            <p className="mt-3 min-h-[78px] text-base leading-[1.6] text-[#627493]">
              {option.description}
            </p>
            <span className="mt-6 block border-t border-dashed border-[#d5deea] pt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[#71809a]">
              {option.detail}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default StudyOptions
