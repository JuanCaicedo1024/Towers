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
            <div className="methodology-section-heading">
              <span className="methodology-section-number">01</span>
              <span>HERO</span>
              <span aria-hidden="true">—</span>
              <span>¿Cómo se aprende en Towers y por qué confiar?</span>
            </div>
            <div className="methodology-split">
              <div>
                <SectionLabel dark="true">Metodología Towers</SectionLabel>
                <h1>Aprender un idioma significa usarlo.</h1>
              <p>
                En TOWERS, el aprendizaje parte de la interacción. No se trata
                únicamente de estudiar estructuras o memorizar contenidos, sino de
                desarrollar la capacidad de comprender, comunicarte y utilizar el idioma
                en diferentes situaciones.
              </p>
                <div className="methodology-hero-actions">
                  <Link className="methodology-button methodology-button--light" to="/prueba-de-nivel">
                    Encuentra tu programa <span aria-hidden="true">→</span>
                  </Link>
                  <Link className="methodology-text-link" to="/prueba-de-nivel">Haz tu prueba de nivel</Link>
                </div>
              </div>
              <Placeholder className="methodology-hero-placeholder" />
            </div>
          </div>
        </section>

        <section className="methodology-light">
          <div className="methodology-container methodology-split">
            <div>
              <SectionLabel>02 · La clase Towers</SectionLabel>
              <h2>La interacción está en el centro del aprendizaje.</h2>
              <p>
                La documentación de Towers plantea un enfoque basado en la interacción
                como herramienta para aprender. Aquí no vienes solamente a recibir
                información: vienes a participar, practicar y relacionarte.
              </p>
            </div>
            <div className="methodology-card methodology-card--quote">
              <SectionLabel>Declaración de identidad</SectionLabel>
              <h3>No solo aprender sobre el idioma. Aprender a usarlo.</h3>
              {['Escuchar', 'Comprender', 'Responder', 'Interactuar'].map((item) => (
                <div className="methodology-pill" key={item}>{item}</div>
              ))}
              <small>Las cuatro habilidades forman parte de una misma experiencia.</small>
            </div>
          </div>
        </section>

        <section className="methodology-dark">
          <div className="methodology-container">
            <SectionLabel dark="true">03 · Las cuatro habilidades</SectionLabel>
            <h2>Cuatro habilidades que se conectan entre sí.</h2>
            <p>Aprender un lenguaje requiere desarrollar diferentes capacidades de forma complementaria.</p>
            <div className="methodology-skills">
              {skills.map(([number, title, description]) => (
                <article className="methodology-skill" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="methodology-light">
          <div className="methodology-container methodology-split">
            <div>
              <SectionLabel>04 · Cómo se ve una clase</SectionLabel>
              <h2>Menos observar. Más participar.</h2>
              <p>
                La clase debe permitir que el estudiante participe activamente en su
                proceso. La interacción y el acompañamiento del docente hacen parte de
                una experiencia que busca conectar el conocimiento con la vida real.
              </p>
            </div>
            <div className="methodology-card methodology-card--steps">
              <SectionLabel>La experiencia en clase</SectionLabel>
              {['Comprender', 'Participar', 'Practicar', 'Aplicar', 'Recibir acompañamiento'].map((item, index) => (
                <div className="methodology-numbered-pill" key={item}>
                  <span>0{index + 1}</span>{item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="methodology-dark">
          <div className="methodology-container">
            <SectionLabel dark="true">05 · El proceso de aprendizaje</SectionLabel>
            <h2>Un proceso que avanza de comprender a utilizar.</h2>
            <div className="methodology-process">
              {process.map(([number, title, description]) => (
                <article key={number}>
                  <strong>{number}</strong>
                  <div><span>{title}</span><p>{description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="methodology-light">
          <div className="methodology-container methodology-split methodology-split--media">
            <Placeholder />
            <div>
              <SectionLabel>06 · El contexto es importante</SectionLabel>
              <h2>El idioma cobra sentido cuando aparece fuera del ejercicio.</h2>
              <p>
                La documentación de Towers señala que el uso de situaciones de la vida
                cotidiana como punto de partida permite conectar el idioma con lo que
                necesitas hacer en el mundo real.
              </p>
              <div className="methodology-tags">
                {['Dar una opinión', 'Hacer una solicitud', 'Dar consejo', 'Contar una anécdota', 'Un contexto académico', 'Una situación profesional'].map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="methodology-light methodology-light--border">
          <div className="methodology-container">
            <SectionLabel>07 · El papel del docente</SectionLabel>
            <h2>La metodología también depende de quién guía la experiencia.</h2>
            <p>Un docente Towers orienta, acompaña y genera oportunidades para que el estudiante participe y practique.</p>
            <div className="methodology-grid methodology-grid--three">
              {teachers.map(([title, eyebrow, description]) => (
                <article className="methodology-card methodology-profile" key={title}>
                  <Placeholder />
                  <h3>{title}</h3>
                  <strong>{eyebrow}</strong>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="methodology-light">
          <div className="methodology-container">
            <SectionLabel>08 · Modalidades</SectionLabel>
            <h2>Encuentra una forma de aprender que se adapte a tu contexto.</h2>
            <p>La metodología se mantiene; cambia el lugar y la manera en que la vives.</p>
            <div className="methodology-grid methodology-grid--three">
              {modalities.map(([title, description]) => (
                <article className="methodology-card methodology-modality" key={title}>
                  <Placeholder />
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <Link to="/modalidades">Ver modalidades <span aria-hidden="true">→</span></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="methodology-dark methodology-final">
          <div className="methodology-container">
            <SectionLabel dark="true">09 · El siguiente paso</SectionLabel>
            <h2>La mejor forma de entender la metodología es vivirla.</h2>
            <p>Elige tu idioma, conoce tu nivel y empieza a usarlo desde la primera clase.</p>
            <div className="methodology-actions">
              <Link className="methodology-button methodology-button--accent" to="/prueba-de-nivel">Encuentra tu programa <span aria-hidden="true">→</span></Link>
              <Link className="methodology-button methodology-button--outline" to="/contacto">Habla con un asesor</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Methodology
