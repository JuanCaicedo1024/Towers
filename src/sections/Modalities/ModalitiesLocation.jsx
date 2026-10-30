import AnimatedText from '@/components/ui/AnimatedText';

// Cambia las rutas de images para actualizar las fotos de cada sede.
const cities = [
  {
    city: 'Cúcuta',
    sedes: [
      {
        id: 'cucuta',
        address: 'Av. 0 #16-90 La Playa, Cúcuta, Norte de Santander, Colombia.',
        images: ['/images/Sinfoto.png'],
      },
    ],
  },
  {
    city: 'Bogotá',
    sedes: [
      {
        id: 'bogota-la-floresta',
        address: 'Km 4.6 vía Bogotá - La Calera, La Floresta, Bogotá, Colombia.',
        images: ['/images/Sinfoto.png'],
      },
      {
        id: 'bogota-2',
        address: 'DIRECCIÓN SEDE 2, Bogotá, Colombia.',
        images: ['/images/Sinfoto.png'],
      },
      {
        id: 'bogota-3',
        address: 'DIRECCIÓN SEDE 3, Bogotá, Colombia.',
        images: ['/images/Sinfoto.png'],
      },
    ],
  },
]

function LocationCard({ address, images, city }) {
  return (
    <article className="group min-w-0 transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transform-none">
      <div className="text-center">
        <p className="mt-0.5 text-xs font-semibold text-[#294d78]">
          Centro Activo de Idiomas TOWERS
        </p>
        <p className="mt-0.5 text-xs leading-5 text-[#294d78]">{address}</p>
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
              className="mt-2 flex min-h-10 items-center justify-center rounded-xl bg-[#f13d35] px-3 py-2 text-center text-xs font-bold text-white transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#d92f29] active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#294d78] sm:text-sm"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Conocer la experiencia Towers
            </a>
          </div>
        ))}
      </div>
    </article>
  )
}

function ModalitiesLocation() {
  return (
    <section className="bg-[#fff8f6] text-[#17233a]">
      <div className="mx-auto max-w-[1240px] px-[6%] py-16 lg:py-20">
        <h2 className="mx-auto max-w-[600px] text-center text-3xl font-extrabold italic leading-[1.05] tracking-[-0.045em] text-[#171c20] sm:text-4xl">
          <AnimatedText>El idioma no termina cuando termina la clase.</AnimatedText>
        </h2>

        <div className="mt-10 grid gap-14 sm:mt-12 sm:gap-20">
          {cities.map(({ city, sedes }) => (
            <div key={city}>
              <h3 className="text-center text-2xl font-extrabold tracking-[-0.04em] text-[#294d78]">
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
