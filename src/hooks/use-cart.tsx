import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/lib/catalog.ts";
import { track } from "@/lib/analytics.ts";

export type CartOptions = Record<string, string>;
type CartLine = { key: string; slug: string; quantity: number; options: CartOptions };
type CartItem = CartLine & { product: Product };
type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string, quantity: number, options?: CartOptions) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "maison-terre-cart-v2";
const MAX_QUANTITY = 99;
const CartContext = createContext<CartContextValue | null>(null);

function makeKey(slug: string, options: CartOptions = {}) {
  const suffix = Object.entries(options)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => key + "=" + value)
    .join("&");
  return slug + "|" + suffix;
}

function sanitizeQuantity(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) return 0;
  return Math.min(MAX_QUANTITY, Math.max(0, Math.floor(value)));
}

function sanitizeOptions(value: unknown): CartOptions {
  if (!value || typeof value !== "object") return {};
  return Object.fromEntries(
    Object.entries(value).filter(([key, item]) => typeof key === "string" && typeof item === "string"),
  );
}

function sanitizeLines(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  const merged = new Map<string, CartLine>();
  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const raw = entry as Record<string, unknown>;
    const slug = typeof raw.slug === "string" ? raw.slug : "";
    const quantity = sanitizeQuantity(raw.quantity);
    if (!slug || quantity < 1 || !getProduct(slug)) continue;
    const options = sanitizeOptions(raw.options);
    const key = typeof raw.key === "string" ? raw.key : makeKey(slug, options);
    const current = merged.get(key);
    merged.set(key, {
      key,
      slug,
      options,
      quantity: Math.min(MAX_QUANTITY, (current?.quantity ?? 0) + quantity),
    });
  }
  return [...merged.values()];
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
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lines)); } catch {}
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
      add: (slug, quantity, options = {}) => {
        const product = getProduct(slug);
        const safeQuantity = sanitizeQuantity(quantity);
        if (!product || safeQuantity < 1) return;
        const key = makeKey(slug, options);
        setLines((prev) => {
          const current = prev.find((line) => line.key === key);
          if (!current) return [...prev, { key, slug, quantity: safeQuantity, options }];
          return prev.map((line) =>
            line.key === key
              ? { ...line, quantity: Math.min(MAX_QUANTITY, line.quantity + safeQuantity) }
              : line,
          );
        });
        track("add_to_cart", { slug, quantity: safeQuantity, options });
        setOpen(true);
      },
      setQuantity: (key, quantity) => {
        const safeQuantity = sanitizeQuantity(quantity);
        setLines((prev) =>
          safeQuantity < 1
            ? prev.filter((line) => line.key !== key)
            : prev.map((line) => line.key === key ? { ...line, quantity: safeQuantity } : line),
        );
      },
      remove: (key) => {
        setLines((prev) => prev.filter((line) => line.key !== key));
        track("remove_from_cart", { key });
      },
      clear: () => setLines([]),
    };
  }, [lines, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
