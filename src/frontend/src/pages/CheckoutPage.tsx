import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { usePlaceOrder } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { identity } = useInternetIdentity();
  const placeOrder = usePlaceOrder();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
  });

  const shipping = total >= 500 ? 0 : 99;
  const grandTotal = total + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.address ||
      !form.city ||
      !form.pincode ||
      !form.phone
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    const shippingAddress = `${form.name}, ${form.address}, ${form.city}, ${form.state} - ${form.pincode}. Phone: ${form.phone}`;
    try {
      const orderId = await placeOrder.mutateAsync({
        items: items.map((i) => ({
          productId: i.productId,
          qty: i.qty,
          price: i.price,
        })),
        total: grandTotal,
        shippingAddress,
        guestEmail: !identity ? form.email : undefined,
      });
      clearCart();
      navigate({ to: "/order-success", search: { orderId } });
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="font-display font-bold text-3xl uppercase text-charcoal mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Shipping Form */}
            <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-card">
              <h2 className="font-semibold text-lg mb-5">Shipping Details</h2>

              {!identity && (
                <div className="mb-6 p-4 bg-cream rounded-lg">
                  <h3 className="font-semibold text-sm mb-3">Guest Checkout</h3>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="mt-1"
                      required
                      data-ocid="checkout.input"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-1"
                    required
                    data-ocid="checkout.input"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="Street address, apartment, etc."
                    required
                    data-ocid="checkout.input"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="mt-1"
                    required
                    data-ocid="checkout.input"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="mt-1"
                    required
                    data-ocid="checkout.input"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">PIN Code *</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    className="mt-1"
                    maxLength={6}
                    data-ocid="checkout.input"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1"
                    required
                    data-ocid="checkout.input"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-5 shadow-card sticky top-24">
                <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3 text-sm">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-14 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-muted-foreground text-xs">
                          Qty: {item.qty}
                        </p>
                        <p className="font-semibold">
                          ₹{(item.price * item.qty).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="mb-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shipping === 0 ? "text-peacock" : ""}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full mt-6 bg-saffron hover:bg-turmeric text-white h-12 text-base font-semibold"
                  disabled={placeOrder.isPending}
                  data-ocid="checkout.submit_button"
                >
                  {placeOrder.isPending ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                      Placing Order...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
