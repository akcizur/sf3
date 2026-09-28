import { ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "@/lib/commerce.ts";
import type { Product } from "@/lib/catalog.ts";
import WishlistButton from "./wishlist-button.tsx";
import { useCart } from "@/hooks/use-cart.tsx";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const soldOut = product.stock < 1;

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-card">
        <Link to={"/product/" + product.slug} className="absolute inset-0" aria-label={"Zobrazit " + product.name}>
          <img src={product.image} alt={product.name} loading="lazy" decoding="async" className="size-full object-cover transition duration-700 group-hover:scale-[1.035]" />
        </Link>
        <div className="absolute left-3 top-3 flex gap-2">
          {product.badges.slice(0, 1).map((badge) => <span key={badge} className="rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium backdrop-blur">{badge}</span>)}
        </div>
        <div className="absolute right-3 top-3"><WishlistButton slug={product.slug} compact /></div>
        {!soldOut ? (
          <button
            type="button"
            onClick={() => { add(product.slug, 1, Object.fromEntries(product.options.map((option) => [option.name, option.values[0]]))); toast.success("Produkt byl přidán do košíku"); }}
            className="absolute inset-x-3 bottom-3 hidden items-center justify-between rounded-full bg-background/92 px-4 py-3 text-sm font-medium shadow-lg backdrop-blur transition group-hover:flex"
          >Přidat do košíku <ArrowRight className="size-4" /></button>
        ) : <span className="absolute inset-x-3 bottom-3 rounded-full bg-background/92 px-4 py-3 text-center text-sm font-medium backdrop-blur">Vyprodáno</span>}
        <Link to={"/product/" + product.slug} className="absolute bottom-3 right-3 hidden size-10 items-center justify-center rounded-full border border-border/70 bg-background/92 shadow-lg backdrop-blur group-hover:flex" aria-label={"Detail produktu " + product.name}><Eye className="size-4" /></Link>
      </div>

      <div className="flex items-start justify-between gap-3 px-1 pt-4">
        <Link to={"/product/" + product.slug} className="min-w-0">
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <h3 className="truncate pt-1 text-sm font-medium">{product.name}</h3>
          <div className="flex items-center gap-2 pt-1.5">
            <span className="text-sm tabular-nums">{formatPrice(product.price)}</span>
            {product.compareAtPrice ? <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span> : null}
          </div>
        </Link>
        <span className="pt-1 text-xs text-muted-foreground" aria-label={"Hodnocení " + product.rating.toFixed(1)}>{product.rating.toFixed(1)} ★</span>
      </div>
    </article>
  );
}
