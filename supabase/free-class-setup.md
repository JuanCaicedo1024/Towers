# Registro de clase gratis: despliegue

## Arquitectura y datos

El formulario React llama a la Edge Function `free-class`. La función valida datos y consentimiento, registra o actualiza la solicitud en Supabase y envía una copia idempotente a Google Apps Script. Solo si Sheets confirma la escritura, crea un enlace de acceso. La clave `service_role`, el secreto compartido y las credenciales de Google solo viven en los secretos del backend/Apps Script. La clave anon de Supabase que ya usa el frontend es pública por diseño.

Ejecuta [`free-class.sql`](./free-class.sql) en Supabase **SQL Editor**. Las tablas son privadas por RLS y no tienen permisos para `anon` ni `authenticated`.

## Encabezados de Google Sheets

Crea un Google Spreadsheet y una pestaña llamada `Solicitudes`. Pon estos encabezados, en este orden, en la fila 1:

| lead_id | nombre | correo | teléfono | clase | origen | fecha_registro |
|---|---|---|---|---|---|---|

`lead_id` permite evitar duplicados. La hoja no recibe tokens ni hashes de token.

## Google Apps Script

1. En el Spreadsheet abre **Extensiones → Apps Script** y pega el código completo de [`google-apps-script.gs`](./google-apps-script.gs).
2. En **Project Settings → Script properties**, crea `SPREADSHEET_ID` con el ID del Spreadsheet (el segmento entre `/d/` y `/edit` de su URL) y `SHARED_SECRET` con un valor aleatorio de al menos 32 bytes.
3. En **Deploy → New deployment → Web app**, selecciona ejecutar como tú y acceso **Anyone**. Publica y copia la URL terminada en `/exec`. El secreto compartido valida las solicitudes entrantes; no se publica en el navegador.

## Secretos de Supabase

En el directorio raíz del proyecto, crea `.env.local` a partir de `.env.example` con la URL del proyecto y la clave anon/publishable para Vite. No uses `service_role` en variables `VITE_*`.

Configura los secretos de la Edge Function (Dashboard → Edge Functions → Secrets, o CLI):

| Variable | Valor |
|---|---|
| `GOOGLE_APPS_SCRIPT_URL` | URL `/exec` del Web App |
| `GOOGLE_APPS_SCRIPT_SECRET` | El mismo `SHARED_SECRET` de Apps Script |
| `APP_BASE_URL` | Origen público del frontend, por ejemplo `https://towers.example.com` |
| `FREE_CLASS_TOKEN_TTL_HOURS` | Opcional; entero de 1 a 72. Predeterminado: `24` |
| `FREE_CLASS_CONTENT_TEXT` | Texto de la clase que se entrega tras validar el enlace |

La plataforma provee `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` en el entorno de Edge Functions. Nunca copies la segunda en `.env.local`, Vercel como variable `VITE_*`, ni código del cliente.

Despliega desde la raíz (requiere Supabase CLI enlazada al proyecto):

```powershell
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy free-class --no-verify-jwt
supabase secrets set GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/DEPLOYMENT_ID/exec" GOOGLE_APPS_SCRIPT_SECRET="YOUR_RANDOM_SECRET" APP_BASE_URL="https://YOUR_DOMAIN" FREE_CLASS_TOKEN_TTL_HOURS="24" FREE_CLASS_CONTENT_TEXT="Pega aquí el contenido de la clase"
```

`--no-verify-jwt` es necesario porque los solicitantes no tienen una cuenta; la función sigue verificando cada operación y token. Configura también `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en el entorno de build de Vercel. No agregues los secretos del servidor a Vercel.

## Enlaces desde MicroLandings

El formulario está en `/contacto`. Para atribuir una MicroLanding, enlázalo así:

```text
/contacto?source=mi-microlanding&class=Clase%20de%20ingl%C3%A9s
```

`source` y `class` se validan y limitan en el servidor. Sin parámetros, se registra `/contacto` y la clase del idioma seleccionado.

## Ciclo y revocación del acceso

- Se genera un token aleatorio de 256 bits. Solo su SHA-256 se guarda en `free_class_tokens`; el token original solo se entrega en el enlace.
- Antes de emitirlo, Sheets debe confirmar que guardó la solicitud. Si falla Supabase o Apps Script, la función no devuelve enlace y el formulario muestra error.
- La fecha de expiración queda en la fila del token. La RPC `consume_free_class_token` hace una actualización atómica: acepta únicamente tokens no vencidos, no usados y no revocados, y marca el token como usado antes de entregar el contenido. Una segunda petición concurrente o posterior falla.
- Al volver a enviar una solicitud con el mismo correo y origen, el registro se actualiza sin duplicar la fila de Sheets y el enlace activo anterior se revoca antes de emitir otro.
- Revoca manualmente un enlace desde SQL Editor usando el identificador de la solicitud:

```sql
update public.free_class_tokens
set revoked_at = now()
where lead_id = 'UUID_DE_free_class_leads'
  and used_at is null
  and revoked_at is null;
```

El destino protegido entrega texto almacenado en el secreto `FREE_CLASS_CONTENT_TEXT`. Así no se expone una URL de video/documento reutilizable. Si la clase necesita video o archivos, deben servirse desde un proveedor con URLs firmadas de corta duración o una ruta autenticada; pegar aquí una URL pública anularía la protección del contenido.

## Verificación de despliegue

Después de configurar el proyecto real, prueba un envío con datos de control: confirma una fila única en `Solicitudes`, la fila de Supabase, la redirección a `/clase-gratis`, la recepción del contenido, el rechazo del mismo enlace al recargar y el rechazo después de su vencimiento. Prueba también una URL de Apps Script/secreto incorrectos y confirma que no se emite enlace. Este repositorio no puede verificar esas llamadas externas hasta que se desplieguen el proyecto Supabase y el Web App de Google.
