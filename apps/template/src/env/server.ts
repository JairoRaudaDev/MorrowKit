import "server-only";

import { publicEnv } from "./public";
import { validateEnv } from "./validation";

const privateEnv = validateEnv("server", {
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
});

export const serverEnv = {
  ...publicEnv,
  ...privateEnv,
};
