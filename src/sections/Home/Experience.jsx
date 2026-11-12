import AnimatedText from '@/components/ui/AnimatedText';
import { useEffect, useState } from 'react'

const slides = [
  {
    image: '/images/classroom/DSC06683.jpg.jpeg',
    title: 'Aprendizaje acompañado',
    description:
      'Cada estudiante cuenta con orientación durante su proceso y oportunidades para practicar lo aprendido. Así, cada clase se convierte en un espacio para participar, resolver dudas y ganar confianza.',
  },
  {
    image: '/images/classroom/DSC06700.jpg.jpeg',
    title: 'Práctica en el aula',
    description:
      'Las actividades guiadas conectan los temas de clase con situaciones cotidianas. Escuchar, conversar y trabajar con el idioma ayuda a construir el aprendizaje con práctica constante.',
  },
  {
    image: '/images/classroom/DSC06667.jpg.jpeg',
    title: 'Una comunidad que aprende',
    description:
      'En Towers, aprender también significa compartir el aula con otras personas, participar y descubrir nuevas formas de comunicarse. Cada encuentro suma experiencias al camino de aprender un idioma.',
  },
]

function Experience() {
  const [activeSlide, setActiveSlide] = useState(0)
  const currentSlide = slides[activeSlide]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  const changeSlide = (direction) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length)
  }

  return (
    <section className="bg-white px-[4%] py-16 text-[#17233a] lg:px-[8%] lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="m-0 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#71809a]">
          FOTOS DE NUESTRA COMUNIDAD
        </p>
        <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-[#071026] sm:text-5xl">
          <AnimatedText>Así se vive aprender en Towers</AnimatedText>
        </h2>

        <div className="relative mt-8">
          <button
            className="absolute -left-10 top-1/2 z-20 hidden -translate-y-1/2 text-4xl font-light text-[#17233a] transition hover:scale-125 hover:text-[#E83E33] lg:block"
            type="button"
            aria-label="Anterior"
            onClick={() => changeSlide(-1)}
          >
            ‹
          </button>
          <button
            className="absolute -right-10 top-1/2 z-20 hidden -translate-y-1/2 text-4xl font-light text-[#17233a] transition hover:scale-125 hover:text-[#E83E33] lg:block"
            type="button"
            aria-label="Siguiente"
            onClick={() => changeSlide(1)}
          >
            ›
          </button>

          <div
            className="group grid overflow-hidden rounded-[1.5rem] border border-[#d5a99d] bg-[#fff0ec] shadow-[0_12px_28px_rgb(23_35_58_/_14%)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(232_62_51_/_18%)] md:grid-cols-[0.8fr_1.2fr]"
            aria-live="polite"
          >
            <div className="h-[260px] overflow-hidden md:h-[350px]">
              <img
                key={currentSlide.image}
                className="home-experience-slide-image h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                src={currentSlide.image}
                alt={currentSlide.title}
              />
            </div>
            <div
              key={currentSlide.title}
              className="home-experience-slide-copy relative flex flex-col justify-center overflow-hidden p-7 sm:p-12"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#f13d35] via-[#e9a614] to-[#f13d35]" />
              <h3 className="max-w-[600px] text-xl font-semibold leading-[1.2] text-[#8f301d] sm:text-2xl">
                <AnimatedText>{currentSlide.title}</AnimatedText>
              </h3>
              <p className="mt-4 max-w-[600px] text-base leading-[1.5] text-[#8f301d]/80 sm:text-lg">
                {currentSlide.description}
              </p>
              <p className="mt-5 border-t border-dashed border-[#b98d82] pt-4 text-sm text-[#8f301d]/70">
                Contenido informativo · Equipo Towers
              </p>
              <div className="mt-6 flex items-center gap-3 text-[#e9a614]">
                <span className="text-xl tracking-[0.16em]" aria-hidden="true">
                  ★ ★ ★ ★ ★
                </span>
                <span className="text-sm font-medium text-[#8f301d]/70">
                  Aprender también se disfruta
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {slides.map((slide, index) => (
              <button
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeSlide ? 'bg-[#E83E33]' : 'bg-[#c7ced6]'
                }`}
                key={slide.image}
                type="button"
                aria-label={`Ver diapositiva ${index + 1}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-6">
            {slides.map((slide, index) => (
              <button
                className={`h-[125px] overflow-hidden rounded-[1.5rem] border-4 bg-[#f4f7fb] transition duration-500 hover:-translate-y-1 hover:shadow-[0_10px_22px_rgb(232_62_51_/_18%)] sm:h-[190px] ${
                  index === activeSlide
                    ? 'scale-[1.03] border-[#E83E33] shadow-[0_8px_18px_rgb(232_62_51_/_20%)]'
                    : 'border-white hover:border-[#d5a99d]'
                }`}
                key={slide.title}
                type="button"
                aria-label={`Ver foto: ${slide.title}`}
                onClick={() => setActiveSlide(index)}
              >
                <img className="h-full w-full object-cover" src={slide.image} alt={slide.title} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
