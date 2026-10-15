export function ModalitiesPlaceholder({ className = '', label = 'Fotografía real requerida' }) {
  return (
    <div className={`flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-[#cbd7e5] bg-[linear-gradient(135deg,transparent_49.5%,#d9e0e9_50%,transparent_50.5%),linear-gradient(45deg,transparent_49.5%,#d9e0e9_50%,transparent_50.5%),#f5f8fb] p-5 text-center text-[10px] font-bold uppercase tracking-[0.09em] text-[#8c9ab0] ${className}`} aria-label="Espacio reservado para material audiovisual">
      <span>{label}</span>
    </div>
  )
}

export function ModalitiesHeading({ number, label, description }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 border-b border-dashed border-[#bcc8d6] pb-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#71809a]">
      <span className="bg-[#f5f7fb] px-2.5 py-1.5 text-[#61738e]">{number}</span>
      <span>{label}</span>
      <span aria-hidden="true">—</span>
      <span>{description}</span>
    </div>
  )
}

export function ModalitiesEyebrow({ children }) {
  return <span className="mb-4 mt-8 block text-[13px] font-extrabold uppercase tracking-[0.04em] text-[#f13d35]">{children}</span>
}
