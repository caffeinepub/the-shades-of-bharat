import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type OrderId = string;
export interface UserProfile {
    name: string;
}
export interface Review {
    id: ReviewId;
    userName: string;
    userId: Principal;
    createdAt: bigint;
    productId: ProductId;
    comment: string;
    rating: bigint;
}
export interface BlogPost {
    id: BlogPostId;
    title: string;
    content: string;
    createdAt: bigint;
    tags: Array<string>;
    authorName: string;
    imageUrl: string;
    artisanId?: string;
}
export interface OrderItem {
    qty: bigint;
    productId: ProductId;
    price: bigint;
}
export interface Order {
    id: OrderId;
    status: string;
    trackingNumber?: string;
    total: bigint;
    userId: Principal;
    createdAt: bigint;
    guestEmail?: string;
    shippingAddress: string;
    items: Array<OrderItem>;
}
export interface ProductFilter {
    tag?: string;
    isNewArrival?: boolean;
    search?: string;
    maxPrice?: bigint;
    state?: string;
    isFeatured?: boolean;
    craftType?: string;
    isBestseller?: boolean;
    category?: string;
    minPrice?: bigint;
}
export type BannerId = string;
export interface Banner {
    id: BannerId;
    title: string;
    order: bigint;
    isActive: boolean;
    ctaLink: string;
    imageUrl: string;
    ctaText: string;
    subtitle: string;
}
export type BlogPostId = string;
export interface FestivalCollection {
    id: FestivalCollectionId;
    productIds: Array<ProductId>;
    name: string;
    description: string;
    isActive: boolean;
    imageUrl: string;
    festivalDate: string;
}
export type FestivalCollectionId = string;
export type ReviewId = string;
export type ProductId = string;
export interface Product {
    id: ProductId;
    originalPrice: bigint;
    stockQty: bigint;
    name: string;
    createdAt: bigint;
    tags: Array<string>;
    isNewArrival: boolean;
    description: string;
    additionalImages: Array<string>;
    artisanStory: string;
    artisanName: string;
    state: string;
    imageUrl: string;
    isFeatured: boolean;
    craftType: string;
    isBestseller: boolean;
    category: string;
    price: bigint;
    careInstructions: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addReview(productId: ProductId, userName: string, rating: bigint, comment: string): Promise<ReviewId>;
    addToWishlist(productId: ProductId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBanner(input: Banner): Promise<BannerId>;
    createBlogPost(input: BlogPost): Promise<BlogPostId>;
    createFestivalCollection(input: FestivalCollection): Promise<FestivalCollectionId>;
    createProduct(input: Product): Promise<ProductId>;
    deleteBanner(id: BannerId): Promise<void>;
    deleteBlogPost(id: BlogPostId): Promise<void>;
    deleteFestivalCollection(id: FestivalCollectionId): Promise<void>;
    deleteProduct(id: ProductId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrder(id: OrderId): Promise<Order | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    getProductReviews(productId: ProductId): Promise<Array<Review>>;
    getUserOrders(): Promise<Array<Order>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWishlist(): Promise<Array<ProductId>>;
    isCallerAdmin(): Promise<boolean>;
    listBanners(): Promise<Array<Banner>>;
    listBlogPosts(): Promise<Array<BlogPost>>;
    listFestivalCollections(): Promise<Array<FestivalCollection>>;
    listProducts(filter: ProductFilter): Promise<Array<Product>>;
    placeGuestOrder(guestEmail: string, items: Array<OrderItem>, total: bigint, shippingAddress: string): Promise<OrderId>;
    placeOrder(items: Array<OrderItem>, total: bigint, shippingAddress: string): Promise<OrderId>;
    removeFromWishlist(productId: ProductId): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateBanner(id: BannerId, input: Banner): Promise<Banner>;
    updateBlogPost(id: BlogPostId, input: BlogPost): Promise<BlogPost>;
    updateFestivalCollection(id: FestivalCollectionId, input: FestivalCollection): Promise<FestivalCollection>;
    updateOrderStatus(id: OrderId, status: string, trackingNumber: string | null): Promise<Order>;
    updateProduct(id: ProductId, input: Product): Promise<Product>;
}
