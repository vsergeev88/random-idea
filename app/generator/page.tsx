"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  Shuffle,
  Bookmark,
  BookmarkCheck,
  Star,
  Trash2,
  ArrowLeft,
  Lock,
  LockOpen,
} from "lucide-react"
import { generateIdea, type GeneratedIdea, type PinnedBlocks } from "@/lib/idea-generator"
import { cn } from "@/lib/utils"

type SavedIdea = GeneratedIdea & { favorite: boolean }

type FrozenKey = "productType" | "audience" | "action" | "problem"
type FrozenState = Record<FrozenKey, boolean>

const STORAGE_KEY = "random-idea:saved"
const RECENT_WINDOW = 5

const BLOCKS: {
  key: FrozenKey
  label: string
  colorClass: string
  frozenClass: string
  textClass: string
}[] = [
  {
    key: "productType",
    label: "продукт",
    colorClass: "bg-violet-50 text-violet-700 hover:bg-violet-100",
    frozenClass: "bg-violet-100 text-violet-800 ring-1 ring-violet-400",
    textClass: "text-violet-600",
  },
  {
    key: "audience",
    label: "аудитория",
    colorClass: "bg-blue-50 text-blue-700 hover:bg-blue-100",
    frozenClass: "bg-blue-100 text-blue-800 ring-1 ring-blue-400",
    textClass: "text-blue-600",
  },
  {
    key: "action",
    label: "действие",
    colorClass: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    frozenClass: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-400",
    textClass: "text-emerald-600",
  },
  {
    key: "problem",
    label: "задача",
    colorClass: "bg-amber-50 text-amber-700 hover:bg-amber-100",
    frozenClass: "bg-amber-100 text-amber-800 ring-1 ring-amber-400",
    textClass: "text-amber-600",
  },
]

