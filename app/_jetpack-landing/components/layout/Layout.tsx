"use client";
import { useEffect, useRef, useState } from "react";
import PilotFigure from "../pilot-figure/PilotFigure";
import usePilotFlying from "../pilot-figure/usePilotFlying";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxOffset, setMaxOffset] = useState(0);
  const {
    bgGradientStart,
    bgGradientEnd,
    flameOpacity,
    flameScale,
    pilotTilt,
    pilotLift,
    scrollProgress,
  } = usePilotFlying(pageRef);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) {
      return;
    }
    const measure = () => setMaxOffset(el.scrollHeight - window.innerHeight);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const invertedY = -maxOffset * (1 - scrollProgress);

  return (
    <div className="relative flex min-h-[500vh] flex-col" ref={pageRef}>
      <PilotFigure
        flameOpacity={flameOpacity}
        flameScale={flameScale}
        pilotLift={pilotLift}
        pilotTilt={pilotTilt}
      />
      <div
        className="fixed inset-0 z-0 h-screen w-full"
        style={{
          background: `linear-gradient(to bottom, ${bgGradientStart}, ${bgGradientEnd})`,
          transition: "background 120ms linear",
        }}
      />
      <div className="fixed inset-x-0 top-0 z-10 h-screen overflow-hidden">
        <div
          ref={contentRef}
          style={{
            transform: `translateY(${invertedY}px)`,
            willChange: "transform",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
