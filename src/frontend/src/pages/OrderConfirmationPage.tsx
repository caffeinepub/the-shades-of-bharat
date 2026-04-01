import { Button } from "@/components/ui/button";
import { useGetBankAccount } from "@/hooks/useQueries";
import { Link, useSearch } from "@tanstack/react-router";
import {
  Check,
  CheckCircle,
  Copy,
  Home,
  Package,
  Smartphone,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

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

const UPI_APPS = [
  { name: "GPay" },
  { name: "PhonePe" },
  { name: "Paytm" },
  { name: "BHIM" },
];

export default function OrderConfirmationPage() {
  const search = useSearch({ from: "/order-success" }) as any;
  const orderId = search?.orderId;
  const { data: bankAccount, isLoading: bankLoading } = useGetBankAccount();
  const [copied, setCopied] = useState(false);

  const upiId = typeof bankAccount?.upiId === "string" ? bankAccount.upiId : "";
  const showUpi = !bankLoading && !!upiId;

  const upiUri = showUpi
    ? `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
        bankAccount?.accountHolderName || "The Shades of Bharat",
      )}&cu=INR&tn=${encodeURIComponent(`Order ${orderId || ""}`)}`
    : "";

  const qrUrl = showUpi
    ? `https://chart.googleapis.com/chart?chs=220x220&cht=qr&chl=${encodeURIComponent(upiUri)}`
    : "";

  const handleCopy = async () => {
    if (!upiId) return;
    await navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

        {/* What happens next */}
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
                    className={`font-semibold text-sm ${
                      step.done ? "text-peacock" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UPI Payment Card */}
        {showUpi && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-gradient-to-b from-saffron/10 to-turmeric/5 border border-saffron/30 rounded-xl p-6 shadow-card mb-6 text-left"
            data-ocid="order-confirm.panel"
          >
            {/* Card header */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-full bg-saffron/20 flex items-center justify-center flex-shrink-0">
                <Smartphone size={18} className="text-saffron" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-charcoal">
                  Pay via UPI
                </h3>
                <p className="text-xs text-muted-foreground">
                  🙏 Complete your payment to confirm the order
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center mb-5">
              <div className="relative p-3 bg-white rounded-xl border-2 border-saffron/30 shadow-md inline-block">
                {/* Decorative saffron corner accents */}
                <span className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-saffron rounded-tl" />
                <span className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-saffron rounded-tr" />
                <span className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-saffron rounded-bl" />
                <span className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-saffron rounded-br" />
                <img
                  src={qrUrl}
                  alt="UPI QR Code"
                  width={180}
                  height={180}
                  className="block"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Scan with any UPI app (GPay, PhonePe, Paytm, etc.) to complete
                payment
              </p>
            </div>

            {/* UPI ID row with copy */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                UPI ID
              </p>
              <div className="flex items-center gap-2 bg-white border border-saffron/30 rounded-lg px-3 py-2">
                <span className="flex-1 text-sm font-mono font-semibold text-charcoal truncate">
                  {upiId}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-shrink-0 flex items-center gap-1 text-xs font-medium text-saffron hover:text-turmeric transition-colors px-2 py-1 rounded-md hover:bg-saffron/10"
                  aria-label="Copy UPI ID"
                  data-ocid="order-confirm.button"
                >
                  {copied ? (
                    <>
                      <Check size={13} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Supported UPI apps */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="text-xs text-muted-foreground">Pay with:</span>
              {UPI_APPS.map((app) => (
                <span
                  key={app.name}
                  className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white border border-saffron/20 text-charcoal"
                >
                  {app.name}
                </span>
              ))}
            </div>

            {/* Screenshot reminder */}
            <div className="bg-saffron/15 border border-saffron/30 rounded-lg px-3 py-2.5">
              <p className="text-xs text-charcoal leading-relaxed">
                <span className="font-semibold text-saffron">
                  📸 Important:{" "}
                </span>
                After payment, save the screenshot. We'll confirm your order
                after payment verification.
              </p>
            </div>
          </motion.div>
        )}

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
