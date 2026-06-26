import { useState, useMemo } from "react";
import { useParams } from "react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories, type Badge } from "../data/products";
import { ProductCard } from "../components/ProductCard";

type SortOption = "default" | "price-asc" | "price-desc" | "name";

const badgeFilters: { value: Badge; label: string }[] = [
  { value: "bestseller", label: "⭐ Bestsellers" },
  { value: "bio", label: "🌿 Bio" },
  { value: "nouveau", label: "✨ Nouveautés" },
  { value: "promo", label: "🏷️ Promos" },
];

export function Products() {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "tous");
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory && selectedCategory !== "tous") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedBadge) {
      list = list.filter((p) => p.badge === selectedBadge);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.benefits || []).some((b) => b.toLowerCase().includes(q)) ||
          (p.origin || "").toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  }, [selectedCategory, searchQuery, selectedBadge, sortBy]);

  const currentCategory = categories.find((c) => c.id === selectedCategory);
  const pageTitle = currentCategory ? currentCategory.name : "Tous les produits";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBadge(null);
    setSortBy("default");
  };

  const hasActiveFilters = searchQuery || selectedBadge || sortBy !== "default";

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-secondary/40 border-b border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>Accueil</span>
            <span>/</span>
            <span className="text-foreground font-medium">{pageTitle}</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-foreground mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {pageTitle}
          </h1>
          <p className="text-muted-foreground max-w-xl">
            {currentCategory?.description || "Découvrez notre sélection complète de produits bio et naturels."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category pills */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setSelectedCategory("tous")}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === "tous"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-foreground/70 border-border hover:border-primary/30 hover:text-primary"
              }`}
            >
              Tous
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-foreground/70 border-border hover:border-primary/30 hover:text-primary"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search + filters bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher par nom, bienfait, origine…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-full pl-11 pr-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-card border border-border rounded-full px-5 py-3 text-sm text-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none cursor-pointer"
            >
              <option value="default">Tri par défaut</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name">A–Z</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 border rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                showFilters || selectedBadge
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground/70 border-border hover:border-primary/30"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filtres</span>
            </button>
          </div>
        </div>

        {/* Badge filters */}
        {showFilters && (
          <div className="mb-6 p-5 bg-card rounded-2xl border border-border">
            <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-3">
              Filtrer par type
            </p>
            <div className="flex flex-wrap gap-2">
              {badgeFilters.map((bf) => (
                <button
                  key={bf.value}
                  onClick={() => setSelectedBadge(selectedBadge === bf.value ? null : bf.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    selectedBadge === bf.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-foreground/70 border-transparent hover:border-primary/30"
                  }`}
                >
                  {bf.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active filters + count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredProducts.length}</span>{" "}
            produit{filteredProducts.length !== 1 ? "s" : ""} trouvé{filteredProducts.length !== 1 ? "s" : ""}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Effacer les filtres
            </button>
          )}
        </div>

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-5">🌿</div>
            <h3
              className="text-2xl font-bold text-foreground mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Aucun produit trouvé
            </h3>
            <p className="text-muted-foreground mb-6">
              Essayez de modifier vos critères de recherche ou de filtrage.
            </p>
            <button
              onClick={clearFilters}
              className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
            >
              Voir tous les produits
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
