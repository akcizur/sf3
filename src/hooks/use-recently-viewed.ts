import { useEffect, useState } from "react";
import { getProduct, type Product } from "@/lib/catalog.ts";

const KEY = "maison-terre-recently-viewed";

function load(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(value) ? value.filter((slug) => typeof slug === "string") : [];
  } catch {
    return [];
  }
}

export function useRecentlyViewed(slug?: string) {
  const [slugs, setSlugs] = useState<string[]>(load);

  useEffect(() => {
    if (!slug) return;
    setSlugs((current) => {
      const next = [slug, ...current.filter((item) => item !== slug)].slice(0, 8);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [slug]);

  const products: Product[] = slugs
    .filter((item) => item !== slug)
    .flatMap((item) => {
      const product = getProduct(item);
      return product ? [product] : [];
    });

  return { products };
}
