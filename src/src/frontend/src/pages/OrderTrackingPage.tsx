import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useUserOrders } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { CheckCircle, Clock, Home, LogIn, Package, Truck } from "lucide-react";

const STATUS_STEPS = ["ordered", "processing", "shipped", "delivered"];
const STATUS_ICONS = {
  ordered: CheckCircle,
  processing: Package,
  shipped: Truck,
  delivered: Home,
};

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    ordered: "bg-saffron/10 text-saffron border-saffron/30",
    processing: "bg-indigo/10 text-indigo border-indigo/30",
    shipped: "bg-peacock/10 text-peacock border-peacock/30",
    delivered: "bg-green-100 text-green-700 border-green-300",
    cancelled: "bg-destructive/10 text-destructive border-destructive/30",
  };
  const cls = colors[status.toLowerCase()] ?? "bg-muted text-muted-foreground";
  return <Badge className={`${cls} border capitalize`}>{status}</Badge>;
}

export default function OrderTrackingPage() {
  const { identity, login } = useInternetIdentity();
  const { data: orders = [], isLoading } = useUserOrders();

  if (!identity) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center py-12" data-ocid="orders.panel">
          <LogIn size={48} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="font-display font-bold text-2xl mb-2">
            Sign In to View Orders
          </h2>
          <p className="text-muted-foreground mb-6">
            Please sign in to track your orders
          </p>
          <Button
            onClick={() => login()}
            className="bg-saffron text-white"
            data-ocid="orders.primary_button"
          >
            Sign In
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="font-display font-bold text-3xl uppercase text-charcoal mb-8">
          My Orders
        </h1>

        {isLoading ? (
          <div className="space-y-4" data-ocid="orders.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16" data-ocid="orders.empty_state">
            <Package size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-display font-bold text-xl mb-2">
              No orders yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Start shopping to see your orders here
            </p>
            <Link to="/shop" search={(p: any) => p ?? {}}>
              <Button
                className="bg-saffron text-white"
                data-ocid="orders.primary_button"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4" data-ocid="orders.list">
            {orders.map((order, i) => (
              <div
                key={order.id}
                className="bg-white rounded-xl p-5 shadow-card"
                data-ocid={`orders.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Order ID</p>
                    <p className="font-mono font-semibold text-sm">
                      {order.id.slice(0, 16)}...
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Clock size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {new Date(
                      Number(order.createdAt) / 1_000_000,
                    ).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="ml-auto font-bold">
                    ₹{Number(order.total).toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Status Timeline */}
                <div className="flex items-center gap-1">
                  {STATUS_STEPS.map((step, si) => {
                    const Icon =
                      STATUS_ICONS[step as keyof typeof STATUS_ICONS] || Clock;
                    const isActive =
                      STATUS_STEPS.indexOf(order.status.toLowerCase()) >= si;
                    return (
                      <div key={step} className="flex items-center flex-1">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isActive
                              ? "bg-peacock text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon size={12} />
                        </div>
                        {si < STATUS_STEPS.length - 1 && (
                          <div
                            className={`flex-1 h-0.5 mx-1 ${isActive ? "bg-peacock" : "bg-muted"}`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1">
                  {STATUS_STEPS.map((step) => (
                    <span
                      key={step}
                      className="text-xs text-muted-foreground capitalize flex-1 text-center first:text-left last:text-right"
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
