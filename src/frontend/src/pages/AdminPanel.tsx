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
import { INDIAN_STATES, SAMPLE_PRODUCTS } from "@/data/indianStates";
import {
  useBanners,
  useBlogPosts,
  useCreateBlogPost,
  useCreateProduct,
  useDeleteBanner,
  useDeleteBlogPost,
  useDeleteFestival,
  useDeleteProduct,
  useFestivalCollections,
  useIsAdmin,
  useProducts,
  useUpdateOrderStatus,
  useUserOrders,
} from "@/hooks/useQueries";
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
  ShoppingBag,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type AdminTab =
  | "dashboard"
  | "products"
  | "orders"
  | "festivals"
  | "banners"
  | "blog";

const NAV_ITEMS = [
  { id: "dashboard" as AdminTab, label: "Dashboard", icon: LayoutDashboard },
  { id: "products" as AdminTab, label: "Products", icon: Package },
  { id: "orders" as AdminTab, label: "Orders", icon: ShoppingBag },
  { id: "festivals" as AdminTab, label: "Festivals", icon: Star },
  { id: "banners" as AdminTab, label: "Banners", icon: Image },
  { id: "blog" as AdminTab, label: "Blog Posts", icon: FileText },
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
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  if (!isAdmin) {
    return <Navigate to="/" />;
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
      value: products.length || SAMPLE_PRODUCTS.length,
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
  const deleteProduct = useDeleteProduct();
  const [open, setOpen] = useState(false);
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

  const displayProducts =
    products && products.length > 0 ? products : SAMPLE_PRODUCTS;

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
                  id: "imageUrl",
                  label: "Image URL",
                  placeholder: "https://...",
                },
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
                        className="h-8 w-8"
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-charcoal">
          Festival Collections
        </h1>
        <Button
          className="bg-saffron text-white"
          data-ocid="admin.open_modal_button"
        >
          <Plus size={16} className="mr-2" />
          Add Collection
        </Button>
      </div>
      {isLoading ? (
        <Skeleton className="h-40" data-ocid="admin.loading_state" />
      ) : festivals.length === 0 ? (
        <div
          className="bg-white rounded-xl p-8 text-center shadow-card"
          data-ocid="admin.empty_state"
        >
          <Star size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No festival collections</p>
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
              <div className="flex-1">
                <h3 className="font-semibold">{f.name}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {f.festivalDate}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => deleteFestival.mutate(f.id)}
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-charcoal">
          Banners
        </h1>
        <Button
          className="bg-saffron text-white"
          data-ocid="admin.open_modal_button"
        >
          <Plus size={16} className="mr-2" />
          Add Banner
        </Button>
      </div>
      {isLoading ? (
        <Skeleton className="h-40" data-ocid="admin.loading_state" />
      ) : banners.length === 0 ? (
        <div
          className="bg-white rounded-xl p-8 text-center shadow-card"
          data-ocid="admin.empty_state"
        >
          <Image size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No banners configured</p>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="admin.list">
          {banners.map((b, i) => (
            <div
              key={b.id}
              className="bg-white rounded-xl p-4 shadow-card flex items-center gap-4"
              data-ocid={`admin.item.${i + 1}`}
            >
              <img
                src={b.imageUrl}
                alt={b.title}
                className="w-20 h-12 object-cover rounded"
              />
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
                onClick={() => deleteBanner.mutate(b.id)}
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
                { id: "imageUrl", label: "Image URL" },
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
