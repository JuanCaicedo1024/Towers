import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  {
    label: 'Idiomas',
    path: '/idiomas',
    submenu: [
      { label: 'Ver todos los idiomas', path: '/idiomas' },
      { label: 'Inglés', path: '/idiomas/ingles' },
      { label: 'Francés', path: '/idiomas/frances' },
      { label: 'Portugués', path: '/idiomas/portugues' },
      { label: 'Alemán', path: '/idiomas/aleman' },
      { label: 'Italiano', path: '/idiomas/italiano' },
    ],
  },
  { label: 'Modalidades', path: '/modalidades' },
  { label: 'Metodología', path: '/metodologia' },
  {
    label: 'Experiencia Towers',
    path: '/experiencia-towers',
    submenu: [
      { label: 'Experiencia Towers', path: '/experiencia-towers' },
      { label: 'Comunidad / Club', path: '/experiencia-towers/comunidad' },
      {
        label: 'Membresía y beneficios',
        path: '/experiencia-towers/membresia',
      },
    ],
  },
  { label: 'Nosotros', path: '/nosotros' },
  { label: 'Prueba de nivel', path: '/prueba-de-nivel' },
]

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null)

  const toggleMenu = (menuPath) => {
    setOpenMenu((currentMenu) =>
      currentMenu === menuPath ? null : menuPath,
    )
  }

  const closeMenu = () => setOpenMenu(null)

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/65 px-[5%] py-3 shadow-[0_8px_30px_rgb(23_35_58_/_8%)] backdrop-blur-xl backdrop-saturate-150 lg:px-[10%]">
      <div className="mx-auto flex min-h-[64px] max-w-[1440px] flex-wrap items-center gap-6">
      <NavLink className="shrink-0" to="/" aria-label="Towers, inicio">
        <img
          className="h-[52px] w-[105px] object-contain sm:w-[145px]"
          src="/images/Towers_logo.png"
          alt="Towers Centro activo de idiomas"
        />
      </NavLink>

      <nav className="order-3 flex basis-full flex-wrap items-center justify-center gap-4 lg:order-none lg:flex-1 lg:basis-auto lg:gap-5 xl:gap-10" aria-label="Navegación principal">
        {navigationItems.map(({ label, path, submenu }) => (
          <div className={`navbar__item relative${submenu ? ' navbar__item--menu' : ''}`} key={path}>
            {submenu ? (
              <button
                aria-expanded={openMenu === path}
                className="flex items-center whitespace-nowrap border-0 bg-transparent p-0 text-[15px] font-medium text-[#111827] transition-colors hover:text-[#E83E33]"
                type="button"
                onClick={() => toggleMenu(path)}
              >
                {label}
                <span className={`ml-2 text-lg leading-none transition-transform duration-200 ${openMenu === path ? 'rotate-180' : ''}`} aria-hidden="true">
                  ⌄
                </span>
              </button>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  `whitespace-nowrap text-[15px] font-medium text-[#111827] transition-colors hover:text-[#E83E33]${isActive ? ' text-[#E83E33]' : ''}`
                }
                to={path}
              >
                {label}
              </NavLink>
            )}

            {submenu && openMenu === path && (
              <div className="navbar__dropdown">
                {submenu.map((submenuItem) => (
                  <NavLink
                    className="navbar__dropdown-link"
                    key={submenuItem.path}
                    to={submenuItem.path}
                    onClick={closeMenu}
                  >
                    {submenuItem.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <NavLink className="inline-flex shrink-0 items-center gap-4 rounded-2xl bg-[#E83E33] px-7 py-3 text-base font-semibold text-white shadow-[0_8px_18px_rgb(232_62_51_/_25%)] transition hover:-translate-y-0.5 hover:bg-[#cf3028] hover:shadow-[0_10px_22px_rgb(232_62_51_/_35%)]" to="/contacto">
        Contactar
        <span aria-hidden="true" className="text-xl leading-none">→</span>
      </NavLink>
      </div>
    </header>
  )
}

export default Navbar
