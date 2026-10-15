import { ModalitiesHeading } from './ModalitiesShared'

const questions = ['¿Qué necesito para empezar?', '¿Cómo funcionan los horarios?', '¿Puedo cambiar entre presencial y online?', '¿Cómo es la dinámica de clase?', '¿Qué pasa después de solicitar información?']

function ModalitiesFaq() {
  return <section className="bg-[#f7f9fc] text-[#17233a]"><div className="mx-auto max-w-[1120px] px-[6%] py-16 lg:py-20"><ModalitiesHeading number="06" label="FAQ" description="eliminar opciones" /><h2 className="mt-8 text-4xl font-extrabold tracking-[-0.045em] text-[#10254a] sm:text-5xl">Preguntas frecuentes</h2><div className="mt-8 overflow-hidden rounded-2xl border border-[#dce4ed] bg-white">{questions.map((question) => <details className="border-b border-[#dce4ed] p-5 last:border-b-0" key={question}><summary className="cursor-pointer text-lg font-bold text-[#10254a]">{question}</summary><p className="mt-3 text-base leading-6 text-[#71809a]">Un asesor Towers puede orientarte sobre esta modalidad y los siguientes pasos.</p></details>)}</div></div></section>
}

export default ModalitiesFaq
