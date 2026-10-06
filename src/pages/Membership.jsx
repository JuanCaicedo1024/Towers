import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const categories = [
  ['Bienestar', 'Beneficios relacionados con actividades y servicios orientados al bienestar.'],
  ['Gastronomía', 'Beneficios vinculados con aliados del sector gastronómico.'],
  ['Educación', 'Beneficios que complementen el desarrollo y aprendizaje del estudiante.'],
  ['Experiencias', 'Accesos y ventajas relacionadas con experiencias y actividades.'],
  ['Comunidad', 'Beneficios conectados con el ecosistema y comunidad Towers.'],
  ['Otros', 'Beneficios que no se clasifican en las categorías anteriores.'],
]

const benefitItems = [
  ['Bienestar', 'Beneficio pendiente', 'Condiciones pendientes'],
  ['Gastronomía', 'Beneficio pendiente', 'Vigencia pendiente'],
  ['Educación', 'Beneficio pendiente', 'Quién puede usarlo: información pendiente'],
]

function Placeholder({ label, className = '' }) {
  return <div className={`experience-placeholder ${className}`} aria-label={label}><span>{label}</span></div>
}

function Heading({ number, label, description }) {
  return (
    <div className="experience-section-heading membership-heading">
      <span className="experience-section-number">{number}</span>
      <span>{label}</span>
      <span aria-hidden="true">—</span>
      <span>{description}</span>
    </div>
  )
}

function Membership() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const filteredBenefits = activeCategory === 'Todos'
    ? benefitItems
    : benefitItems.filter(([category]) => category === activeCategory)

  return (
    <>
      <Navbar />
      <main className="membership-page">
        <section className="membership-dark membership-hero">
          <div className="membership-container">
            <Heading number="01" label="MEMBRESÍA" description="algo más que tu beneficio" />
            <div className="membership-hero-grid">
              <div>
                <span className="membership-eyebrow">Membresía Towers</span>
                <h1>Ser estudiante Towers puede darte más que una clase.</h1>
                <p>La experiencia Towers también contempla beneficios asociados a la membresía, relacionados con el bienestar, la gastronomía, la educación y otros espacios donde puedes ampliar tu experiencia.</p>
                <div className="membership-actions">
                  <Link className="membership-button membership-button--light" to="/contacto">Explorar beneficios <span aria-hidden="true">→</span></Link>
                  <Link className="membership-link" to="/contacto">Habla con un asesor</Link>
                </div>
              </div>
              <div className="membership-category-grid">
                {categories.slice(0, 4).map(([category]) => <span key={category}>{category}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="membership-light">
          <div className="membership-container membership-split">
            <Placeholder label="Fotografía real · experiencia de estudiante Towers" />
            <div>
              <Heading number="02" label="Qué representa la membresía" description="más allá del programa" />
              <span className="membership-eyebrow">Más allá del programa</span>
              <h2>Una experiencia pensada alrededor del estudiante.</h2>
              <p>La membresía puede funcionar como una extensión de la relación entre el estudiante y TOWERS.</p>
              <p>Además del aprendizaje del idioma, puede integrar beneficios, aliados, experiencias y oportunidades que complementen la vida del estudiante.</p>
            </div>
          </div>
        </section>

        <section className="membership-dark">
          <div className="membership-container">
            <Heading number="03" label="Categorías de beneficios" description="clasificación de beneficios" />
            <h2>Beneficios para diferentes momentos de tu día a día.</h2>
            <div className="membership-category-cards">
              {categories.map(([category, description]) => <article key={category}><h3>{category}</h3><p>{description}</p></article>)}
            </div>
            <small>Contenido sujeto a validación final de la institución.</small>
          </div>
        </section>

        <section className="membership-light">
          <div className="membership-container">
            <Heading number="04" label="Listado de beneficios" description="sistema de filtro · placeholders hasta tener aliados" />
            <h2>Descubre los beneficios disponibles.</h2>
            <p>Los aliados, condiciones y vigencias se publican cuando Towers confirme el inventario.</p>
            <div className="membership-filters">
              {['Todos', ...categories.map(([category]) => category)].map((category) => (
                <button className={activeCategory === category ? 'is-active' : ''} key={category} type="button" onClick={() => setActiveCategory(category)}>{category}</button>
              ))}
            </div>
            <div className="membership-benefit-list">
              {filteredBenefits.map(([category, benefit, conditions]) => (
                <article key={category}>
                  <div className="membership-benefit-logo">Logo</div>
                  <strong>[ALIADO PENDIENTE]</strong>
                  <span>{category}</span>
                  <p><b>Beneficio:</b> [{benefit.toUpperCase()}]<br /><b>Condiciones:</b> [{conditions.toUpperCase()}]<br /><b>Vigencia:</b> [VIGENCIA PENDIENTE]<br /><b>Quién puede usarlo:</b> [INFORMACIÓN PENDIENTE]</p>
                  <small>Por validar: contenido requerido de Towers</small>
                </article>
              ))}
            </div>
            <small>Los aliados no se han definido. Mientras se validan datos, se muestran placeholders.</small>
          </div>
        </section>

        <section className="membership-dark">
          <div className="membership-container membership-center">
            <Heading number="05" label="Por qué esto importa" description="una experiencia más completa" />
            <span className="membership-eyebrow">Una experiencia más completa</span>
            <h2>Aprender, participar y formar parte.</h2>
            <p>El valor de TOWERS no termina cuando acaba una clase. La combinación entre aprendizaje, comunidad y beneficios puede construir una experiencia más completa alrededor del estudiante.</p>
            <div className="membership-diagram"><div><span>Aprendizaje</span><b>+</b><span>Comunidad</span><b>+</b><span>Membresía</span></div><b>=</b><strong>Experiencia Towers</strong><small>Representación conceptual — aún no es una promesa absoluta.</small></div>
          </div>
        </section>

        <section className="membership-light">
          <div className="membership-container">
            <Heading number="06" label="Testimonios" description="solo contenido real" />
            <h2>Así se vive desde dentro.</h2>
            <div className="membership-testimonials">
              {[1, 2, 3].map((item) => <article key={item}><Placeholder label="Foto historia real" /><p>Historia o testimonio textual verificable.</p><small>Por validar: testimonio real</small></article>)}
            </div>
          </div>
        </section>

        <section className="membership-dark membership-final">
          <div className="membership-container membership-final-content">
            <Heading number="07" label="Cierre" description="el siguiente paso" />
            <span className="membership-eyebrow">Forma parte de la experiencia</span>
            <h2>Tu experiencia en Towers puede ir más allá de aprender un idioma.</h2>
            <p>Explora nuestros programas, conoce la comunidad y descubre cómo puede ser tu experiencia como estudiante.</p>
            <div className="membership-actions"><Link className="membership-button membership-button--light" to="/idiomas">Conoce nuestros programas <span aria-hidden="true">→</span></Link><Link className="membership-link" to="/contacto">Habla con un asesor</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Membership
