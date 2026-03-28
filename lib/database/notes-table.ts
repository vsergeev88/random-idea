import { getNeonClient } from "@/lib/database/neon";

let notesTableReady = false;

export async function ensureNotesTable() {
  if (notesTableReady) {
    return;
  }

  const sql = getNeonClient();

  await sql`
    create table if not exists notes (
      id bigint generated always as identity primary key,
      user_id text not null,
      title text not null,
      content text not null default '',
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;

  await sql`
    create index if not exists notes_user_id_created_at_idx
    on notes (user_id, created_at desc)
  `;

  notesTableReady = true;
}
