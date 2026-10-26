import AnimatedText from "@/components/ui/AnimatedText";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Eye,
  Image,
  ImagePlus,
  Link2,
  LayoutTemplate,
  MessageCircle,
  Save,
  Sparkles,
  Upload,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { getCampaignById, saveCampaign } from "../lib/supabase";

const images = [
  "/images/hero.png",
  "/images/Lenguajes.png",
  "/images/Modalities.png",
  "/images/Sinfoto.png",
];
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
  benefits: "",
  outcomes: "",
  methodology: "",
  curriculum: "",
  faqs: "",
  cta: "Hablar con un asesor",
  destination: "WhatsApp",
  destinationUrl: "",
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
const asLines = (items = []) => items.join("\n");

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
          benefits: asLines(content.benefits),
          outcomes: asLines(content.outcomes),
          curriculum: (content.curriculum || [])
            .map(({ title, description }) => `${title} | ${description || ""}`)
            .join("\n"),
          faqs: (content.faqs || [])
            .map(({ question, answer }) => `${question} | ${answer || ""}`)
            .join("\n"),
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
    const parsePairs = (value, firstKey, secondKey) =>
      value
        .split("\n")
        .map((line) => line.split("|").map((part) => part.trim()))
        .filter((parts) => parts[0])
        .map(([first, second = ""]) => ({
          [firstKey]: first,
          [secondKey]: second,
        }));
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
      benefits: form.benefits
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      outcomes: form.outcomes
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      methodology: form.methodology.trim(),
      curriculum: parsePairs(form.curriculum, "title", "description"),
      faqs: parsePairs(form.faqs, "question", "answer"),
      cta: form.cta.trim() || "Hablar con un asesor",
      destination: form.destination,
      destinationUrl:
        form.destination === "URL externa" ? form.destinationUrl.trim() : "",
      whatsappMessage: form.whatsappMessage.trim(),
      ctaHeadline: form.ctaHeadline.trim(),
    };
    try {
      const campaign = await saveCampaign(
        {
          ...(campaignId ? { id: campaignId } : {}),
          owner_id: session.user.id,
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
            src="/images/Towers_logo.png"
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
            <SectionCard
              number="01"
              icon={LayoutTemplate}
              title="Identidad y hero"
              description="La primera impresión de tu curso."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nombre de campaña">
                  {input("name", { maxLength: 100, required: true })}
                </Field>
                <Field label="Slug de la URL">
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
                <Field label="Texto superior">
                  {input("eyebrow", {
                    placeholder: "Inglés para tu próximo paso",
                  })}
                </Field>
                <Field className="sm:col-span-2" label="Titular principal">
                  {input("headline", {
                    maxLength: 140,
                    required: true,
                    placeholder:
                      "Aprende inglés para abrir nuevas oportunidades",
                  })}
                </Field>
                <Field className="sm:col-span-2" label="Descripción">
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
                <Field
                  className="sm:col-span-2"
                  label="Beneficios"
                  hint="Un beneficio por línea."
                >
                  {textarea("benefits", 4, {
                    placeholder:
                      "Grupos pequeños\nProfesores preparados\nPráctica desde el primer día",
                  })}
                </Field>
                <Field
                  className="sm:col-span-2"
                  label="Resultados de aprendizaje"
                  hint="Un resultado por línea."
                >
                  {textarea("outcomes", 4, {
                    placeholder:
                      "Mantener conversaciones cotidianas\nComunicarte con seguridad en el trabajo",
                  })}
                </Field>
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
                <Field
                  label="Módulos o temas"
                  hint="Uno por línea con formato: Título | Descripción. La descripción es opcional."
                >
                  {textarea("curriculum", 5, {
                    placeholder:
                      "Bases para comunicarte | Vocabulario y expresiones cotidianas\nConversación real | Situaciones de viaje y trabajo",
                  })}
                </Field>
                <Field
                  label="Preguntas frecuentes"
                  hint="Una por línea con formato: Pregunta | Respuesta."
                >
                  {textarea("faqs", 5, {
                    placeholder:
                      "¿Necesito experiencia previa? | No, tenemos opciones para todos los niveles.\n¿Cómo puedo empezar? | Escríbenos y te ayudamos a elegir.",
                  })}
                </Field>
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
                  <Field
                    className="sm:col-span-2"
                    label="Mensaje de WhatsApp"
                    hint="Si queda vacío, se genera un mensaje con el nombre del curso."
                  >
                    {input("whatsappMessage", {
                      placeholder: "Hola, quiero información sobre el curso…",
                    })}
                  </Field>
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
            <div className="campaign-preview-background bg-[#eef2f6] p-4 sm:p-5">
              <div className="overflow-hidden rounded-[1.25rem] border-[5px] border-[#08244a] bg-white shadow-[0_24px_40px_rgb(8_36_74_/_18%)]">
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
                      src="/images/Towers_logo_recortado.png"
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
                  {form.benefits
                    .split("\n")
                    .map((benefit) => benefit.trim())
                    .filter(Boolean).length > 0 && (
                    <div className="grid gap-2 p-4 sm:grid-cols-2">
                      {form.benefits
                        .split("\n")
                        .map((benefit) => benefit.trim())
                        .filter(Boolean)
                        .map((benefit) => (
                          <div
                            key={benefit}
                            className="rounded-lg border border-[#dbe4ef] p-3 text-xs text-[#173a67]"
                          >
                            ✓ {benefit}
                          </div>
                        ))}
                    </div>
                  )}
                  {(form.curriculum.trim() ||
                    form.faqs.trim() ||
                    form.outcomes.trim()) && (
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
