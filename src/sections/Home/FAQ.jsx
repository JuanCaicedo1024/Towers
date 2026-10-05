import { useState } from 'react'

const questions = [
  {
    icon: 'ⓘ',
    question: '¿Por qué elegir Towers para aprender idiomas?',
    answer:
      'En Towers aprendes con interacción, práctica guiada y situaciones reales para usar el idioma con confianza.',
  },
  {
    icon: '♡',
    question: '¿Qué incluye la experiencia Towers?',
    answer:
      'Incluye clases, acompañamiento docente y actividades que te permiten seguir practicando fuera del salón.',
  },
  {
    icon: '☷',
    question: '¿Cómo funcionan los cursos?',
    answer:
      'Comenzamos con tu nivel y objetivos para recomendarte el programa y la modalidad que mejor se adapten a ti.',
  },
  {
    icon: '♙',
    question: '¿Quiénes son los profesores?',
    answer:
      'Nuestro equipo está formado por profesores preparados para acompañarte durante todo tu proceso de aprendizaje.',
  },
  {
    icon: '□',
    question: '¿Cuándo puedo comenzar?',
    answer:
      'Escríbenos para conocer los horarios y próximos grupos disponibles.',
  },
]

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(0)

  const toggleQuestion = (index) => {
    setOpenQuestion((currentQuestion) =>
      currentQuestion === index ? null : index,
    )
  }

  return (
    <section className="bg-white px-[6%] py-16 text-[#17233a] lg:px-[12%] lg:py-20">
      <div className="mx-auto max-w-[1120px]">
        

        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-[#b9c6d6] bg-white px-6 shadow-[0_8px_20px_rgb(23_35_58_/_8%)] sm:px-10">
          {questions.map((item, index) => {
            const isOpen = openQuestion === index

            return (
              <div
                className={`border-b border-[#dce3ed] last:border-b-0 ${
                  isOpen ? 'text-[#8f301d]' : 'text-[#71809a]'
                }`}
                key={item.question}
              >
                <button
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-5 py-6 text-left transition-colors hover:text-[#E83E33]"
                  type="button"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="w-8 shrink-0 text-3xl leading-none" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="flex-1 text-lg font-semibold sm:text-2xl">
                    {item.question}
                  </span>
                  <span className="w-8 shrink-0 text-center text-3xl font-light leading-none">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] pb-6 opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="min-h-0 overflow-hidden pl-[3.25rem] pr-10 text-base leading-[1.6] text-[#71809a]">
                    {item.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
