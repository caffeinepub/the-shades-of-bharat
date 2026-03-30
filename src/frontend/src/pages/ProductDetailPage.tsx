import { StarRating } from "@/components/Motifs";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { SAMPLE_PRODUCTS } from "@/data/indianStates";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useAddReview,
  useProduct,
  useProductReviews,
  useProducts,
  useToggleWishlist,
  useWishlist,
} from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import {
  ChevronLeft,
  Heart,
  MapPin,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id } = useParams({ from: "/product/$id" });
  const { addItem } = useCart();
  const { identity } = useInternetIdentity();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const { data: productData, isLoading } = useProduct(id);
  const { data: reviews = [] } = useProductReviews(id);
  const { data: wishlist = [] } = useWishlist();
  const toggleWishlist = useToggleWishlist();
  const addReview = useAddReview();

  const product =
    productData ?? (SAMPLE_PRODUCTS.find((p) => p.id === id) as any);

  const { data: relatedProducts = [] } = useProducts({ state: product?.state });
  const related = (
    relatedProducts.length > 0 ? relatedProducts : (SAMPLE_PRODUCTS as any[])
  )
    .filter((p: any) => p.id !== id)
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="aspect-square rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-24" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="font-display font-bold text-2xl mb-2">
            Product not found
          </h2>
          <Link to="/shop" search={(p: any) => p ?? {}}>
            <Button className="bg-saffron text-white">Browse Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const price = Number(product.price);
  const originalPrice = Number(product.originalPrice);
  const hasDiscount = originalPrice > price;
  const isWishlisted = wishlist.includes(product.id);
  const allImages = [
    product.imageUrl,
    ...(product.additionalImages || []),
  ].filter(Boolean);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price,
      imageUrl: product.imageUrl,
      artisanName: product.artisanName,
      state: product.state,
      qty,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.error("Please fill in all review fields");
      return;
    }
    addReview.mutate(
      {
        productId: product.id,
        userName: reviewName,
        rating: reviewRating,
        comment: reviewComment,
      },
      {
        onSuccess: () => {
          toast.success("Review submitted!");
          setReviewName("");
          setReviewComment("");
          setReviewRating(5);
        },
        onError: () => toast.error("Failed to submit review"),
      },
    );
  };

  return (
    <main className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-saffron" data-ocid="product.link">
            Home
          </Link>
          <span>/</span>
          <Link
            to="/shop"
            search={(p: any) => p ?? {}}
            className="hover:text-saffron"
            data-ocid="product.link"
          >
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div>
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-white shadow-card mb-3">
              <img
                src={allImages[activeImage] || product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2">
                {allImages.map((img, i) => (
                  <button
                    // biome-ignore lint/suspicious/noArrayIndexKey: thumbnail index
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                      activeImage === i
                        ? "border-saffron"
                        : "border-transparent"
                    }`}
                    data-ocid={`product.toggle.${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-peacock text-white text-xs">
                  <MapPin size={10} className="mr-1" />
                  {product.state}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {product.craftType}
                </Badge>
                {product.isBestseller && (
                  <Badge className="bg-saffron text-white text-xs">
                    Bestseller
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    toggleWishlist.mutate({
                      productId: product.id,
                      isWishlisted,
                    })
                  }
                  className="p-2 rounded-full border border-border hover:border-saffron transition-colors"
                  aria-label="Toggle wishlist"
                  data-ocid="product.toggle"
                >
                  <Heart
                    size={18}
                    className={
                      isWishlisted
                        ? "fill-crimson text-crimson"
                        : "text-muted-foreground"
                    }
                  />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-full border border-border hover:border-saffron transition-colors"
                  aria-label="Share"
                  data-ocid="product.button"
                >
                  <Share2 size={18} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            <h1 className="font-display font-bold text-2xl md:text-3xl text-charcoal mb-2">
              {product.name}
            </h1>
            <p className="text-muted-foreground text-sm mb-4">
              by{" "}
              <span className="font-medium text-foreground">
                {product.artisanName}
              </span>
            </p>

            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={4} size={18} />
              <span className="text-sm text-muted-foreground">
                ({reviews.length} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-display font-bold text-3xl text-charcoal">
                ₹{price.toLocaleString("en-IN")}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                  <Badge className="bg-crimson text-white">
                    {Math.round((1 - price / originalPrice) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <Label className="font-semibold text-sm">Quantity</Label>
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                  data-ocid="product.button"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 py-2 font-semibold text-sm border-x border-border">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQty((q) => Math.min(Number(product.stockQty), q + 1))
                  }
                  className="px-3 py-2 hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                  data-ocid="product.button"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-xs text-muted-foreground">
                {Number(product.stockQty)} in stock
              </span>
            </div>

            <div className="flex gap-3 mb-6">
              <Button
                className="flex-1 bg-saffron hover:bg-turmeric text-white h-12 text-base font-semibold"
                onClick={handleAddToCart}
                data-ocid="product.primary_button"
              >
                <ShoppingCart size={18} className="mr-2" /> Add to Cart
              </Button>
              <Link to="/cart" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full h-12 text-base font-semibold border-saffron text-saffron hover:bg-saffron hover:text-white"
                  data-ocid="product.secondary_button"
                >
                  Buy Now
                </Button>
              </Link>
            </div>

            <Separator className="mb-4" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p>✅ Authentic craft verified by India Craft Bazaar</p>
              <p>📦 Free shipping on orders above ₹500</p>
              <p>🔄 Easy 30-day returns</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="description"
          className="mb-12"
          data-ocid="product.panel"
        >
          <TabsList className="w-full justify-start border-b border-border bg-transparent h-auto p-0 mb-6">
            {["description", "artisan", "care", "reviews"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="px-4 py-3 capitalize data-[state=active]:border-b-2 data-[state=active]:border-saffron data-[state=active]:text-saffron rounded-none bg-transparent"
                data-ocid="product.tab"
              >
                {tab === "artisan"
                  ? "Artisan Story"
                  : tab === "care"
                    ? "Care Instructions"
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value="description"
            className="prose prose-sm max-w-none"
          >
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </TabsContent>

          <TabsContent value="artisan">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-saffron/20 flex items-center justify-center flex-shrink-0">
                <span className="font-display font-bold text-saffron text-xl">
                  {product.artisanName.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  {product.artisanName}
                </h3>
                <Badge className="bg-peacock/10 text-peacock mb-3">
                  {product.state}
                </Badge>
                <p className="text-muted-foreground leading-relaxed">
                  {product.artisanStory}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="care">
            <p className="text-muted-foreground leading-relaxed">
              {product.careInstructions}
            </p>
          </TabsContent>

          <TabsContent value="reviews" data-ocid="product.panel">
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p
                  className="text-muted-foreground"
                  data-ocid="product.empty_state"
                >
                  No reviews yet. Be the first to review!
                </p>
              ) : (
                reviews.map((review, i) => (
                  <div
                    key={review.id}
                    className="border-b border-border pb-4 last:border-0"
                    data-ocid={`product.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center">
                        <span className="text-saffron font-bold text-xs">
                          {review.userName.charAt(0)}
                        </span>
                      </div>
                      <span className="font-semibold text-sm">
                        {review.userName}
                      </span>
                      <StarRating rating={Number(review.rating)} size={12} />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}

              {/* Add Review Form */}
              <div className="bg-cream rounded-xl p-6">
                <h4 className="font-semibold mb-4">Write a Review</h4>
                {!identity ? (
                  <p className="text-muted-foreground text-sm">
                    Please{" "}
                    <Link
                      to="/account"
                      className="text-saffron hover:underline"
                      data-ocid="product.link"
                    >
                      sign in
                    </Link>{" "}
                    to write a review.
                  </p>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="review-name">Your Name</Label>
                      <Input
                        id="review-name"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        className="mt-1"
                        data-ocid="product.input"
                      />
                    </div>
                    <div>
                      <Label>Rating</Label>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((r) => (
                          <button
                            type="button"
                            key={r}
                            onClick={() => setReviewRating(r)}
                            className="p-1"
                            data-ocid="product.toggle"
                          >
                            <Star
                              size={20}
                              className={
                                r <= reviewRating
                                  ? "fill-saffron text-saffron"
                                  : "text-muted-foreground"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="review-comment">Your Review</Label>
                      <Textarea
                        id="review-comment"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={3}
                        className="mt-1"
                        data-ocid="product.textarea"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-saffron text-white"
                      disabled={addReview.isPending}
                      data-ocid="product.submit_button"
                    >
                      {addReview.isPending ? "Submitting..." : "Submit Review"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-2xl text-charcoal mb-6">
              More from {product.state}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p: any, i: number) => (
                <ProductCard key={p.id} product={p} index={i + 1} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
