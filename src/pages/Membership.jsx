import AnimatedText from '@/components/ui/AnimatedText';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Membership() {
  return (
    <>
      <Navbar />
      <main className="membership-page">
        <section className="membership-dark membership-feature-section membership-feature-section--hero">
          <div className="membership-container">
            <div className="membership-feature membership-feature--hero">
              <div className="membership-feature__copy">
                <span className="membership-eyebrow">Membresía</span>
                <h1>
                  <AnimatedText>Ser estudiante Towers puede darte más que una clase.</AnimatedText>
                </h1>
                <p>
                  <AnimatedText>En TOWERS, el aprendizaje parte de la interacción. No se trata únicamente de estudiar estructuras o memorizar contenidos, sino de desarrollar la capacidad de comprender, comunicarte y utilizar el idioma en diferentes situaciones.</AnimatedText>
                </p>
              </div>
              <div className="membership-feature__visual membership-feature__visual--hero">
                <img
                  src="/images/TOWERS/TOWERS/fotos/DSC06700.jpg.jpeg"
                  alt="Docente y estudiantes participando en una clase de Towers"
                  fetchPriority="high"
                />
                <span aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <section className="membership-dark membership-feature-section">
          <div className="membership-container">
            <div className="membership-feature membership-feature--student">
              <div className="membership-feature__visual membership-feature__visual--student">
                <img
                  src="/images/TOWERS/TOWERS/fotos/DSC06726.jpg.jpeg"
                  alt="Estudiantes aprendiendo y compartiendo en un espacio de Towers"
                  loading="lazy"
                />
                <span aria-hidden="true" />
              </div>
              <div className="membership-feature__copy">
                <span className="membership-eyebrow">Membresía</span>
                <h2>
                  <AnimatedText>Una experiencia pensada alrededor del estudiante.</AnimatedText>
                </h2>
                <p>
                  <AnimatedText>La membresía puede funcionar como una extensión de la relación entre el estudiante y TOWERS.</AnimatedText>
                </p>
                <p>
                  <AnimatedText>Además del aprendizaje del idioma, puede integrar beneficios, aliados, experiencias y oportunidades que complementan la vida del estudiante.</AnimatedText>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Membership
