import {
  BlockPrintBorder,
  LanternIcon,
  PaisleyMotif,
  RangoliMotif,
  StarRating,
  StateEthnicPattern,
} from "@/components/Motifs";
import { ProductCard } from "@/components/ProductCard";
import { StateLogo } from "@/components/StateLogos";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FESTIVALS,
  INDIAN_STATES,
  SAMPLE_PRODUCTS,
  TESTIMONIALS,
} from "@/data/indianStates";
import { useBlogPosts, useProducts } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const HERO_SLIDES = [
  {
    headline: "Sacred Craft Traditions",
    subheadline:
      "Timeless artistry passed down through generations of devoted craftspeople",
    tagline: "भारतस्य आत्मा",
    taglineLang: "Sanskrit — देवभाषा · Mother of All Languages",
    medallion: "Temple Art",
    gradient: "from-[#5B1E00] via-[#8B3A0F] to-[#D4841A]",
    accent: "#F0A830",
  },
  {
    headline: "Handwoven Dreams",
    subheadline:
      "Discover the finest silk sarees, embroideries and handlooms from across India",
    tagline: "भारत की आत्मा",
    taglineLang: "Hindi",
    medallion: "Banarasi Silk",
    gradient: "from-[#7A1A18] via-[#B4492E] to-[#E09A2B]",
    accent: "#E09A2B",
  },
  {
    headline: "Tribal Art Stories",
    subheadline:
      "Ancient wisdom expressed through Gond, Warli, Madhubani and Pattachitra traditions",
    tagline: "இந்தியாவின் ஆன்மா",
    taglineLang: "Tamil",
    medallion: "Madhubani Art",
    gradient: "from-[#1A1A5E] via-[#2C2E73] to-[#4B4DC9]",
    accent: "#7B7FE0",
  },
  {
    headline: "From Loom to Heart",
    subheadline:
      "Master artisans weaving centuries of tradition into every thread, every brushstroke",
    tagline: "ভারতের আত্মা",
    taglineLang: "Bengali",
    medallion: "Muslin Weaves",
    gradient: "from-[#044A44] via-[#0E6F66] to-[#1AA899]",
    accent: "#4ECDC4",
  },
  {
    headline: "Pattachitra & Beyond",
    subheadline:
      "Odisha's legendary scroll paintings, silver filigree, and ikat textiles",
    tagline: "ଭାରତର ଆତ୍ମା",
    taglineLang: "Odia",
    medallion: "Pattachitra",
    gradient: "from-[#1A3A00] via-[#2E6010] to-[#5A9E30]",
    accent: "#82C341",
  },
  {
    headline: "Dravidian Heritage",
    subheadline:
      "Kanjivaram silk, Bidri metalwork, and the ancient crafts of the Deccan",
    tagline: "భారత్ యొక్క ఆత్మ",
    taglineLang: "Telugu",
    medallion: "Kanjivaram",
    gradient: "from-[#3D0045] via-[#6A1070] to-[#A040B0]",
    accent: "#D070E0",
  },
  {
    headline: "Malabar's Treasures",
    subheadline:
      "Kasavu sarees, Aranmula mirrors, and the golden crafts of God's Own Country",
    tagline: "ഭാരതത്തിന്റെ ആത്മാവ്",
    taglineLang: "Malayalam",
    medallion: "Kasavu Weave",
    gradient: "from-[#004A1A] via-[#007030] to-[#00A050]",
    accent: "#00D068",
  },
  {
    headline: "Deccan Mastery",
    subheadline:
      "Mysore silk, Bidriware, and Ilkal sarees from the land of Hampi",
    tagline: "ಭಾರತದ ಆತ್ಮ",
    taglineLang: "Kannada",
    medallion: "Mysore Silk",
    gradient: "from-[#4A2500] via-[#7A4010] to-[#C07020]",
    accent: "#E8A030",
  },
  {
    headline: "Phulkari & Pashmina",
    subheadline:
      "Punjab's vibrant embroidery, Kashmiri shawls, and Amritsar's golden threads",
    tagline: "ਭਾਰਤ ਦੀ ਆਤਮਾ",
    taglineLang: "Punjabi",
    medallion: "Phulkari",
    gradient: "from-[#FF6B00] via-[#E04400] to-[#B01A1A]",
    accent: "#FF9A40",
  },
  {
    headline: "Paithani & Warli",
    subheadline:
      "Maharashtra's royal Paithani weaves, Warli folk art, and Kolhapur crafts",
    tagline: "भारताचा आत्मा",
    taglineLang: "Marathi",
    medallion: "Paithani Silk",
    gradient: "from-[#002A5E] via-[#003E8C] to-[#0060CC]",
    accent: "#4090F0",
  },
  {
    headline: "Rhino Land Crafts",
    subheadline:
      "Assam's Muga silk, Mekhela Chador, and bamboo artistry from the Northeast",
    tagline: "ভাৰতৰ আত্মা",
    taglineLang: "Assamese",
    medallion: "Muga Silk",
    gradient: "from-[#004A3A] via-[#007060] to-[#00A090]",
    accent: "#00D0B8",
  },
  {
    headline: "Gujarat's Textile Legacy",
    subheadline:
      "Patola silk, Bandhani tie-dye, and Kutch embroidery — color as culture",
    tagline: "ભારતનો આત્મા",
    taglineLang: "Gujarati",
    medallion: "Patola Silk",
    gradient: "from-[#5E0028] via-[#8C0040] to-[#CC0060]",
    accent: "#F04090",
  },

  {
    headline: "Valley of Kashmir",
    subheadline:
      "Pashmina shawls, papier-mâché crafts, and walnut wood carvings",
    tagline: "بھارَتھ سُن٘د رٔوح",
    taglineLang: "Kashmiri",
    medallion: "Pashmina",
    gradient: "from-[#0A2040] via-[#103060] to-[#204080]",
    accent: "#6090C0",
  },
  {
    headline: "Northeast Tribal Weaves",
    subheadline:
      "Manipur's Moirang Phee, Naga tribal textiles, and bamboo crafts",
    tagline: "ভারতকী মতম",
    taglineLang: "Meitei",
    medallion: "Tribal Textiles",
    gradient: "from-[#1A0A4A] via-[#2C1070] to-[#401890]",
    accent: "#8060C0",
  },
  {
    headline: "Maithili Paintings",
    subheadline: "Bihar's Madhubani paintings, Sujani quilts, and Tikuli art",
    tagline: "भारतक आत्मा",
    taglineLang: "Maithili",
    medallion: "Madhubani",
    gradient: "from-[#3A0A1A] via-[#6A1030] to-[#A01850]",
    accent: "#E04080",
  },
];

