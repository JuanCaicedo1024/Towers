import { useState } from 'react'

const slides = [
  {
    image: '/images/Modalities.png',
    quote: 'Aprender acompañado hace que cada clase se convierta en una experiencia real.',
    author: 'Experiencia Towers',
    detail: 'Comunidad y práctica',
  },
  {
    image: '/images/hero.png',
    quote: 'El mejor lugar para aprender y crecer es donde el idioma se usa de verdad.',
    author: 'Estudiantes Towers',
    detail: 'Idiomas y experiencias',
  },
  {
    image: '/images/image.png',
    quote: 'Una sola experiencia, distintas formas de aprender y conectar con el mundo.',
    author: 'Comunidad Towers',
    detail: 'Clases para cada objetivo',
  },
]

function Experience() {
  const [activeSlide, setActiveSlide] = useState(0)
  const currentSlide = slides[activeSlide]

  const changeSlide = (direction) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length)
  }

  return (
    <section className="bg-white px-[4%] py-16 text-[#17233a] lg:px-[8%] lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="m-0 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#71809a]">
          LAS PERSONAS DETRÁS DE TU APRENDIZAJE
        </p>
        <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-[#071026] sm:text-5xl">
          Conoce quién va a acompañarte en tu aprendizaje
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

          <div className="grid overflow-hidden rounded-lg border border-[#d5a99d] bg-[#fff0ec] shadow-[0_8px_20px_rgb(23_35_58_/_12%)] md:grid-cols-[0.8fr_1.2fr]">
            <div className="h-[260px] overflow-hidden md:h-[350px]">
              <img
                className="h-full w-full object-cover object-center transition duration-500"
                src={currentSlide.image}
                alt={currentSlide.author}
              />
            </div>
            <div className="relative flex flex-col justify-center p-7 sm:p-12">
              <span className="absolute right-7 top-6 text-6xl leading-none text-[#E83E33]/30">“</span>
              <blockquote className="max-w-[600px] text-xl font-medium italic leading-[1.35] text-[#8f301d] sm:text-2xl">
                {currentSlide.quote}
              </blockquote>
              <div className="mt-8 border-t border-dashed border-[#b98d82] pt-5">
                <strong className="block text-sm text-[#8f301d]">{currentSlide.author}</strong>
                <span className="text-sm text-[#b98d82]">{currentSlide.detail}</span>
              </div>
              <div className="mt-5 flex gap-1 text-xl text-[#e9a614]">
                ★ ★ ★ ★ <span className="text-[#b9c1c8]">★</span>
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
                className={`h-[125px] overflow-hidden rounded-[1.5rem] border-4 bg-[#f4f7fb] transition duration-300 sm:h-[190px] ${
                  index === activeSlide
                    ? 'border-[#E83E33] shadow-[0_8px_18px_rgb(232_62_51_/_20%)]'
                    : 'border-white hover:border-[#d5a99d]'
                }`}
                key={slide.image}
                type="button"
                aria-label={`Seleccionar ${slide.author}`}
                onClick={() => setActiveSlide(index)}
              >
                <img className="h-full w-full object-cover" src={slide.image} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
