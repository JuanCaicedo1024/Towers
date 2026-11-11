import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar as ResizableNavbar,
  NavBody,
  NavbarButton,
} from '@/components/ui/resizable-navbar'

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

function Logo() {
  return (
    <NavLink className="relative z-20 shrink-0 px-2 py-1" to="/" aria-label="Towers, inicio">
      <img
        className="h-[64px] w-[157px] object-contain sm:w-[196px]"
        src="/images/Towers_logo.png"
        alt="Towers Centro activo de idiomas"
      />
    </NavLink>
  )
}

function NavigationLink({ item, mobile = false, openMenu, onToggle, onNavigate }) {
  if (!item.submenu) {
    if (item.href) {
      return (
        <a
          className="relative z-20 whitespace-nowrap rounded-full px-1.5 py-2 text-sm font-semibold text-[#111827] transition-colors hover:text-[#E83E33] xl:px-2 xl:text-[15px]"
          href={item.href}
          onClick={onNavigate}
        >
          {item.label}
        </a>
      )
    }

    return (
      <NavLink
        className={({ isActive }) =>
          `group relative z-20 whitespace-nowrap rounded-full px-1.5 py-2 text-sm font-semibold text-[#111827] transition-colors duration-200 hover:text-[#E83E33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E83E33] xl:px-2 xl:text-[15px]${isActive ? ' text-[#E83E33]' : ''}`
        }
        to={item.path}
        onClick={onNavigate}
      >
        {item.label}
        <span
          className="absolute inset-x-2 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-[#E83E33] transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </NavLink>
    )
  }

  return (
    <div className="navbar__item navbar__item--menu relative z-20">
      <button
        aria-expanded={openMenu === item.path}
        className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border-0 bg-transparent px-1.5 py-2 text-sm font-semibold text-[#111827] transition-colors hover:text-[#E83E33] xl:px-2 xl:text-[15px]"
        type="button"
        onClick={() => onToggle(item.path)}
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
            openMenu === item.path ? 'rotate-180' : ''
          }`}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      {!mobile && openMenu === item.path && (
        <div className="navbar__dropdown">
          {item.submenu.map((submenuItem) => (
            <NavLink
              className="navbar__dropdown-link"
              key={submenuItem.path}
              to={submenuItem.path}
              onClick={onNavigate}
            >
              {submenuItem.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMenus = () => {
    setOpenMenu(null)
    setIsMobileMenuOpen(false)
  }

  return (
    <ResizableNavbar className="top-0 px-[5%] lg:px-[8%]">
      <NavBody className="max-w-[1440px] gap-0 px-3 sm:px-4 xl:gap-1">
        <Logo />
        <nav className="flex min-w-0 flex-1 items-center justify-center gap-0 xl:gap-1" aria-label="Navegación principal">
          {navigationItems.map((item) => (
            <NavigationLink
              item={item}
              key={item.path}
              openMenu={openMenu}
              onNavigate={closeMenus}
              onToggle={(path) => setOpenMenu((current) => (current === path ? null : path))}
            />
          ))}
        </nav>
        <NavbarButton
          as={NavLink}
          className="mr-1 inline-flex h-10 min-w-[132px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#E83E33] px-4 text-sm font-bold text-white shadow-[0_6px_14px_rgb(232_62_51_/_22%)] transition hover:-translate-y-0.5 hover:bg-[#cf3028] hover:shadow-[0_8px_18px_rgb(232_62_51_/_30%)] xl:mr-2 xl:min-w-[140px] xl:px-5"
          to="/contacto"
        >
          Contactar
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
        </NavbarButton>
      </NavBody>

      <MobileNav className="px-2">
        <MobileNavHeader>
          <Logo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMenus}
        >
          {navigationItems.map((item) => (
            <div className="flex w-full flex-col gap-2" key={item.path}>
              <NavigationLink
                item={item}
                key={item.path}
                mobile
                openMenu={openMenu}
                onNavigate={closeMenus}
                onToggle={(path) => setOpenMenu((current) => (current === path ? null : path))}
              />
              {item.submenu && openMenu === item.path && (
                <div className="ml-4 flex flex-col gap-2 border-l border-[#dce2eb] pl-4">
                  {item.submenu.map((submenuItem) => (
                    <NavLink
                      className="text-base font-medium text-[#111827]"
                      key={submenuItem.path}
                      to={submenuItem.path}
                      onClick={closeMenus}
                    >
                      {submenuItem.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
          <NavbarButton
            as={NavLink}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#E83E33] text-sm font-bold text-white shadow-[0_6px_14px_rgb(232_62_51_/_22%)] transition hover:bg-[#cf3028]"
            to="/contacto"
            onClick={closeMenus}
          >
            Contactar
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  )
}

export default Navbar
