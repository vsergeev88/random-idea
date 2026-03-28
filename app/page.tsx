import Link from "next/link"
import type { Metadata } from "next"
import {
  Shuffle,
  Clock,
  Lightbulb,
  Target,
  Zap,
  CheckCircle,
  Users,
  Code2,
  Palette,
  BarChart3,
  Quote,
} from "lucide-react"

export const metadata: Metadata = {
  title: "random-idea — генератор идей для стартапа",
  description:
    "Придумай идею стартапа за 5 минут из продуманных смысловых блоков. Бесплатно, без регистрации.",
}

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <ValueSection />
      <ForWhomSection />
      <SocialProofSection />
      <FAQSection />
      <FinalCTASection />
      <SiteFooter />
    </>
  )
}

function HeroSection() {
  return (
    <section className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <nav className="px-6 py-4 border-b border-zinc-800/60">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-mono text-sm font-medium text-zinc-400 tracking-tight">
            random-idea
          </span>
          <Link
            href="/generator"
            className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
          >
            Открыть генератор →
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 rounded-full px-4 py-1.5 text-sm">
            <span className="size-1.5 bg-emerald-400 rounded-full shrink-0" />
            Бесплатно · Без регистрации · Сразу к делу
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-white">
            Придумай идею стартапа за 5 минут, даже если кажется, что{" "}
            <span className="text-amber-400">всё уже придумано</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            random-idea собирает новые концепты из продуманных смысловых блоков
            и помогает быстро выбрать лучшие варианты для запуска.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/generator"
              className="inline-flex items-center justify-center gap-2 bg-white text-zinc-900 rounded-xl px-7 py-3.5 text-base font-semibold hover:bg-zinc-100 active:scale-[0.98] transition-all"
            >
              <Shuffle className="size-4 shrink-0" />
              Сгенерировать первую идею
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700/60 text-zinc-300 rounded-xl px-7 py-3.5 text-base font-medium hover:bg-zinc-700 transition-colors"
            >
              Посмотреть, как это работает
            </a>
          </div>

          <p className="text-sm text-zinc-500">
            Бесплатно. Без сложного онбординга. Начать можно сразу.
          </p>

          <IdeaPreviewCard />
        </div>
      </div>
    </section>
  )
}

function IdeaPreviewCard() {
  return (
    <div className="mt-4 max-w-xl mx-auto bg-zinc-900 border border-zinc-700/60 rounded-2xl p-6 text-left">
      <p className="text-base sm:text-lg leading-relaxed font-medium">
        <span className="text-violet-400">Telegram-бот</span> для{" "}
        <span className="text-blue-400">соло-разработчиков</span> — помогает{" "}
        <span className="text-emerald-400">автоматизировать</span>{" "}
        <span className="text-amber-400">рутинную отчётность и документирование</span>
      </p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        <span className="bg-violet-950/60 text-violet-400 border border-violet-800/40 text-xs px-2 py-0.5 rounded-full">продукт</span>
        <span className="bg-blue-950/60 text-blue-400 border border-blue-800/40 text-xs px-2 py-0.5 rounded-full">аудитория</span>
        <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 text-xs px-2 py-0.5 rounded-full">действие</span>
        <span className="bg-amber-950/60 text-amber-400 border border-amber-800/40 text-xs px-2 py-0.5 rounded-full">задача</span>
      </div>
      <p className="text-xs text-zinc-600 mt-3">← пример сгенерированной идеи</p>
    </div>
  )
}

