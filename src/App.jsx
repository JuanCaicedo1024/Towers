import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Contact from './pages/Contact'
import Experience from './pages/Experience'
import Home from './pages/Home'
import Languages from './pages/Languages'
import LevelTest from './pages/LevelTest'
import Methodology from './pages/Methodology'
import Modalities from './pages/Modalities'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/idiomas" element={<Languages />} />
        <Route path="/idiomas/:language" element={<Languages />} />
        <Route path="/modalidades" element={<Modalities />} />
        <Route path="/metodologia" element={<Methodology />} />
        <Route path="/experiencia-towers" element={<Experience />} />
        <Route path="/experiencia-towers/:section" element={<Experience />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/prueba-de-nivel" element={<LevelTest />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
