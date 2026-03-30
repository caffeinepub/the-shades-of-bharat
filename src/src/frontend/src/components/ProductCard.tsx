import type { Product } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToggleWishlist, useWishlist } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { Heart, MapPin, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { StarRating } from "./Motifs";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 1 }: ProductCardProps) {
  const { addItem } = useCart();
  const { data: wishlist = [] } = useWishlist();
  const toggleWishlist = useToggleWishlist();
  const isWishlisted = wishlist.includes(product.id);

  const price = Number(product.price);
  const originalPrice = Number(product.originalPrice);
  const hasDiscount = originalPrice > price;
  const discountPct = hasDiscount
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price,
      imageUrl: product.imageUrl,
      artisanName: product.artisanName,
      state: product.state,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist.mutate({ productId: product.id, isWishlisted });
  };

  return (
    <div
      className="bg-card rounded-lg overflow-hidden shadow-card card-hover group"
      data-ocid={`product.item.${index}`}
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        <Link to="/product/$id" params={{ id: product.id }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNewArrival && (
            <Badge className="bg-peacock text-white text-xs">New</Badge>
          )}
          {product.isBestseller && (
            <Badge className="bg-crimson text-white text-xs">Bestseller</Badge>
          )}
          {hasDiscount && (
            <Badge className="bg-saffron text-white text-xs">
              {discountPct}% off
            </Badge>
          )}
        </div>
        {/* Wishlist */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          data-ocid={`product.toggle.${index}`}
        >
          <Heart
            size={14}
            className={
              isWishlisted
                ? "fill-crimson text-crimson"
                : "text-muted-foreground"
            }
          />
        </button>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-1 mb-1">
          <MapPin size={10} className="text-peacock flex-shrink-0" />
          <span className="text-xs text-peacock font-medium truncate">
            {product.state}
          </span>
          <span className="text-xs text-muted-foreground ml-auto truncate">
            {product.craftType}
          </span>
        </div>

        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-semibold text-sm text-foreground hover:text-saffron transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground mb-2 truncate">
          by {product.artisanName}
        </p>

        <div className="flex items-center gap-1 mb-2">
          <StarRating rating={4} size={12} />
          <span className="text-xs text-muted-foreground">(4.5)</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="font-bold text-foreground text-sm">
              \u20b9{price.toLocaleString("en-IN")}
            </span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through ml-1">
                \u20b9{originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-saffron hover:bg-turmeric text-white text-xs px-2 py-1 h-7"
            data-ocid={`product.primary_button.${index}`}
          >
            <ShoppingCart size={12} className="mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
