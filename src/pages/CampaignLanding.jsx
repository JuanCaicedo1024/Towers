import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getPublishedCampaign, isSupabaseConfigured } from '../lib/supabase'

function CampaignLanding() {
  const { slug } = useParams()
  const [campaign, setCampaign] = useState(null)
  const [loadedSlug, setLoadedSlug] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    getPublishedCampaign(slug)
      .then((result) => { if (active) { setCampaign(result); setLoadedSlug(slug); setError('') } })
      .catch((requestError) => { if (active) { setError(requestError.message); setLoadedSlug(slug); setCampaign(null) } })
    return () => { active = false }
  }, [slug])

  if (loadedSlug !== slug) return <main className="grid min-h-screen place-items-center text-[#627b9e]">Cargando campaña…</main>
  if (error || !campaign) {
    return <main className="grid min-h-screen place-items-center px-6 text-center"><div><h1 className="text-3xl font-bold text-[#08244a]">{!isSupabaseConfigured ? 'Campañas no configuradas' : 'No encontramos esta campaña'}</h1><p className="mt-3 max-w-lg text-[#627b9e]">{error || 'La campaña no existe o aún no está publicada.'}</p><Link className="mt-6 inline-flex text-sm font-bold text-[#e83e33]" to="/">Ir al inicio</Link></div></main>
  }

  const content = campaign.content || {}
  const contactUrl = content.destination === 'URL externa' && content.destinationUrl
    ? content.destinationUrl
    : `https://wa.me/?text=${encodeURIComponent(content.whatsappMessage || `Hola, quiero información sobre ${campaign.name}.`)}`
  const isExternal = contactUrl.startsWith('http')

  return (
    <main className="min-h-screen bg-white text-[#071026]">
      <header className="mx-auto flex max-w-[1280px] items-center justify-between px-[6%] py-5 lg:px-[8%]">
        <Link className="text-lg font-black tracking-[0.16em] text-[#08244a]" to="/" aria-label="Towers, inicio">TOWERS</Link>
        <a className="inline-flex items-center gap-2 rounded-lg bg-[#ff443d] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#da352f]" href={contactUrl} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined}>{content.cta || 'Hablar con un asesor'} <ArrowRight size={17} aria-hidden="true" /></a>
      </header>
      <section className="overflow-hidden bg-[#08244a] text-white">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-[6%] py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-[8%] lg:py-20">
          <div className="max-w-[560px]"><p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#ff716b]">{content.eyebrow || campaign.name}</p><h1 className="mt-5 text-4xl font-extrabold italic leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">{content.headline || campaign.name}</h1><p className="mt-6 text-lg leading-7 text-white/80">{content.supporting || ''}</p><a className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#ff443d] px-6 py-4 font-bold text-white hover:bg-[#da352f]" href={contactUrl} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined}>{content.cta || 'Hablar con un asesor'} <ArrowRight size={19} aria-hidden="true" /></a></div>
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-[#29475c] sm:min-h-[430px]"><img className="absolute inset-0 h-full w-full object-cover" src="/images/Sinfoto.png" alt="" /><div className="absolute inset-0 bg-gradient-to-t from-[#08244a]/65 to-transparent" aria-hidden="true" /></div>
        </div>
      </section>
      {content.benefits?.length > 0 && <section className="mx-auto grid max-w-[1150px] gap-4 px-[6%] py-12 sm:grid-cols-2 lg:grid-cols-3">{content.benefits.map((benefit) => <article className="rounded-xl border border-[#dbe4ef] p-5 text-[#173a67]" key={benefit}>{benefit}</article>)}</section>}
      {content.ctaHeadline && <section className="bg-[#f4f7fb] px-6 py-12 text-center"><h2 className="text-2xl font-extrabold text-[#08244a]">{content.ctaHeadline}</h2><a className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#08244a] px-5 py-3 font-bold text-white" href={contactUrl} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined}>{content.cta || 'Hablar con un asesor'} <ArrowRight size={18} aria-hidden="true" /></a></section>}
    </main>
  )
}

export default CampaignLanding