export default function HomePage() {
  const [heroSlide, setHeroSlide] = useState(0);
  const { data: featuredProducts, isLoading: featuredLoading } = useProducts({
    isFeatured: true,
  });
  const { data: newArrivals, isLoading: newLoading } = useProducts({
    isNewArrival: true,
  });
  const { data: blogPosts } = useBlogPosts();

  // Use sample data fallback
  const displayFeatured =
    featuredProducts && featuredProducts.length > 0
      ? featuredProducts
      : SAMPLE_PRODUCTS.filter((p) => p.isFeatured);
  const displayNew =
    newArrivals && newArrivals.length > 0
      ? newArrivals
      : SAMPLE_PRODUCTS.filter((p) => p.isNewArrival);
  const artisanSpotlight = blogPosts?.[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[heroSlide];

  return (
    <main>
      {/* ===== HERO SECTION ===== */}
      <section
        className="relative overflow-hidden min-h-[560px] md:min-h-[640px]"
        data-ocid="hero.section"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
          />
        </AnimatePresence>

        {/* Decorative patterns overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 flex items-center min-h-[560px] md:min-h-[640px]">
          <div className="flex-1 max-w-xl">
            <motion.div
              key={`tagline-${heroSlide}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-3"
            >
              <span
                className="text-2xl font-display block leading-snug"
                style={{ color: slide.accent }}
              >
                {slide.tagline}
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-widest mt-1 block"
                style={{ color: `${slide.accent}CC` }}
              >
                {slide.taglineLang}
              </span>
            </motion.div>
            <motion.h1
              key={`h1-${heroSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display font-bold text-white text-4xl md:text-6xl uppercase tracking-tight leading-tight mb-4"
            >
              {slide.headline}
            </motion.h1>
            <motion.p
              key={`sub-${heroSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-white/80 text-lg mb-8 max-w-md leading-relaxed"
            >
              {slide.subheadline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 flex-wrap"
            >
              <Link
                to="/shop"
                search={(p: any) => p ?? {}}
                data-ocid="hero.primary_button"
              >
                <Button className="bg-saffron hover:bg-turmeric text-white font-semibold px-6 py-3 h-auto uppercase tracking-wider shadow-lg">
                  Explore Collections
                </Button>
              </Link>
              <Link
                to="/shop"
                search={(p: any) => p ?? {}}
                data-ocid="hero.secondary_button"
              >
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-6 py-3 h-auto uppercase tracking-wider"
                >
                  Shop Now
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Decorative medallion */}
          <div className="hidden md:flex flex-col items-center ml-8">
            <div
              className="w-48 h-48 rounded-full border-4 overflow-hidden flex items-center justify-center relative"
              style={{ borderColor: slide.accent }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <RangoliMotif size={140} />
              </div>
              <span className="relative z-10 text-white font-display font-bold text-center text-sm px-4 text-shadow">
                {slide.medallion}
              </span>
            </div>
            <p className="text-white/60 text-xs mt-2 italic">
              India's Finest Crafts
            </p>
          </div>
        </div>

        {/* Carousel controls */}
        <button
          type="button"
          onClick={() =>
            setHeroSlide(
              (s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Previous slide"
          data-ocid="hero.pagination_prev"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => setHeroSlide((s) => (s + 1) % HERO_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Next slide"
          data-ocid="hero.pagination_next"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide dots */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              type="button"
              // biome-ignore lint/suspicious/noArrayIndexKey: hero slide dot index
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === heroSlide ? "bg-saffron w-6" : "bg-white/50"}`}
              aria-label={`Slide ${i + 1}`}
              data-ocid="hero.toggle"
            />
          ))}
        </div>

        {/* Block print border at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <BlockPrintBorder />
        </div>
      </section>

      {/* ===== SHOP BY STATE ===== */}
      <section className="py-16 bg-cream" data-ocid="states.section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 relative">
            <div className="flex items-center justify-center gap-4 mb-2">
              <PaisleyMotif size={40} color="#E09A2B" />
              <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-charcoal">
                Shop by State
              </h2>
              <PaisleyMotif
                size={40}
                color="#2C2E73"
                className="scale-x-[-1]"
              />
            </div>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Explore authentic crafts from every corner of India — all 36
              states and union territories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {INDIAN_STATES.map((state, i) => (
              <motion.div
                key={state.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.05 }}
              >
                <Link
                  to="/shop"
                  search={(prev: any) => ({ ...prev, state: state.name })}
                  className="block rounded-lg overflow-hidden card-hover text-center"
                  data-ocid={`states.item.${i + 1}`}
                >
                  <div
                    className="relative p-4 min-h-[100px] flex flex-col items-center justify-center gap-2 overflow-hidden"
                    style={{ backgroundColor: state.bgColor }}
                  >
                    <div className="absolute inset-0 pointer-events-none">
                      <StateEthnicPattern
                        pattern={state.pattern || "madhubani"}
                      />
                    </div>
                    <div className="relative z-10 drop-shadow">
                      <StateLogo state={state.name} size={44} color="white" />
                    </div>
                    <div className="relative z-10 text-center drop-shadow">
                      <div className="font-semibold text-white text-xs leading-tight opacity-80">
                        {state.name}
                      </div>
                      <div className="font-bold text-white text-xs leading-tight mt-0.5">
                        {state.nativeName}
                      </div>
                      <div className="text-white text-[10px] leading-tight mt-0.5 opacity-75 italic">
                        {state.sanskritName}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-2">
                    <p className="text-xs text-muted-foreground truncate">
                      {state.crafts[0]}
                    </p>
                    <span className="text-xs text-saffron font-medium">
                      Explore →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED COLLECTIONS ===== */}
      <section className="py-16 bg-white" data-ocid="collections.section">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display font-bold text-3xl uppercase text-center text-charcoal mb-10">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Festival Specials",
                desc: "Curated for Diwali, Holi & all celebrations",
                gradient: "from-[#E09A2B] to-[#B4492E]",
                icon: "🎊",
                href: "/shop?tag=festival",
              },
              {
                title: "Tribal Art",
                desc: "Ancient wisdom from India's indigenous communities",
                gradient: "from-[#2C2E73] to-[#0E6F66]",
                icon: "🎭",
                href: "/shop?category=Tribal+Art",
              },
              {
                title: "Bestsellers",
                desc: "Most loved crafts by collectors worldwide",
                gradient: "from-[#7A2C2A] to-[#2C2E73]",
                icon: "⭐",
                href: "/shop?bestseller=true",
              },
            ].map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Link
                  to={col.href as any}
                  data-ocid={`collections.item.${i + 1}`}
                >
                  <div
                    className={`bg-gradient-to-br ${col.gradient} rounded-xl p-8 text-white card-hover min-h-[160px] flex flex-col justify-between`}
                  >
                    <span className="text-4xl">{col.icon}</span>
                    <div>
                      <h3 className="font-display font-bold text-xl mb-1">
                        {col.title}
                      </h3>
                      <p className="text-white/80 text-sm">{col.desc}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold mt-3">
                      Shop Now <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ARTISAN SPOTLIGHT + CULTURAL CALENDAR ===== */}
      <section className="py-16 bg-cream" data-ocid="spotlight.section">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Artisan Spotlight */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #2A1746, #4A2870)" }}
          >
            <div className="flex flex-col md:flex-row gap-0 h-full">
              <div className="md:w-2/5 flex-shrink-0">
                <img
                  src="/assets/generated/artisan-weaver.dim_800x600.jpg"
                  alt="Artisan at work"
                  loading="lazy"
                  className="w-full h-full object-cover min-h-[200px]"
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-saffron" />
                  <span className="text-saffron text-xs font-semibold uppercase tracking-wider">
                    Artisan Spotlight
                  </span>
                </div>
                {artisanSpotlight ? (
                  <>
                    <h3 className="font-display font-bold text-white text-xl mb-2">
                      {artisanSpotlight.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-4">
                      {artisanSpotlight.content}
                    </p>
                    <p className="text-white/50 text-xs mb-4">
                      By {artisanSpotlight.authorName}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="font-display font-bold text-white text-xl mb-2">
                      Ramesh Ji — Master Weaver of Varanasi
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      For 35 years, Ramesh Ji has woven magic into Banarasi silk
                      on his inherited pit loom. Each saree takes 15-20 days and
                      tells a story of devotion, patience, and artistry that
                      cannot be replicated by machines.
                    </p>
                  </>
                )}
                <Link to="/blog" data-ocid="spotlight.link">
                  <Button
                    className="bg-saffron hover:bg-turmeric text-white w-fit"
                    size="sm"
                  >
                    Read Full Story
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Cultural Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display font-bold text-2xl text-charcoal mb-4 flex items-center gap-2">
              <span>🗓️</span> Festival Calendar
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FESTIVALS.map((fest, i) => (
                <Link
                  key={fest.name}
                  to="/shop"
                  search={(prev: any) => ({
                    ...prev,
                    tag: fest.name.toLowerCase(),
                  })}
                  className="rounded-lg p-3 text-white card-hover block"
                  style={{ backgroundColor: fest.color }}
                  data-ocid={`festival.item.${i + 1}`}
                >
                  <div className="text-2xl mb-1">{fest.emoji}</div>
                  <div className="font-semibold text-sm">{fest.name}</div>
                  <div className="text-white/70 text-xs">{fest.date}</div>
                  <div className="text-white/80 text-xs mt-1">
                    {fest.description}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== OUR COLLECTIONS (Featured Products) ===== */}
      <section className="py-16 bg-white" data-ocid="featured.section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display font-bold text-3xl uppercase text-charcoal">
              Our Collections
            </h2>
            <Link
              to="/shop"
              search={(p: any) => p ?? {}}
              className="text-saffron font-medium hover:underline flex items-center gap-1 text-sm"
              data-ocid="featured.link"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          {featuredLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton index
                <Skeleton key={i} className="h-80 rounded-lg" />
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
              data-ocid="featured.list"
            >
              {displayFeatured.slice(0, 10).map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product as any}
                  index={i + 1}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== CULTURAL TAPESTRY BAND ===== */}
      <section
        className="py-16 bg-peacock text-white"
        data-ocid="tapestry.section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <LanternIcon color="#E09A2B" />
            <LanternIcon color="#D8A62A" />
            <LanternIcon color="#E09A2B" />
          </div>
          <h2 className="font-display font-bold text-3xl uppercase text-center mb-3">
            India's Cultural Tapestry
          </h2>
          <p className="text-white/70 text-center max-w-lg mx-auto mb-10">
            A subcontinent of staggering diversity — 22 official languages, 6
            major religions, 29 UNESCO heritage crafts
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🧵",
                title: "Handloom Textiles",
                desc: "Over 40 distinct handloom traditions across India, from Banarasi silk to Kanjeevaram, employing 4.3 million weavers.",
                img: "/assets/generated/banarasi-silk-saree.dim_600x700.jpg",
              },
              {
                icon: "🎭",
                title: "Ethnic Handicrafts",
                desc: "From intricate Bidriware to delicate papier-mâché — India's handicrafts represent 3,000+ years of unbroken artistic tradition.",
                img: "/assets/generated/blue-pottery-rajasthan.dim_600x700.jpg",
              },
              {
                icon: "🌿",
                title: "Tribal Art Forms",
                desc: "700+ tribal communities each with unique art — Gond, Warli, Sohrai, Pithora, Saura — keeping ancestral stories alive.",
                img: "/assets/generated/warli-art.dim_600x700.jpg",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-cream rounded-xl overflow-hidden"
                data-ocid={`tapestry.card.${i + 1}`}
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="text-3xl mb-2">{card.icon}</div>
                  <h3 className="font-display font-bold text-charcoal text-lg mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEW ARRIVALS ===== */}
      <section className="py-16 bg-cream" data-ocid="new-arrivals.section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display font-bold text-3xl uppercase text-charcoal">
              <span className="text-saffron">New</span> Arrivals
            </h2>
            <Link
              to="/shop"
              search={(prev: any) => ({ ...prev, isNewArrival: true })}
              className="text-saffron font-medium hover:underline flex items-center gap-1 text-sm"
              data-ocid="new-arrivals.link"
            >
              See All <ArrowRight size={14} />
            </Link>
          </div>
          {newLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton index
                <Skeleton key={i} className="h-72 rounded-lg" />
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              data-ocid="new-arrivals.list"
            >
              {displayNew.slice(0, 8).map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product as any}
                  index={i + 1}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 bg-white" data-ocid="testimonials.section">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display font-bold text-3xl uppercase text-center text-charcoal mb-10">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-cream rounded-xl p-6 shadow-card"
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-saffron flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.location}
                    </div>
                  </div>
                </div>
                <StarRating rating={t.rating} />
                <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                  "{t.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
