import Image from "next/image";
import jetpackman from "../../assets/jetpackman.png";

interface PilotFigureProps {
  flameOpacity: number;
  flameScale: number;
  pilotLift: number;
  pilotTilt: number;
}

const PilotFigure = ({
  pilotLift,
  pilotTilt,
  flameOpacity,
  flameScale,
}: PilotFigureProps) => {
  const leftFlameLeft = 10;
  const leftFlameBottom = 160;
  const leftFlameRotation = 180;
  const rightFlameLeft = 105;
  const rightFlameBottom = 160;
  const rightFlameRotation = 180;

  return (
    <div className="pointer-events-none fixed top-1/2 left-1/2 z-20 hidden -translate-x-130 md:block">
      <div
        style={{
          transform: `translateY(${pilotLift}px) rotate(${pilotTilt}deg)`,
          transformOrigin: "55% 35%",
          transition: "transform 200ms ease-out",
        }}
      >
        <div className="relative inline-block">
          <Image
            alt="jetpackman"
            aria-hidden="true"
            className="relative z-10 h-[260px] w-auto select-none"
            priority
            src={jetpackman}
          />
          <svg
            aria-hidden="true"
            className="absolute h-[74px] w-[36px]"
            style={{
              left: `${leftFlameLeft}px`,
              bottom: `${leftFlameBottom}px`,
              zIndex: 20,
              opacity: flameOpacity,
              transform: `rotate(${leftFlameRotation}deg) scaleY(${flameScale})`,
              transformOrigin: "18px 74px",
              transition: "opacity 160ms linear, transform 180ms ease-out",
            }}
            viewBox="0 0 36 74"
          >
            <path
              d="M18 0 C7 20 7 45 18 74 C30 45 30 20 18 0Z"
              fill="#ff7a2f"
            />
            <path
              d="M18 12 C11 29 11 48 18 63 C26 48 26 29 18 12Z"
              fill="#ffd166"
            />
          </svg>
          <svg
            aria-hidden="true"
            className="absolute h-[74px] w-[36px]"
            style={{
              left: `${rightFlameLeft}px`,
              bottom: `${rightFlameBottom}px`,
              zIndex: 0,
              opacity: flameOpacity,
              transform: `rotate(${rightFlameRotation}deg) scaleY(${flameScale})`,
              transformOrigin: "18px 74px",
              transition: "opacity 160ms linear, transform 180ms ease-out",
            }}
            viewBox="0 0 36 74"
          >
            <path
              d="M18 0 C7 20 7 45 18 74 C30 45 30 20 18 0Z"
              fill="#ff7a2f"
            />
            <path
              d="M18 12 C11 29 11 48 18 63 C26 48 26 29 18 12Z"
              fill="#ffd166"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PilotFigure;
