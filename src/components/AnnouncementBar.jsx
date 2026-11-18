import { Megaphone } from 'lucide-react'

function AnnouncementBar({ text, className = '' }) {
  const message = text?.trim()
  if (!message) return null

  return (
    <div className={`campaign-announcement-bar relative overflow-hidden border-y border-[#ffb44a] bg-[linear-gradient(105deg,#7f1715_0%,#c52f27_48%,#8f1b1a_100%)] px-3 py-4 text-white shadow-[0_8px_24px_rgb(148_31_29_/_28%)] sm:py-4 ${className}`} role="status" aria-label={`Promoción: ${message}`}>
      <span className="campaign-announcement-glow pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#ffcf57] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[#711d18] shadow-sm">
          <Megaphone size={16} strokeWidth={2.5} aria-hidden="true" />
          Promoción
        </span>
        <span className="sr-only">{message}</span>
        <div className="min-w-0 w-full overflow-hidden sm:flex-1">
          <div className="announcement-marquee-track flex w-max whitespace-nowrap text-base font-extrabold leading-snug sm:text-lg" aria-hidden="true">
            <span className="px-10">{message}</span>
            <span className="px-10">{message}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementBar
