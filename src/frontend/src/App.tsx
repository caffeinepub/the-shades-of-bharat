import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import AccountPage from "@/pages/AccountPage";
import AdminPanel from "@/pages/AdminPanel";
import ArtisanProfilePage from "@/pages/ArtisanProfilePage";
import ArtisansPage from "@/pages/ArtisansPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import HomePage from "@/pages/HomePage";
import OrderConfirmationPage from "@/pages/OrderConfirmationPage";
import OrderTrackingPage from "@/pages/OrderTrackingPage";
import OurStoryPage from "@/pages/OurStoryPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import ShopPage from "@/pages/ShopPage";
import StatePage from "@/pages/StatePage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
      <Toaster richColors position="top-right" />
    </CartProvider>
  ),
});

// Routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: ShopPage,
  validateSearch: (search: Record<string, unknown>) => ({
    state: search.state as string | undefined,
    category: search.category as string | undefined,
    search: search.search as string | undefined,
    tag: search.tag as string | undefined,
    isNewArrival: search.isNewArrival as boolean | undefined,
  }),
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductDetailPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const orderSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-success",
  component: OrderConfirmationPage,
  validateSearch: (search: Record<string, unknown>) => ({
    orderId: search.orderId as string | undefined,
  }),
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: OrderTrackingPage,
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: AccountPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPanel,
});

const stateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/state/$stateName",
  component: StatePage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$id",
  component: BlogPostPage,
});

const ourStoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/our-story",
  component: OurStoryPage,
});

const artisansRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/artisans",
  component: ArtisansPage,
});

const artisanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/artisan/$artisanId",
  component: ArtisanProfilePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  shopRoute,
  productRoute,
  cartRoute,
  checkoutRoute,
  orderSuccessRoute,
  ordersRoute,
  accountRoute,
  adminRoute,
  stateRoute,
  blogRoute,
  blogPostRoute,
  ourStoryRoute,
  artisansRoute,
  artisanRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
