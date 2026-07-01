import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products as fallbackProducts } from "../data/products";
import { subscribeCatalogProducts, type AdminProduct } from "../services/admin";

type CatalogContextValue = {
  products: AdminProduct[];
  isLoaded: boolean;
};

const CatalogContext = createContext<CatalogContextValue>({
  products: [],
  isLoaded: false,
});

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<AdminProduct[]>(() =>
    fallbackProducts.map((product) => ({
      ...product,
      active: true,
      featured: product.badge === "bestseller",
      stock: 24,
    }))
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeCatalogProducts((items) => {
      setProducts(items);
      setIsLoaded(true);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(() => ({ products, isLoaded }), [products, isLoaded]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalogProducts() {
  return useContext(CatalogContext);
}
