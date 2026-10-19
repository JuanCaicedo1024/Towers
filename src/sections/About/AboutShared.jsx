export function Placeholder({ className = '', label = 'Fotografía real requerida' }) {
  return (
    <div className={`experience-placeholder relative overflow-hidden ${className}`} aria-label="Espacio reservado para material audiovisual">
      <img className="absolute inset-0 h-full w-full object-cover opacity-75" src="/images/Sinfoto.png" alt="" />
      <span className="relative rounded bg-[#071026]/70 px-2 py-1 text-white">{label}</span>
    </div>
  )
}

export function SectionHeading({ number, label, description }) {
  return (
    <div className="experience-section-heading">
      <span className="experience-section-number">{number}</span>
      <span>{label}</span>
      <span aria-hidden="true">—</span>
      <span>{description}</span>
    </div>
  )
}

export function Eyebrow({ children }) {
  return <span className="experience-eyebrow">{children}</span>
}
