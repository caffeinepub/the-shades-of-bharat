import type { Product } from "@/backend";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SAMPLE_PRODUCTS } from "@/data/indianStates";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useProducts,
  useSaveProfile,
  useUserOrders,
  useUserProfile,
  useWishlist,
} from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { Heart, Loader2, LogIn, Package, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AccountPage() {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: wishlistIds = [] } = useWishlist();
  const { data: orders = [], isLoading: ordersLoading } = useUserOrders();
  const { data: allProducts = [] } = useProducts({});
  const saveProfile = useSaveProfile();
  const [name, setName] = useState(profile?.name ?? "");

  const wishlistProducts: Product[] =
    wishlistIds.length > 0
      ? (allProducts.filter((p) => wishlistIds.includes(p.id)) as Product[])
      : (SAMPLE_PRODUCTS.slice(0, 2) as any);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProfile.mutateAsync({ name });
    toast.success("Profile updated!");
  };

  if (!identity) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div
          className="text-center py-12 max-w-sm mx-auto px-4"
          data-ocid="account.panel"
        >
          <div className="w-20 h-20 rounded-full bg-saffron/10 flex items-center justify-center mx-auto mb-6">
            <User size={36} className="text-saffron" />
          </div>
          <h1 className="font-display font-bold text-2xl mb-2">Sign In</h1>
          <p className="text-muted-foreground mb-6">
            Sign in to access your account, orders, and wishlist
          </p>
          <Button
            onClick={() => login()}
            disabled={loginStatus === "logging-in"}
            className="w-full bg-saffron hover:bg-turmeric text-white h-12 text-base"
            data-ocid="account.primary_button"
          >
            {loginStatus === "logging-in" ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={16} className="mr-2" />
                Sign In with Internet Identity
              </>
            )}
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-bold text-3xl uppercase text-charcoal">
            My Account
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => clear()}
            data-ocid="account.button"
          >
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="profile" data-ocid="account.panel">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" data-ocid="account.tab">
              <User size={14} className="mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="wishlist" data-ocid="account.tab">
              <Heart size={14} className="mr-2" />
              Wishlist ({wishlistIds.length})
            </TabsTrigger>
            <TabsTrigger value="orders" data-ocid="account.tab">
              <Package size={14} className="mr-2" />
              Orders ({orders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="bg-white rounded-xl p-6 shadow-card max-w-md">
              <h2 className="font-semibold text-lg mb-4">Profile Details</h2>
              {profileLoading ? (
                <Skeleton className="h-24" data-ocid="account.loading_state" />
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <Label htmlFor="profile-name">Display Name</Label>
                    <Input
                      id="profile-name"
                      value={name || profile?.name || ""}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="mt-1"
                      data-ocid="account.input"
                    />
                  </div>
                  <div>
                    <Label>Principal ID</Label>
                    <p className="text-xs text-muted-foreground mt-1 font-mono break-all">
                      {identity.getPrincipal().toString()}
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="bg-saffron text-white"
                    disabled={saveProfile.isPending}
                    data-ocid="account.save_button"
                  >
                    {saveProfile.isPending ? (
                      <>
                        <Loader2 size={14} className="mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Profile"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            {wishlistProducts.length === 0 ? (
              <div
                className="text-center py-12"
                data-ocid="account.empty_state"
              >
                <Heart
                  size={40}
                  className="mx-auto text-muted-foreground mb-3"
                />
                <p className="text-muted-foreground">Your wishlist is empty</p>
                <Link
                  to="/shop"
                  search={(p: any) => p ?? {}}
                  className="mt-4 inline-block"
                >
                  <Button className="bg-saffron text-white" size="sm">
                    Browse Products
                  </Button>
                </Link>
              </div>
            ) : (
              <div
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
                data-ocid="account.list"
              >
                {wishlistProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i + 1} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="orders">
            {ordersLoading ? (
              <div className="space-y-3" data-ocid="account.loading_state">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-20 rounded-xl" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div
                className="text-center py-12"
                data-ocid="account.empty_state"
              >
                <Package
                  size={40}
                  className="mx-auto text-muted-foreground mb-3"
                />
                <p className="text-muted-foreground">No orders yet</p>
                <Link
                  to="/shop"
                  search={(p: any) => p ?? {}}
                  className="mt-4 inline-block"
                >
                  <Button className="bg-saffron text-white" size="sm">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3" data-ocid="account.list">
                {orders.map((order, i) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl p-4 shadow-card flex items-center justify-between gap-4"
                    data-ocid={`account.item.${i + 1}`}
                  >
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">
                        {order.id.slice(0, 16)}...
                      </p>
                      <p className="font-bold">
                        ₹{Number(order.total).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <span className="text-sm capitalize font-medium text-peacock">
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
