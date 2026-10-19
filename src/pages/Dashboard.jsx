import { useCallback, useEffect, useState } from 'react'
import { ArrowRight, ExternalLink, FileText, LogOut, Plus, RefreshCw, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { listCampaigns } from '../lib/supabase'

function Dashboard() {
  const { session, signOut } = useAuth()
  const navigate = useNavigate()
  const [campaigns, setCampaigns] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadCampaigns = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setCampaigns(await listCampaigns(session.access_token))
    } catch (loadError) {
      setError(loadError.message || 'No se pudieron cargar las campañas.')
    } finally {
      setLoading(false)
    }
  }, [session.access_token])

  useEffect(() => {
    let active = true
    listCampaigns(session.access_token)
      .then((data) => { if (active) setCampaigns(data) })
      .catch((loadError) => { if (active) setError(loadError.message || 'No se pudieron cargar las campañas.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [session.access_token])

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  const filteredCampaigns = campaigns.filter((campaign) =>
    `${campaign.name} ${campaign.channel} ${campaign.slug}`.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#102d55]">
      <header className="border-b border-[#e0e7f0] bg-white">
        <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-4 px-[5%]">
          <Link to="/" aria-label="Towers, ir al inicio"><img className="h-auto w-[112px] object-contain" src="/images/Towers_logo.png" alt="Towers" /></Link>
          <div className="flex items-center gap-3"><span className="hidden text-sm text-[#7187a4] sm:inline">{session.user?.email}</span><button className="inline-flex items-center gap-2 rounded-lg border border-[#d3deeb] px-4 py-2.5 text-sm font-bold hover:border-[#ff443d] hover:text-[#e83e33]" type="button" onClick={handleSignOut}><LogOut size={16} /> Cerrar sesión</button></div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-[5%] py-10 lg:py-11">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#8ba0bf]">INT · BIBLIOTECA INTERNA — GESTOR DE MICRO-LANDINGS</p><h1 className="mt-3 text-4xl font-extrabold tracking-[-0.045em] text-[#08244a] sm:text-5xl">Micro-landings de campaña</h1><p className="mt-3 max-w-[700px] text-base leading-6 text-[#627b9e]">Crea, edita y publica páginas de campaña para dirigir a tus visitantes a un asesor.</p></div>
          <Link className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff443d] px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_16px_rgb(255_68_61_/_20%)] transition hover:-translate-y-0.5 hover:bg-[#da352f]" to="/campaigns/new"><Plus size={18} aria-hidden="true" /> Crear nueva micro-landing</Link>
        </div>

        <section className="mt-8 rounded-xl border border-[#e0e7f0] bg-white p-5 shadow-[0_8px_20px_rgb(18_42_75_/_4%)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2 text-sm font-semibold text-[#173a67]"><FileText className="h-5 w-5 text-[#ff443d]" aria-hidden="true" />{campaigns.length} {campaigns.length === 1 ? 'campaña' : 'campañas'}</div><div className="flex gap-2"><label className="flex w-full items-center gap-2 rounded-lg border border-[#dbe4ef] bg-white px-3 py-2 text-sm text-[#8ba0bf] sm:w-[280px]"><Search className="h-4 w-4" aria-hidden="true" /><span className="sr-only">Buscar campañas</span><input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#a5b3c5]" placeholder="Buscar campaña..." value={search} onChange={(event) => setSearch(event.target.value)} /></label><button className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#dbe4ef] text-[#627b9e] hover:text-[#e83e33]" type="button" onClick={loadCampaigns} aria-label="Actualizar campañas"><RefreshCw size={16} /></button></div></div>

          {error && <div className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-800" role="alert"><p>{error}</p><button className="mt-2 font-bold underline" type="button" onClick={loadCampaigns}>Intentar de nuevo</button></div>}
          {loading && <p className="py-14 text-center text-sm text-[#7187a4]">Cargando tus campañas…</p>}
          {!loading && !error && filteredCampaigns.length === 0 && <div className="py-14 text-center"><h2 className="text-lg font-bold text-[#08244a]">{search ? 'No hay coincidencias' : 'Aún no tienes micro-landings'}</h2><p className="mt-2 text-sm text-[#7187a4]">{search ? 'Prueba con otro término.' : 'Crea tu primera campaña para verla aquí.'}</p>{!search && <Link className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#08244a] px-4 py-2.5 text-sm font-bold text-white" to="/campaigns/new">Crear campaña <ArrowRight size={16} /></Link>}</div>}
          {!loading && filteredCampaigns.length > 0 && <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredCampaigns.map((campaign) => <article className="overflow-hidden rounded-xl border border-[#e0e7f0] bg-white" key={campaign.id}>
            <div className="relative flex min-h-[170px] items-end overflow-hidden bg-[#08244a] p-5 text-white"><img className="absolute inset-0 h-full w-full object-cover opacity-40" src="/images/Sinfoto.png" alt="" /><div className="absolute inset-0 bg-gradient-to-t from-[#061d3c]/90 to-transparent" aria-hidden="true" /><div className="relative"><span className="text-[10px] font-bold uppercase tracking-wider text-[#ff716b]">{campaign.content?.eyebrow || campaign.channel}</span><h2 className="mt-2 text-xl font-extrabold leading-tight">{campaign.content?.headline || campaign.name}</h2></div></div>
            <div className="p-4"><div className="flex items-start justify-between gap-2"><div><h3 className="font-bold text-[#08244a]">{campaign.name}</h3><p className="mt-1 text-xs text-[#7187a4]">/campaigns/{campaign.slug}</p></div><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${campaign.status === 'published' ? 'bg-[#e6faf2] text-[#0c9c70]' : 'bg-[#fff7e6] text-[#9a6a00]'}`}>{campaign.status === 'published' ? 'Publicada' : 'Borrador'}</span></div><p className="mt-2 text-sm text-[#7187a4]">{campaign.channel}</p><div className="mt-4 grid grid-cols-2 gap-2"><Link className="rounded-lg border border-[#d3deeb] px-3 py-2 text-center text-sm font-bold text-[#173a67] hover:border-[#ff443d] hover:text-[#ff443d]" to={`/campaigns/new?id=${campaign.id}`}>Editar</Link>{campaign.status === 'published' ? <a className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#08244a] px-3 py-2 text-sm font-bold text-white hover:bg-[#123b6e]" href={`/campaigns/${campaign.slug}`} target="_blank" rel="noreferrer">Ver landing <ExternalLink size={14} /></a> : <span className="grid place-items-center rounded-lg bg-[#f4f7fb] px-3 py-2 text-center text-xs text-[#7187a4]">Publica para compartir</span>}</div></div>
          </article>)}</div>}
        </section>
      </main>
    </div>
  )
}

export default Dashboard
