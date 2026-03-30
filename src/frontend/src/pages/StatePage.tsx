import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ARTISANS } from "@/data/artisans";
import { INDIAN_STATES, SAMPLE_PRODUCTS } from "@/data/indianStates";
import { useProducts } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";

export default function StatePage() {
  const { stateName } = useParams({ from: "/state/$stateName" });
  const stateInfo = INDIAN_STATES.find(
    (s) => s.name === decodeURIComponent(stateName),
  );
  const { data: products, isLoading } = useProducts({
    state: decodeURIComponent(stateName),
  });
  const displayProducts =
    products && products.length > 0
      ? products
      : (SAMPLE_PRODUCTS.filter(
          (p) => p.state === decodeURIComponent(stateName),
        ) as any);

  const stateArtisans = ARTISANS.filter(
    (a) => a.state === decodeURIComponent(stateName),
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-cream">
      {/* State Header */}
      <div
        className="py-12 text-white"
        style={{ backgroundColor: stateInfo?.bgColor ?? "#0E6F66" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <Link
            to="/shop"
            search={(p: any) => p ?? {}}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm"
            data-ocid="state.link"
          >
            <ArrowLeft size={16} /> Back to Shop
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl flex-shrink-0">
              {stateInfo?.type === "ut"
                ? "\uD83C\uDFD9\uFE0F"
                : "\uD83C\uDFDB\uFE0F"}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={16} className="text-white/70" />
                <span className="text-white/70 text-sm capitalize">
                  {stateInfo?.type === "ut" ? "Union Territory" : "State"} of
                  India
                </span>
              </div>
              <h1 className="font-display font-bold text-4xl mb-1">
                {decodeURIComponent(stateName)}
              </h1>
              {stateInfo?.nativeName && (
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-white/80 text-lg font-semibold">
                    {stateInfo.nativeName}
                  </span>
                  {stateInfo?.sanskritName && (
                    <span className="text-white/60 text-base italic">
                      {stateInfo.sanskritName}
                    </span>
                  )}
                </div>
              )}
              <p className="text-white/80 max-w-xl mb-4">
                {stateInfo?.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {stateInfo?.crafts.map((craft) => (
                  <Badge
                    key={craft}
                    className="bg-white/20 text-white border-white/30"
                  >
                    {craft}
                  </Badge>
                ))}
              </div>
              {/* Divinity Title */}
              {stateInfo?.divinityTitle && (
                <p className="text-amber-200 font-semibold text-lg mt-2 drop-shadow">
                  {stateInfo.divinityTitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sanskriti & Spiritual Heritage */}
      {stateInfo?.culturalHighlights &&
        stateInfo.culturalHighlights.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 pt-10">
            <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                \uD83D\uDD49\uFE0F Sanskriti &amp; Spiritual Heritage
              </h2>
              <ul className="space-y-3">
                {stateInfo.culturalHighlights.map((highlight) => (
                  <li
                    key={highlight.slice(0, 40)}
                    className="flex items-start gap-3 text-stone-700 leading-relaxed"
                  >
                    <span className="text-lg mt-0.5 flex-shrink-0">
                      \uD83E\uDEB7
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-display font-bold text-2xl uppercase text-charcoal mb-8">
          Crafts from {decodeURIComponent(stateName)}
        </h2>

        {isLoading ? (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            data-ocid="state.loading_state"
          >
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-72 rounded-lg" />
            ))}
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="text-center py-16" data-ocid="state.empty_state">
            <p className="text-muted-foreground mb-4">
              No products found for {decodeURIComponent(stateName)} yet
            </p>
            <Link to="/shop" search={(prev: any) => prev}>
              <Button
                className="bg-saffron text-white"
                data-ocid="state.primary_button"
              >
                Browse All Products
              </Button>
            </Link>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            data-ocid="state.list"
          >
            {displayProducts.map((p: any, i: number) => (
              <ProductCard key={p.id} product={p} index={i + 1} />
            ))}
          </div>
        )}

        {/* Meet the Artisans */}
        {stateArtisans.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-xl text-charcoal">
                \uD83E\uDDF5 Master Artisans of {decodeURIComponent(stateName)}
              </h3>
              <Link to="/artisans" data-ocid="state.link">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-300 text-amber-800 hover:bg-amber-50 text-xs"
                >
                  Meet All Artisans
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {stateArtisans.map((artisan, i) => (
                <Link
                  key={artisan.id}
                  to="/artisan/$artisanId"
                  params={{ artisanId: artisan.id }}
                  data-ocid={`state.item.${i + 1}`}
                >
                  <div className="bg-white border border-amber-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-red-800 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {artisan.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal group-hover:text-saffron transition-colors">
                          {artisan.name}
                        </p>
                        <p className="text-xs text-saffron">{artisan.craft}</p>
                      </div>
                    </div>
                    <p className="text-xs italic text-muted-foreground line-clamp-2">
                      &ldquo;{artisan.quote}&rdquo;
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Explore More States */}
        <div className="mt-12">
          <h3 className="font-semibold text-lg mb-4">Explore Other States</h3>
          <div className="flex flex-wrap gap-2">
            {INDIAN_STATES.filter(
              (s) => s.name !== decodeURIComponent(stateName),
            )
              .slice(0, 12)
              .map((s) => (
                <Link
                  key={s.name}
                  to="/state/$stateName"
                  params={{ stateName: s.name }}
                  data-ocid="state.link"
                >
                  <Badge
                    className="cursor-pointer text-white border-0 hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: s.bgColor }}
                  >
                    {s.name}
                  </Badge>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
