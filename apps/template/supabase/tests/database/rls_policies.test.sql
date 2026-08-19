begin;

create extension if not exists pgtap with schema extensions;

select plan(49);

-- The inventory assertion forces every new public table to receive an explicit
-- RLS audit and a corresponding update to this test suite.
select results_eq(
  $$
    select tablename
    from pg_tables
    where schemaname = 'public'
    order by tablename
  $$,
  $$
    values
      ('billing_customers'::name),
      ('profiles'::name),
      ('stripe_webhook_events'::name),
      ('subscriptions'::name)
  $$,
  'all public tables are covered by this RLS audit'
);

select ok(c.relrowsecurity, format('%I has RLS enabled', c.relname))
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relkind = 'r'
order by c.relname;

-- Anonymous clients have no table privileges at all.
select ok(
  not has_table_privilege('anon', format('public.%I', c.relname), privilege_name),
  format('anon cannot %s public.%I', privilege_name, c.relname)
)
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
cross join unnest(array['SELECT', 'INSERT', 'UPDATE', 'DELETE']) privilege_name
where n.nspname = 'public'
  and c.relkind = 'r'
order by c.relname, privilege_name;

-- Authenticated access is deliberately narrow: users manage their profile and
-- can only read their own billing snapshot. The webhook ledger is server-only.
select ok(has_table_privilege('authenticated', 'public.profiles', 'SELECT'), 'authenticated can select profiles');
select ok(has_table_privilege('authenticated', 'public.profiles', 'INSERT'), 'authenticated can insert profiles');
select ok(has_table_privilege('authenticated', 'public.profiles', 'UPDATE'), 'authenticated can update profiles');
select ok(has_table_privilege('authenticated', 'public.profiles', 'DELETE'), 'authenticated can delete profiles');
select ok(has_table_privilege('authenticated', 'public.billing_customers', 'SELECT'), 'authenticated can select billing customers');
select ok(has_table_privilege('authenticated', 'public.subscriptions', 'SELECT'), 'authenticated can select subscriptions');
select ok(not has_table_privilege('authenticated', 'public.billing_customers', 'INSERT,UPDATE,DELETE'), 'authenticated cannot mutate billing customers');
select ok(not has_table_privilege('authenticated', 'public.subscriptions', 'INSERT,UPDATE,DELETE'), 'authenticated cannot mutate subscriptions');
select ok(not has_table_privilege('authenticated', 'public.stripe_webhook_events', 'SELECT,INSERT,UPDATE,DELETE'), 'authenticated cannot access webhook events');

set local role anon;
select throws_ok($$ select * from public.profiles $$, '42501', null, 'anonymous cannot read profiles');
select throws_ok($$ select * from public.billing_customers $$, '42501', null, 'anonymous cannot read billing customers');
select throws_ok($$ select * from public.subscriptions $$, '42501', null, 'anonymous cannot read subscriptions');
select throws_ok($$ select * from public.stripe_webhook_events $$, '42501', null, 'anonymous cannot read webhook events');
reset role;

-- Fixed UUIDs make the two-user isolation scenarios easy to inspect.
insert into auth.users (id, email)
values
  ('11111111-1111-4111-8111-111111111111', 'rls-user-a@example.test'),
  ('22222222-2222-4222-8222-222222222222', 'rls-user-b@example.test');

set local role service_role;

insert into public.profiles (id, display_name)
values
  ('11111111-1111-4111-8111-111111111111', 'User A'),
  ('22222222-2222-4222-8222-222222222222', 'User B');

insert into public.billing_customers (id, user_id, stripe_customer_id)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '11111111-1111-4111-8111-111111111111', 'cus_rls_a'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '22222222-2222-4222-8222-222222222222', 'cus_rls_b');

insert into public.subscriptions (id, subscription_id, customer_id, price_id, status)
values
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa', 'sub_rls_a', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'price_a', 'active'),
  ('bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb', 'sub_rls_b', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'price_b', 'active');

insert into public.stripe_webhook_events (event_id, event_type, event_created_at)
values ('evt_rls_service', 'customer.subscription.updated', now());

select is((select count(*) from public.profiles), 2::bigint, 'service role reads every profile');
select is((select count(*) from public.billing_customers), 2::bigint, 'service role reads every billing customer');
select is((select count(*) from public.subscriptions), 2::bigint, 'service role reads every subscription');
select is((select count(*) from public.stripe_webhook_events), 1::bigint, 'service role reads the webhook ledger');

reset role;
set local role authenticated;
set local request.jwt.claims = '{"sub":"11111111-1111-4111-8111-111111111111","role":"authenticated"}';

select results_eq(
  $$ select display_name from public.profiles order by display_name $$,
  $$ values ('User A'::text) $$,
  'user A reads only their profile'
);
select results_eq(
  $$ select stripe_customer_id from public.billing_customers $$,
  $$ values ('cus_rls_a'::text) $$,
  'user A reads only their billing customer'
);
select results_eq(
  $$ select subscription_id from public.subscriptions $$,
  $$ values ('sub_rls_a'::text) $$,
  'user A reads only their subscription'
);

update public.profiles set display_name = 'User A updated'
where id = '11111111-1111-4111-8111-111111111111';
select is(
  (select display_name from public.profiles where id = '11111111-1111-4111-8111-111111111111'),
  'User A updated',
  'user A can update their profile'
);
select results_eq(
  $$ update public.profiles set display_name = 'compromised' where id = '22222222-2222-4222-8222-222222222222' returning id $$,
  $$ select null::uuid where false $$,
  'user A cannot update user B profile'
);
select results_eq(
  $$ delete from public.profiles where id = '22222222-2222-4222-8222-222222222222' returning id $$,
  $$ select null::uuid where false $$,
  'user A cannot delete user B profile'
);
select throws_ok(
  $$ insert into public.profiles (id, display_name) values ('22222222-2222-4222-8222-222222222222', 'stolen') $$,
  '42501',
  null,
  'user A cannot insert a profile for user B'
);
select throws_ok(
  $$ update public.profiles set id = '22222222-2222-4222-8222-222222222222' where id = '11111111-1111-4111-8111-111111111111' $$,
  '42501',
  null,
  'user A cannot transfer their profile to user B'
);

set local request.jwt.claims = '{"sub":"22222222-2222-4222-8222-222222222222","role":"authenticated"}';

select results_eq(
  $$ select display_name from public.profiles $$,
  $$ values ('User B'::text) $$,
  'user B reads only their profile'
);
select results_eq(
  $$ select stripe_customer_id from public.billing_customers $$,
  $$ values ('cus_rls_b'::text) $$,
  'user B reads only their billing customer'
);
select results_eq(
  $$ select subscription_id from public.subscriptions $$,
  $$ values ('sub_rls_b'::text) $$,
  'user B reads only their subscription'
);

select * from finish();
rollback;
