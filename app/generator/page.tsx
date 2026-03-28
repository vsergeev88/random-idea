"use client";

import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Lock,
  LockOpen,
  Shuffle,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AUDIENCES, SERVICES } from "@/lib/idea-blocks";
import {
  type AnalogyIdea,
  type GeneratedIdea,
  generateAnalogy,
  generateIdea,
  type PinnedBlocks,
} from "@/lib/idea-generator";
import { cn } from "@/lib/utils";

type SavedIdea = {
  id: string;
  text: string;
  generatedAt: number;
  favorite: boolean;
};
type FrozenKey = "productType" | "audience" | "action" | "problem";
type FrozenState = Record<FrozenKey, boolean>;
type AnalogyFrozenKey = "service" | "audience";
type AnalogyFrozenState = Record<AnalogyFrozenKey, boolean>;
type TabId = "generator" | "analogy";

const ANALOGY_BLOCKS: {
  key: AnalogyFrozenKey;
  label: string;
  textBg: string;
  badgeNormal: string;
  badgeFrozen: string;
}[] = [
  {
    key: "service",
    label: "СЕРВИС",
    textBg: "bg-[#ff5c8a]",
    badgeNormal:
      "border-2 border-black bg-white shadow-[2px_2px_0_0_#000] hover:bg-[#ff5c8a]/20 transition",
    badgeFrozen: "border-2 border-black bg-[#ff5c8a]",
  },
  {
    key: "audience",
    label: "АУДИТОРИЯ",
    textBg: "bg-[#00f0ff]",
    badgeNormal:
      "border-2 border-black bg-white shadow-[2px_2px_0_0_#000] hover:bg-[#00f0ff]/20 transition",
    badgeFrozen: "border-2 border-black bg-[#00f0ff]",
  },
];

const STORAGE_KEY = "random-idea:saved";
const RECENT_WINDOW = 5;

const BLOCKS: {
  key: FrozenKey;
  label: string;
  textBg: string;
  frozenTextBg: string;
  badgeNormal: string;
  badgeFrozen: string;
  lockColor: string;
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
];

