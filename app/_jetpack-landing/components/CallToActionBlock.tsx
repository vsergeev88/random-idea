"use client";

import { useWaitlist } from "@clerk/nextjs";
import { CheckCircle, Loader2, Rocket, Sparkles } from "lucide-react";
import { useState } from "react";
import { AuroraSvg } from "./AuroraSvg";

export const CallToActionBlock = () => {
  const { waitlist, errors, fetchStatus } = useWaitlist();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await waitlist.join({ emailAddress: email });
    if (!error) {
      setJoined(true);
    }
  };

  const isSubmitting = fetchStatus === "fetching";

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 70%)",
        }}
      >
        <AuroraSvg />
      </div>

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center">
        <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm">
          <Sparkles className="size-3.5 text-amber-400" />
          <span className="font-medium text-sm text-white/60">
            Limited early access spots
          </span>
        </div>

        <h2 className="mb-4 text-center font-bold text-4xl text-white tracking-tight md:text-5xl">
          Ready to{" "}
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            launch faster
          </span>
          ?
        </h2>

        <p className="mb-10 max-w-md text-center text-lg text-white/50">
          Join the waitlist and be the first to get access to Jetpack — the
          all-in-one AI-adapted template for your startup.
        </p>

        {joined ? (
          <div className="flex w-full flex-col items-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-8 shadow-[0_0_60px_rgba(52,211,153,0.1)] backdrop-blur-sm">
            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-400/15">
              <CheckCircle className="size-7 text-emerald-400" />
            </div>
            <h3 className="mb-2 font-semibold text-white text-xl">
              You&apos;re on the list!
            </h3>
            <p className="text-center text-white/50">
              We&apos;ll notify you at{" "}
              <span className="text-white/70">{email}</span> when your spot is
              ready.
            </p>
          </div>
        ) : (
          <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 shadow-[0_0_80px_rgba(139,92,246,0.08)] backdrop-blur-sm">
            <form
              className="flex flex-col gap-4 sm:flex-row"
              onSubmit={handleSubmit}
            >
              <div className="relative flex-1">
                <input
                  autoComplete="email"
                  className="h-12 w-full rounded-xl border border-white/[0.1] bg-white/[0.06] px-4 text-white placeholder-white/30 outline-none transition-colors focus:border-violet-400/40 focus:bg-white/[0.08]"
                  disabled={isSubmitting}
                  name="emailAddress"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  type="email"
                  value={email}
                />
                {errors?.fields?.emailAddress && (
                  <p className="mt-1.5 text-red-200 text-sm">
                    {errors.fields.emailAddress.longMessage}
                  </p>
                )}
              </div>
              <button
                className="group relative h-12 shrink-0 overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 px-6 font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] disabled:opacity-60"
                disabled={isSubmitting}
                type="submit"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-400 to-pink-400 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative flex items-center gap-2">
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Rocket className="size-4" />
                  )}
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </span>
              </button>
            </form>

            {errors?.global?.[0] && (
              <p className="mt-3 text-center text-red-200 text-sm">
                {errors.global[0].longMessage}
              </p>
            )}

            <div className="mt-5 flex items-center justify-center gap-6 text-white/30 text-xs">
              <span className="flex items-center gap-1.5">
                <div className="size-1 rounded-full bg-emerald-400" />
                Free to join
              </span>
              <span className="flex items-center gap-1.5">
                <div className="size-1 rounded-full bg-emerald-400" />
                No spam, ever
              </span>
              <span className="flex items-center gap-1.5">
                <div className="size-1 rounded-full bg-emerald-400" />
                Cancel anytime
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
