-- Make Data API privileges explicit so RLS behavior does not depend on project
-- defaults. The service role is intentionally trusted and bypasses RLS.

revoke all on table public.profiles from anon, authenticated;
grant select, insert, update, delete on table public.profiles to authenticated;
grant all on table public.profiles to service_role;

revoke all on table public.billing_customers from anon, authenticated;
grant select on table public.billing_customers to authenticated;
grant all on table public.billing_customers to service_role;

revoke all on table public.subscriptions from anon, authenticated;
grant select on table public.subscriptions to authenticated;
grant all on table public.subscriptions to service_role;

revoke all on table public.stripe_webhook_events from anon, authenticated;
grant all on table public.stripe_webhook_events to service_role;

-- This trigger helper is not an application RPC.
revoke all on function public.set_updated_at() from public, anon, authenticated;
