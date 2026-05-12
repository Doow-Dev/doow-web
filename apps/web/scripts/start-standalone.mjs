import nextEnv from "@next/env";
import { cpSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const standaloneDir = join(rootDir, ".next", "standalone");

for (const [source, destination] of [
  [join(rootDir, ".next", "static"), join(standaloneDir, ".next", "static")],
  [join(rootDir, "public"), join(standaloneDir, "public")],
]) {
  if (existsSync(source) && !existsSync(destination)) {
    cpSync(source, destination, { recursive: true });
  }
}

await import("../.next/standalone/server.js");
