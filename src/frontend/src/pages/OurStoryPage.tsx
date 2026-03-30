import { motion } from "motion/react";

const philosophyCards = [
  {
    sanskrit: "वसुधैव कुटुम्बकम्",
    transliteration: "Vasudhaiva Kutumbakam",
    translation: "The World is One Family",
    meaning:
      "Our foundation: every buyer and every maker is family, bound by the thread of shared humanity.",
    accent: "border-l-4 border-amber-500",
    bg: "bg-amber-50",
  },
  {
    sanskrit: "विश्व मित्र",
    transliteration: "Biswa Mitra",
    translation: "Friend of the World",
    meaning:
      "Connecting India's artisans and their timeless crafts to hearts across every corner of the world.",
    accent: "border-l-4 border-orange-500",
    bg: "bg-orange-50",
  },
  {
    sanskrit: "अतिथि देवो भव",
    transliteration: "Atithi Devo Bhava",
    translation: "Guest is God",
    meaning:
      "Every customer who walks through our door is honored with the reverence of a divine guest.",
    accent: "border-l-4 border-red-700",
    bg: "bg-red-50",
  },
  {
    sanskrit: "पधारो म्हारे देश",
    transliteration: "Padharo Mare Desh",
    translation: "Welcome to Our Land",
    meaning:
      "An open, joyful invitation to explore India's boundless diversity, tradition, and splendour.",
    accent: "border-l-4 border-teal-600",
    bg: "bg-teal-50",
  },
  {
    sanskrit: "स्वागतम्",
    transliteration: "Swagatam",
    translation: "Welcome",
    meaning:
      "A warm, heartfelt embrace extended across all 36 states and union territories of India.",
    accent: "border-l-4 border-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    sanskrit: "नमस्ते भारत",
    transliteration: "Namaste Bharat",
    translation: "Greetings, India",
    meaning:
      "Our eternal salutation to the land, the people, and the living traditions that inspire us every day.",
    accent: "border-l-4 border-rose-600",
    bg: "bg-rose-50",
  },
];

const missions = [
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="w-12 h-12 mx-auto mb-4"
        fill="none"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#C2410C"
          strokeWidth="2"
          fill="#FFF7ED"
        />
        <path
          d="M16 32 C16 24 24 18 24 18 C24 18 32 24 32 32"
          stroke="#C2410C"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M20 32 C20 27 24 23 24 23 C24 23 28 27 28 32"
          stroke="#9A3412"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="24" cy="16" r="3" fill="#C2410C" />
      </svg>
    ),
    title: "Preserve",
    desc: "Protecting centuries-old craft traditions from fading into silence, one artisan at a time.",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="w-12 h-12 mx-auto mb-4"
        fill="none"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#0F766E"
          strokeWidth="2"
          fill="#F0FDFA"
        />
        <circle cx="14" cy="24" r="4" fill="#0F766E" />
        <circle cx="34" cy="24" r="4" fill="#0F766E" />
        <path
          d="M18 24 L30 24"
          stroke="#0F766E"
          strokeWidth="2"
          strokeDasharray="3 2"
        />
        <path
          d="M22 20 L26 16 M22 28 L26 32"
          stroke="#0D9488"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Connect",
    desc: "Linking artisans directly to buyers worldwide, cutting out the middleman, amplifying livelihoods.",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="w-12 h-12 mx-auto mb-4"
        fill="none"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#B45309"
          strokeWidth="2"
          fill="#FFFBEB"
        />
        <path
          d="M24 14 L26.5 21 L34 21 L28 25.5 L30.5 32.5 L24 28 L17.5 32.5 L20 25.5 L14 21 L21.5 21 Z"
          fill="#F59E0B"
          stroke="#B45309"
          strokeWidth="1"
        />
      </svg>
    ),
    title: "Celebrate",
    desc: "Honoring India's glorious unity in diversity — 36 states, a thousand crafts, one beating heart.",
  },
];

