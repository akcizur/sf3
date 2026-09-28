import { useCallback, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/lib/catalog.ts";

const STORAGE_KEY = "maison-terre-wishlist";

function loadWishlist(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((slug) => typeof slug === "string" && Boolean(getProduct(slug))) : [];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [slugs, setSlugs] = useState<string[]>(loadWishlist);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs)); } catch {}
  }, [slugs]);

  const toggle = useCallback((slug: string) => {
    if (!getProduct(slug)) return;
    setSlugs((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
  }, []);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);
  const products = useMemo<Product[]>(() => slugs.flatMap((slug) => {
    const product = getProduct(slug);
    return product ? [product] : [];
  }), [slugs]);

  return { slugs, products, toggle, has, count: products.length };
}
