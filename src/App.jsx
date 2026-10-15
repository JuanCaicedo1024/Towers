import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Contact from './pages/Contact'
import Community from './pages/Community'
import Dashboard from './pages/Dashboard'
import Experience from './pages/Experience'
import Home from './pages/Home'
import Languages from './pages/Languages'
import LanguageTemplate from './pages/LanguageTemplate'
import LevelTest from './pages/LevelTest'
import Methodology from './pages/Methodology'
import Modalities from './pages/Modalities'
import Membership from './pages/Membership'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/idiomas" element={<Languages />} />
        <Route path="/idiomas/:language" element={<LanguageTemplate />} />
        <Route path="/modalidades" element={<Modalities />} />
        <Route path="/metodologia" element={<Methodology />} />
        <Route path="/experiencia-towers" element={<Experience />} />
        <Route path="/experiencia-towers/comunidad" element={<Community />} />
        <Route path="/experiencia-towers/membresia" element={<Membership />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/prueba-de-nivel" element={<LevelTest />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
