import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import About from './pages/About'
import Contact from './pages/Contact'
import Community from './pages/Community'
import Dashboard from './pages/Dashboard'
import Experience from './pages/Experience'
import Enterprise from './pages/Enterprise'
import Home from './pages/Home'
import Languages from './pages/Languages'
import LanguageTemplate from './pages/LanguageTemplate'
import LevelTest from './pages/LevelTest'
import Methodology from './pages/Methodology'
import Modalities from './pages/Modalities'
import Membership from './pages/Membership'
import Login from './pages/Login'
import CampaignBuilder from './pages/CampaignBuilder'
import CampaignLanding from './pages/CampaignLanding'
import FreeClass from './pages/FreeClass'
import FreeClassIntro from './pages/FreeClassIntro'
import TeacherTemplate from './pages/TeacherTemplate'
import Legal from './pages/Legal'
import HomeContentAdmin from './pages/HomeContentAdmin'
import { AuthProvider } from './auth/AuthProvider'
import RequireAuth from './components/RequireAuth'
import RequireSiteOwner from './components/RequireSiteOwner'
import ScrollReveal from './components/ScrollReveal'

const COOKIE_CONSENT_KEY = 'towers-cookie-consent'

function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!value) setVisible(true)
  }, [])

  function saveConsent(choice) {
    const payload = {
      choice,
      acceptedAt: new Date().toISOString(),
      source: 'banner',
      method: 'button',
      version: '2026-11-15',
    }
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(payload))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e7e9ed] bg-white/95 px-4 py-4 shadow-[0_-10px_30px_rgb(15_23_42_/_10%)] backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl text-sm leading-6 text-[#374151]">
          <p className="font-semibold text-[#111827]">Tu privacidad importa</p>
          <p>
            Usamos cookies necesarias para el funcionamiento del sitio. También puedes aceptar cookies analíticas y de marketing si las habilitamos en el futuro. Puedes revisar nuestra <a className="font-semibold text-[#e83e33] underline underline-offset-4" href="/politica-de-cookies">política de cookies</a>.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="rounded-lg border border-[#dfe4ea] px-4 py-2 text-sm font-semibold text-[#111827] transition hover:border-[#e83e33] hover:text-[#e83e33]" onClick={() => saveConsent('essential')}>
            Solo esenciales
          </button>
          <button type="button" className="rounded-lg bg-[#e83e33] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgb(232_62_51_/_18%)] transition hover:bg-[#cf3028]" onClick={() => saveConsent('all')}>
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <ScrollReveal />
      <CookieConsent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/idiomas" element={<Languages />} />
        <Route path="/idiomas/:language" element={<LanguageTemplate />} />
        <Route path="/docentes/:id" element={<TeacherTemplate />} />
        <Route path="/modalidades" element={<Modalities />} />
        <Route path="/metodologia" element={<Methodology />} />
        <Route path="/experiencia-towers" element={<Experience />} />
        <Route path="/empresas" element={<Enterprise />} />
        <Route path="/experiencia-towers/comunidad" element={<Community />} />
        <Route path="/experiencia-towers/membresia" element={<Membership />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/prueba-de-nivel" element={<LevelTest />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/clase-gratis" element={<FreeClass />} />
        <Route path="/clase-introductoria" element={<FreeClassIntro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terminos-y-condiciones" element={<Legal />} />
        <Route path="/politica-de-privacidad" element={<Legal />} />
        <Route path="/politica-de-cookies" element={<Legal />} />
        <Route path="/politica-de-reembolsos" element={<Legal />} />
        <Route path="/derechos-de-imagen" element={<Legal />} />
        <Route path="/cumplimiento-legal" element={<Legal />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/dashboard/portada" element={<RequireSiteOwner><HomeContentAdmin /></RequireSiteOwner>} />
        <Route path="/campaigns/new" element={<RequireAuth><CampaignBuilder /></RequireAuth>} />
        <Route path="/campaigns/:slug" element={<CampaignLanding />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
