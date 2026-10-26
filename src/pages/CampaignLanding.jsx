import AnimatedText from '@/components/ui/AnimatedText'
import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, Check, Clock3, GraduationCap, MapPin, Sparkles } from 'lucide-react'
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
  if (error || !campaign) return <main className="grid min-h-screen place-items-center px-6 text-center"><div><h1 className="text-3xl font-bold text-[#08244a]"><AnimatedText>{!isSupabaseConfigured ? 'Campañas no configuradas' : 'No encontramos esta campaña'}</AnimatedText></h1><p className="mt-3 max-w-lg text-[#627b9e]">{error || 'La campaña no existe o aún no está publicada.'}</p><Link className="mt-6 inline-flex text-sm font-bold text-[#e83e33]" to="/">Ir al inicio</Link></div></main>

  const content = campaign.content || {}
  const contactUrl = content.destination === 'URL externa' && content.destinationUrl
    ? content.destinationUrl
    : `https://wa.me/?text=${encodeURIComponent(content.whatsappMessage || `Hola, quiero información sobre ${campaign.name}.`)}`
  const external = contactUrl.startsWith('http')
  const benefits = content.benefits || []
  const outcomes = content.outcomes || []
  const curriculum = content.curriculum || []
  const faqs = content.faqs || []
  const image = content.image || '/images/hero.png'
  const hasDetails = content.level || content.duration || content.modality || content.schedule

  return <main className="campaign-landing min-h-screen overflow-hidden bg-white text-[#101820]">
    <header className="campaign-landing-header relative z-10 mx-auto flex max-w-[1440px] items-center justify-between px-[6%] py-4 lg:px-[8%]">
      <Link className="campaign-brand-link" to="/" aria-label="Towers, inicio"><img className="h-12 w-auto object-contain sm:h-16" src="/images/Towers_logo.png" alt="Towers" /></Link>
      <a className="inline-flex items-center gap-2 rounded-xl bg-[#E83E33] px-4 py-3 text-sm font-bold text-white shadow-[0_8px_18px_rgb(232_62_51_/_22%)] transition hover:-translate-y-0.5 hover:bg-[#cf3028] sm:px-6" href={contactUrl} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{content.cta || 'Hablar con un asesor'} <ArrowRight size={17} /></a>
    </header>

    <section className="campaign-landing-hero relative isolate overflow-hidden bg-[#fff8f6]">
      <div className="pointer-events-none absolute -right-28 -top-40 h-[34rem] w-[34rem] rounded-full border border-[#e83e33]/10" />
      <img className="campaign-hero-brand-mark pointer-events-none absolute -bottom-28 -left-20 hidden w-[25rem] opacity-[.045] lg:block" src="/images/Towers_logo.png" alt="" aria-hidden="true" />
      <div className="mx-auto grid min-h-[560px] max-w-[1440px] items-center gap-8 px-[6%] py-12 lg:grid-cols-[1.05fr_.95fr] lg:px-[8%] lg:py-16">
        <div className="relative z-10 max-w-[740px]">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#f1c9c4] bg-white/80 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#c83a2f]"><Sparkles size={14} />{content.eyebrow || campaign.name}</p>
          <h1 className="mt-6 text-[clamp(2.8rem,5.5vw,5.7rem)] font-extrabold leading-[.97] tracking-[-.055em] text-[#101820]"><AnimatedText>{content.headline || campaign.name}</AnimatedText></h1>
          <p className="mt-6 max-w-[670px] text-base font-medium leading-7 text-[#294d78] sm:text-lg"><AnimatedText>{content.supporting || 'Aprende con una metodología práctica, profesores preparados y experiencias que llevan el idioma a situaciones reales.'}</AnimatedText></p>
          {hasDetails && <div className="mt-7 flex flex-wrap gap-2">{[[content.level, GraduationCap], [content.duration, Clock3], [content.modality, MapPin], [content.schedule, null]].filter(([value]) => value).map(([value, Icon]) => <span className="inline-flex items-center gap-2 rounded-lg border border-[#dbe4ef] bg-white px-3 py-2 text-xs font-bold text-[#183454]" key={value}>{Icon && <Icon size={14} className="text-[#e83e33]" />}{value}</span>)}</div>}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a className="inline-flex min-h-14 w-full items-center justify-between gap-8 rounded-xl bg-[#E83E33] px-6 py-4 font-bold text-white shadow-[0_8px_18px_rgb(232_62_51_/_22%)] transition hover:-translate-y-0.5 hover:bg-[#cf3028] sm:w-auto" href={contactUrl} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{content.cta || 'Hablar con un asesor'} <ArrowRight size={19} /></a>
            {content.ctaHeadline && <a className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-[#183454] hover:text-[#e83e33]" href="#programa">{content.ctaHeadline} <ArrowDown size={15} /></a>}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[590px] lg:ml-auto">
          <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-[#E83E33]/10" />
          <div className="relative h-[350px] overflow-hidden rounded-[1.7rem] border-[8px] border-white bg-[#dce8f0] shadow-[0_24px_70px_rgb(8_36_74_/_16%)] sm:h-[490px]"><img className="h-full w-full object-cover" src={image} alt={content.imageAlt || `Estudiantes de ${campaign.name}`} /><div className="absolute inset-0 bg-gradient-to-t from-[#08244a]/45 via-transparent to-transparent" />
            {content.imageCaption && <p className="absolute bottom-5 left-5 rounded-lg bg-white/90 px-4 py-2 text-xs font-bold text-[#183454] backdrop-blur">{content.imageCaption}</p>}
          </div>
          <div className="absolute -bottom-5 -left-4 hidden rounded-2xl bg-[#08244a] px-5 py-4 text-white shadow-lg sm:block"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#ffaaa4]">Experiencia Towers</p><p className="mt-1 text-sm font-bold">Aprendizaje para la vida real</p></div>
        </div>
      </div>
    </section>

    {benefits.length > 0 && <section id="experiencia" className="campaign-landing-section mx-auto max-w-[1200px] scroll-mt-14 px-[6%] py-16 lg:px-8 lg:py-24"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div className="max-w-xl"><p className="font-mono text-[10px] font-bold uppercase tracking-[.15em] text-[#e83e33]">Tu experiencia</p><h2 className="mt-3 text-3xl font-extrabold tracking-[-.045em] text-[#101820] sm:text-4xl">Una forma de aprender que sí se siente</h2></div><p className="max-w-xs text-sm leading-6 text-[#7187a4]">Todo lo que necesitas para avanzar con confianza y disfrutar el proceso.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{benefits.map((benefit, index) => <article className="campaign-selling-card group relative overflow-hidden rounded-[1.35rem] border border-[#e3e9ef] bg-white p-6 shadow-[0_8px_24px_rgb(8_36_74_/_4%)] transition duration-300 hover:-translate-y-2 hover:border-[#f1c9c4] hover:shadow-[0_22px_42px_rgb(8_36_74_/_12%)]" key={benefit}><span className="absolute -right-7 -top-8 h-24 w-24 rounded-full bg-[#fff8f6] transition duration-500 group-hover:scale-[2.4]" /><span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-[#fff1ef] text-sm font-extrabold text-[#e83e33]">0{index + 1}</span><p className="relative mt-7 font-semibold leading-6 text-[#183454]">{benefit}</p><span className="relative mt-6 block h-1 w-8 rounded-full bg-[#e83e33] transition-all duration-300 group-hover:w-16" /></article>)}</div></section>}

    {outcomes.length > 0 && <section id="resultados" className="campaign-landing-section campaign-results-section scroll-mt-14 bg-[#08244a] text-white"><div className="mx-auto grid max-w-[1200px] gap-10 px-[6%] py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-24"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[.15em] text-[#ffaaa4]">Al terminar</p><h2 className="mt-3 text-3xl font-extrabold tracking-[-.045em] sm:text-4xl">Lo que podrás hacer</h2><p className="mt-4 max-w-sm leading-7 text-white/70">Desarrolla habilidades que puedes llevar a tus estudios, trabajo y vida cotidiana.</p></div><div className="grid gap-3 sm:grid-cols-2">{outcomes.map((item, index) => <div className="campaign-result-card flex gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-5 leading-6 text-white/90 transition hover:-translate-y-1 hover:bg-white/[.12]" key={item}><span className="font-mono text-xs font-bold text-[#ffaaa4]">0{index + 1}</span><Check className="mt-1 shrink-0 text-[#ff716b]" size={17} />{item}</div>)}</div></div></section>}

    {content.methodology && <section className="campaign-landing-section bg-[#f5f7fb]"><div className="mx-auto grid max-w-[1200px] items-center gap-8 px-[6%] py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-24"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[.15em] text-[#e83e33]">Metodología Towers</p><h2 className="mt-3 text-3xl font-extrabold tracking-[-.045em] text-[#101820] sm:text-4xl">Aprende haciendo</h2></div><div className="relative rounded-[1.5rem] border border-white bg-white p-7 shadow-[0_18px_38px_rgb(8_36_74_/_8%)]"><span className="absolute -left-2 top-7 h-10 w-1 rounded-full bg-[#e83e33]" /><p className="text-base leading-8 text-[#294d78] sm:text-lg">{content.methodology}</p></div></div></section>}

    {curriculum.length > 0 && <section id="programa" className="campaign-landing-section mx-auto max-w-[1200px] scroll-mt-14 px-[6%] py-16 lg:px-8 lg:py-24"><div className="mb-10"><p className="font-mono text-[10px] font-bold uppercase tracking-[.15em] text-[#e83e33]">Contenido del curso</p><h2 className="mt-3 text-3xl font-extrabold tracking-[-.045em] text-[#101820] sm:text-4xl">Un camino claro, paso a paso</h2></div><div className="grid gap-4 md:grid-cols-2">{curriculum.map((item, index) => <article className="campaign-curriculum-card group flex gap-5 rounded-[1.35rem] border border-[#e3e9ef] bg-white p-5 shadow-[0_8px_24px_rgb(8_36_74_/_3%)] transition hover:-translate-y-1 hover:border-[#f1c9c4] hover:shadow-[0_18px_35px_rgb(8_36_74_/_9%)] sm:p-6" key={`${item.title}-${index}`}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#fff1ef] font-mono text-sm font-bold text-[#e83e33] transition group-hover:bg-[#e83e33] group-hover:text-white">0{index + 1}</span><div><h3 className="font-bold text-[#08244a]">{item.title}</h3>{item.description && <p className="mt-2 text-sm leading-6 text-[#627493]">{item.description}</p>}</div></article>)}</div></section>}

    {faqs.length > 0 && <section id="dudas" className="campaign-landing-section bg-[#fff8f6] scroll-mt-14"><div className="mx-auto max-w-[900px] px-[6%] py-16 lg:px-8 lg:py-24"><p className="font-mono text-[10px] font-bold uppercase tracking-[.15em] text-[#e83e33]">Preguntas frecuentes</p><h2 className="mt-3 text-3xl font-extrabold tracking-[-.045em] text-[#101820] sm:text-4xl">Resolvemos tus dudas</h2><div className="mt-8 grid gap-3">{faqs.map((faq) => <details className="campaign-faq group rounded-2xl border border-[#eadeda] bg-white px-5 py-4 shadow-[0_6px_18px_rgb(8_36_74_/_3%)]" key={faq.question}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#183454] marker:hidden">{faq.question}<span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#fff1ef] text-xl leading-none text-[#e83e33] transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-3 text-sm leading-7 text-[#627493]">{faq.answer}</p></details>)}</div></div></section>}

    <section id="contacto" className="campaign-landing-section scroll-mt-14 px-[6%] py-14 lg:px-8 lg:py-20"><div className="campaign-final-cta relative mx-auto max-w-[1200px] overflow-hidden rounded-[1.7rem] bg-[#E83E33] px-7 py-10 text-white shadow-[0_24px_50px_rgb(232_62_51_/_22%)] sm:px-12 sm:py-14"><div className="absolute -right-10 -top-32 h-72 w-72 rounded-full border border-white/20" /><div className="absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-white/10 blur-2xl" /><div className="relative flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[.15em] text-white/75">Da el siguiente paso</p><h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-[-.045em] sm:text-4xl">{content.ctaHeadline || 'Tu próximo paso empieza aquí.'}</h2></div><a className="campaign-final-cta-button inline-flex shrink-0 items-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-bold text-[#c83a2f] shadow-lg transition hover:-translate-y-1" href={contactUrl} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{content.cta || 'Hablar con un asesor'} <ArrowRight size={18} /></a></div></div></section>
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-[#edf0f4] px-[6%] py-6 sm:flex-row lg:px-[8%]"><Link to="/" aria-label="Towers, inicio"><img className="h-9 w-auto object-contain" src="/images/Towers_logo_recortado.png" alt="Towers" /></Link><p className="text-xs text-[#71809a]">© {new Date().getFullYear()} Towers. Aprende para usarlo donde importa.</p></footer>
  </main>
}

export default CampaignLanding
