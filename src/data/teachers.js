const teachers = [
  {
    id: 'ana-garcia',
    name: 'Ana García',
    language: 'ingles',
    languageName: 'Inglés',
    photo: '/images/Sinfoto.png',
    shortDescription: 'Docente de inglés enfocada en la comunicación práctica y la confianza al hablar.',
    biography: 'Acompaña a estudiantes de distintos niveles a desarrollar sus habilidades comunicativas mediante actividades participativas y situaciones de la vida real.',
    experience: ['Enseñanza de inglés para jóvenes y adultos', 'Enfoque comunicativo y aprendizaje basado en proyectos', 'Preparación para situaciones académicas y profesionales'],
    certifications: ['Certificación de inglés C1 (placeholder)', 'Formación en enseñanza de idiomas (placeholder)'],
    location: 'Sede Medellín',
    modality: ['Presencial', 'Online'],
  },
  {
    id: 'david-torres',
    name: 'David Torres',
    language: 'aleman',
    languageName: 'Alemán',
    photo: '/images/Sinfoto.png',
    shortDescription: 'Docente de alemán que convierte la gramática en herramientas para conversar.',
    biography: 'Su metodología combina bases claras del idioma con práctica guiada, para que cada estudiante avance a su ritmo y pueda usar el alemán en contextos cotidianos.',
    experience: ['Enseñanza de alemán en niveles iniciales e intermedios', 'Práctica de conversación y pronunciación', 'Acompañamiento personalizado por objetivos'],
    certifications: ['Certificación de alemán C1 (placeholder)', 'Formación docente en lenguas extranjeras (placeholder)'],
    location: 'Sede Bogotá',
    modality: ['Online', 'Híbrida'],
  },
  {
    id: 'lucia-mendez',
    name: 'Lucía Méndez',
    language: 'portugues',
    languageName: 'Portugués',
    photo: '/images/Sinfoto.png',
    shortDescription: 'Docente de portugués con énfasis en conversación, cultura y uso cotidiano.',
    biography: 'Diseña experiencias dinámicas para acercar a sus estudiantes al portugués y a las culturas lusófonas, con práctica constante y retroalimentación cercana.',
    experience: ['Enseñanza de portugués para diferentes objetivos', 'Conversación y comprensión oral', 'Actividades de inmersión cultural'],
    certifications: ['Certificación de portugués C1 (placeholder)', 'Formación en enseñanza de portugués (placeholder)'],
    location: 'Sede Cali',
    modality: ['Presencial', 'Online', 'Híbrida'],
  },
]

export default teachers

export const getTeacherById = (id) => teachers.find((teacher) => teacher.id === id)

export const getTeachersByLanguage = (language) =>
  teachers.filter((teacher) => teacher.language === language)
