"use client";

import { useEffect, useMemo, useState } from "react";

interface Note {
  content: string;
  created_at: string;
  id: number | string;
  title: string;
  updated_at: string;
}

interface NotesResponse {
  data?: Note[];
  error?: string;
  ok: boolean;
}

interface NoteResponse {
  data?: Note;
  error?: string;
  ok: boolean;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("ru-RU");
}

export function NotesCrud() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const canCreate = useMemo(
    () => title.trim().length > 0 && !creating,
    [title, creating]
  );

  async function loadNotes() {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/notes", {
      method: "GET",
      cache: "no-store",
    });
    const payload = (await response.json()) as NotesResponse;

    if (!(response.ok && payload.ok && payload.data)) {
      setError(payload.error ?? "Не удалось загрузить заметки");
      setLoading(false);
      return;
    }

    setNotes(payload.data);
    setLoading(false);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function createNote() {
    if (!canCreate) {
      return;
    }

    setCreating(true);
    setError(null);

    const response = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    const payload = (await response.json()) as NoteResponse;

    if (!(response.ok && payload.ok && payload.data)) {
      setError(payload.error ?? "Не удалось создать заметку");
      setCreating(false);
      return;
    }

    setNotes((prev) => [payload.data as Note, ...prev]);
    setTitle("");
    setContent("");
    setCreating(false);
  }

  function startEdit(note: Note) {
    setEditingId(String(note.id));
    setEditTitle(note.title);
    setEditContent(note.content);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  }

  async function saveEdit(noteId: string) {
    setSaving(true);
    setError(null);

    const response = await fetch(`/api/notes/${noteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });

    const payload = (await response.json()) as NoteResponse;

    if (!(response.ok && payload.ok && payload.data)) {
      setError(payload.error ?? "Не удалось обновить заметку");
      setSaving(false);
      return;
    }

    setNotes((prev) =>
      prev.map((note) =>
        String(note.id) === noteId ? (payload.data as Note) : note
      )
    );
    cancelEdit();
    setSaving(false);
  }

  async function removeNote(noteId: string) {
    setDeletingId(noteId);
    setError(null);

    const response = await fetch(`/api/notes/${noteId}`, { method: "DELETE" });
    const payload = (await response.json()) as { ok: boolean; error?: string };

    if (!(response.ok && payload.ok)) {
      setError(payload.error ?? "Не удалось удалить заметку");
      setDeletingId(null);
      return;
    }

    setNotes((prev) => prev.filter((note) => String(note.id) !== noteId));
    setDeletingId(null);
  }

  return (
    <section className="mt-6 rounded-lg border border-[#EDEDED] bg-white p-6">
      <h2 className="font-semibold text-base">Neon Notes CRUD</h2>
      <p className="mt-1 text-[#7D7D7E] text-sm">
        Тестовый UI для API: /api/notes
      </p>

      <div className="mt-4 grid gap-3">
        <input
          className="h-10 rounded-md border border-[#E5E5E7] px-3 text-sm outline-none focus:border-black"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Заголовок"
          value={title}
        />
        <textarea
          className="min-h-24 rounded-md border border-[#E5E5E7] px-3 py-2 text-sm outline-none focus:border-black"
          onChange={(event) => setContent(event.target.value)}
          placeholder="Текст заметки"
          value={content}
        />
        <div className="flex items-center gap-2">
          <button
            className="h-9 rounded-md bg-black px-4 font-medium text-sm text-white disabled:opacity-50"
            disabled={!canCreate}
            onClick={createNote}
            type="button"
          >
            {creating ? "Создание..." : "Создать заметку"}
          </button>
          <button
            className="h-9 rounded-md border border-[#E5E5E7] px-4 font-medium text-sm"
            disabled={loading}
            onClick={loadNotes}
            type="button"
          >
            Обновить список
          </button>
        </div>
      </div>

      {error ? <p className="mt-4 text-red-600 text-sm">{error}</p> : null}

      <div className="mt-5 space-y-3">
        {loading ? <p className="text-[#7D7D7E] text-sm">Загрузка...</p> : null}
        {!loading && notes.length === 0 ? (
          <p className="text-[#7D7D7E] text-sm">Пока нет заметок</p>
        ) : null}

        {notes.map((note) => {
          const noteId = String(note.id);
          const isEditing = editingId === noteId;
          const isDeleting = deletingId === noteId;

          return (
            <article
              className="rounded-md border border-[#EDEDED] p-4"
              key={noteId}
            >
              {isEditing ? (
                <div className="grid gap-2">
                  <input
                    className="h-9 rounded-md border border-[#E5E5E7] px-3 text-sm outline-none focus:border-black"
                    onChange={(event) => setEditTitle(event.target.value)}
                    value={editTitle}
                  />
                  <textarea
                    className="min-h-20 rounded-md border border-[#E5E5E7] px-3 py-2 text-sm outline-none focus:border-black"
                    onChange={(event) => setEditContent(event.target.value)}
                    value={editContent}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      className="h-8 rounded-md bg-black px-3 font-medium text-white text-xs disabled:opacity-50"
                      disabled={saving || editTitle.trim().length === 0}
                      onClick={() => saveEdit(noteId)}
                      type="button"
                    >
                      {saving ? "Сохранение..." : "Сохранить"}
                    </button>
                    <button
                      className="h-8 rounded-md border border-[#E5E5E7] px-3 font-medium text-xs"
                      disabled={saving}
                      onClick={cancelEdit}
                      type="button"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-semibold text-sm">{note.title}</h3>
                  <p className="mt-1 whitespace-pre-wrap text-[#4B4B4C] text-sm">
                    {note.content}
                  </p>
                  <p className="mt-2 text-[#8D8D8F] text-xs">
                    Создано: {formatDate(note.created_at)} · Обновлено:{" "}
                    {formatDate(note.updated_at)}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      className="h-8 rounded-md border border-[#E5E5E7] px-3 font-medium text-xs"
                      onClick={() => startEdit(note)}
                      type="button"
                    >
                      Редактировать
                    </button>
                    <button
                      className="h-8 rounded-md border border-[#E5E5E7] px-3 font-medium text-red-700 text-xs"
                      disabled={isDeleting}
                      onClick={() => removeNote(noteId)}
                      type="button"
                    >
                      {isDeleting ? "Удаление..." : "Удалить"}
                    </button>
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
