import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, User } from "lucide-react";

const SAMPLE_POSTS = [
  {
    id: "b1",
    title: "The Ancient Art of Banarasi Silk Weaving",
    content:
      "For over 2,000 years, the weavers of Varanasi have been creating some of the world's most magnificent silk fabrics. Banarasi silk is distinguished by its fine silk, gold and silver brocade or zari, fine embroidery, and opulent embellishments.",
    authorName: "Priya Sharma",
    imageUrl: "/assets/generated/banarasi-silk-saree.dim_600x700.jpg",
    tags: ["silk", "weaving", "varanasi"],
    createdAt: BigInt(Date.now()),
  },
  {
    id: "b2",
    title: "Madhubani: When Rice Paste Tells Stories",
    content:
      "Madhubani painting is a style of Indian painting practiced in the Mithila region of Bihar and Nepal. Using fingers, twigs, brushes, nib pens, and matchsticks, painters create intricate compositions filled with geometric patterns and natural imagery.",
    authorName: "Ravi Kumar",
    imageUrl: "/assets/generated/madhubani-painting.dim_600x700.jpg",
    tags: ["madhubani", "bihar", "folk-art"],
    createdAt: BigInt(Date.now() - 86400000 * 2),
  },
  {
    id: "b3",
    title: "Warli Tribes: Art as a Form of Prayer",
    content:
      "The Warli tribe of Maharashtra creates art not for commerce but as a form of sacred communication. Their geometric figures, painted with rice paste on mud walls, tell stories of harvests, marriages, and the sacred cycle of nature.",
    authorName: "Anita Desai",
    imageUrl: "/assets/generated/warli-art.dim_600x700.jpg",
    tags: ["warli", "tribal", "maharashtra"],
    createdAt: BigInt(Date.now() - 86400000 * 5),
  },
  {
    id: "b4",
    title: "Kashmir's Golden Fiber: The Pashmina Story",
    content:
      "High in the Himalayas, at altitudes above 14,000 feet, lives the Changthangi goat. Its fine undercoat fiber — Pashmina — is combed and spun into the softest, most luxurious wool the world has known for centuries.",
    authorName: "Arshad Khan",
    imageUrl: "/assets/generated/kashmiri-pashmina.dim_600x700.jpg",
    tags: ["pashmina", "kashmir", "luxury"],
    createdAt: BigInt(Date.now() - 86400000 * 7),
  },
];

export default function BlogPage() {
  const { data: posts, isLoading } = useBlogPosts();
  const displayPosts = posts && posts.length > 0 ? posts : SAMPLE_POSTS;

  return (
    <main className="min-h-screen bg-cream">
      <div className="bg-deep-purple text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display font-bold text-4xl mb-3">
            Stories & Heritage
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Discover the stories behind India's most treasured crafts, artisans,
            and cultural traditions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="blog.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="blog.list"
          >
            {displayPosts.map((post, i) => (
              <Link
                key={post.id}
                to="/blog/$id"
                params={{ id: post.id }}
                data-ocid={`blog.item.${i + 1}`}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-card card-hover">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="font-display font-bold text-lg text-charcoal mb-2 hover:text-saffron transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User size={12} />
                        {post.authorName}
                      </div>
                      <div className="flex items-center gap-1 text-saffron font-medium">
                        Read More <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
