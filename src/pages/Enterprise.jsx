import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckSquare,
  ClipboardList,
  Clock3,
  GraduationCap,
  Layers3,
  MessageCircle,
  MonitorPlay,
  PlayCircle,
  Search,
  Target,
  UsersRound,
} from 'lucide-react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const solutions = [
  {
    title: 'Planes a la medida',
    description: 'Diseñamos el programa según tus objetivos, áreas y nivel de tu equipo.',
    Icon: Target,
  },
  {
    title: 'Formación por niveles',
    description: 'Rutas de aprendizaje claras desde nivel inicial hasta avanzado.',
    Icon: Layers3,
  },
  {
    title: 'Enfoque práctico',
    description: 'Desarrollo de habilidades comunicativas aplicadas al entorno laboral.',
    Icon: BriefcaseBusiness,
  },
  {
    title: 'Seguimiento y métricas',
    description: 'Reportes de avance para medir el impacto del programa en tu equipo.',
    Icon: BarChart3,
  },
]

const benefits = [
  {
    title: 'Mejora en comunicación profesional',
    description: 'Equipos que se comunican con mayor claridad y seguridad en contextos laborales.',
    Icon: MessageCircle,
  },
  {
    title: 'Horarios flexibles',
    description: 'Opciones que se adaptan a la operación de tu empresa y a la disponibilidad del equipo.',
    Icon: CalendarDays,
  },
  {
    title: 'Mayor confianza para reuniones y presentaciones',
    description: 'Desarrollo de competencias para interactuar con clientes, socios y equipos globales.',
    Icon: MonitorPlay,
  },
  {
    title: 'Capacitación por áreas',
    description: 'Programas específicos para las necesidades de cada equipo o departamento.',
    Icon: UsersRound,
  },
  {
    title: 'Acompañamiento docente',
    description: 'Profesores especializados con experiencia en la enseñanza de idiomas para entornos corporativos.',
    Icon: GraduationCap,
  },
  {
    title: 'Escalabilidad para diferentes equipos',
    description: 'Soluciones que crecen contigo, desde grupos pequeños hasta programas para toda la organización.',
    Icon: Layers3,
  },
]

const modalities = [
  {
    title: 'Programas in-company',
    description: 'Clases en tus instalaciones, con contenidos y dinámicas alineadas a la cultura y objetivos de tu empresa.',
    image: '/images/TOWERS/TOWERS/fotos/DSC06743.jpg.jpeg',
    alt: 'Docente facilitando una clase presencial',
  },
  {
    title: 'Corporate online',
    description: 'Formación virtual con la misma calidad de aprendizaje y la flexibilidad que tu equipo necesita.',
    image: '/images/Virtual.jpg',
    alt: 'Estudiante participando en una clase online',
  },
  {
    title: 'Planes híbridos',
    description: 'Una combinación estratégica de clases presenciales y online para equipos con diferentes dinámicas y ubicaciones.',
    image: '/images/Hibrida.jpg',
    alt: 'Modalidad híbrida de aprendizaje',
  },
]

const process = [
  {
    title: '01. Diagnóstico',
    description: 'Conocemos tus necesidades, objetivos y el perfil de tu equipo.',
    Icon: Search,
  },
  {
    title: '02. Propuesta personalizada',
    description: 'Diseñamos un plan de formación con modalidad, contenidos y alcance a tu medida.',
    Icon: ClipboardList,
  },
  {
    title: '03. Implementación del programa',
    description: 'Puesta en marcha del programa, con acompañamiento constante y seguimiento del equipo.',
    Icon: PlayCircle,
  },
  {
    title: '04. Seguimiento y evolución',
    description: 'Medimos avances, compartimos resultados y ajustamos el plan para seguir generando impacto.',
    Icon: BarChart3,
  },
]

const initialForm = {
  company: '',
  name: '',
  role: '',
  email: '',
  phone: '',
  teamSize: '',
  language: '',
  modality: '',
  objective: '',
  consent: false,
}

