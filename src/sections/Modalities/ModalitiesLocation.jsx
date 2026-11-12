import AnimatedText from '@/components/ui/AnimatedText';
import { MapPin } from 'lucide-react';

// Cambia las rutas de images para actualizar las fotos de cada sede.
const cities = [
  {
    city: 'Cúcuta',
    sedes: [
      {
        id: 'cucuta',
        name: 'Towers La Playa',
        address: 'Av. 0 #16 90, la playa, Cúcuta, Norte de Santander',
        phones: [{ label: 'Cel.', number: '324 275 5119' }],
        images: ['/images/locations/cucuta.webp'],
      },
    ],
  },
  {
    city: 'Bogotá',
    sedes: [
      {
        id: 'bogota-usaquen',
        name: 'Towers Usaquén',
        address: 'Cl. 161 #21-92, Usaquén, Bogotá, Cundinamarca',
        phones: [
          { label: 'Tel.', number: '(601) 432 3390' },
          { label: 'Cel.', number: '301 349 0020' },
        ],
        images: ['/images/locations/usaquen.webp'],
      },
      {
        id: 'bogota-kennedy',
        name: 'Towers Kennedy',
        address: 'Ac. 26 Sur #71D-77, Kennedy, Bogotá',
        phones: [
          { label: 'Tel.', number: '(601) 529 4993' },
          { label: 'Cel.', number: '314 235 5540' },
        ],
        images: ['/images/locations/kennedy.webp'],
      },
      {
        id: 'bogota-engativa-titan-plaza',
        name: 'Towers Engativá Titán Plaza',
        address: 'Av Cl 80 #70F - 65, Bogotá',
        phones: [],
        images: ['/images/locations/engativa.webp'],
      },
    ],
  },
]

function LocationCard({ address, images, city, name, phones }) {
  return (
    <article className="modalities-location-card group flex min-w-0 flex-col text-center transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transform-none">
      <div className="flex-1 text-center">
        <p className="mt-0.5 text-lg font-bold text-black">
          {name}
        </p>
        <p className="mt-0.5 text-base leading-6 text-black">{address}</p>
        {phones.length > 0 && (
          <div className="mt-2 grid gap-1">
            {phones.map(({ label, number }) => (
              <a
                className="text-base leading-6 text-black hover:text-[#f13d35]"
                href={`tel:${number.replace(/[^\d+]/g, '')}`}
                key={label}
              >
                {label} {number}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5">
        {images.map((image, index) => (
          <div className="mx-auto min-w-0 max-w-[420px]" key={`${address}-${index}`}>
            <div className="aspect-square overflow-hidden rounded-[1.25rem] border-[3px] border-white shadow-[0_4px_10px_rgb(23_35_58_/_14%)] transition-shadow duration-300 group-hover:shadow-[0_12px_24px_rgb(23_35_58_/_20%)]">
              <img
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
                src={image}
                alt={`Sede Towers en ${city}, imagen ${index + 1}`}
              />
            </div>
            <a
              className="mt-2 flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#f13d35] px-3 py-2 text-center text-xs font-bold text-white transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#d92f29] active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#294d78] sm:text-sm"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Conocer ubicación
            </a>
          </div>
        ))}
      </div>
    </article>
  )
}

function ModalitiesLocation() {
  return (
    <section className="modalities-location bg-white text-black">
      <div className="mx-auto max-w-[1240px] px-[6%] py-16 lg:py-20">
        <h2 className="mx-auto flex w-full max-w-[600px] justify-center text-center text-3xl font-extrabold italic leading-[1.05] tracking-[-0.045em] text-[#171c20] sm:text-4xl">
          <AnimatedText per="line">El idioma no termina cuando termina la clase.</AnimatedText>
        </h2>

        <div className="mt-10 grid gap-14 sm:mt-12 sm:gap-20">
          {cities.map(({ city, sedes }) => (
            <div key={city}>
              <h3 className="text-center text-[1.75rem] font-extrabold tracking-[-0.04em] text-black">
                {city}
              </h3>

              <div className={`mt-8 grid gap-12 sm:gap-8 ${city === 'Bogotá' ? 'sm:grid-cols-3' : 'sm:grid-cols-1'}`}>
                {sedes.map((sede) => (
                  <LocationCard {...sede} city={city} key={sede.id} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ModalitiesLocation
