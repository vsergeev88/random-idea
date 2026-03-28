import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getNeonClient } from "@/lib/database/neon";
import { ensureNotesTable } from "@/lib/database/notes-table";

type CreateNoteBody = {
  title?: unknown;
  content?: unknown;
};

type NoteRow = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export async function GET() {
  const session = await auth();

  if (!session.userId) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  await ensureNotesTable();
  const sql = getNeonClient();

  const notes = (await sql`
    select id, title, content, created_at, updated_at
    from notes
    where user_id = ${session.userId}
    order by created_at desc
    limit 100
  `) as NoteRow[];

  return NextResponse.json({ ok: true, data: notes });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session.userId) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = (await request.json()) as CreateNoteBody;
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const content = typeof body.content === "string" ? body.content : "";

  if (!title) {
    return NextResponse.json(
      { ok: false, error: "Field 'title' is required" },
      { status: 400 }
    );
  }

  await ensureNotesTable();
  const sql = getNeonClient();

  const inserted = (await sql`
    insert into notes (user_id, title, content)
    values (${session.userId}, ${title}, ${content})
    returning id, title, content, created_at, updated_at
  `) as NoteRow[];

  return NextResponse.json({ ok: true, data: inserted[0] }, { status: 201 });
}
