import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPost } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Tag, User } from "lucide-react";

const SAMPLE_POSTS: Record<
  string,
  {
    title: string;
    content: string;
    authorName: string;
    imageUrl: string;
    tags: string[];
  }
> = {
  b1: {
    title: "The Ancient Art of Banarasi Silk Weaving",
    content: `For over 2,000 years, the weavers of Varanasi have been creating some of the world's most magnificent silk fabrics. Banarasi silk is distinguished by its fine silk, gold and silver brocade or zari, fine embroidery, and opulent embellishments.


Today, approximately 1.2 million people in and around Varanasi depend on the silk weaving industry for their livelihoods. A single Banarasi saree can take anywhere from 15 days to 6 months to complete, depending on its intricacy. Each saree is a unique work of art, bearing the invisible fingerprints of the master weaver who created it.`,
    authorName: "Priya Sharma",
    imageUrl: "/assets/generated/banarasi-silk-saree.dim_600x700.jpg",
    tags: ["silk", "weaving", "varanasi", "heritage"],
  },
  b2: {
    title: "Madhubani: When Rice Paste Tells Stories",
    content: `Madhubani painting originated in the Mithila region of Bihar, where women traditionally decorated the walls of their homes with these intricate paintings during festivals and special occasions.

The paintings are characterized by their use of geometric patterns, vibrant colors, and depictions of natural elements like flowers, birds, and fish. The subjects drawn from nature and mythology include the sun, the moon, religious plants like tulsi, and scenes from royal courts.

What makes Madhubani unique is its traditionally domestic origins — passed from mother to daughter for generations, these paintings were originally created on mud walls using fingers, twigs, and natural pigments derived from plants, minerals, and milk.`,
    authorName: "Ravi Kumar",
    imageUrl: "/assets/generated/madhubani-painting.dim_600x700.jpg",
    tags: ["madhubani", "bihar", "folk-art"],
  },
  b3: {
    title: "Warli Tribes: Art as a Form of Prayer",
    content:
      "The Warli tribe of Maharashtra creates art not for commerce but as a form of sacred communication.",
    authorName: "Anita Desai",
    imageUrl: "/assets/generated/warli-art.dim_600x700.jpg",
    tags: ["warli", "tribal"],
  },
  b4: {
    title: "Kashmir's Golden Fiber: The Pashmina Story",
    content:
      "High in the Himalayas, at altitudes above 14,000 feet, lives the Changthangi goat.",
    authorName: "Arshad Khan",
    imageUrl: "/assets/generated/kashmiri-pashmina.dim_600x700.jpg",
    tags: ["pashmina", "kashmir"],
  },
};

export default function BlogPostPage() {
  const { id } = useParams({ from: "/blog/$id" });
  const { data: post, isLoading } = useBlogPost(id);
  const fallback = SAMPLE_POSTS[id];
  const displayPost = post ?? fallback;

  if (isLoading) {
    return (
      <div
        className="max-w-3xl mx-auto px-4 py-8 space-y-4"
        data-ocid="blog-post.loading_state"
      >
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  if (!displayPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Post not found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          to="/blog"
          className="flex items-center gap-2 text-muted-foreground hover:text-saffron mb-6 text-sm"
          data-ocid="blog-post.link"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <div className="aspect-video rounded-xl overflow-hidden mb-6">
          <img
            src={displayPost.imageUrl}
            alt={displayPost.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {displayPost.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag size={10} className="mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="font-display font-bold text-3xl text-charcoal mb-4">
          {displayPost.title}
        </h1>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <User size={14} />
          <span>
            By{" "}
            <strong className="text-foreground">
              {displayPost.authorName}
            </strong>
          </span>
        </div>

        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
          {displayPost.content}
        </div>
      </div>
    </main>
  );
}
