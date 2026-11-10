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
      'En TOWERS puedes estudiar inglés, francés, portugués y alemán. También puedes consultar con un asesor la disponibilidad del programa de italiano.',
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

function FAQ({
  items = questions,
  variant = 'default',
  eyebrow,
  title,
}) {
  const [openQuestion, setOpenQuestion] = useState(0)
  const isCampaign = variant === 'campaign'

  const toggleQuestion = (index) => {
    setOpenQuestion((currentQuestion) =>
      currentQuestion === index ? null : index,
    )
  }

  return (
    <section
      className={
        isCampaign
          ? 'campaign-landing-section scroll-mt-14 bg-[#fff8f6] px-[6%] py-16 text-[#17233a] lg:py-24'
          : 'bg-white px-[6%] py-16 text-[#17233a] lg:px-[12%] lg:py-20'
      }
      id={isCampaign ? 'dudas' : undefined}
    >
      <div className={`mx-auto ${isCampaign ? 'max-w-[900px]' : 'max-w-[1120px]'}`}>
        {(eyebrow || title) && (
          <div>
            {eyebrow && (
              <p className="font-mono text-[10px] font-bold uppercase tracking-[.15em] text-[#e83e33]">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-.045em] text-[#101820] sm:text-4xl">
                {title}
              </h2>
            )}
          </div>
        )}

        <div
          className={
            isCampaign
              ? 'mt-8 grid gap-3'
              : 'mt-8 overflow-hidden rounded-[1.5rem] border border-[#b9c6d6] bg-white px-6 shadow-[0_8px_20px_rgb(23_35_58_/_8%)] sm:px-10'
          }
        >
          {items.map((item, index) => {
            const isOpen = openQuestion === index

            return (
              <div
                className={
                  isCampaign
                    ? 'campaign-faq rounded-2xl border border-[#eadeda] bg-white px-5 shadow-[0_6px_18px_rgb(8_36_74_/_3%)]'
                    : `border-b border-[#dce3ed] last:border-b-0 ${
                        isOpen ? 'text-[#8f301d]' : 'text-[#71809a]'
                      }`
                }
                key={item.question}
              >
                <button
                  aria-expanded={isOpen}
                  className={`flex w-full items-center gap-5 py-6 text-left transition-colors hover:text-[#E83E33] ${
                    isCampaign ? 'font-bold text-[#183454]' : ''
                  }`}
                  type="button"
                  onClick={() => toggleQuestion(index)}
                >
                  {!isCampaign && item.icon && (
                    <span className="w-8 shrink-0 text-3xl leading-none" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className={`flex-1 ${isCampaign ? 'text-sm' : 'text-lg font-semibold sm:text-2xl'}`}>
                    {item.question}
                  </span>
                  <span
                    className={
                      isCampaign
                        ? `grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#fff1ef] text-xl leading-none text-[#e83e33] transition ${
                            isOpen ? 'rotate-45' : ''
                          }`
                        : 'w-8 shrink-0 text-center text-3xl font-light leading-none'
                    }
                    aria-hidden="true"
                  >
                    {isCampaign ? '+' : isOpen ? '−' : '+'}
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] pb-6 opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div
                    className={`min-h-0 overflow-hidden ${
                      isCampaign
                        ? 'text-sm leading-7 text-[#627493]'
                        : 'pl-[3.25rem] pr-10 text-base leading-[1.6] text-[#71809a]'
                    }`}
                  >
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
