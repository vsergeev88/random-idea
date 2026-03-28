import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down" | "idle";

interface UsePilotFlyingResult {
  bgGradientEnd: string;
  bgGradientStart: string;
  flameOpacity: number;
  flameScale: number;
  pilotLift: number;
  pilotTilt: number;
  scrollProgress: number;
}

const usePilotFlying = (
  pageRef: React.RefObject<HTMLDivElement | null>
): UsePilotFlyingResult => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("idle");
  const [idleFloatOffset, setIdleFloatOffset] = useState(0);

  useEffect(() => {
    let frame = 0;
    let lastScrollY = 0;
    let idleTimer: number | null = null;

    const updateProgress = () => {
      const currentScrollY = window.scrollY;
      const pageHeight =
        (pageRef.current?.scrollHeight ??
          document.documentElement.scrollHeight) - window.innerHeight;
      const progress =
        pageHeight > 0 ? Math.min(currentScrollY / pageHeight, 1) : 0;
      const delta = currentScrollY - lastScrollY;

      if (Math.abs(delta) > 0.5) {
        setScrollDirection(delta > 0 ? "down" : "up");
      }

      setScrollProgress(progress);
      lastScrollY = currentScrollY;
      frame = 0;
    };

    const handleScroll = () => {
      if (idleTimer !== null) {
        window.clearTimeout(idleTimer);
      }
      idleTimer = window.setTimeout((): void => {
        setScrollDirection("idle");
      }, 130);

      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      if (idleTimer !== null) {
        window.clearTimeout(idleTimer);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pageRef]);

  useEffect(() => {
    if (scrollDirection !== "idle") {
      setIdleFloatOffset(0);
      return;
    }

    let frame = 0;
    const startTime = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const nextOffset = Math.sin(elapsed / 380) * 4;
      setIdleFloatOffset(nextOffset);
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [scrollDirection]);

  const easedProgress = 1 - (1 - scrollProgress) ** 2;
  const mix = (from: number, to: number) =>
    Math.round(from + (to - from) * easedProgress);
  const bgGradientStart = `rgb(${mix(63, 8)} ${mix(94, 10)} ${mix(251, 20)})`;
  const bgGradientEnd = `rgb(${mix(0, 0)} ${mix(212, 0)} ${mix(255, 0)})`;
  const isScrollingDown = scrollDirection === "down";
  const isScrollingUp = scrollDirection === "up";
  const flameOpacity = isScrollingDown ? 1 : 0;
  const flameScale = isScrollingDown ? 0.85 + easedProgress * 0.9 : 0.35;
  const pilotTilt = isScrollingUp ? -9 : 1.5;
  const pilotLift = 20 - easedProgress * 34 + idleFloatOffset;

  return {
    bgGradientStart,
    bgGradientEnd,
    flameOpacity,
    flameScale,
    pilotTilt,
    pilotLift,
    scrollProgress: easedProgress,
  };
};

export default usePilotFlying;
