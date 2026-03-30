import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
              {stateInfo?.type === "ut" ? "🏙️" : "🏛️"}
            </div>
            <div>
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
              <div className="flex flex-wrap gap-2">
                {stateInfo?.crafts.map((craft) => (
                  <Badge
                    key={craft}
                    className="bg-white/20 text-white border-white/30"
                  >
                    {craft}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
