import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/lib/catalog.ts";

type CartLine = { slug: string; quantity: number };
type CartItem = CartLine & { product: Product };
type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string, quantity: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
};

const STORAGE_KEY = "maison-terre-cart";
const MAX_QUANTITY = 99;
const CartContext = createContext<CartContextValue | null>(null);

function sanitizeQuantity(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 0;
  return Math.min(MAX_QUANTITY, Math.max(0, Math.floor(value)));
}

function sanitizeLines(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];

  const merged = new Map<string, number>();

  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;

    const slug = "slug" in entry && typeof entry.slug === "string" ? entry.slug : "";
    const quantity = sanitizeQuantity("quantity" in entry ? entry.quantity : 0);

    if (!slug || quantity < 1 || !getProduct(slug)) continue;
    merged.set(slug, Math.min(MAX_QUANTITY, (merged.get(slug) ?? 0) + quantity));
  }

  return [...merged.entries()].map(([slug, quantity]) => ({ slug, quantity }));
}

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? sanitizeLines(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadCart);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage can be unavailable or full; the in-memory cart still works.
    }
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const items = lines.flatMap((line) => {
      const product = getProduct(line.slug);
      return product ? [{ ...line, product }] : [];
    });

    return {
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.quantity * item.product.price, 0),
      isOpen,
      setOpen,
      add: (slug, quantity) => {
        const product = getProduct(slug);
        const safeQuantity = sanitizeQuantity(quantity);

        if (!product || safeQuantity < 1) return;

        setLines((prev) => {
          const current = prev.find((line) => line.slug === slug);
          if (!current) return [...prev, { slug, quantity: safeQuantity }];

          return prev.map((line) =>
            line.slug === slug
              ? { ...line, quantity: Math.min(MAX_QUANTITY, line.quantity + safeQuantity) }
              : line,
          );
        });
        setOpen(true);
      },
      setQuantity: (slug, quantity) => {
        const safeQuantity = sanitizeQuantity(quantity);

        setLines((prev) =>
          safeQuantity < 1
            ? prev.filter((line) => line.slug !== slug)
            : prev.map((line) =>
                line.slug === slug ? { ...line, quantity: safeQuantity } : line,
              ),
        );
      },
      remove: (slug) => setLines((prev) => prev.filter((line) => line.slug !== slug)),
    };
  }, [lines, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
