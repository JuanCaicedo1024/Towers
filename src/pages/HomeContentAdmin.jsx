import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUp, ImagePlus, LoaderCircle, Plus, Save, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { defaultHomeContent } from '../data/homeContent'
import { deleteHomeImage, getHomeContent, saveHomeContent, uploadHomeImage } from '../lib/supabase'

const clone = (value) => JSON.parse(JSON.stringify(value))
const fieldClass = 'w-full rounded-xl border border-[#dbe4ef] bg-white px-4 py-3 text-sm text-[#173a67] outline-none transition focus:border-[#e83e33] focus:ring-2 focus:ring-[#e83e33]/10'
const imageMarker = '/storage/v1/object/public/site-content/'
function collectImages(content) {
  return [content.hero?.image, ...(content.communitySlides || []).map((item) => item.image), ...(content.testimonials || []).map((item) => item.photo || item.image)].filter((url) => typeof url === 'string' && url.includes(imageMarker))
}

function HomeContentAdmin() {
  const { session } = useAuth()
  const [form, setForm] = useState(() => clone(defaultHomeContent))
  const [original, setOriginal] = useState(() => clone(defaultHomeContent))
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [upload, setUpload] = useState(null)

  useEffect(() => {
    let active = true
    getHomeContent()
      .then((saved) => {
        if (!active) return
        const legacySlides = Array.isArray(saved?.testimonials) && saved.testimonials.length
          ? saved.testimonials.map((item, index) => ({ id: item.id || `legacy-slide-${index}`, image: item.image || item.photo || '', title: item.title || item.name || '', description: item.description || item.comment || '' }))
          : null
        const merged = { ...clone(defaultHomeContent), ...(saved || {}), hero: { ...clone(defaultHomeContent.hero), ...(saved?.hero || {}) }, faqs: Array.isArray(saved?.faqs) ? saved.faqs : clone(defaultHomeContent.faqs), communitySlides: Array.isArray(saved?.communitySlides) ? saved.communitySlides : legacySlides || clone(defaultHomeContent.communitySlides) }
        delete merged.testimonials
        setForm(merged)
        setOriginal(clone(merged))
      })
      .catch((loadError) => { if (active) setError(`No se pudo cargar el contenido desde Supabase. ${loadError.message}`) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  function updateHero(key, value) {
    setForm((current) => ({ ...current, hero: { ...current.hero, [key]: value } }))
    setError(''); setNotice('')
  }
  function restoreHomeDefaults() {
    if (!window.confirm('¿Restablecer la portada a sus valores originales? Se perderán los cambios sin guardar. Guarda después para publicar este restablecimiento.')) return
    setForm(clone(defaultHomeContent))
    setError('')
    setNotice('Portada restablecida en el editor. Guarda para publicar el cambio.')
  }
  function updateItem(group, index, key, value) {
    setForm((current) => ({ ...current, [group]: current[group].map((item, position) => position === index ? { ...item, [key]: value } : item) }))
    setError(''); setNotice('')
  }
  function reorder(group, index, direction) {
    setForm((current) => {
      const items = [...current[group]]
      const next = index + direction
      if (next < 0 || next >= items.length) return current
      ;[items[index], items[next]] = [items[next], items[index]]
      return { ...current, [group]: items }
    })
  }
  function removeItem(group, index, label) {
    if (!window.confirm(`¿Eliminar ${label}? Este cambio se aplicará cuando guardes el contenido.`)) return
    setForm((current) => ({ ...current, [group]: current[group].filter((_, position) => position !== index) }))
    setNotice('')
  }

  async function handleImage(event, setUrl) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (upload && upload.progress < 100 && !upload.status.startsWith('Error')) return setError('Espera a que termine la carga actual antes de elegir otra imagen.')
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return setError('Elige una imagen JPG, PNG o WebP.')
    if (file.size > 5 * 1024 * 1024) return setError('La imagen debe pesar 5 MB o menos.')
    setUpload({ name: file.name, progress: 0, status: 'Cargando imagen…' })
    setError(''); setNotice('')
    try {
      const url = await uploadHomeImage(file, session.access_token, (progress) => setUpload({ name: file.name, progress, status: 'Cargando imagen…' }))
      setUrl(url)
      setUpload({ name: file.name, progress: 100, status: 'Imagen cargada correctamente.' })
      window.setTimeout(() => setUpload((current) => current?.progress === 100 ? null : current), 2500)
    } catch (uploadError) {
      setUpload({ name: file.name, progress: 0, status: `Error: ${uploadError.message}` })
      setError(uploadError.message)
    }
  }

  async function handleSave(event) {
    event.preventDefault()
    setError(''); setNotice('')
    if (!form.hero.titleLine1.trim() || !form.hero.titleLine2.trim() || !form.hero.titleLine3.trim() || !form.hero.description.trim() || !form.hero.primaryCta.trim() || !form.hero.secondaryCta.trim() || !form.hero.levelTestCta.trim()) return setError('Completa los textos principales y los botones del Hero.')
    if (form.faqs.some((item) => !item.question.trim() || !item.answer.trim())) return setError('Completa la pregunta y la respuesta de cada FAQ, o elimina la fila vacía.')
    if (form.communitySlides.some((item) => !item.title.trim() || !item.description.trim() || !item.image.trim())) return setError('Cada reseña necesita foto, título y descripción, o elimina la tarjeta vacía.')
    if (form.announcementActive && !form.announcementText.trim()) return setError('Escribe el aviso de la portada o desactívalo antes de guardar.')
    setSaving(true)
    try {
      const clean = {
        ...form,
        announcementText: form.announcementText.trim(),
        announcementActive: Boolean(form.announcementActive),
        hero: Object.fromEntries(Object.entries(form.hero).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])),
        faqs: form.faqs.map((item) => ({ ...item, question: item.question.trim(), answer: item.answer.trim() })),
        communitySlides: form.communitySlides.map((item) => ({ ...item, title: item.title.trim(), description: item.description.trim() })),
      }
      await saveHomeContent(clean, session.access_token)
      const removedImages = collectImages(original).filter((url) => !collectImages(clean).includes(url))
      const cleanup = await Promise.allSettled(removedImages.map((url) => deleteHomeImage(url, session.access_token)))
      setForm(clean); setOriginal(clone(clean))
      const failedCleanup = cleanup.filter((item) => item.status === 'rejected').length
      setNotice(failedCleanup ? 'Contenido guardado. No se pudieron eliminar algunas imágenes reemplazadas.' : 'Cambios guardados. La portada pública ya muestra el contenido actualizado.')
    } catch (saveError) {
      setError(`No se pudieron guardar los cambios. ${saveError.message}`)
    } finally { setSaving(false) }
  }

  const labelClass = 'grid gap-2 text-sm font-semibold text-[#173a67]'
  const progressPercent = upload?.progress || 0

  return <div className="min-h-screen bg-[#f4f7fb] text-[#102d55]">
    <main className="mx-auto max-w-[1180px] px-3 py-8 sm:px-8 lg:py-12">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="font-mono text-xs font-bold uppercase tracking-[.14em] text-[#e83e33]">Solo propietario</p><h1 className="mt-2 text-3xl font-extrabold tracking-[-.04em] text-[#08244a] sm:text-4xl">Contenido de la portada</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#627b9e]">Edita el Hero, organiza las preguntas frecuentes y las tarjetas del carrusel de comunidad. Los cambios se publican al guardar.</p></div><div className="flex flex-wrap gap-3"><button type="button" onClick={restoreHomeDefaults} className="rounded-xl border border-[#d3deeb] bg-white px-4 py-3 text-sm font-bold text-[#173a67] hover:border-[#e83e33] hover:text-[#e83e33]">Restablecer portada original</button><Link className="self-center text-sm font-bold text-[#e83e33] underline underline-offset-4" to="/" target="_blank">Ver portada pública</Link></div></div>
      {error && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>}
      {notice && <div role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{notice}</div>}
      {upload && <div className="mb-5 rounded-xl border border-[#dbe4ef] bg-white p-4" role="status" aria-live="polite"><div className="mb-2 flex items-center justify-between gap-3 text-sm"><span className="flex min-w-0 items-center gap-2 font-semibold text-[#173a67]">{upload.progress < 100 && !upload.status.startsWith('Error') ? <LoaderCircle className="animate-spin" size={16} /> : <ImagePlus size={16} />}<span className="truncate">{upload.name}: {upload.status}</span></span><span className="font-mono text-xs">{upload.progress}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#eaf0f7]"><div className={`h-full rounded-full transition-[width] ${upload.status.startsWith('Error') ? 'bg-red-500' : 'bg-[#e83e33]'}`} style={{ width: `${progressPercent}%` }} /></div></div>}
      {loading ? <div className="rounded-2xl bg-white p-12 text-center text-sm text-[#627b9e]">Cargando contenido guardado…</div> : <form className="grid gap-6" onSubmit={handleSave}>
        <section className="rounded-2xl border border-[#e0e7f0] bg-white p-5 shadow-sm sm:p-8"><p className="font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#e83e33]">Promociones</p><h2 className="mt-1 text-xl font-extrabold text-[#08244a]">Aviso de la portada principal</h2><p className="mt-2 text-sm text-[#627b9e]">El anuncio aparecerá en una franja animada debajo del navbar.</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className={labelClass}>Texto promocional<input className={fieldClass} maxLength={160} placeholder="¡Inscripciones abiertas! Aprovecha la promoción de este mes." value={form.announcementText} onChange={(event) => { setForm((current) => ({ ...current, announcementText: event.target.value })); setNotice(''); setError('') }} /></label><label className="flex items-center gap-3 self-end pb-3 text-sm font-semibold text-[#173a67]"><input className="h-5 w-5 accent-[#e83e33]" type="checkbox" checked={Boolean(form.announcementActive)} onChange={(event) => setForm((current) => ({ ...current, announcementActive: event.target.checked }))} />Activar aviso promocional</label></div></section>
        <section className="rounded-2xl border border-[#e0e7f0] bg-white p-5 shadow-sm sm:p-8"><div className="mb-6"><p className="font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#e83e33]">Sección principal</p><h2 className="mt-1 text-xl font-extrabold text-[#08244a]">Hero y banner</h2></div>
          <div className="grid gap-5 md:grid-cols-2">
            {['titleLine1', 'titleLine2', 'titleLine3'].map((key, index) => <label className={labelClass} key={key}>Línea de título {index + 1}<input className={fieldClass} maxLength={90} value={form.hero[key]} onChange={(event) => updateHero(key, event.target.value)} /></label>)}
            <label className={`${labelClass} md:col-span-2`}>Descripción<textarea className={fieldClass} rows={3} maxLength={500} value={form.hero.description} onChange={(event) => updateHero('description', event.target.value)} /></label>
            <label className={labelClass}>Botón principal<input className={fieldClass} maxLength={80} value={form.hero.primaryCta} onChange={(event) => updateHero('primaryCta', event.target.value)} /></label>
            <label className={labelClass}>Botón de clase gratuita<input className={fieldClass} maxLength={80} value={form.hero.secondaryCta} onChange={(event) => updateHero('secondaryCta', event.target.value)} /></label>
            <label className={labelClass}>Botón de prueba de nivel<input className={fieldClass} maxLength={80} value={form.hero.levelTestCta} onChange={(event) => updateHero('levelTestCta', event.target.value)} /></label>
            <label className={labelClass}>Texto alternativo de imagen<input className={fieldClass} maxLength={180} value={form.hero.imageAlt} onChange={(event) => updateHero('imageAlt', event.target.value)} /></label>
            <div className={labelClass}>Imagen del Hero<div className="flex flex-wrap items-center gap-3"><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#08244a] px-4 py-3 text-xs font-bold text-white"><ImagePlus size={15} /> Cargar imagen<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => handleImage(event, (url) => updateHero('image', url))} /></label>{form.hero.image && <button type="button" className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700" onClick={() => { if (window.confirm('¿Quitar la imagen del Hero? Se eliminará de Supabase al guardar.')) updateHero('image', '') }}>Quitar imagen</button>}</div></div>
            {form.hero.image && <div className="md:col-span-2"><img className="max-h-[330px] w-full rounded-xl bg-[#f4f7fb] object-contain" src={form.hero.image} alt="Vista previa de imagen del Hero" /></div>}
          </div>
        </section>

        <section className="rounded-2xl border border-[#e0e7f0] bg-white p-5 shadow-sm sm:p-8"><div className="mb-5 flex items-center justify-between gap-3"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#e83e33]">Preguntas frecuentes</p><h2 className="mt-1 text-xl font-extrabold text-[#08244a]">FAQ de la portada</h2></div><button type="button" className="inline-flex items-center gap-2 rounded-lg bg-[#08244a] px-3 py-2.5 text-xs font-bold text-white" onClick={() => setForm((current) => ({ ...current, faqs: [...current.faqs, { icon: 'ⓘ', question: '', answer: '' }] }))}><Plus size={15} /> Agregar</button></div>
          <div className="grid gap-4">{form.faqs.map((item, index) => <article className="rounded-xl border border-[#e3e9ef] bg-[#f9fbfd] p-4 sm:p-5" key={item.id || `faq-${index}`}><div className="mb-3 flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-wide text-[#7187a4]">Pregunta {index + 1}</span><div className="flex gap-1"><button type="button" aria-label={`Mover pregunta ${index + 1} arriba`} disabled={index === 0} onClick={() => reorder('faqs', index, -1)} className="rounded-md p-2 text-[#627b9e] hover:bg-white disabled:opacity-30"><ArrowUp size={16} /></button><button type="button" aria-label={`Mover pregunta ${index + 1} abajo`} disabled={index === form.faqs.length - 1} onClick={() => reorder('faqs', index, 1)} className="rounded-md p-2 text-[#627b9e] hover:bg-white disabled:opacity-30"><ArrowDown size={16} /></button><button type="button" aria-label={`Eliminar pregunta ${index + 1}`} onClick={() => removeItem('faqs', index, `la pregunta ${index + 1}`)} className="rounded-md p-2 text-red-700 hover:bg-red-50"><Trash2 size={16} /></button></div></div><div className="grid gap-3"><input className={fieldClass} aria-label={`Pregunta ${index + 1}`} placeholder="Pregunta" maxLength={180} value={item.question} onChange={(event) => updateItem('faqs', index, 'question', event.target.value)} /><textarea className={fieldClass} aria-label={`Respuesta ${index + 1}`} placeholder="Respuesta" rows={3} maxLength={1200} value={item.answer} onChange={(event) => updateItem('faqs', index, 'answer', event.target.value)} /></div></article>)}</div>
        </section>

        <section className="rounded-2xl border border-[#e0e7f0] bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-3"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#e83e33]">Fotos de nuestra comunidad</p><h2 className="mt-1 text-xl font-extrabold text-[#08244a]">Reseñas y testimonios</h2><p className="mt-2 text-sm text-[#627b9e]">Administra las tarjetas del carrusel “Así se vive aprender en Towers”.</p></div><button type="button" className="inline-flex items-center gap-2 rounded-lg bg-[#08244a] px-3 py-2.5 text-xs font-bold text-white" onClick={() => setForm((current) => ({ ...current, communitySlides: [...current.communitySlides, { id: crypto.randomUUID(), image: '', title: '', description: '' }] }))}><Plus size={15} /> Agregar tarjeta</button></div>
          {!form.communitySlides.length && <p className="mb-4 rounded-xl bg-[#f4f7fb] p-4 text-sm text-[#627b9e]">El carrusel está vacío. Agrega una tarjeta para que aparezca en la portada.</p>}
          <div className="grid gap-4">{form.communitySlides.map((item, index) => <article className="grid gap-4 rounded-xl border border-[#e3e9ef] bg-[#f9fbfd] p-4 sm:grid-cols-[1fr_auto] sm:p-5" key={item.id || `community-slide-${index}`}><div className="grid gap-3"><p className="text-xs font-bold uppercase tracking-wide text-[#7187a4]">Tarjeta {index + 1}</p><input className={fieldClass} aria-label={`Título de tarjeta ${index + 1}`} placeholder="Título de la experiencia" maxLength={120} value={item.title} onChange={(event) => updateItem('communitySlides', index, 'title', event.target.value)} /><textarea className={fieldClass} aria-label={`Descripción de tarjeta ${index + 1}`} placeholder="Descripción de la experiencia" rows={3} maxLength={900} value={item.description} onChange={(event) => updateItem('communitySlides', index, 'description', event.target.value)} /><div className="flex flex-wrap items-center gap-3"><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#dbe4ef] bg-white px-3 py-2 text-xs font-bold text-[#173a67]"><ImagePlus size={14} /> Cargar foto<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => handleImage(event, (url) => updateItem('communitySlides', index, 'image', url))} /></label>{item.image && <button type="button" className="text-xs font-bold text-red-700 underline" onClick={() => { if (window.confirm(`¿Quitar la foto de la tarjeta ${index + 1}? Se eliminará de Supabase al guardar.`)) updateItem('communitySlides', index, 'image', '') }}>Quitar foto</button>}</div>{item.image && <img className="max-h-[220px] w-full rounded-xl object-contain object-left" src={item.image} alt={`Vista previa: ${item.title}`} />}</div><div className="flex gap-1 sm:flex-col"><button type="button" aria-label={`Mover tarjeta ${index + 1} arriba`} disabled={index === 0} onClick={() => reorder('communitySlides', index, -1)} className="rounded-md p-2 text-[#627b9e] hover:bg-white disabled:opacity-30"><ArrowUp size={16} /></button><button type="button" aria-label={`Mover tarjeta ${index + 1} abajo`} disabled={index === form.communitySlides.length - 1} onClick={() => reorder('communitySlides', index, 1)} className="rounded-md p-2 text-[#627b9e] hover:bg-white disabled:opacity-30"><ArrowDown size={16} /></button><button type="button" className="inline-flex h-fit items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700" onClick={() => removeItem('communitySlides', index, `la tarjeta ${index + 1}`)}><Trash2 size={15} /> Eliminar</button></div></article>)}</div>
        </section>
        <div className="sticky bottom-3 z-10 flex justify-end rounded-xl border border-[#e0e7f0] bg-white/95 p-3 shadow-lg backdrop-blur"><button disabled={saving || Boolean(upload && upload.progress < 100 && !upload.status.startsWith('Error'))} type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#e83e33] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#cf3028] disabled:cursor-wait disabled:opacity-60">{saving ? <LoaderCircle className="animate-spin" size={17} /> : <Save size={17} />}{saving ? 'Guardando…' : 'Guardar y publicar cambios'}</button></div>
      </form>}
    </main>
  </div>
}

export default HomeContentAdmin
