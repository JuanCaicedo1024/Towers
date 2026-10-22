import { useState } from 'react'

const questions = [
  {
    icon: 'ⓘ',
    question: '¿Cómo sé qué nivel de idioma tengo?',
    answer:
      'Puedes comenzar con una prueba de nivel para identificar tu punto de partida y orientarte hacia el programa más adecuado. El proceso exacto de evaluación y entrega de resultados debe confirmarse con TOWERS.',
  },
  {
    icon: '♡',
    question: '¿Qué idiomas puedo estudiar en TOWERS?',
    answer:
      'Actualmente puedes encontrar programas de inglés, francés, portugués y alemán. Italiano aparece en la información interna, pero su disponibilidad debe confirmarse antes de elegirlo como parte de la oferta.',
  },
  {
    icon: '☷',
    question: '¿Qué modalidades de estudio están disponibles?',
    answer:
      'TOWERS cuenta con opciones presencial, online e híbrida, además de programas empresariales. La disponibilidad puede variar según el idioma o programa, por lo que conviene consultar con un asesor.',
  },
  {
    icon: '♙',
    question: '¿Cómo funciona la metodología de TOWERS?',
    answer:
      'El enfoque se basa en la interacción y en el desarrollo de las cuatro habilidades: escucha, habla, lectura y escritura. Practicarás el idioma en diferentes situaciones, no solo teoría.',
  },
  {
    icon: '□',
    question: '¿Cómo puedo matricularme?',
    answer:
      'Puedes iniciar el proceso hablando con un asesor por WhatsApp. El equipo te orientará sobre el programa, modalidad, disponibilidad y proceso de matrícula. El pago se gestiona posteriormente según las opciones disponibles.',
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
