import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ARTISANS } from "@/data/artisans";
import { INDIAN_STATES } from "@/data/indianStates";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Award, BookOpen, Gem, ShoppingBag } from "lucide-react";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ArtisanProfilePage() {
  const { artisanId } = useParams({ from: "/artisan/$artisanId" });
  const artisan = ARTISANS.find((a) => a.id === artisanId);

  if (!artisan) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center" data-ocid="artisan.error_state">
          <p className="text-2xl text-muted-foreground mb-4">
            Artisan not found
          </p>
          <Link to="/artisans">
            <Button
              className="bg-saffron text-white"
              data-ocid="artisan.primary_button"
            >
              Back to Artisans
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const stateInfo = INDIAN_STATES.find((s) => s.name === artisan.state);
  const bgColor = stateInfo?.bgColor ?? "#7A2C2A";

  const otherArtisans = ARTISANS.filter(
    (a) => a.state === artisan.state && a.id !== artisan.id,
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-cream" data-ocid="artisan.page">
      {/* Hero Section */}
      <div className="py-16 text-white" style={{ backgroundColor: bgColor }}>
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/artisans"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 text-sm transition-colors"
            data-ocid="artisan.link"
          >
            <ArrowLeft size={16} /> Back to All Artisans
          </Link>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-4xl font-bold text-white shadow-2xl flex-shrink-0">
              {getInitials(artisan.name)}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-display font-bold text-4xl mb-2">
                {artisan.name}
              </h1>
              <div className="flex flex-wrap gap-2 mb-3 justify-center sm:justify-start">
                <Link
                  to="/state/$stateName"
                  params={{ stateName: artisan.state }}
                  data-ocid="artisan.link"
                >
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors cursor-pointer">
                    📍 {artisan.state}
                  </Badge>
                </Link>
                <Badge className="bg-white/20 text-white border-white/30">
                  ⛺ {artisan.craft}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  ⏳ {artisan.experience} years
                </Badge>
              </div>
              <blockquote className="text-xl italic text-white/90 leading-relaxed max-w-2xl">
                &ldquo;{artisan.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        {/* Story */}
        <Card className="border-amber-100" data-ocid="artisan.card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-maroon">
              <BookOpen size={20} />
              Their Story
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-charcoal leading-relaxed text-base">
              {artisan.story}
            </p>
          </CardContent>
        </Card>

        {/* Craft Mastery */}
        <Card className="border-amber-100">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-maroon">
              <Gem size={20} />
              Craft Mastery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">
                Speciality
              </p>
              <p className="text-charcoal font-semibold">
                {artisan.speciality}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-2">
                Signature Works
              </p>
              <ul className="space-y-1">
                {artisan.products.map((product) => (
                  <li
                    key={product}
                    className="flex items-center gap-2 text-charcoal"
                  >
                    <span className="text-saffron">🪷</span>
                    {product}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Awards */}
        {artisan.awards && (
          <Card className="border-amber-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-maroon">
                <Award size={20} />
                Awards &amp; Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-charcoal flex items-start gap-2">
                <span className="text-amber-500 text-lg">🏆</span>
                {artisan.awards}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Cultural Heritage */}
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-700">
              🕉️ Cultural Heritage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-stone-700 leading-relaxed">
              {artisan.culturalNote}
            </p>
          </CardContent>
        </Card>

        {/* Shop & State Links */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/state/$stateName"
            params={{ stateName: artisan.state }}
            className="flex-1"
            data-ocid="artisan.link"
          >
            <Button
              className="w-full bg-saffron hover:bg-amber-600 text-white flex items-center gap-2 justify-center"
              data-ocid="artisan.primary_button"
            >
              <ShoppingBag size={16} />
              Crafts from {artisan.state}
            </Button>
          </Link>
          <Link to="/artisans" className="flex-1" data-ocid="artisan.link">
            <Button
              variant="outline"
              className="w-full border-amber-300 text-amber-800 hover:bg-amber-50"
              data-ocid="artisan.secondary_button"
            >
              Meet All Artisans
            </Button>
          </Link>
        </div>

        {/* Other artisans from same state */}
        {otherArtisans.length > 0 && (
          <div className="mt-4">
            <h3 className="font-display font-semibold text-lg text-charcoal mb-4">
              Other Master Artisans from {artisan.state}
            </h3>
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              data-ocid="artisan.list"
            >
              {otherArtisans.map((a, i) => (
                <Link
                  key={a.id}
                  to="/artisan/$artisanId"
                  params={{ artisanId: a.id }}
                  data-ocid={`artisan.item.${i + 1}`}
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border-amber-100">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-red-800 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {getInitials(a.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-charcoal">
                          {a.name}
                        </p>
                        <p className="text-xs text-saffron">{a.craft}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
