-- Atomic fake-money buy: deduct balance, update position, record ledger entry

create or replace function public.buy_shares(
  p_market_id uuid,
  p_side text,
  p_amount_cents bigint
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_market_status text;
  v_close_date timestamptz;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  if p_amount_cents is null or p_amount_cents <= 0 then
    raise exception 'Invalid amount';
  end if;

  if p_side not in ('yes', 'no') then
    raise exception 'Invalid side';
  end if;

  select status, close_date
  into v_market_status, v_close_date
  from public.markets
  where id = p_market_id;

  if not found then
    raise exception 'Market not found';
  end if;

  if v_market_status <> 'open' then
    raise exception 'Market not open';
  end if;

  if v_close_date is not null and v_close_date <= now() then
    raise exception 'Market closed';
  end if;

  update public.profiles
  set balance_cents = balance_cents - p_amount_cents
  where id = v_user_id
    and balance_cents >= p_amount_cents;

  if not found then
    raise exception 'Insufficient balance';
  end if;

  insert into public.positions (
    user_id,
    market_id,
    yes_shares_cents,
    no_shares_cents
  )
  values (
    v_user_id,
    p_market_id,
    case when p_side = 'yes' then p_amount_cents else 0 end,
    case when p_side = 'no' then p_amount_cents else 0 end
  )
  on conflict (user_id, market_id) do update
  set
    yes_shares_cents = public.positions.yes_shares_cents + excluded.yes_shares_cents,
    no_shares_cents = public.positions.no_shares_cents + excluded.no_shares_cents;

  insert into public.ledger_entries (
    user_id,
    market_id,
    amount_cents,
    entry_type,
    description
  )
  values (
    v_user_id,
    p_market_id,
    p_amount_cents,
    'trade',
    case when p_side = 'yes' then 'Buy Yes shares' else 'Buy No shares' end
  );
end;
$$;

grant execute on function public.buy_shares(uuid, text, bigint) to authenticated;
