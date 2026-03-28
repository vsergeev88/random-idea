import { neon } from "@neondatabase/serverless";

interface NeonHealthRow {
  database_name: string;
  now: string;
  postgres_version: string;
}

let client: ReturnType<typeof neon> | null = null;

export function getNeonClient() {
  if (client) {
    return client;
  }

  const connectionString = process.env.NEON_CONNECTION_STRING;

  if (!connectionString) {
    throw new Error("NEON_CONNECTION_STRING is not set");
  }

  client = neon(connectionString);
  return client;
}

export async function getNeonHealth() {
  const sql = getNeonClient();
  const rows = (await sql`
    select
      now()::text as now,
      current_database() as database_name,
      version() as postgres_version
  `) as NeonHealthRow[];

  return rows[0] ?? null;
}
