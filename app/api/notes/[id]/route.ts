import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getNeonClient } from "@/lib/database/neon";
import { ensureNotesTable } from "@/lib/database/notes-table";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

interface UpdateNoteBody {
  content?: unknown;
  title?: unknown;
}

interface NoteRow {
  content: string;
  created_at: string;
  id: number;
  title: string;
  updated_at: string;
}

function parseId(id: string) {
  const value = Number(id);

  if (!Number.isInteger(value) || value <= 0) {
    return null;
  }

  return value;
}

export async function GET(_: Request, context: RouteContext) {
  const session = await auth();

  if (!session.userId) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const noteId = parseId(id);

  if (!noteId) {
    return NextResponse.json(
      { ok: false, error: "Invalid id" },
      { status: 400 }
    );
  }

  await ensureNotesTable();
  const sql = getNeonClient();

  const rows = (await sql`
    select id, title, content, created_at, updated_at
    from notes
    where id = ${noteId} and user_id = ${session.userId}
    limit 1
  `) as NoteRow[];

  const note = rows[0];

  if (!note) {
    return NextResponse.json(
      { ok: false, error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, data: note });
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await auth();

  if (!session.userId) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const noteId = parseId(id);

  if (!noteId) {
    return NextResponse.json(
      { ok: false, error: "Invalid id" },
      { status: 400 }
    );
  }

  const body = (await request.json()) as UpdateNoteBody;
  const title = typeof body.title === "string" ? body.title.trim() : null;
  const content = typeof body.content === "string" ? body.content : null;

  if (title === null && content === null) {
    return NextResponse.json(
      { ok: false, error: "At least one of 'title' or 'content' is required" },
      { status: 400 }
    );
  }

  await ensureNotesTable();
  const sql = getNeonClient();

  const updated = (await sql`
    update notes
    set
      title = coalesce(${title}, title),
      content = coalesce(${content}, content),
      updated_at = now()
    where id = ${noteId} and user_id = ${session.userId}
    returning id, title, content, created_at, updated_at
  `) as NoteRow[];

  const note = updated[0];

  if (!note) {
    return NextResponse.json(
      { ok: false, error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, data: note });
}

export async function DELETE(_: Request, context: RouteContext) {
  const session = await auth();

  if (!session.userId) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const noteId = parseId(id);

  if (!noteId) {
    return NextResponse.json(
      { ok: false, error: "Invalid id" },
      { status: 400 }
    );
  }

  await ensureNotesTable();
  const sql = getNeonClient();

  const deleted = (await sql`
    delete from notes
    where id = ${noteId} and user_id = ${session.userId}
    returning id
  `) as Array<{ id: number }>;

  if (!deleted[0]) {
    return NextResponse.json(
      { ok: false, error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true });
}
