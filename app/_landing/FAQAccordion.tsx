"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown, ChevronUp } from "lucide-react"

const ITEMS = [
  {
    q: "Это бесплатно?",
    a: "Да, базовый доступ бесплатный. Регистрация не нужна — просто открываешь и генерируешь.",
  },
  {
    q: "Это просто случайные фразы?",
    a: "Нет. Идеи собираются из продуманной системы смысловых блоков: типы продуктов, аудитории, механики и задачи. Каждая комбинация осмыслена — 120 000+ уникальных вариантов.",
  },
  {
    q: "Подходит только разработчикам?",
    a: "Нет, но в первой версии фокус на создателях цифровых продуктов: разработчиках, дизайнерах, продуктовых аналитиках.",
  },
  {
    q: "Что делать после генерации?",
    a: "Выбрать 1–3 лучшие идеи и перейти к проверке через интервью с целевой аудиторией. Сохранённые идеи хранятся в браузере.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-4 border-2 border-black bg-white shadow-[4px_4px_0_0_#000]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-black text-lg uppercase transition-colors hover:bg-[#00f0ff]/20"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{q}</span>
        {open ? (
          <ChevronUp className="size-5 shrink-0" />
        ) : (
          <ChevronDown className="size-5 shrink-0" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 font-medium text-black/80">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQAccordion() {
  return (
    <div>
      {ITEMS.map((item) => (
        <FAQItem key={item.q} q={item.q} a={item.a} />
      ))}
    </div>
  )
}
