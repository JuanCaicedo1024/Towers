import { useState } from 'react'
import { NavLink } from 'react-router-dom'
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
        className="h-[46px] w-[112px] object-contain sm:w-[140px]"
        src="/images/Towers_logo.png"
        alt="Towers Centro activo de idiomas"
      />
    </NavLink>
  )
}

function NavigationLink({ item, mobile = false, openMenu, onToggle, onNavigate }) {
  if (!item.submenu) {
    return (
      <NavLink
        className={({ isActive }) =>
          `relative z-20 whitespace-nowrap rounded-full px-1.5 py-2 text-[13px] font-medium text-[#111827] transition-colors hover:text-[#E83E33] xl:px-2 xl:text-sm${isActive ? ' text-[#E83E33]' : ''}`
        }
        to={item.path}
        onClick={onNavigate}
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <div className="navbar__item relative z-20">
      <button
        aria-expanded={openMenu === item.path}
        className="flex items-center whitespace-nowrap rounded-full border-0 bg-transparent px-1.5 py-2 text-[13px] font-medium text-[#111827] transition-colors hover:text-[#E83E33] xl:px-2 xl:text-sm"
        type="button"
        onClick={() => onToggle(item.path)}
      >
        {item.label}
        <span className={`ml-2 text-lg leading-none transition-transform duration-200 ${openMenu === item.path ? 'rotate-180' : ''}`} aria-hidden="true">
          ⌄
        </span>
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
      <NavBody className="max-w-[1440px] gap-0 px-1 xl:gap-1">
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
          className="shrink-0 rounded-2xl bg-[#E83E33] px-2 py-3 text-sm font-semibold text-white hover:bg-[#cf3028] xl:px-3"
          to="/contacto"
        >
          Contactar <span aria-hidden="true" className="ml-3 text-xl leading-none">→</span>
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
                      className="text-sm text-[#627493]"
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
            className="w-full rounded-xl bg-[#E83E33] text-white"
            to="/contacto"
            onClick={closeMenus}
          >
            Contactar
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  )
}

export default Navbar
