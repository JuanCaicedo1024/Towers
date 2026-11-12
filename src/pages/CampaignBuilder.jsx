import AnimatedText from "@/components/ui/AnimatedText";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ExternalLink,
  Eye,
  Image,
  ImagePlus,
  Link2,
  LayoutTemplate,
  MessageCircle,
  Minus,
  Monitor,
  Save,
  Sparkles,
  Smartphone,
  Star,
  Upload,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { getCampaignById, listCampaigns, saveCampaign } from "../lib/supabase";
import { campaignImageOptions } from "../lib/imagePaths";

const MAX_CAMPAIGNS = 3;

const images = campaignImageOptions;
const initialForm = {
  name: "",
  slug: "",
  channel: "Instagram",
  eyebrow: "",
  headline: "",
  supporting: "",
  image: images[0],
  imageAlt: "",
  imageCaption: "",
  level: "",
  duration: "",
  modality: "Online",
  schedule: "",
  benefits: [],
  outcomes: [],
  methodology: "",
  curriculum: [],
  faqs: [],
  cta: "Hablar con un asesor",
  destination: "WhatsApp",
  destinationUrl: "",
  whatsappNumber: "",
  whatsappMessage: "",
  ctaHeadline: "",
};
const channels = ["Google Ads", "Meta Ads", "Facebook", "Instagram"];
function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
const asItems = (items) => Array.isArray(items)
  ? items.map((item) => typeof item === "string" ? { text: item, icon: "check" } : item)
  : typeof items === "string" ? items.split("\n").filter(Boolean).map((text) => ({ text, icon: "check" })) : [];
const parseLegacyPairs = (items, first, second) => Array.isArray(items)
  ? items
  : typeof items === "string" ? items.split("\n").map((line) => {
      const [a = "", b = ""] = line.split("|").map((part) => part.trim());
      return { [first]: a, [second]: b };
    }).filter((item) => item[first]) : [];

function Field({ label, hint, className = "", children }) {
  return (
    <label
      className={`grid content-start gap-2 text-sm font-semibold text-[#173a67] ${className}`}
    >
      {label}
      {children}
      {hint && (
        <span className="text-xs font-normal leading-5 text-[#8292a8]">
          {hint}
        </span>
      )}
    </label>
  );
}

