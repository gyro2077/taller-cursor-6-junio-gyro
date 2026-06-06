-- MarketLab workshop seed markets

insert into public.markets (
  id,
  title,
  description,
  status,
  close_date
)
values
  (
    'a1000000-0000-4000-8000-000000000001',
    'Va a ganar el Aucas?',
    'gana chi o ño?',
    'open',
    '2026-12-31T23:59:59+00:00'
  ),
  (
    'a1000000-0000-4000-8000-000000000002',
    'Will it rain in Quito tomorrow?',
    'Resolves Yes if measurable rain is recorded at Mariscal Sucre Airport.',
    'open',
    '2026-06-07T23:59:59+00:00'
  ),
  (
    'a1000000-0000-4000-8000-000000000003',
    'Will Cursor ship a new feature this week?',
    'Workshop favorite. Resolves Yes if the Cursor changelog mentions a user-facing feature.',
    'open',
    null
  ),
  (
    'a1000000-0000-4000-8000-000000000004',
    'Will the workshop group finish prompt 007 before lunch?',
    'Resolves Yes if everyone in the room has auth + balance working.',
    'closed',
    '2026-06-06T18:00:00+00:00'
  )
on conflict (id) do nothing;
