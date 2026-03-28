"use client";

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

const STAR_COUNT = 120;

const generateStars = (count: number) => {
  const stars: { x: number; y: number; size: number; delay: number; duration: number }[] = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < count; i++) {
    stars.push({
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 1.8 + 0.4,
      delay: rand() * 6,
      duration: rand() * 3 + 2,
    });
  }
  return stars;
};

const StarField = () => {
  const stars = useMemo(() => generateStars(STAR_COUNT), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={`s-${star.x.toFixed(2)}-${star.y.toFixed(2)}`}
          className="absolute rounded-full bg-white animate-[twinkle_var(--dur)_ease-in-out_var(--delay)_infinite]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            "--delay": `${star.delay}s`,
            "--dur": `${star.duration}s`,
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

const faqs = [
  {
    question: "What is Jetpack?",
    answer:
      "Jetpack is an all-in-one starter kit that helps you go from idea to a live, revenue-ready product as fast as possible. It includes a Next.js template, AI-powered development tools, and built-in marketing playbooks.",
  },
  {
    question: "Do I need coding experience to use Jetpack?",
    answer:
      "Basic familiarity with React and TypeScript is helpful, but Jetpack's AI-powered workflows and pre-built components dramatically reduce the amount of code you need to write yourself.",
  },
  {
    question: "What's included in the template?",
    answer:
      "Authentication (Clerk), database (Neon Postgres), payments (Stripe & Lemon Squeezy), a component library, SEO defaults, analytics hooks, and deployment configs — everything you need to launch a SaaS product.",
  },
  {
    question: "Can I use Jetpack for multiple projects?",
    answer:
      "Yes. Once you have access, you can use Jetpack to build as many projects as you like. The repeatable Unpack → Build → Promote → Repeat loop works for every new idea.",
  },
  {
    question: "How is Jetpack different from other boilerplates?",
    answer:
      "Most boilerplates give you code and leave you on your own. Jetpack pairs a production-ready template with AI agent skills that guide you through ideation, development, and marketing — so you're never stuck wondering what to do next.",
  },
];

const FAQItem = ({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) => (
  <div
    className={`border-b border-white/[0.08] transition-colors duration-300 ${open ? "bg-white/[0.03]" : ""}`}
  >
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 px-1 py-5 text-left"
    >
      <span
        className={`font-medium text-lg transition-colors duration-300 ${open ? "text-white" : "text-white/80"}`}
      >
        {question}
      </span>
      <ChevronDown
        className={`size-5 shrink-0 text-white/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      />
    </button>
    <div
      className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
    >
      <div className="overflow-hidden">
        <p className="px-1 text-base leading-relaxed text-white/60">
          {answer}
        </p>
      </div>
    </div>
  </div>
);

export const FAQBlock = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen w-full">
      <StarField />
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-24 text-white">
        <h2 className="mb-4 text-center font-bold text-4xl tracking-tight md:text-5xl">
          Frequently asked questions
        </h2>
        <p className="mb-14 max-w-md text-center text-lg text-white/60">
          Everything you need to know before getting started.
        </p>

        <div className="w-full border-t border-white/[0.08]">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              open={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};
