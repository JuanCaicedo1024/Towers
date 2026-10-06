export function Placeholder({ className = '', label = 'Fotografía real requerida' }) {
  return (
    <div className={`experience-placeholder ${className}`} aria-label="Espacio reservado para material audiovisual">
      <span>{label}</span>
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
