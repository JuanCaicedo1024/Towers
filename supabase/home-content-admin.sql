-- Admin exclusivo del contenido de la portada de Towers.
-- 1. Crea primero la cuenta del propietario en Supabase > Authentication > Users
--    (o invita al usuario propietario).
-- 2. Ejecuta este archivo completo.
-- 3. Ejecuta este archivo completo para asignar al dueño configurado.

create table if not exists public.site_owners (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.site_owners enable row level security;
revoke all on public.site_owners from anon, authenticated;

create or replace function public.is_site_owner()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  select exists (select 1 from public.site_owners where user_id = auth.uid());
$$;
revoke all on function public.is_site_owner() from public;
grant execute on function public.is_site_owner() to anon, authenticated;

-- El propietario también puede administrar micro-landings; los admins de campañas
-- conservan sus permisos actuales. La política pública de campañas publicadas se mantiene.
drop policy if exists "Campaign admins can read shared campaigns" on public.campaigns;
drop policy if exists "Campaign owners can create campaigns" on public.campaigns;
drop policy if exists "Campaign admins can update shared campaigns" on public.campaigns;
drop policy if exists "Campaign admins can delete shared campaigns" on public.campaigns;
drop policy if exists "Campaign admins and site owner can read shared campaigns" on public.campaigns;
drop policy if exists "Campaign admins and site owner can create campaigns" on public.campaigns;
drop policy if exists "Campaign admins and site owner can update shared campaigns" on public.campaigns;
drop policy if exists "Campaign admins and site owner can delete shared campaigns" on public.campaigns;
create policy "Campaign admins and site owner can read shared campaigns"
  on public.campaigns for select to authenticated
  using ((select public.is_campaign_admin()) or (select public.is_site_owner()));
create policy "Campaign admins and site owner can create campaigns"
  on public.campaigns for insert to authenticated
  with check (((select public.is_campaign_admin()) or (select public.is_site_owner()))
    and owner_id = (select auth.uid()));
create policy "Campaign admins and site owner can update shared campaigns"
  on public.campaigns for update to authenticated
  using ((select public.is_campaign_admin()) or (select public.is_site_owner()))
  with check ((select public.is_campaign_admin()) or (select public.is_site_owner()));
create policy "Campaign admins and site owner can delete shared campaigns"
  on public.campaigns for delete to authenticated
  using ((select public.is_campaign_admin()) or (select public.is_site_owner()));

create table if not exists public.home_content (
  id text primary key check (id = 'home'),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.home_content (id, content) values ('home', '{}'::jsonb)
on conflict (id) do nothing;
alter table public.home_content enable row level security;
revoke all on public.home_content from anon, authenticated;
grant select on public.home_content to anon, authenticated;
grant update (content) on public.home_content to authenticated;
drop policy if exists "Public can read home content" on public.home_content;
create policy "Public can read home content" on public.home_content
  for select to anon, authenticated using (id = 'home');
drop policy if exists "Only site owner can update home content" on public.home_content;
create policy "Only site owner can update home content" on public.home_content
  for update to authenticated using ((select public.is_site_owner()))
  with check ((select public.is_site_owner()));

create or replace function public.set_home_content_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
drop trigger if exists home_content_updated_at on public.home_content;
create trigger home_content_updated_at before update on public.home_content
  for each row execute function public.set_home_content_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-content', 'site-content', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];
drop policy if exists "Public can read site content images" on storage.objects;
create policy "Public can read site content images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'site-content');
drop policy if exists "Only site owner can upload site content images" on storage.objects;
create policy "Only site owner can upload site content images" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-content' and (select public.is_site_owner()));
drop policy if exists "Only site owner can update site content images" on storage.objects;
create policy "Only site owner can update site content images" on storage.objects
  for update to authenticated using (bucket_id = 'site-content' and (select public.is_site_owner()))
  with check (bucket_id = 'site-content' and (select public.is_site_owner()));
drop policy if exists "Only site owner can delete site content images" on storage.objects;
create policy "Only site owner can delete site content images" on storage.objects
  for delete to authenticated using (bucket_id = 'site-content' and (select public.is_site_owner()));

-- Provisiona al nuevo dueño y elimina propietarios anteriores.
DO $$
DECLARE
  owner_id uuid;
BEGIN
  SELECT id INTO owner_id
  FROM auth.users
  WHERE lower(email) = 'companytowers745@gmail.com';

  IF owner_id IS NULL THEN
    RAISE EXCEPTION 'No existe en Authentication un usuario con el correo companytowers745@gmail.com';
  END IF;

  INSERT INTO public.site_owners (user_id)
  VALUES (owner_id)
  ON CONFLICT (user_id) DO NOTHING;

  DELETE FROM public.site_owners
  WHERE user_id <> owner_id;
END;
$$;