export default function GeneratorPage() {
  const [current, setCurrent] = useState<GeneratedIdea | null>(null)
  const [frozen, setFrozen] = useState<FrozenState>({
    productType: false,
    audience: false,
    action: false,
    problem: false,
  })
  const [saved, setSaved] = useState<SavedIdea[]>([])
  const [showSaved, setShowSaved] = useState(false)
  const [filter, setFilter] = useState<"all" | "favorites">("all")
  const [sessionCount, setSessionCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)

  const recentTexts = useRef<string[]>([])
  const currentRef = useRef<GeneratedIdea | null>(null)
  const frozenRef = useRef<FrozenState>(frozen)

  useEffect(() => {
    currentRef.current = current
  }, [current])

  useEffect(() => {
    frozenRef.current = frozen
  }, [frozen])

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setSaved(JSON.parse(stored))
    } catch {}
  }, [])

  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    } catch {}
  }, [saved, mounted])

  const toggleFreeze = useCallback((key: FrozenKey) => {
    setFrozen((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const handleGenerate = useCallback(() => {
    setIsAnimating(true)
    setTimeout(() => {
      const cur = currentRef.current
      const frz = frozenRef.current

      const pinned: PinnedBlocks = {
        productType: frz.productType && cur ? cur.productType : undefined,
        audience: frz.audience && cur ? cur.audience : undefined,
        action: frz.action && cur ? cur.action : undefined,
        problem: frz.problem && cur ? cur.problem : undefined,
      }

      const idea = generateIdea(recentTexts.current, pinned)
      recentTexts.current = [
        ...recentTexts.current.slice(-(RECENT_WINDOW - 1)),
        idea.text,
      ]
      setCurrent(idea)
      setSessionCount((c) => c + 1)
      setIsAnimating(false)
    }, 150)
  }, [])

  const handleSave = useCallback(() => {
    if (!current) return
    setSaved((prev) => {
      if (prev.some((s) => s.id === current.id)) return prev
      return [{ ...current, favorite: false }, ...prev]
    })
  }, [current])

  const toggleFavorite = useCallback((id: string) => {
    setSaved((prev) =>
      prev.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s))
    )
  }, [])

  const deleteIdea = useCallback((id: string) => {
    setSaved((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const isCurrentSaved = current ? saved.some((s) => s.id === current.id) : false
  const filteredSaved =
    filter === "favorites" ? saved.filter((s) => s.favorite) : saved
  const favoritesCount = saved.filter((s) => s.favorite).length
  const frozenCount = Object.values(frozen).filter(Boolean).length
  const allFrozen = frozenCount === 4

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/50 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
          >
            <ArrowLeft className="size-4" />
            random-idea
          </Link>
          <button
            type="button"
            onClick={() => setShowSaved((v) => !v)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Bookmark className="size-4" />
            Сохранённые
            {saved.length > 0 && (
              <span className="bg-zinc-900 text-white text-xs rounded-full px-1.5 py-0.5 font-medium leading-none">
                {saved.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="max-w-2xl mx-auto w-full px-4 py-10 flex flex-col gap-6">
          <div
            className={cn(
              "min-h-44 rounded-2xl border border-border bg-card p-8 flex items-center justify-center transition-all duration-150",
              isAnimating ? "opacity-0 scale-[0.99]" : "opacity-100 scale-100"
            )}
          >
            {current ? (
              <div className="text-center space-y-5">
                <p className="text-xl sm:text-2xl font-medium leading-relaxed text-foreground">
                  {BLOCKS.map((block, i) => {
                    const value = current[block.key]
                    const isFrozen = frozen[block.key]
                    return (
                      <span key={block.key}>
                        {i === 0 ? null : i === 2 ? (
                          <span className="text-muted-foreground"> — помогает </span>
                        ) : i === 1 ? (
                          <span> для </span>
                        ) : (
                          <span> </span>
                        )}
                        <span
                          className={cn(
                            block.textClass,
                            "font-semibold",
                            isFrozen && "underline decoration-dotted underline-offset-4 decoration-2"
                          )}
                        >
                          {value}
                        </span>
                      </span>
                    )
                  })}
                </p>

                <div className="flex flex-wrap gap-1.5 justify-center">
                  {BLOCKS.map((block) => {
                    const isFrozen = frozen[block.key]
                    return (
                      <button
                        key={block.key}
                        type="button"
                        onClick={() => toggleFreeze(block.key)}
                        title={isFrozen ? `Разморозить «${block.label}»` : `Заморозить «${block.label}»`}
                        className={cn(
                          "inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full transition-all",
                          isFrozen ? block.frozenClass : block.colorClass
                        )}
                      >
                        {isFrozen ? (
                          <Lock className="size-3 shrink-0" />
                        ) : (
                          <LockOpen className="size-3 shrink-0 opacity-40" />
                        )}
                        {block.label}
                      </button>
                    )
                  })}
                </div>

                {frozenCount > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {frozenCount === 4
                      ? "Все блоки заморожены — разморозь хотя бы один"
                      : `${frozenCount} ${frozenCount === 1 ? "блок заморожен" : "блока заморожено"} — при генерации ${frozenCount === 1 ? "он" : "они"} не изменятся`}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center space-y-2">
                <p className="text-lg text-muted-foreground">
                  Нажми кнопку, чтобы получить первую идею
                </p>
                <p className="text-sm text-muted-foreground/60">
                  Идея собирается из 4 блоков — каждый можно заморозить
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={allFrozen}
              className={cn(
                "flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl text-base font-semibold transition-all",
                allFrozen
                  ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                  : "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98]"
              )}
            >
              <Shuffle className="size-4" />
              {sessionCount === 0 ? "Сгенерировать первую идею" : "Новая идея"}
            </button>
            {current && (
              <button
                type="button"
                onClick={handleSave}
                disabled={isCurrentSaved}
                className={cn(
                  "inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl border text-base font-medium transition-all",
                  isCurrentSaved
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 cursor-default"
                    : "border-border bg-background text-foreground hover:bg-muted active:scale-[0.98]"
                )}
              >
                {isCurrentSaved ? (
                  <>
                    <BookmarkCheck className="size-4" />
                    Сохранено
                  </>
                ) : (
                  <>
                    <Bookmark className="size-4" />
                    Сохранить
                  </>
                )}
              </button>
            )}
          </div>

          {sessionCount > 0 && (
            <p className="text-center text-sm text-muted-foreground">
              За эту сессию:{" "}
              <span className="font-medium text-foreground">{sessionCount}</span>{" "}
              {sessionCount === 1 ? "идея" : sessionCount < 5 ? "идеи" : "идей"}
            </p>
          )}
        </div>

        {showSaved && (
          <div className="border-t border-border/50 bg-muted/30 flex-1">
            <div className="max-w-2xl mx-auto w-full px-4 py-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">
                  Сохранённые идеи
                </h2>
                <div className="flex gap-1 bg-background border border-border rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setFilter("all")}
                    className={cn(
                      "px-3 py-1 text-sm rounded-md transition-colors",
                      filter === "all"
                        ? "bg-zinc-900 text-white"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Все ({saved.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter("favorites")}
                    className={cn(
                      "px-3 py-1 text-sm rounded-md transition-colors",
                      filter === "favorites"
                        ? "bg-zinc-900 text-white"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Избранное ({favoritesCount})
                  </button>
                </div>
              </div>

              {filteredSaved.length === 0 ? (
                <p className="text-center text-muted-foreground py-10 text-sm">
                  {filter === "favorites"
                    ? "Нет идей в избранном. Отметь звёздочкой лучшие."
                    : "Пока нет сохранённых идей. Нажми «Сохранить» после генерации."}
                </p>
              ) : (
                <ul className="space-y-2">
                  {filteredSaved.map((idea) => (
                    <li
                      key={idea.id}
                      className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/60"
                    >
                      <p className="flex-1 text-sm leading-relaxed text-foreground">
                        {idea.text}
                      </p>
                      <div className="flex gap-1 shrink-0 mt-0.5">
                        <button
                          type="button"
                          onClick={() => toggleFavorite(idea.id)}
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                          title={
                            idea.favorite ? "Убрать из избранного" : "В избранное"
                          }
                        >
                          <Star
                            className={cn(
                              "size-4",
                              idea.favorite
                                ? "text-amber-500 fill-amber-500"
                                : "text-muted-foreground"
                            )}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteIdea(idea.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors text-muted-foreground"
                          title="Удалить"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
