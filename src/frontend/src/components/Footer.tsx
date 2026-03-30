import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiPinterest,
  SiX,
  SiYoutube,
} from "react-icons/si";
import { BlockPrintBorder } from "./Motifs";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-deep-purple text-white">
      <BlockPrintBorder />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* About */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-saffron">
              The Shades of Bharat
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              The Shades of Bharat is a celebration of India&apos;s infinite
              hues — from the saffron of Rajasthan&apos;s sands to the indigo of
              Odisha&apos;s ikats, the vermillion of Bengal&apos;s sindoor to
              the emerald of Kerala&apos;s paddy fields. We bring you the living
              craft traditions of 36 states and union territories, woven by the
              hands of master artisans who carry centuries of heritage in every
              thread, every brushstroke, every chisel mark. वसुधैव कुटुम्बकम् — the
              world is one family, and India&apos;s crafts belong to all.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-saffron transition-colors"
                data-ocid="footer.link"
              >
                <SiFacebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-saffron transition-colors"
                data-ocid="footer.link"
              >
                <SiInstagram size={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="hover:text-saffron transition-colors"
                data-ocid="footer.link"
              >
                <SiX size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="hover:text-saffron transition-colors"
                data-ocid="footer.link"
              >
                <SiYoutube size={18} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="hover:text-saffron transition-colors"
                data-ocid="footer.link"
              >
                <SiPinterest size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
              Shop
            </h4>
            <ul className="space-y-2">
              {[
                "Handloom & Textiles",
                "Handicrafts",
                "Tribal Art",
                "Jewelry",
                "Pottery & Ceramics",
                "Festival Specials",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/shop"
                    search={(prev: any) => ({ ...prev, category: cat })}
                    className="text-sm text-white/60 hover:text-saffron transition-colors"
                    data-ocid="footer.link"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cultural Guides */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
              Cultural Guides
            </h4>
            <ul className="space-y-2">
              {[
                "Silk Weaving Traditions",
                "Tribal Art Forms",
                "Festival Shopping Guide",
                "Artisan Stories",
                "Care & Preservation",
              ].map((guide) => (
                <li key={guide}>
                  <Link
                    to="/blog"
                    className="text-sm text-white/60 hover:text-saffron transition-colors"
                    data-ocid="footer.link"
                  >
                    {guide}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
              Support
            </h4>
            <ul className="space-y-2">
              {[
                "Track My Order",
                "Returns & Exchanges",
                "Size Guide",
                "Authenticity Guarantee",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/orders"
                    className="text-sm text-white/60 hover:text-saffron transition-colors"
                    data-ocid="footer.link"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment badges */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <span>Secure Payments:</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-xs">
              Visa
            </span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-xs">
              Mastercard
            </span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-xs">UPI</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-xs">
              Paytm
            </span>
          </div>
          <div className="text-sm text-white/50 text-center">
            Made in India with{" "}
            <Heart
              size={12}
              className="inline text-red-400 fill-red-400 mx-1"
            />{" "}
            by artisans across 36 states & UTs
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-white/40">
          © {year} The Shades of Bharat. Built with love using{" "}
          <a
            href={caffeineLink}
            target="_blank"
            rel="noreferrer"
            className="hover:text-saffron underline"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
