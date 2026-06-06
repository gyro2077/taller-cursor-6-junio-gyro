-- MarketLab core schema: profiles, markets, positions, ledger_entries

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  balance_cents bigint not null,
  first_name text not null default '',
  last_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_balance_cents_non_negative check (balance_cents >= 0)
);

create table public.markets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  status text not null default 'open',
  close_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint markets_status_valid check (status in ('open', 'closed', 'resolved'))
);

create table public.positions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  market_id uuid not null references public.markets (id) on delete cascade,
  yes_shares_cents bigint not null default 0,
  no_shares_cents bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint positions_user_market_unique unique (user_id, market_id),
  constraint positions_yes_shares_non_negative check (yes_shares_cents >= 0),
  constraint positions_no_shares_non_negative check (no_shares_cents >= 0)
);

create table public.ledger_entries (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  market_id uuid references public.markets (id) on delete set null,
  amount_cents bigint not null,
  entry_type text not null,
  description text not null default '',
  created_at timestamptz not null default now(),
  constraint ledger_entries_entry_type_valid check (
    entry_type in ('starting_balance', 'trade', 'settlement', 'adjustment')
  )
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index positions_user_id_idx on public.positions (user_id);
create index positions_market_id_idx on public.positions (market_id);
create index ledger_entries_user_id_idx on public.ledger_entries (user_id);
create index ledger_entries_market_id_idx on public.ledger_entries (market_id);

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger markets_set_updated_at
before update on public.markets
for each row
execute function public.set_updated_at();

create trigger positions_set_updated_at
before update on public.positions
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Profile creation on auth signup ($100.00 fake = 10_000 cents)
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  starting_balance_cents bigint := 10000;
begin
  insert into public.profiles (
    id,
    balance_cents,
    first_name,
    last_name
  )
  values (
    new.id,
    starting_balance_cents,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', '')
  );

  insert into public.ledger_entries (
    user_id,
    market_id,
    amount_cents,
    entry_type,
    description
  )
  values (
    new.id,
    null,
    starting_balance_cents,
    'starting_balance',
    'Starting balance'
  );

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.markets enable row level security;
alter table public.positions enable row level security;
alter table public.ledger_entries enable row level security;

create policy "Markets are publicly readable"
on public.markets
for select
to anon, authenticated
using (true);

create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can read their own positions"
on public.positions
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can read their own ledger entries"
on public.ledger_entries
for select
to authenticated
using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- Grants (Data API access; writes happen server-side via RPC later)
-- ---------------------------------------------------------------------------

grant select on public.markets to anon, authenticated;
grant select on public.profiles to authenticated;
grant select on public.positions to authenticated;
grant select on public.ledger_entries to authenticated;
