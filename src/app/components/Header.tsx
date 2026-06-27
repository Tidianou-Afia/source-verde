import { Link, useLocation } from "react-router";
import { Menu, X, Search, Phone } from "lucide-react";
import { useState } from "react";
import { buildWhatsAppUrl, LOGO_PATH } from "../config";

const navLinks = [
  { path: "/", label: "Accueil" },
  { path: "/produits", label: "Catalogue" },
  { path: "/produits/feuilles", label: "Plantes" },
  { path: "/produits/huiles", label: "Huiles" },
  { path: "/produits/graines", label: "Graines" },
  { path: "/produits/poudres", label: "Poudres" },
  { path: "/produits/cosmetiques", label: "Cosmétiques" },
  { path: "/produits/autres", label: "Tisanes" },
  { path: "/a-propos", label: "À propos" },
  { path: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path) && path !== "/produits";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90 shadow-sm">
      {/* Top bar */}
      <div className="hidden md:flex items-center justify-center gap-6 bg-primary text-primary-foreground text-xs py-1.5 px-4">
        <span className="flex items-center gap-1.5">
          <span>🌿</span> 100% Naturel &amp; Bio
        </span>
        <span className="text-primary-foreground/40">|</span>
        <span className="flex items-center gap-1.5">
          <span>🚚</span> Livraison rapide
        </span>
        <span className="text-primary-foreground/40">|</span>
        <span className="flex items-center gap-1.5">
          <span>📦</span> Commande via WhatsApp
        </span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 border border-primary/15 shadow-sm group-hover:shadow-md transition-all flex items-center justify-center">
              <img
                src={LOGO_PATH}
                alt="Source Verde"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-lg font-bold tracking-wide text-foreground"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                SOURCE VERDE
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase font-medium">
                Naturel &amp; Bio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — main links only */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.filter((link) => ["/", "/produits", "/a-propos", "/contact"].includes(link.path)).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-medium px-3 py-2 rounded-md transition-colors whitespace-nowrap
                  ${isActive(link.path)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden md:flex p-2 rounded-full text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              Commander
            </a>

            {/* Mobile hamburger */}
            <button
              className="xl:hidden p-2 rounded-md text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4 pt-1">
            <input
              autoFocus
              type="text"
              placeholder="Rechercher un produit naturel…"
              className="w-full border border-border bg-background rounded-full px-5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="xl:hidden border-t border-border py-4">
            <div className="grid grid-cols-2 gap-1">
              {navLinks.filter((link) => ["/", "/produits", "/a-propos", "/contact"].includes(link.path)).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium px-3 py-2.5 rounded-lg transition-colors
                    ${isActive(link.path)
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white text-sm font-semibold px-4 py-3 rounded-xl"
              >
                <Phone className="w-4 h-4" />
                Commander sur WhatsApp
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
