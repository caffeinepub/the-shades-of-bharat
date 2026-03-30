// Unique cultural SVG logos for each Indian state/UT
// Style: clean white line-art folk symbols, inspired by Made-in-Bengal logo aesthetic

interface StateLogoProps {
  state: string;
  size?: number;
  color?: string;
}

export function StateLogo({
  state,
  size = 48,
  color = "white",
}: StateLogoProps) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    "aria-hidden": true as const,
  };
  const s = color;

  switch (state) {
    case "Andhra Pradesh":
      // Kalamkari peacock
      return (
        <svg {...props}>
          <title>{state}</title>
          <circle
            cx="24"
            cy="28"
            r="7"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="24"
            cy="28"
            r="3"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M24 21 C24 21 18 12 14 10 C18 14 20 20 24 21Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M24 21 C24 21 26 11 30 10 C28 14 26 20 24 21Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M24 21 C24 21 15 15 12 18 C16 16 21 20 24 21Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M24 21 C24 21 33 15 36 18 C32 16 27 20 24 21Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle
            cx="14"
            cy="10"
            r="2"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle
            cx="30"
            cy="10"
            r="2"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle
            cx="12"
            cy="18"
            r="2"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle
            cx="36"
            cy="18"
            r="2"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path d="M22 35 L22 42 M26 35 L26 42" stroke={s} strokeWidth="1.5" />
        </svg>
      );

    case "Arunachal Pradesh":
      // Bamboo shoots rising from earth
      return (
        <svg {...props}>
          <title>{state}</title>
          <path d="M24 40 L24 10" stroke={s} strokeWidth="2" />
          <path d="M18 40 L18 16" stroke={s} strokeWidth="2" />
          <path d="M30 40 L30 16" stroke={s} strokeWidth="2" />
          <path
            d="M24 10 C24 10 20 6 16 8"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M24 10 C24 10 28 6 32 8"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M18 16 C18 16 14 12 10 14"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M30 16 C30 16 34 12 38 14"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M24 22 C22 22 22 22 24 20 C26 22 26 22 24 22Z"
            stroke={s}
            strokeWidth="1"
            fill={s}
            opacity="0.6"
          />
          <path
            d="M18 26 C16 26 16 26 18 24 C20 26 20 26 18 26Z"
            stroke={s}
            strokeWidth="1"
            fill={s}
            opacity="0.6"
          />
          <path
            d="M30 26 C28 26 28 26 30 24 C32 26 32 26 30 26Z"
            stroke={s}
            strokeWidth="1"
            fill={s}
            opacity="0.6"
          />
          <path d="M10 40 L38 40" stroke={s} strokeWidth="1.5" />
        </svg>
      );

    case "Assam":
      // One-horned rhinoceros + Bihu dhol drum
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Rhino body */}
          <ellipse
            cx="24"
            cy="30"
            rx="13"
            ry="8"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Head */}
          <ellipse
            cx="35"
            cy="26"
            rx="6"
            ry="5"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Horn */}
          <path
            d="M38 22 L42 16"
            stroke={s}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Legs */}
          <path
            d="M16 37 L14 44 M20 38 L19 44 M28 38 L27 44 M32 37 L34 44"
            stroke={s}
            strokeWidth="1.5"
          />
          {/* Ear */}
          <path
            d="M32 22 C33 19 36 19 36 22"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Eye */}
          <circle cx="37" cy="25" r="1" fill={s} />
          {/* Tail */}
          <path
            d="M11 28 C8 26 8 30 11 30"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      );

    case "Bihar":
      // Madhubani lotus with fish
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Lotus petals */}
          <path
            d="M24 32 C20 28 18 22 24 16 C30 22 28 28 24 32Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M24 32 C16 30 12 24 16 18 C20 22 21 28 24 32Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M24 32 C32 30 36 24 32 18 C28 22 27 28 24 32Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M24 32 C14 32 10 26 14 22 C17 25 21 30 24 32Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M24 32 C34 32 38 26 34 22 C31 25 27 30 24 32Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Fish */}
          <ellipse
            cx="24"
            cy="40"
            rx="5"
            ry="2.5"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path d="M19 40 L15 38 M19 40 L15 42" stroke={s} strokeWidth="1.2" />
          <circle cx="26" cy="40" r="0.8" fill={s} />
          {/* Geometric grid lines */}
          <path
            d="M10 10 L38 10 M10 14 L38 14"
            stroke={s}
            strokeWidth="0.8"
            opacity="0.5"
          />
        </svg>
      );

    case "Chhattisgarh":
      // Dokra dancing figure with dots
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Body */}
          <circle
            cx="24"
            cy="12"
            r="4"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M24 16 L24 28" stroke={s} strokeWidth="2" />
          {/* Arms raised in dance */}
          <path d="M24 20 L14 14 L10 16" stroke={s} strokeWidth="1.5" />
          <path d="M24 20 L34 14 L38 16" stroke={s} strokeWidth="1.5" />
          {/* Legs */}
          <path d="M24 28 L18 38 L14 42" stroke={s} strokeWidth="1.5" />
          <path d="M24 28 L30 38 L34 42" stroke={s} strokeWidth="1.5" />
          {/* Dot stipple around figure */}
          <circle cx="10" cy="10" r="1.2" fill={s} opacity="0.7" />
          <circle cx="38" cy="10" r="1.2" fill={s} opacity="0.7" />
          <circle cx="8" cy="30" r="1.2" fill={s} opacity="0.7" />
          <circle cx="40" cy="30" r="1.2" fill={s} opacity="0.7" />
          <circle cx="10" cy="42" r="1.2" fill={s} opacity="0.7" />
          <circle cx="38" cy="42" r="1.2" fill={s} opacity="0.7" />
          <circle cx="16" cy="8" r="1" fill={s} opacity="0.5" />
          <circle cx="32" cy="8" r="1" fill={s} opacity="0.5" />
        </svg>
      );

    case "Goa":
      // Azulejo tile pattern + palm tree
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Palm tree */}
          <path d="M24 42 L24 20" stroke={s} strokeWidth="2" />
          <path
            d="M24 20 C24 20 16 12 10 14 C14 18 20 20 24 20Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M24 20 C24 20 32 12 38 14 C34 18 28 20 24 20Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M24 22 C24 22 16 18 12 20 C16 22 21 22 24 22Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M24 22 C24 22 32 18 36 20 C32 22 27 22 24 22Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Tile border */}
          <rect
            x="8"
            y="8"
            width="14"
            height="14"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M8 8 L22 22 M22 8 L8 22"
            stroke={s}
            strokeWidth="0.8"
            opacity="0.7"
          />
          <circle
            cx="15"
            cy="15"
            r="3"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
        </svg>
      );

    case "Gujarat":
      // Kutch mirror embroidery hexagon
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Central hexagon */}
          <polygon
            points="24,10 34,16 34,28 24,34 14,28 14,16"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Inner circle with mirror */}
          <circle
            cx="24"
            cy="22"
            r="6"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="24"
            cy="22"
            r="2.5"
            stroke={s}
            strokeWidth="1"
            fill={s}
            opacity="0.8"
          />
          {/* Corner flowers */}
          <circle
            cx="24"
            cy="10"
            r="2"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="34"
            cy="16"
            r="2"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="34"
            cy="28"
            r="2"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="24"
            cy="34"
            r="2"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="14"
            cy="28"
            r="2"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="14"
            cy="16"
            r="2"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          {/* Decorative lines from center */}
          <path
            d="M24 16 L24 12 M30 19 L33 17 M30 25 L33 27 M24 28 L24 32 M18 25 L15 27 M18 19 L15 17"
            stroke={s}
            strokeWidth="1"
          />
          {/* Bandhani dots */}
          <circle cx="24" cy="40" r="1.5" fill={s} opacity="0.7" />
          <circle cx="18" cy="40" r="1.5" fill={s} opacity="0.7" />
          <circle cx="30" cy="40" r="1.5" fill={s} opacity="0.7" />
        </svg>
      );

    case "Haryana":
      // Phulkari flower lattice
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Diamond lattice */}
          <path
            d="M24 8 L38 22 L24 36 L10 22 Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M24 14 L32 22 L24 30 L16 22 Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Center flower */}
          <circle
            cx="24"
            cy="22"
            r="3"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Petals */}
          <ellipse
            cx="24"
            cy="16"
            rx="2"
            ry="3"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <ellipse
            cx="30"
            cy="22"
            rx="3"
            ry="2"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <ellipse
            cx="24"
            cy="28"
            rx="2"
            ry="3"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <ellipse
            cx="18"
            cy="22"
            rx="3"
            ry="2"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          {/* Corner dots */}
          <circle cx="24" cy="8" r="1.5" fill={s} />
          <circle cx="38" cy="22" r="1.5" fill={s} />
          <circle cx="24" cy="36" r="1.5" fill={s} />
          <circle cx="10" cy="22" r="1.5" fill={s} />
          {/* Wheat stalks at bottom */}
          <path
            d="M18 42 L18 36 M24 43 L24 37 M30 42 L30 36"
            stroke={s}
            strokeWidth="1.2"
          />
          <path
            d="M16 36 L18 38 L20 36"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M22 37 L24 39 L26 37"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M28 36 L30 38 L32 36"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
        </svg>
      );

    case "Himachal Pradesh":
      // Kullu shawl zigzag + mountain peak
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Mountain */}
          <path
            d="M24 8 L36 30 L12 30 Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M24 8 L28 16 L20 16 Z"
            stroke={s}
            strokeWidth="1"
            fill={s}
            opacity="0.4"
          />
          {/* Snow cap line */}
          <path d="M20 16 L28 16" stroke={s} strokeWidth="1.2" />
          {/* Kullu zigzag band */}
          <path
            d="M10 34 L14 30 L18 34 L22 30 L26 34 L30 30 L34 34 L38 30"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M10 38 L14 34 L18 38 L22 34 L26 38 L30 34 L34 38 L38 34"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Star at peak */}
          <circle cx="24" cy="8" r="1.5" fill={s} />
        </svg>
      );

    case "Jharkhand":
      // Sohrai folk tree with birds
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Tree trunk */}
          <path d="M24 42 L24 26" stroke={s} strokeWidth="2" />
          {/* Branches */}
          <path d="M24 26 L16 18" stroke={s} strokeWidth="1.5" />
          <path d="M24 26 L32 18" stroke={s} strokeWidth="1.5" />
          <path d="M24 30 L14 24" stroke={s} strokeWidth="1.5" />
          <path d="M24 30 L34 24" stroke={s} strokeWidth="1.5" />
          {/* Leaves as simple circles */}
          <circle
            cx="14"
            cy="16"
            r="4"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle
            cx="34"
            cy="16"
            r="4"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle
            cx="10"
            cy="22"
            r="3"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle
            cx="38"
            cy="22"
            r="3"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle
            cx="24"
            cy="14"
            r="4"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Birds */}
          <path
            d="M10 10 C12 8 14 9 16 8"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M32 10 C34 8 36 9 38 8"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Flowers */}
          <circle cx="14" cy="16" r="1.5" fill={s} opacity="0.6" />
          <circle cx="34" cy="16" r="1.5" fill={s} opacity="0.6" />
        </svg>
      );

    case "Karnataka":
      // Mysore palace arch with Chennapatna toy
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Palace arch */}
          <path
            d="M12 38 L12 22 C12 14 36 14 36 22 L36 38"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Inner arch detail */}
          <path
            d="M16 38 L16 24 C16 18 32 18 32 24 L32 38"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          {/* Onion dome */}
          <path
            d="M24 14 C20 10 18 6 24 4 C30 6 28 10 24 14Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Small domes */}
          <path
            d="M12 22 C10 18 8 15 12 13 C16 15 14 18 12 22Z"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M36 22 C34 18 32 15 36 13 C40 15 38 18 36 22Z"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          {/* Toy circle at base */}
          <circle
            cx="24"
            cy="38"
            r="3"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle cx="24" cy="38" r="1" fill={s} />
        </svg>
      );

    case "Kerala":
      // Kathakali face / snake boat
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Snake boat */}
          <path
            d="M8 28 C8 28 16 22 24 22 C32 22 40 28 40 28 C40 28 32 30 24 30 C16 30 8 28 8 28Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Boat tail curl */}
          <path
            d="M8 28 C6 26 8 22 10 24"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Rowers */}
          <path
            d="M16 22 L14 16 M20 22 L18 16 M24 22 L22 16 M28 22 L26 16 M32 22 L30 16"
            stroke={s}
            strokeWidth="1"
          />
          {/* Oars */}
          <path
            d="M14 16 L10 12 M18 16 L14 12 M22 16 L18 12 M26 16 L22 12 M30 16 L26 12"
            stroke={s}
            strokeWidth="1"
          />
          {/* Coconut trees */}
          <path d="M6 38 L6 28" stroke={s} strokeWidth="1.5" />
          <path
            d="M6 28 C4 24 2 22 6 20 C8 22 8 26 6 28Z"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <path d="M42 38 L42 28" stroke={s} strokeWidth="1.5" />
          <path
            d="M42 28 C40 24 38 22 42 20 C44 22 44 26 42 28Z"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          {/* Waves */}
          <path
            d="M10 34 C12 32 14 34 16 32 C18 34 20 32 22 34 C24 32 26 34 28 32 C30 34 32 32 34 34"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
        </svg>
      );

    case "Madhya Pradesh":
      // Gond art tree with spirals
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Tree trunk */}
          <path
            d="M22 42 L22 28 C22 28 18 22 22 14 C26 22 30 28 26 28 L26 42"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Branches with Gond spirals */}
          <path
            d="M22 22 C16 18 10 20 8 16 C12 14 18 16 22 20"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M24 20 C30 16 36 18 38 14 C34 12 28 14 24 18"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Gond spiral dots */}
          <circle
            cx="8"
            cy="14"
            r="2.5"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="38"
            cy="12"
            r="2.5"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="22"
            cy="14"
            r="2"
            stroke={s}
            strokeWidth="1"
            fill={s}
            opacity="0.6"
          />
          {/* Peacock eye dots */}
          <circle cx="12" cy="22" r="1.5" fill={s} opacity="0.7" />
          <circle cx="36" cy="22" r="1.5" fill={s} opacity="0.7" />
          <circle cx="14" cy="30" r="1.5" fill={s} opacity="0.7" />
          <circle cx="34" cy="30" r="1.5" fill={s} opacity="0.7" />
          {/* Roots */}
          <path
            d="M22 42 C18 44 14 42 12 44 M26 42 C30 44 34 42 36 44"
            stroke={s}
            strokeWidth="1"
          />
        </svg>
      );

    case "Maharashtra":
      // Warli dance circle
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Circle of life */}
          <circle
            cx="24"
            cy="22"
            r="14"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Warli stick figures in circle */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = ((i * 60 - 90) * Math.PI) / 180;
            const x = 24 + 11 * Math.cos(angle);
            const y = 22 + 11 * Math.sin(angle);
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y - 2}
                  r="1.5"
                  stroke={s}
                  strokeWidth="1"
                  fill="none"
                />
                <line
                  x1={x}
                  y1={y}
                  x2={x}
                  y2={y + 4}
                  stroke={s}
                  strokeWidth="1"
                />
                <line
                  x1={x - 2}
                  y1={y + 2}
                  x2={x + 2}
                  y2={y + 2}
                  stroke={s}
                  strokeWidth="1"
                />
                <line
                  x1={x}
                  y1={y + 4}
                  x2={x - 2}
                  y2={y + 7}
                  stroke={s}
                  strokeWidth="1"
                />
                <line
                  x1={x}
                  y1={y + 4}
                  x2={x + 2}
                  y2={y + 7}
                  stroke={s}
                  strokeWidth="1"
                />
              </g>
            );
          })}
          {/* Central tree of life */}
          <path d="M24 16 L24 28" stroke={s} strokeWidth="1.2" />
          <path d="M24 20 L20 16 M24 20 L28 16" stroke={s} strokeWidth="1" />
          <path d="M24 22 L20 18 M24 22 L28 18" stroke={s} strokeWidth="1" />
        </svg>
      );

    case "Manipur":
      // Polo horse + Meitei textile
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Horse */}
          <ellipse
            cx="24"
            cy="26"
            rx="10"
            ry="7"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M32 22 C36 20 38 16 36 14"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="36"
            cy="13"
            r="3"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Mane */}
          <path
            d="M33 14 C33 12 35 10 36 10"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M34 16 C34 14 36 12 37 12"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Legs */}
          <path
            d="M18 32 L16 40 M22 33 L21 40 M26 33 L26 40 M30 32 L32 40"
            stroke={s}
            strokeWidth="1.5"
          />
          {/* Polo stick */}
          <path d="M10 10 L22 22" stroke={s} strokeWidth="1.5" />
          <path d="M10 10 L8 14" stroke={s} strokeWidth="1.5" />
          {/* Tail */}
          <path
            d="M14 24 C10 22 8 26 10 28"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      );

    case "Meghalaya":
      // Living root bridge + Khasi rain umbrella
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Umbrella */}
          <path
            d="M24 8 C12 8 10 18 10 18 L38 18 C38 18 36 8 24 8Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M15 18 C15 22 12 24 12 24" stroke={s} strokeWidth="1" />
          <path d="M24 18 L24 28" stroke={s} strokeWidth="1.5" />
          {/* Root bridge */}
          <path
            d="M8 32 C12 28 20 30 24 30 C28 30 36 28 40 32"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Roots/cables */}
          <path d="M8 30 C10 34 12 36 14 36" stroke={s} strokeWidth="1" />
          <path d="M40 30 C38 34 36 36 34 36" stroke={s} strokeWidth="1" />
          <path
            d="M14 28 L12 36 M18 30 L16 38 M24 30 L24 38 M30 30 L32 38 M34 28 L36 36"
            stroke={s}
            strokeWidth="0.8"
          />
          {/* Trees on sides */}
          <path d="M8 32 L8 44 M40 32 L40 44" stroke={s} strokeWidth="1.5" />
        </svg>
      );

    case "Mizoram":
      // Bamboo dance (Cheraw)
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Bamboo poles horizontal */}
          <path d="M6 26 L42 26" stroke={s} strokeWidth="2.5" />
          <path d="M6 34 L42 34" stroke={s} strokeWidth="2.5" />
          {/* Bamboo nodes */}
          <line x1="16" y1="24" x2="16" y2="28" stroke={s} strokeWidth="1.5" />
          <line x1="26" y1="24" x2="26" y2="28" stroke={s} strokeWidth="1.5" />
          <line x1="36" y1="24" x2="36" y2="28" stroke={s} strokeWidth="1.5" />
          <line x1="16" y1="32" x2="16" y2="36" stroke={s} strokeWidth="1.5" />
          <line x1="26" y1="32" x2="26" y2="36" stroke={s} strokeWidth="1.5" />
          <line x1="36" y1="32" x2="36" y2="36" stroke={s} strokeWidth="1.5" />
          {/* Dancer */}
          <circle
            cx="24"
            cy="14"
            r="3.5"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M24 18 L24 26" stroke={s} strokeWidth="1.5" />
          <path d="M16 22 L24 22 L32 22" stroke={s} strokeWidth="1.5" />
          <path d="M24 26 L20 30 M24 26 L28 30" stroke={s} strokeWidth="1.5" />
          {/* Traditional zigzag on body */}
          <path
            d="M20 20 L22 22 L20 24"
            stroke={s}
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M28 20 L26 22 L28 24"
            stroke={s}
            strokeWidth="0.8"
            fill="none"
          />
        </svg>
      );

    case "Nagaland":
      // Warrior with Naga tribal horn & diamond pattern
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Head */}
          <circle
            cx="24"
            cy="10"
            r="4"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Traditional Naga horn headdress */}
          <path
            d="M20 8 C16 4 14 2 18 4"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M28 8 C32 4 34 2 30 4"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Body with tribal pattern */}
          <path d="M24 14 L24 30" stroke={s} strokeWidth="2" />
          <path d="M14 20 L24 18 L34 20" stroke={s} strokeWidth="1.5" />
          {/* Diamond chest pattern */}
          <path
            d="M20 20 L24 16 L28 20 L24 24 Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Legs */}
          <path d="M24 30 L18 40 M24 30 L30 40" stroke={s} strokeWidth="1.5" />
          {/* Spear */}
          <path d="M36 6 L36 38" stroke={s} strokeWidth="1.5" />
          <path
            d="M33 8 L36 6 L39 8"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Tribal dots */}
          <circle cx="10" cy="16" r="1.2" fill={s} opacity="0.7" />
          <circle cx="10" cy="24" r="1.2" fill={s} opacity="0.7" />
          <circle cx="10" cy="32" r="1.2" fill={s} opacity="0.7" />
        </svg>
      );

    case "Odisha":
      // Sun temple wheel (Konark)
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Outer wheel */}
          <circle
            cx="24"
            cy="24"
            r="16"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Inner circle */}
          <circle
            cx="24"
            cy="24"
            r="8"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Hub */}
          <circle
            cx="24"
            cy="24"
            r="3"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Spokes */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i * 45 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={24 + 8 * Math.cos(angle)}
                y1={24 + 8 * Math.sin(angle)}
                x2={24 + 16 * Math.cos(angle)}
                y2={24 + 16 * Math.sin(angle)}
                stroke={s}
                strokeWidth="1.2"
              />
            );
          })}
          {/* Decorative beads on rim */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <circle
                key={i}
                cx={24 + 16 * Math.cos(angle)}
                cy={24 + 16 * Math.sin(angle)}
                r="1.2"
                fill={s}
                opacity="0.7"
              />
            );
          })}
        </svg>
      );

    case "Punjab":
      // Phulkari flower + wheat stalk
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Big Phulkari flower */}
          <circle
            cx="24"
            cy="20"
            r="4"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i * 45 * Math.PI) / 180;
            return (
              <ellipse
                key={i}
                cx={24 + 7 * Math.cos(angle)}
                cy={20 + 7 * Math.sin(angle)}
                rx="2.5"
                ry="1.5"
                transform={`rotate(${i * 45}, ${24 + 7 * Math.cos(angle)}, ${20 + 7 * Math.sin(angle)})`}
                stroke={s}
                strokeWidth="1.2"
                fill="none"
              />
            );
          })}
          <circle cx="24" cy="20" r="1.5" fill={s} />
          {/* Wheat stalks */}
          <path
            d="M18 44 L18 32 M24 44 L24 32 M30 44 L30 32"
            stroke={s}
            strokeWidth="1.5"
          />
          <path
            d="M16 32 C17 30 18 30 19 32"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M22 32 C23 30 24 30 25 32"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M28 32 C29 30 30 30 31 32"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      );

    case "Rajasthan":
      // Camel + Rajput arch
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Arch */}
          <path
            d="M10 38 L10 24 C10 14 38 14 38 24 L38 38"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Camel */}
          <ellipse
            cx="24"
            cy="28"
            rx="8"
            ry="5"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Hump */}
          <path
            d="M20 23 C20 18 28 18 28 23"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Head & neck */}
          <path d="M30 24 C32 20 34 20 34 16" stroke={s} strokeWidth="1.2" />
          <circle
            cx="34"
            cy="14"
            r="2.5"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Legs */}
          <path
            d="M18 33 L17 40 M22 33 L22 40 M26 33 L26 40 M30 33 L31 40"
            stroke={s}
            strokeWidth="1.2"
          />
          {/* Stars on arch */}
          <circle cx="24" cy="14" r="1.5" fill={s} />
          <circle cx="16" cy="18" r="1" fill={s} opacity="0.7" />
          <circle cx="32" cy="18" r="1" fill={s} opacity="0.7" />
        </svg>
      );

    case "Sikkim":
      // Prayer flags + Kanchenjunga
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Mountain */}
          <path
            d="M24 10 L38 32 L10 32 Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M24 10 L30 20 L18 20 Z"
            stroke={s}
            strokeWidth="1"
            fill={s}
            opacity="0.3"
          />
          {/* Prayer flag string */}
          <path d="M6 16 L42 16" stroke={s} strokeWidth="1" />
          {/* Flags */}
          {[8, 15, 22, 29, 36].map((x) => (
            <rect
              key={x}
              x={x}
              y={10}
              width="5"
              height="4"
              stroke={s}
              strokeWidth="0.8"
              fill="none"
            />
          ))}
          {/* Stupa base */}
          <path
            d="M14 32 L34 32 L32 38 L16 38 Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M18 38 L30 38 L28 42 L20 42 Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Spire */}
          <path d="M24 32 L24 26" stroke={s} strokeWidth="1" />
          <circle cx="24" cy="25" r="1.5" stroke={s} strokeWidth="1" />
        </svg>
      );

    case "Tamil Nadu":
      // Kolam dot pattern + Bharatanatyam dancer
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Kolam dots and connecting lines */}
          {[
            [12, 10],
            [20, 10],
            [28, 10],
            [36, 10],
            [16, 16],
            [24, 16],
            [32, 16],
            [12, 22],
            [20, 22],
            [28, 22],
            [36, 22],
          ].map(([cx, cy]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="1.2"
              fill={s}
              opacity="0.7"
            />
          ))}
          <path
            d="M12 10 L36 10 M16 16 L32 16 M12 22 L36 22"
            stroke={s}
            strokeWidth="0.8"
            opacity="0.5"
          />
          <path
            d="M12 10 L12 22 M20 10 L16 16 L20 22 M28 10 L32 16 L28 22 M36 10 L36 22"
            stroke={s}
            strokeWidth="0.8"
            opacity="0.5"
          />
          {/* Bharatanatyam dancer */}
          <circle
            cx="24"
            cy="30"
            r="3"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M24 33 L24 38" stroke={s} strokeWidth="1.5" />
          <path d="M16 34 L24 36 L32 34" stroke={s} strokeWidth="1.5" />
          <path d="M24 38 L20 44 M24 38 L28 44" stroke={s} strokeWidth="1.5" />
          {/* Raised arm with mudra */}
          <path d="M32 34 L36 30 L38 26" stroke={s} strokeWidth="1.2" />
          <path d="M16 34 L12 30 L10 26" stroke={s} strokeWidth="1.2" />
        </svg>
      );

    case "Telangana":
      // Bidriware flower + Kakatiya star
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Kakatiya star (8-pointed) */}
          <path
            d="M24 8 L26 18 L36 16 L28 22 L36 30 L26 26 L24 36 L22 26 L12 30 L20 22 L12 16 L22 18 Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Center circle */}
          <circle
            cx="24"
            cy="22"
            r="5"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="24" cy="22" r="2" fill={s} opacity="0.6" />
          {/* Bidri dots */}
          <circle cx="24" cy="8" r="1.5" fill={s} />
          <circle cx="36" cy="16" r="1.5" fill={s} />
          <circle cx="36" cy="30" r="1.5" fill={s} />
          <circle cx="24" cy="36" r="1.5" fill={s} />
          <circle cx="12" cy="30" r="1.5" fill={s} />
          <circle cx="12" cy="16" r="1.5" fill={s} />
        </svg>
      );

    case "Tripura":
      // Bamboo craft + tribal weave
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Bamboo basket weave */}
          <rect
            x="10"
            y="16"
            width="28"
            height="22"
            rx="2"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Weave pattern */}
          <path
            d="M10 20 L38 20 M10 24 L38 24 M10 28 L38 28 M10 32 L38 32"
            stroke={s}
            strokeWidth="0.8"
            opacity="0.6"
          />
          <path
            d="M14 16 L14 38 M18 16 L18 38 M22 16 L22 38 M26 16 L26 38 M30 16 L30 38 M34 16 L34 38"
            stroke={s}
            strokeWidth="0.8"
            opacity="0.6"
          />
          {/* Handle */}
          <path
            d="M16 16 C16 10 32 10 32 16"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Tribal diamond on basket */}
          <path
            d="M24 20 L28 24 L24 28 L20 24 Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Bamboo shoots */}
          <path d="M6 10 L6 14" stroke={s} strokeWidth="2" />
          <path
            d="M6 10 C4 8 4 6 6 6 C8 6 8 8 6 10Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path d="M42 10 L42 14" stroke={s} strokeWidth="2" />
          <path
            d="M42 10 C40 8 40 6 42 6 C44 6 44 8 42 10Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      );

    case "Uttar Pradesh":
      // Taj Mahal dome + Banarasi brocade
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Taj dome */}
          <path
            d="M24 8 C18 8 14 14 14 20 L34 20 C34 14 30 8 24 8Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Finial */}
          <path d="M24 4 L24 8" stroke={s} strokeWidth="1.5" />
          <circle cx="24" cy="4" r="1.5" fill={s} />
          {/* Main building */}
          <rect
            x="12"
            y="20"
            width="24"
            height="14"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Arched entrance */}
          <path
            d="M20 34 L20 26 C20 22 28 22 28 26 L28 34"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Minarets */}
          <rect
            x="6"
            y="22"
            width="5"
            height="12"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M6 22 C6 18 11 18 11 22"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <rect
            x="37"
            y="22"
            width="5"
            height="12"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M37 22 C37 18 42 18 42 22"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          {/* Reflection pool */}
          <path d="M12 38 L36 38" stroke={s} strokeWidth="1.5" />
          <path d="M14 40 L34 40" stroke={s} strokeWidth="1" opacity="0.6" />
          <path d="M16 42 L32 42" stroke={s} strokeWidth="0.8" opacity="0.4" />
        </svg>
      );

    case "Uttarakhand":
      // Temple with mountain + woodcraft
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Mountain backdrop */}
          <path
            d="M6 30 L16 14 L24 22 L32 10 L42 30"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
            opacity="0.5"
          />
          {/* Temple */}
          <path
            d="M24 8 L30 18 L18 18 Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <rect
            x="16"
            y="18"
            width="16"
            height="14"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Temple door */}
          <path
            d="M21 32 L21 24 C21 21 27 21 27 24 L27 32"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Temple flag */}
          <path d="M24 8 L24 4" stroke={s} strokeWidth="1" />
          <path d="M24 4 L28 6 L24 8" stroke={s} strokeWidth="1" fill="none" />
          {/* Wood carving flower */}
          <circle
            cx="24"
            cy="26"
            r="3"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Lotus steps */}
          <path
            d="M12 32 L36 32 L38 36 L10 36 Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M14 36 L34 36 L36 40 L12 40 Z"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
        </svg>
      );

    case "West Bengal":
      // Pattachitra chariot wheel + conch
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Chariot wheel */}
          <circle
            cx="22"
            cy="24"
            r="14"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="22"
            cy="24"
            r="6"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle cx="22" cy="24" r="2" fill={s} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i * 45 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={22 + 6 * Math.cos(angle)}
                y1={24 + 6 * Math.sin(angle)}
                x2={22 + 14 * Math.cos(angle)}
                y2={24 + 14 * Math.sin(angle)}
                stroke={s}
                strokeWidth="1.2"
              />
            );
          })}
          {/* Conch */}
          <path
            d="M36 12 C40 14 42 20 40 24 C38 28 34 28 32 26 C30 24 32 20 36 20 C38 20 38 22 36 24"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M32 26 L28 32" stroke={s} strokeWidth="1.2" />
        </svg>
      );

    // UNION TERRITORIES
    case "Delhi":
      // Red Fort arch
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Main gate */}
          <path
            d="M10 38 L10 22 C10 12 38 12 38 22 L38 38"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Inner arch */}
          <path
            d="M16 38 L16 26 C16 18 32 18 32 26 L32 38"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Chhatris on top */}
          <path
            d="M10 22 C8 18 6 16 10 14 C14 16 12 18 10 22Z"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M38 22 C36 18 34 16 38 14 C42 16 40 18 38 22Z"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          {/* Battlements */}
          <path
            d="M10 14 L12 12 L14 14 L16 12 L18 14 L20 12 L22 14 L24 12 L26 14 L28 12 L30 14 L32 12 L34 14 L36 12 L38 14"
            stroke={s}
            strokeWidth="1"
          />
          {/* National flag pole */}
          <path d="M24 12 L24 6" stroke={s} strokeWidth="1" />
          <path
            d="M24 6 L28 8 L24 10"
            stroke={s}
            strokeWidth="0.8"
            fill="none"
          />
        </svg>
      );

    case "Jammu & Kashmir":
      // Chinar leaf + Pashmina weave
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Chinar leaf */}
          <path
            d="M24 8 C24 8 14 14 12 22 C14 30 20 32 24 38"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M24 8 C24 8 34 14 36 22 C34 30 28 32 24 38"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Leaf veins */}
          <path d="M24 8 L24 38" stroke={s} strokeWidth="1" />
          <path d="M24 14 L16 20 M24 14 L32 20" stroke={s} strokeWidth="0.8" />
          <path d="M24 20 L14 26 M24 20 L34 26" stroke={s} strokeWidth="0.8" />
          <path d="M24 26 L16 32 M24 26 L32 32" stroke={s} strokeWidth="0.8" />
          {/* Snowflake */}
          <path
            d="M6 10 L10 10 M8 8 L8 12 M7 9 L9 11 M9 9 L7 11"
            stroke={s}
            strokeWidth="1"
          />
          {/* Paisley motif */}
          <path
            d="M36 32 C40 28 42 22 38 20 C36 24 36 28 36 32Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle cx="37" cy="28" r="1.5" fill={s} opacity="0.7" />
        </svg>
      );

    case "Ladakh":
      // Buddhist stupa + snowflake
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Stupa */}
          <path
            d="M24 8 L26 16 L22 16 Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle
            cx="24"
            cy="19"
            r="4"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <rect
            x="18"
            y="23"
            width="12"
            height="6"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M14 29 L34 29 L36 34 L12 34 Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M10 34 L38 34 L40 38 L8 38 Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Prayer flags */}
          <path d="M24 8 L8 14" stroke={s} strokeWidth="0.8" opacity="0.7" />
          <path d="M24 8 L40 14" stroke={s} strokeWidth="0.8" opacity="0.7" />
          {[10, 14, 18, 22, 26, 30, 34, 38].map((x) => (
            <rect
              key={x}
              x={x}
              y={12}
              width="3"
              height="2"
              stroke={s}
              strokeWidth="0.6"
              fill="none"
            />
          ))}
          {/* Mountain */}
          <path
            d="M6 38 L14 28 L22 34"
            stroke={s}
            strokeWidth="1"
            opacity="0.5"
          />
          <path
            d="M26 34 L34 26 L42 38"
            stroke={s}
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      );

    case "Puducherry":
      // French colonial arch + jasmine flower
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* French window/arch */}
          <path
            d="M14 38 L14 18 C14 10 34 10 34 18 L34 38"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Window panes */}
          <path d="M14 28 L34 28" stroke={s} strokeWidth="1" />
          <path d="M24 18 L24 38" stroke={s} strokeWidth="1" />
          {/* Fleur decoration */}
          <circle
            cx="24"
            cy="14"
            r="3"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M21 14 L18 10 M27 14 L30 10 M24 11 L24 8"
            stroke={s}
            strokeWidth="1"
          />
          {/* Jasmine flowers */}
          <circle
            cx="10"
            cy="30"
            r="3"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle cx="10" cy="30" r="1" fill={s} opacity="0.7" />
          <circle
            cx="38"
            cy="30"
            r="3"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle cx="38" cy="30" r="1" fill={s} opacity="0.7" />
          {/* Steps */}
          <path
            d="M10 38 L38 38 L40 42 L8 42"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      );

    case "Chandigarh":
      // Open Hand monument
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Hand */}
          <path
            d="M24 38 L18 24 C16 18 20 14 24 18 C28 14 32 18 30 24 Z"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Fingers */}
          <path
            d="M20 22 C18 16 16 12 18 10 C20 14 22 18 20 22"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M24 20 C24 14 22 10 24 8 C26 10 26 14 24 20"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M28 22 C30 16 32 12 30 10 C28 14 26 18 28 22"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M18 26 C14 22 12 18 14 16"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Pole */}
          <path d="M24 38 L24 46" stroke={s} strokeWidth="2" />
          {/* Wind lines */}
          <path
            d="M30 20 C34 18 36 20 38 18"
            stroke={s}
            strokeWidth="1"
            opacity="0.6"
          />
          <path
            d="M30 24 C36 22 38 24 42 22"
            stroke={s}
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>
      );

    case "Andaman & Nicobar Islands":
      // Shell + outrigger boat
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Conch/spiral shell */}
          <path
            d="M24 8 C32 8 38 14 38 22 C38 30 32 36 24 36 C20 36 18 34 18 30 C18 26 20 24 24 24 C26 24 27 25 27 27 C27 29 26 30 24 30"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Boat */}
          <path
            d="M8 40 C10 36 16 34 24 34 C32 34 38 36 40 40 C32 42 16 42 8 40Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Sail */}
          <path d="M24 34 L24 22" stroke={s} strokeWidth="1.2" />
          <path d="M24 22 L14 34 Z" stroke={s} strokeWidth="1" />
          {/* Waves */}
          <path
            d="M6 44 C8 42 10 44 12 42 C14 44 16 42 18 44"
            stroke={s}
            strokeWidth="0.8"
            opacity="0.7"
          />
        </svg>
      );

    case "Lakshadweep":
      // Coral + coconut palm + boat
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Coconut palm */}
          <path d="M24 42 L24 20" stroke={s} strokeWidth="2" />
          <path
            d="M24 20 C22 14 16 12 12 14 C16 16 20 18 24 20Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M24 20 C26 14 32 12 36 14 C32 16 28 18 24 20Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M24 22 C22 18 14 16 12 18 C16 20 21 22 24 22Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Coconut */}
          <circle cx="22" cy="21" r="2.5" stroke={s} strokeWidth="1" />
          {/* Coral */}
          <path
            d="M8 42 L8 34 M8 38 L5 34 M8 36 L11 32"
            stroke={s}
            strokeWidth="1.5"
          />
          <path
            d="M38 42 L38 34 M38 38 L35 32 M38 36 L41 30"
            stroke={s}
            strokeWidth="1.5"
          />
          {/* Water */}
          <path
            d="M6 42 C10 40 14 42 18 40 C22 42 26 40 30 42 C34 40 38 42 42 40"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
        </svg>
      );

    case "Dadra & Nagar Haveli and Daman & Diu":
    case "Dadra and Nagar Haveli":
    case "Daman and Diu":
      // Lighthouse + tribal pottery
      return (
        <svg {...props}>
          <title>{state}</title>
          {/* Lighthouse */}
          <path
            d="M20 42 L20 20 L28 20 L28 42"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Tower top */}
          <path
            d="M18 20 L30 20 L30 16 L18 16 Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M19 16 L29 16 L26 12 L22 12 Z"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle
            cx="24"
            cy="10"
            r="2"
            stroke={s}
            strokeWidth="1.2"
            fill={s}
            opacity="0.8"
          />
          {/* Light rays */}
          <path
            d="M30 14 L38 10 M30 16 L40 16 M30 18 L38 22"
            stroke={s}
            strokeWidth="1"
            opacity="0.7"
          />
          {/* Stripes */}
          <path
            d="M20 26 L28 26 M20 32 L28 32 M20 38 L28 38"
            stroke={s}
            strokeWidth="1"
          />
          {/* Waves */}
          <path
            d="M10 42 C12 40 14 42 16 40 C18 42 20 40 22 42 C24 40 26 42 28 40 C30 42 32 40 34 42 C36 40 38 42 40 40"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
        </svg>
      );

    default:
      // Generic mandala fallback
      return (
        <svg {...props}>
          <title>{state}</title>
          <circle
            cx="24"
            cy="24"
            r="14"
            stroke={s}
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="24"
            cy="24"
            r="8"
            stroke={s}
            strokeWidth="1.2"
            fill="none"
          />
          <circle
            cx="24"
            cy="24"
            r="3"
            stroke={s}
            strokeWidth="1"
            fill="none"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line
                key={angle}
                x1={24 + 8 * Math.cos(rad)}
                y1={24 + 8 * Math.sin(rad)}
                x2={24 + 14 * Math.cos(rad)}
                y2={24 + 14 * Math.sin(rad)}
                stroke={s}
                strokeWidth="1.2"
              />
            );
          })}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <circle
                key={angle}
                cx={24 + 14 * Math.cos(rad)}
                cy={24 + 14 * Math.sin(rad)}
                r="1.5"
                fill={s}
                opacity="0.7"
              />
            );
          })}
        </svg>
      );
  }
}