function Enterprise() {
  const [form, setForm] = useState(initialForm)
  const [whatsAppUrl, setWhatsAppUrl] = useState('')

  function updateField(event) {
    const { name, value, type, checked } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setWhatsAppUrl('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const message = [
      'Hola, quiero solicitar una propuesta de formación empresarial.',
      `Empresa: ${form.company}`,
      `Nombre: ${form.name}`,
      `Cargo: ${form.role}`,
      `Correo corporativo: ${form.email}`,
      `Teléfono: ${form.phone}`,
      `Número de colaboradores: ${form.teamSize}`,
      `Idioma de interés: ${form.language}`,
      `Modalidad preferida: ${form.modality}`,
      `Objetivo o necesidad: ${form.objective}`,
    ].join('\n')
    setWhatsAppUrl(`https://wa.me/573013490020?text=${encodeURIComponent(message)}`)
  }

  return (
    <>
      <Navbar />
      <main className="text-[#111827]">
        <section className="relative overflow-hidden bg-[#fff7f5]">
          <div className="pointer-events-none absolute -left-16 bottom-[-4rem] h-40 w-40 rounded-full bg-[#fce5e1]" aria-hidden="true" />
          <div className="pointer-events-none absolute right-[-3rem] top-12 h-48 w-48 rounded-full bg-[#fce5e1]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 px-[6%] py-12 sm:py-16 lg:min-h-[590px] lg:grid-cols-[1fr_0.95fr] lg:gap-14 lg:py-16">
            <div className="relative z-10">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#e83e33] sm:text-sm">
                <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
                Towers para empresas
              </p>
              <h1 className="mt-4 max-w-[650px] text-[clamp(2.4rem,4.7vw,4rem)] font-bold leading-[1.02] tracking-[-0.055em]">
                Capacita a tu equipo con programas de idiomas <span className="text-[#e83e33]">pensados para empresas.</span>
              </h1>
              <p className="mt-5 max-w-[600px] text-base leading-6 text-[#4b5563] sm:text-lg sm:leading-7">
                En Towers diseñamos soluciones de idiomas corporativas para equipos,
                áreas y objetivos de negocio, con programas flexibles, medibles y
                alineados a tus necesidades.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['In-company', 'Online / híbrido', 'Evaluación inicial', 'Horarios flexibles', 'Reportes de avance'].map((feature) => (
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e4e6eb] bg-white/90 px-2.5 py-1.5 text-xs font-medium text-[#4b5563]" key={feature}>
                    <CheckSquare className="h-3.5 w-3.5 text-[#e83e33]" aria-hidden="true" />
                    {feature}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#e83e33] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_18px_rgb(232_62_51_/_20%)] transition hover:-translate-y-0.5 hover:bg-[#cf3028]" href="#propuesta">
                  Solicitar propuesta
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border-2 border-[#8493a8] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition hover:-translate-y-0.5 hover:border-[#111827]" href="https://wa.me/573013490020?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20formaci%C3%B3n%20de%20idiomas%20para%20mi%20empresa." target="_blank" rel="noopener noreferrer">
                  Hablar con un asesor
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[590px] lg:justify-self-end">
              <div className="absolute -inset-4 rotate-[-3deg] rounded-[2rem] bg-[#f7d8d4]" aria-hidden="true" />
              <img className="relative aspect-[1.25/1] w-full rounded-[1.6rem] border-[6px] border-white object-cover object-center shadow-[0_18px_40px_rgb(23_35_58_/_18%)]" src="/images/TOWERS/TOWERS/fotos/DSC06743.jpg.jpeg" alt="Docente y estudiantes participando en una formación de idiomas" />
              <div className="absolute -bottom-5 left-[8%] right-[8%] flex items-center gap-3 rounded-xl bg-white p-3 shadow-[0_12px_28px_rgb(23_35_58_/_15%)] sm:p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#fff0eb] text-[#e83e33]">
                  <UsersRound className="h-6 w-6" aria-hidden="true" />
                </span>
                <span>
                  <strong className="block text-sm font-semibold text-[#111827]">Formación en idiomas para equipos</strong>
                  <span className="mt-0.5 block text-xs leading-4 text-[#4b5563]">Que impulsa la productividad, la colaboración y el crecimiento del negocio.</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="programas" className="scroll-mt-24 px-[6%] py-14 sm:py-16">
          <div className="mx-auto max-w-[1320px]">
            <Eyebrow>Soluciones corporativas</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Una solución flexible para el desarrollo de tu empresa</h2>
            <p className="mt-2 text-base text-[#4b5563]">Programas de idiomas diseñados para adaptarse a la realidad, los objetivos y el ritmo de tu organización.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {solutions.map(({ title, description, Icon }) => (
                <InfoCard key={title} title={title} description={description} Icon={Icon} />
              ))}
            </div>
          </div>
        </section>

        <section id="beneficios" className="scroll-mt-24 bg-[#fff8f6] px-[6%] py-14 sm:py-16">
          <div className="mx-auto max-w-[1320px]">
            <Eyebrow>Valor para tu empresa</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Beneficios para tu organización y tus colaboradores</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map(({ title, description, Icon }) => (
                <article className="flex gap-4 rounded-xl border border-[#f0e9e7] bg-white p-4 shadow-[0_6px_18px_rgb(23_35_58_/_6%)] transition hover:-translate-y-1 hover:shadow-[0_12px_24px_rgb(23_35_58_/_10%)]" key={title}>
                  <Icon className="h-7 w-7 shrink-0 text-[#e83e33]" strokeWidth={1.8} aria-hidden="true" />
                  <span>
                    <strong className="block text-base font-semibold leading-5">{title}</strong>
                    <span className="mt-1 block text-sm leading-5 text-[#4b5563]">{description}</span>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="metodologia" className="scroll-mt-24 px-[6%] py-14 sm:py-16">
          <div className="mx-auto max-w-[1320px]">
            <Eyebrow>Formatos corporativos</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Modalidades que se adaptan a tu operación</h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {modalities.map(({ title, description, image, alt }) => (
                <article className="group overflow-hidden rounded-2xl border border-[#e7e9ed] bg-white shadow-[0_8px_22px_rgb(23_35_58_/_6%)] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgb(23_35_58_/_12%)]" key={title}>
                  <div className="h-40 overflow-hidden sm:h-48">
                    <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={image} alt={alt} loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-5 text-[#4b5563]">{description}</p>
                    <span className="mt-3 block h-1 w-9 rounded-full bg-[#e83e33]" aria-hidden="true" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fff8f6] px-[6%] py-14 sm:py-16">
          <div className="mx-auto max-w-[1320px]">
            <Eyebrow>Nuestro proceso</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Así funciona un convenio empresarial con Towers</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {process.map(({ title, description, Icon }, index) => (
                <article className="relative rounded-xl border border-[#e7e9ed] bg-white p-5 shadow-[0_6px_18px_rgb(23_35_58_/_6%)]" key={title}>
                  <Icon className="h-7 w-7 text-[#e83e33]" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-5 text-[#4b5563]">{description}</p>
                  {index < process.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 bg-[#fff8f6] p-1 text-[#e83e33] lg:block" aria-hidden="true" />}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-[6%] pb-14 sm:pb-16">
          <div className="mx-auto grid max-w-[1320px] gap-5 rounded-2xl bg-[#08274f] p-6 text-white shadow-[0_14px_30px_rgb(8_39_79_/_20%)] sm:grid-cols-2 sm:p-8 lg:grid-cols-[1.2fr_repeat(3,1fr)] lg:items-center">
            <div>
              <Eyebrow light>Resultados que generan valor</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold leading-tight">Con la experiencia y el respaldo de Towers</h2>
            </div>
            <ResultItem Icon={Layers3} text="Programas adaptados a cada empresa" />
            <ResultItem Icon={UsersRound} text="Equipos acompañados por docentes expertos" />
            <ResultItem Icon={BarChart3} text="Avances medibles y reportables" />
          </div>
        </section>

        <section id="propuesta" className="scroll-mt-24 bg-[#fff8f6] px-[6%] py-14 sm:py-16">
          <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
            <div>
              <Eyebrow>Conversemos</Eyebrow>
              <h2 className="mt-3 text-4xl font-bold leading-[1.05] tracking-[-0.05em] sm:text-5xl">
                Solicita una propuesta <span className="text-[#e83e33]">para tu empresa.</span>
              </h2>
              <p className="mt-4 text-base leading-6 text-[#4b5563]">
                Cuéntanos sobre tu equipo y te ayudaremos a identificar la mejor opción según tus objetivos, modalidad y alcance.
              </p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#f0d7d2] bg-white px-4 py-3 text-sm font-medium text-[#4b5563]">
                <Clock3 className="h-5 w-5 text-[#e83e33]" aria-hidden="true" />
                Te responderemos para conversar sobre tu propuesta.
              </p>
              <a className="mt-4 flex w-fit items-center gap-2 text-sm font-semibold text-[#111827] underline underline-offset-4 hover:text-[#e83e33]" href="https://wa.me/573013490020?text=Hola%2C%20quiero%20hablar%20con%20un%20asesor%20sobre%20formaci%C3%B3n%20empresarial." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 text-[#e83e33]" aria-hidden="true" />
                O habla con un asesor
              </a>
            </div>

            <form className="rounded-2xl border border-[#e7e9ed] bg-white p-5 shadow-[0_14px_32px_rgb(23_35_58_/_12%)] sm:p-7" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Empresa" name="company" value={form.company} onChange={updateField} placeholder="Ej. Towers S.A." required />
                <FormField label="Nombre y apellido" name="name" value={form.name} onChange={updateField} placeholder="Ej. Laura Pérez" autoComplete="name" required />
                <FormField label="Cargo" name="role" value={form.role} onChange={updateField} placeholder="Ej. Gerente de RR. HH." required />
                <FormField label="Correo corporativo" name="email" type="email" value={form.email} onChange={updateField} placeholder="Ej. laura@empresa.com" autoComplete="email" required />
                <FormField label="Teléfono" name="phone" type="tel" value={form.phone} onChange={updateField} placeholder="Ej. +57 311 421-0000" autoComplete="tel" required />
                <SelectField label="Número de colaboradores" name="teamSize" value={form.teamSize} onChange={updateField} required options={['1–10', '11–25', '26–50', '51–100', 'Más de 100']} />
                <SelectField label="Idioma de interés" name="language" value={form.language} onChange={updateField} required options={['Inglés', 'Francés', 'Alemán', 'Portugués', 'Italiano']} />
                <SelectField label="Modalidad preferida" name="modality" value={form.modality} onChange={updateField} required options={['In-company', 'Online', 'Híbrida', 'Por definir']} />
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-[#111827]">Objetivo o necesidad <span className="text-[#e83e33]">*</span></span>
                  <textarea className="min-h-24 w-full resize-y rounded-lg border border-[#d6dce5] px-3 py-2.5 text-sm text-[#111827] outline-none transition placeholder:text-[#9aa4b2] focus:border-[#e83e33] focus:ring-2 focus:ring-[#e83e33]/15" name="objective" value={form.objective} onChange={updateField} placeholder="Cuéntanos brevemente tus objetivos (ej. mejorar la comunicación con clientes, preparar a tu equipo para reuniones internacionales, etc.)." maxLength={1200} required />
                </label>
                <label className="sm:col-span-2 flex items-start gap-2 text-xs leading-5 text-[#4b5563]">
                  <input className="mt-1 accent-[#e83e33]" type="checkbox" name="consent" checked={form.consent} onChange={updateField} required />
                  <span>Acepto que Towers me contacte para atender esta solicitud y el tratamiento de mis datos personales.</span>
                </label>
              </div>
              <button className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#e83e33] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_18px_rgb(232_62_51_/_18%)] transition hover:-translate-y-0.5 hover:bg-[#cf3028] hover:shadow-[0_12px_24px_rgb(232_62_51_/_25%)]" type="submit">
                Quiero una propuesta
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              {whatsAppUrl && (
                <p className="mt-4 rounded-lg bg-[#f0f9f2] p-3 text-sm text-[#235b34]" role="status">
                  <span className="mb-2 flex items-center gap-2 font-semibold"><Check className="h-4 w-4" aria-hidden="true" />Solicitud lista. Envíala por WhatsApp para que nuestro equipo la reciba.</span>
                  <a className="font-bold underline underline-offset-2" href={whatsAppUrl} target="_blank" rel="noopener noreferrer">Continuar por WhatsApp</a>
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Eyebrow({ children, light = false }) {
  return (
    <p className={`m-0 text-xs font-semibold uppercase tracking-[0.13em] ${light ? 'text-[#ff9189]' : 'text-[#e83e33]'}`}>
      {children}
    </p>
  )
}

function InfoCard({ title, description, Icon }) {
  return (
    <article className="group rounded-xl border border-[#e7e9ed] bg-white p-5 shadow-[0_6px_18px_rgb(23_35_58_/_6%)] transition hover:-translate-y-1 hover:shadow-[0_12px_24px_rgb(23_35_58_/_10%)]">
      <Icon className="h-7 w-7 text-[#e83e33] transition-transform group-hover:scale-110" aria-hidden="true" />
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-5 text-[#4b5563]">{description}</p>
      <span className="mt-3 block h-1 w-8 rounded-full bg-[#e83e33]" aria-hidden="true" />
    </article>
  )
}

function ResultItem({ Icon, text }) {
  return (
    <div className="flex items-center gap-3 border-t border-white/20 pt-4 sm:border-t-0 sm:pt-0 lg:border-l lg:border-t-0 lg:pl-5">
      <Icon className="h-7 w-7 shrink-0 text-white/90" aria-hidden="true" />
      <span className="text-sm font-medium leading-5 text-white/90">{text}</span>
    </div>
  )
}

function FormField({ label, name, value, onChange, type = 'text', ...props }) {
  return (
    <label>
      <span className="mb-1.5 block text-sm font-semibold text-[#111827]">{label} <span className="text-[#e83e33]">*</span></span>
      <input className="h-10 w-full rounded-lg border border-[#d6dce5] px-3 text-sm text-[#111827] outline-none transition placeholder:text-[#9aa4b2] focus:border-[#e83e33] focus:ring-2 focus:ring-[#e83e33]/15" name={name} type={type} value={value} onChange={onChange} maxLength={type === 'email' ? 254 : 150} {...props} />
    </label>
  )
}

function SelectField({ label, name, value, onChange, options, required = false }) {
  return (
    <label>
      <span className="mb-1.5 block text-sm font-semibold text-[#111827]">{label} {required && <span className="text-[#e83e33]">*</span>}</span>
      <select className="h-10 w-full rounded-lg border border-[#d6dce5] bg-white px-3 text-sm text-[#111827] outline-none transition focus:border-[#e83e33] focus:ring-2 focus:ring-[#e83e33]/15" name={name} value={value} onChange={onChange} required={required}>
        <option value="" disabled>Selecciona una opción</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}

export default Enterprise
