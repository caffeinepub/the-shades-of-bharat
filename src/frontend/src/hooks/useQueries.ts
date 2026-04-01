import type { Backend } from "@/backend";
import type { ProductFilter } from "@/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useProducts(filter: ProductFilter = {}) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProduct(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useProductReviews(productId: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductReviews(productId);
    },
    enabled: !!actor && !isFetching && !!productId,
  });
}

export function useFestivalCollections() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["festivals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFestivalCollections();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPost(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      if (!actor) return null;
      const posts = await actor.listBlogPosts();
      return posts.find((p) => p.id === id) ?? null;
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useBanners() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBanners();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useWishlist() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWishlist();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUserOrders() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddReview() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      userName,
      rating,
      comment,
    }: {
      productId: string;
      userName: string;
      rating: number;
      comment: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addReview(productId, userName, BigInt(rating), comment);
    },
    onSuccess: (_, { productId }) => {
      qc.invalidateQueries({ queryKey: ["reviews", productId] });
    },
  });
}

export function useToggleWishlist() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      isWishlisted,
    }: { productId: string; isWishlisted: boolean }) => {
      if (!actor) throw new Error("Not connected");
      if (isWishlisted) {
        return actor.removeFromWishlist(productId);
      }
      return actor.addToWishlist(productId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      items,
      total,
      shippingAddress,
      guestEmail,
    }: {
      items: Array<{ productId: string; qty: number; price: number }>;
      total: number;
      shippingAddress: string;
      guestEmail?: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const orderItems = items.map((i) => ({
        productId: i.productId,
        qty: BigInt(i.qty),
        price: BigInt(i.price),
      }));
      if (guestEmail) {
        return actor.placeGuestOrder(
          guestEmail,
          orderItems,
          BigInt(total),
          shippingAddress,
        );
      }
      return actor.placeOrder(orderItems, BigInt(total), shippingAddress);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: { name: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

// Admin mutations
export function useCreateProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Parameters<Backend["createProduct"]>[0]) => {
      if (!actor) throw new Error("Not connected");
      return actor.createProduct(product);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: { id: string; data: Parameters<Backend["updateProduct"]>[1] }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProduct(id, data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      trackingNumber,
    }: { id: string; status: string; trackingNumber?: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(id, status, trackingNumber ?? null);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useCreateFestival() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (
      data: Parameters<Backend["createFestivalCollection"]>[0],
    ) => {
      if (!actor) throw new Error("Not connected");
      return actor.createFestivalCollection(data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["festivals"] });
    },
  });
}

export function useDeleteFestival() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteFestivalCollection(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["festivals"] });
    },
  });
}

export function useCreateBanner() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Parameters<Backend["createBanner"]>[0]) => {
      if (!actor) throw new Error("Not connected");
      return actor.createBanner(data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["banners"] });
    },
  });
}

export function useDeleteBanner() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteBanner(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["banners"] });
    },
  });
}

export function useCreateBlogPost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Parameters<Backend["createBlogPost"]>[0]) => {
      if (!actor) throw new Error("Not connected");
      return actor.createBlogPost(data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog"] });
    },
  });
}

export function useDeleteBlogPost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteBlogPost(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog"] });
    },
  });
}

export function useGetBankAccount() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["bankAccount"],
    queryFn: async () => {
      if (!actor) return null;
      return (actor as any).getBankAccount() as Promise<{
        accountHolderName: string;
        accountNumber: string;
        ifscCode: string;
        bankName: string;
        branch: string;
        upiId: string;
      } | null>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveBankAccount() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      accountHolderName: string;
      accountNumber: string;
      ifscCode: string;
      bankName: string;
      branch: string;
      upiId: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).saveBankAccount(data) as Promise<void>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bankAccount"] });
    },
  });
}

export function useGetMarqueeGreetings() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["marqueeGreetings"],
    queryFn: async () => {
      if (!actor) return [] as string[];
      return (actor as any).getMarqueeGreetings() as Promise<string[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveMarqueeGreetings() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (greetings: string[]) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).saveMarqueeGreetings(greetings) as Promise<void>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["marqueeGreetings"] });
    },
  });
}

// Artisan hooks
export function useArtisans() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["artisans"],
    queryFn: async () => {
      if (!actor) return [] as any[];
      return (actor as any).listArtisans() as Promise<any[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useArtisan(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["artisan", id],
    queryFn: async () => {
      if (!actor) return null;
      return (actor as any).getArtisan(id) as Promise<any | null>;
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateArtisan() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: any) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).createArtisan(input) as Promise<string>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["artisans"] });
    },
  });
}

export function useUpdateArtisan() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: any }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).updateArtisan(id, input) as Promise<any>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["artisans"] });
    },
  });
}

export function useDeleteArtisan() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).deleteArtisan(id) as Promise<void>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["artisans"] });
    },
  });
}
