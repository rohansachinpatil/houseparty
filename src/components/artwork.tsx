import { cn } from "@/lib/utils";

export function DiyaMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("shrink-0", className)}
      fill="none"
      viewBox="0 0 32 32"
    >
      <circle cx="16" cy="16" r="13" stroke="hsl(var(--festival-red))" strokeOpacity=".94" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="8.5" stroke="hsl(var(--festival-teal))" strokeOpacity=".9" />
      <path d="M10.5 19.2c1.2 2.1 3 3.2 5.5 3.2s4.3-1.1 5.5-3.2H10.5Z" stroke="hsl(var(--festival-gold))" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 10.1c1.1 1.4 1.5 2.7 0 4.4-1.5-1.7-1.1-3 0-4.4Z" fill="hsl(var(--festival-saffron))" />
    </svg>
  );
}

export function RangoliHalo({ className }: { className?: string }) {
  const petalColors = [
    "hsl(var(--festival-red))",
    "hsl(var(--festival-saffron))",
    "hsl(var(--festival-teal))",
    "hsl(var(--festival-pink))",
  ];

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
      fill="none"
      viewBox="0 0 800 800"
    >
      <g strokeOpacity=".72" strokeWidth="1.4">
        <circle cx="400" cy="400" r="90" stroke="hsl(var(--festival-gold))" />
        <circle cx="400" cy="400" r="145" stroke="hsl(var(--festival-teal))" />
        <circle cx="400" cy="400" r="226" stroke="hsl(var(--festival-red))" />
        <circle cx="400" cy="400" r="290" stroke="hsl(var(--festival-saffron))" />
        <circle cx="400" cy="400" r="350" stroke="hsl(var(--festival-violet))" />
        <circle cx="400" cy="400" r="377" stroke="hsl(var(--festival-gold))" strokeOpacity=".36" />
        {Array.from({ length: 16 }, (_, index) => (
          <g
            key={index}
            stroke={petalColors[index % petalColors.length]}
            transform={`rotate(${index * 22.5} 400 400)`}
          >
            <path d="M400 90c57 58 66 105 0 171-66-66-57-113 0-171Z" />
            <path d="M400 118c35 40 39 72 0 112-39-40-35-72 0-112Z" strokeOpacity=".58" />
            <circle cx="400" cy="75" r="4" fill={petalColors[(index + 1) % petalColors.length]} stroke="none" />
          </g>
        ))}
        <path d="M400 325c41 0 75 34 75 75s-34 75-75 75-75-34-75-75 34-75 75-75Z" stroke="hsl(var(--festival-saffron))" />
        <path d="M400 360c23 0 40 17 40 40s-17 40-40 40-40-17-40-40 17-40 40-40Z" stroke="hsl(var(--festival-red))" />
        <circle cx="400" cy="400" r="8" fill="hsl(var(--festival-red))" stroke="none" />
      </g>
    </svg>
  );
}

export function MarigoldToran({ className }: { className?: string }) {
  const flowers = Array.from({ length: 13 }, (_, index) => {
    const position = index / 12;
    const x = 44 + position * 1112;
    const y = 35 + Math.sin(position * Math.PI) * 65;

    return (
      <g key={index} transform={`translate(${x} ${y})`}>
        <path d="M0 -34v18" stroke="hsl(var(--festival-gold))" strokeWidth="2" />
        <g transform="translate(0 -8)">
          {Array.from({ length: 8 }, (_, petal) => (
            <ellipse
              key={petal}
              cx="0"
              cy="-8"
              fill={petal % 3 === 0 ? "hsl(var(--festival-red))" : petal % 2 ? "hsl(var(--festival-saffron))" : "hsl(var(--festival-gold))"}
              rx="4.5"
              ry="8"
              transform={`rotate(${petal * 45})`}
            />
          ))}
          <circle r="4" fill="hsl(var(--festival-red))" />
        </g>
      </g>
    );
  });

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 1200 120"
    >
      <path d="M0 12c280 92 640 104 1200 0" stroke="hsl(var(--festival-teal))" strokeOpacity=".9" strokeWidth="2" />
      {flowers}
    </svg>
  );
}

