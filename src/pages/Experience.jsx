import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const benefits = ['Bienestar', 'Gastronomía', 'Educación', 'Experiencias', 'Comunidad', 'Otros']
const learningSteps = ['Clase', 'Práctica', 'Comunidad', 'Nuevas situaciones de interacción']
const stories = ['Historia o testimonio textual verificable.', 'Una experiencia que vale la pena compartir.', 'Lo que pasa cuando el idioma se vuelve parte de tu vida.']

function Placeholder({ className = '', label = 'Fotografía real requerida' }) {
  return (
    <div className={`experience-placeholder ${className}`} aria-label="Espacio reservado para material audiovisual">
      <span>{label}</span>
    </div>
  )
}

function SectionHeading({ number, label, description, dark = false }) {
  return (
    <div className={`experience-section-heading ${dark ? 'experience-section-heading--dark' : ''}`}>
      <span className="experience-section-number">{number}</span>
      <span>{label}</span>
      <span aria-hidden="true">—</span>
      <span>{description}</span>
    </div>
  )
}

function Eyebrow({ children }) {
  return <span className="experience-eyebrow">{children}</span>
}

function Experience() {
  return (
    <>
      <Navbar />
      <main className="experience-page">
        <section className="experience-dark experience-hero">
          <div className="experience-container">
            <SectionHeading number="01" label="HERO" description="experiencia completa del estudiante" dark />
            <div className="experience-split">
              <div>
                <Eyebrow>Experiencia Towers</Eyebrow>
                <h1>Aprender un idioma también ocurre fuera del salón de clase.</h1>
                <p>
                  En TOWERS, la experiencia del estudiante no se limita al salón de clase.
                  La comunidad, las experiencias y la interacción hacen posible que el idioma
                  también forme parte de tu vida y de tu día a día.
                </p>
                <div className="experience-actions">
                  <Link className="experience-button experience-button--light" to="/experiencia-towers/comunidad">
                    Conoce nuestra comunidad <span aria-hidden="true">→</span>
                  </Link>
                  <Link className="experience-text-link" to="/contacto">Habla con un asesor</Link>
                </div>
              </div>
              <Placeholder className="experience-hero-placeholder" label="Fotografía real requerida: estudiantes participando en actividad, encuentro o espacio social de Towers" />
            </div>
          </div>
        </section>

        <section className="experience-light">
          <div className="experience-container experience-split">
            <Placeholder label="Fotografía real · comunidad Towers · encuentro entre estudiantes" />
            <div>
              <SectionHeading number="02" label="La comunidad" description="extensión de la metodología" />
              <Eyebrow>Comunidad Towers</Eyebrow>
              <h2>El idioma se practica mejor cuando también forma parte de tu vida.</h2>
              <p>
                TOWERS cuenta con espacios de comunidad y encuentro donde los estudiantes
                pueden compartir, conversar y seguir usando el idioma en un entorno diferente
                al de una clase tradicional.
              </p>
              <p>
                La idea es crear más oportunidades para interactuar, perder el miedo a
                participar y relacionar lo aprendido con conversaciones y situaciones más naturales.
              </p>
              <Link className="experience-small-button" to="/experiencia-towers/comunidad">Conocer la comunidad</Link>
            </div>
          </div>
        </section>

        <section className="experience-dark">
          <div className="experience-container experience-split">
            <div>
              <SectionHeading number="03" label="La membresía" description="beneficios y experiencias" dark />
              <Eyebrow>Membresía Towers</Eyebrow>
              <h2>Ser estudiante Towers puede darte más que una clase.</h2>
              <p>
                La experiencia Towers también contempla beneficios asociados a la membresía:
                espacios donde la comunidad se encuentra, disfruta y forma parte de una
                experiencia más amplia de la institución.
              </p>
              <div className="experience-benefits">
                {benefits.map((benefit) => <span key={benefit}>{benefit}</span>)}
              </div>
              <Link className="experience-small-button experience-small-button--light" to="/experiencia-towers/membresia">Explorar beneficios</Link>
            </div>
            <Placeholder className="experience-membership-placeholder" label="Fotografía real · experiencia de estudiante Towers" />
          </div>
        </section>

        <section className="experience-light">
          <div className="experience-container">
            <SectionHeading number="04" label="Conexión con la metodología" description="interacción en acción" />
            <Eyebrow>Interacción en acción</Eyebrow>
            <h2>La metodología también continúa fuera de clase.</h2>
            <p>El enfoque de TOWERS se basa en la interacción. Por eso, la comunidad no debe presentarse como un beneficio separado, sino como una extensión natural de la forma de aprender.</p>
            <div className="experience-step-card">
              <Eyebrow>La extensión del aprendizaje</Eyebrow>
              {learningSteps.map((step, index) => (
                <div className="experience-step" key={step}><span>0{index + 1}</span><strong>{step}</strong></div>
              ))}
              <Link className="experience-small-button" to="/metodologia">Conoce nuestra metodología</Link>
            </div>
          </div>
        </section>

        <section className="experience-dark">
          <div className="experience-container experience-centered">
            <SectionHeading number="05" label="¿Por qué esto importa?" description="una experiencia más completa" dark />
            <Eyebrow>Una experiencia más completa</Eyebrow>
            <h2>Aprender, participar y formar parte.</h2>
            <p>El valor de TOWERS no termina cuando acaba una clase. La comunidad transforma el tiempo de aprendizaje en una experiencia más completa alrededor del estudiante.</p>
            <div className="experience-diagram">
              <div><span>Aprendizaje</span><b>+</b><span>Comunidad</span><b>+</b><span>Membresía</span></div>
              <b>=</b>
              <strong>Experiencia Towers</strong>
              <small>Representación conceptual — una experiencia completa.</small>
            </div>
          </div>
        </section>

        <section className="experience-light">
          <div className="experience-container">
            <SectionHeading number="06" label="Historias reales" description="solo contenido verificable" />
            <h2>Así se vive desde dentro.</h2>
            <div className="experience-story-grid">
              {stories.map((story) => (
                <article className="experience-story-card" key={story}>
                  <Placeholder label="Foto / historia real" />
                  <p>{story}</p>
                  <span>Por agregar testimonio verificable</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="experience-dark experience-final">
          <div className="experience-container">
            <SectionHeading number="07" label="Cierre" description="el siguiente paso" dark />
            <Eyebrow>Forma parte de la experiencia</Eyebrow>
            <h2>Tu experiencia en Towers puede ir más allá de aprender un idioma.</h2>
            <p>Explora nuestros programas, conoce la comunidad y descubre cómo puede ser tu experiencia como estudiante.</p>
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

export default Experience
