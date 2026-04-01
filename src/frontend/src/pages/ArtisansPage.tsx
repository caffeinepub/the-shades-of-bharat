import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ARTISANS as STATIC_ARTISANS } from "@/data/artisans";
import { useArtisans } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { useState } from "react";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_GRADIENTS = [
  "from-amber-600 to-red-800",
  "from-orange-500 to-rose-700",
  "from-yellow-600 to-amber-800",
  "from-amber-700 to-orange-900",
  "from-red-700 to-rose-900",
];

export default function ArtisansPage() {
  const [selectedState, setSelectedState] = useState("All");
  const { data: backendArtisans = [], isLoading } = useArtisans();

  const artisans =
    backendArtisans.length > 0
      ? backendArtisans.map((a: any) => ({
          ...a,
          experience: Number(a.experience),
        }))
      : STATIC_ARTISANS;

  const states = [
    "All",
    ...(Array.from(
      new Set(artisans.map((a: any) => a.state)),
    ).sort() as string[]),
  ];
  const filtered =
    selectedState === "All"
      ? artisans
      : artisans.filter((a: any) => a.state === selectedState);

  return (
    <main className="min-h-screen bg-cream" data-ocid="artisans.page">
      {/* Hero Header */}
      <div
        className="py-16 text-white"
        style={{
          background:
            "linear-gradient(135deg, #7A2C2A 0%, #8B1A1A 40%, #B8651A 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
            <Users size={32} className="text-amber-300" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Meet the Artisans of Bharat
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Behind every woven thread, every painted panel, and every cast idol
            stands a master craftsperson — a living link to India's ancient
            heritage. These are their stories.
          </p>
          <p className="text-amber-300 mt-3 text-sm font-medium">
            🙏 हस्तकला · हस्तशिल्प · भारतस्य परम्परा — The Living Tradition of
            India's Hands
          </p>
        </div>
      </div>

      {/* State Filter */}
      <div className="bg-white border-b border-amber-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {states.map((state) => (
              <button
                key={state}
                type="button"
                onClick={() => setSelectedState(state)}
                data-ocid="artisans.tab"
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  selectedState === state
                    ? "bg-saffron text-white border-saffron shadow-sm"
                    : "bg-white text-charcoal border-amber-200 hover:border-saffron hover:text-saffron"
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Artisan Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            data-ocid="artisans.loading_state"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            <p className="text-muted-foreground text-sm mb-8">
              Showing <strong>{filtered.length}</strong> artisan
              {filtered.length !== 1 ? "s" : ""}
              {selectedState !== "All"
                ? ` from ${selectedState}`
                : " across all states"}
            </p>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              data-ocid="artisans.list"
            >
              {filtered.map((artisan: any, i: number) => (
                <Card
                  key={artisan.id}
                  className="group bg-white border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  data-ocid={`artisans.item.${i + 1}`}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    {/* Avatar or image */}
                    {artisan.imageUrl ? (
                      <img
                        src={artisan.imageUrl}
                        alt={artisan.name}
                        className="w-20 h-20 rounded-full object-cover shadow-md ring-4 ring-amber-100 group-hover:ring-amber-300 transition-all"
                      />
                    ) : (
                      <div
                        className={`w-20 h-20 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white font-bold text-2xl shadow-md ring-4 ring-amber-100 group-hover:ring-amber-300 transition-all`}
                      >
                        {getInitials(artisan.name)}
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <h3 className="font-display font-bold text-charcoal text-lg leading-tight">
                        {artisan.name}
                      </h3>
                      <p className="text-saffron font-medium text-sm mt-0.5">
                        {artisan.craft}
                      </p>
                    </div>

                    {/* State Badge */}
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                      📍 {artisan.state}
                    </Badge>

                    {/* Quote */}
                    <p className="text-muted-foreground text-xs italic leading-relaxed line-clamp-3">
                      &ldquo;{artisan.quote}&rdquo;
                    </p>

                    {/* Experience */}
                    <p className="text-xs text-stone-500">
                      ⛺ {artisan.experience} years of mastery
                    </p>

                    {/* CTA */}
                    <Link
                      to="/artisan/$artisanId"
                      params={{ artisanId: artisan.id }}
                      className="w-full mt-1"
                      data-ocid={`artisans.link.${i + 1}`}
                    >
                      <Button
                        className="w-full bg-saffron hover:bg-amber-600 text-white text-sm"
                        data-ocid={`artisans.primary_button.${i + 1}`}
                      >
                        View Profile
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <div
                className="text-center py-16"
                data-ocid="artisans.empty_state"
              >
                <p className="text-muted-foreground">
                  No artisans found for this state yet.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
