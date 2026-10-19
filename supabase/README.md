# Configuración del panel de campañas

1. Crea un proyecto en Supabase y copia la URL del proyecto y su clave pública (publishable/anon).
2. En la raíz del proyecto, copia `.env.example` a `.env.local` y asigna `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. No uses `service_role` en el frontend.
3. Ejecuta `supabase/campaigns.sql` una vez desde el SQL Editor de Supabase.
4. En **Authentication → Users**, crea cada cuenta administrativa. El panel no incluye registro público.
5. Autoriza cada cuenta en el SQL Editor usando el UUID que muestra Auth:

   ```sql
   insert into public.campaign_admins (user_id)
   values ('UUID_DEL_USUARIO');
   ```

6. Reinicia Vite con `npm run dev`. Inicia sesión con la cuenta creada; desde el dashboard podrás guardar borradores, editar campañas y publicarlas. Las páginas publicadas quedan disponibles en `/campaigns/<slug>`.

La tabla de administradores no es legible ni modificable desde el navegador. RLS limita los borradores al administrador propietario y permite lectura anónima solo de campañas publicadas. Las cuentas se autorizan manualmente; la aplicación no ofrece alta de usuarios.
