import { useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { formatPrice, getCategory, getProduct } from "@/lib/catalog.ts";
import { useCart } from "@/hooks/use-cart.tsx";
import Breadcrumbs from "@/components/store/breadcrumbs.tsx";
import QuantitySelector from "@/components/store/quantity-selector.tsx";
import NotFound from "../NotFound.tsx";

export default function ProductPage() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const [quantity, setQuantity] = useState(1);
  const { add } = useCart();
  if (!product) return <NotFound />;
  const category = getCategory(product.category);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          ...(category ? [{ label: category.name, to: `/shop/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />
      <div className="grid gap-12 pt-8 lg:grid-cols-[600px_1fr]">
        <img src={product.image} alt={product.name} className="aspect-[600/560] w-full rounded-[24px] object-cover" />
        <div className="lg:pt-6">
          <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">{category?.name}</p>
          <h1 className="pt-3 text-4xl font-semibold tracking-tight md:text-5xl">{product.name}</h1>
          <p className="pt-6 text-2xl tabular-nums">{formatPrice(product.price)}</p>
          <p className="max-w-lg pt-6 text-muted-foreground">{product.description}</p>
          <div className="flex flex-wrap items-center gap-4 pt-8">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <button
              type="button"
              onClick={() => {
                add(product.slug, quantity);
                setQuantity(1);
              }}
              className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-[30px] bg-primary px-8 text-sm font-medium text-primary-foreground transition hover:brightness-110"
            >
              <ShoppingBag className="size-4" /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
