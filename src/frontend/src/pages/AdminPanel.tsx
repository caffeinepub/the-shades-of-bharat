import { ImageUploadField } from "@/components/ImageUploadField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { INDIAN_STATES } from "@/data/indianStates";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useArtisans,
  useBanners,
  useBlogPosts,
  useCreateArtisan,
  useCreateBanner,
  useCreateBlogPost,
  useCreateFestival,
  useCreateProduct,
  useDeleteArtisan,
  useDeleteBanner,
  useDeleteBlogPost,
  useDeleteFestival,
  useDeleteProduct,
  useFestivalCollections,
  useGetBankAccount,
  useGetMarqueeGreetings,
  useIsAdmin,
  useProducts,
  useSaveBankAccount,
  useSaveMarqueeGreetings,
  useUpdateArtisan,
  useUpdateOrderStatus,
  useUpdateProduct,
  useUserOrders,
} from "@/hooks/useQueries";
import { Principal } from "@icp-sdk/core/principal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-router";
import {
  ChevronRight,
  FileText,
  Image,
  LayoutDashboard,
  Loader2,
  Package,
  Pencil,
  Plus,
  Settings,
  ShoppingBag,
  Star,
  Trash2,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type AdminTab =
  | "dashboard"
  | "products"
  | "orders"
  | "festivals"
  | "banners"
  | "blog"
  | "settings"
  | "artisans"
  | "users";

const NAV_ITEMS = [
  { id: "dashboard" as AdminTab, label: "Dashboard", icon: LayoutDashboard },
  { id: "products" as AdminTab, label: "Products", icon: Package },
  { id: "orders" as AdminTab, label: "Orders", icon: ShoppingBag },
  { id: "festivals" as AdminTab, label: "Festivals", icon: Star },
  { id: "banners" as AdminTab, label: "Banners", icon: Image },
  { id: "blog" as AdminTab, label: "Blog Posts", icon: FileText },
  { id: "settings" as AdminTab, label: "Settings", icon: Settings },
  { id: "artisans" as AdminTab, label: "Artisans", icon: Users },
  { id: "users" as AdminTab, label: "Users & Roles", icon: UserCog },
];

const EMPTY_PRODUCT = {
  id: "",
  name: "",
  description: "",
  price: BigInt(0),
  originalPrice: BigInt(0),
  state: "",
  craftType: "",
  artisanName: "",
  artisanStory: "",
  imageUrl: "",
  additionalImages: [],
  stockQty: BigInt(10),
  category: "",
  tags: [],
  careInstructions: "",
  isNewArrival: false,
  isFeatured: false,
  isBestseller: false,
  createdAt: BigInt(0),
};

export default function AdminPanel() {
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { actor } = useActor();
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [claimToken, setClaimToken] = useState("");
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState("");
  const [claimedAdmin, setClaimedAdmin] = useState(false);

  const handleClaim = async () => {
    if (!actor) {
      setClaimError("Backend not ready. Please wait a moment and try again.");
      return;
    }
    if (!claimToken.trim()) return;
    setClaiming(true);
    setClaimError("");
    try {
      await actor._initializeAccessControlWithSecret(claimToken.trim());
      await new Promise((resolve) => setTimeout(resolve, 500));
      await queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
      await queryClient.refetchQueries({ queryKey: ["isAdmin"] });
      toast.success("Admin access claimed successfully! Welcome.");
      setClaimedAdmin(true);
    } catch (_err: any) {
      setClaimError(
        "Invalid token. Please check your admin token and try again.",
      );
    } finally {
      setClaiming(false);
    }
  };

  if (adminLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 size={32} className="animate-spin text-saffron" />
      </div>
    );
  }

  if (!isAdmin && !claimedAdmin) {
    if (!identity) {
      return (
        <div
          className="min-h-screen flex items-center justify-center bg-cream"
          data-ocid="admin.login_state"
        >
          <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center border border-saffron/20">
            <div className="text-5xl mb-4">🛕</div>
            <h2 className="text-2xl font-display font-bold text-saffron mb-2">
              Admin Panel
            </h2>
            <p className="text-foreground/60 mb-6">
              Please log in to access the admin panel.
            </p>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full bg-saffron hover:bg-saffron/90 text-white font-semibold"
              data-ocid="admin.login_button"
            >
              {isLoggingIn ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : null}
              Log In
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cream"
        data-ocid="admin.claim_panel"
      >
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full border border-saffron/20">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🔐</div>
            <h2 className="text-2xl font-display font-bold text-saffron mb-1">
              Claim Admin Access
            </h2>
            <p className="text-foreground/60 text-sm">
              Enter your admin token to claim admin access for this store.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="admin-token"
                className="text-sm font-medium text-foreground/80 mb-1 block"
              >
                Admin Token
              </Label>
              <Input
                id="admin-token"
                type="text"
                placeholder="Enter your admin token..."
                value={claimToken}
                onChange={(e) => setClaimToken(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleClaim()}
                className="border-saffron/30 focus:border-saffron"
                data-ocid="admin.token_input"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Tip: Copy and paste your token directly to avoid typos.
              </p>
            </div>
            {claimError && (
              <p
                className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg"
                data-ocid="admin.claim_error_state"
              >
                {claimError}
              </p>
            )}
            <Button
              onClick={handleClaim}
              disabled={claiming || !claimToken.trim()}
              className="w-full bg-saffron hover:bg-saffron/90 text-white font-semibold"
              data-ocid="admin.claim_button"
            >
              {claiming ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Claiming...
                </>
              ) : (
                "Claim Admin Access"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-cream" data-ocid="admin.panel">
      {/* Sidebar */}
      <aside
        className={`bg-sidebar text-sidebar-foreground flex-shrink-0 transition-all duration-300 ${sidebarOpen ? "w-56" : "w-16"}`}
      >
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {sidebarOpen && (
            <span className="font-display font-bold text-sidebar-primary">
              Admin Panel
            </span>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground/60 hover:text-sidebar-foreground"
          >
            <ChevronRight
              size={18}
              className={`transition-transform ${sidebarOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
        <nav className="p-2">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-1 ${
                activeTab === id
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
              data-ocid="admin.tab"
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "products" && <ProductsTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "festivals" && <FestivalsTab />}
          {activeTab === "banners" && <BannersTab />}
          {activeTab === "blog" && <BlogTab />}
          {activeTab === "settings" && <SettingsTab />}
          {activeTab === "artisans" && <ArtisansTab />}
          {activeTab === "users" && <UsersTab />}
        </div>
      </main>
    </div>
  );
}

function DashboardTab() {
  const { data: products = [] } = useProducts({});
  const { data: orders = [] } = useUserOrders();
  const { data: festivals = [] } = useFestivalCollections();
  const { data: blogPosts = [] } = useBlogPosts();

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      color: "bg-saffron/10 text-saffron",
    },
    {
      label: "Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "bg-peacock/10 text-peacock",
    },
    {
      label: "Festival Collections",
      value: festivals.length,
      icon: Star,
      color: "bg-indigo/10 text-white",
    },
    {
      label: "Blog Posts",
      value: blogPosts.length,
      icon: FileText,
      color: "bg-crimson/10 text-crimson",
    },
  ];

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-charcoal mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: dashboard stat index
            key={i}
            className="bg-white rounded-xl p-5 shadow-card"
            data-ocid={`admin.card.${i + 1}`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${s.color}`}
            >
              <s.icon size={20} />
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-6 shadow-card">
        <h2 className="font-semibold mb-4">Recent Activity</h2>
        <p className="text-muted-foreground text-sm">
          Welcome to India Craft Bazaar Admin Panel. Use the sidebar to manage
          products, orders, festival collections, banners, and blog posts.
        </p>
      </div>
    </div>
  );
}

function ProductsTab() {
  const { data: products, isLoading } = useProducts({});
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<typeof EMPTY_PRODUCT | null>(
    null,
  );
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    state: "",
    craftType: "",
    artisanName: "",
    category: "",
    imageUrl: "",
    description: "",
    artisanStory: "",
    careInstructions: "",
    stockQty: "10",
  });
  const [form, setForm] = useState({
    name: "",
    price: "",
    state: "",
    craftType: "",
    artisanName: "",
    category: "",
    imageUrl: "",
    description: "",
    artisanStory: "",
    careInstructions: "",
    stockQty: "10",
  });

  const displayProducts = products ?? [];

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;
    try {
      await updateProduct.mutateAsync({
        id: editProduct.id,
        data: {
          ...editProduct,
          name: editForm.name,
          price: BigInt(Number(editForm.price) || 0),
          originalPrice: BigInt(Number(editForm.price) || 0),
          state: editForm.state,
          craftType: editForm.craftType,
          artisanName: editForm.artisanName,
          category: editForm.category,
          imageUrl: editForm.imageUrl,
          description: editForm.description,
          artisanStory: editForm.artisanStory,
          careInstructions: editForm.careInstructions,
          stockQty: BigInt(Number(editForm.stockQty) || 10),
        },
      });
      toast.success("Product updated!");
      setEditOpen(false);
      setEditProduct(null);
    } catch {
      toast.error("Failed to update product");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct.mutateAsync({
        ...EMPTY_PRODUCT,
        id: crypto.randomUUID(),
        name: form.name,
        price: BigInt(Number(form.price) || 0),
        originalPrice: BigInt(Number(form.price) || 0),
        state: form.state,
        craftType: form.craftType,
        artisanName: form.artisanName,
        category: form.category,
        imageUrl: form.imageUrl,
        description: form.description,
        artisanStory: form.artisanStory,
        careInstructions: form.careInstructions,
        stockQty: BigInt(Number(form.stockQty) || 10),
        createdAt: BigInt(Date.now()),
      });
      toast.success("Product created!");
      setOpen(false);
    } catch {
      toast.error("Failed to create product");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-charcoal">
          Products
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-saffron text-white"
              data-ocid="admin.open_modal_button"
            >
              <Plus size={16} className="mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-w-lg max-h-[80vh] overflow-y-auto"
            data-ocid="admin.dialog"
          >
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                {
                  id: "name",
                  label: "Product Name",
                  placeholder: "e.g. Banarasi Silk Saree",
                },
                {
                  id: "price",
                  label: "Price (₹)",
                  placeholder: "e.g. 15000",
                  type: "number",
                },
                { id: "artisanName", label: "Artisan Name", placeholder: "" },
                {
                  id: "description",
                  label: "Description",
                  placeholder: "",
                  textarea: true,
                },
                {
                  id: "artisanStory",
                  label: "Artisan Story",
                  placeholder: "",
                  textarea: true,
                },
                {
                  id: "careInstructions",
                  label: "Care Instructions",
                  placeholder: "",
                },
                {
                  id: "stockQty",
                  label: "Stock Quantity",
                  placeholder: "10",
                  type: "number",
                },
              ].map(({ id, label, placeholder, type = "text", textarea }) => (
                <div key={id}>
                  <Label htmlFor={`prod-${id}`}>{label}</Label>
                  {textarea ? (
                    <Textarea
                      id={`prod-${id}`}
                      value={(form as any)[id]}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [id]: e.target.value }))
                      }
                      rows={2}
                      className="mt-1"
                      data-ocid="admin.textarea"
                    />
                  ) : (
                    <Input
                      id={`prod-${id}`}
                      type={type}
                      value={(form as any)[id]}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [id]: e.target.value }))
                      }
                      placeholder={placeholder}
                      className="mt-1"
                      data-ocid="admin.input"
                    />
                  )}
                </div>
              ))}
              <ImageUploadField
                label="Product Image"
                value={form.imageUrl}
                onChange={(url) => setForm((p) => ({ ...p, imageUrl: url }))}
              />
              <div>
                <Label>State</Label>
                <Select
                  value={form.state}
                  onValueChange={(v) => setForm((p) => ({ ...p, state: v }))}
                >
                  <SelectTrigger className="mt-1" data-ocid="admin.select">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_STATES.map((s) => (
                      <SelectItem key={s.name} value={s.name}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="prod-craftType">Craft Type</Label>
                <Input
                  id="prod-craftType"
                  value={form.craftType}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, craftType: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
                >
                  <SelectTrigger className="mt-1" data-ocid="admin.select">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Handloom & Textiles",
                      "Handicrafts",
                      "Tribal Art",
                      "Paintings & Prints",
                      "Jewelry",
                      "Pottery & Ceramics",
                    ].map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  data-ocid="admin.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-saffron text-white"
                  disabled={createProduct.isPending}
                  data-ocid="admin.submit_button"
                >
                  {createProduct.isPending ? (
                    <Loader2 size={14} className="mr-2 animate-spin" />
                  ) : null}
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Skeleton className="h-64" data-ocid="admin.loading_state" />
      ) : (
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <Table data-ocid="admin.table">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayProducts.map((p, i) => (
                <TableRow key={p.id} data-ocid={`admin.row.${i + 1}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-sm">{p.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.craftType}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{p.state}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {p.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ₹{Number(p.price).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-sm">
                    {Number(p.stockQty)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-peacock hover:text-peacock"
                        onClick={() => {
                          setEditProduct(p as typeof EMPTY_PRODUCT);
                          setEditForm({
                            name: p.name,
                            price: String(Number(p.price)),
                            state: p.state,
                            craftType: p.craftType,
                            artisanName: p.artisanName,
                            category: p.category,
                            imageUrl: p.imageUrl,
                            description: p.description,
                            artisanStory: p.artisanStory,
                            careInstructions: p.careInstructions,
                            stockQty: String(Number(p.stockQty)),
                          });
                          setEditOpen(true);
                        }}
                        data-ocid={`admin.edit_button.${i + 1}`}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() =>
                          deleteProduct.mutate(p.id, {
                            onSuccess: () => toast.success("Deleted"),
                            onError: () => toast.error("Failed"),
                          })
                        }
                        data-ocid={`admin.delete_button.${i + 1}`}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Product Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent
          className="max-w-lg max-h-[80vh] overflow-y-auto"
          data-ocid="admin.edit.dialog"
        >
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editProduct && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              {[
                {
                  id: "name",
                  label: "Product Name",
                  placeholder: "e.g. Banarasi Silk Saree",
                },
                {
                  id: "price",
                  label: "Price (₹)",
                  placeholder: "e.g. 15000",
                  type: "number",
                },
                { id: "artisanName", label: "Artisan Name", placeholder: "" },
                {
                  id: "description",
                  label: "Description",
                  placeholder: "",
                  textarea: true,
                },
                {
                  id: "artisanStory",
                  label: "Artisan Story",
                  placeholder: "",
                  textarea: true,
                },
                {
                  id: "careInstructions",
                  label: "Care Instructions",
                  placeholder: "",
                },
                {
                  id: "stockQty",
                  label: "Stock Quantity",
                  placeholder: "10",
                  type: "number",
                },
              ].map(({ id, label, placeholder, type = "text", textarea }) => (
                <div key={id}>
                  <Label htmlFor={`edit-prod-${id}`}>{label}</Label>
                  {textarea ? (
                    <Textarea
                      id={`edit-prod-${id}`}
                      value={(editForm as any)[id]}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          [id]: e.target.value,
                        }))
                      }
                      rows={2}
                      className="mt-1"
                      data-ocid="admin.edit.textarea"
                    />
                  ) : (
                    <Input
                      id={`edit-prod-${id}`}
                      type={type}
                      value={(editForm as any)[id]}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          [id]: e.target.value,
                        }))
                      }
                      placeholder={placeholder}
                      className="mt-1"
                      data-ocid="admin.edit.input"
                    />
                  )}
                </div>
              ))}
              <ImageUploadField
                label="Product Image"
                value={editForm.imageUrl}
                onChange={(url) =>
                  setEditForm((p) => ({ ...p, imageUrl: url }))
                }
              />
              <div>
                <Label>State</Label>
                <Select
                  value={editForm.state}
                  onValueChange={(v) =>
                    setEditForm((prev) => ({ ...prev, state: v }))
                  }
                >
                  <SelectTrigger className="mt-1" data-ocid="admin.edit.select">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_STATES.map((s) => (
                      <SelectItem key={s.name} value={s.name}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-prod-craftType">Craft Type</Label>
                <Input
                  id="edit-prod-craftType"
                  value={editForm.craftType}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      craftType: e.target.value,
                    }))
                  }
                  className="mt-1"
                  data-ocid="admin.edit.input"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={editForm.category}
                  onValueChange={(v) =>
                    setEditForm((prev) => ({ ...prev, category: v }))
                  }
                >
                  <SelectTrigger className="mt-1" data-ocid="admin.edit.select">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Handloom & Textiles",
                      "Handicrafts",
                      "Tribal Art",
                      "Paintings & Prints",
                      "Jewelry",
                      "Pottery & Ceramics",
                    ].map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditOpen(false)}
                  data-ocid="admin.edit.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-saffron text-white"
                  disabled={updateProduct.isPending}
                  data-ocid="admin.edit.save_button"
                >
                  {updateProduct.isPending ? (
                    <Loader2 size={14} className="mr-2 animate-spin" />
                  ) : null}
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OrdersTab() {
  const { data: orders = [], isLoading } = useUserOrders();
  const updateStatus = useUpdateOrderStatus();

  const STATUS_OPTIONS = [
    "ordered",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-charcoal mb-6">
        Orders
      </h1>
      {isLoading ? (
        <Skeleton className="h-64" data-ocid="admin.loading_state" />
      ) : orders.length === 0 ? (
        <div
          className="bg-white rounded-xl p-8 text-center shadow-card"
          data-ocid="admin.empty_state"
        >
          <ShoppingBag
            size={40}
            className="mx-auto text-muted-foreground mb-3"
          />
          <p className="text-muted-foreground">No orders found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <Table data-ocid="admin.table">
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Update Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, i) => (
                <TableRow key={order.id} data-ocid={`admin.row.${i + 1}`}>
                  <TableCell className="font-mono text-xs">
                    {order.id.slice(0, 12)}...
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(
                      Number(order.createdAt) / 1_000_000,
                    ).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell className="font-semibold">
                    ₹{Number(order.total).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <Badge className="capitalize">{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(v) =>
                        updateStatus.mutate(
                          { id: order.id, status: v },
                          { onSuccess: () => toast.success("Status updated") },
                        )
                      }
                    >
                      <SelectTrigger
                        className="w-32 h-8 text-xs"
                        data-ocid="admin.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem key={s} value={s} className="capitalize">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function FestivalsTab() {
  const { data: festivals = [], isLoading } = useFestivalCollections();
  const deleteFestival = useDeleteFestival();
  const createFestival = useCreateFestival();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    festivalDate: "",
    imageUrl: "",
    productIds: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFestival.mutateAsync({
        id: crypto.randomUUID(),
        name: form.name,
        description: form.description,
        festivalDate: form.festivalDate,
        imageUrl: form.imageUrl,
        productIds: form.productIds
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        isActive: true,
      });
      toast.success("Festival collection created!");
      setOpen(false);
      setForm({
        name: "",
        description: "",
        festivalDate: "",
        imageUrl: "",
        productIds: "",
      });
    } catch {
      toast.error("Failed to create festival collection");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-charcoal">
          Festival Collections
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-saffron text-white"
              data-ocid="admin.open_modal_button"
            >
              <Plus size={16} className="mr-2" />
              Add Collection
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg" data-ocid="admin.dialog">
            <DialogHeader>
              <DialogTitle>Add Festival Collection</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Festival Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="e.g. Diwali Collection"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Festival Date</Label>
                <Input
                  value={form.festivalDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, festivalDate: e.target.value }))
                  }
                  placeholder="e.g. November 2025"
                  className="mt-1"
                />
              </div>
              <ImageUploadField
                label="Cover Image"
                value={form.imageUrl}
                onChange={(url) => setForm((p) => ({ ...p, imageUrl: url }))}
              />
              <div>
                <Label>Product IDs (comma-separated, optional)</Label>
                <Input
                  value={form.productIds}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, productIds: e.target.value }))
                  }
                  placeholder="Leave blank or add product IDs"
                  className="mt-1"
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-saffron text-white"
                  disabled={createFestival.isPending}
                >
                  {createFestival.isPending ? (
                    <Loader2 size={14} className="mr-2 animate-spin" />
                  ) : null}
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <Skeleton className="h-40" data-ocid="admin.loading_state" />
      ) : festivals.length === 0 ? (
        <div
          className="bg-white rounded-xl p-8 text-center shadow-card"
          data-ocid="admin.empty_state"
        >
          <Star size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">
            No festival collections yet. Click "Add Collection" to create one.
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          data-ocid="admin.list"
        >
          {festivals.map((f, i) => (
            <div
              key={f.id}
              className="bg-white rounded-xl p-4 shadow-card flex items-start gap-4"
              data-ocid={`admin.item.${i + 1}`}
            >
              {f.imageUrl && (
                <img
                  src={f.imageUrl}
                  alt={f.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{f.name}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {f.festivalDate}
                </p>
                <Badge
                  className={
                    f.isActive ? "bg-peacock text-white mt-1" : "bg-muted mt-1"
                  }
                >
                  {f.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() =>
                  deleteFestival.mutate(f.id, {
                    onSuccess: () => toast.success("Deleted"),
                    onError: () => toast.error("Failed to delete"),
                  })
                }
                data-ocid={`admin.delete_button.${i + 1}`}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BannersTab() {
  const { data: banners = [], isLoading } = useBanners();
  const deleteBanner = useDeleteBanner();
  const createBanner = useCreateBanner();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
    ctaText: "",
    ctaLink: "",
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBanner.mutateAsync({
        id: crypto.randomUUID(),
        title: form.title,
        subtitle: form.subtitle,
        imageUrl: form.imageUrl,
        ctaText: form.ctaText,
        ctaLink: form.ctaLink,
        isActive: form.isActive,
        order: BigInt(banners.length),
      });
      toast.success("Banner created!");
      setOpen(false);
      setForm({
        title: "",
        subtitle: "",
        imageUrl: "",
        ctaText: "",
        ctaLink: "",
        isActive: true,
      });
    } catch {
      toast.error("Failed to create banner");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-charcoal">
          Banners
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-saffron text-white"
              data-ocid="admin.open_modal_button"
            >
              <Plus size={16} className="mr-2" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg" data-ocid="admin.dialog">
            <DialogHeader>
              <DialogTitle>Add Banner</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="e.g. Celebrate Diwali with Us"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={form.subtitle}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, subtitle: e.target.value }))
                  }
                  placeholder="e.g. Handcrafted gifts for every home"
                  className="mt-1"
                />
              </div>
              <ImageUploadField
                label="Banner Image"
                value={form.imageUrl}
                onChange={(url) => setForm((p) => ({ ...p, imageUrl: url }))}
              />
              <div>
                <Label>CTA Button Text</Label>
                <Input
                  value={form.ctaText}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, ctaText: e.target.value }))
                  }
                  placeholder="e.g. Shop Now"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>CTA Link</Label>
                <Input
                  value={form.ctaLink}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, ctaLink: e.target.value }))
                  }
                  placeholder="e.g. /shop"
                  className="mt-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="banner-active"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, isActive: e.target.checked }))
                  }
                  className="accent-saffron"
                />
                <Label htmlFor="banner-active">Active (visible on site)</Label>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-saffron text-white"
                  disabled={createBanner.isPending}
                >
                  {createBanner.isPending ? (
                    <Loader2 size={14} className="mr-2 animate-spin" />
                  ) : null}
                  Create Banner
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <Skeleton className="h-40" data-ocid="admin.loading_state" />
      ) : banners.length === 0 ? (
        <div
          className="bg-white rounded-xl p-8 text-center shadow-card"
          data-ocid="admin.empty_state"
        >
          <Image size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">
            No banners yet. Click "Add Banner" to create one.
          </p>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="admin.list">
          {banners.map((b, i) => (
            <div
              key={b.id}
              className="bg-white rounded-xl p-4 shadow-card flex items-center gap-4"
              data-ocid={`admin.item.${i + 1}`}
            >
              {b.imageUrl && (
                <img
                  src={b.imageUrl}
                  alt={b.title}
                  className="w-20 h-12 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{b.title}</h3>
                <p className="text-xs text-muted-foreground">{b.subtitle}</p>
              </div>
              <Badge
                className={b.isActive ? "bg-peacock text-white" : "bg-muted"}
              >
                {b.isActive ? "Active" : "Inactive"}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() =>
                  deleteBanner.mutate(b.id, {
                    onSuccess: () => toast.success("Deleted"),
                    onError: () => toast.error("Failed to delete"),
                  })
                }
                data-ocid={`admin.delete_button.${i + 1}`}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function BlogTab() {
  const { data: posts, isLoading } = useBlogPosts();
  const createPost = useCreateBlogPost();
  const deletePost = useDeleteBlogPost();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    authorName: "",
    imageUrl: "",
    tags: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost.mutateAsync({
        id: crypto.randomUUID(),
        title: form.title,
        content: form.content,
        authorName: form.authorName,
        imageUrl: form.imageUrl,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        createdAt: BigInt(Date.now()),
      });
      toast.success("Blog post created!");
      setOpen(false);
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-charcoal">
          Blog Posts
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-saffron text-white"
              data-ocid="admin.open_modal_button"
            >
              <Plus size={16} className="mr-2" />
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="admin.dialog">
            <DialogHeader>
              <DialogTitle>Create Blog Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: "title", label: "Title" },
                { id: "authorName", label: "Author Name" },
                { id: "tags", label: "Tags (comma separated)" },
              ].map(({ id, label }) => (
                <div key={id}>
                  <Label htmlFor={`blog-${id}`}>{label}</Label>
                  <Input
                    id={`blog-${id}`}
                    value={(form as any)[id]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [id]: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="admin.input"
                  />
                </div>
              ))}
              <ImageUploadField
                label="Cover Image"
                value={form.imageUrl}
                onChange={(url) => setForm((p) => ({ ...p, imageUrl: url }))}
              />
              <div>
                <Label htmlFor="blog-content">Content</Label>
                <Textarea
                  id="blog-content"
                  value={form.content}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, content: e.target.value }))
                  }
                  rows={5}
                  className="mt-1"
                  data-ocid="admin.textarea"
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  data-ocid="admin.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-saffron text-white"
                  disabled={createPost.isPending}
                  data-ocid="admin.submit_button"
                >
                  {createPost.isPending ? (
                    <Loader2 size={14} className="mr-2 animate-spin" />
                  ) : null}
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Skeleton className="h-40" data-ocid="admin.loading_state" />
      ) : (
        <div className="space-y-3" data-ocid="admin.list">
          {(posts && posts.length > 0 ? posts : []).map((post, i) => (
            <div
              key={post.id}
              className="bg-white rounded-xl p-4 shadow-card flex items-start gap-4"
              data-ocid={`admin.item.${i + 1}`}
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-xs text-muted-foreground">
                  by {post.authorName}
                </p>
                <div className="flex gap-1 mt-1">
                  {post.tags.slice(0, 3).map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => deletePost.mutate(post.id)}
                data-ocid={`admin.delete_button.${i + 1}`}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
          {(!posts || posts.length === 0) && (
            <div
              className="bg-white rounded-xl p-8 text-center shadow-card"
              data-ocid="admin.empty_state"
            >
              <FileText
                size={40}
                className="mx-auto text-muted-foreground mb-3"
              />
              <p className="text-muted-foreground">No blog posts yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SettingsTab() {
  const { data: bankAccount, isLoading } = useGetBankAccount();
  const saveBankAccount = useSaveBankAccount();
  const { data: savedGreetings } = useGetMarqueeGreetings();
  const saveMarqueeGreetings = useSaveMarqueeGreetings();
  const [greetings, setGreetings] = useState<string[]>([]);
  const [greetingsInitialized, setGreetingsInitialized] = useState(false);

  if (!greetingsInitialized && savedGreetings !== undefined) {
    const defaultGreetings = [
      "वसुधैव कुटुम्बकम् · Vasudhaiva Kutumbakam — The World is One Family",
      "বিশ্ব মিত্র · Biswa Mitra — Friend of the World",
      "अतिथि देवो भव · Atithi Devo Bhava — Guest is God",
      "पधारो म्हारे देश · Padharo Mare Desh — Welcome to Our Land",
      "स्वागतम् · Swagatam — Welcome",
      "नमस्ते भारत · Namaste Bharat — Greetings, India",
    ];
    setGreetings(savedGreetings.length > 0 ? savedGreetings : defaultGreetings);
    setGreetingsInitialized(true);
  }

  const handleSaveGreetings = async () => {
    try {
      await saveMarqueeGreetings.mutateAsync(greetings.filter((g) => g.trim()));
      toast.success("Scrolling messages saved!");
    } catch {
      toast.error("Failed to save scrolling messages");
    }
  };
  const [form, setForm] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    branch: "",
    upiId: "",
  });
  const [initialized, setInitialized] = useState(false);

  if (!initialized && bankAccount) {
    setForm({
      accountHolderName: bankAccount.accountHolderName ?? "",
      accountNumber: bankAccount.accountNumber ?? "",
      ifscCode: bankAccount.ifscCode ?? "",
      bankName: bankAccount.bankName ?? "",
      branch: bankAccount.branch ?? "",
      upiId: bankAccount.upiId ?? "",
    });
    setInitialized(true);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveBankAccount.mutateAsync(form);
      toast.success("Bank account saved!");
    } catch {
      toast.error("Failed to save bank account");
    }
  };

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-charcoal mb-6">
        Settings
      </h1>
      {isLoading ? (
        <Skeleton className="h-64" data-ocid="settings.loading_state" />
      ) : (
        <div
          className="bg-white rounded-xl shadow-card p-6 max-w-lg"
          data-ocid="settings.panel"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-saffron/10 flex items-center justify-center">
              <Settings size={20} className="text-saffron" />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-charcoal">
                Bank Account Details
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage your payout bank account information
              </p>
            </div>
          </div>

          <div className="mb-4 p-3 rounded-lg bg-saffron/5 border border-saffron/20 text-sm text-charcoal/70 flex items-start gap-2">
            <span className="text-saffron mt-0.5">🔒</span>
            <span>
              These details are for your reference only and are only visible to
              admins.
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                id: "accountHolderName",
                label: "Account Holder Name",
                placeholder: "e.g. Ramesh Kumar",
              },
              {
                id: "accountNumber",
                label: "Account Number",
                placeholder: "e.g. 001234567890",
              },
              {
                id: "ifscCode",
                label: "IFSC Code",
                placeholder: "e.g. SBIN0001234",
              },
              {
                id: "bankName",
                label: "Bank Name",
                placeholder: "e.g. State Bank of India",
              },
              {
                id: "branch",
                label: "Branch",
                placeholder: "e.g. Connaught Place, New Delhi",
              },
              {
                id: "upiId",
                label: "UPI ID",
                placeholder: "e.g. yourname@upi",
              },
            ].map(({ id, label, placeholder }) => (
              <div key={id}>
                <Label
                  htmlFor={`bank-${id}`}
                  className="text-sm font-medium text-charcoal/80"
                >
                  {label}
                </Label>
                <Input
                  id={`bank-${id}`}
                  value={(form as any)[id]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [id]: e.target.value }))
                  }
                  placeholder={placeholder}
                  className="mt-1 border-saffron/20 focus:border-saffron"
                  data-ocid={`settings.${id}.input`}
                />
              </div>
            ))}

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-saffron hover:bg-saffron/90 text-white font-semibold"
                disabled={saveBankAccount.isPending}
                data-ocid="settings.save_button"
              >
                {saveBankAccount.isPending ? (
                  <>
                    <Loader2 size={14} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Bank Account"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Scrolling Strip Messages */}
      <div
        className="bg-white rounded-xl shadow-card p-6 max-w-lg mt-8"
        data-ocid="settings.marquee_panel"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-saffron/10 flex items-center justify-center">
            <span className="text-saffron text-lg">📜</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg text-charcoal">
              Scrolling Welcome Strip
            </h2>
            <p className="text-sm text-muted-foreground">
              Edit the messages shown in the saffron scrolling strip at the top
              of the site
            </p>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          {greetings.map((greeting, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: order is user-controlled
            <div key={idx} className="flex gap-2 items-center">
              <Input
                value={greeting}
                onChange={(e) => {
                  const updated = [...greetings];
                  updated[idx] = e.target.value;
                  setGreetings(updated);
                }}
                className="border-saffron/20 focus:border-saffron text-sm"
                placeholder="e.g. नमस्ते भारत · Namaste Bharat — Greetings, India"
                data-ocid={`settings.marquee_message_${idx}`}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setGreetings(greetings.filter((_, i) => i !== idx))
                }
                className="text-red-400 hover:text-red-600 shrink-0"
                data-ocid={`settings.marquee_delete_${idx}`}
              >
                <X size={14} />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-saffron/30 text-saffron hover:bg-saffron/5"
            onClick={() => setGreetings([...greetings, ""])}
            data-ocid="settings.marquee_add_button"
          >
            + Add Message
          </Button>
          <Button
            className="bg-saffron hover:bg-saffron/90 text-white font-semibold"
            onClick={handleSaveGreetings}
            disabled={saveMarqueeGreetings.isPending}
            data-ocid="settings.marquee_save_button"
          >
            {saveMarqueeGreetings.isPending ? (
              <>
                <Loader2 size={14} className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Messages"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Artisans Tab ────────────────────────────────────────────────────────────
const EMPTY_ARTISAN = {
  id: "",
  name: "",
  state: "",
  craft: "",
  speciality: "",
  story: "",
  experience: 0,
  quote: "",
  products: [] as string[],
  awards: "",
  culturalNote: "",
  imageUrl: "",
  createdAt: BigInt(0),
};

function ArtisansTab() {
  const { data: backendArtisans = [], isLoading } = useArtisans();
  const createArtisan = useCreateArtisan();
  const updateArtisan = useUpdateArtisan();
  const deleteArtisan = useDeleteArtisan();

  const artisans = backendArtisans.map((a: any) => ({
    ...a,
    experience: Number(a.experience),
  }));

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_ARTISAN, productsText: "" });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openNew() {
    setEditing(null);
    setForm({ ...EMPTY_ARTISAN, productsText: "" });
    setOpen(true);
  }

  function openEdit(artisan: any) {
    setEditing(artisan.id);
    setForm({
      ...artisan,
      productsText: Array.isArray(artisan.products)
        ? artisan.products.join(", ")
        : "",
      awards: artisan.awards ?? "",
    });
    setOpen(true);
  }

  async function handleSave() {
    const products = form.productsText
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
    const payload: any = {
      id: editing ?? `artisan-${Date.now()}`,
      name: form.name,
      state: form.state,
      craft: form.craft,
      speciality: form.speciality,
      story: form.story,
      experience: BigInt(form.experience),
      quote: form.quote,
      products,
      awards: form.awards || undefined,
      culturalNote: form.culturalNote,
      imageUrl: form.imageUrl ?? "",
      createdAt: BigInt(Date.now()),
    };
    try {
      if (editing) {
        await updateArtisan.mutateAsync({ id: editing, input: payload });
        toast.success("Artisan updated!");
      } else {
        await createArtisan.mutateAsync(payload);
        toast.success("Artisan created!");
      }
      setOpen(false);
    } catch {
      toast.error("Failed to save artisan");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteArtisan.mutateAsync(id);
      toast.success("Artisan deleted");
    } catch {
      toast.error("Failed to delete");
    }
    setDeleteId(null);
  }

  return (
    <div data-ocid="admin.artisans.panel">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-saffron">
            Artisans
          </h1>
          <Badge className="bg-amber-100 text-amber-800 border-amber-200 mt-1">
            {artisans.length} Artisans
          </Badge>
        </div>
        <Button
          className="bg-saffron hover:bg-amber-600 text-white gap-2"
          onClick={openNew}
          data-ocid="admin.artisans.primary_button"
        >
          <Plus size={16} /> Add Artisan
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2" data-ocid="admin.artisans.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
          <Table data-ocid="admin.artisans.table">
            <TableHeader>
              <TableRow className="bg-amber-50">
                <TableHead>Name</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Craft</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {artisans.map((artisan: any, i: number) => (
                <TableRow
                  key={artisan.id}
                  data-ocid={`admin.artisans.row.${i + 1}`}
                >
                  <TableCell className="font-semibold">
                    {artisan.name}
                  </TableCell>
                  <TableCell className="text-sm">{artisan.state}</TableCell>
                  <TableCell className="text-sm">{artisan.craft}</TableCell>
                  <TableCell className="text-sm">
                    {artisan.experience} yrs
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-amber-700 hover:text-amber-900 hover:bg-amber-50"
                      onClick={() => openEdit(artisan)}
                      data-ocid={`admin.artisans.edit_button.${i + 1}`}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setDeleteId(artisan.id)}
                      data-ocid={`admin.artisans.delete_button.${i + 1}`}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin.artisans.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-saffron font-display">
              {editing ? "Edit Artisan" : "Add Artisan"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                data-ocid="admin.artisans.input"
              />
            </div>
            <div className="space-y-1">
              <Label>State</Label>
              <Select
                value={form.state}
                onValueChange={(v) => setForm({ ...form, state: v })}
              >
                <SelectTrigger data-ocid="admin.artisans.select">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map((s) => (
                    <SelectItem key={s.name} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Craft</Label>
              <Input
                value={form.craft}
                onChange={(e) => setForm({ ...form, craft: e.target.value })}
                data-ocid="admin.artisans.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Speciality</Label>
              <Input
                value={form.speciality}
                onChange={(e) =>
                  setForm({ ...form, speciality: e.target.value })
                }
                data-ocid="admin.artisans.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Experience (years)</Label>
              <Input
                type="number"
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: Number(e.target.value) })
                }
                data-ocid="admin.artisans.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Awards (optional)</Label>
              <Input
                value={form.awards}
                onChange={(e) => setForm({ ...form, awards: e.target.value })}
                data-ocid="admin.artisans.input"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label>Quote</Label>
              <Input
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                data-ocid="admin.artisans.input"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label>Story</Label>
              <Textarea
                rows={3}
                value={form.story}
                onChange={(e) => setForm({ ...form, story: e.target.value })}
                data-ocid="admin.artisans.textarea"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label>Cultural Note</Label>
              <Textarea
                rows={3}
                value={form.culturalNote}
                onChange={(e) =>
                  setForm({ ...form, culturalNote: e.target.value })
                }
                data-ocid="admin.artisans.textarea"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label>Products (comma-separated)</Label>
              <Textarea
                rows={2}
                value={form.productsText}
                onChange={(e) =>
                  setForm({ ...form, productsText: e.target.value })
                }
                placeholder="e.g. Silk saree, Pattachitra painting"
                data-ocid="admin.artisans.textarea"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label>Profile Photo</Label>
              <ImageUploadField
                value={form.imageUrl}
                onChange={(url: string) => setForm({ ...form, imageUrl: url })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="admin.artisans.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-saffron hover:bg-amber-600 text-white"
              onClick={handleSave}
              disabled={createArtisan.isPending || updateArtisan.isPending}
              data-ocid="admin.artisans.submit_button"
            >
              {createArtisan.isPending || updateArtisan.isPending ? (
                <Loader2 size={14} className="mr-2 animate-spin" />
              ) : null}
              {editing ? "Update" : "Create"} Artisan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent data-ocid="admin.artisans.dialog">
          <DialogHeader>
            <DialogTitle>Delete Artisan?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">
            This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              data-ocid="admin.artisans.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteId && handleDelete(deleteId)}
              disabled={deleteArtisan.isPending}
              data-ocid="admin.artisans.confirm_button"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Users Tab ───────────────────────────────────────────────────────────────
function UsersTab() {
  const { actor } = useActor();
  const [principalId, setPrincipalId] = useState("");
  const [role, setRole] = useState("user");
  const [assigning, setAssigning] = useState(false);

  const { data: myRole } = useQuery({
    queryKey: ["callerRole"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserRole();
    },
    enabled: !!actor,
  });

  async function handleAssign() {
    if (!actor || !principalId.trim()) return;
    setAssigning(true);
    try {
      const principal = Principal.fromText(principalId.trim());
      await actor.assignCallerUserRole(principal, role as any);
      toast.success(
        `Role "${role}" assigned to ${principalId.slice(0, 16)}...`,
      );
      setPrincipalId("");
    } catch (err: any) {
      toast.error(
        err?.message?.includes("principal")
          ? "Invalid Principal ID format"
          : "Failed to assign role",
      );
    } finally {
      setAssigning(false);
    }
  }

  return (
    <div className="max-w-2xl" data-ocid="admin.users.panel">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-saffron">
          User &amp; Role Management
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Assign roles to users by entering their Principal ID. Find the
          Principal ID in the user's account page.
        </p>
      </div>

      {myRole && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Your current role:</span>{" "}
            <Badge className="bg-amber-200 text-amber-900 border-0 capitalize">
              {String(myRole)}
            </Badge>
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6 space-y-4">
        <div className="space-y-1">
          <Label htmlFor="principal-id">Principal ID</Label>
          <Input
            id="principal-id"
            placeholder="e.g. aaaaa-aa..."
            value={principalId}
            onChange={(e) => setPrincipalId(e.target.value)}
            className="border-amber-200 focus:border-saffron font-mono text-sm"
            data-ocid="admin.users.input"
          />
        </div>
        <div className="space-y-1">
          <Label>Role</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger
              className="border-amber-200"
              data-ocid="admin.users.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="guest">Guest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          className="bg-saffron hover:bg-amber-600 text-white font-semibold w-full"
          onClick={handleAssign}
          disabled={assigning || !principalId.trim()}
          data-ocid="admin.users.submit_button"
        >
          {assigning ? (
            <Loader2 size={14} className="mr-2 animate-spin" />
          ) : null}
          Assign Role
        </Button>
      </div>
    </div>
  );
}
