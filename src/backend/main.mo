import AccessControl "authorization/access-control";
import Map "mo:core/Map";
import Blob "mo:core/Blob";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Set "mo:core/Set";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type ProductId = Text;
  type OrderId = Text;
  type ReviewId = Text;
  type FestivalCollectionId = Text;
  type BlogPostId = Text;
  type BannerId = Text;
  type ArtisanId = Text;

  var nextProductId : Nat = 1;
  var nextOrderId : Nat = 1;
  var nextReviewId : Nat = 1;
  var nextFestivalCollectionId : Nat = 1;
  var nextBlogPostId : Nat = 1;
  var nextBannerId : Nat = 1;
  var nextArtisanId : Nat = 1;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let products = Map.empty<ProductId, Product>();
  let orders = Map.empty<OrderId, Order>();
  let reviews = Map.empty<ReviewId, Review>();
  let festivalCollections = Map.empty<FestivalCollectionId, FestivalCollection>();
  let blogPosts = Map.empty<BlogPostId, BlogPost>();
  let banners = Map.empty<BannerId, Banner>();
  let wishlists = Map.empty<Principal, Set.Set<ProductId>>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let artisans = Map.empty<ArtisanId, Artisan>();
  var bankAccount : ?BankAccount = null;
  var marqueeGreetings : [Text] = [];

  public type UserProfile = {
    name : Text;
  };

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Nat;
    originalPrice : Nat;
    state : Text;
    craftType : Text;
    artisanName : Text;
    artisanStory : Text;
    imageUrl : Text;
    additionalImages : [Text];
    stockQty : Int;
    category : Text;
    tags : [Text];
    careInstructions : Text;
    isNewArrival : Bool;
    isFeatured : Bool;
    isBestseller : Bool;
    createdAt : Int;
  };

  public type Order = {
    id : OrderId;
    userId : Principal;
    guestEmail : ?Text;
    items : [OrderItem];
    total : Nat;
    status : Text;
    trackingNumber : ?Text;
    shippingAddress : Text;
    createdAt : Int;
  };

  public type OrderItem = {
    productId : ProductId;
    qty : Int;
    price : Nat;
  };

  public type Review = {
    id : ReviewId;
    productId : ProductId;
    userId : Principal;
    userName : Text;
    rating : Nat; // 1-5
    comment : Text;
    createdAt : Int;
  };

  public type FestivalCollection = {
    id : FestivalCollectionId;
    name : Text;
    festivalDate : Text;
    description : Text;
    imageUrl : Text;
    productIds : [ProductId];
    isActive : Bool;
  };

  public type BlogPost = {
    id : BlogPostId;
    title : Text;
    content : Text;
    authorName : Text;
    artisanId : ?Text;
    imageUrl : Text;
    tags : [Text];
    createdAt : Int;
  };

  public type Banner = {
    id : BannerId;
    title : Text;
    subtitle : Text;
    imageUrl : Text;
    ctaText : Text;
    ctaLink : Text;
    isActive : Bool;
    order : Int;
  };

  public type BankAccount = {
    accountHolderName : Text;
    accountNumber : Text;
    ifscCode : Text;
    bankName : Text;
    branch : Text;
    upiId : Text;
  };

  public type Artisan = {
    id : ArtisanId;
    name : Text;
    state : Text;
    craft : Text;
    speciality : Text;
    story : Text;
    experience : Nat;
    quote : Text;
    products : [Text];
    awards : ?Text;
    culturalNote : Text;
    imageUrl : Text;
    createdAt : Int;
  };

  public type ProductFilter = {
    state : ?Text;
    category : ?Text;
    craftType : ?Text;
    minPrice : ?Nat;
    maxPrice : ?Nat;
    search : ?Text;
    isNewArrival : ?Bool;
    isFeatured : ?Bool;
    isBestseller : ?Bool;
    tag : ?Text;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Text.compare(p1.id, p2.id);
    };
  };

  module Banner {
    public func compare(b1 : Banner, b2 : Banner) : Order.Order {
      Int.compare(b1.order, b2.order);
    };
  };

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public queries - no authentication required
  public query ({ caller }) func listProducts(filter : ProductFilter) : async [Product] {
    products.values().toArray().filter(func(p) { matchesFilter(p, filter) }).sort();
  };

  public query ({ caller }) func getProduct(id : ProductId) : async ?Product {
    products.get(id);
  };

  public query ({ caller }) func listFestivalCollections() : async [FestivalCollection] {
    festivalCollections.values().toArray();
  };

  public query ({ caller }) func listBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray();
  };

  public query ({ caller }) func listBanners() : async [Banner] {
    banners.values().toArray().sort();
  };

  public query ({ caller }) func getProductReviews(productId : ProductId) : async [Review] {
    reviews.values().toArray().filter(func(r) { r.productId == productId });
  };

  // Artisan queries - public
  public query func listArtisans() : async [Artisan] {
    artisans.values().toArray();
  };

  public query func getArtisan(id : ArtisanId) : async ?Artisan {
    artisans.get(id);
  };

  // Authenticated user queries
  public query ({ caller }) func getUserOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their orders");
    };
    orders.values().toArray().filter(func(o) { o.userId == caller });
  };

  public query ({ caller }) func getOrder(id : OrderId) : async ?Order {
    switch (orders.get(id)) {
      case (null) { null };
      case (?order) {
        // Users can only view their own orders, admins can view all orders
        if (order.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
        ?order;
      };
    };
  };

  public query ({ caller }) func getWishlist() : async [ProductId] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view wishlist");
    };
    switch (wishlists.get(caller)) {
      case (null) { [] };
      case (?wishlist) { wishlist.toArray() };
    };
  };

  // Admin-only functions
  public shared ({ caller }) func createProduct(input : Product) : async ProductId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    let id = nextProductId.toText();
    let product : Product = {
      input with
      id;
      createdAt = Time.now();
    };
    products.add(id, product);
    nextProductId += 1;
    id;
  };

  public shared ({ caller }) func updateProduct(id : ProductId, input : Product) : async Product {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?existing) {
        let updated : Product = {
          existing with
          name = input.name;
          description = input.description;
          price = input.price;
          originalPrice = input.originalPrice;
          state = input.state;
          craftType = input.craftType;
          artisanName = input.artisanName;
          artisanStory = input.artisanStory;
          imageUrl = input.imageUrl;
          additionalImages = input.additionalImages;
          stockQty = input.stockQty;
          category = input.category;
          tags = input.tags;
          careInstructions = input.careInstructions;
          isNewArrival = input.isNewArrival;
          isFeatured = input.isFeatured;
          isBestseller = input.isBestseller;
        };
        products.add(id, updated);
        updated;
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : ProductId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.remove(id);
  };

  public shared ({ caller }) func createFestivalCollection(input : FestivalCollection) : async FestivalCollectionId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create festival collections");
    };
    let id = nextFestivalCollectionId.toText();
    let collection : FestivalCollection = {
      input with id;
    };
    festivalCollections.add(id, collection);
    nextFestivalCollectionId += 1;
    id;
  };

  public shared ({ caller }) func updateFestivalCollection(id : FestivalCollectionId, input : FestivalCollection) : async FestivalCollection {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update festival collections");
    };
    switch (festivalCollections.get(id)) {
      case (null) { Runtime.trap("Collection not found") };
      case (?existing) {
        let updated : FestivalCollection = {
          existing with
          name = input.name;
          festivalDate = input.festivalDate;
          description = input.description;
          imageUrl = input.imageUrl;
          productIds = input.productIds;
          isActive = input.isActive;
        };
        festivalCollections.add(id, updated);
        updated;
      };
    };
  };

  public shared ({ caller }) func deleteFestivalCollection(id : FestivalCollectionId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete festival collections");
    };
    if (not festivalCollections.containsKey(id)) {
      Runtime.trap("Collection not found");
    };
    festivalCollections.remove(id);
  };

  public shared ({ caller }) func createBlogPost(input : BlogPost) : async BlogPostId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create blog posts");
    };
    let id = nextBlogPostId.toText();
    let post : BlogPost = {
      input with
      id;
      createdAt = Time.now();
    };
    blogPosts.add(id, post);
    nextBlogPostId += 1;
    id;
  };

  public shared ({ caller }) func updateBlogPost(id : BlogPostId, input : BlogPost) : async BlogPost {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update blog posts");
    };
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Post not found") };
      case (?existing) {
        let updated : BlogPost = {
          existing with
          title = input.title;
          content = input.content;
          authorName = input.authorName;
          artisanId = input.artisanId;
          imageUrl = input.imageUrl;
          tags = input.tags;
        };
        blogPosts.add(id, updated);
        updated;
      };
    };
  };

  public shared ({ caller }) func deleteBlogPost(id : BlogPostId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete blog posts");
    };
    if (not blogPosts.containsKey(id)) {
      Runtime.trap("Post not found");
    };
    blogPosts.remove(id);
  };

  public shared ({ caller }) func createBanner(input : Banner) : async BannerId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create banners");
    };
    let id = nextBannerId.toText();
    let banner : Banner = {
      input with id;
    };
    banners.add(id, banner);
    nextBannerId += 1;
    id;
  };

  public shared ({ caller }) func updateBanner(id : BannerId, input : Banner) : async Banner {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update banners");
    };
    switch (banners.get(id)) {
      case (null) { Runtime.trap("Banner not found") };
      case (?existing) {
        let updated : Banner = {
          existing with
          title = input.title;
          subtitle = input.subtitle;
          imageUrl = input.imageUrl;
          ctaText = input.ctaText;
          ctaLink = input.ctaLink;
          isActive = input.isActive;
          order = input.order;
        };
        banners.add(id, updated);
        updated;
      };
    };
  };

  public shared ({ caller }) func deleteBanner(id : BannerId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete banners");
    };
    if (not banners.containsKey(id)) {
      Runtime.trap("Banner not found");
    };
    banners.remove(id);
  };

  public shared ({ caller }) func updateOrderStatus(id : OrderId, status : Text, trackingNumber : ?Text) : async Order {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        if (order.status == "cancelled") {
          Runtime.trap("Order is already cancelled");
        };
        let updated : Order = {
          order with
          status;
          trackingNumber;
        };
        orders.add(id, updated);
        updated;
      };
    };
  };

  // Artisan CRUD (Admin-only write, public read)
  public shared ({ caller }) func createArtisan(input : Artisan) : async ArtisanId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create artisans");
    };
    let id = nextArtisanId.toText();
    let artisan : Artisan = {
      input with
      id;
      createdAt = Time.now();
    };
    artisans.add(id, artisan);
    nextArtisanId += 1;
    id;
  };

  public shared ({ caller }) func updateArtisan(id : ArtisanId, input : Artisan) : async Artisan {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update artisans");
    };
    switch (artisans.get(id)) {
      case (null) { Runtime.trap("Artisan not found") };
      case (?existing) {
        let updated : Artisan = {
          existing with
          name = input.name;
          state = input.state;
          craft = input.craft;
          speciality = input.speciality;
          story = input.story;
          experience = input.experience;
          quote = input.quote;
          products = input.products;
          awards = input.awards;
          culturalNote = input.culturalNote;
          imageUrl = input.imageUrl;
        };
        artisans.add(id, updated);
        updated;
      };
    };
  };

  public shared ({ caller }) func deleteArtisan(id : ArtisanId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete artisans");
    };
    if (not artisans.containsKey(id)) {
      Runtime.trap("Artisan not found");
    };
    artisans.remove(id);
  };

  // Authenticated user functions
  public shared ({ caller }) func placeOrder(items : [OrderItem], total : Nat, shippingAddress : Text) : async OrderId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can place orders");
    };
    let id = nextOrderId.toText();
    let order : Order = {
      id;
      userId = caller;
      guestEmail = null;
      items;
      total;
      status = "pending";
      trackingNumber = null;
      shippingAddress;
      createdAt = Time.now();
    };
    orders.add(id, order);
    nextOrderId += 1;
    id;
  };

  public shared ({ caller }) func placeGuestOrder(guestEmail : Text, items : [OrderItem], total : Nat, shippingAddress : Text) : async OrderId {
    // Guest orders are allowed for anyone (including anonymous principals)
    let id = nextOrderId.toText();
    let order : Order = {
      id;
      userId = caller;
      guestEmail = ?guestEmail;
      items;
      total;
      status = "pending";
      trackingNumber = null;
      shippingAddress;
      createdAt = Time.now();
    };
    orders.add(id, order);
    nextOrderId += 1;
    id;
  };

  public shared ({ caller }) func addReview(productId : ProductId, userName : Text, rating : Nat, comment : Text) : async ReviewId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can add reviews");
    };
    let id = nextReviewId.toText();
    let review : Review = {
      id;
      productId;
      userId = caller;
      userName;
      rating;
      comment;
      createdAt = Time.now();
    };
    reviews.add(id, review);
    nextReviewId += 1;
    id;
  };

  public shared ({ caller }) func addToWishlist(productId : ProductId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can manage wishlist");
    };
    let wishlist = switch (wishlists.get(caller)) {
      case (null) { Set.empty<ProductId>() };
      case (?existing) { existing };
    };
    wishlist.add(productId);
    wishlists.add(caller, wishlist);
  };

  public shared ({ caller }) func removeFromWishlist(productId : ProductId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can manage wishlist");
    };
    switch (wishlists.get(caller)) {
      case (null) { Runtime.trap("Wishlist not found") };
      case (?wishlist) {
        wishlist.remove(productId);
        wishlists.add(caller, wishlist);
      };
    };
  };

  // Bank Account Settings (Admin-only)
  public shared ({ caller }) func saveBankAccount(input : BankAccount) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can save bank account details");
    };
    bankAccount := ?input;
  };

  public query ({ caller }) func getBankAccount() : async ?BankAccount {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view bank account details");
    };
    bankAccount;
  };

  // Marquee Greetings (Admin-editable)
  public shared ({ caller }) func saveMarqueeGreetings(greetings : [Text]) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can save marquee greetings");
    };
    marqueeGreetings := greetings;
  };

  public query func getMarqueeGreetings() : async [Text] {
    marqueeGreetings;
  };

  func matchesFilter(product : Product, filter : ProductFilter) : Bool {
    switch (filter.state) {
      case (?state) {
        let stateLower = state.trim(#char ' ').toLower();
        let productStateLower = product.state.trim(#char ' ').toLower();

        if (not productStateLower.contains(#text stateLower)) {
          return false;
        };
      };
      case (null) {};
    };

    switch (filter.category) {
      case (?category) {
        let categoryLower = category.trim(#char ' ').toLower();
        let productCategoryLower = product.category.trim(#char ' ').toLower();

        if (not productCategoryLower.contains(#text categoryLower)) {
          return false;
        };
      };
      case (null) {};
    };

    switch (filter.craftType) {
      case (?craftType) {
        let craftTypeLower = craftType.trim(#char ' ').toLower();
        let productCraftTypeLower = product.craftType.trim(#char ' ').toLower();

        if (not productCraftTypeLower.contains(#text craftTypeLower)) {
          return false;
        };
      };
      case (null) {};
    };

    switch (filter.minPrice) {
      case (?minPrice) {
        if (product.price < minPrice) { return false };
      };
      case (null) {};
    };

    switch (filter.maxPrice) {
      case (?maxPrice) {
        if (product.price > maxPrice) { return false };
      };
      case (null) {};
    };

    switch (filter.search) {
      case (?search) {
        let searchLower = search.trim(#char ' ').toLower();
        let productNameLower = product.name.trim(#char ' ').toLower();
        let productDescriptionLower = product.description.trim(#char ' ').toLower();
        let productArtisanLower = product.artisanName.trim(#char ' ').toLower();

        if (
          not productNameLower.contains(#text searchLower) and
          not productDescriptionLower.contains(#text searchLower) and
          not productArtisanLower.contains(#text searchLower)
        ) {
          return false;
        };
      };
      case (null) {};
    };

    switch (filter.isNewArrival) {
      case (?isNewArrival) {
        if (product.isNewArrival != isNewArrival) { return false };
      };
      case (null) {};
    };

    switch (filter.isFeatured) {
      case (?isFeatured) {
        if (product.isFeatured != isFeatured) { return false };
      };
      case (null) {};
    };

    switch (filter.isBestseller) {
      case (?isBestseller) {
        if (product.isBestseller != isBestseller) { return false };
      };
      case (null) {};
    };

    switch (filter.tag) {
      case (?tag) {
        let tagLower = tag.trim(#char ' ').toLower();
        let tagFound = product.tags.any(
          func(productTag) {
            productTag.trim(#char ' ').toLower().contains(#text tagLower);
          }
        );
        if (not tagFound) { return false };
      };
      case (null) {};
    };

    true;
  };
};
