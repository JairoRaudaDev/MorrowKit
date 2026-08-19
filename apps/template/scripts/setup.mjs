import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const envFile = ".env.local";

if (!existsSync(envFile)) {
  copyFileSync(".env.example", envFile);
  console.log(`Created ${envFile} from .env.example.`);
} else {
  console.log(`${envFile} already exists; keeping it unchanged.`);
}

const packageManager = process.env.npm_config_user_agent?.split("/")[0] || "pnpm";
const command =
  process.platform === "win32" ? `${packageManager}.cmd` : packageManager;
const execArguments = packageManager === "npm" ? ["exec", "--"] : ["exec"];
const start = spawnSync(command, [...execArguments, "supabase", "start"], {
  stdio: "inherit",
});

if (start.status !== 0) {
  console.error(
    `Supabase did not start. Make sure Docker Desktop is running, then run ${packageManager} setup again.`,
  );
  process.exit(start.status ?? 1);
}

if (!existsSync(envFile)) process.exit(0);

const status = spawnSync(
  command,
  [...execArguments, "supabase", "status", "-o", "env"],
  { encoding: "utf8" },
);

if (status.status !== 0) {
  console.error(
    "Supabase started, but its local credentials could not be read.",
  );
  process.exit(status.status ?? 1);
}

const local = Object.fromEntries(
  status.stdout
    .split(/\r?\n/u)
    .map((line) => line.match(/^([A-Z_]+)="?(.*?)"?$/u))
    .filter(Boolean)
    .map((match) => [match[1], match[2]]),
);

const replacements = {
  NEXT_PUBLIC_SUPABASE_URL: local.API_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: local.ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: local.SERVICE_ROLE_KEY,
};

let environment = readFileSync(envFile, "utf8");
for (const [name, value] of Object.entries(replacements)) {
  if (!value) continue;
  environment = environment.replace(
    new RegExp(`^${name}=.*$`, "mu"),
    `${name}=${value}`,
  );
}
writeFileSync(envFile, environment);

console.log(`Local Supabase credentials are ready. Run ${packageManager} dev.`);
