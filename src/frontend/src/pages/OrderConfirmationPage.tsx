import { Button } from "@/components/ui/button";
import { Link, useSearch } from "@tanstack/react-router";
import { CheckCircle, Home, Package, Truck } from "lucide-react";
import { motion } from "motion/react";

const STEPS = [
  {
    icon: CheckCircle,
    label: "Order Confirmed",
    desc: "We've received your order",
    done: true,
  },
  {
    icon: Package,
    label: "Processing",
    desc: "Artisan preparing your item (2-3 days)",
    done: false,
  },
  {
    icon: Truck,
    label: "Shipped",
    desc: "On the way to you (3-5 days)",
    done: false,
  },
  {
    icon: Home,
    label: "Delivered",
    desc: "Estimated: 5-7 business days",
    done: false,
  },
];

export default function OrderConfirmationPage() {
  const search = useSearch({ from: "/order-success" }) as any;
  const orderId = search?.orderId;

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-lg mx-auto px-4 py-12 text-center"
        data-ocid="order-confirm.panel"
      >
        <div className="w-20 h-20 rounded-full bg-peacock/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-peacock" />
        </div>
        <h1 className="font-display font-bold text-3xl text-charcoal mb-3">
          Order Placed Successfully!
        </h1>
        <p className="text-muted-foreground mb-2">
          Thank you for supporting India's artisans
        </p>
        {orderId && (
          <p className="text-sm font-medium mb-6">
            Order ID: <span className="text-saffron font-bold">{orderId}</span>
          </p>
        )}

        <div className="bg-white rounded-xl p-6 shadow-card mb-6">
          <h3 className="font-semibold mb-4 text-left">What happens next?</h3>
          <div className="space-y-4">
            {STEPS.map((step) => (
              <div
                key={step.label}
                className="flex items-start gap-3 text-left"
              >
                <step.icon
                  size={18}
                  className={
                    step.done
                      ? "text-peacock mt-0.5"
                      : "text-muted-foreground mt-0.5"
                  }
                />
                <div>
                  <p
                    className={`font-semibold text-sm ${step.done ? "text-peacock" : "text-muted-foreground"}`}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Link to="/orders" data-ocid="order-confirm.link">
            <Button variant="outline">Track Order</Button>
          </Link>
          <Link
            to="/shop"
            search={(p: any) => p ?? {}}
            data-ocid="order-confirm.primary_button"
          >
            <Button className="bg-saffron text-white">Continue Shopping</Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
