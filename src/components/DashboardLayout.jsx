import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, FileText, LayoutTemplate, LogOut } from 'lucide-react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { isSiteOwner } from '../lib/supabase'

const itemClass = 'flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold transition hover:bg-[#f4f7fb] hover:text-[#e83e33] focus-visible:outline-2 focus-visible:outline-[#e83e33]'

export default function DashboardLayout() {
  const { session, signOut } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const token = session.access_token
  const [ownerToken, setOwnerToken] = useState(null)
  const [collapsed, setCollapsed] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const toggleLabel = collapsed ? 'Expandir menú' : 'Plegar menú'
  const ToggleIcon = collapsed ? ChevronRight : ChevronLeft

  useEffect(() => {
    let active = true
    isSiteOwner(token).then((allowed) => {
      if (active) setOwnerToken(allowed ? token : null)
    }).catch(() => {
      if (active) setOwnerToken(null)
    })
    return () => { active = false }
  }, [token])

  function closeOnMobile() {
    if (window.matchMedia('(max-width: 767px)').matches) setCollapsed(true)
  }

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  const items = [
    { to: '/dashboard', label: 'Micro-landings', icon: FileText },
    ...(ownerToken === token ? [{ to: '/dashboard/portada', label: 'Portada principal', icon: LayoutTemplate }] : []),
  ]

  return (
    <div className="flex min-h-screen bg-[#f4f7fb] text-[#102d55]">
      <aside className={`sticky top-0 z-30 h-dvh w-14 shrink-0 ${collapsed ? 'md:w-16' : 'md:w-60'}`}>
        <div className={`flex h-full flex-col overflow-y-auto border-r border-[#e0e7f0] bg-white px-1.5 py-4 md:px-2.5 ${collapsed ? 'w-full' : 'w-60 px-2.5 shadow-xl md:shadow-none'}`}>
          <div className={`flex items-center gap-2 ${collapsed ? 'flex-col' : 'justify-between px-1'}`}>
            <Link to="/" aria-label="Towers, ir al inicio" className="rounded-lg p-1">
              <img className={collapsed ? 'w-8' : 'w-24'} src="/images/brand/towers-cropped.webp" alt="Towers" />
            </Link>
            <button type="button" className="grid size-10 shrink-0 place-items-center rounded-lg border border-[#e0e7f0] text-[#173a67] hover:bg-[#f4f7fb]" onClick={() => setCollapsed(!collapsed)} aria-expanded={!collapsed} aria-controls="dashboard-navigation" aria-label={toggleLabel} title={toggleLabel}>
              <ToggleIcon size={18} aria-hidden="true" />
            </button>
          </div>
          <nav id="dashboard-navigation" aria-label="Panel de administración" className="mt-5 space-y-1 border-t border-[#e0e7f0] pt-4">
            {items.map(({ to, label, icon: Icon }) => {
              const active = pathname === to || (to === '/dashboard' && pathname === '/campaigns/new')
              return (
                <Link key={to} to={to} aria-current={active ? (pathname === to ? 'page' : 'true') : undefined} onClick={closeOnMobile} title={collapsed ? label : undefined} className={`${itemClass} ${active ? 'bg-[#fff0ee] text-[#be3029]' : 'text-[#173a67]'}`}>
                  <Icon size={20} className="shrink-0" aria-hidden="true" />
                  <span className={collapsed ? 'sr-only' : undefined}>{label}</span>
                </Link>
              )
            })}
          </nav>
          <div className="mt-auto border-t border-[#e0e7f0] pt-3">
            {!collapsed && <p className="mb-2 truncate px-3 text-xs text-[#627b9e]" title={session.user?.email}>{session.user?.email}</p>}
            <button type="button" onClick={handleSignOut} title={collapsed ? 'Cerrar sesión' : undefined} className={itemClass}>
              <LogOut size={20} className="shrink-0" aria-hidden="true" />
              <span className={collapsed ? 'sr-only' : undefined}>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>
      {!collapsed && <button type="button" className="fixed inset-0 z-20 bg-[#08244a]/25 md:hidden" onClick={() => setCollapsed(true)} aria-label="Cerrar menú" />}
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  )
}
