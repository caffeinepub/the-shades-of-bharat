import type { Product } from "@/backend";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { INDIAN_STATES, SAMPLE_PRODUCTS } from "@/data/indianStates";
import { useProducts } from "@/hooks/useQueries";
import { useSearch } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

const CATEGORIES = [
  "Handloom & Textiles",
  "Handicrafts",
  "Tribal Art",
  "Paintings & Prints",
  "Jewelry",
  "Pottery & Ceramics",
  "Food & Spices",
  "Festival Specials",
];
const CRAFT_TYPES = [
  "Banarasi Silk",
  "Pashmina",
  "Madhubani Art",
  "Warli Art",
  "Phulkari",
  "Pattachitra",
  "Kutch Embroidery",
  "Blue Pottery",
  "Dokra",
  "Kanjeevaram",
  "Ikat",
  "Channapatna",
];

type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "name";

export default function ShopPage() {
  const searchParams = useSearch({ from: "/shop" }) as any;

  const [searchQuery, setSearchQuery] = useState(searchParams?.search ?? "");
  const [selectedState, setSelectedState] = useState(searchParams?.state ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams?.category ? [searchParams.category] : [],
  );
  const [selectedCrafts, setSelectedCrafts] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filter = useMemo(
    () => ({
      state: selectedState || undefined,
      category: selectedCategories[0] || undefined,
      search: searchQuery || undefined,
    }),
    [selectedState, selectedCategories, searchQuery],
  );

  const { data: backendProducts, isLoading } = useProducts(filter);
  const allProducts: Product[] =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : (SAMPLE_PRODUCTS as any);

  const sortedProducts = useMemo(() => {
    const filtered = allProducts.filter((p) => {
      const price = Number(p.price);
      if (price < priceRange[0] || price > priceRange[1]) return false;
      if (selectedCrafts.length > 0 && !selectedCrafts.includes(p.craftType))
        return false;
      return true;
    });
    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
      case "price-desc":
        return [...filtered].sort((a, b) => Number(b.price) - Number(a.price));
      case "newest":
        return [...filtered].sort(
          (a, b) => Number(b.createdAt) - Number(a.createdAt),
        );
      case "name":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [allProducts, priceRange, selectedCrafts, sortBy]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const toggleCraft = (craft: string) => {
    setSelectedCrafts((prev) =>
      prev.includes(craft) ? prev.filter((c) => c !== craft) : [...prev, craft],
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedState("");
    setSelectedCategories([]);
    setSelectedCrafts([]);
    setPriceRange([0, 25000]);
  };

  const hasFilters =
    searchQuery ||
    selectedState ||
    selectedCategories.length > 0 ||
    selectedCrafts.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 25000;

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* State */}
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wider text-charcoal mb-3">
          State / Region
        </h3>
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger data-ocid="shop.select">
            <SelectValue placeholder="All States" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {INDIAN_STATES.map((s) => (
              <SelectItem key={s.name} value={s.name}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wider text-charcoal mb-3">
          Price Range: \u20b9{priceRange[0].toLocaleString("en-IN")} \u2014
          \u20b9
          {priceRange[1].toLocaleString("en-IN")}
        </h3>
        <Slider
          min={0}
          max={25000}
          step={500}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mt-2"
          data-ocid="shop.input"
        />
      </div>

      {/* Category */}
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wider text-charcoal mb-3">
          Category
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat}`}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
                data-ocid="shop.checkbox"
              />
              <Label htmlFor={`cat-${cat}`} className="text-sm cursor-pointer">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Craft Type */}
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wider text-charcoal mb-3">
          Craft Type
        </h3>
        <div className="space-y-2">
          {CRAFT_TYPES.map((craft) => (
            <div key={craft} className="flex items-center gap-2">
              <Checkbox
                id={`craft-${craft}`}
                checked={selectedCrafts.includes(craft)}
                onCheckedChange={() => toggleCraft(craft)}
                data-ocid="shop.checkbox"
              />
              <Label
                htmlFor={`craft-${craft}`}
                className="text-sm cursor-pointer"
              >
                {craft}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {hasFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
          data-ocid="shop.secondary_button"
        >
          <X size={14} className="mr-2" /> Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl uppercase text-charcoal mb-2">
            Shop India's Finest
          </h1>
          {selectedState && (
            <div className="flex items-center gap-2">
              <Badge className="bg-indigo text-white">{selectedState}</Badge>
              <button
                type="button"
                onClick={() => setSelectedState("")}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Search + Sort bar */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crafts, artisans..."
              className="pl-9"
              data-ocid="shop.search_input"
            />
          </div>
          <Select
            value={sortBy}
            onValueChange={(v) => setSortBy(v as SortOption)}
          >
            <SelectTrigger className="w-48" data-ocid="shop.select">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
            data-ocid="shop.toggle"
          >
            <SlidersHorizontal size={16} className="mr-2" /> Filters
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className="w-64 flex-shrink-0 hidden md:block">
            <div className="bg-white rounded-xl p-5 shadow-card sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Filters</h2>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs text-saffron hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Mobile Filters */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <button
                type="button"
                className="absolute inset-0 bg-black/50 w-full"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close filters"
              />
              <div className="absolute left-0 top-0 bottom-0 w-72 bg-white overflow-y-auto p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Filters</h2>
                  <button type="button" onClick={() => setSidebarOpen(false)}>
                    <X size={20} />
                  </button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {sortedProducts.length} products found
              </p>
            </div>

            {isLoading ? (
              <div
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
                data-ocid="shop.loading_state"
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                  <Skeleton key={i} className="h-72 rounded-lg" />
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-16" data-ocid="shop.empty_state">
                <div className="text-5xl mb-4">\ud83e\uddb5</div>
                <h3 className="font-display font-bold text-xl text-charcoal mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-saffron text-white"
                  data-ocid="shop.primary_button"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
                data-ocid="shop.list"
              >
                {sortedProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={i + 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
