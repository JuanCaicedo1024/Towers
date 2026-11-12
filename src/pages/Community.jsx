import AnimatedText from '@/components/ui/AnimatedText';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const communityPhotos = [
  ['DSC06718.webp', 'Estudiantes participando en una clase de inglés'],
  ['DSC06720.webp', 'Estudiantes compartiendo una actividad de aprendizaje'],
  ['DSC06733.webp', 'Grupo practicando inglés en el aula'],
  ['DSC06802.webp', 'Estudiantes conversando durante la clase'],
]

const communityMoments = [
  ['DSC06667.webp', 'Estudiantes practicando juntos en el aula'],
  ['DSC06683.webp', 'Grupo de estudiantes compartiendo una clase'],
  ['DSC06726.webp', 'Estudiantes participando en una actividad'],
  ['DSC06730.webp', 'Estudiante compartiendo un momento de aprendizaje'],
]

function Community() {
  return (
    <>
      <Navbar />
      <main className="community-page">
        <section className="community-dark community-hero">
          <div className="community-container">
            <div className="experience-split community-hero__split">
              <div className="community-hero__copy">
                <span className="experience-eyebrow">Comunidad</span>
                <h1><AnimatedText>Aprender un idioma significa usarlo.</AnimatedText></h1>
                <p>
                  <AnimatedText>En TOWERS, el aprendizaje parte de la interacción. No se trata únicamente de estudiar estructuras o memorizar contenidos, sino de desarrollar la capacidad de comprender, comunicarte y utilizar el idioma en diferentes situaciones.</AnimatedText>
                </p>
              </div>
              <div className="community-hero__image">
                <img
                  src="/images/classroom/DSC06803.webp"
                  alt="Docente y estudiantes participando en una clase de Towers"
                  fetchPriority="high"
                />
                <span aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <section className="community-dark community-gallery">
          <div className="community-container community-split">
            <div className="community-gallery__copy">
              <span className="experience-eyebrow">Comunidad</span>
              <h2><AnimatedText>La comunidad se construye participando.</AnimatedText></h2>
              <p>
                <AnimatedText>Los espacios de comunidad pueden incluir encuentros, conversaciones, actividades y experiencias que permitan a los estudiantes relacionarse con el idioma de una manera más orgánica y cotidiana.</AnimatedText>
              </p>
            </div>
            <div className="community-photo-grid" aria-label="Momentos de la comunidad Towers">
              {communityPhotos.map(([image, alt], index) => (
                <div className="community-photo-grid__item" key={image} style={{ '--photo-index': index }}>
                  <img
                    src={`/images/classroom/${image}`}
                    alt={alt}
                    loading="lazy"
                  />
                  <span aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="community-light community-moments" aria-labelledby="community-moments-title">
          <div className="community-container">
            <h2 id="community-moments-title" className="community-moments__title">
              <AnimatedText>Momentos de la comunidad.</AnimatedText>
            </h2>
            <div className="community-moments__featured">
              <img
                src="/images/classroom/DSC06700.webp"
                alt="Docente y estudiantes compartiendo una clase de inglés"
                loading="lazy"
              />
              <span aria-hidden="true" />
            </div>
            <div className="community-moments__grid" aria-label="Más momentos de la comunidad Towers">
              {communityMoments.map(([image, alt], index) => (
                <div className="community-moments__photo" key={image} style={{ '--moment-index': index }}>
                  <img src={`/images/classroom/${image}`} alt={alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default Community
