"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Blocks,
  Brain,
  ChevronDown,
  Megaphone,
  Repeat2,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";

const STEP_DURATION = 4000;

const steps = [
  {
    icon: Brain,
    title: "Unpack",
    accent: "from-violet-400 to-indigo-400",
    glow: "bg-violet-400/20",
    activeGlow: "shadow-[0_0_40px_rgba(167,139,250,0.25)]",
    activeBorder: "border-violet-400/30",
    description:
      "Shape your raw idea into a clear product concept using Jetpack's built-in skills and frameworks.",
  },
  {
    icon: Blocks,
    title: "Build",
    accent: "from-cyan-400 to-blue-400",
    glow: "bg-cyan-400/20",
    activeGlow: "shadow-[0_0_40px_rgba(56,189,248,0.25)]",
    activeBorder: "border-cyan-400/30",
    description:
      "Ship your MVP fast on top of the Jetpack template with AI-powered development tools.",
  },
  {
    icon: Megaphone,
    title: "Promote",
    accent: "from-amber-400 to-orange-400",
    glow: "bg-amber-400/20",
    activeGlow: "shadow-[0_0_40px_rgba(251,191,36,0.25)]",
    activeBorder: "border-amber-400/30",
    description:
      "Launch and grow with built-in marketing playbooks, positioning guides, and promotion workflows.",
  },
  {
    icon: Repeat2,
    title: "Repeat",
    accent: "from-emerald-400 to-teal-400",
    glow: "bg-emerald-400/20",
    activeGlow: "shadow-[0_0_40px_rgba(52,211,153,0.25)]",
    activeBorder: "border-emerald-400/30",
    description:
      "Keep iterating on your product or jump to your next idea — the loop stays the same.",
  },
];

type Step = (typeof steps)[number];

const StepCard = ({
  step,
  index,
  active,
  className,
}: {
  step: Step;
  index: number;
  active?: boolean;
  className?: string;
}) => (
  <div
    className={`group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-sm transition-all duration-700 ${
      active
        ? `${step.activeBorder} bg-white/[0.08] ${step.activeGlow}`
        : "border-white/[0.08] bg-white/[0.03]"
    } ${className ?? ""}`}
  >
    <div className="flex items-start gap-4">
      <div className="relative shrink-0">
        <div
          className={`absolute inset-0 rounded-xl blur-xl transition-opacity duration-700 ${step.glow} ${active ? "opacity-100" : "opacity-40"}`}
        />
        <div
          className={`relative flex size-11 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-700 ${step.accent} ${active ? "scale-110" : ""}`}
        >
          <step.icon className="size-5 text-white" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-baseline gap-2">
          <h3
            className={`font-semibold text-lg transition-colors duration-700 ${active ? "text-white" : "text-white/80"}`}
          >
            {step.title}
          </h3>
          <span className="font-mono text-white/25 text-xs">0{index + 1}</span>
        </div>
        <p
          className={`text-sm leading-relaxed transition-colors duration-700 ${active ? "text-white/70" : "text-white/45"}`}
        >
          {step.description}
        </p>
      </div>
    </div>
  </div>
);

const ArrowCell = ({
  active,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) => (
  <div
    className={`flex items-center justify-center transition-all duration-700 ${active ? "scale-125 text-white/60" : "text-white/20"}`}
  >
    {children}
  </div>
);

export const SolvedBlock = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 py-24 text-white">
      <h2 className="mb-4 text-center font-bold text-4xl tracking-tight md:text-5xl">
        How it works
      </h2>
      <p className="mb-14 max-w-md text-center text-lg text-white/60">
        A repeatable system for turning ideas into products that make money.
      </p>

      <div className="hidden w-full grid-cols-[1fr_2.5rem_1fr] grid-rows-[auto_2.5rem_auto] md:grid">
        <StepCard
          active={activeStep === 0}
          className="h-full"
          index={0}
          step={steps[0]}
        />
        <ArrowCell active={activeStep === 0}>
          <ArrowRight className="size-5" />
        </ArrowCell>
        <StepCard
          active={activeStep === 1}
          className="h-full"
          index={1}
          step={steps[1]}
        />

        <ArrowCell active={activeStep === 3}>
          <ArrowUp className="size-5" />
        </ArrowCell>
        <div />
        <ArrowCell active={activeStep === 1}>
          <ArrowDown className="size-5" />
        </ArrowCell>

        <StepCard
          active={activeStep === 3}
          className="h-full"
          index={3}
          step={steps[3]}
        />
        <ArrowCell active={activeStep === 2}>
          <ArrowLeft className="size-5" />
        </ArrowCell>
        <StepCard
          active={activeStep === 2}
          className="h-full"
          index={2}
          step={steps[2]}
        />
      </div>

      <div className="flex w-full flex-col items-center md:hidden">
        {steps.map((step, index) => (
          <div className="flex w-full flex-col items-center" key={step.title}>
            <StepCard active={activeStep === index} index={index} step={step} />
            {index < steps.length - 1 ? (
              <div
                className={`flex h-8 items-center transition-all duration-700 ${activeStep === index ? "scale-125 text-white/50" : "text-white/20"}`}
              >
                <ChevronDown className="size-4" />
              </div>
            ) : null}
          </div>
        ))}
        <div
          className={`mt-6 flex items-center gap-2 rounded-full border border-dashed px-4 py-2 transition-all duration-700 ${activeStep === 3 ? "border-white/30 text-white/50" : "border-white/15 text-white/35"}`}
        >
          <RotateCcw className="size-3.5" />
          <span className="font-medium text-xs">Loop back to Unpack</span>
        </div>
      </div>
    </section>
  );
};
