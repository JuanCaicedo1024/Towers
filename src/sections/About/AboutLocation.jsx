import { Link } from 'react-router-dom'
import { Eyebrow, Placeholder, SectionHeading } from './AboutShared'

function AboutLocation() {
  return (
    <section className="experience-dark">
      <div className="experience-container experience-split">
        <div>
          <SectionHeading number="07" label="Towers en Bogotá" description="el lugar donde todo comenzó" />
          <Eyebrow>Towers hoy</Eyebrow>
          <h2>Towers en Bogotá.</h2>
          <p><strong>Km 4.6 vía Bogotá - La Calera</strong><br />La Floresta<br />Bogotá, Colombia</p>
          <div className="experience-actions">
            <Link className="experience-button experience-button--light" to="/contacto">Hablar con un asesor</Link>
            <Link className="experience-small-button" to="/contacto">Cómo llegar</Link>
          </div>
        </div>
        <div className="about-location-images">
          <Placeholder label="Fotografía real de la sede Towers en Bogotá" />
          <Placeholder label="Mapa · ubicación de Towers" />
        </div>
      </div>
    </section>
  )
}

export default AboutLocation
