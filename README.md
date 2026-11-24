# Guía de medidas para imágenes

Referencia para preparar o actualizar las imágenes del sitio Towers. Las medidas indicadas son del **contenedor en pantalla en píxeles CSS**, no necesariamente del archivo fuente. En los diseños responsivos el ancho final depende de la ventana y de la columna.

## Fotografías e imágenes principales

| Uso / archivo | Contenedor actual | Ajuste y recomendaciones |
| --- | --- | --- |
| Hero de inicio — imagen seleccionada en Portada principal | El archivo actual mide **768 × 935 px** (proporción **0,82:1**, vertical). En pantalla: hasta 500 px de ancho; en escritorio, alto de hasta aprox. 662 px. | Para reemplazarla, conservar una proporción cercana a **0,82:1**; recomendado **1000 × 1218 px** o mayor. `object-contain`: no se recorta. |
| Micro-landing — fotografía principal | Archivo recomendado por el editor: **1200 × 800 px** (proporción **3:2**). Contenedor en pantalla: hasta 590 px de ancho, también 3:2. | Usar horizontal 3:2; la imagen se muestra completa (`object-contain`), sin recorte. |
| Micro-landing — video principal | Marco en pantalla: hasta 590 px de ancho, proporción **16:9**. | Pegar un enlace de YouTube; no se carga un archivo de imagen para esta opción. |
| Encabezado de Idiomas — `/images/languages/hero.webp` | Columna derecha de una sección de hasta 1280 px; su ancho es aproximadamente 1,08 veces la columna de texto. | Alto automático según la proporción del archivo; no se recorta. |
| Encabezado de programa — `/images/languages/programs/*.webp` | Mismo diseño y tamaño que el encabezado de Idiomas. | Alto automático; no se recorta. |
| Encabezado de Modalidades — `/images/modalities/hero.webp` | Alto mínimo de 280 px en móvil y 440 px en escritorio; ancho variable, aproximadamente media sección. | `object-cover`: preparar el foco cerca del centro; se recortan los bordes según la pantalla. |
| Encabezado de Empresas — `/images/enterprise/hero.webp` | Proporción **1,25:1**; ancho máximo 590 px (a ese ancho, aprox. 472 px de alto). | `object-cover`, recorte centrado. |
| Modalidades de estudio — `/images/modalities/in-person.webp`, `online.webp`, `hybrid.webp` | Franja de **180 px de alto**; el ancho se ajusta a la tarjeta. | `object-cover`; evitar poner información importante cerca de los bordes. |
| Tarjetas de docentes — fotos de `/images/teachers/` | Ancho de la tarjeta × **230 px de alto**. | `object-cover`; dejar el rostro dentro del área central. |
| Acerca de Towers — fotos de `/images/classroom/` en los bloques principales | Alto mínimo de **480 px**; ancho variable según la columna. | `object-cover`; elegir una foto que tolere recorte vertical y horizontal. |
| Experiencia y membresía — fotos destacadas | Escritorio: proporción **1,45:1** (experiencia) o **1,48:1** (membresía). Móvil: **1,6:1** en experiencia. | `object-cover`; considerar el encuadre móvil. |
| Comunidad — imagen principal | Escritorio: **1,48:1**; móvil: **1,4:1**. | `object-cover`. |
| Comunidad — cuadrícula de fotos | Escritorio: **1,12:1**; móvil: **0,95:1** (ligeramente vertical). | `object-cover`. |
| Comunidad — foto destacada de momentos | Escritorio: **2,15:1**; móvil: **1,5:1**. | `object-cover`; mantener el sujeto principal centrado. |
| Comunidad — fotos pequeñas de momentos | **1,16:1**. | `object-cover`. |
| Metodología — video/imagen panorámica | Escritorio: **2,2:1**; móvil: **1,45:1**. | `object-cover`; el centro del encuadre es la zona más segura. |
| Clase introductoria — `/images/free-class/introductory-class.webp` | Proporción **1,25:1** (5:4); en móvil puede limitarse a 520 px de ancho. | `object-cover`. |
| Clase gratuita — imagen de video | Escritorio: **2,2:1**; móvil: **1,35:1**. | `object-cover`; encuadrar al sujeto hacia el centro. |
| Logos de aliados — `/images/partners/` y logos en la raíz de `images` | Área estándar del logo: **180 × 48 px**. Cada espacio del carrusel mide al menos **190 × 88 px**. El logo CENS usa **72 × 72 px**. | `object-contain`; entregar el logo completo, preferiblemente con fondo transparente. |
| Logos de idiomas — `/images/languages/flags/` | Hasta **80 × 80 px** en tarjetas del carrusel; aparecen dentro de un círculo. En tarjetas de inicio: hasta 160 px de ancho dentro de un área de 185 px de alto. | `object-contain`; no recortar la bandera. |

## Recomendaciones de entrega

- Entregar las fotografías en **WebP** y los logos con transparencia en **SVG** o PNG.
- Para fotografías con `object-cover`, conservar margen alrededor del sujeto: el recorte cambia entre escritorio y móvil. No ubicar rostros, texto ni elementos esenciales pegados a los bordes.
- Para imágenes con `object-contain` y logos, mantener el arte completo y el fondo transparente cuando aplique.
- Las medidas de esta guía describen el renderizado actual. En contenedores de ancho variable, la proporción y el recorte importan más que fijar un ancho de archivo único.
- Si se requiere texto dentro de una imagen, confirmar el diseño antes de incorporarlo: varias secciones ya superponen títulos y degradados sobre la fotografía.
