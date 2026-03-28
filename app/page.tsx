import {
  ArrowRight,
  Check,
  Clock,
  Code2,
  Layers,
  Palette,
  Rocket,
  Shuffle,
  Sparkles,
  Star,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "./_landing/FAQAccordion";
import { FadeIn } from "./_landing/FadeIn";

export const metadata: Metadata = {
  title: "random-idea — генератор идей для стартапа",
  description:
    "Придумай идею стартапа за 5 минут из продуманных смысловых блоков. Бесплатно, без регистрации.",
};

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
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-black border-b-4 bg-[#ff5c8a] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_45%,rgba(0,0,0,0.07)_45%,rgba(0,0,0,0.07)_55%,transparent_55%,transparent_100%)]" />
      <div className="pointer-events-none absolute top-12 right-8 hidden size-20 border-4 border-black bg-[#ffe600] sm:block" />
      <div className="pointer-events-none absolute bottom-10 left-8 hidden size-14 border-4 border-black bg-[#00f0ff] sm:block" />

      <nav className="relative mx-auto mb-12 flex max-w-5xl items-center justify-between px-6">
        <span className="font-black font-mono text-black text-sm uppercase tracking-tight">
          random-idea
        </span>
        <Link
          className="inline-flex items-center gap-1 border-2 border-black bg-white px-3 py-1.5 font-black text-sm uppercase shadow-[3px_3px_0_0_#000] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          href="/generator"
        >
          Открыть генератор
          <ArrowRight className="size-3.5" />
        </Link>
      </nav>

      <div className="relative mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-1.5 font-black text-sm uppercase shadow-[3px_3px_0_0_#000]">
              <Sparkles className="size-4" />
              Генератор идей для стартапа
            </div>

            <h1 className="max-w-4xl font-black text-4xl uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Придумай идею за 5 минут,{" "}
              <span className="bg-[#00f0ff] px-2 text-black">
                даже если кажется,
              </span>{" "}
              что всё уже придумано
            </h1>

            <div className="max-w-2xl border-2 border-black bg-white p-4 font-medium shadow-[4px_4px_0_0_#000]">
              random-idea собирает концепты из продуманных смысловых блоков —
              получай нестандартные идеи и быстро отбирай лучшие для запуска.
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex h-12 items-center justify-center gap-2 border-2 border-black bg-[#ffe600] px-8 font-black text-base uppercase shadow-[4px_4px_0_0_#000] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                href="/generator"
              >
                <Shuffle className="size-4" />
                Сгенерировать первую идею
              </Link>
              <a
                className="inline-flex h-12 items-center justify-center gap-2 border-2 border-black bg-[#00f0ff] px-8 font-black text-base uppercase shadow-[4px_4px_0_0_#000] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                href="#how-it-works"
              >
                Посмотреть, как работает
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                {
                  icon: <Clock className="size-4" />,
                  text: "5 минут до первой идеи",
                },
                {
                  icon: <Layers className="size-4" />,
                  text: "1M+ комбинаций",
                },
                { icon: <Star className="size-4" />, text: "Бесплатно" },
              ].map((tag) => (
                <span
                  className="flex items-center gap-2 border-2 border-black bg-white px-3 py-2 font-bold text-sm uppercase shadow-[3px_3px_0_0_#000]"
                  key={tag.text}
                >
                  {tag.icon}
                  {tag.text}
                </span>
              ))}
            </div>

            <div className="w-full max-w-xl border-2 border-black bg-white p-5 text-left shadow-[4px_4px_0_0_#000]">
              <p className="mb-3 font-black font-mono text-black/40 text-xs uppercase">
                Пример сгенерированной идеи
              </p>
              <p className="font-medium text-base leading-relaxed">
                <span className="bg-[#ff5c8a] px-1 font-black text-black">
                  Telegram-бот
                </span>{" "}
                для{" "}
                <span className="bg-[#00f0ff] px-1 font-black text-black">
                  соло-разработчиков
                </span>{" "}
                — помогает{" "}
                <span className="bg-[#ffe600] px-1 font-black text-black">
                  автоматизировать
                </span>{" "}
                <span className="font-black text-black underline decoration-2">
                  рутинную отчётность и документирование
                </span>
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["продукт", "аудитория", "действие", "задача"].map((b) => (
                  <span
                    className="border border-black/20 px-2 py-0.5 font-medium text-black/50 text-xs"
                    key={b}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ProblemSection() {
  const items = [
    "Идеи крутятся вокруг одних и тех же шаблонов.",
    "На брейншторм уходит время, а ясности всё равно мало.",
    "Трудно быстро собрать пул вариантов для выбора.",
  ];

  return (
    <section className="border-black border-b-4 bg-[#ffe600] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block border-2 border-black bg-white px-4 py-1.5 font-black text-sm uppercase shadow-[3px_3px_0_0_#000]">
              Проблема
            </div>
            <h2 className="font-black text-3xl uppercase tracking-tight sm:text-4xl">
              Пустой лист убивает скорость запуска
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {items.map((text, i) => (
            <FadeIn delay={i * 0.1} key={text}>
              <div className="flex items-start gap-4 border-2 border-black bg-white p-5 shadow-[4px_4px_0_0_#000]">
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center border-2 border-black bg-[#ff5c8a] font-black text-black text-xs">
                  ✕
                </div>
                <p className="font-medium text-black">{text}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.35}>
          <div className="mt-8 border-4 border-black bg-[#00f0ff] p-6 text-center shadow-[6px_6px_0_0_#000]">
            <p className="font-black text-lg uppercase">
              Нужен поток идей — быстро, структурированно, без прокрастинации
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section className="border-black border-b-4 bg-[#fff8d6] py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block border-2 border-black bg-[#ffe600] px-4 py-1.5 font-black text-sm uppercase shadow-[3px_3px_0_0_#000]">
              Решение
            </div>
            <h2 className="font-black text-3xl uppercase tracking-tight sm:text-4xl">
              Генератор, который расширяет рамки мышления
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-medium text-black/80">
              Ты получаешь идеи как конструктор: из комбинаций ниши, аудитории,
              проблемы, ценности и механики решения.
            </p>
          </div>
        </FadeIn>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="space-y-5">
              <p className="font-medium text-black/80 text-lg leading-relaxed">
                Это даёт неожиданные, но понятные направления для следующего
                проекта. Никаких пустых листов — только конкретные концепты для
                оценки.
              </p>
              <Link
                className="inline-flex h-12 items-center gap-2 border-2 border-black bg-[#ffe600] px-8 font-black text-base uppercase shadow-[4px_4px_0_0_#000] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                href="/generator"
              >
                <Shuffle className="size-4" />
                Попробовать генерацию
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-3">
              <div className="border-2 border-black bg-white p-5 shadow-[4px_4px_0_0_#000]">
                <p className="mb-3 font-black font-mono text-black/40 text-xs uppercase">
                  4 смысловых блока
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "продукт", bg: "bg-[#ff5c8a]" },
                    { label: "аудитория", bg: "bg-[#00f0ff]" },
                    { label: "действие", bg: "bg-[#ffe600]" },
                    { label: "задача", bg: "bg-white border border-black" },
                  ].map((b) => (
                    <span
                      className={`${b.bg} border-2 border-black px-3 py-1.5 font-black text-sm uppercase shadow-[2px_2px_0_0_#000]`}
                      key={b.label}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 font-bold text-black/50 text-sm uppercase">
                <span className="h-px flex-1 bg-black/20" />
                120 000+ комбинаций
                <span className="h-px flex-1 bg-black/20" />
              </div>

              <div className="border-2 border-black bg-[#111111] p-5 shadow-[4px_4px_0_0_#000]">
                <p className="font-medium text-sm leading-relaxed">
                  <span className="bg-[#ff5c8a] px-1 font-black text-black">
                    Figma-плагин
                  </span>{" "}
                  <span className="text-white">для</span>{" "}
                  <span className="bg-[#00f0ff] px-1 font-black text-black">
                    UI/UX-дизайнеров
                  </span>{" "}
                  <span className="text-white/60">— помогает</span>{" "}
                  <span className="bg-[#ffe600] px-1 font-black text-black">
                    персонализировать
                  </span>{" "}
                  <span className="font-black text-white underline decoration-2">
                    онбординг новых пользователей
                  </span>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      text: 'Нажми "Сгенерировать" и получи первую идею — никаких форм и онбординга.',
    },
    {
      num: "02",
      text: "Прокрути несколько вариантов. Понравился блок — заморозь его, чтобы он не менялся.",
    },
    {
      num: "03",
      text: "Сохрани лучшие, выбери 1–3 и переходи к проверке через интервью.",
    },
  ];

  return (
    <section
      className="border-black border-b-4 bg-[#00f0ff] py-20 sm:py-28"
      id="how-it-works"
    >
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block border-2 border-black bg-white px-4 py-1.5 font-black text-sm uppercase shadow-[3px_3px_0_0_#000]">
              Как это работает
            </div>
            <h2 className="font-black text-3xl uppercase tracking-tight sm:text-4xl">
              Три шага до рабочей заготовки идеи
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <FadeIn delay={i * 0.12} key={step.num}>
              <div className="flex items-start gap-5">
                <div className="relative flex w-14 shrink-0 justify-center">
                  <div className="flex size-14 items-center justify-center border-2 border-black bg-[#ff5c8a] font-black font-mono text-black text-lg">
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute top-14 left-1/2 hidden h-[calc(100%+2rem)] w-1 -translate-x-1/2 bg-black sm:block" />
                  )}
                </div>
                <div className="flex-1 border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000]">
                  <p className="font-medium text-base leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-10 border-4 border-black bg-white p-6 text-center shadow-[6px_6px_0_0_#000]">
            <div className="mb-3 flex justify-center">
              <Clock className="size-6 text-black" />
            </div>
            <p className="font-black text-lg uppercase">
              Первая идея — меньше чем за 20 секунд
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ValueSection() {
  const items = [
    {
      title: "Много вариантов быстро",
      desc: "Получаешь поток идей вместо одной «идеальной» — скорость важнее совершенства.",
    },
    {
      title: "Выход из творческого тупика",
      desc: "Комбинаторный подход ломает привычные шаблоны и открывает неожиданные направления.",
    },
    {
      title: "Готовый список для проверки",
      desc: "Сразу формируй шортлист для интервью с пользователями и дальнейшей валидации.",
    },
    {
      title: "Заморозка блоков",
      desc: "Понравилась аудитория или механика — зафиксируй блок и перебирай остальные.",
    },
  ];

  return (
    <section className="border-black border-b-4 bg-[#ffe600] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block border-2 border-black bg-white px-4 py-1.5 font-black text-sm uppercase shadow-[3px_3px_0_0_#000]">
              Ценность
            </div>
            <h2 className="font-black text-3xl uppercase tracking-tight sm:text-4xl">
              Почему это полезно
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((item, i) => (
            <FadeIn delay={i * 0.08} key={item.title}>
              <div className="flex items-start gap-4 border-2 border-black bg-white p-6 shadow-[5px_5px_0_0_#000]">
                <div className="mt-1 flex size-8 shrink-0 items-center justify-center border-2 border-black bg-[#00f0ff]">
                  <Check className="size-4 text-black" />
                </div>
                <div>
                  <h3 className="mb-1 font-black uppercase">{item.title}</h3>
                  <p className="font-medium text-black/80 text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForWhomSection() {
  const segments = [
    {
      icon: <Code2 className="size-5" />,
      title: "Инди-хакеры и соло-разработчики",
      desc: "Регулярно ищешь идею для нового микро-SaaS — генератор даёт быстрый старт без прокрастинации.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: <Layers className="size-5" />,
      title: "Вайбкодеры и создатели пет-проектов",
      desc: "Хочешь собрать прототип, но не знаешь с чего начать — выбирай из потока свежих направлений.",
      gradient: "from-pink-500 to-purple-500",
    },
    {
      icon: <Palette className="size-5" />,
      title: "Дизайнеры и аналитики",
      desc: "Нужна заготовка концепта для тестирования — получай идеи без долгого брейншторма.",
      gradient: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <section className="border-black border-b-4 bg-[#fff8d6] py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block border-2 border-black bg-[#ffe600] px-4 py-1.5 font-black text-sm uppercase shadow-[3px_3px_0_0_#000]">
              Для кого
            </div>
            <h2 className="font-black text-3xl uppercase tracking-tight sm:text-4xl">
              Сделано для тех, кто запускает новое
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-3">
          {segments.map((s, i) => (
            <FadeIn delay={i * 0.1} key={s.title}>
              <div className="group border-2 border-black bg-white p-6 shadow-[5px_5px_0_0_#000] transition-all hover:-translate-y-1">
                <div
                  className={`mb-4 inline-flex size-12 items-center justify-center border-2 border-black bg-gradient-to-br ${s.gradient} text-white`}
                >
                  {s.icon}
                </div>
                <h3 className="mb-2 font-black text-xl uppercase">{s.title}</h3>
                <p className="font-medium text-black/80 text-sm">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
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
  ];

  return (
    <section className="border-black border-b-4 bg-[#00f0ff] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block border-2 border-black bg-white px-4 py-1.5 font-black text-sm uppercase shadow-[3px_3px_0_0_#000]">
              Первые пользователи
            </div>
            <h2 className="font-black text-3xl uppercase tracking-tight sm:text-4xl">
              Уже собирают свои списки идей
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <FadeIn delay={i * 0.1} key={t.author}>
              <div className="border-2 border-black bg-white p-6 shadow-[5px_5px_0_0_#000]">
                <div className="mb-4 font-black text-4xl text-black/20 leading-none">
                  "
                </div>
                <p className="font-medium text-black leading-relaxed">
                  {t.text}
                </p>
                <div className="mt-5 border-black/10 border-t-2 pt-4">
                  <p className="font-black text-sm uppercase">{t.author}</p>
                  <p className="font-medium text-black/60 text-sm">{t.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="border-black border-b-4 bg-[#fff8d6] py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block border-2 border-black bg-[#ff5c8a] px-4 py-1.5 font-black text-sm uppercase shadow-[3px_3px_0_0_#000]">
              FAQ
            </div>
            <h2 className="font-black text-3xl uppercase tracking-tight sm:text-4xl">
              Частые вопросы
            </h2>
          </div>
        </FadeIn>
        <FAQAccordion />
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="relative overflow-hidden border-black border-b-4 bg-[#111111] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,transparent_40%,rgba(255,255,255,0.04)_40%,rgba(255,255,255,0.04)_50%,transparent_50%,transparent_100%)]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <div className="mb-6 flex justify-center">
            <Rocket className="size-10 text-[#ffe600]" />
          </div>
          <h2 className="mb-6 font-black text-3xl text-white uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Хватит ждать «идеальный инсайт» —{" "}
            <span className="bg-[#ffe600] px-2 text-black">
              собери рабочую идею
            </span>{" "}
            прямо сейчас
          </h2>
          <p className="mx-auto mb-10 max-w-xl font-medium text-white/70">
            Открой random-idea и собери свой следующий стартап-концепт за
            несколько минут.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              className="inline-flex h-12 items-center gap-2 border-2 border-white bg-[#ffe600] px-8 font-black text-base text-black uppercase shadow-[4px_4px_0_0_#ffe600] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              href="/generator"
            >
              <Shuffle className="size-4" />
              Запустить генератор идей
            </Link>
            <a
              className="inline-flex h-12 items-center gap-2 border-2 border-white bg-transparent px-8 font-black text-base text-white uppercase shadow-[4px_4px_0_0_#00f0ff] transition hover:bg-white hover:text-black hover:shadow-none"
              href="#how-it-works"
            >
              Как это работает
            </a>
          </div>
          <p className="mt-8 font-medium text-sm text-white/40 uppercase tracking-wide">
            Бесплатно · Без регистрации · 120 000+ комбинаций
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-black border-t-4 bg-white px-6 py-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <span className="font-black font-mono text-black/50 text-sm uppercase">
          random-idea
        </span>
        <span className="font-medium text-black/40 text-sm uppercase">
          MVP · 2025
        </span>
      </div>
    </footer>
  );
}
