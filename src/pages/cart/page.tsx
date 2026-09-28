import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useCart } from "@/hooks/use-cart.tsx";
import { formatPrice } from "@/lib/catalog.ts";
import QuantitySelector from "@/components/store/quantity-selector.tsx";
import Breadcrumbs from "@/components/store/breadcrumbs.tsx";
import { useSeo } from "@/lib/seo.ts";
import { track } from "@/lib/analytics.ts";
import { useEffect } from "react";

export default function CartPage() {
  const { items, subtotal, setQuantity, remove } = useCart();
  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  useEffect(() => { track("view_cart", { itemCount: items.length }); }, [items.length]);
  useSeo({ title: "Your cart — Maison Terre", description: "Review your Maison Terre cart." });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
      <div className="grid gap-10 pt-10 lg:grid-cols-[1fr_360px]">
        <section>
          <div className="flex items-end justify-between">
            <div><p className="text-xs uppercase tracking-[0.25em] text-primary">Your selection</p><h1 className="pt-2 text-4xl font-semibold tracking-tight">Cart</h1></div>
            <span className="text-sm text-muted-foreground">{items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
          </div>

          {items.length === 0 ? (
            <div className="mt-8 rounded-[28px] bg-card p-10 text-center">
              <ShoppingBag className="mx-auto size-8 text-muted-foreground" />
              <h2 className="pt-4 text-xl font-semibold">Your cart is empty</h2>
              <p className="mx-auto max-w-sm pt-2 text-sm text-muted-foreground">Start with something useful, beautiful and built to last.</p>
              <Button asChild className="mt-6 rounded-full"><Link to="/shop">Browse products</Link></Button>
            </div>
          ) : (
            <div className="mt-8 divide-y rounded-[28px] bg-card">
              {items.map((item) => (
                <article key={item.key} className="flex gap-4 p-4 sm:p-6">
                  <Link to={"/product/" + item.slug} className="shrink-0"><img src={item.product.image} alt={item.product.name} className="size-28 rounded-2xl object-cover sm:size-36" /></Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link to={"/product/" + item.slug} className="text-sm font-medium sm:text-base">{item.product.name}</Link>
                        <p className="pt-1 text-xs text-muted-foreground">{Object.entries(item.options).map(([key, value]) => key + ": " + value).join(" · ")}</p>
                      </div>
                      <span className="text-sm font-medium tabular-nums">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                    <div className="flex items-center justify-between pt-8">
                      <QuantitySelector value={item.quantity} onChange={(q) => setQuantity(item.key, q)} min={0} />
                      <button type="button" onClick={() => remove(item.key)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><Trash2 className="size-4" /> Remove</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {items.length > 0 ? (
          <aside className="h-fit rounded-[28px] bg-card p-6 lg:sticky lg:top-24">
            <h2 className="font-semibold">Order summary</h2>
            <div className="space-y-3 pt-6 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
              <div className="flex justify-between border-t pt-4 text-base font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
            <p className="pt-4 text-xs leading-5 text-muted-foreground">Taxes are included in the displayed price for this frontend demo.</p>
            <Button asChild className="mt-6 h-12 w-full rounded-full"><Link to="/checkout">Checkout <ArrowRight className="ml-2 size-4" /></Link></Button>
            <Link to="/shop" className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground">Continue shopping</Link>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
