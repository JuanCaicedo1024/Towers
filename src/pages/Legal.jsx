import { Link, Navigate, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const legalPages = {
  'terminos-y-condiciones': {
    title: 'Términos y condiciones',
    summary: 'Estas condiciones regulan el uso de nuestra web, la contratación de servicios y el acceso a nuestras clases y programas.',
    sections: [
      {
        heading: '1. Información general',
        body: [
          'Towers Centro Activo de Idiomas ofrece servicios de educación, formación de idiomas y acompañamiento académico a través de su sitio web, llamadas, WhatsApp y atención presencial.',
          'Al utilizar nuestro sitio o registrarte en cualquiera de nuestros servicios, aceptas estas condiciones y nuestro tratamiento de datos conforme a la política de privacidad.',
        ],
      },
      {
        heading: '2. Uso de la web',
        body: [
          'El usuario debe proporcionar información veraz al registrarse, inscribirse o contactar con Towers.',
          'No está permitido utilizar la web con fines fraudulentos, abusivos, de spam, de suplantación o para interferir con el funcionamiento del sitio.',
        ],
      },
      {
        heading: '3. Reservas y contratación',
        body: [
          'La confirmación de una inscripción, clase o programa depende de la disponibilidad y de la aceptación de la propuesta por parte de Towers.',
          'La documentación, horarios, precios y condiciones aplicables se comunicarán antes de la contratación o la confirmación final.',
        ],
      },
      {
        heading: '4. Propiedad intelectual',
        body: [
          'Todo el contenido del sitio (textos, imágenes, marcas, diseños, videos y materiales educativos) es propiedad de Towers o cuenta con la autorización correspondiente para su uso.',
          'Queda prohibida la reproducción o difusión no autorizada de materiales de Towers.',
        ],
      },
      {
        heading: '5. Limitación de responsabilidad',
        body: [
          'Towers busca ofrecer información útil y precisa, pero no garantiza la ausencia total de errores, interrupciones o cambios en la disponibilidad de contenido o servicios.',
          'En la medida permitida por la ley, Towers no será responsable por daños indirectos derivados del uso del sitio o de los servicios ofrecidos.',
        ],
      },
    ],
  },
  'politica-de-privacidad': {
    title: 'Política de privacidad',
    summary: 'Esta política explica qué datos recogemos, para qué los usamos, en qué casos los compartimos y cómo puedes ejercer tus derechos.',
    sections: [
      {
        heading: '1. Datos que tratamos',
        body: [
          'Recopilamos datos de contacto como nombre, correo electrónico, WhatsApp, idioma de interés, objetivos y otra información necesaria para atender tu consulta o inscripción.',
          'Solo solicitamos los datos que son razonablemente necesarios para contactarte, evaluar tu interés, gestionar una reserva o atender tu solicitud.',
        ],
      },
      {
        heading: '2. Finalidad del tratamiento',
        body: [
          'Utilizamos tus datos para responder consultas, gestionar matrículas, enviar información del curso o programa, coordinar atención, comunicar actualizaciones relevantes y atender solicitudes de soporte.',
          'Cuando exista tu consentimiento explícito, también podremos usar tus datos para comunicaciones comerciales o de marketing.',
        ],
      },
      {
        heading: '3. Base legal y conservación',
        body: [
          'La base del tratamiento puede ser el consentimiento libre, informado y específico, la ejecución de un contrato, la relación jurídica previa o un interés legítimo para gestionar la relación con Towers.',
          'Conservamos tus datos solo durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos o durante el plazo legalmente exigible.',
        ],
      },
      {
        heading: '4. Derechos del usuario',
        body: [
          'Puedes solicitar acceso, corrección, eliminación, limitación del tratamiento, oposición al tratamiento y portabilidad de tus datos, según la normativa aplicable.',
          'Para ejercer tus derechos, puedes escribirnos a info@towers.edu.co indicando el derecho que deseas ejercer y la información necesaria para verificar tu identidad.',
        ],
      },
      {
        heading: '5. Transferencias y terceros',
        body: [
          'Tus datos pueden compartirse con proveedores tecnológicos o servicios de gestión de campañas y contacto que necesiten acceder a ellos para prestar servicios a Towers.',
          'No venderemos tus datos personales a terceros ni los utilizaremos para fines distintos a los descritos en esta política.',
        ],
      },
    ],
  },
  'politica-de-cookies': {
    title: 'Política de cookies',
    summary: 'Utilizamos cookies para ofrecer una mejor experiencia, mejorar la seguridad y analizar el uso del sitio. En este momento, priorizamos cookies estrictamente necesarias y, si se habilitan cookies analíticas o de marketing, se pedirá consentimiento previo.',
    sections: [
      {
        heading: '1. ¿Qué son las cookies?',
        body: [
          'Las cookies son archivos pequeños que se almacenan en tu dispositivo cuando visitas una página web para recordar preferencias, mantener la sesión o facilitar la navegación.',
        ],
      },
      {
        heading: '2. Tipos de cookies que usamos',
        body: [
          'Cookies estrictamente necesarias: permiten que la web funcione correctamente y mantengan la seguridad básica del sitio.',
          'Cookies de análisis o marketing: solo se usarán si se activa su uso y se obtiene tu consentimiento. En caso de implementarse, se ofrecerán opciones de aceptación, rechazo o configuración.',
        ],
      },
      {
        heading: '3. Consentimiento',
        body: [
          'Las cookies estrictamente necesarias no requieren consentimiento según su finalidad esencial, pero las cookies de análisis, personalización o marketing sí requieren un consentimiento informado y revocable antes de su activación.',
          'Puedes gestionar tus preferencias desde el banner de cookies o desde la configuración de tu navegador.',
        ],
      },
      {
        heading: '4. Cómo gestionar tus preferencias',
        body: [
          'Si visitas la web, recibirás un aviso de cookies cuando sea necesario. Además, puedes eliminar cookies desde la configuración de tu navegador en cualquier momento.',
          'En caso de dudas, puedes escribirnos a info@towers.edu.co.',
        ],
      },
    ],
  },
  'politica-de-reembolsos': {
    title: 'Política de reembolsos',
    summary: 'Nuestra política de reembolsos busca ser clara, transparente y proporcional a la naturaleza de cada servicio.',
    sections: [
      {
        heading: '1. Responsabilidad de la cancelación',
        body: [
          'Los pagos por inscripción, cursos o servicios pueden ser reembolsados según las condiciones específicas de la contratación, la fecha de solicitud y la política del programa.',
          'En general, se reconsiderará un reembolso cuando haya un error de Towers, una cancelación por parte del centro o una causa justificada por la normativa aplicable.',
        ],
      },
      {
        heading: '2. Programas y clases',
        body: [
          'Si un cliente cancela antes de iniciar el programa, se revisará la normativa aplicable y cualquier comprobante de pago para evaluar el caso.',
          'Las clases ya impartidas o los servicios prestados no siempre serán objeto de reembolso, según la modalidad contratada y la política del programa.',
        ],
      },
      {
        heading: '3. Formación corporativa',
        body: [
          'En contratación de programas para empresas, los reembolsos se sujetarán a lo confirmando en la propuesta, contrato o acuerdo comercial firmado con Towers.',
          'Cualquier devolución supone la revisión del importe y las condiciones pactadas previamente.',
        ],
      },
      {
        heading: '4. Atención a solicitudes',
        body: [
          'Si necesitas solicitar un reembolso o discutir una situación específica, escríbenos a info@towers.edu.co o habla con nuestro equipo académico por WhatsApp para revisar tu caso.',
        ],
      },
    ],
  },
  'derechos-de-imagen': {
    title: 'Derechos de imagen',
    summary: 'Towers solo utiliza imágenes y materiales audiovisuales cuando cuenta con derecho para publicarlos, o cuando la imagen proviene de la propia institución, del propio participante o de materiales de uso autorizado.',
    sections: [
      {
        heading: '1. Criterio general',
        body: [
          'Antes de publicar fotografías, videos o testimonios, revisamos que existan bases legales, consentimiento o documentación que autorice su uso.',
          'Si una imagen incluye a personas, se deben verificar las condiciones de uso y, cuando corresponda, solicitar autorización expresa antes de su publicación.',
        ],
      },
      {
        heading: '2. Fuentes permitidas',
        body: [
          'Usamos materiales propios de Towers, imágenes generadas para la marca o fotografías tomadas con el debido consentimiento cuando se requiere la participación de personas.',
          'No utilizamos materiales de terceros sin verificar su titularidad, licencias o permisos de uso.',
        ],
      },
      {
        heading: '3. Solicitudes de uso',
        body: [
          'Si eres titular de una imagen o material audiovisual y consideras que se ha publicado sin tu consentimiento, puedes comunicarlo a info@towers.edu.co para revisión y, si procede, eliminación o corrección.',
        ],
      },
    ],
  },
  'cumplimiento-legal': {
    title: 'Cumplimiento legal local',
    summary: 'Nuestra web y procesos se diseñan para ajustar su funcionamiento a la normativa aplicable en Colombia y a los requisitos de protección de datos y comercio digital relevantes para Towers.',
    sections: [
      {
        heading: '1. Protección de datos',
        body: [
          'Aplicamos principios de minimización, finalidad, seguridad y transparencia en el tratamiento de datos personales.',
          'La información que se solicita se limita a lo necesario para la operación de los servicios y la atención de cada solicitud.',
        ],
      },
      {
        heading: '2. Consentimiento y trazabilidad',
        body: [
          'Los formularios de la página incluyen casillas separadas para aceptar términos y privacidad, con registro de fecha y forma de aceptación en cada solicitud.',
          'Cuando se utilicen cookies no esenciales, deberán estar sujetas a consentimiento previo y a una opción de rechazo o configuración.',
        ],
      },
      {
        heading: '3. Revisión periódica',
        body: [
          'Revisamos periódicamente nuestra forma de operar para mantener la adecuación a la normativa vigente, así como a la práctica recomendada en protección de datos y comercio electrónico.',
          'Esta política no sustituye el asesoramiento legal específico de un profesional competente para cada caso o jurisdicción.',
        ],
      },
    ],
  },
}

const legalOrder = [
  'terminos-y-condiciones',
  'politica-de-privacidad',
  'politica-de-cookies',
  'politica-de-reembolsos',
  'derechos-de-imagen',
  'cumplimiento-legal',
]

function LegalPage() {
  const location = useLocation()
  const slug = location.pathname.replace(/^\//, '') || 'terminos-y-condiciones'
  const page = legalPages[slug]

  if (!page) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#f8fafc] px-[6%] py-12 text-[#111827] sm:py-16">
        <div className="mx-auto max-w-5xl">
          <nav className="mb-8 flex flex-wrap gap-2 text-sm text-[#4b5563]" aria-label="Políticas legales">
            {legalOrder.map((key) => (
              <Link
                key={key}
                className={`rounded-full border px-3 py-1.5 transition hover:border-[#e83e33] hover:text-[#e83e33] ${slug === key ? 'border-[#e83e33] bg-[#fff5f5] text-[#e83e33]' : 'border-[#dfe4ea] bg-white'}`}
                to={`/${key}`}
              >
                {legalPages[key].title}
              </Link>
            ))}
          </nav>

          <article className="rounded-[2rem] border border-[#e7e9ed] bg-white p-6 shadow-[0_12px_26px_rgb(15_23_42_/_06%)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e83e33]">Towers</p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.05em] sm:text-5xl">{page.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#4b5563]">{page.summary}</p>

            <div className="mt-8 space-y-8">
              {page.sections.map(({ heading, body }) => (
                <section key={heading} className="border-t border-[#eef2f6] pt-6 first:border-t-0 first:pt-0">
                  <h2 className="text-xl font-semibold text-[#111827] sm:text-2xl">{heading}</h2>
                  <div className="mt-3 space-y-3 text-base leading-7 text-[#374151]">
                    {body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-[#fff8f5] p-5 text-sm leading-6 text-[#374151]">
              <strong className="block text-[#111827]">Contacto</strong>
              Si tienes dudas relacionadas con estas políticas, escríbenos a <a className="font-semibold text-[#e83e33] underline underline-offset-4" href="mailto:info@towers.edu.co">info@towers.edu.co</a> o contáctanos por WhatsApp para atender tu caso.
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default LegalPage
