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
const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadCart);
  const [isOpen, setOpen] = useState(false);

  // Sync with browser storage (external system)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const items = lines.flatMap((l) => {
      const product = getProduct(l.slug);
      return product ? [{ ...l, product }] : [];
    });
    return {
      items,
      count: items.reduce((s, i) => s + i.quantity, 0),
      subtotal: items.reduce((s, i) => s + i.quantity * i.product.price, 0),
      isOpen,
      setOpen,
      add: (slug, quantity) => {
        setLines((prev) =>
          prev.some((l) => l.slug === slug)
            ? prev.map((l) => (l.slug === slug ? { ...l, quantity: l.quantity + quantity } : l))
            : [...prev, { slug, quantity }],
        );
        setOpen(true);
      },
      setQuantity: (slug, quantity) =>
        setLines((prev) =>
          quantity < 1
            ? prev.filter((l) => l.slug !== slug)
            : prev.map((l) => (l.slug === slug ? { ...l, quantity } : l)),
        ),
      remove: (slug) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
    };
  }, [lines, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
