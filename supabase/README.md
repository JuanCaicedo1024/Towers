# Configuración del panel de campañas

1. Crea un proyecto en Supabase y copia la URL del proyecto y su clave pública (publishable/anon).
2. En la raíz del proyecto, crea `.env.local` y asigna `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. No uses `service_role` en el frontend.
3. En Supabase, abre **SQL Editor → New query**, pega el contenido completo de [`campaigns.sql`](./campaigns.sql) y pulsa **Run**. El script es idempotente para poder volver a ejecutarlo sin duplicar tablas, políticas ni triggers.
4. En **Authentication → Users**, crea cada cuenta administrativa. El panel no incluye registro público.
5. Autoriza cada cuenta en el SQL Editor usando el UUID que muestra Auth:

   ```sql
   insert into public.campaign_admins (user_id)
   values ('UUID_DEL_USUARIO');
   ```

6. Reinicia Vite con `npm run dev`. Inicia sesión con la cuenta creada; desde el dashboard podrás guardar borradores, editar campañas y publicarlas. Las páginas publicadas quedan disponibles en `/campaigns/<slug>`.

Las MicroLandings guardan todos sus campos editoriales en `campaigns.content` (JSONB), incluyendo detalles del curso, beneficios, resultados, metodología, módulos y preguntas frecuentes. Por eso, esta actualización no requiere una migración adicional si la tabla `campaigns` ya está instalada; el SQL completo conserva el esquema y los permisos actuales.

La tabla de administradores no es legible ni modificable desde el navegador. RLS limita los borradores al administrador propietario y permite lectura anónima solo de campañas publicadas. Las cuentas se autorizan manualmente; la aplicación no ofrece alta de usuarios.
