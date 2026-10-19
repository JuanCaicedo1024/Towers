import {
  ArrowRight,
  BarChart3,
  BookOpen,
  MessageCircle,
  Mic2,
  Trophy,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

const steps = [
  { title: 'Comprendes', description: '', icon: BookOpen },
  { title: 'Practicas', description: '', icon: Mic2 },
  { title: 'Aplicas', description: '', icon: MessageCircle },
  { title: 'Consolidas', description: '', icon: BarChart3 },
  { title: 'Avanzas', description: '', icon: Trophy },
]

function LanguageMethodology() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#071a3c] px-[6%] py-16 text-white sm:py-20 lg:px-[10%] lg:py-24"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,rgb(118_25_55_/_70%),transparent_45%),linear-gradient(110deg,#061a3d_0%,#321a43_48%,#d72e2b_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/images/Sinfoto.png')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/75">
          EL MÉTODO TOWERS
        </p>
        <h2 className="mt-4 text-4xl font-bold italic leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
          Así aprendes en Towers
        </h2>
        <p className="mt-5 max-w-[700px] text-base leading-[1.5] text-white/80 sm:text-lg">
          Interacción, cuatro habilidades, grupos semipersonalizados y aplicación en situaciones cotidianas.
        </p>
        <NavLink
          className="mt-7 flex w-full max-w-[600px] items-center justify-center rounded-xl bg-[#f33d35] px-6 py-4 text-base font-bold text-white shadow-[0_10px_22px_rgb(0_0_0_/_18%)] transition hover:-translate-y-1 hover:bg-[#df3029] sm:text-lg"
          to="/metodologia"
        >
          Conocer nuestra metodología
          <ArrowRight className="ml-3 h-5 w-5" aria-hidden="true" />
        </NavLink>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ title, description, icon: Icon }, index) => (
            <article
              className={`language-method-step ${isVisible ? 'language-method-step--visible' : ''}`}
              key={title}
              style={{ '--method-delay': `${index * 100}ms` }}
            >
              <span className="text-xs font-bold text-[#98a1ad]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <Icon className="mt-6 h-20 w-20 text-[#f5364b] transition duration-500 group-hover:scale-110" strokeWidth={1.4} aria-hidden="true" />
              <h3 className="mt-6 text-xl font-bold text-[#071026]">{title}</h3>
              <p className="mt-2 text-sm leading-[1.35] text-[#526174]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LanguageMethodology