export function DiyaIllustration({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
      fill="none"
      viewBox="0 0 420 280"
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M139 166c17 36 41 54 71 54s54-18 71-54H139Z" stroke="hsl(var(--festival-red))" strokeWidth="2" />
        <path d="M159 174c15 22 32 32 51 32s36-10 51-32" stroke="hsl(var(--festival-gold))" strokeOpacity=".8" />
        <path d="M210 81c19 26 26 48 0 73-26-25-19-47 0-73Z" stroke="hsl(var(--festival-saffron))" strokeWidth="2" />
        <path d="M210 105c8 12 10 23 0 34-10-11-8-22 0-34Z" fill="hsl(var(--festival-gold))" fillOpacity=".9" stroke="none" />
        <path d="M140 231h140" stroke="hsl(var(--festival-teal))" strokeOpacity=".75" />
        <path d="M116 242h188" stroke="hsl(var(--festival-violet))" strokeOpacity=".5" />
        <circle cx="105" cy="166" r="3" fill="hsl(var(--festival-teal))" stroke="none" />
        <circle cx="315" cy="166" r="3" fill="hsl(var(--festival-coral))" stroke="none" />
      </g>
    </svg>
  );
}

export function VermilionSeal({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
      fill="none"
      viewBox="0 0 120 120"
    >
      <circle cx="60" cy="60" r="53" stroke="hsl(var(--festival-red))" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="43" stroke="hsl(var(--festival-gold))" strokeDasharray="2 5" />
      <g fill="hsl(var(--festival-red))" transform="translate(60 60)">
        {Array.from({ length: 12 }, (_, index) => (
          <ellipse
            key={index}
            cx="0"
            cy="-27"
            rx="5"
            ry="11"
            transform={`rotate(${index * 30})`}
          />
        ))}
      </g>
      <circle cx="60" cy="60" r="13" fill="hsl(var(--festival-gold))" />
      <circle cx="60" cy="60" r="5" fill="hsl(var(--festival-red))" />
    </svg>
  );
}

