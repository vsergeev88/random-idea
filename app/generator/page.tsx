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
  textBg: string
  frozenTextBg: string
  badgeNormal: string
  badgeFrozen: string
  lockColor: string
}[] = [
  {
    key: "productType",
    label: "ПРОДУКТ",
    textBg: "bg-[#ff5c8a]",
    frozenTextBg: "bg-[#ff5c8a] border-2 border-black",
    badgeNormal:
      "border-2 border-black bg-white shadow-[2px_2px_0_0_#000] hover:bg-[#ff5c8a]/20 transition",
    badgeFrozen: "border-2 border-black bg-[#ff5c8a]",
    lockColor: "text-black",
  },
  {
    key: "audience",
    label: "АУДИТОРИЯ",
    textBg: "bg-[#00f0ff]",
    frozenTextBg: "bg-[#00f0ff] border-2 border-black",
    badgeNormal:
      "border-2 border-black bg-white shadow-[2px_2px_0_0_#000] hover:bg-[#00f0ff]/20 transition",
    badgeFrozen: "border-2 border-black bg-[#00f0ff]",
    lockColor: "text-black",
  },
  {
    key: "action",
    label: "ДЕЙСТВИЕ",
    textBg: "bg-[#ffe600]",
    frozenTextBg: "bg-[#ffe600] border-2 border-black",
    badgeNormal:
      "border-2 border-black bg-white shadow-[2px_2px_0_0_#000] hover:bg-[#ffe600]/20 transition",
    badgeFrozen: "border-2 border-black bg-[#ffe600]",
    lockColor: "text-black",
  },
  {
    key: "problem",
    label: "ЗАДАЧА",
    textBg: "underline decoration-2",
    frozenTextBg: "bg-black text-white px-1",
    badgeNormal:
      "border-2 border-black bg-white shadow-[2px_2px_0_0_#000] hover:bg-black/5 transition",
    badgeFrozen: "border-2 border-black bg-black text-white",
    lockColor: "text-white",
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
    <div className="min-h-screen bg-[#fff8d6] flex flex-col">
      <header className="border-b-4 border-black bg-white px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 font-mono text-sm font-black uppercase shadow-[2px_2px_0_0_#000] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
          >
            <ArrowLeft className="size-4" />
            random-idea
          </Link>
          <button
            type="button"
            onClick={() => setShowSaved((v) => !v)}
            className={cn(
              "inline-flex items-center gap-2 border-2 border-black px-3 py-1.5 text-sm font-black uppercase shadow-[2px_2px_0_0_#000] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
              showSaved ? "bg-[#ffe600]" : "bg-white"
            )}
          >
            <Bookmark className="size-4" />
            Сохранённые
            {saved.length > 0 && (
              <span className="border-2 border-black bg-black text-white text-xs px-1.5 py-0.5 font-black leading-none">
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
              "border-2 border-black bg-white p-8 shadow-[5px_5px_0_0_#000] transition-all duration-150 min-h-44 flex items-center justify-center",
              isAnimating ? "opacity-0 scale-[0.99]" : "opacity-100 scale-100"
            )}
          >
            {current ? (
              <div className="text-center space-y-5 w-full">
                <p className="text-xl sm:text-2xl font-medium leading-relaxed text-black">
                  {BLOCKS.map((block, i) => {
                    const value = current[block.key]
                    const isFrozen = frozen[block.key]
                    const isProblem = block.key === "problem"

                    return (
                      <span key={block.key}>
                        {i === 1 && <span className="text-black/50"> для </span>}
                        {i === 2 && <span className="text-black/50"> — помогает </span>}
                        {i === 3 && <span> </span>}
                        {isProblem ? (
                          <span
                            className={cn(
                              "font-black text-black",
                              isFrozen
                                ? "bg-black text-white px-1"
                                : "underline decoration-2 decoration-black"
                            )}
                          >
                            {value}
                          </span>
                        ) : (
                          <span
                            className={cn(
                              "px-1 font-black text-black",
                              block.textBg,
                              isFrozen && "border-2 border-black"
                            )}
                          >
                            {value}
                          </span>
                        )}
                      </span>
                    )
                  })}
                </p>

                <div className="flex flex-wrap gap-2 justify-center">
                  {BLOCKS.map((block) => {
                    const isFrozen = frozen[block.key]
                    return (
                      <button
                        key={block.key}
                        type="button"
                        onClick={() => toggleFreeze(block.key)}
                        title={
                          isFrozen
                            ? `Разморозить «${block.label.toLowerCase()}»`
                            : `Заморозить «${block.label.toLowerCase()}»`
                        }
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase",
                          isFrozen ? block.badgeFrozen : block.badgeNormal
                        )}
                      >
                        {isFrozen ? (
                          <Lock className={cn("size-3 shrink-0", block.lockColor)} />
                        ) : (
                          <LockOpen className="size-3 shrink-0 opacity-30" />
                        )}
                        {block.label}
                      </button>
                    )
                  })}
                </div>

                {frozenCount > 0 && (
                  <p className="text-xs font-medium text-black/50 uppercase tracking-wide">
                    {allFrozen
                      ? "Все блоки заморожены — разморозь хотя бы один"
                      : `${frozenCount} ${frozenCount === 1 ? "блок заморожен" : "блока заморожено"} — при генерации ${frozenCount === 1 ? "он" : "они"} не изменятся`}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center space-y-3">
                <p className="text-lg font-medium text-black/60">
                  Нажми кнопку, чтобы получить первую идею
                </p>
                <p className="text-sm font-medium text-black/40 uppercase tracking-wide">
                  4 блока · 120 000+ комбинаций · заморозка блоков
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
                "flex-1 inline-flex items-center justify-center gap-2 h-12 border-2 border-black font-black text-base uppercase transition",
                allFrozen
                  ? "bg-black/10 text-black/30 cursor-not-allowed border-black/30"
                  : "bg-[#ffe600] text-black shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
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
                  "inline-flex items-center justify-center gap-2 h-12 px-5 border-2 border-black font-black text-base uppercase transition",
                  isCurrentSaved
                    ? "bg-[#ff5c8a] text-black cursor-default"
                    : "bg-[#00f0ff] text-black shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
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
            <p className="text-center text-sm font-bold uppercase text-black/40 tracking-wide">
              За сессию:{" "}
              <span className="text-black">
                {sessionCount}
              </span>{" "}
              {sessionCount === 1 ? "идея" : sessionCount < 5 ? "идеи" : "идей"}
            </p>
          )}
        </div>

        {showSaved && (
          <div className="border-t-4 border-black bg-white flex-1">
            <div className="max-w-2xl mx-auto w-full px-4 py-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-black uppercase text-lg">
                  Сохранённые идеи
                </h2>
                <div className="flex gap-0 border-2 border-black">
                  <button
                    type="button"
                    onClick={() => setFilter("all")}
                    className={cn(
                      "px-4 py-1.5 text-xs font-black uppercase transition",
                      filter === "all"
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-[#ffe600]"
                    )}
                  >
                    Все ({saved.length})
                  </button>
                  <div className="w-px bg-black" />
                  <button
                    type="button"
                    onClick={() => setFilter("favorites")}
                    className={cn(
                      "px-4 py-1.5 text-xs font-black uppercase transition",
                      filter === "favorites"
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-[#ffe600]"
                    )}
                  >
                    ★ Избранное ({favoritesCount})
                  </button>
                </div>
              </div>

              {filteredSaved.length === 0 ? (
                <div className="border-2 border-black bg-[#fff8d6] p-8 text-center">
                  <p className="font-medium text-black/60">
                    {filter === "favorites"
                      ? "Нет избранных — отметь звёздочкой лучшие"
                      : "Нет сохранённых идей — нажми «Сохранить» после генерации"}
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {filteredSaved.map((idea) => (
                    <li
                      key={idea.id}
                      className="flex items-start gap-3 border-2 border-black bg-[#fff8d6] p-4 shadow-[3px_3px_0_0_#000]"
                    >
                      <p className="flex-1 text-sm font-medium leading-relaxed text-black">
                        {idea.text}
                      </p>
                      <div className="flex gap-1 shrink-0 mt-0.5">
                        <button
                          type="button"
                          onClick={() => toggleFavorite(idea.id)}
                          className={cn(
                            "border-2 border-black p-1.5 transition hover:translate-x-[1px] hover:translate-y-[1px]",
                            idea.favorite ? "bg-[#ffe600]" : "bg-white"
                          )}
                          title={idea.favorite ? "Убрать из избранного" : "В избранное"}
                        >
                          <Star
                            className={cn(
                              "size-4",
                              idea.favorite
                                ? "text-black fill-black"
                                : "text-black/40"
                            )}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteIdea(idea.id)}
                          className="border-2 border-black bg-white p-1.5 transition hover:bg-[#ff5c8a] hover:translate-x-[1px] hover:translate-y-[1px]"
                          title="Удалить"
                        >
                          <Trash2 className="size-4 text-black" />
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
