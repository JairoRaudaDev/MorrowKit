create table public.stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  event_created_at timestamptz not null,
  processed_at timestamptz not null default now(),
  constraint stripe_webhook_events_event_id_not_empty
    check (length(btrim(event_id)) > 0),
  constraint stripe_webhook_events_event_type_not_empty
    check (length(btrim(event_type)) > 0)
);

comment on table public.stripe_webhook_events is
  'Durable Stripe event ledger. The primary key makes webhook delivery idempotent.';

alter table public.stripe_webhook_events enable row level security;
revoke all on table public.stripe_webhook_events from anon, authenticated;

create or replace function public.apply_stripe_subscription_event(
  p_event_id text,
  p_event_type text,
  p_event_created_at timestamptz,
  p_subscription_id text,
  p_stripe_customer_id text,
  p_price_id text,
  p_status text,
  p_current_period_start timestamptz,
  p_current_period_end timestamptz,
  p_cancel_at_period_end boolean
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_customer_id uuid;
begin
  insert into public.stripe_webhook_events (
    event_id,
    event_type,
    event_created_at
  ) values (
    p_event_id,
    p_event_type,
    p_event_created_at
  )
  on conflict (event_id) do nothing;

  if not found then
    return false;
  end if;

  select id
  into v_customer_id
  from public.billing_customers
  where stripe_customer_id = p_stripe_customer_id;

  if v_customer_id is null then
    raise exception 'No billing customer for Stripe customer %', p_stripe_customer_id;
  end if;

  insert into public.subscriptions (
    subscription_id,
    customer_id,
    price_id,
    status,
    current_period_start,
    current_period_end,
    cancel_at_period_end,
    stripe_event_created_at
  ) values (
    p_subscription_id,
    v_customer_id,
    p_price_id,
    p_status,
    p_current_period_start,
    p_current_period_end,
    p_cancel_at_period_end,
    p_event_created_at
  )
  on conflict (subscription_id) do update
  set customer_id = excluded.customer_id,
      price_id = excluded.price_id,
      status = excluded.status,
      current_period_start = excluded.current_period_start,
      current_period_end = excluded.current_period_end,
      cancel_at_period_end = excluded.cancel_at_period_end,
      stripe_event_created_at = excluded.stripe_event_created_at
  where public.subscriptions.stripe_event_created_at is null
     or public.subscriptions.stripe_event_created_at <= excluded.stripe_event_created_at;

  return true;
end;
$$;

revoke all on function public.apply_stripe_subscription_event(
  text, text, timestamptz, text, text, text, text,
  timestamptz, timestamptz, boolean
) from public, anon, authenticated;
grant execute on function public.apply_stripe_subscription_event(
  text, text, timestamptz, text, text, text, text,
  timestamptz, timestamptz, boolean
) to service_role;