export default function GeneratorPage() {
  const [activeTab, setActiveTab] = useState<TabId>("generator");

  const [current, setCurrent] = useState<GeneratedIdea | null>(null);
  const [frozen, setFrozen] = useState<FrozenState>({
    productType: false,
    audience: false,
    action: false,
    problem: false,
  });
  const [sessionCount, setSessionCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const [currentAnalogy, setCurrentAnalogy] = useState<AnalogyIdea | null>(
    null
  );
  const [frozenAnalogy, setFrozenAnalogy] = useState<AnalogyFrozenState>({
    service: false,
    audience: false,
  });
  const [sessionCountAnalogy, setSessionCountAnalogy] = useState(0);
  const [isAnimatingAnalogy, setIsAnimatingAnalogy] = useState(false);

  const [saved, setSaved] = useState<SavedIdea[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [filter, setFilter] = useState<"all" | "favorites">("all");
  const [mounted, setMounted] = useState(false);

  const recentTexts = useRef<string[]>([]);
  const recentAnalogyTexts = useRef<string[]>([]);
  const currentRef = useRef<GeneratedIdea | null>(null);
  const frozenRef = useRef<FrozenState>(frozen);
  const currentAnalogyRef = useRef<AnalogyIdea | null>(null);
  const frozenAnalogyRef = useRef<AnalogyFrozenState>(frozenAnalogy);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    frozenRef.current = frozen;
  }, [frozen]);

  useEffect(() => {
    currentAnalogyRef.current = currentAnalogy;
  }, [currentAnalogy]);

  useEffect(() => {
    frozenAnalogyRef.current = frozenAnalogy;
  }, [frozenAnalogy]);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSaved(JSON.parse(stored));
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {}
  }, [saved, mounted]);

  const toggleFreeze = useCallback((key: FrozenKey) => {
    setFrozen((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const toggleFreezeAnalogy = useCallback((key: AnalogyFrozenKey) => {
    setFrozenAnalogy((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleGenerate = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      const cur = currentRef.current;
      const frz = frozenRef.current;
      const pinned: PinnedBlocks = {
        productType: frz.productType && cur ? cur.productType : undefined,
        audience: frz.audience && cur ? cur.audience : undefined,
        action: frz.action && cur ? cur.action : undefined,
        problem: frz.problem && cur ? cur.problem : undefined,
      };
      const idea = generateIdea(recentTexts.current, pinned);
      recentTexts.current = [
        ...recentTexts.current.slice(-(RECENT_WINDOW - 1)),
        idea.text,
      ];
      setCurrent(idea);
      setSessionCount((c) => c + 1);
      setIsAnimating(false);
    }, 150);
  }, []);

  const handleSave = useCallback(() => {
    if (!current) {
      return;
    }
    setSaved((prev) => {
      if (prev.some((s) => s.id === current.id)) {
        return prev;
      }
      return [{ ...current, favorite: false }, ...prev];
    });
  }, [current]);

  const handleGenerateAnalogy = useCallback(() => {
    setIsAnimatingAnalogy(true);
    setTimeout(() => {
      const cur = currentAnalogyRef.current;
      const frz = frozenAnalogyRef.current;
      const pinned: PinnedAnalogyBlocks = {
        service: frz.service && cur ? cur.service : undefined,
        audience: frz.audience && cur ? cur.audience : undefined,
      };
      const analogy = generateAnalogy(recentAnalogyTexts.current, pinned);
      recentAnalogyTexts.current = [
        ...recentAnalogyTexts.current.slice(-(RECENT_WINDOW - 1)),
        analogy.text,
      ];
      setCurrentAnalogy(analogy);
      setSessionCountAnalogy((c) => c + 1);
      setIsAnimatingAnalogy(false);
    }, 150);
  }, []);

  const handleSaveAnalogy = useCallback(() => {
    if (!currentAnalogy) {
      return;
    }
    setSaved((prev) => {
      if (prev.some((s) => s.id === currentAnalogy.id)) {
        return prev;
      }
      return [{ ...currentAnalogy, favorite: false }, ...prev];
    });
  }, [currentAnalogy]);

  const toggleFavorite = useCallback((id: string) => {
    setSaved((prev) =>
      prev.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s))
    );
  }, []);

  const deleteIdea = useCallback((id: string) => {
    setSaved((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const isCurrentSaved = current
    ? saved.some((s) => s.id === current.id)
    : false;
  const isCurrentAnalogySaved = currentAnalogy
    ? saved.some((s) => s.id === currentAnalogy.id)
    : false;
  const filteredSaved =
    filter === "favorites" ? saved.filter((s) => s.favorite) : saved;
  const favoritesCount = saved.filter((s) => s.favorite).length;
  const frozenCount = Object.values(frozen).filter(Boolean).length;
  const allFrozen = frozenCount === 4;
  const frozenAnalogyCount =
    Object.values(frozenAnalogy).filter(Boolean).length;
  const allAnalogyFrozen = frozenAnalogyCount === 2;

  return (
    <div className="flex min-h-screen flex-col bg-[#fff8d6]">
      <header className="border-black border-b-4 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link
            className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 font-black font-mono text-sm uppercase shadow-[2px_2px_0_0_#000] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
            href="/"
          >
            <ArrowLeft className="size-4" />
            random-idea
          </Link>
          <button
            className={cn(
              "inline-flex items-center gap-2 border-2 border-black px-3 py-1.5 font-black text-sm uppercase shadow-[2px_2px_0_0_#000] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
              showSaved ? "bg-[#ffe600]" : "bg-white"
            )}
            onClick={() => setShowSaved((v) => !v)}
            type="button"
          >
            <Bookmark className="size-4" />
            Сохранённые
            {saved.length > 0 && (
              <span className="border-2 border-black bg-black px-1.5 py-0.5 font-black text-white text-xs leading-none">
                {saved.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-2xl px-4 pt-6">
          <div className="flex divide-x-2 divide-black border-2 border-black">
            <button
              className={cn(
                "flex-1 px-4 py-2.5 font-black text-sm uppercase tracking-wide transition",
                activeTab === "generator"
                  ? "bg-[#ffe600] text-black"
                  : "bg-white text-black/50 hover:bg-[#ffe600]/20"
              )}
              onClick={() => setActiveTab("generator")}
              type="button"
            >
              Генератор идей
            </button>
            <button
              className={cn(
                "flex-1 px-4 py-2.5 font-black text-sm uppercase tracking-wide transition",
                activeTab === "analogy"
                  ? "bg-[#ffe600] text-black"
                  : "bg-white text-black/50 hover:bg-[#ffe600]/20"
              )}
              onClick={() => setActiveTab("analogy")}
              type="button"
            >
              Аналогии
            </button>
          </div>
        </div>

        <div className={activeTab === "generator" ? "" : "hidden"}>
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
            <div
              className={cn(
                "flex min-h-44 items-center justify-center border-2 border-black bg-white p-8 shadow-[5px_5px_0_0_#000] transition-all duration-150",
                isAnimating ? "scale-[0.99] opacity-0" : "scale-100 opacity-100"
              )}
            >
              {current ? (
                <div className="w-full space-y-5 text-center">
                  <p className="font-medium text-black text-xl leading-relaxed sm:text-2xl">
                    {BLOCKS.map((block, i) => {
                      const value = current[block.key];
                      const isFrozen = frozen[block.key];
                      const isProblem = block.key === "problem";

                      return (
                        <span key={block.key}>
                          {i === 1 && (
                            <span className="text-black/50"> для </span>
                          )}
                          {i === 2 && (
                            <span className="text-black/50"> — помогает </span>
                          )}
                          {i === 3 && <span> </span>}
                          {isProblem ? (
                            <span
                              className={cn(
                                "font-black text-black",
                                isFrozen
                                  ? "bg-black px-1 text-white"
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
                      );
                    })}
                  </p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {BLOCKS.map((block) => {
                      const isFrozen = frozen[block.key];
                      return (
                        <button
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 font-black text-xs uppercase",
                            isFrozen ? block.badgeFrozen : block.badgeNormal
                          )}
                          key={block.key}
                          onClick={() => toggleFreeze(block.key)}
                          title={
                            isFrozen
                              ? `Разморозить «${block.label.toLowerCase()}»`
                              : `Заморозить «${block.label.toLowerCase()}»`
                          }
                          type="button"
                        >
                          {isFrozen ? (
                            <Lock
                              className={cn("size-3 shrink-0", block.lockColor)}
                            />
                          ) : (
                            <LockOpen className="size-3 shrink-0 opacity-30" />
                          )}
                          {block.label}
                        </button>
                      );
                    })}
                  </div>

                  {frozenCount > 0 && (
                    <p className="font-medium text-black/50 text-xs uppercase tracking-wide">
                      {allFrozen
                        ? "Все блоки заморожены — разморозь хотя бы один"
                        : `${frozenCount} ${frozenCount === 1 ? "блок заморожен" : "блока заморожено"} — при генерации ${frozenCount === 1 ? "он" : "они"} не изменятся`}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-3 text-center">
                  <p className="font-medium text-black/60 text-lg">
                    Нажми кнопку, чтобы получить первую идею
                  </p>
                  <p className="font-medium text-black/40 text-sm uppercase tracking-wide">
                    4 блока · 120 000+ комбинаций · заморозка блоков
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className={cn(
                  "inline-flex h-12 flex-1 items-center justify-center gap-2 border-2 border-black font-black text-base uppercase transition",
                  allFrozen
                    ? "cursor-not-allowed border-black/30 bg-black/10 text-black/30"
                    : "bg-[#ffe600] text-black shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                )}
                disabled={allFrozen}
                onClick={handleGenerate}
                type="button"
              >
                <Shuffle className="size-4" />
                {sessionCount === 0
                  ? "Сгенерировать первую идею"
                  : "Новая идея"}
              </button>
              {current && (
                <button
                  className={cn(
                    "inline-flex h-12 items-center justify-center gap-2 border-2 border-black px-5 font-black text-base uppercase transition",
                    isCurrentSaved
                      ? "cursor-default bg-[#ff5c8a] text-black"
                      : "bg-[#00f0ff] text-black shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  )}
                  disabled={isCurrentSaved}
                  onClick={handleSave}
                  type="button"
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
              <p className="text-center font-bold text-black/40 text-sm uppercase tracking-wide">
                За сессию: <span className="text-black">{sessionCount}</span>{" "}
                {sessionCount === 1
                  ? "идея"
                  : sessionCount < 5
                    ? "идеи"
                    : "идей"}
              </p>
            )}
          </div>
        </div>

        <div className={activeTab === "analogy" ? "" : "hidden"}>
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
            <div
              className={cn(
                "flex min-h-44 items-center justify-center border-2 border-black bg-white p-8 shadow-[5px_5px_0_0_#000] transition-all duration-150",
                isAnimatingAnalogy
                  ? "scale-[0.99] opacity-0"
                  : "scale-100 opacity-100"
              )}
            >
              {currentAnalogy ? (
                <div className="w-full space-y-5 text-center">
                  <p className="font-medium text-2xl text-black leading-relaxed sm:text-3xl">
                    <span
                      className={cn(
                        "bg-[#ff5c8a] px-1 font-black",
                        frozenAnalogy.service && "border-2 border-black"
                      )}
                    >
                      {currentAnalogy.service}
                    </span>
                    <span className="text-black/50"> для </span>
                    <span
                      className={cn(
                        "bg-[#00f0ff] px-1 font-black",
                        frozenAnalogy.audience && "border-2 border-black"
                      )}
                    >
                      {currentAnalogy.audience}
                    </span>
                  </p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {ANALOGY_BLOCKS.map((block) => {
                      const isFrozen = frozenAnalogy[block.key];
                      return (
                        <button
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 font-black text-xs uppercase",
                            isFrozen ? block.badgeFrozen : block.badgeNormal
                          )}
                          key={block.key}
                          onClick={() => toggleFreezeAnalogy(block.key)}
                          title={
                            isFrozen
                              ? `Разморозить «${block.label.toLowerCase()}»`
                              : `Заморозить «${block.label.toLowerCase()}»`
                          }
                          type="button"
                        >
                          {isFrozen ? (
                            <Lock className="size-3 shrink-0 text-black" />
                          ) : (
                            <LockOpen className="size-3 shrink-0 opacity-30" />
                          )}
                          {block.label}
                        </button>
                      );
                    })}
                  </div>

                  {frozenAnalogyCount > 0 && (
                    <p className="font-medium text-black/50 text-xs uppercase tracking-wide">
                      {allAnalogyFrozen
                        ? "Оба блока заморожены — разморозь хотя бы один"
                        : "1 блок заморожен — при генерации он не изменится"}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-3 text-center">
                  <p className="font-medium text-black/60 text-lg">
                    Нажми кнопку — получи аналогию
                  </p>
                  <p className="font-medium text-black/40 text-sm uppercase tracking-wide">
                    {SERVICES.length} сервисов × {AUDIENCES.length} аудиторий ·{" "}
                    {SERVICES.length * AUDIENCES.length} комбинаций
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className={cn(
                  "inline-flex min-h-12 flex-1 items-center justify-center gap-2 border-2 border-black font-black text-base uppercase transition",
                  allAnalogyFrozen
                    ? "cursor-not-allowed border-black/30 bg-black/10 text-black/30"
                    : "bg-[#ffe600] text-black shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                )}
                disabled={allAnalogyFrozen}
                onClick={handleGenerateAnalogy}
                type="button"
              >
                <Shuffle className="size-4" />
                {sessionCountAnalogy === 0
                  ? "Сгенерировать аналогию"
                  : "Новая аналогия"}
              </button>
              {currentAnalogy && (
                <button
                  className={cn(
                    "inline-flex h-12 items-center justify-center gap-2 border-2 border-black px-5 font-black text-base uppercase transition",
                    isCurrentAnalogySaved
                      ? "cursor-default bg-[#ff5c8a] text-black"
                      : "bg-[#00f0ff] text-black shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  )}
                  disabled={isCurrentAnalogySaved}
                  onClick={handleSaveAnalogy}
                  type="button"
                >
                  {isCurrentAnalogySaved ? (
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

            {sessionCountAnalogy > 0 && (
              <p className="text-center font-bold text-black/40 text-sm uppercase tracking-wide">
                За сессию:{" "}
                <span className="text-black">{sessionCountAnalogy}</span>{" "}
                {sessionCountAnalogy === 1
                  ? "аналогия"
                  : sessionCountAnalogy < 5
                    ? "аналогии"
                    : "аналогий"}
              </p>
            )}
          </div>
        </div>

        {showSaved && (
          <div className="flex-1 border-black border-t-4 bg-white">
            <div className="mx-auto w-full max-w-2xl space-y-4 px-4 py-6">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-lg uppercase">
                  Сохранённые идеи
                </h2>
                <div className="flex gap-0 border-2 border-black">
                  <button
                    className={cn(
                      "px-4 py-1.5 font-black text-xs uppercase transition",
                      filter === "all"
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-[#ffe600]"
                    )}
                    onClick={() => setFilter("all")}
                    type="button"
                  >
                    Все ({saved.length})
                  </button>
                  <div className="w-px bg-black" />
                  <button
                    className={cn(
                      "px-4 py-1.5 font-black text-xs uppercase transition",
                      filter === "favorites"
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-[#ffe600]"
                    )}
                    onClick={() => setFilter("favorites")}
                    type="button"
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
                      className="flex items-start gap-3 border-2 border-black bg-[#fff8d6] p-4 shadow-[3px_3px_0_0_#000]"
                      key={idea.id}
                    >
                      <p className="flex-1 font-medium text-black text-sm leading-relaxed">
                        {idea.text}
                      </p>
                      <div className="mt-0.5 flex shrink-0 gap-1">
                        <button
                          className={cn(
                            "border-2 border-black p-1.5 transition hover:translate-x-[1px] hover:translate-y-[1px]",
                            idea.favorite ? "bg-[#ffe600]" : "bg-white"
                          )}
                          onClick={() => toggleFavorite(idea.id)}
                          title={
                            idea.favorite
                              ? "Убрать из избранного"
                              : "В избранное"
                          }
                          type="button"
                        >
                          <Star
                            className={cn(
                              "size-4",
                              idea.favorite
                                ? "fill-black text-black"
                                : "text-black/40"
                            )}
                          />
                        </button>
                        <button
                          className="border-2 border-black bg-white p-1.5 transition hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#ff5c8a]"
                          onClick={() => deleteIdea(idea.id)}
                          title="Удалить"
                          type="button"
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
  );
}
