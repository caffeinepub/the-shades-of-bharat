// Decorative Indian motif SVG components

export function PaisleyMotif({
  className = "",
  color = "#E09A2B",
  size = 80,
}: { className?: string; color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <title>Paisley motif</title>
      <path
        d="M40 10 C50 10 65 20 65 35 C65 50 55 60 42 62 C35 63 28 58 26 52 C22 44 26 34 33 30 C28 26 24 18 28 14 C31 11 36 10 40 10Z"
        fill={color}
        opacity="0.85"
      />
      <circle cx="38" cy="42" r="6" fill="white" opacity="0.6" />
      <path
        d="M38 15 C42 18 46 24 44 30 C42 36 36 38 32 35"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <circle cx="40" cy="42" r="2" fill={color} opacity="0.9" />
    </svg>
  );
}

export function RangoliMotif({
  className = "",
  size = 100,
}: { className?: string; size?: number }) {
  const colors = ["#E09A2B", "#B4492E", "#0E6F66", "#2C2E73", "#D8A62A"];
  const angles = [0, 45, 90, 135];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <title>Rangoli motif</title>
      {angles.map((angle, i) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <ellipse
            cx="50"
            cy="20"
            rx="6"
            ry="16"
            fill={colors[i % colors.length]}
            opacity="0.8"
          />
          <ellipse
            cx="50"
            cy="80"
            rx="6"
            ry="16"
            fill={colors[(i + 2) % colors.length]}
            opacity="0.8"
          />
        </g>
      ))}
      <circle cx="50" cy="50" r="12" fill="white" opacity="0.9" />
      <circle cx="50" cy="50" r="6" fill="#E09A2B" />
      <circle cx="50" cy="50" r="2" fill="white" />
    </svg>
  );
}

export function BlockPrintBorder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`block-print-border w-full ${className}`}
      aria-hidden="true"
    />
  );
}

export function LanternIcon({
  className = "",
  color = "#E09A2B",
}: { className?: string; color?: string }) {
  return (
    <svg
      width="24"
      height="36"
      viewBox="0 0 24 36"
      fill="none"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <title>Lantern</title>
      <line x1="12" y1="0" x2="12" y2="4" stroke={color} strokeWidth="2" />
      <path d="M6 4 H18 L20 28 H4 Z" fill={color} opacity="0.9" />
      <rect
        x="5"
        y="12"
        width="14"
        height="8"
        rx="2"
        fill="white"
        opacity="0.4"
      />
      <path d="M8 28 L6 34 M16 28 L18 34" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function StarRating({
  rating,
  max = 5,
  size = 16,
}: { rating: number; max?: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg
          // biome-ignore lint/suspicious/noArrayIndexKey: stable star position index
          key={i}
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill={i < rating ? "#E09A2B" : "none"}
          stroke={i < rating ? "#E09A2B" : "#ccc"}
          strokeWidth="1"
          aria-hidden="true"
          role="img"
        >
          <title>{i < rating ? "Filled star" : "Empty star"}</title>
          <path d="M8 1.5l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.7l4-.6z" />
        </svg>
      ))}
    </div>
  );
}

// ===== ETHNIC STATE BACKGROUND PATTERNS =====

