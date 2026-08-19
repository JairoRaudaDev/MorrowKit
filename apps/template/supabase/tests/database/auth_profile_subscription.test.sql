begin;

create extension if not exists pgtap with schema extensions;

select plan(23);

-- Stable identities keep failures readable and make every RLS boundary explicit.
insert into auth.users (id, email)
values
  ('33333333-3333-4333-8333-333333333333', 'integration-user-a@example.test'),
  ('44444444-4444-4444-8444-444444444444', 'integration-user-b@example.test');

set local role authenticated;
set local request.jwt.claims = '{"role":"authenticated"}';

select is(
  (select count(*) from public.profiles),
  0::bigint,
  'an authenticated role without a user identity reads no profiles'
);

set local request.jwt.claims =
  '{"sub":"33333333-3333-4333-8333-333333333333","role":"authenticated"}';

select lives_ok(
  $$
    insert into public.profiles (id, display_name, avatar_url, updated_at)
    values (
      '33333333-3333-4333-8333-333333333333',
      'Integration User A',
      'https://example.test/a.png',
      '2000-01-01 00:00:00+00'
    )
  $$,
  'a user can create their own profile'
);

select results_eq(
  $$ select display_name, avatar_url from public.profiles $$,
  $$ values ('Integration User A'::text, 'https://example.test/a.png'::text) $$,
  'the newly created profile is readable by its owner'
);

select throws_ok(
  $$
    insert into public.profiles (id, display_name)
    values ('44444444-4444-4444-8444-444444444444', 'Impersonated User B')
  $$,
  '42501',
  null,
  'a user cannot create another user profile'
);

select lives_ok(
  $$
    update public.profiles
    set display_name = 'Integration User A updated', avatar_url = null
    where id = '33333333-3333-4333-8333-333333333333'
  $$,
  'a user can update their own profile'
);

select results_eq(
  $$
    select display_name, avatar_url, updated_at > '2000-01-01 00:00:00+00'
    from public.profiles
  $$,
  $$ values ('Integration User A updated'::text, null::text, true) $$,
  'profile changes persist and the update trigger advances updated_at'
);

select results_eq(
  $$
    update public.profiles
    set display_name = 'Compromised'
    where id = '44444444-4444-4444-8444-444444444444'
    returning id
  $$,
  $$ select null::uuid where false $$,
  'a profile update cannot target another user row'
);

reset role;
set local role service_role;

insert into public.billing_customers (id, user_id, stripe_customer_id)
values
  (
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    '33333333-3333-4333-8333-333333333333',
    'cus_integration_a'
  ),
  (
    'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
    '44444444-4444-4444-8444-444444444444',
    'cus_integration_b'
  );

select is(
  public.apply_stripe_subscription_event(
    'evt_subscription_initial',
    'customer.subscription.created',
    '2026-08-16 10:00:00+00',
    'sub_integration_a',
    'cus_integration_a',
    'price_pro',
    'active',
    '2026-08-16 10:00:00+00',
    '2026-09-16 10:00:00+00',
    false
  ),
  true,
  'a trusted initial Stripe event is applied'
);

select results_eq(
  $$
    select price_id, status, cancel_at_period_end
    from public.subscriptions
    where subscription_id = 'sub_integration_a'
  $$,
  $$ values ('price_pro'::text, 'active'::text, false) $$,
  'the initial subscription snapshot persists'
);

select is(
  public.apply_stripe_subscription_event(
    'evt_subscription_initial',
    'customer.subscription.updated',
    '2026-08-16 11:00:00+00',
    'sub_integration_a',
    'cus_integration_a',
    'price_tampered',
    'canceled',
    null,
    null,
    true
  ),
  false,
  'a duplicate event is ignored'
);

select is(
  (select status from public.subscriptions where subscription_id = 'sub_integration_a'),
  'active',
  'a duplicate event cannot overwrite subscription state'
);

select is(
  public.apply_stripe_subscription_event(
    'evt_subscription_stale',
    'customer.subscription.updated',
    '2026-08-16 09:00:00+00',
    'sub_integration_a',
    'cus_integration_a',
    'price_stale',
    'canceled',
    null,
    null,
    true
  ),
  true,
  'a distinct stale event is durably acknowledged'
);

select is(
  (select status from public.subscriptions where subscription_id = 'sub_integration_a'),
  'active',
  'an out-of-order event cannot regress subscription state'
);

select is(
  public.apply_stripe_subscription_event(
    'evt_subscription_newer',
    'customer.subscription.updated',
    '2026-08-16 12:00:00+00',
    'sub_integration_a',
    'cus_integration_a',
    'price_pro',
    'past_due',
    '2026-08-16 10:00:00+00',
    '2026-09-16 10:00:00+00',
    true
  ),
  true,
  'a newer event is applied'
);

select results_eq(
  $$
    select status, cancel_at_period_end, stripe_event_created_at
    from public.subscriptions
    where subscription_id = 'sub_integration_a'
  $$,
  $$ values ('past_due'::text, true, '2026-08-16 12:00:00+00'::timestamptz) $$,
  'the newest subscription state persists'
);

select is(
  (select count(*) from public.stripe_webhook_events),
  3::bigint,
  'the event ledger persists each unique delivery'
);

reset role;
set local role authenticated;
set local request.jwt.claims =
  '{"sub":"33333333-3333-4333-8333-333333333333","role":"authenticated"}';

select results_eq(
  $$ select status, cancel_at_period_end from public.subscriptions $$,
  $$ values ('past_due'::text, true) $$,
  'the owner reads their persisted subscription state'
);

set local request.jwt.claims =
  '{"sub":"44444444-4444-4444-8444-444444444444","role":"authenticated"}';

select is(
  (select count(*) from public.subscriptions),
  0::bigint,
  'another authenticated user cannot read the subscription'
);

select throws_ok(
  $$
    insert into public.subscriptions (
      subscription_id, customer_id, price_id, status
    ) values (
      'sub_forbidden',
      'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      'price_free',
      'active'
    )
  $$,
  '42501',
  null,
  'authenticated users cannot persist subscription state directly'
);

select throws_ok(
  $$
    select public.apply_stripe_subscription_event(
      'evt_forbidden',
      'customer.subscription.created',
      now(),
      'sub_forbidden',
      'cus_integration_b',
      'price_free',
      'active',
      null,
      null,
      false
    )
  $$,
  '42501',
  null,
  'authenticated users cannot invoke the trusted subscription writer'
);

reset role;
set local role anon;

select throws_ok(
  $$ select * from public.subscriptions $$,
  '42501',
  null,
  'anonymous users cannot read persisted subscription state'
);

reset role;
set local role authenticated;
set local request.jwt.claims =
  '{"sub":"33333333-3333-4333-8333-333333333333","role":"authenticated"}';

select lives_ok(
  $$
    delete from public.profiles
    where id = '33333333-3333-4333-8333-333333333333'
  $$,
  'a user can delete their own profile'
);

select is(
  (select count(*) from public.profiles),
  0::bigint,
  'the profile deletion persists for the owner'
);

select * from finish();
rollback;
