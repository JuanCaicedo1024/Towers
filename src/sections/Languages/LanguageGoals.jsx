import AnimatedText from '@/components/ui/AnimatedText';
import { ArrowRight, BriefcaseBusiness, GraduationCap, Plane, Sparkles, UserRound, UsersRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const goals = [
  { label: 'Crecer profesionalmente', icon: BriefcaseBusiness },
  { label: 'Vivir en otro país', icon: Plane },
  { label: 'Estudiar', icon: GraduationCap },
  { label: 'Viajar', icon: Plane },
  { label: 'Comunicarte con confianza', icon: UsersRound },
  { label: 'Desarrollo personal', icon: UserRound },
]

function LanguageGoals() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState(null)

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
      { threshold: 0.15 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#fffaf8] px-[6%] py-16 text-[#071026] lg:px-[10%] lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#e83e33]">
          LAS PERSONAS DETRÁS DE TU APRENDIZAJE
        </p>
        <h2 className="mt-4 max-w-[1000px] text-4xl font-bold italic leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
          <AnimatedText>¿Para qué quieres aprender un idioma?</AnimatedText>
        </h2>
        <p className="mt-5 max-w-[760px] text-base leading-7 text-[#405878] sm:text-lg">
          Estas categorías te ayudan a orientar tu búsqueda.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {goals.map(({ label, icon: Icon }, index) => {
            const isSelected = selectedGoal === label
            const isFeatured = index === 0

            return (
              <button
                aria-pressed={isSelected}
                className={`language-goal-card group flex min-h-[132px] items-center gap-5 rounded-[1.7rem] border-2 p-5 text-left shadow-[0_8px_20px_rgb(23_35_58_/_8%)] transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-[#e83e33] hover:shadow-[0_16px_28px_rgb(23_35_58_/_14%)] active:scale-[0.99] motion-reduce:transform-none ${isVisible ? 'language-goal-card--visible' : ''} ${isSelected ? 'border-[#e83e33] ring-4 ring-[#fce0da]' : isFeatured ? 'border-[#e83e33] bg-[#fff4ef]' : 'border-[#ead3cb] bg-white'}`}
                key={label}
                style={{ '--goal-delay': `${index * 90}ms` }}
                type="button"
                onClick={() => setSelectedGoal(isSelected ? null : label)}
              >
                <span className={`grid h-[76px] w-[76px] shrink-0 place-items-center rounded-[1.35rem] text-[#8b2b20] transition duration-300 group-hover:rotate-6 group-hover:scale-110 ${isFeatured ? 'bg-[#fce0da]' : 'bg-[#fff0eb]'}`}>
                  <Icon className="h-10 w-10" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className={`min-w-0 flex-1 text-base font-bold leading-tight sm:text-lg ${isFeatured ? 'text-[#8b2b20]' : 'text-[#071026]'}`}>
                  {label}
                </span>
                <span className="ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#fff0eb] text-[#8b2b20] transition duration-300 group-hover:translate-x-1 group-hover:bg-[#e83e33] group-hover:text-white">
                  {isSelected ? <Sparkles className="h-5 w-5" aria-hidden="true" /> : <ArrowRight className="h-5 w-5" aria-hidden="true" />}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default LanguageGoals
