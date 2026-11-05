import { Mail, MapPin, Phone } from 'lucide-react'
import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const quickLinks = [
  ['Inicio', '/'],
  ['Plataforma', '/modalidades'],
  ['Cursos', '/idiomas'],
  ['Quienes Somos', '/nosotros'],
  ['Contacto', '/contacto'],
  ['Acceso adm', '/login'],
]

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/towersidiomas', Icon: IconBrandFacebook },
  { label: 'Instagram', href: 'https://www.instagram.com/towersidiomas/', Icon: IconBrandInstagram },
  { label: 'TikTok', href: 'https://www.tiktok.com/@towersidiomas', Icon: IconBrandTiktok },
]

function Footer() {
  return (
    <footer className="site-footer bg-white text-[#747474]">
      <div className="mx-auto max-w-[1440px] px-[6%] pb-16 pt-16 lg:px-[9%] lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr_1fr] lg:gap-20">
          <div className="site-footer__column">
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
              Centro educativo y cultural dedicado a la enseñanza de idiomas
              como inglés, francés, alemán y portugués, mediante experiencias
              de aprendizaje interactivas y personalizadas.
            </p>
            <div className="mt-7 flex gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  className="site-footer__social grid h-11 w-11 place-items-center rounded-full bg-[#E83E33] text-white transition hover:-translate-y-1 hover:bg-[#cf3028]"
                  href={href}
                  key={label}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon size={22} stroke={2} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="site-footer__column">
            <h2 className="m-0 text-3xl font-semibold text-[#1d3f29]">Enlaces Rápidos</h2>
            <nav className="mt-8 grid gap-5" aria-label="Enlaces rápidos">
              {quickLinks.map(([label, path]) => (
                <Link
                  className="flex items-center gap-4 text-lg transition hover:translate-x-1 hover:text-[#E83E33]"
                  key={label}
                  to={path}
                >
                  <span className="text-2xl font-semibold leading-none text-[#E83E33]">›</span>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="site-footer__column">
            <h2 className="m-0 text-3xl font-semibold leading-[1.05] text-[#1d3f29]">
              Contáctanos
            </h2>
            <div className="mt-8 grid gap-7">
              <ContactDetail
                icon={Phone}
                title="Teléfono"
                lines={[{ value: '+57 301 349 0020', href: 'tel:+573013490020' }]}
              />
              <ContactDetail
                icon={Mail}
                title="Correo"
                lines={[
                  { value: 'info@towers.edu.co', href: 'mailto:info@towers.edu.co' },
                  {
                    label: 'Atención académica:',
                    value: 'academico@towers.edu.co',
                    href: 'mailto:academico@towers.edu.co',
                  },
                ]}
              />
              <ContactDetail
                icon={MapPin}
                title="Nuestras sedes"
                lines={[
                  { value: 'Cúcuta – La Playa' },
                  { value: 'Bogotá – Usaquén' },
                  { value: 'Bogotá – Kennedy' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom bg-[linear-gradient(110deg,#08274f,#3e203d_48%,#b52322)] px-[6%] py-6 text-white lg:px-[6.5%]">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <p className="m-0 text-lg">Copyright 2026&nbsp; . Appendix All Rights Reserved.</p>
          <span className="text-lg">Aceptamos</span>
        </div>
      </div>
    </footer>
  )
}

function ContactDetail({ icon: Icon, title, lines }) {
  return (
    <div className="flex items-start gap-5">
      <span className="site-footer__contact-icon grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#E83E33] text-white">
        <Icon size={24} strokeWidth={2} />
      </span>
      <div className="grid gap-2 pt-1 text-sm leading-[1.4]">
        <h3 className="m-0 font-semibold text-[#1d3f29]">{title}</h3>
        {lines.map(({ label, value, href }) => (
          <span key={value}>
            {label && `${label} `}
            {href ? (
              <a className="hover:text-[#E83E33]" href={href}>{value}</a>
            ) : value}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Footer
