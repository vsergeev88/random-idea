import { runMigrations } from "stripe-sync-engine";

const connectionString = process.env.DATABASE_URL ?? process.env.NEON_CONNECTION_STRING;

if (!connectionString) {
  throw new Error("DATABASE_URL or NEON_CONNECTION_STRING is not set");
}

await runMigrations({
  databaseUrl: connectionString,
  schema: "stripe",
});

console.log("Stripe migrations completed");
