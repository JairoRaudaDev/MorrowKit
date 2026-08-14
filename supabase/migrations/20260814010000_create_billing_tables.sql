create table public.billing_customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  stripe_customer_id text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint billing_customers_user_id_key unique (user_id),
  constraint billing_customers_stripe_customer_id_key unique (stripe_customer_id),
  constraint billing_customers_stripe_customer_id_not_empty
    check (length(btrim(stripe_customer_id)) > 0)
);

comment on table public.billing_customers is
  'Maps an application user to a Stripe customer. Written by trusted server and webhook code.';

comment on column public.billing_customers.stripe_customer_id is
  'Stripe customer ID (cus_*); unique locally so webhook upserts are idempotent.';

create trigger billing_customers_set_updated_at
before update on public.billing_customers
for each row
execute function public.set_updated_at();

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  subscription_id text not null,
  customer_id uuid not null references public.billing_customers (id) on delete cascade,
  price_id text not null,
  status text not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  stripe_event_created_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subscriptions_subscription_id_key unique (subscription_id),
  constraint subscriptions_subscription_id_not_empty
    check (length(btrim(subscription_id)) > 0),
  constraint subscriptions_price_id_not_empty
    check (length(btrim(price_id)) > 0),
  constraint subscriptions_status_not_empty
    check (length(btrim(status)) > 0),
  constraint subscriptions_period_order
    check (
      current_period_start is null
      or current_period_end is null
      or current_period_end >= current_period_start
    )
);

comment on table public.subscriptions is
  'Local Stripe subscription snapshot for webhook synchronization and entitlement checks.';

comment on column public.subscriptions.subscription_id is
  'Stripe subscription ID (sub_*); use as the webhook upsert conflict target.';

comment on column public.subscriptions.stripe_event_created_at is
  'Creation time of the last applied Stripe event; webhook handlers can reject older out-of-order events.';

create index subscriptions_customer_id_idx
on public.subscriptions (customer_id);

create index subscriptions_entitlement_lookup_idx
on public.subscriptions (customer_id, status, current_period_end);

create trigger subscriptions_set_updated_at
before update on public.subscriptions
for each row
execute function public.set_updated_at();

alter table public.billing_customers enable row level security;
alter table public.subscriptions enable row level security;

create policy "Users can view their own billing customer"
on public.billing_customers
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can view their own subscriptions"
on public.subscriptions
for select
to authenticated
using (
  exists (
    select 1
    from public.billing_customers
    where billing_customers.id = subscriptions.customer_id
      and billing_customers.user_id = (select auth.uid())
  )
);

revoke all on table public.billing_customers from anon;
revoke all on table public.subscriptions from anon;
revoke insert, update, delete, truncate, references, trigger
  on table public.billing_customers from authenticated;
revoke insert, update, delete, truncate, references, trigger
  on table public.subscriptions from authenticated;
grant select on table public.billing_customers to authenticated;
grant select on table public.subscriptions to authenticated;
