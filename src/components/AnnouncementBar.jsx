function AnnouncementBar({ text, className = '' }) {
  const message = text?.trim()
  if (!message) return null

  return (
    <div className={`campaign-announcement-bar relative overflow-hidden border-y border-[#ffb44a]/70 bg-[linear-gradient(105deg,#9f201e_0%,#e83e33_34%,#fa5a3e_68%,#bd2926_100%)] py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgb(148_31_29_/_20%)] sm:text-base ${className}`} role="status" aria-label={`Promoción: ${message}`}>
      <span className="campaign-announcement-glow pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <span className="sr-only">{message}</span>
      <div className="relative mx-auto flex max-w-[1440px] items-center gap-3 px-4 sm:px-8">
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="announcement-marquee-track flex w-max whitespace-nowrap" aria-hidden="true">
            <span className="px-10">{message}</span>
            <span className="px-10">{message}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementBar
