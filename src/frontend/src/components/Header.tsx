import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { PaisleyMotif } from "./Motifs";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Textiles", href: "/shop?category=Handloom+%26+Textiles" },
  { label: "Handicrafts", href: "/shop?category=Handicrafts" },
  { label: "Jewelry", href: "/shop?category=Jewelry" },
  { label: "Art", href: "/shop?category=Paintings+%26+Prints" },
  { label: "Shop by State", href: "/shop" },
  { label: "Artisans", href: "/artisans" },
  { label: "Blog", href: "/blog" },
  { label: "Our Story", href: "/our-story" },
];

const LANGUAGES = [
  "English",
  "\u0939\u093f\u0902\u0926\u0940",
  "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd",
  "\u09ac\u09be\u0982\u09b2\u09be",
];

const MARQUEE_GREETINGS = [
  "\u0935\u0938\u0941\u0927\u0948\u0935 \u0915\u0941\u091f\u0941\u092e\u094d\u092c\u0915\u092e\u094d \u00b7 Vasudhaiva Kutumbakam \u2014 The World is One Family",
  "\u09ac\u09bf\u09b6\u09cd\u09ac \u09ae\u09bf\u09a4\u09cd\u09b0 \u00b7 Biswa Mitra \u2014 Friend of the World",
  "\u0905\u0924\u093f\u0925\u093f \u0926\u0947\u0935\u094b \u092d\u0935 \u00b7 Atithi Devo Bhava \u2014 Guest is God",
  "\u092a\u0927\u093e\u0930\u094b \u092e\u094d\u0939\u093e\u0930\u0947 \u0926\u0947\u0936 \u00b7 Padharo Mare Desh \u2014 Welcome to Our Land",
  "\u0938\u094d\u0935\u093e\u0917\u0924\u092e\u094d \u00b7 Swagatam \u2014 Welcome",
  "\u0928\u092e\u0938\u094d\u0924\u0947 \u092d\u093e\u0930\u0924 \u00b7 Namaste Bharat \u2014 Greetings, India",
];

export function Header() {
  const { itemCount } = useCart();
  const { identity, login, clear } = useInternetIdentity();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate({
        to: "/shop",
        search: (prev: any) => ({ ...prev, search: search.trim() }),
      });
      setSearch("");
    }
  };

  const marqueeContent = [...MARQUEE_GREETINGS, ...MARQUEE_GREETINGS].join(
    "  \u2728  ",
  );

  return (
    <header className="sticky top-0 z-50 w-full" data-ocid="header.panel">
      {/* Utility Bar */}
      <div className="bg-peacock text-white text-xs py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span>Free shipping on orders above \u20b9500</span>
          <Link
            to="/admin"
            className="hover:underline hidden sm:inline"
            data-ocid="header.link"
          >
            Admin
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              className="hover:text-yellow-300 transition-colors"
              data-ocid="header.toggle"
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0"
            data-ocid="header.link"
          >
            <PaisleyMotif size={36} color="#7A2C2A" />
            <div>
              <div className="font-display font-bold text-maroon text-lg leading-tight">
                The Shades of Bharat
              </div>
              <div className="text-xs text-muted-foreground leading-tight">
                Celebrating the Soul of India
              </div>
            </div>
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-xl mx-auto hidden md:flex items-center relative"
          >
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search crafts, states, artisans..."
              className="pr-10 bg-cream border-border"
              data-ocid="header.search_input"
            />
            <button
              type="submit"
              className="absolute right-3 text-muted-foreground hover:text-saffron"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <Link to="/account" data-ocid="header.link">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Account"
              >
                <User size={20} />
              </Button>
            </Link>
            <Link to="/account" data-ocid="header.link">
              <Button variant="ghost" size="icon" aria-label="Wishlist">
                <Heart size={20} />
              </Button>
            </Link>
            <Link to="/cart" data-ocid="header.link">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-saffron text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            {identity ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => clear()}
                className="hidden sm:flex text-xs"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => login()}
                className="hidden sm:flex text-xs bg-saffron hover:bg-turmeric text-white"
                data-ocid="header.primary_button"
              >
                Sign In
              </Button>
            )}
            <button
              type="button"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              data-ocid="header.toggle"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Nav Bar */}
      <nav className="bg-white border-b border-border shadow-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  to={link.href as any}
                  className="inline-flex items-center gap-1 px-3 py-3 text-sm font-medium text-charcoal hover:text-saffron transition-colors"
                  data-ocid="header.link"
                >
                  {link.label}
                  {link.label === "Shop by State" && <ChevronDown size={14} />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Welcome Marquee Banner */}
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
          display: flex;
          white-space: nowrap;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div
        className="bg-amber-50 border-b border-amber-200 overflow-hidden py-1.5 px-0"
        aria-label="Cultural greetings"
      >
        <div className="marquee-track text-xs text-amber-900 font-medium gap-8">
          <span className="px-8">{marqueeContent}</span>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-border shadow-lg">
          <form onSubmit={handleSearch} className="p-4 flex gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="flex-1"
              data-ocid="header.search_input"
            />
            <Button
              type="submit"
              size="sm"
              className="bg-saffron text-white"
              data-ocid="header.submit_button"
            >
              Go
            </Button>
          </form>
          <ul className="pb-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  to={link.href as any}
                  className="block px-4 py-2 text-sm hover:bg-cream hover:text-saffron transition-colors"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="header.link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {identity ? (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    clear();
                    setMobileOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-destructive"
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    login();
                    setMobileOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-saffron font-medium"
                >
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
