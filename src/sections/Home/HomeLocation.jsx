import { ArrowUpRight, MapPin } from 'lucide-react'

const address = 'Av. 0 #16 90, La Playa, Cúcuta, Norte de Santander'
const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`

function HomeLocation() {
  return (
    <section className="bg-[#f7f9fc] px-[6%] py-16 text-[#17233a] lg:py-20">
      <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
        <div>
          <p className="m-0 text-xs font-extrabold uppercase tracking-[0.14em] text-[#e83e33]">
            Visítanos
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-[#101820] sm:text-4xl">
            Estamos en Cúcuta
          </h2>
          <p className="mt-4 max-w-[480px] text-base leading-7 text-[#52627a] sm:text-lg">
            Te esperamos en nuestra sede de La Playa para orientarte sobre
            nuestros cursos y ayudarte a encontrar la mejor forma de aprender
            un idioma.
          </p>
          <div className="mt-6 flex items-start gap-3 text-base font-semibold leading-6 text-[#17233a]">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#e83e33]" aria-hidden="true" />
            <address className="not-italic">{address}</address>
          </div>
          <a
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#e83e33] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#cf3028]"
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cómo llegar
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="h-[280px] overflow-hidden rounded-2xl shadow-[0_16px_40px_rgb(23_35_58_/_14%)] sm:h-[360px]">
          <iframe
            className="h-full w-full border-0"
            src={`${mapUrl}&output=embed`}
            title="Mapa de la sede Towers en La Playa, Cúcuta"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

export default HomeLocation
