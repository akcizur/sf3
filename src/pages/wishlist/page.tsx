import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import ProductCard from "@/components/store/product-card.tsx";
import { useWishlist } from "@/hooks/use-wishlist.ts";
import { useSeo } from "@/lib/seo.ts";

export default function WishlistPage() {
  const { products } = useWishlist();
  useSeo({ title: "Oblíbené — Maison Terre", description: "Vaše uložené produkty Maison Terre." });

  return (
    <div>
      <header className="pt-4"><p className="text-xs uppercase tracking-[0.25em] text-primary">Uložené na později</p><h1 className="pt-2 text-4xl font-semibold tracking-tight md:text-5xl">Oblíbené</h1></header>
      {products.length === 0 ? (
        <div className="mt-10 rounded-[28px] bg-card p-10 text-center">
          <Heart className="mx-auto size-8 text-muted-foreground" /><h2 className="pt-4 text-xl font-semibold">Zatím nic uloženého</h2><p className="mx-auto max-w-md pt-2 text-sm text-muted-foreground">Klikněte na srdce u produktu a najdete ho zde.</p><Button asChild className="mt-6 rounded-full"><Link to="/shop">Prohlédnout produkty</Link></Button>
        </div>
      ) : <div className="grid grid-cols-2 gap-x-4 gap-y-10 pt-10 md:grid-cols-3 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div>}
    </div>
  );
}