export function StateEthnicPattern({
  pattern,
  size = 100,
}: {
  pattern: string;
  size?: number;
}) {
  const w = size;
  const h = size;
  const op = 0.22; // base opacity for all strokes/fills

  switch (pattern) {
    case "madhubani":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Grid lines */}
          <line
            x1="0"
            y1="25"
            x2={w}
            y2="25"
            stroke="white"
            strokeWidth="0.6"
            strokeOpacity={op}
          />
          <line
            x1="0"
            y1="50"
            x2={w}
            y2="50"
            stroke="white"
            strokeWidth="0.6"
            strokeOpacity={op}
          />
          <line
            x1="0"
            y1="75"
            x2={w}
            y2="75"
            stroke="white"
            strokeWidth="0.6"
            strokeOpacity={op}
          />
          <line
            x1="25"
            y1="0"
            x2="25"
            y2={h}
            stroke="white"
            strokeWidth="0.6"
            strokeOpacity={op}
          />
          <line
            x1="50"
            y1="0"
            x2="50"
            y2={h}
            stroke="white"
            strokeWidth="0.6"
            strokeOpacity={op}
          />
          <line
            x1="75"
            y1="0"
            x2="75"
            y2={h}
            stroke="white"
            strokeWidth="0.6"
            strokeOpacity={op}
          />
          {/* Central lotus */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <ellipse
              key={angle}
              cx={w * 0.5}
              cy={h * 0.5 - 10}
              rx="4"
              ry="10"
              fill="white"
              fillOpacity={op}
              transform={`rotate(${angle} ${w * 0.5} ${h * 0.5})`}
            />
          ))}
          <circle
            cx={w * 0.5}
            cy={h * 0.5}
            r="6"
            fill="white"
            fillOpacity={op}
          />
          <circle
            cx={w * 0.5}
            cy={h * 0.5}
            r="3"
            stroke="white"
            strokeWidth="1"
            fill="none"
            strokeOpacity={op + 0.05}
          />
          {/* Corner fish */}
          <path
            d="M8 8 Q14 6 18 10 Q14 14 8 12 Q10 10 8 8Z"
            fill="white"
            fillOpacity={op}
          />
          <path
            d={`M${w - 8} 8 Q${w - 14} 6 ${w - 18} 10 Q${w - 14} 14 ${w - 8} 12 Q${w - 10} 10 ${w - 8} 8Z`}
            fill="white"
            fillOpacity={op}
          />
          <path
            d={`M8 ${h - 8} Q14 ${h - 6} 18 ${h - 10} Q14 ${h - 14} 8 ${h - 12} Q10 ${h - 10} 8 ${h - 8}Z`}
            fill="white"
            fillOpacity={op}
          />
          <path
            d={`M${w - 8} ${h - 8} Q${w - 14} ${h - 6} ${w - 18} ${h - 10} Q${w - 14} ${h - 14} ${w - 8} ${h - 12} Q${w - 10} ${h - 10} ${w - 8} ${h - 8}Z`}
            fill="white"
            fillOpacity={op}
          />
          {/* Sun top center */}
          <circle cx={w * 0.5} cy="8" r="4" fill="white" fillOpacity={op} />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line
              key={a}
              x1={w * 0.5}
              y1="4"
              x2={w * 0.5 + Math.sin((a * Math.PI) / 180) * 6}
              y2={8 - Math.cos((a * Math.PI) / 180) * 6}
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity={op}
            />
          ))}
        </svg>
      );

    case "warli":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Central dance circle */}
          <circle
            cx={w * 0.5}
            cy={h * 0.5}
            r="18"
            stroke="white"
            strokeWidth="1"
            fill="none"
            strokeOpacity={op}
          />
          {/* Stick figures around circle */}
          {[0, 72, 144, 216, 288].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const cx = w * 0.5 + Math.cos(rad) * 18;
            const cy = h * 0.5 + Math.sin(rad) * 18;
            return (
              <g key={angle}>
                <circle
                  cx={cx}
                  cy={cy - 4}
                  r="2.5"
                  fill="white"
                  fillOpacity={op}
                />
                <polygon
                  points={`${cx},${cy - 1.5} ${cx - 4},${cy + 6} ${cx + 4},${cy + 6}`}
                  fill="white"
                  fillOpacity={op}
                />
                <line
                  x1={cx - 4}
                  y1={cy + 1}
                  x2={cx + 4}
                  y2={cy + 1}
                  stroke="white"
                  strokeWidth="1"
                  strokeOpacity={op}
                />
              </g>
            );
          })}
          {/* Tree of life top-left */}
          <line
            x1="10"
            y1="90"
            x2="10"
            y2="30"
            stroke="white"
            strokeWidth="1"
            strokeOpacity={op}
          />
          <line
            x1="10"
            y1="70"
            x2="4"
            y2="60"
            stroke="white"
            strokeWidth="0.8"
            strokeOpacity={op}
          />
          <line
            x1="10"
            y1="70"
            x2="16"
            y2="60"
            stroke="white"
            strokeWidth="0.8"
            strokeOpacity={op}
          />
          <line
            x1="10"
            y1="55"
            x2="3"
            y2="44"
            stroke="white"
            strokeWidth="0.8"
            strokeOpacity={op}
          />
          <line
            x1="10"
            y1="55"
            x2="17"
            y2="44"
            stroke="white"
            strokeWidth="0.8"
            strokeOpacity={op}
          />
          {/* Small triangles bottom */}
          <polygon points="80,85 74,95 86,95" fill="white" fillOpacity={op} />
          <polygon points="90,80 84,90 96,90" fill="white" fillOpacity={op} />
          {/* Sun top-right */}
          <circle cx={w - 12} cy="12" r="5" fill="white" fillOpacity={op} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line
              key={a}
              x1={w - 12 + Math.cos((a * Math.PI) / 180) * 5}
              y1={12 + Math.sin((a * Math.PI) / 180) * 5}
              x2={w - 12 + Math.cos((a * Math.PI) / 180) * 9}
              y2={12 + Math.sin((a * Math.PI) / 180) * 9}
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity={op}
            />
          ))}
        </svg>
      );

    case "gond":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Dot stipple pattern */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => {
              const dotCx = 6 + col * 12 + (row % 2) * 6;
              const dotCy = 6 + row * 12;
              return (
                <circle
                  key={`${dotCx}-${dotCy}`}
                  cx={dotCx}
                  cy={dotCy}
                  r="1"
                  fill="white"
                  fillOpacity={op + 0.05}
                />
              );
            }),
          )}
          {/* Tree shape */}
          <line
            x1={w * 0.5}
            y1={h - 5}
            x2={w * 0.5}
            y2={h * 0.35}
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity={op}
          />
          <polygon
            points={`${w * 0.5},${h * 0.15} ${w * 0.5 - 15},${h * 0.4} ${w * 0.5 + 15},${h * 0.4}`}
            fill="white"
            fillOpacity={op}
          />
          <polygon
            points={`${w * 0.5},${h * 0.05} ${w * 0.5 - 10},${h * 0.25} ${w * 0.5 + 10},${h * 0.25}`}
            fill="white"
            fillOpacity={op}
          />
          {/* Peacock eye motifs at corners */}
          <ellipse
            cx="12"
            cy="88"
            rx="5"
            ry="7"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            strokeOpacity={op}
          />
          <circle cx="12" cy="88" r="2" fill="white" fillOpacity={op} />
          <ellipse
            cx={w - 12}
            cy="88"
            rx="5"
            ry="7"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            strokeOpacity={op}
          />
          <circle cx={w - 12} cy="88" r="2" fill="white" fillOpacity={op} />
          {/* Spiral corners */}
          <path
            d="M5,5 Q5,12 12,12 Q12,5 8,5"
            stroke="white"
            strokeWidth="0.8"
            fill="none"
            strokeOpacity={op}
          />
          <path
            d={`M${w - 5},5 Q${w - 5},12 ${w - 12},12 Q${w - 12},5 ${w - 8},5`}
            stroke="white"
            strokeWidth="0.8"
            fill="none"
            strokeOpacity={op}
          />
        </svg>
      );

    case "kalamkari":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Temple gopuram arch background */}
          <path
            d={`M${w * 0.3},${h} L${w * 0.3},${h * 0.5} Q${w * 0.5},${h * 0.25} ${w * 0.7},${h * 0.5} L${w * 0.7},${h}`}
            stroke="white"
            strokeWidth="1"
            fill="white"
            fillOpacity={op * 0.5}
            strokeOpacity={op}
          />
          {/* Tiered arch lines */}
          <path
            d={`M${w * 0.35},${h} L${w * 0.35},${h * 0.52} Q${w * 0.5},${h * 0.3} ${w * 0.65},${h * 0.52} L${w * 0.65},${h}`}
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            strokeOpacity={op}
          />
          {/* Peacock body */}
          <ellipse
            cx="18"
            cy={h * 0.6}
            rx="6"
            ry="9"
            fill="white"
            fillOpacity={op}
          />
          <circle
            cx="18"
            cy={h * 0.6 - 11}
            r="4"
            fill="white"
            fillOpacity={op}
          />
          {/* Peacock tail fan */}
          {[-40, -20, 0, 20, 40].map((a) => (
            <line
              key={a}
              x1="18"
              y1={h * 0.6 - 5}
              x2={18 + Math.sin((a * Math.PI) / 180) * 20}
              y2={h * 0.6 - 5 - Math.cos((a * Math.PI) / 180) * 20}
              stroke="white"
              strokeWidth="1"
              strokeOpacity={op}
            />
          ))}
          {/* Lotus border at bottom */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M${10 + i * 16},${h - 2} Q${14 + i * 16},${h - 12} ${18 + i * 16},${h - 2}`}
              stroke="white"
              strokeWidth="0.8"
              fill="none"
              strokeOpacity={op}
            />
          ))}
          {/* Sun top center */}
          <circle
            cx={w * 0.5}
            cy="10"
            r="6"
            stroke="white"
            strokeWidth="1"
            fill="none"
            strokeOpacity={op}
          />
          <circle cx={w * 0.5} cy="10" r="3" fill="white" fillOpacity={op} />
        </svg>
      );

    case "phulkari":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Diamond lattice grid */}
          {/* biome-ignore lint/suspicious/noArrayIndexKey: stable grid */}
          {Array.from({ length: 7 }).map((_, row) =>
            Array.from({ length: 7 }).map((_, col) => {
              const cx = col * 16 + (row % 2) * 8;
              const cy = row * 16;
              return (
                <polygon
                  key={`${cx}-${cy}`}
                  points={`${cx},${cy - 8} ${cx + 8},${cy} ${cx},${cy + 8} ${cx - 8},${cy}`}
                  stroke="white"
                  strokeWidth="0.6"
                  fill="none"
                  strokeOpacity={op}
                />
              );
            }),
          )}
          {/* Central large flower */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <ellipse
              key={angle}
              cx={w * 0.5}
              cy={h * 0.5 - 8}
              rx="3"
              ry="8"
              fill="white"
              fillOpacity={op}
              transform={`rotate(${angle} ${w * 0.5} ${h * 0.5})`}
            />
          ))}
          <circle
            cx={w * 0.5}
            cy={h * 0.5}
            r="4"
            fill="white"
            fillOpacity={op + 0.05}
          />
          {/* Small flowers at diamond intersections */}
          {[
            [16, 16],
            [80, 16],
            [48, 48],
            [16, 80],
            [80, 80],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              {[0, 90, 180, 270].map((a) => (
                <ellipse
                  key={a}
                  cx={cx}
                  cy={cy - 4}
                  rx="1.5"
                  ry="4"
                  fill="white"
                  fillOpacity={op}
                  transform={`rotate(${a} ${cx} ${cy})`}
                />
              ))}
            </g>
          ))}
        </svg>
      );

    case "rajasthani":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Cusped arch */}
          <path
            d={`M${w * 0.2},${h} L${w * 0.2},${h * 0.45} Q${w * 0.5},${h * 0.05} ${w * 0.8},${h * 0.45} L${w * 0.8},${h}`}
            stroke="white"
            strokeWidth="1"
            fill="none"
            strokeOpacity={op}
          />
          {/* Scallops on arch */}
          {[0, 1, 2, 3, 4].map((i) => {
            const t = (i + 0.5) / 5;
            const angle = Math.PI - t * Math.PI;
            const cx = w * 0.5 + Math.cos(angle) * w * 0.3;
            const cy = h * 0.45 - Math.sin(angle) * h * 0.4 + h * 0.45;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="4"
                stroke="white"
                strokeWidth="0.6"
                fill="none"
                strokeOpacity={op}
              />
            );
          })}
          {/* Elephant silhouette bottom-left */}
          <ellipse
            cx="14"
            cy={h - 14}
            rx="10"
            ry="8"
            fill="white"
            fillOpacity={op * 0.8}
          />
          <rect
            x="8"
            y={h - 12}
            width="3"
            height="10"
            rx="1"
            fill="white"
            fillOpacity={op * 0.8}
          />
          <rect
            x="12"
            y={h - 12}
            width="3"
            height="10"
            rx="1"
            fill="white"
            fillOpacity={op * 0.8}
          />
          <ellipse
            cx="20"
            cy={h - 20}
            rx="5"
            ry="4"
            fill="white"
            fillOpacity={op * 0.8}
          />
          <line
            x1="24"
            y1={h - 22}
            x2="28"
            y2={h - 28}
            stroke="white"
            strokeWidth="1"
            strokeOpacity={op}
          />
          {/* Camel bottom-right */}
          <ellipse
            cx={w - 14}
            cy={h - 16}
            rx="10"
            ry="7"
            fill="white"
            fillOpacity={op * 0.8}
          />
          <line
            x1={w - 14}
            y1={h - 22}
            x2={w - 12}
            y2={h - 34}
            stroke="white"
            strokeWidth="2"
            strokeOpacity={op}
          />
          <ellipse
            cx={w - 11}
            cy={h - 36}
            rx="3"
            ry="4"
            fill="white"
            fillOpacity={op * 0.8}
          />
          <line
            x1={w - 8}
            y1={h - 16}
            x2={w - 4}
            y2={h - 10}
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity={op}
          />
          {/* Star rose window center */}
          {[0, 45, 90, 135].map((a) => (
            <rect
              key={a}
              x={w * 0.5 - 4}
              y={h * 0.5 - 14}
              width="8"
              height="28"
              fill="white"
              fillOpacity={op * 0.6}
              transform={`rotate(${a} ${w * 0.5} ${h * 0.5})`}
            />
          ))}
          <circle
            cx={w * 0.5}
            cy={h * 0.5}
            r="5"
            fill="white"
            fillOpacity={op}
          />
        </svg>
      );

    case "kashmir":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Chinar leaves */}
          {[
            [w * 0.15, h * 0.2],
            [w * 0.75, h * 0.15],
            [w * 0.1, h * 0.7],
            [w * 0.8, h * 0.75],
          ].map(([lx, ly], leafIdx) => (
            <g
              key={`${lx}-${ly}`}
              transform={`translate(${lx},${ly}) rotate(${leafIdx * 45})`}
            >
              <path
                d="M0,-12 L-6,0 L-3,0 L-5,8 L0,5 L5,8 L3,0 L6,0 Z"
                fill="white"
                fillOpacity={op}
              />
            </g>
          ))}
          {/* Central paisley */}
          <path
            d={`M${w * 0.5},${h * 0.3} C${w * 0.6},${h * 0.3} ${w * 0.65},${h * 0.5} ${w * 0.5},${h * 0.65} C${w * 0.35},${h * 0.5} ${w * 0.4},${h * 0.3} ${w * 0.5},${h * 0.3}Z`}
            fill="white"
            fillOpacity={op}
          />
          <circle
            cx={w * 0.5}
            cy={h * 0.52}
            r="4"
            stroke="white"
            strokeWidth="0.8"
            fill="none"
            strokeOpacity={op}
          />
          {/* Snowflake top-right */}
          {[0, 60, 120].map((a) => (
            <line
              key={a}
              x1={w - 15}
              y1={15}
              x2={w - 15 + Math.cos((a * Math.PI) / 180) * 12}
              y2={15 + Math.sin((a * Math.PI) / 180) * 12}
              stroke="white"
              strokeWidth="1"
              strokeOpacity={op}
            />
          ))}
          {[0, 60, 120].map((a) => (
            <line
              key={a + 180}
              x1={w - 15}
              y1={15}
              x2={w - 15 + Math.cos(((a + 180) * Math.PI) / 180) * 12}
              y2={15 + Math.sin(((a + 180) * Math.PI) / 180) * 12}
              stroke="white"
              strokeWidth="1"
              strokeOpacity={op}
            />
          ))}
          <circle cx={w - 15} cy={15} r="2" fill="white" fillOpacity={op} />
          {/* Flower clusters */}
          {[
            [15, h - 15],
            [w - 15, h - 15],
          ].map(([fx, fy]) => (
            <g key={`${fx}-${fy}`}>
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <circle
                  key={a}
                  cx={fx + Math.cos((a * Math.PI) / 180) * 6}
                  cy={fy + Math.sin((a * Math.PI) / 180) * 6}
                  r="2.5"
                  fill="white"
                  fillOpacity={op}
                />
              ))}
              <circle
                cx={fx}
                cy={fy}
                r="2"
                fill="white"
                fillOpacity={op + 0.05}
              />
            </g>
          ))}
        </svg>
      );

    case "kolam":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Dot grid */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => {
              const dotX = 8 + col * 13;
              const dotY = 8 + row * 13;
              return (
                <circle
                  key={`${dotX}-${dotY}`}
                  cx={dotX}
                  cy={dotY}
                  r="1.2"
                  fill="white"
                  fillOpacity={op + 0.08}
                />
              );
            }),
          )}
          {/* Kolam connecting lines — star pattern */}
          {[
            [w * 0.5, h * 0.5],
            [w * 0.2, h * 0.2],
            [w * 0.8, h * 0.2],
            [w * 0.2, h * 0.8],
            [w * 0.8, h * 0.8],
          ].map(([cx, cy]) => (
            <g key={`cx${cx}-cy${cy}`}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <line
                  key={a}
                  x1={cx}
                  y1={cy}
                  x2={cx + Math.cos((a * Math.PI) / 180) * 10}
                  y2={cy + Math.sin((a * Math.PI) / 180) * 10}
                  stroke="white"
                  strokeWidth="0.6"
                  strokeOpacity={op}
                />
              ))}
              <circle
                cx={cx}
                cy={cy}
                r="1.5"
                fill="white"
                fillOpacity={op + 0.05}
              />
            </g>
          ))}
          {/* Large central kolam flower */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
            <path
              key={a}
              d={`M${w * 0.5},${h * 0.5} Q${w * 0.5 + Math.cos(((a + 15) * Math.PI) / 180) * 16},${h * 0.5 + Math.sin(((a + 15) * Math.PI) / 180) * 16} ${w * 0.5 + Math.cos((a * Math.PI) / 180) * 22},${h * 0.5 + Math.sin((a * Math.PI) / 180) * 22}`}
              stroke="white"
              strokeWidth="0.7"
              fill="none"
              strokeOpacity={op}
            />
          ))}
        </svg>
      );

    case "pattachitra":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Circular mandala / chariot wheel */}
          <circle
            cx={w * 0.5}
            cy={h * 0.5}
            r="22"
            stroke="white"
            strokeWidth="1"
            fill="none"
            strokeOpacity={op}
          />
          <circle
            cx={w * 0.5}
            cy={h * 0.5}
            r="15"
            stroke="white"
            strokeWidth="0.6"
            fill="none"
            strokeOpacity={op}
          />
          <circle
            cx={w * 0.5}
            cy={h * 0.5}
            r="5"
            fill="white"
            fillOpacity={op}
          />
          {/* Spokes */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
            <line
              key={a}
              x1={w * 0.5 + Math.cos((a * Math.PI) / 180) * 5}
              y1={h * 0.5 + Math.sin((a * Math.PI) / 180) * 5}
              x2={w * 0.5 + Math.cos((a * Math.PI) / 180) * 22}
              y2={h * 0.5 + Math.sin((a * Math.PI) / 180) * 22}
              stroke="white"
              strokeWidth="0.6"
              strokeOpacity={op}
            />
          ))}
          {/* Conch shell top-left */}
          <path
            d="M10,15 Q5,10 8,5 Q14,2 18,8 Q20,14 15,18 Q10,20 8,16 Q6,12 10,15Z"
            fill="white"
            fillOpacity={op}
          />
          <path
            d="M10,15 Q14,18 16,22"
            stroke="white"
            strokeWidth="0.8"
            fill="none"
            strokeOpacity={op}
          />
          {/* Conch shell bottom-right */}
          <path
            d={`M${w - 10},${h - 15} Q${w - 5},${h - 10} ${w - 8},${h - 5} Q${w - 14},${h - 2} ${w - 18},${h - 8} Q${w - 20},${h - 14} ${w - 15},${h - 18} Q${w - 10},${h - 20} ${w - 8},${h - 16} Q${w - 6},${h - 12} ${w - 10},${h - 15}Z`}
            fill="white"
            fillOpacity={op}
          />
          {/* Curved floral border strips */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M${i * 18},${h - 2} Q${i * 18 + 9},${h - 10} ${i * 18 + 18},${h - 2}`}
              stroke="white"
              strokeWidth="0.7"
              fill="none"
              strokeOpacity={op}
            />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i + 6}
              d={`M${i * 18},2 Q${i * 18 + 9},10 ${i * 18 + 18},2`}
              stroke="white"
              strokeWidth="0.7"
              fill="none"
              strokeOpacity={op}
            />
          ))}
        </svg>
      );

    case "tribal":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Zigzag bands */}
          {[0, 1, 2].map((row) => {
            const y = 15 + row * 30;
            const pts = Array.from({ length: 9 })
              .map((_, i) => `${i * 12},${y + (i % 2) * 10}`)
              .join(" ");
            return (
              <polyline
                key={row}
                points={pts}
                stroke="white"
                strokeWidth="1"
                fill="none"
                strokeOpacity={op}
              />
            );
          })}
          {/* Diamond rows */}
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <polygon
                key={`${row}-${col}`}
                points={`${10 + col * 20},${25 + row * 30} ${18 + col * 20},${32 + row * 30} ${10 + col * 20},${39 + row * 30} ${2 + col * 20},${32 + row * 30}`}
                stroke="white"
                strokeWidth="0.6"
                fill="none"
                strokeOpacity={op}
              />
            )),
          )}
          {/* Bamboo stalks */}
          <line
            x1="5"
            y1="0"
            x2="5"
            y2={h}
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity={op * 0.7}
          />
          <line
            x1="95"
            y1="0"
            x2="95"
            y2={h}
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity={op * 0.7}
          />
          {[20, 40, 60, 80].map((y) => (
            <line
              key={y}
              x1="3"
              y1={y}
              x2="7"
              y2={y}
              stroke="white"
              strokeWidth="1"
              strokeOpacity={op}
            />
          ))}
          {[20, 40, 60, 80].map((y) => (
            <line
              key={`right-${y}`}
              x1="93"
              y1={y}
              x2="97"
              y2={y}
              stroke="white"
              strokeWidth="1"
              strokeOpacity={op}
            />
          ))}
          {/* Cross patterns */}
          <line
            x1={w * 0.5 - 8}
            y1={h * 0.5}
            x2={w * 0.5 + 8}
            y2={h * 0.5}
            stroke="white"
            strokeWidth="1"
            strokeOpacity={op}
          />
          <line
            x1={w * 0.5}
            y1={h * 0.5 - 8}
            x2={w * 0.5}
            y2={h * 0.5 + 8}
            stroke="white"
            strokeWidth="1"
            strokeOpacity={op}
          />
          <circle
            cx={w * 0.5}
            cy={h * 0.5}
            r="3"
            fill="white"
            fillOpacity={op}
          />
        </svg>
      );

    case "banarasi":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Brocade floral repeat */}
          {[
            [w * 0.5, h * 0.5],
            [w * 0.2, h * 0.25],
            [w * 0.8, h * 0.25],
            [w * 0.2, h * 0.75],
            [w * 0.8, h * 0.75],
          ].map(([cx, cy]) => (
            <g key={`bana${cx}-${cy}`}>
              {/* Central flower */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <ellipse
                  key={a}
                  cx={cx}
                  cy={cy - 7}
                  rx="2.5"
                  ry="6"
                  fill="white"
                  fillOpacity={op}
                  transform={`rotate(${a} ${cx} ${cy})`}
                />
              ))}
              <circle
                cx={cx}
                cy={cy}
                r="3"
                fill="white"
                fillOpacity={op + 0.05}
              />
              {/* 4 buds */}
              {[0, 90, 180, 270].map((a) => (
                <ellipse
                  key={a + 8}
                  cx={cx + Math.cos((a * Math.PI) / 180) * 13}
                  cy={cy + Math.sin((a * Math.PI) / 180) * 13}
                  rx="1.5"
                  ry="3.5"
                  fill="white"
                  fillOpacity={op * 0.8}
                  transform={`rotate(${a} ${cx + Math.cos((a * Math.PI) / 180) * 13} ${cy + Math.sin((a * Math.PI) / 180) * 13})`}
                />
              ))}
            </g>
          ))}
          {/* Leaf vine along edges */}
          <path
            d={`M0,${h * 0.5} Q${w * 0.25},${h * 0.4} ${w * 0.5},${h * 0.5} Q${w * 0.75},${h * 0.6} ${w},${h * 0.5}`}
            stroke="white"
            strokeWidth="0.7"
            fill="none"
            strokeOpacity={op}
          />
          {/* Paisley pairs */}
          <path
            d={`M15,${h - 20} C20,${h - 20} 25,${h - 14} 20,${h - 10} C15,${h - 14} 15,${h - 20} 15,${h - 20}Z`}
            fill="white"
            fillOpacity={op}
          />
          <path
            d={`M${w - 15},${h - 20} C${w - 20},${h - 20} ${w - 25},${h - 14} ${w - 20},${h - 10} C${w - 15},${h - 14} ${w - 15},${h - 20} ${w - 15},${h - 20}Z`}
            fill="white"
            fillOpacity={op}
          />
        </svg>
      );

    case "mughal":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* 8-pointed geometric star */}
          <polygon
            points={[0, 1, 2, 3, 4, 5, 6, 7]
              .map((i) => {
                const a = (i * 45 * Math.PI) / 180;
                const r = i % 2 === 0 ? 22 : 12;
                return `${w * 0.5 + Math.cos(a) * r},${h * 0.5 + Math.sin(a) * r}`;
              })
              .join(" ")}
            stroke="white"
            strokeWidth="1"
            fill="white"
            fillOpacity={op * 0.5}
            strokeOpacity={op}
          />
          <circle
            cx={w * 0.5}
            cy={h * 0.5}
            r="6"
            fill="white"
            fillOpacity={op}
          />
          {/* Jaali interlocking circles */}
          {[
            [w * 0.2, h * 0.2],
            [w * 0.8, h * 0.2],
            [w * 0.2, h * 0.8],
            [w * 0.8, h * 0.8],
          ].map(([cx, cy]) => (
            <g key={`m${cx}${cy}`}>
              <circle
                cx={cx}
                cy={cy}
                r="10"
                stroke="white"
                strokeWidth="0.7"
                fill="none"
                strokeOpacity={op}
              />
              <circle
                cx={cx}
                cy={cy}
                r="5"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
                strokeOpacity={op}
              />
              {[0, 90, 180, 270].map((a) => (
                <circle
                  key={a}
                  cx={cx + Math.cos((a * Math.PI) / 180) * 10}
                  cy={cy + Math.sin((a * Math.PI) / 180) * 10}
                  r="6"
                  stroke="white"
                  strokeWidth="0.5"
                  fill="none"
                  strokeOpacity={op * 0.7}
                />
              ))}
            </g>
          ))}
          {/* Arch/niche */}
          <path
            d={`M${w * 0.35},${h} L${w * 0.35},${h * 0.5} Q${w * 0.5},${h * 0.3} ${w * 0.65},${h * 0.5} L${w * 0.65},${h}`}
            stroke="white"
            strokeWidth="0.7"
            fill="none"
            strokeOpacity={op}
          />
        </svg>
      );

    case "tribal_east":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Sohrai circular fish */}
          {[
            [w * 0.25, h * 0.3],
            [w * 0.75, h * 0.7],
          ].map(([cx, cy]) => (
            <g key={`cx${cx}-cy${cy}`}>
              <ellipse
                cx={cx}
                cy={cy}
                rx="12"
                ry="7"
                stroke="white"
                strokeWidth="0.8"
                fill="white"
                fillOpacity={op * 0.5}
                strokeOpacity={op}
              />
              <path
                d={`M${cx + 12},${cy} L${cx + 18},${cy - 5} L${cx + 18},${cy + 5}Z`}
                fill="white"
                fillOpacity={op}
              />
              <circle
                cx={cx - 5}
                cy={cy - 1}
                r="1.5"
                fill="white"
                fillOpacity={op + 0.1}
              />
              <line
                x1={cx - 2}
                y1={cy - 4}
                x2={cx + 8}
                y2={cy - 4}
                stroke="white"
                strokeWidth="0.5"
                strokeOpacity={op}
              />
              <line
                x1={cx - 2}
                y1={cy + 4}
                x2={cx + 8}
                y2={cy + 4}
                stroke="white"
                strokeWidth="0.5"
                strokeOpacity={op}
              />
            </g>
          ))}
          {/* Round flowers with many petals */}
          {[
            [w * 0.5, h * 0.5],
            [w * 0.15, h * 0.6],
            [w * 0.85, h * 0.3],
          ].map(([cx, cy]) => (
            <g key={`flower-${cx}-${cy}`}>
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                (a) => (
                  <ellipse
                    key={a}
                    cx={cx}
                    cy={cy - 7}
                    rx="2"
                    ry="6"
                    fill="white"
                    fillOpacity={op}
                    transform={`rotate(${a} ${cx} ${cy})`}
                  />
                ),
              )}
              <circle
                cx={cx}
                cy={cy}
                r="3"
                fill="white"
                fillOpacity={op + 0.05}
              />
            </g>
          ))}
          {/* Running deer silhouettes */}
          <path
            d="M5,75 Q15,65 25,70 Q30,60 35,65 Q28,75 20,78 Q12,80 5,75Z"
            fill="white"
            fillOpacity={op * 0.8}
          />
          <line
            x1="12"
            y1="78"
            x2="10"
            y2="88"
            stroke="white"
            strokeWidth="1"
            strokeOpacity={op}
          />
          <line
            x1="20"
            y1="80"
            x2="18"
            y2="90"
            stroke="white"
            strokeWidth="1"
            strokeOpacity={op}
          />
          <circle cx="28" cy="62" r="2" fill="white" fillOpacity={op} />
          {/* Horizontal bird silhouette */}
          <path
            d={`M${w - 35},30 Q${w - 25},25 ${w - 15},30 Q${w - 25},35 ${w - 35},30Z`}
            fill="white"
            fillOpacity={op * 0.8}
          />
          <circle cx={w - 13} cy={30} r="2" fill="white" fillOpacity={op} />
        </svg>
      );

    default:
      return (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <circle
            cx={w * 0.5}
            cy={h * 0.5}
            r="25"
            stroke="white"
            strokeWidth="1"
            fill="none"
            strokeOpacity={0.2}
          />
        </svg>
      );
  }
}
