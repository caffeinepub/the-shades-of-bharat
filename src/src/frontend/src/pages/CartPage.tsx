import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQty, total, itemCount } = useCart();
  const shipping = total >= 500 ? 0 : 99;
  const grandTotal = total + shipping;

  if (itemCount === 0) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center py-16" data-ocid="cart.empty_state">
          <ShoppingBag
            size={64}
            className="mx-auto text-muted-foreground mb-4"
          />
          <h2 className="font-display font-bold text-2xl text-charcoal mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Discover amazing handcrafted products from across India
          </p>
          <Link
            to="/shop"
            search={(p: any) => p ?? {}}
            data-ocid="cart.primary_button"
          >
            <Button className="bg-saffron text-white">Start Shopping</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="font-display font-bold text-3xl uppercase text-charcoal mb-6">
          Shopping Cart ({itemCount})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4" data-ocid="cart.list">
            {items.map((item, i) => (
              <div
                key={item.productId}
                className="bg-white rounded-xl p-4 flex gap-4 shadow-card"
                data-ocid={`cart.item.${i + 1}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  className="w-20 h-24 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground mb-1 truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-1">
                    by {item.artisanName}
                  </p>
                  <p className="text-xs text-peacock mb-3">{item.state}</p>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateQty(item.productId, item.qty - 1)}
                        className="px-2 py-1.5 hover:bg-muted transition-colors"
                        aria-label="Decrease"
                        data-ocid={`cart.button.${i + 1}`}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-sm font-semibold border-x border-border">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.productId, item.qty + 1)}
                        className="px-2 py-1.5 hover:bg-muted transition-colors"
                        aria-label="Increase"
                        data-ocid={`cart.button.${i + 1}`}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-bold text-sm">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove"
                      data-ocid={`cart.delete_button.${i + 1}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl p-5 shadow-card h-fit sticky top-24">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({itemCount} items)
                </span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span
                  className={shipping === 0 ? "text-peacock font-medium" : ""}
                >
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Add ₹{(500 - total).toLocaleString("en-IN")} more for free
                  shipping
                </p>
              )}
              <Separator />
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block mt-6"
              data-ocid="cart.primary_button"
            >
              <Button className="w-full bg-saffron hover:bg-turmeric text-white h-12 text-base font-semibold">
                Proceed to Checkout <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link
              to="/shop"
              search={(p: any) => p ?? {}}
              className="block mt-3"
              data-ocid="cart.link"
            >
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
