import { ArrowLeft, ArrowRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const languageCards = [
  {
    name: 'Inglés',
    slug: 'ingles',
    image: '/images/Ingles.png',
    description: 'Aprende a comunicarte con seguridad en situaciones reales.',
    flag: '🇬🇧',
  },
  {
    name: 'Francés',
    slug: 'frances',
    image: '/images/frances.png',
    description: 'Descubre el francés desde la conversación y el uso cotidiano.',
    flag: '🇫🇷',
  },
  {
    name: 'Portugués',
    slug: 'portugues',
    image: '/images/brazil.png',
    description: 'Fortalece tu comprensión y conversación de forma práctica.',
    flag: '🇧🇷',
  },
  {
    name: 'Alemán',
    slug: 'aleman',
    image: '/images/alemania.png',
    description: 'Construye una base sólida con práctica guiada.',
    flag: '🇩🇪',
  },
  {
    name: 'Italiano',
    slug: 'italiano',
    image: '/images/italia.png',
    description: 'Aprende italiano conectando idioma, cultura y práctica.',
    flag: '🇮🇹',
  },
]

function LanguageSlider() {
  const sliderRef = useRef(null)

  const scrollSlider = (direction) => {
    const slider = sliderRef.current
    const card = slider?.querySelector('[data-language-card]')

    if (!slider || !card) return

    const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - card.clientWidth / 2
    const left = direction > 0 && isAtEnd
      ? -slider.scrollLeft
      : direction < 0 && slider.scrollLeft <= card.clientWidth / 2
        ? slider.scrollWidth
        : direction * (card.clientWidth + 24)

    slider.scrollBy({
      behavior: 'smooth',
      left,
    })
  }

  useEffect(() => {
    const interval = window.setInterval(() => scrollSlider(1), 3500)
    return () => window.clearInterval(interval)
  }, [])

  const moveSlider = (direction) => {
    scrollSlider(direction)
  }

  return (
    <section className="overflow-hidden bg-white px-[6%] py-16 text-[#071026] lg:px-[10%] lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#e83e33]">
              ENCUENTRA LO QUE QUIERES APRENDER
            </p>
            <h2 className="mt-3 text-4xl font-bold italic leading-none tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Elige tu idioma
            </h2>
            <p className="mt-5 text-base text-[#405878] sm:text-lg">
              Todos los programas comparten el mismo enfoque de interacción.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              aria-label="Idioma anterior"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#183454] text-[#183454] transition hover:bg-[#183454] hover:text-white"
              type="button"
              onClick={() => moveSlider(-1)}
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              aria-label="Siguiente idioma"
              className="grid h-11 w-11 place-items-center rounded-full bg-[#183454] text-white transition hover:bg-[#e83e33]"
              type="button"
              onClick={() => moveSlider(1)}
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          ref={sliderRef}
          data-language-slider
          aria-label="Programas de idiomas"
        >
          {languageCards.map((language) => (
            <article
              className="group w-[min(82vw,330px)] shrink-0 snap-start rounded-2xl border border-[#dfe3e8] bg-white shadow-[0_8px_22px_rgb(23_35_58_/_10%)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgb(23_35_58_/_16%)] sm:w-[330px]"
              data-language-card
              key={language.slug}
            >
              <div className="relative h-[235px] overflow-visible rounded-t-2xl bg-[#eef2f5]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgb(255_255_255_/_85%)_0_2px,transparent_2px_100%)] bg-[length:22px_22px]" aria-hidden="true" />
                <span className="absolute bottom-[-28px] left-5 z-20 grid h-20 w-20 place-items-center overflow-hidden rounded-full border-4 border-white bg-white p-2 shadow-[0_5px_12px_rgb(23_35_58_/_20%)] transition-transform duration-300 group-hover:scale-105">
                  <img
                    className="h-full w-full object-contain"
                    src={language.image}
                    alt={`Logo del idioma ${language.name}`}
                  />
                </span>
              </div>
              <div className="p-5 pt-7">
                <h3 className="text-2xl font-bold text-[#071026]">{language.name}</h3>
                <p className="mt-3 min-h-[54px] text-base leading-[1.45] text-[#526174]">
                  {language.description}
                </p>
                <NavLink
                  className="mt-5 flex items-center justify-center rounded-lg bg-[#06244c] px-4 py-3 text-base font-bold text-white transition hover:bg-[#e83e33]"
                  to={`/idiomas/${language.slug}`}
                >
                  Ver programa
                </NavLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LanguageSlider
