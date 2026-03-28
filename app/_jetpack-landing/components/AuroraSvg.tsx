export const AuroraSvg = () => (
  <svg
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 h-full w-full"
    fill="none"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 1920 1080"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
        <stop offset="20%" stopColor="#2dd4bf" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#10b981" stopOpacity="0.55" />
        <stop offset="75%" stopColor="#34d399" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#0891b2" stopOpacity="0" />
        <stop offset="15%" stopColor="#22d3ee" stopOpacity="0.3" />
        <stop offset="45%" stopColor="#06b6d4" stopOpacity="0.5" />
        <stop offset="70%" stopColor="#2dd4bf" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="g3" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
        <stop offset="25%" stopColor="#34d399" stopOpacity="0.35" />
        <stop offset="55%" stopColor="#2dd4bf" stopOpacity="0.45" />
        <stop offset="80%" stopColor="#06b6d4" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="g4" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
        <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.3" />
        <stop offset="60%" stopColor="#2dd4bf" stopOpacity="0.4" />
        <stop offset="85%" stopColor="#34d399" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="wave-h1" x1="0%" x2="100%" y1="0%" y2="0%">
        <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0" />
        <stop offset="20%" stopColor="#2dd4bf" stopOpacity="0.25" />
        <stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
        <stop offset="80%" stopColor="#06b6d4" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="wave-h2" x1="0%" x2="100%" y1="0%" y2="0%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
        <stop offset="15%" stopColor="#22d3ee" stopOpacity="0.2" />
        <stop offset="45%" stopColor="#2dd4bf" stopOpacity="0.35" />
        <stop offset="75%" stopColor="#34d399" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </linearGradient>

      <filter id="f-soft">
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
      </filter>

      <filter id="f-med">
        <feGaussianBlur in="SourceGraphic" stdDeviation="16" />
      </filter>

      <filter id="f-wide">
        <feGaussianBlur in="SourceGraphic" stdDeviation="35" />
      </filter>
    </defs>

    <g>
      <g filter="url(#f-wide)" opacity="0.35">
        <ellipse cx="960" cy="400" fill="#2dd4bf" rx="600" ry="300" />
        <ellipse cx="650" cy="350" fill="#06b6d4" rx="350" ry="200" />
        <ellipse cx="1300" cy="420" fill="#10b981" rx="300" ry="180" />
      </g>

      <g filter="url(#f-med)" opacity="0.7">
        <path
          d="M350,-50 C340,80 370,200 340,350 C310,500 360,640 330,800 C320,900 350,1050 340,1130"
          stroke="url(#g1)"
          strokeWidth="90"
        />
        <path
          d="M600,-50 C620,70 590,190 620,340 C650,490 610,630 640,790 C660,890 630,1040 640,1130"
          stroke="url(#g2)"
          strokeWidth="110"
        />
        <path
          d="M850,-50 C840,90 870,220 840,370 C810,520 850,660 830,820 C820,920 850,1060 840,1130"
          stroke="url(#g1)"
          strokeWidth="130"
        />
        <path
          d="M1080,-50 C1100,80 1070,210 1100,360 C1130,510 1080,650 1110,810 C1120,910 1090,1050 1100,1130"
          stroke="url(#g3)"
          strokeWidth="100"
        />
        <path
          d="M1320,-50 C1310,90 1340,230 1310,380 C1280,530 1330,670 1300,830 C1290,930 1320,1060 1310,1130"
          stroke="url(#g4)"
          strokeWidth="85"
        />
        <path
          d="M1560,-50 C1580,70 1550,200 1580,350 C1610,500 1560,640 1590,800 C1600,900 1570,1050 1580,1130"
          stroke="url(#g2)"
          strokeWidth="70"
        />
      </g>

      <g filter="url(#f-soft)" opacity="0.55">
        <path
          d="M200,-50 C220,100 190,260 230,430 C270,600 210,750 250,950 C260,1020 230,1130 240,1130"
          stroke="url(#g3)"
          strokeWidth="55"
        />
        <path
          d="M480,-50 C470,110 500,270 470,440 C440,610 490,760 460,960 C450,1030 480,1130 470,1130"
          stroke="url(#g4)"
          strokeWidth="70"
        />
        <path
          d="M720,-50 C740,100 710,260 750,430 C790,600 730,750 770,950 C780,1020 750,1130 760,1130"
          stroke="url(#g1)"
          strokeWidth="80"
        />
        <path
          d="M960,-50 C950,110 980,270 950,440 C920,610 970,760 940,960 C930,1030 960,1130 950,1130"
          stroke="url(#g2)"
          strokeWidth="65"
        />
        <path
          d="M1200,-50 C1220,100 1190,260 1230,430 C1270,600 1210,750 1250,950 C1260,1020 1230,1130 1240,1130"
          stroke="url(#g3)"
          strokeWidth="75"
        />
        <path
          d="M1450,-50 C1440,110 1470,270 1440,440 C1410,610 1460,760 1430,960 C1420,1030 1450,1130 1440,1130"
          stroke="url(#g1)"
          strokeWidth="50"
        />
        <path
          d="M1700,-50 C1720,100 1690,260 1730,430 C1770,600 1710,750 1750,950 C1760,1020 1730,1130 1740,1130"
          stroke="url(#g4)"
          strokeWidth="55"
        />
      </g>

      <g filter="url(#f-med)" opacity="0.5">
        <path
          d="M-100,300 C200,240 450,370 700,280 C950,190 1100,340 1350,260 C1600,180 1750,300 2020,240"
          fill="none"
          stroke="url(#wave-h1)"
          strokeWidth="50"
        />
        <path
          d="M-100,450 C250,380 500,500 750,410 C1000,320 1200,470 1450,380 C1700,290 1850,420 2020,360"
          fill="none"
          stroke="url(#wave-h2)"
          strokeWidth="40"
        />
        <path
          d="M-100,580 C300,520 530,630 780,550 C1030,470 1250,600 1500,520 C1750,440 1880,550 2020,490"
          fill="none"
          stroke="url(#wave-h1)"
          strokeWidth="35"
        />
      </g>
    </g>
  </svg>
);