function SectionCard({ number, icon: Icon, title, description, children }) {
  return (
    <section className="campaign-step overflow-hidden rounded-[1.35rem] border border-[#dfe6ef] bg-white shadow-[0_12px_30px_rgb(8_36_74_/_4%)]">
      <div className="campaign-section-heading flex items-start gap-4 border-b border-[#edf0f4] px-6 py-5 sm:px-8">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#fff1ef] text-[#e83e33] shadow-[inset_0_0_0_1px_rgb(232_62_51_/_8%)]">
          <Icon size={19} />
        </span>
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[.15em] text-[#e83e33]">
            Paso {number}
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-[-.02em] text-[#08244a]">
            {title}
          </h2>
          <p className="mt-1 text-sm text-[#7187a4]">{description}</p>
        </div>
      </div>
      <div className="p-6 sm:p-8">{children}</div>
    </section>
  );
}

function CampaignBuilder() {
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get("id");
  const { session } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(Boolean(campaignId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [previewDevice, setPreviewDevice] = useState("desktop");

  useEffect(() => {
    if (!campaignId) return;
    let active = true;
    getCampaignById(campaignId, session.access_token)
      .then((campaign) => {
        if (!active) return;
        if (!campaign)
          throw new Error(
            "No encontramos la campaña o no tienes acceso para editarla.",
          );
        const content = campaign.content || {};
        setForm({
          ...initialForm,
          name: campaign.name,
          slug: campaign.slug,
          channel: campaign.channel,
          ...content,
          benefits: asItems(content.benefits),
          outcomes: asItems(content.outcomes),
          curriculum: parseLegacyPairs(content.curriculum, "title", "description"),
          faqs: parseLegacyPairs(content.faqs, "question", "answer"),
        });
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [campaignId, session.access_token]);

  function update(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value,
      ...(key === "name" && !campaignId ? { slug: slugify(value) } : {}),
    }));
    setError("");
    setNotice("");
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen válido.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen debe pesar menos de 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        update("image", reader.result);
        if (!form.imageAlt.trim()) update("imageAlt", file.name.replace(/\.[^/.]+$/, ""));
      }
    };
    reader.onerror = () => setError("No pudimos leer la imagen. Intenta con otro archivo.");
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  async function handleSave(status) {
    setError("");
    setNotice("");
    if (!campaignId) {
      try {
        const campaigns = await listCampaigns(session.access_token);
        if (campaigns.length >= MAX_CAMPAIGNS) {
          setError("El equipo ya alcanzó el límite de 3 micro-landings compartidas. Borra una antes de crear otra.");
          return;
        }
      } catch (loadError) {
        setError(loadError.message || "No pudimos verificar cuántas micro-landings tienes.");
        return;
      }
    }
    if (form.name.trim().length < 2)
      return setError("Escribe un nombre para la campaña.");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug))
      return setError(
        "Usa un slug en minúsculas, sin espacios ni caracteres especiales.",
      );
    if (!form.headline.trim())
      return setError("Escribe el titular principal de la landing.");
    if (
      form.destination === "URL externa" &&
      !/^https:\/\//i.test(form.destinationUrl)
    )
      return setError("El enlace de destino debe comenzar por https://.");
    setSaving(true);
    const content = {
      eyebrow: form.eyebrow.trim(),
      headline: form.headline.trim(),
      supporting: form.supporting.trim(),
      image: form.image,
      imageAlt: form.imageAlt.trim(),
      imageCaption: form.imageCaption.trim(),
      level: form.level.trim(),
      duration: form.duration.trim(),
      modality: form.modality.trim(),
      schedule: form.schedule.trim(),
      benefits: form.benefits.map(({ text }) => text.trim()).filter(Boolean),
      outcomes: form.outcomes.map(({ text, icon }) => ({ text: text.trim(), icon })).filter(({ text }) => text),
      methodology: form.methodology.trim(),
      curriculum: form.curriculum.map(({ title, description }) => ({ title: title.trim(), description: description.trim() })).filter(({ title }) => title),
      faqs: form.faqs.map(({ question, answer }) => ({ question: question.trim(), answer: answer.trim() })).filter(({ question }) => question),
      cta: form.cta.trim() || "Hablar con un asesor",
      destination: form.destination,
      destinationUrl:
        form.destination === "URL externa" ? form.destinationUrl.trim() : "",
      whatsappNumber: form.whatsappNumber.replace(/\D/g, ""),
      whatsappMessage: form.whatsappMessage.trim(),
      ctaHeadline: form.ctaHeadline.trim(),
    };
    try {
      const campaign = await saveCampaign(
        {
          ...(campaignId ? { id: campaignId } : {}),
          ...(!campaignId ? { owner_id: session.user.id } : {}),
          name: form.name.trim(),
          slug: form.slug,
          channel: form.channel,
          status,
          content,
        },
        session.access_token,
      );
      setNotice(
        status === "published"
          ? "Landing publicada correctamente."
          : "Borrador guardado correctamente.",
      );
      if (!campaignId && campaign?.id)
        navigate(`/campaigns/new?id=${campaign.id}`, { replace: true });
    } catch (saveError) {
      setError(
        saveError.message ||
          "No se pudo guardar la campaña. Tus cambios siguen en pantalla.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <main className="grid min-h-screen place-items-center text-[#627b9e]">
        Cargando campaña…
      </main>
    );
  const inputClass =
    "w-full rounded-xl border border-[#dbe4ef] bg-white px-4 py-3.5 font-normal text-[#173a67] outline-none transition placeholder:text-[#b2becc] hover:border-[#b8c8d9] focus:border-[#e83e33] focus:ring-4 focus:ring-[#e83e33]/10";
  const input = (key, props = {}) => (
    <input
      className={inputClass}
      value={form[key]}
      onChange={(event) => update(key, event.target.value)}
      {...props}
    />
  );
  const textarea = (key, rows = 3, props = {}) => (
    <textarea
      className={inputClass}
      rows={rows}
      value={form[key]}
      onChange={(event) => update(key, event.target.value)}
      {...props}
    />
  );
  const select = (key, options) => (
    <select
      className={inputClass}
      value={form[key]}
      onChange={(event) => update(key, event.target.value)}
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
  const updateItem = (key, index, field, value) => update(key, form[key].map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));
  const moveItem = (key, index, offset) => {
    const nextIndex = index + offset;
    if (nextIndex < 0 || nextIndex >= form[key].length) return;
    const items = [...form[key]];
    [items[index], items[nextIndex]] = [items[nextIndex], items[index]];
    update(key, items);
  };
  const itemControls = (key, index) => <div className="flex shrink-0 items-center gap-1">
    <button type="button" onClick={() => moveItem(key, index, -1)} disabled={index === 0} aria-label="Mover arriba" className="rounded p-1.5 text-[#7187a4] hover:bg-[#f4f7fb] disabled:opacity-30"><ChevronUp size={15} /></button>
    <button type="button" onClick={() => moveItem(key, index, 1)} disabled={index === form[key].length - 1} aria-label="Mover abajo" className="rounded p-1.5 text-[#7187a4] hover:bg-[#f4f7fb] disabled:opacity-30"><ChevronDown size={15} /></button>
    <button type="button" onClick={() => update(key, form[key].filter((_, itemIndex) => itemIndex !== index))} aria-label="Eliminar elemento" className="rounded p-1.5 text-[#e83e33] hover:bg-[#fff1ef]"><Minus size={15} /></button>
  </div>;
  const addItem = (key, item) => update(key, [...form[key], item]);

  return (
    <main className="campaign-builder min-h-screen bg-[radial-gradient(circle_at_top_left,_#fff8f6_0,_#f5f7fb_34rem)] px-4 pb-10 text-[#102d55] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <nav className="flex min-h-[72px] items-center justify-between border-b border-[#e7edf4]">
          <Link
            className="inline-flex items-center gap-2 text-sm font-bold text-[#08244a] transition hover:text-[#e83e33]"
            to="/dashboard"
          >
            <ArrowLeft size={17} />{" "}
            <span className="hidden sm:inline">Volver al dashboard</span>
          </Link>
          <img
            className="h-8 w-auto object-contain"
            src="/images/brand/towers.png"
            alt="Towers"
          />
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#7187a4] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#29b67a]" /> Editor
            interno
          </span>
        </nav>
        <header className="campaign-builder-hero flex flex-col justify-between gap-6 py-9 lg:flex-row lg:items-end">
          <div className="campaign-hero-copy">
            <p className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[.15em] text-[#e83e33]">
              <Sparkles size={13} /> Campañas Towers
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-[-.05em] text-[#08244a] sm:text-5xl">
              <AnimatedText>
                {campaignId ? "Editar micro-landing" : "Crea una micro-landing"}
              </AnimatedText>
            </h1>
            <p className="mt-3 max-w-[650px] text-base leading-7 text-[#627b9e]">
              Construye una página clara, atractiva y lista para convertir
              visitantes en estudiantes.
            </p>
          </div>
          <div className="campaign-status-card flex items-center gap-3 rounded-2xl border border-[#e1e8f0] bg-white px-4 py-3 shadow-sm">
            <CheckCircle2
              size={18}
              className={notice ? "text-[#29b67a]" : "text-[#b8c5d5"}
            />
            <div>
              <p className="text-xs font-bold text-[#08244a]">
                {notice ? "Cambios guardados" : "Listo para empezar"}
              </p>
              <p className="text-[11px] text-[#8292a8]">
                {campaignId
                  ? "Editando una campaña existente"
                  : "Completa los campos principales"}
              </p>
            </div>
          </div>
        </header>
        {error && (
          <p
            className="mb-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-800"
            role="alert"
          >
            {error}
          </p>
        )}
        {notice && (
          <p
            className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800"
            role="status"
          >
            {notice}
          </p>
        )}
        <div className="mt-7 grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="grid gap-5">
            <div className="rounded-2xl border border-[#f1c9c4] bg-[#fff8f6] px-5 py-4 text-sm leading-6 text-[#6f5260]">
              <strong className="text-[#08244a]">Empieza por lo esencial:</strong> completa el nombre, el titular, la descripción, la imagen y el botón. La vista previa se actualiza mientras escribes. Los demás pasos son opcionales.
            </div>
            <SectionCard
              number="01"
              icon={LayoutTemplate}
              title="Identidad y hero"
              description="La primera impresión de tu curso."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nombre de campaña" hint="Nombre interno para reconocerla en tu panel. También completa el texto superior por defecto.">
                  {input("name", { maxLength: 100, required: true })}
                </Field>
                <Field label="Enlace corto" hint="Se genera desde el nombre y puedes editarlo. Usa letras, números y guiones.">
                  <div className="flex overflow-hidden rounded-lg border border-[#dbe4ef]">
                    <span className="bg-[#f4f7fb] px-3 py-3 text-xs text-[#9aabc0]">
                      /campaigns/
                    </span>
                    <input
                      className="min-w-0 flex-1 border-0 px-4 py-3.5 outline-none placeholder:text-[#b2becc]"
                      value={form.slug}
                      onChange={(event) =>
                        update("slug", slugify(event.target.value))
                      }
                      required
                    />
                  </div>
                </Field>
                <Field label="Canal de campaña">
                  {select("channel", channels)}
                </Field>
                <Field label="Frase breve sobre el titular" hint="Una etiqueta corta que aparecerá encima del titular.">
                  {input("eyebrow", {
                    placeholder: "Inglés para tu próximo paso",
                  })}
                </Field>
                <Field className="sm:col-span-2" label="Titular principal" hint="La promesa principal del curso. Intenta que sea claro y breve.">
                  {input("headline", {
                    maxLength: 140,
                    required: true,
                    placeholder:
                      "Aprende inglés para abrir nuevas oportunidades",
                  })}
                </Field>
                <Field className="sm:col-span-2" label="Descripción" hint="Explica en una o dos frases a quién ayuda el curso y qué lo hace especial.">
                  {textarea("supporting", 3, {
                    placeholder: "Cuenta qué hace especial este programa.",
                  })}
                </Field>
                <Field className="sm:col-span-2" label="Imagen principal" hint="Usa una imagen horizontal y nítida. Puedes cargar hasta 5 MB.">
                  <div className="campaign-image-picker grid gap-4 rounded-2xl border border-[#e1e8f0] bg-[#f8fafc] p-4 sm:grid-cols-[180px_minmax(0,1fr)]">
                    <div className="campaign-image-picker__preview relative h-32 overflow-hidden rounded-xl bg-[#dce8f0] shadow-inner sm:h-full">
                      <img className="h-full w-full object-cover" src={form.image} alt="" />
                      <span className="absolute bottom-2 left-2 rounded-full bg-[#08244a]/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">Vista actual</span>
                    </div>
                    <div className="grid gap-3">
                      <div className="flex flex-wrap gap-2">
                        {images.map((image, index) => (
                          <button className={`campaign-image-option overflow-hidden rounded-lg border-2 ${form.image === image ? "border-[#e83e33] shadow-[0_0_0_2px_rgb(232_62_51_/_12%)]" : "border-transparent"}`} key={image} type="button" onClick={() => update("image", image)} aria-label={`Usar imagen predeterminada ${index + 1}`}>
                            <img className="h-14 w-20 object-cover" src={image} alt="" />
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#08244a] px-4 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#123b6e]">
                          <Upload size={15} /> Cargar desde tu equipo
                          <input className="sr-only" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageUpload} />
                        </label>
                        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#dbe4ef] bg-white px-3">
                          <Link2 size={15} className="shrink-0 text-[#9aabc0]" />
                          <input className="campaign-plain-input min-w-0 border-0 bg-transparent px-0 py-3 text-xs outline-none" value={form.image.startsWith("data:") ? "" : form.image} onChange={(event) => update("image", event.target.value)} placeholder="Pega una URL de imagen" aria-label="URL de imagen" />
                        </div>
                      </div>
                      <p className="flex items-center gap-1.5 text-[11px] text-[#8292a8]"><ImagePlus size={13} /> JPG, PNG o WebP · Recomendado: 1200 × 800 px</p>
                    </div>
                  </div>
                </Field>
                <Field label="Texto alternativo">
                  {input("imageAlt", { placeholder: "Describe la imagen" })}
                </Field>
                <Field
                  className="sm:col-span-2"
                  label="Pie de imagen (opcional)"
                >
                  {input("imageCaption", {
                    placeholder: "Clases con propósito, desde el primer día",
                  })}
                </Field>
              </div>
            </SectionCard>
            <SectionCard
              number="02"
              icon={BookOpen}
              title="Información del curso"
              description="Los datos que ayudan a decidir a tus estudiantes."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nivel o público">
                  {select("level", [
                    "",
                    "Principiante",
                    "Básico",
                    "Intermedio",
                    "Avanzado",
                    "Todos los niveles",
                    "Niños",
                    "Jóvenes",
                    "Adultos",
                    "Empresas",
                  ])}
                </Field>
                <Field label="Duración">
                  {input("duration", { placeholder: "Ej. 12 semanas" })}
                </Field>
                <Field label="Modalidad">
                  {select("modality", [
                    "Online",
                    "Presencial",
                    "Híbrida",
                    "Grupal",
                    "Individual",
                    "Flexible",
                  ])}
                </Field>
                <Field label="Horario o disponibilidad">
                  {input("schedule", { placeholder: "Horarios flexibles" })}
                </Field>
                <div className="sm:col-span-2"><p className="mb-2 text-sm font-semibold text-[#173a67]">Beneficios</p><div className="grid gap-2">{form.benefits.map((item, index) => <div key={index} className="flex items-center gap-2 rounded-xl border border-[#dbe4ef] p-2"><span className="w-7 text-center text-xs font-bold text-[#7187a4]">{index + 1}</span><input aria-label={`Beneficio ${index + 1}`} className={inputClass} value={item.text} onChange={(event) => updateItem("benefits", index, "text", event.target.value)} placeholder="Ej. Grupos pequeños y atención cercana" />{itemControls("benefits", index)}</div>)}</div><button type="button" onClick={() => addItem("benefits", { text: "" })} className="mt-2 rounded-lg border border-[#e83e33] px-3 py-2 text-sm font-bold text-[#e83e33] hover:bg-[#fff8f6]">+ Agregar beneficio</button></div>
                <div className="sm:col-span-2"><p className="mb-2 text-sm font-semibold text-[#173a67]">Resultados de aprendizaje</p><div className="grid gap-2">{form.outcomes.map((item, index) => <div key={index} className="grid gap-2 rounded-xl border border-[#dbe4ef] p-2 sm:grid-cols-[1fr_170px_auto]"><input aria-label={`Resultado ${index + 1}`} className={inputClass} value={item.text} onChange={(event) => updateItem("outcomes", index, "text", event.target.value)} placeholder="Ej. Mantener conversaciones cotidianas" /><select aria-label="Ícono del resultado" className={inputClass} value={item.icon || "check"} onChange={(event) => updateItem("outcomes", index, "icon", event.target.value)}><option value="check">✓ Check</option><option value="star">★ Estrella</option><option value="book">▣ Libro</option><option value="message">◉ Conversación</option><option value="sparkles">✦ Brillo</option></select>{itemControls("outcomes", index)}</div>)}</div><button type="button" onClick={() => addItem("outcomes", { text: "", icon: "check" })} className="mt-2 rounded-lg border border-[#e83e33] px-3 py-2 text-sm font-bold text-[#e83e33] hover:bg-[#fff8f6]">+ Agregar resultado</button></div>
                <Field
                  className="sm:col-span-2"
                  label="Metodología"
                  hint="Un párrafo que explique cómo aprenden los estudiantes."
                >
                  {textarea("methodology", 4, {
                    placeholder:
                      "Combinamos práctica guiada, conversación y situaciones de la vida real…",
                  })}
                </Field>
              </div>
            </SectionCard>
            <SectionCard
              number="03"
              icon={Image}
              title="Programa y preguntas"
              description="Las secciones aparecen automáticamente cuando agregas contenido."
            >
              <div className="grid gap-5">
                <div><p className="mb-2 text-sm font-semibold text-[#173a67]">Módulos o temas</p><div className="grid gap-2">{form.curriculum.map((item, index) => <div key={index} className="grid gap-2 rounded-xl border border-[#dbe4ef] p-3 sm:grid-cols-[1fr_1fr_auto]"><label className="grid gap-1 text-xs font-semibold text-[#7187a4]">Título<input className={inputClass} value={item.title} onChange={(event) => updateItem("curriculum", index, "title", event.target.value)} /></label><label className="grid gap-1 text-xs font-semibold text-[#7187a4]">Descripción<input className={inputClass} value={item.description} onChange={(event) => updateItem("curriculum", index, "description", event.target.value)} /></label>{itemControls("curriculum", index)}</div>)}</div><button type="button" onClick={() => addItem("curriculum", { title: "", description: "" })} className="mt-2 rounded-lg border border-[#e83e33] px-3 py-2 text-sm font-bold text-[#e83e33] hover:bg-[#fff8f6]">+ Agregar módulo</button></div>
                <div><p className="mb-2 text-sm font-semibold text-[#173a67]">Preguntas frecuentes</p><div className="grid gap-2">{form.faqs.map((item, index) => <div key={index} className="grid gap-2 rounded-xl border border-[#dbe4ef] p-3 sm:grid-cols-[1fr_1fr_auto]"><label className="grid gap-1 text-xs font-semibold text-[#7187a4]">Pregunta<input className={inputClass} value={item.question} onChange={(event) => updateItem("faqs", index, "question", event.target.value)} /></label><label className="grid gap-1 text-xs font-semibold text-[#7187a4]">Respuesta<input className={inputClass} value={item.answer} onChange={(event) => updateItem("faqs", index, "answer", event.target.value)} /></label>{itemControls("faqs", index)}</div>)}</div><button type="button" onClick={() => addItem("faqs", { question: "", answer: "" })} className="mt-2 rounded-lg border border-[#e83e33] px-3 py-2 text-sm font-bold text-[#e83e33] hover:bg-[#fff8f6]">+ Agregar pregunta</button></div>
              </div>
            </SectionCard>
            <SectionCard
              number="04"
              icon={MessageCircle}
              title="Contacto y llamada a la acción"
              description="Lleva a cada visitante al siguiente paso."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Texto del botón">
                  {input("cta", { placeholder: "Hablar con un asesor" })}
                </Field>
                <Field label="Destino">
                  {select("destination", ["WhatsApp", "URL externa"])}
                </Field>
                {form.destination === "URL externa" ? (
                  <Field className="sm:col-span-2" label="URL de destino">
                    {input("destinationUrl", {
                      type: "url",
                      placeholder: "https://",
                      required: true,
                    })}
                  </Field>
                ) : (
                  <>
                  <Field className="sm:col-span-2" label="Número de WhatsApp" hint="Incluye el código del país, sin el signo +. Ejemplo para Colombia: 573001234567.">
                    {input("whatsappNumber", { type: "tel", inputMode: "numeric", placeholder: "573001234567" })}
                  </Field>
                  <Field
                    className="sm:col-span-2"
                    label="Mensaje de WhatsApp"
                    hint="Si queda vacío, se genera un mensaje con el nombre del curso."
                  >
                    {input("whatsappMessage", {
                      placeholder: "Hola, quiero información sobre el curso…",
                    })}
                  </Field>
                  </>
                )}
                <Field
                  className="sm:col-span-2"
                  label="Título del cierre (opcional)"
                >
                  {input("ctaHeadline", {
                    placeholder: "¿Listo para dar el siguiente paso?",
                  })}
                </Field>
              </div>
            </SectionCard>
            <div className="flex flex-col-reverse gap-3 rounded-[1.35rem] border border-[#dfe6ef] bg-white p-5 shadow-[0_12px_30px_rgb(8_36_74_/_4%)] sm:flex-row sm:justify-end">
              <button
                className="campaign-action-button inline-flex items-center justify-center gap-2 rounded-xl border border-[#d3deeb] px-5 py-3 text-sm font-bold text-[#173a67] transition hover:border-[#08244a] disabled:opacity-60"
                type="button"
                onClick={() => handleSave("draft")}
                disabled={saving}
              >
                <Save size={17} />
                {saving ? "Guardando…" : "Guardar borrador"}
              </button>
              <button
                className="campaign-action-button campaign-action-button--primary inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff443d] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_16px_rgb(255_68_61_/_20%)] transition hover:-translate-y-0.5 hover:bg-[#da352f] disabled:opacity-60"
                type="button"
                onClick={() => handleSave("published")}
                disabled={saving}
              >
                {saving ? "Publicando…" : "Publicar landing"}{" "}
                <ArrowRight size={17} />
              </button>
            </div>
          </section>
          <aside className="campaign-preview-card overflow-hidden rounded-[1.35rem] border border-[#dfe6ef] bg-white shadow-[0_16px_40px_rgb(8_36_74_/_8%)] xl:sticky xl:top-5">
            <div className="flex items-center justify-between border-b border-[#edf0f4] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#08244a] text-white">
                  <Eye size={16} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#8ba0bf]">
                    Vista previa en vivo
                  </p>
                  <h2 className="mt-1 text-sm font-bold text-[#08244a]">
                    <AnimatedText>
                      {form.name || "Tu curso en Towers"}
                    </AnimatedText>
                  </h2>
                </div>
              </div>
              <div className="flex rounded-lg bg-[#f4f7fb] p-1" aria-label="Tamaño de vista previa">
                <button type="button" onClick={() => setPreviewDevice("desktop")} aria-pressed={previewDevice === "desktop"} className={`rounded-md p-2 ${previewDevice === "desktop" ? "bg-white text-[#08244a] shadow-sm" : "text-[#7187a4]"}`} title="Vista escritorio"><Monitor size={15} /></button>
                <button type="button" onClick={() => setPreviewDevice("mobile")} aria-pressed={previewDevice === "mobile"} className={`rounded-md p-2 ${previewDevice === "mobile" ? "bg-white text-[#08244a] shadow-sm" : "text-[#7187a4]"}`} title="Vista móvil"><Smartphone size={15} /></button>
              </div>
              {campaignId && (
                <a
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#e83e33]"
                  href={`/campaigns/${form.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir <ExternalLink size={14} />
                </a>
              )}
            </div>
            <div className="campaign-preview-background max-h-[calc(100vh-150px)] overflow-y-auto overscroll-contain bg-[#eef2f6] p-3 sm:p-4">
              <div className={`mx-auto overflow-hidden rounded-[1.25rem] border-[5px] border-[#08244a] bg-white shadow-[0_24px_40px_rgb(8_36_74_/_18%)] transition-all duration-300 ${previewDevice === "mobile" ? "max-w-[270px]" : "w-full"}`}>
                <div className="flex h-7 items-center gap-1.5 bg-[#08244a] px-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff716b]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ffc857]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#29b67a]" />
                </div>
                <div className="overflow-hidden">
                  <div className="relative overflow-hidden bg-[linear-gradient(145deg,_#fff8f6_0%,_#fff_72%)] p-5">
                    <span className="pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full border-[18px] border-[#e83e33]/[.07]" />
                    <img
                      className="relative mb-7 h-8 w-auto object-contain"
                      src="/images/brand/towers-cropped.png"
                      alt="Towers"
                    />
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#c83a2f]">
                      {form.eyebrow || form.name || "Tu curso"}
                    </p>
                    <h3 className="campaign-preview-headline relative mt-3 text-2xl font-extrabold leading-[1.05] tracking-[-.04em] text-[#101820]">
                      {form.headline || "El titular de tu curso"}
                    </h3>
                    <p className="mt-3 text-xs leading-5 text-[#294d78]">
                      {form.supporting ||
                        "Aquí aparecerá la descripción que escribas."}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {[form.level, form.duration, form.modality, form.schedule]
                        .filter(Boolean)
                        .map((detail) => (
                          <span
                            className="rounded-md border border-[#dbe4ef] bg-white px-2 py-1 text-[9px] font-bold text-[#183454]"
                            key={detail}
                          >
                            {detail}
                          </span>
                        ))}
                    </div>
                    <span className="mt-6 inline-flex rounded-lg bg-[#e83e33] px-4 py-2.5 text-xs font-bold text-white shadow-[0_7px_14px_rgb(232_62_51_/_22%)]">
                      {form.cta || "Llamada a la acción"}
                    </span>
                  </div>
                  <img
                    className="h-44 w-full object-cover"
                    src={form.image}
                    alt=""
                  />
                  {form.imageCaption && <p className="bg-white px-4 py-2 text-[10px] font-semibold text-[#183454]">{form.imageCaption}</p>}
                  {form.benefits.filter((item) => item.text.trim()).length > 0 && (
                    <div className="grid gap-2 p-4 sm:grid-cols-2">
                      {form.benefits
                        .filter((item) => item.text.trim())
                        .map(({ text: benefit }, index) => (
                          <div
                            key={`${benefit}-${index}`}
                            className="rounded-lg border border-[#dbe4ef] p-3 text-xs text-[#173a67]"
                          >
                            ✓ {benefit}
                          </div>
                        ))}
                    </div>
                  )}
                  {form.outcomes.some((item) => item.text.trim()) && <section className="bg-[#08244a] p-5 text-white"><p className="text-[9px] font-bold uppercase tracking-wide text-[#ffaaa4]">Al terminar</p><h4 className="mt-2 text-lg font-extrabold">Lo que podrás hacer</h4><div className="mt-3 grid gap-2">{form.outcomes.filter((item) => item.text.trim()).map((item, index) => <p key={`${item.text}-${index}`} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.06] p-3 text-[10px] leading-4">{item.icon === "star" ? <Star size={14} /> : item.icon === "book" ? <BookOpen size={14} /> : item.icon === "message" ? <MessageCircle size={14} /> : item.icon === "sparkles" ? <Sparkles size={14} /> : <Check size={14} />}{item.text}</p>)}</div></section>}
                  {form.methodology && <section className="bg-[#f5f7fb] p-5"><p className="text-[9px] font-bold uppercase tracking-wide text-[#e83e33]">Metodología Towers</p><h4 className="mt-2 text-lg font-extrabold text-[#101820]">Aprende haciendo</h4><p className="mt-3 text-[10px] leading-5 text-[#294d78]">{form.methodology}</p></section>}
                  {form.curriculum.some(({ title }) => title.trim()) && <section className="p-5"><p className="text-[9px] font-bold uppercase tracking-wide text-[#e83e33]">Contenido del curso</p><h4 className="mt-2 text-lg font-extrabold text-[#101820]">Un camino claro, paso a paso</h4><div className="mt-3 grid gap-2">{form.curriculum.filter(({ title }) => title.trim()).map(({ title, description }, index) => <article key={`${title}-${index}`} className="flex gap-3 rounded-xl border border-[#e3e9ef] p-3"><span className="font-mono text-[10px] font-bold text-[#e83e33]">0{index + 1}</span><div><p className="text-[10px] font-bold text-[#08244a]">{title}</p>{description && <p className="mt-1 text-[9px] leading-4 text-[#627493]">{description}</p>}</div></article>)}</div></section>}
                  {form.faqs.some(({ question }) => question.trim()) && <section className="bg-[#f5f7fb] p-5"><p className="text-[9px] font-bold uppercase tracking-wide text-[#e83e33]">Preguntas frecuentes</p><h4 className="mt-2 text-lg font-extrabold text-[#101820]">Resolvemos tus dudas</h4><div className="mt-3 grid gap-3">{form.faqs.filter(({ question }) => question.trim()).map(({ question, answer }, index) => <article key={`${question}-${index}`} className="rounded-xl border border-[#e3e9ef] bg-white p-3"><p className="text-[10px] font-bold text-[#08244a]">{question}</p>{answer && <p className="mt-1 text-[9px] leading-4 text-[#627493]">{answer}</p>}</article>)}</div></section>}
                  <section className="bg-[#e83e33] p-5 text-white"><p className="text-[9px] font-bold uppercase tracking-wide text-white/75">Da el siguiente paso</p><h4 className="mt-2 text-lg font-extrabold">{form.ctaHeadline || "¿Listo para el siguiente paso?"}</h4><span className="mt-4 inline-flex rounded-lg bg-white px-4 py-2.5 text-[10px] font-bold text-[#c83a2f]">{form.cta || "Hablar con un asesor"} →</span></section>
                  {(form.curriculum.length || form.faqs.length || form.outcomes.length) > 0 && (
                    <div className="bg-[#08244a] p-4 text-xs font-bold text-white">
                      Tu curso · Resultados · Módulos · Preguntas frecuentes
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default CampaignBuilder;