function ProblemSection() {
  const items = [
    {
      icon: <Clock className="size-5 text-red-500" />,
      text: "Идеи крутятся вокруг одних и тех же шаблонов.",
    },
    {
      icon: <Zap className="size-5 text-red-500" />,
      text: "На брейншторм уходит время, а ясности всё равно мало.",
    },
    {
      icon: <Target className="size-5 text-red-500" />,
      text: "Трудно быстро собрать пул вариантов для выбора.",
    },
  ]

  return (
    <section className="py-20 px-6 bg-zinc-50">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
            Пустой лист убивает скорость запуска
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-zinc-200 space-y-3 shadow-sm"
            >
              <div className="size-9 rounded-lg bg-red-50 flex items-center justify-center">
                {item.icon}
              </div>
              <p className="text-zinc-700 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SolutionSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-3 py-1 text-sm font-medium">
              <Lightbulb className="size-3.5" />
              Решение
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight">
              Генератор, который расширяет рамки мышления
            </h2>
            <p className="text-zinc-600 leading-relaxed text-lg">
              Ты получаешь идеи как конструктор: из комбинаций ниши, аудитории,
              проблемы, ценности и механики решения. Это даёт неожиданные, но
              понятные направления для следующего проекта.
            </p>
            <Link
              href="/generator"
              className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-zinc-800 transition-colors"
            >
              <Shuffle className="size-4" />
              Попробовать генерацию
            </Link>
          </div>

          <div className="space-y-3">
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 space-y-2">
              <p className="text-xs text-zinc-400 font-mono uppercase tracking-wide">Смысловые блоки</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "продукт", color: "violet" },
                  { label: "аудитория", color: "blue" },
                  { label: "действие", color: "emerald" },
                  { label: "задача", color: "amber" },
                ].map((b) => (
                  <span
                    key={b.label}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border
                      ${b.color === "violet" ? "bg-violet-50 text-violet-700 border-violet-200" : ""}
                      ${b.color === "blue" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                      ${b.color === "emerald" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : ""}
                      ${b.color === "amber" ? "bg-amber-50 text-amber-700 border-amber-200" : ""}
                    `}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-zinc-400">
              <span className="h-px flex-1 bg-zinc-200" />
              <span className="text-sm">120 000+ комбинаций</span>
              <span className="h-px flex-1 bg-zinc-200" />
            </div>
            <div className="bg-zinc-900 rounded-2xl p-5">
              <p className="text-white text-sm leading-relaxed">
                <span className="text-violet-400 font-medium">Figma-плагин</span> для{" "}
                <span className="text-blue-400 font-medium">UI/UX-дизайнеров</span> —
                помогает{" "}
                <span className="text-emerald-400 font-medium">персонализировать</span>{" "}
                <span className="text-amber-400 font-medium">
                  онбординг новых пользователей
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: 'Нажми "Сгенерировать"',
      desc: "Получи первую идею за секунду. Никаких форм, настроек и онбординга.",
    },
    {
      num: "02",
      title: "Прокрути несколько вариантов",
      desc: "Отметь лучшие звёздочкой или сохрани всё что понравилось.",
    },
    {
      num: "03",
      title: "Выбери 1–3 для проверки",
      desc: "Переходи к интервью с пользователями и валидации — без лишних шагов.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-6 bg-zinc-50">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
            Три шага до рабочей заготовки идеи
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="space-y-4">
              <span className="font-mono text-5xl font-bold text-zinc-200">
                {step.num}
              </span>
              <h3 className="text-lg font-semibold text-zinc-900">{step.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/generator"
            className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-zinc-800 transition-colors"
          >
            <Shuffle className="size-4" />
            Попробовать прямо сейчас
          </Link>
        </div>
      </div>
    </section>
  )
}

function ValueSection() {
  const items = [
    "Быстро получаешь много вариантов вместо одной «идеальной» идеи.",
    "Выходишь из творческого тупика без долгих сессий.",
    "Сразу формируешь короткий список для дальнейших интервью и проверки.",
  ]

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
            Почему это полезно
          </h2>
        </div>
        <ul className="space-y-4">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-200"
            >
              <CheckCircle className="size-5 text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-zinc-700 text-lg leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ForWhomSection() {
  const segments = [
    {
      icon: <Code2 className="size-5" />,
      title: "Инди-хакеры и соло-разработчики",
      desc: "Регулярно ищешь идею для нового микро-SaaS или пет-проекта — генератор даёт быстрый старт.",
    },
    {
      icon: <Zap className="size-5" />,
      title: "Вайбкодеры и создатели пет-проектов",
      desc: "Хочешь быстро собрать прототип, но не знаешь с чего начать — выбирай из потока свежих направлений.",
    },
    {
      icon: <Palette className="size-5" />,
      title: "Дизайнеры и аналитики",
      desc: "Нужна заготовка концепта для тестирования или исследования — получай идеи без долгого брейншторма.",
    },
  ]

  return (
    <section className="py-20 px-6 bg-zinc-50">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
            Сделано для тех, кто запускает новое
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {segments.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-zinc-200 space-y-3 shadow-sm"
            >
              <div className="size-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700">
                {s.icon}
              </div>
              <h3 className="font-semibold text-zinc-900">{s.title}</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SocialProofSection() {
  const testimonials = [
    {
      text: "Сгенерировал 20 идей за один вечер, отобрал 2 и уже провёл первые интервью. Раньше на это уходила неделя прокрастинации.",
      author: "Андрей М.",
      role: "Инди-хакер",
    },
    {
      text: "Наконец-то способ выйти из пузыря привычных идей. Комбинаторный подход реально даёт неожиданные, но осмысленные направления.",
      author: "Катя В.",
      role: "Продуктовый дизайнер",
    },
  ]

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
            Первые пользователи уже собирают свои списки идей
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-4"
            >
              <Quote className="size-5 text-zinc-300" />
              <p className="text-zinc-700 leading-relaxed">{t.text}</p>
              <div>
                <p className="font-semibold text-zinc-900 text-sm">{t.author}</p>
                <p className="text-zinc-500 text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const items = [
    {
      q: "Это бесплатно?",
      a: "Да, базовый доступ бесплатный. Регистрация не нужна — просто открываешь и генерируешь.",
    },
    {
      q: "Это просто случайные фразы?",
      a: "Нет. Идеи собираются из продуманной системы смысловых блоков: типы продуктов, аудитории, механики и задачи. Каждая комбинация осмыслена.",
    },
    {
      q: "Подходит только разработчикам?",
      a: "Нет, но в первой версии мы в первую очередь фокусируемся на создателях цифровых продуктов: разработчиках, дизайнерах, продуктовых аналитиках.",
    },
    {
      q: "Что делать после генерации?",
      a: "Выбрать 1–3 лучшие идеи и перейти к проверке через интервью с целевой аудиторией. Сохранённые идеи хранятся в браузере и не исчезнут.",
    },
  ]

  return (
    <section className="py-20 px-6 bg-zinc-50">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
            Частые вопросы
          </h2>
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group bg-white border border-zinc-200 rounded-2xl overflow-hidden"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-zinc-900 list-none select-none hover:bg-zinc-50 transition-colors">
                {item.q}
                <span className="ml-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-zinc-600 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTASection() {
  return (
    <section className="py-24 px-6 bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Хватит ждать «идеальный инсайт» — собери рабочую идею прямо сейчас
        </h2>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Открой random-idea и собери свой следующий стартап-концепт за несколько
          минут.
        </p>
        <Link
          href="/generator"
          className="inline-flex items-center justify-center gap-2 bg-white text-zinc-900 rounded-xl px-8 py-4 text-base font-semibold hover:bg-zinc-100 active:scale-[0.98] transition-all"
        >
          <Shuffle className="size-5" />
          Запустить генератор идей
        </Link>
        <p className="text-sm text-zinc-600">
          Бесплатно · Без регистрации · 120 000+ комбинаций
        </p>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="py-6 px-6 bg-zinc-950 border-t border-zinc-800/60">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="font-mono text-sm text-zinc-600">random-idea</span>
        <span className="text-sm text-zinc-600">MVP · 2025</span>
      </div>
    </footer>
  )
}
