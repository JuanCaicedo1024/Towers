import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink, Save } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { getCampaignById, saveCampaign } from '../lib/supabase'

const initialForm = {
  name: '', slug: '', channel: 'Instagram', eyebrow: '', headline: '', supporting: '',
  image: '/images/Sinfoto.png', benefits: '', cta: 'Hablar con un asesor',
  destination: 'WhatsApp', destinationUrl: '', whatsappMessage: '', ctaHeadline: '',
}
const channels = ['Google Ads', 'Meta Ads', 'Facebook', 'Instagram']
const images = ['/images/Sinfoto.png']

function slugify(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function Field({ label, className = '', ...props }) {
  return <label className={`grid gap-2 text-sm font-semibold text-[#173a67] ${className}`}>{label}{props.children}</label>
}

function CampaignBuilder() {
  const [searchParams] = useSearchParams()
  const campaignId = searchParams.get('id')
  const { session } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(Boolean(campaignId))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!campaignId) return
    let active = true
    getCampaignById(campaignId, session.access_token)
      .then((campaign) => {
        if (!active) return
        if (!campaign) throw new Error('No encontramos la campaña o no tienes acceso para editarla.')
        const content = campaign.content || {}
        setForm({
          name: campaign.name,
          slug: campaign.slug,
          channel: campaign.channel,
          eyebrow: content.eyebrow || '',
          headline: content.headline || '',
          supporting: content.supporting || '',
          image: content.image || images[0],
          benefits: (content.benefits || []).join('\n'),
          cta: content.cta || 'Hablar con un asesor',
          destination: content.destination || 'WhatsApp',
          destinationUrl: content.destinationUrl || '',
          whatsappMessage: content.whatsappMessage || '',
          ctaHeadline: content.ctaHeadline || '',
        })
      })
      .catch((loadError) => { if (active) setError(loadError.message) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [campaignId, session.access_token])

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value, ...(key === 'name' && !campaignId ? { slug: slugify(value) } : {}) }))
    setError('')
    setNotice('')
  }

  async function handleSave(status) {
    setError('')
    setNotice('')
    if (form.name.trim().length < 2) return setError('Escribe un nombre para la campaña.')
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) return setError('Usa un slug en minúsculas, sin espacios ni caracteres especiales.')
    if (!form.headline.trim()) return setError('Escribe el titular principal de la landing.')
    if (form.destination === 'URL externa' && !/^https:\/\//i.test(form.destinationUrl)) return setError('El enlace de destino debe comenzar por https://.')

    setSaving(true)
    const content = {
      eyebrow: form.eyebrow.trim(),
      headline: form.headline.trim(),
      supporting: form.supporting.trim(),
      image: form.image,
      benefits: form.benefits.split('\n').map((item) => item.trim()).filter(Boolean),
      cta: form.cta.trim() || 'Hablar con un asesor',
      destination: form.destination,
      destinationUrl: form.destination === 'URL externa' ? form.destinationUrl.trim() : '',
      whatsappMessage: form.whatsappMessage.trim(),
      ctaHeadline: form.ctaHeadline.trim(),
    }
    try {
      const campaign = await saveCampaign({
        ...(campaignId ? { id: campaignId } : {}),
        owner_id: session.user.id,
        name: form.name.trim(),
        slug: form.slug,
        channel: form.channel,
        status,
        content,
      }, session.access_token)
      setNotice(status === 'published' ? 'Landing publicada correctamente.' : 'Borrador guardado correctamente.')
      if (!campaignId && campaign?.id) navigate(`/campaigns/new?id=${campaign.id}`, { replace: true })
    } catch (saveError) {
      setError(saveError.message || 'No se pudo guardar la campaña. Tus cambios siguen en pantalla.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <main className="grid min-h-screen place-items-center text-[#627b9e]">Cargando campaña…</main>

  return (
    <main className="campaign-builder min-h-screen bg-[#f5f7fb] px-4 py-5 text-[#102d55] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <Link className="inline-flex items-center gap-2 text-sm font-medium text-[#08244a] hover:text-[#ff443d]" to="/dashboard"><ArrowLeft size={17} /> Volver al dashboard</Link>
        <header className="mt-7"><h1 className="text-3xl font-extrabold tracking-[-0.04em] text-[#08244a] sm:text-4xl">{campaignId ? 'Editar micro-landing' : 'Crea una landing para una campaña.'}</h1><p className="mt-2 text-base text-[#627b9e]">Completa el contenido, revisa la vista previa y guarda como borrador o publica.</p></header>

        {error && <p className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p>}
        {notice && <p className="mt-5 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800" role="status">{notice}</p>}

        <div className="mt-7 grid items-start gap-7 lg:grid-cols-[1fr_0.85fr]">
          <section className="rounded-2xl border border-[#dfe6ef] bg-white p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nombre de campaña"><input value={form.name} onChange={(event) => update('name', event.target.value)} maxLength={100} required /></Field>
              <Field label="Slug de la URL"><div className="flex overflow-hidden rounded-lg border border-[#dbe4ef]"><span className="bg-[#f4f7fb] px-3 py-3 text-xs text-[#9aabc0]">/campaigns/</span><input className="min-w-0 flex-1 border-0" value={form.slug} onChange={(event) => update('slug', slugify(event.target.value))} required /></div></Field>
              <Field label="Canal"><select value={form.channel} onChange={(event) => update('channel', event.target.value)}>{channels.map((channel) => <option key={channel}>{channel}</option>)}</select></Field>
              <Field label="Texto superior"><input value={form.eyebrow} onChange={(event) => update('eyebrow', event.target.value)} placeholder="Ej. Inglés para tu próximo paso" /></Field>
              <Field className="sm:col-span-2" label="Titular principal"><input value={form.headline} onChange={(event) => update('headline', event.target.value)} maxLength={140} required /></Field>
              <Field className="sm:col-span-2" label="Descripción"><textarea rows="3" value={form.supporting} onChange={(event) => update('supporting', event.target.value)} /></Field>
              <Field label="Imagen principal"><select value={form.image} onChange={(event) => update('image', event.target.value)}>{images.map((image) => <option value={image} key={image}>{image.replace('/images/', '')}</option>)}</select></Field>
              <Field label="Texto del botón"><input value={form.cta} onChange={(event) => update('cta', event.target.value)} /></Field>
              <Field className="sm:col-span-2" label="Beneficios (uno por línea)"><textarea rows="3" value={form.benefits} onChange={(event) => update('benefits', event.target.value)} placeholder="Cada línea aparecerá como un beneficio" /></Field>
              <Field label="Destino del botón"><select value={form.destination} onChange={(event) => update('destination', event.target.value)}><option>WhatsApp</option><option>URL externa</option></select></Field>
              {form.destination === 'URL externa' ? <Field label="URL de destino"><input type="url" value={form.destinationUrl} onChange={(event) => update('destinationUrl', event.target.value)} placeholder="https://" /></Field> : <Field label="Mensaje de WhatsApp"><input value={form.whatsappMessage} onChange={(event) => update('whatsappMessage', event.target.value)} placeholder="Hola, quiero más información…" /></Field>}
              <Field className="sm:col-span-2" label="Título de cierre (opcional)"><input value={form.ctaHeadline} onChange={(event) => update('ctaHeadline', event.target.value)} /></Field>
            </div>
            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#edf0f4] pt-6 sm:flex-row sm:justify-end">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#d3deeb] px-5 py-3 text-sm font-bold text-[#173a67] disabled:opacity-60" type="button" onClick={() => handleSave('draft')} disabled={saving || (Boolean(campaignId) && !form.name)}><Save size={17} />{saving ? 'Guardando…' : 'Guardar borrador'}</button>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff443d] px-5 py-3 text-sm font-bold text-white hover:bg-[#da352f] disabled:opacity-60" type="button" onClick={() => handleSave('published')} disabled={saving || (Boolean(campaignId) && !form.name)}>{saving ? 'Publicando…' : 'Publicar landing'} <ArrowRight size={17} /></button>
            </div>
          </section>

          <aside className="overflow-hidden rounded-2xl border border-[#dfe6ef] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#edf0f4] px-5 py-4"><div><p className="text-xs font-bold uppercase tracking-wide text-[#8ba0bf]">Vista previa</p><h2 className="mt-1 text-sm font-bold text-[#08244a]">{form.name || 'Tu campaña'}</h2></div>{campaignId && <a className="inline-flex items-center gap-1 text-xs font-bold text-[#e83e33]" href={`/campaigns/${form.slug}`} target="_blank" rel="noreferrer">Abrir <ExternalLink size={14} /></a>}</div>
            <div className="mx-auto max-w-[500px] p-4"><div className="overflow-hidden rounded-xl border border-[#dbe4ef]"><div className="bg-[#08244a] text-white"><div className="grid min-h-[330px] sm:grid-cols-2"><div className="flex flex-col items-start justify-center p-5"><p className="text-[10px] font-bold uppercase tracking-wide text-[#ff716b]">{form.eyebrow || form.name || 'Campaña'}</p><h3 className="mt-3 text-2xl font-extrabold leading-tight">{form.headline || 'El titular de tu campaña'}</h3><p className="mt-3 text-xs leading-5 text-white/75">{form.supporting || 'Aquí aparecerá la descripción que escribas.'}</p><span className="mt-5 rounded-lg bg-[#ff443d] px-3 py-2 text-xs font-bold">{form.cta || 'Llamada a la acción'}</span></div><img className="h-full min-h-48 w-full object-cover" src={form.image} alt="" /></div></div><div className="grid gap-2 p-4 sm:grid-cols-2">{form.benefits.split('\n').map((benefit) => benefit.trim()).filter(Boolean).map((benefit) => <div key={benefit} className="rounded-lg border border-[#dbe4ef] p-3 text-xs text-[#173a67]">{benefit}</div>)}</div>{form.ctaHeadline && <div className="bg-[#f4f7fb] p-5 text-center text-sm font-bold text-[#08244a]">{form.ctaHeadline}</div>}</div></div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default CampaignBuilder
