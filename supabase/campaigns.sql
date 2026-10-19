-- Ejecutar una vez en el SQL Editor del proyecto Supabase.
create table if not exists public.campaign_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.campaign_admins enable row level security;
revoke all on public.campaign_admins from anon, authenticated;

create or replace function public.is_campaign_admin()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  select exists (
    select 1 from public.campaign_admins
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_campaign_admin() from public;
grant execute on function public.is_campaign_admin() to authenticated;

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 2 and 100),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  channel text not null check (channel in ('Google Ads', 'Meta Ads', 'Facebook', 'Instagram')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists campaigns_owner_created_idx
  on public.campaigns (owner_id, created_at desc);

alter table public.campaigns enable row level security;

revoke all on public.campaigns from anon, authenticated;
grant select, insert, update, delete on public.campaigns to authenticated;
grant select (id, slug, name, channel, status, content, created_at, updated_at)
  on public.campaigns to anon;

drop policy if exists "Campaign owners can read their campaigns" on public.campaigns;
create policy "Campaign owners can read their campaigns"
  on public.campaigns for select to authenticated
  using ((select public.is_campaign_admin()) and owner_id = (select auth.uid()));

drop policy if exists "Campaign owners can create campaigns" on public.campaigns;
create policy "Campaign owners can create campaigns"
  on public.campaigns for insert to authenticated
  with check ((select public.is_campaign_admin()) and owner_id = (select auth.uid()));

drop policy if exists "Campaign owners can update their campaigns" on public.campaigns;
create policy "Campaign owners can update their campaigns"
  on public.campaigns for update to authenticated
  using ((select public.is_campaign_admin()) and owner_id = (select auth.uid()))
  with check ((select public.is_campaign_admin()) and owner_id = (select auth.uid()));

drop policy if exists "Campaign owners can delete their campaigns" on public.campaigns;
create policy "Campaign owners can delete their campaigns"
  on public.campaigns for delete to authenticated
  using ((select public.is_campaign_admin()) and owner_id = (select auth.uid()));

drop policy if exists "Public can view published campaigns" on public.campaigns;
create policy "Public can view published campaigns"
  on public.campaigns for select to anon, authenticated
  using (status = 'published');

create or replace function public.set_campaign_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists campaigns_updated_at on public.campaigns;
create trigger campaigns_updated_at
  before update on public.campaigns
  for each row execute function public.set_campaign_updated_at();
