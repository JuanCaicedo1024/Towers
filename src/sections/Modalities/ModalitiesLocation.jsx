import { ModalitiesHeading, ModalitiesPlaceholder } from './ModalitiesShared'

function ModalitiesLocation() {
  return <section className="modalities-light"><div className="modalities-container experience-split"><div><ModalitiesHeading number="04" label="Sede" description="dirección confirmada" /><h2>Nuestra sede</h2><p><strong>TOWERS Cúcuta</strong><br />Av. 0 #16-90<br />La Playa<br />Cúcuta, Norte de Santander, Colombia</p><small className="modalities-validation">Por validar: disponibilidad de horarios</small></div><ModalitiesPlaceholder label="Placeholder mapa · ubicación sede" /></div></section>
}

export default ModalitiesLocation
