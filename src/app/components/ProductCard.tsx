import { ShoppingBag, Star, Leaf } from "lucide-react";
import { Product } from "../data/products";
import { buildWhatsAppUrl } from "../config";

interface ProductCardProps {
  product: Product;
}

const badgeConfig = {
  bio: { label: "Bio", className: "bg-primary/15 text-primary" },
  nouveau: { label: "Nouveau", className: "bg-accent/20 text-amber-700" },
  bestseller: { label: "⭐ Bestseller", className: "bg-amber-100 text-amber-800" },
  promo: { label: "Promo", className: "bg-red-100 text-red-700" },
};

export function ProductCard({ product }: ProductCardProps) {
  const handleOrder = () => {
    window.open(buildWhatsAppUrl(product.name, product.price), "_blank");
  };

  const badge = product.badge ? badgeConfig[product.badge] : null;

  return (
    <article className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-60">🌿</span>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badge.className}`}>
            {badge.label}
          </span>
        )}

        {/* Bio indicator */}
        {product.badge === "bio" && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow">
            <Leaf className="w-3.5 h-3.5 text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="flex-1">
          {product.origin && (
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide font-medium">
              {product.origin}
            </p>
          )}
          <h3
            className="font-semibold text-foreground leading-snug text-base mb-1 group-hover:text-primary transition-colors"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Benefits preview */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.benefits.slice(0, 2).map((b) => (
                <span key={b} className="text-xs bg-secondary text-foreground/70 px-2 py-0.5 rounded-full">
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
          <p className="text-xl font-bold text-primary">
            {product.price.toFixed(2)}<span className="text-sm font-normal ml-0.5">€</span>
          </p>
          <button
            onClick={handleOrder}
            className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Commander
          </button>
        </div>
      </div>
    </article>
  );
}
