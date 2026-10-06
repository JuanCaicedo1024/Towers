import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const opportunities = [
  ['01', 'Conversar', 'Participar en espacios donde el idioma puede utilizarse con otras personas.'],
  ['02', 'Practicar', 'Reforzar lo aprendido mediante nuevas situaciones de interacción.'],
  ['03', 'Conectar', 'Encontrarte con otros estudiantes que también están atravesando su proceso de aprendizaje.'],
  ['04', 'Ganar confianza', 'Tener más palabras para expresarte y participar fuera del contexto tradicional de clase.'],
]

const communityPhotos = ['Encuentro', 'Conversación', 'Actividad', 'Comunidad']
const moments = ['Comunidad 1', 'Comunidad 2', 'Comunidad 3', 'Comunidad 4']

function Placeholder({ label, className = '' }) {
  return (
    <div className={`experience-placeholder ${className}`} aria-label={label}>
      <span>{label}</span>
    </div>
  )
}

function Heading({ number, label, description }) {
  return (
    <div className="experience-section-heading">
      <span className="experience-section-number">{number}</span>
      <span>{label}</span>
      <span aria-hidden="true">—</span>
      <span>{description}</span>
    </div>
  )
}

function Community() {
  return (
    <>
      <Navbar />
      <main className="community-page">
        <section className="community-dark community-hero">
          <div className="community-container">
            <Heading number="01" label="HERO" description="experiencia Towers fuera del salón" />
            <div className="experience-split">
              <div>
                <span className="experience-eyebrow">Comunidad Towers</span>
                <h1>El idioma se practica mejor cuando también forma parte de tu vida.</h1>
                <p>
                  TOWERS cuenta con espacios de comunidad y encuentro donde los estudiantes
                  pueden compartir, conversar y seguir usando el idioma en un entorno diferente
                  al de una clase tradicional.
                </p>
                <p>
                  La idea es crear más oportunidades para interactuar, perder el miedo a
                  participar y relacionar lo aprendido con conversaciones y situaciones más naturales.
                </p>
                <p>La comunidad funciona como una extensión de la metodología de interacción: la práctica no termina cuando termina la clase.</p>
              </div>
              <Placeholder className="experience-hero-placeholder" label="Fotografía real requerida: estudiantes en actividad, encuentro o espacio social de Towers" />
            </div>
          </div>
        </section>

        <section className="community-light">
          <div className="community-container">
            <Heading number="02" label="Qué aporta la comunidad" description="4 ejes centrales" />
            <h2>Más oportunidades para usar lo que aprendes.</h2>
            <div className="community-opportunities">
              {opportunities.map(([number, title, description]) => (
                <article key={number}>
                  <strong>{number}</strong>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </article>
              ))}
            </div>
            <small className="community-note">Estos espacios pueden generar oportunidades y permitir practicar. No se garantizan resultados.</small>
          </div>
        </section>

        <section className="community-dark">
          <div className="community-container community-split">
            <div>
              <Heading number="03" label="Cómo se vive" description="experiencias para compartir" />
              <span className="experience-eyebrow">Una experiencia más allá de la clase</span>
              <h2>La comunidad se construye participando.</h2>
              <p>Los espacios de comunidad pueden incluir encuentros, conversaciones, actividades y experiencias que permitan a los estudiantes relacionarse con el idioma de una manera más orgánica y cotidiana.</p>
              <small>Imágenes de ejemplo, pendientes de ser reales.</small>
            </div>
            <div className="community-photo-grid">
              {communityPhotos.map((photo) => <div key={photo}><Placeholder label={`Foto ${photo}`} /><span>{photo}</span></div>)}
            </div>
          </div>
        </section>

        <section className="community-light">
          <div className="community-container">
            <Heading number="04" label="Conexión con la metodología" description="interacción en acción" />
            <span className="experience-eyebrow">Interacción en acción</span>
            <h2>La metodología también continúa fuera de clase.</h2>
            <p>El enfoque de TOWERS se basa en la interacción. Por eso, la comunidad no debe presentarse como un beneficio separado, sino como una extensión natural de la forma de aprender.</p>
            <div className="community-step-card">
              <span className="experience-eyebrow">La extensión del aprendizaje</span>
              {['Clase', 'Práctica', 'Comunidad', 'Nuevas situaciones de interacción'].map((step, index) => (
                <div className="experience-step" key={step}><span>0{index + 1}</span><strong>{step}</strong></div>
              ))}
              <Link className="experience-small-button" to="/metodologia">Conoce nuestra metodología</Link>
            </div>
          </div>
        </section>

        <section className="community-dark">
          <div className="community-container">
            <Heading number="05" label="Galería" description="momentos de comunidad" />
            <h2>Momentos de la comunidad.</h2>
            <div className="community-moments">
              {moments.map((moment) => <Placeholder key={moment} label={`Foto ${moment}`} />)}
            </div>
            <small>Fotografías reales requeridas de Towers.</small>
          </div>
        </section>

        <section className="community-light">
          <div className="community-container">
            <Heading number="06" label="Testimonios" description="solo contenido real" />
            <h2>Lo que viven los estudiantes.</h2>
            <div className="community-testimonials">
              {[1, 2, 3].map((item) => <article key={item}><p>Experiencia textual verificable.</p><span>Por validar: experiencia real</span></article>)}
            </div>
          </div>
        </section>

        <section className="community-dark community-final">
          <div className="community-container community-final-content">
            <Heading number="07" label="Cierre" description="el siguiente paso" />
            <span className="experience-eyebrow">Únete a la conversación</span>
            <h2>Explora una experiencia donde el idioma también forma parte de la comunidad Towers.</h2>
            <div className="experience-actions">
              <Link className="experience-button experience-button--light" to="/idiomas">Conoce nuestros programas <span aria-hidden="true">→</span></Link>
              <Link className="experience-text-link" to="/contacto">Habla con un asesor</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Community
