import { Link } from 'react-router-dom'

// Cambia las rutas de images para actualizar las fotos de cada sede.
const locations = [
  {
    city: 'Cúcuta',
    address: 'Av. 0 #16-90 La Playa, Cúcuta, Norte de Santander, Colombia.',
    images: ['/images/Sinfoto.png', '/images/Sinfoto.png'],
  },
  {
    city: 'Bogotá',
    address: 'Av. 0 #16-90 La Playa, Cúcuta, Norte de Santander, Colombia.',
    images: ['/images/Sinfoto.png', '/images/Sinfoto.png'],
  },
]

function LocationCard({ city, address, images }) {
  return (
    <article className="min-w-0">
      <div className="text-center">
        <h3 className="text-xl font-extrabold tracking-[-0.04em] text-[#294d78]">
          {city}
        </h3>
        <p className="mt-0.5 text-xs font-semibold text-[#294d78]">
          Centro Activo de Idiomas TOWERS
        </p>
        <p className="mt-0.5 text-xs leading-5 text-[#294d78]">{address}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5">
        {images.map((image, index) => (
          <div className="min-w-0" key={`${city}-${index}`}>
            <div className="overflow-hidden rounded-[1.25rem] border-[3px] border-white shadow-[0_4px_10px_rgb(23_35_58_/_14%)]">
              <img
                className="h-[150px] w-full object-cover sm:h-[210px] lg:h-[250px]"
                src={image}
                alt={`Sede Towers en ${city}, imagen ${index + 1}`}
              />
            </div>
            <Link
              className="mt-2 flex min-h-10 items-center justify-center rounded-xl bg-[#f13d35] px-3 py-2 text-center text-xs font-bold text-white transition hover:bg-[#d92f29] sm:text-sm"
              to="/experiencia-towers"
            >
              Conocer la experiencia Towers
            </Link>
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
          El idioma no termina cuando termina la clase.
        </h2>

        <div className="mt-10 grid gap-12 sm:mt-12 sm:gap-16">
          {locations.map((location) => (
            <LocationCard {...location} key={location.city} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ModalitiesLocation
