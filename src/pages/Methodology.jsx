import AnimatedText from '@/components/ui/AnimatedText';
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const skills = [
  ['01', 'Escucha', 'Comprender lo que escuchas en diferentes contextos, ritmos y situaciones de comunicación.'],
  ['02', 'Habla', 'Expresarte con claridad, fluidez y seguridad para participar e interactuar con otras personas.'],
  ['03', 'Lectura', 'Comprender información escrita y aplicar cada palabra en el proceso de aprendizaje.'],
  ['04', 'Escritura', 'Organizar y expresar ideas por escrito de acuerdo con el nivel y el objetivo del estudiante.'],
]

const process = [
  ['01', 'Comprender', 'Primero nos acercamos al idioma y reconocemos sus sonidos, palabras y estructuras.'],
  ['02', 'Practicar', 'Después ponemos en práctica lo aprendido en actividades significativas y guiadas.'],
  ['03', 'Aplicar', 'Usamos el idioma en situaciones reales para convertir el conocimiento en una habilidad.'],
  ['04', 'Consolidar', 'Reforzamos cada avance con nuevos retos, retroalimentación y acompañamiento.'],
  ['05', 'Avanzar', 'Medimos tu progreso y trazamos el siguiente paso para que sigas creciendo.'],
]

const teachers = [
  ['Docente independiente', 'Formación y experiencia', 'Clases personalizadas y acompañamiento cercano.'],
  ['Docente Towers', 'Formación Towers', 'Una experiencia alineada con nuestra metodología.'],
  ['Docente especialista', 'Experiencia profesional', 'Conocimiento específico para tus objetivos.'],
]

const modalities = [
  ['Presencial', 'Experiencia en sede con interacción directa y acompañamiento.'],
  ['Online', 'Clases desde cualquier lugar manteniendo el enfoque de interacción.'],
  ['Híbrida', 'La flexibilidad perfecta para combinar ambos formatos.'],
]

function Placeholder({ className = '' }) {
  return (
    <div className={`methodology-placeholder ${className}`} aria-label="Espacio reservado para material audiovisual">
      <span>Fotografía / video de aprendizaje</span>
    </div>
  )
}

function SectionLabel({ children, dark = false }) {
  return <span className={`methodology-label ${dark ? 'text-[#71809a]' : ''}`}>{children}</span>
}

function Methodology() {
  return (
    <>
      <Navbar />
      <main className="methodology-page">
        <section className="methodology-dark methodology-hero">
          <div className="methodology-container">
            
            <div className="methodology-split">
              <div className="methodology-hero-copy">
                <SectionLabel dark="true">Metodología Towers</SectionLabel>
                <h1 className="m-0 max-w-[680px] text-[clamp(2.6rem,5.5vw,5.3rem)] leading-[1.02] tracking-[-0.045em] text-[#101820]">
                  <AnimatedText per="line">Aprender un idioma</AnimatedText>
                  <span className="text-[#f13d35]">
                    <AnimatedText per="line">significa usarlo.</AnimatedText>
                  </span>
                </h1>
              <p>
                <AnimatedText>En TOWERS, el aprendizaje parte de la interacción. No se trata
                únicamente de estudiar estructuras o memorizar contenidos, sino de
                desarrollar la capacidad de comprender, comunicarte y utilizar el idioma
                en diferentes situaciones.</AnimatedText>
              </p>
                
              </div>
              <img
                className="methodology-hero-image"
                src="/images/Presencial.jpg"
                alt="Docente impartiendo una clase presencial a sus estudiantes"
              />
            </div>
          </div>
        </section>

        
      </main>
      <Footer />
    </>
  )
}

export default Methodology
