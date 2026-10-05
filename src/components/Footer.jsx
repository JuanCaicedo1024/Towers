import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const quickLinks = [
  ['Inicio', '/'],
  ['Plataforma', '/modalidades'],
  ['Cursos', '/idiomas'],
  ['Quienes Somos', '/nosotros'],
  ['Contacto', '/contacto'],
]

const socialLinks = [
  { label: 'Facebook', href: '#facebook', mark: 'f' },
  { label: 'LinkedIn', href: '#linkedin', mark: 'in' },
  { label: 'WhatsApp', href: '#whatsapp', mark: '◔' },
  { label: 'Instagram', href: '#instagram', mark: '◎' },
]

function Footer() {
  return (
    <footer className="bg-white text-[#747474]">
      <div className="mx-auto max-w-[1440px] px-[6%] pb-16 pt-16 lg:px-[9%] lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr_1fr] lg:gap-20">
          <div>
            <div className="flex flex-nowrap items-center gap-4">
              <img
                className="h-auto w-[170px] shrink-0 object-contain"
                src="/images/Towers_logo.png"
                alt="Towers Centro activo de idiomas"
              />
              <img
                className="h-auto w-[190px] shrink-0 object-contain"
                src="/images/minEducacion.png"
                alt="Ministerio de Educación Nacional"
              />
            </div>
            <p className="mt-9 max-w-[440px] text-lg leading-[1.65]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              ultrices enim est, a volutpat libero tincidunt sit amet. Etiam
              feugiat lobortis sollicitudin.
            </p>
            <div className="mt-7 flex gap-3">
              {socialLinks.map(({ label, href, mark }) => (
                <a
                  className="grid h-11 w-11 place-items-center rounded-full bg-[#c4cedb] text-[#173253] transition hover:-translate-y-1 hover:bg-[#E83E33] hover:text-white"
                  href={href}
                  key={label}
                  aria-label={label}
                >
                  <span className="font-bold">{mark}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="m-0 text-3xl font-semibold text-[#1d3f29]">Enlaces Rápidos</h2>
            <nav className="mt-8 grid gap-5" aria-label="Enlaces rápidos">
              {quickLinks.map(([label, path]) => (
                <Link
                  className="flex items-center gap-4 text-lg transition hover:translate-x-1 hover:text-[#E83E33]"
                  key={label}
                  to={path}
                >
                  <span className="text-2xl font-semibold leading-none">›</span>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="m-0 max-w-[220px] text-3xl font-semibold leading-[1.05] text-[#1d3f29]">
              Necesitas
              <br />
              Ayuda?
            </h2>
            <div className="mt-8 grid gap-7">
              <ContactDetail icon={Phone} lines={['+01 234 567 890', '+09 999 999 999']} />
              <ContactDetail icon={Mail} lines={['mailinfo000@tours.com', 'support24@tours.com']} />
              <ContactDetail icon={MapPin} lines={['789 Inner Lane, Holy park,', 'California, USA']} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[linear-gradient(110deg,#08274f,#3e203d_48%,#b52322)] px-[6%] py-6 text-white lg:px-[6.5%]">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <p className="m-0 text-lg">Copyright 2026&nbsp; . Appendix All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="text-lg">Aceptamos</span>
            <img className="h-auto w-[310px] max-w-full object-contain" src="/images/metodosPago.png" alt="Métodos de pago aceptados" />
          </div>
        </div>
      </div>
    </footer>
  )
}

function ContactDetail({ icon: Icon, lines }) {
  return (
    <div className="flex items-start gap-5">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#c4cedb] text-[#173253]">
        <Icon size={24} strokeWidth={2} />
      </span>
      <div className="grid gap-2 pt-1 text-lg leading-[1.35]">
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </div>
  )
}

export default Footer
