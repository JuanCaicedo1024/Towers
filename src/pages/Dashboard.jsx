import { ArrowRight, BarChart3, FileText, FolderPlus, Plus, Search, Settings, Users, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const campaigns = [
  {
    title: 'Inglés Cúcuta',
    headline: 'ENGLISH OPENS OPPORTUNITIES',
    description: 'Generar conversaciones por WhatsApp',
    channel: 'Google Ads',
    path: '/campaigns/ingles-cucuta',
    image: '/images/fondo.png',
    accent: 'from-[#06234c] to-[#0d3970]',
  },
  {
    title: 'Inglés profesional',
    headline: 'BIG PROGRESS STARTS HERE',
    description: 'Generar conversaciones por WhatsApp',
    channel: 'Meta Ads',
    path: '/campaigns/ingles-profesional',
    image: '/images/hero.png',
    accent: 'from-[#183454] to-[#53728f]',
  },
  {
    title: 'Inglés para vivir fuera',
    headline: 'A BRIGHTER YOU ABROAD',
    description: 'Generar conversaciones por WhatsApp',
    channel: 'Instagram',
    path: '/campaigns/ingles-vivir-fuera',
    image: '/images/Lenguajes.png',
    accent: 'from-[#29475c] to-[#8e6b4d]',
  },
]

function Dashboard() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [search, setSearch] = useState('')
  const filteredCampaigns = campaigns.filter((campaign) =>
    `${campaign.title} ${campaign.channel}`.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#102d55]">
      <header className="border-b border-[#e0e7f0] bg-white">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-[5%]">
          <Link to="/" aria-label="Towers, ir al inicio">
            <img className="h-auto w-[112px] object-contain" src="/images/Towers_logo.png" alt="Towers" />
          </Link>
          <Link className="rounded-lg border border-[#102d55] px-5 py-2.5 text-sm font-bold transition hover:bg-[#102d55] hover:text-white" to="/contacto">
            Hablar con un asesor
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-[5%] py-10 lg:py-11">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#8ba0bf]">
              INT · BIBLIOTECA INTERNA — GESTOR DE MICRO-LANDINGS
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.045em] text-[#08244a] sm:text-5xl">
              Micro-landings de campaña
            </h1>
            <p className="mt-3 max-w-[700px] text-base leading-6 text-[#627b9e]">
              Plantillas específicas para recibir tráfico proveniente de anuncios en Google Ads, Meta Ads, Facebook e Instagram, y dirigir al usuario hacia contacto con un asesor.
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff443d] px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_16px_rgb(255_68_61_/_20%)] transition hover:-translate-y-0.5 hover:bg-[#da352f]"
            type="button"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus size={18} aria-hidden="true" />
            Crear nueva micro-landing
          </button>
        </div>

        <section className="mt-5 rounded-xl border border-[#e0e7f0] bg-white p-5 shadow-[0_8px_20px_rgb(18_42_75_/_4%)]">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#8ba0bf]">Flujo de creación</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#173a67]">
            {['Google Ads / Meta Ads', 'Facebook / Instagram', 'Micro-landing', 'Mensaje específico', 'WhatsApp / Asesor', 'Matrícula'].map((step, index, steps) => (
              <span className="flex items-center gap-2" key={step}>
                <span className="rounded-lg bg-[#f0f4fa] px-3 py-2">{step}</span>
                {index < steps.length - 1 && <ArrowRight className="h-4 w-4 text-[#c7d5e7]" aria-hidden="true" />}
              </span>
            ))}
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#173a67]">
            <FileText className="h-5 w-5 text-[#ff443d]" aria-hidden="true" />
            {campaigns.length} campañas activas
          </div>
          <label className="flex w-full items-center gap-2 rounded-lg border border-[#dbe4ef] bg-white px-3 py-2 text-sm text-[#8ba0bf] sm:max-w-[280px]">
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Buscar campañas</span>
            <input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#a5b3c5]" placeholder="Buscar campaña..." value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
        </div>

        <section className="mt-4 grid gap-5 lg:grid-cols-3">
          {filteredCampaigns.map((campaign) => (
            <article className="group overflow-hidden rounded-xl border border-[#e0e7f0] bg-white shadow-[0_8px_20px_rgb(18_42_75_/_6%)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgb(18_42_75_/_14%)]" key={campaign.title}>
              <div className={`relative h-[176px] overflow-hidden bg-gradient-to-br ${campaign.accent}`}>
                <img className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-overlay transition duration-500 group-hover:scale-105" src={campaign.image} alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061d3c]/90 via-transparent to-transparent" aria-hidden="true" />
                <span className="absolute left-4 top-4 rounded-md bg-white/15 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">TOWERS</span>
                <strong className="absolute bottom-4 left-4 text-sm font-extrabold tracking-wide text-white">{campaign.headline}</strong>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-extrabold text-[#08244a]">{campaign.title}</h2>
                <p className="mt-1 text-sm text-[#7187a4]">{campaign.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-[#e6faf2] px-2.5 py-1 text-[#0c9c70]">● Publicada</span>
                  <span className="rounded-full bg-[#edf2ff] px-2.5 py-1 text-[#4265dd]">{campaign.channel}</span>
                </div>
                <p className="mt-4 truncate text-sm text-[#9aaac0]">{campaign.path}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link className="rounded-lg border border-[#d3deeb] px-3 py-2 text-center text-sm font-bold text-[#173a67] transition hover:border-[#ff443d] hover:text-[#ff443d]" to={campaign.path}>
                    Ver landing
                  </Link>
                  <button className="rounded-lg border border-[#d3deeb] px-3 py-2 text-sm font-bold text-[#173a67] transition hover:border-[#ff443d] hover:text-[#ff443d]" type="button">
                    Editar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [BarChart3, 'Rendimiento', 'Consulta resultados de tus campañas.'],
            [FolderPlus, 'Biblioteca', 'Organiza tus micro-landings.'],
            [Users, 'Asesores', 'Administra los contactos del equipo.'],
            [Settings, 'Configuración', 'Ajusta preferencias del panel.'],
          ].map(([Icon, title, description]) => (
            <button className="group rounded-xl border border-[#e0e7f0] bg-white p-4 text-left shadow-[0_8px_20px_rgb(18_42_75_/_4%)] transition hover:-translate-y-1 hover:border-[#ffb0ab]" type="button" key={title}>
              <Icon className="h-6 w-6 text-[#ff443d] transition group-hover:scale-110" aria-hidden="true" />
              <strong className="mt-3 block text-sm text-[#173a67]">{title}</strong>
              <span className="mt-1 block text-xs leading-5 text-[#8194af]">{description}</span>
            </button>
          ))}
        </section>
      </main>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#08244a]/45 px-5 backdrop-blur-sm" role="presentation" onClick={() => setIsCreateOpen(false)}>
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="create-landing-title" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#ff443d]">Nueva campaña</p>
                <h2 className="mt-2 text-2xl font-extrabold text-[#08244a]" id="create-landing-title">Crear micro-landing</h2>
              </div>
              <button className="rounded-full p-2 text-[#7187a4] hover:bg-[#f0f4fa]" type="button" aria-label="Cerrar" onClick={() => setIsCreateOpen(false)}><X size={18} /></button>
            </div>
            <div className="mt-6 grid gap-4">
              <label className="grid gap-1 text-sm font-bold text-[#173a67]">Nombre de campaña<input className="rounded-lg border border-[#dbe4ef] px-3 py-2.5 font-normal outline-none focus:border-[#ff443d]" placeholder="Ej. Inglés para profesionales" /></label>
              <label className="grid gap-1 text-sm font-bold text-[#173a67]">Canal de adquisición<select className="rounded-lg border border-[#dbe4ef] px-3 py-2.5 font-normal outline-none focus:border-[#ff443d]" defaultValue="Google Ads"><option>Google Ads</option><option>Meta Ads</option><option>Instagram</option><option>Facebook</option></select></label>
            </div>
            <button className="mt-6 w-full rounded-lg bg-[#ff443d] px-4 py-3 font-bold text-white hover:bg-[#da352f]" type="button" onClick={() => setIsCreateOpen(false)}>Continuar con la plantilla <ArrowRight className="ml-2 inline h-4 w-4" /></button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
