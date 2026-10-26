-- Solicitudes de acceso y tokens de un solo uso para la clase gratuita.
create table if not exists public.free_class_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  phone text not null default '' check (char_length(phone) <= 30),
  class_name text not null check (char_length(class_name) between 2 and 120),
  source text not null check (char_length(source) between 1 and 200),
  goal text not null default '' check (char_length(goal) <= 100),
  registered_at timestamptz not null default now(),
  unique (email, source)
);

create table if not exists public.free_class_tokens (
  token_hash text primary key check (char_length(token_hash) = 64),
  lead_id uuid not null references public.free_class_leads(id) on delete cascade,
  expires_at timestamptz not null,
  used_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists free_class_tokens_lead_idx on public.free_class_tokens (lead_id);
alter table public.free_class_leads enable row level security;
alter table public.free_class_tokens enable row level security;
revoke all on public.free_class_leads, public.free_class_tokens from anon, authenticated;

-- Solo la Edge Function (service role) puede invocar esta operación atómica.
create or replace function public.consume_free_class_token(p_token_hash text)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  affected integer;
begin
  update public.free_class_tokens
     set used_at = now()
   where token_hash = p_token_hash
     and used_at is null
     and revoked_at is null
     and expires_at > now();
  get diagnostics affected = row_count;
  return affected = 1;
end;
$$;

revoke all on function public.consume_free_class_token(text) from public, anon, authenticated;
grant execute on function public.consume_free_class_token(text) to service_role;