export function PartyScene({ className }: { className?: string }) {
  return (
    <svg
      aria-label="Illustration of friends dancing around a DJ deck"
      className={cn("party-scene", className)}
      role="img"
      viewBox="0 0 800 420"
    >
      <path d="M0 330h800v90H0z" fill="var(--ink)" />
      <path d="M0 330h800" stroke="var(--gold)" strokeWidth="5" />
      <path d="M48 14q30 94 114 112M752 14q-30 94-114 112" fill="none" stroke="hsl(var(--festival-saffron))" strokeDasharray="2 12" strokeLinecap="round" strokeWidth="12" />

      <g className="scene-disco">
        <path d="M400 0v36" stroke="var(--ink)" strokeWidth="3" />
        <circle cx="400" cy="82" r="42" fill="#c9d3ff" stroke="var(--ink)" strokeWidth="5" />
        <circle cx="400" cy="82" r="31" fill="none" stroke="var(--blue)" strokeDasharray="2 5" strokeWidth="8" />
        <path d="M369 82h62M400 51v62" stroke="var(--ink)" strokeOpacity=".6" strokeWidth="2" />
        <circle cx="400" cy="82" r="7" fill="var(--gold)" stroke="var(--ink)" strokeWidth="2" />
      </g>

      <g className="scene-dancer scene-dancer-a">
        <path d="M130 186 90 130M151 183l17-73" fill="none" stroke="var(--ink)" strokeLinecap="round" strokeWidth="13" />
        <circle cx="143" cy="142" r="27" fill="#bd8057" stroke="var(--ink)" strokeWidth="4" />
        <path d="M116 139q1-37 29-37 29 0 29 31-22-18-58 6z" fill="#210e16" />
        <path d="M113 180q30-19 61 2l23 112-103 1z" fill="var(--blue)" stroke="var(--ink)" strokeLinejoin="round" strokeWidth="4" />
        <path d="m111 210 62 0M106 233l70 0" stroke="var(--gold)" strokeDasharray="2 8" strokeWidth="4" />
      </g>

      <g className="scene-dancer scene-dancer-b">
        <path d="m282 178-36-67m61 68 34-69" fill="none" stroke="var(--ink)" strokeLinecap="round" strokeWidth="13" />
        <circle cx="295" cy="142" r="27" fill="#d49a71" stroke="var(--ink)" strokeWidth="4" />
        <path d="M269 139q4-39 30-39 28 0 27 37-26-15-57 2z" fill="#211116" />
        <path d="M265 181q29-19 60 0l25 112H242z" fill="var(--pink)" stroke="var(--ink)" strokeLinejoin="round" strokeWidth="4" />
        <path d="M263 205q30 12 64 0" fill="none" stroke="var(--paper)" strokeDasharray="2 8" strokeWidth="4" />
      </g>

      <g className="scene-dancer scene-dancer-c">
        <path d="m512 181-23-71m45 69 38-61" fill="none" stroke="var(--ink)" strokeLinecap="round" strokeWidth="13" />
        <circle cx="526" cy="142" r="27" fill="#8b573c" stroke="var(--ink)" strokeWidth="4" />
        <path d="M499 139q0-38 28-38t28 35q-26-16-56 3z" fill="#171015" />
        <path d="M495 181q29-18 61 2l24 111H472z" fill="var(--gold)" stroke="var(--ink)" strokeLinejoin="round" strokeWidth="4" />
        <path d="M499 203h54M496 225h60" stroke="var(--crim)" strokeDasharray="2 8" strokeWidth="4" />
      </g>

      <g className="scene-dancer scene-dancer-d">
        <path d="m662 183-37-61m61 63 14-76" fill="none" stroke="var(--ink)" strokeLinecap="round" strokeWidth="13" />
        <circle cx="673" cy="142" r="27" fill="#d9a47c" stroke="var(--ink)" strokeWidth="4" />
        <path d="M646 138q2-38 30-38 29 0 27 38-21-21-57 0z" fill="#311920" />
        <path d="M642 182q29-18 60 1l23 111H620z" fill="var(--green)" stroke="var(--ink)" strokeLinejoin="round" strokeWidth="4" />
        <path d="m650 205 48 0m-50 22 52 0" stroke="var(--pink)" strokeDasharray="2 8" strokeWidth="4" />
      </g>

      <g className="scene-deck">
        <rect x="271" y="292" width="258" height="91" rx="12" fill="var(--crim)" stroke="var(--ink)" strokeWidth="5" />
        <circle cx="320" cy="337" r="30" fill="#1b1720" stroke="var(--gold)" strokeWidth="4" />
        <circle cx="480" cy="337" r="30" fill="#1b1720" stroke="var(--gold)" strokeWidth="4" />
        <circle cx="320" cy="337" r="8" fill="var(--pink)" />
        <circle cx="480" cy="337" r="8" fill="var(--teal)" />
        <rect x="369" y="311" width="62" height="48" rx="5" fill="var(--teal)" stroke="var(--gold)" strokeWidth="3" />
        <path d="M376 335h48" stroke="var(--pink)" strokeDasharray="6 5" strokeWidth="4" />
      </g>

      <g fill="var(--gold)" stroke="var(--ink)" strokeWidth="2">
        <path d="m220 112 4 12 12 4-12 4-4 12-4-12-12-4 12-4z" />
        <path d="m584 91 4 12 12 4-12 4-4 12-4-12-12-4 12-4z" />
        <path d="m387 165 3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
      </g>
    </svg>
  );
}
