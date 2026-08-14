import "server-only";

import { publicEnv } from "./public";
import { validateEnv } from "./validation";

const privateEnv = validateEnv("server", {
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
});

export const serverEnv = {
  ...publicEnv,
  ...privateEnv,
};