export default function OurStoryPage() {
  return (
    <main className="bg-[#FFFAF3] min-h-screen">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #7A1C1C 0%, #B84C10 40%, #D97706 80%, #92400E 100%)",
        }}
      >
        {/* Decorative mandala SVG */}
        <svg
          aria-hidden="true"
          className="absolute right-0 top-0 opacity-10 w-96 h-96 -translate-y-12 translate-x-12"
          viewBox="0 0 200 200"
          fill="none"
        >
          {[20, 35, 50, 65, 80].map((r) => (
            <circle
              key={`cr-${r}`}
              cx="100"
              cy="100"
              r={r}
              stroke="white"
              strokeWidth="0.8"
              fill="none"
            />
          ))}
          {[
            0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5,
            270, 292.5, 315, 337.5,
          ].map((angle) => (
            <line
              key={`ln-${angle}`}
              x1="100"
              y1="20"
              x2="100"
              y2="180"
              stroke="white"
              strokeWidth="0.6"
              transform={`rotate(${angle} 100 100)`}
            />
          ))}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <ellipse
              key={`el-${angle}`}
              cx="100"
              cy="55"
              rx="6"
              ry="14"
              fill="white"
              transform={`rotate(${angle} 100 100)`}
            />
          ))}
        </svg>
        <svg
          aria-hidden="true"
          className="absolute left-0 bottom-0 opacity-10 w-72 h-72 translate-y-12 -translate-x-12"
          viewBox="0 0 200 200"
          fill="none"
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <ellipse
              key={`el2-${angle}`}
              cx="100"
              cy="55"
              rx="8"
              ry="20"
              fill="white"
              transform={`rotate(${angle} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="15" fill="white" />
        </svg>

        <div className="relative z-10 text-center px-4 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-amber-300 tracking-[0.3em] text-sm font-medium uppercase mb-4">
              Sanskrit — देवभाषा · Mother of All Languages
            </p>
            <h1
              className="text-6xl md:text-8xl font-bold text-white mb-4"
              style={{
                fontFamily: "serif",
                textShadow: "0 2px 24px rgba(0,0,0,0.4)",
              }}
            >
              भारतस्य आत्मा
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mt-4 font-light tracking-wide">
              Soul of India
            </p>
            <div className="mt-6 w-24 h-1 bg-amber-400 mx-auto rounded-full" />
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              <span className="font-semibold">The Shades of Bharat</span> —{" "}
              Where Every Thread Tells a Story
            </p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-amber-600 tracking-widest text-xs font-semibold uppercase mb-3">
              Our Story
            </p>
            <h2
              className="text-4xl font-bold text-[#7A1C1C] mb-6 leading-tight"
              style={{ fontFamily: "serif" }}
            >
              Born from the Soul of Bharat
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              The Shades of Bharat was born from a deep reverence for India's
              living heritage — the weavers of Varanasi, the potters of
              Rajasthan, the tribal artists of Jharkhand, and thousands of
              artisan communities across our 36 states and union territories.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              We are not just a marketplace. We are a movement to preserve,
              celebrate, and bring the soul of India to every home.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-1 bg-amber-500 rounded" />
              <span className="text-amber-700 font-medium italic">
                एक भारत, श्रेष्ठ भारत
              </span>
              <div className="w-12 h-1 bg-amber-500 rounded" />
            </div>
          </motion.div>

          {/* Decorative motif panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FCD34D 100%)",
              }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 400 350"
                className="w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Madhubani-style folk art */}
                <rect width="400" height="350" fill="#FEF3C7" />
                {/* Border pattern */}
                {[...Array(20).keys()].map((i) => (
                  <rect
                    key={`rt${i * 20}`}
                    x={i * 20}
                    y="0"
                    width="10"
                    height="10"
                    fill={i % 2 === 0 ? "#D97706" : "#B45309"}
                  />
                ))}
                {[...Array(20).keys()].map((i) => (
                  <rect
                    key={`rb${i * 20}`}
                    x={i * 20}
                    y="340"
                    width="10"
                    height="10"
                    fill={i % 2 === 0 ? "#D97706" : "#B45309"}
                  />
                ))}
                {/* Central lotus */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <ellipse
                    key={`lotus${angle}`}
                    cx="200"
                    cy="175"
                    rx="40"
                    ry="80"
                    fill="none"
                    stroke="#B45309"
                    strokeWidth="2"
                    transform={`rotate(${angle} 200 175)`}
                  />
                ))}
                <circle
                  cx="200"
                  cy="175"
                  r="25"
                  fill="#F59E0B"
                  stroke="#B45309"
                  strokeWidth="2"
                />
                <circle cx="200" cy="175" r="12" fill="#7A1C1C" />
                {/* Peacock feathers */}
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <g key={`pf-${angle}`} transform={`rotate(${angle} 200 175)`}>
                    <path
                      d="M200 150 Q190 120 200 90 Q210 120 200 150"
                      fill="#0D9488"
                      stroke="#0F766E"
                      strokeWidth="1"
                    />
                    <circle
                      cx="200"
                      cy="95"
                      r="6"
                      fill="#0F766E"
                      stroke="#134E4A"
                      strokeWidth="1"
                    />
                  </g>
                ))}
                {/* Fish motifs */}
                <path d="M80 80 Q95 70 110 80 Q95 90 80 80 Z" fill="#0D9488" />
                <path
                  d="M290 260 Q305 250 320 260 Q305 270 290 260 Z"
                  fill="#0D9488"
                />
                {/* Corner flowers */}
                {[
                  [60, 60],
                  [340, 60],
                  [60, 290],
                  [340, 290],
                ].map(([cx, cy]) => (
                  <g key={`corner${cx}-${cy}`}>
                    {[0, 60, 120, 180, 240, 300].map((ang) => (
                      <ellipse
                        key={`cf${ang}`}
                        cx={cx}
                        cy={cy}
                        rx="12"
                        ry="20"
                        fill="#F59E0B"
                        stroke="#B45309"
                        strokeWidth="1"
                        transform={`rotate(${ang} ${cx} ${cy})`}
                      />
                    ))}
                    <circle cx={cx} cy={cy} r="6" fill="#7A1C1C" />
                  </g>
                ))}
                {/* Text overlay */}
                <text
                  x="200"
                  y="320"
                  textAnchor="middle"
                  fill="#7A1C1C"
                  fontSize="14"
                  fontStyle="italic"
                >
                  ॥ वन्दे मातरम् ॥
                </text>
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cultural Philosophy */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(180deg, #FFF7ED 0%, #FFFAF3 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-amber-600 tracking-widest text-xs font-semibold uppercase mb-3">
              Our Philosophy
            </p>
            <h2
              className="text-4xl font-bold text-[#7A1C1C] mb-4"
              style={{ fontFamily: "serif" }}
            >
              The Words We Live By
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Ancient wisdom that guides every thread we weave and every artisan
              we celebrate.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {philosophyCards.map((card, i) => (
              <motion.div
                key={card.transliteration}
                data-ocid={`philosophy.item.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px rgba(180,80,16,0.15)",
                }}
                className={`rounded-xl p-6 ${card.bg} ${card.accent} shadow-sm transition-all duration-300 cursor-default`}
              >
                <p
                  className="text-2xl font-bold text-[#7A1C1C] mb-1"
                  style={{ fontFamily: "serif" }}
                >
                  {card.sanskrit}
                </p>
                <p className="text-sm font-medium text-amber-700 tracking-wide mb-1">
                  {card.transliteration}
                </p>
                <p className="text-base font-semibold text-gray-800 mb-3 italic">
                  &ldquo;{card.translation}&rdquo;
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.meaning}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-amber-600 tracking-widest text-xs font-semibold uppercase mb-3">
              Our Mission
            </p>
            <h2
              className="text-4xl font-bold text-[#7A1C1C] mb-4"
              style={{ fontFamily: "serif" }}
            >
              Why We Exist
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-10">
            {missions.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center px-4"
              >
                {m.icon}
                <h3
                  className="text-xl font-bold text-[#7A1C1C] mb-2"
                  style={{ fontFamily: "serif" }}
                >
                  {m.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {m.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Voice */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #7A1C1C 0%, #9A3412 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <svg
              aria-hidden="true"
              className="w-16 h-16 mx-auto mb-6 opacity-40"
              viewBox="0 0 64 64"
              fill="white"
            >
              <path d="M0 40 C0 20 10 8 28 4 L28 16 C18 20 14 28 14 36 C16 34 20 32 24 32 C32 32 36 38 36 46 C36 54 30 60 22 60 C12 60 0 52 0 40 Z" />
              <path d="M36 40 C36 20 46 8 64 4 L64 16 C54 20 50 28 50 36 C52 34 56 32 60 32 C68 32 72 38 72 46 C72 54 66 60 58 60 C48 60 36 52 36 40 Z" />
            </svg>
            <blockquote className="text-xl md:text-2xl text-white/95 font-light leading-relaxed italic mb-8">
              When you buy from The Shades of Bharat, you are not just buying a
              product. You are carrying forward a legacy, supporting a family,
              and keeping an ancient art alive.
            </blockquote>
            <div className="w-16 h-0.5 bg-amber-400 mx-auto mb-4" />
            <p className="text-amber-300 font-medium tracking-wide">
              — The Artisan Community of India
            </p>
          </motion.div>
        </div>
      </section>

      {/* Regional Diversity */}
      <section className="py-20 bg-[#FFFAF3]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-amber-600 tracking-widest text-xs font-semibold uppercase mb-3">
              Unity in Diversity
            </p>
            <h2
              className="text-4xl font-bold text-[#7A1C1C] mb-8"
              style={{ fontFamily: "serif" }}
            >
              36 States, 36 Stories, One Soul
            </h2>
            <div className="relative inline-block">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
                  opacity: 0.6,
                }}
              />
              <p className="relative z-10 text-lg md:text-xl text-gray-800 leading-relaxed px-8 py-8 rounded-2xl border border-amber-200">
                From the{" "}
                <span className="font-semibold text-[#7A1C1C]">
                  snow-clad peaks of Jammu &amp; Kashmir
                </span>{" "}
                to the{" "}
                <span className="font-semibold text-teal-700">
                  tropical shores of Kerala
                </span>
                , from the{" "}
                <span className="font-semibold text-amber-700">
                  deserts of Rajasthan
                </span>{" "}
                to the{" "}
                <span className="font-semibold text-green-700">
                  rainforests of Meghalaya
                </span>{" "}
                —{" "}
                <span
                  className="block mt-3 text-2xl font-bold text-[#7A1C1C]"
                  style={{ fontFamily: "serif" }}
                >
                  36 states, 36 stories, one soul.
                </span>
              </p>
            </div>
            {/* Decorative row of state dots */}
            <div className="flex justify-center gap-1.5 mt-10 flex-wrap max-w-sm mx-auto">
              {[...Array(36).keys()].map((i) => (
                <div
                  key={`dot${i}`}
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: [
                      "#D97706",
                      "#B45309",
                      "#7A1C1C",
                      "#0F766E",
                      "#92400E",
                    ][i % 5],
                  }}
                />
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-3">
              One dot for each state and union territory of India
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
