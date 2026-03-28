export const Skyline = () => {
  const skylineSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 150'%3E%3Cpath d='M0 150 V130 H28 V150 H34 V95 H44 L56 60 L68 95 H78 V150 H84 V108 H96 V82 H106 V58 H112 V38 H118 V58 H124 V82 H134 V108 H140 V150 H146 V88 H190 V150 H196 V100 L218 58 L240 100 V150 H246 V52 H250 V38 H253 V18 H255 V8 H257 V18 H259 V38 H262 V52 H268 V150 H274 V90 Q304 30 334 90 V150 H340 V105 H354 V78 H366 V105 H380 V150 H386 V68 H404 V150 H410 V55 H428 V150 H434 V95 H446 V75 L462 40 L478 75 V95 H490 V150 H496 V118 H544 V150 H550 V80 H560 V60 H568 V40 H572 V60 H580 V80 H590 V150 H596 V98 H608 L620 50 L652 98 H660 V150 H666 V95 H710 V150 H716 V108 L742 80 L768 108 V150 H774 V132 H800 V150 Z' fill='white'/%3E%3C/svg%3E")`;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px] opacity-20"
      style={{
        backgroundImage: skylineSvg,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "bottom center",
        backgroundSize: "auto 100%",
      }}
    />
  );
};
