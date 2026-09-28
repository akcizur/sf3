import { Link } from "react-router-dom";
import { CheckCircle2, ShieldCheck, ShoppingBag, Trash2, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useCart } from "@/hooks/use-cart.tsx";
import { formatPrice, getShippingCost } from "@/lib/commerce.ts";
import QuantitySelector from "@/components/store/quantity-selector.tsx";
import Breadcrumbs from "@/components/store/breadcrumbs.tsx";
import FreeShippingProgress from "@/components/store/free-shipping-progress.tsx";
import { useSeo } from "@/lib/seo.ts";
import { track } from "@/lib/analytics.ts";
import { useEffect } from "react";

export default function CartPage() {
  const { items, subtotal, setQuantity, remove } = useCart();
  const shipping = getShippingCost(subtotal);
  const total = subtotal + shipping;

  useEffect(() => { track("view_cart", { itemCount: items.length }); }, [items.length]);
  useSeo({ title: "Košík — Maison Terre", description: "Zkontrolujte obsah svého nákupního košíku." });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Domů", to: "/" }, { label: "Košík" }]} />

      <div className="grid gap-10 pt-10 lg:grid-cols-[1fr_360px]">
        <section>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Váš výběr</p>
              <h1 className="pt-2 text-4xl font-semibold tracking-tight">Košík</h1>
            </div>
            <span className="text-sm text-muted-foreground">{items.reduce((sum, item) => sum + item.quantity, 0)} položek</span>
          </div>

          {items.length === 0 ? (
            <div className="commerce-card commerce-top-edge mt-8 rounded-[28px] p-10 text-center">
              <ShoppingBag className="mx-auto size-8 text-muted-foreground" />
              <h2 className="pt-4 text-xl font-semibold">Košík je prázdný</h2>
              <p className="mx-auto max-w-sm pt-2 text-sm text-muted-foreground">Začněte něčím užitečným, krásným a vyrobeným na dlouho.</p>
              <Button asChild className="mt-6 rounded-full"><Link to="/shop">Prohlédnout produkty</Link></Button>
            </div>
          ) : (
            <>
              <div className="mt-8"><FreeShippingProgress subtotal={subtotal} /></div>

              <div className="mt-4 divide-y overflow-hidden rounded-[28px] bg-card">
                {items.map((item) => (
                  <article key={item.key} className="flex gap-4 p-4 sm:p-6">
                    <Link to={"/product/" + item.slug} className="shrink-0">
                      <img src={item.product.image} alt={item.product.name} loading="lazy" decoding="async" className="size-28 rounded-2xl object-cover sm:size-36" />
                    </Link>
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
                        <button type="button" onClick={() => remove(item.key)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground" aria-label={"Odebrat " + item.product.name}>
                          <Trash2 className="size-4" /> Odebrat
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="grid gap-3 pt-5 sm:grid-cols-3">
                {[
                  [ShieldCheck, "Bezpečná platba", "Demo checkout připravený na backend"],
                  [RotateCcw, "14 dní na vrácení", "Jednoduché podmínky"],
                  [CheckCircle2, "Jasná cena", "Žádné skryté poplatky"],
                ].map(([Icon, title, text]) => (
                  <div key={title as string} className="rounded-2xl bg-secondary/65 p-4">
                    <Icon className="size-4 text-success" />
                    <p className="pt-2 text-xs font-semibold">{title as string}</p>
                    <p className="pt-1 text-[11px] leading-4 text-muted-foreground">{text as string}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {items.length > 0 ? (
          <aside className="commerce-card commerce-top-edge h-fit rounded-[28px] p-6 lg:sticky lg:top-24">
            <h2 className="font-semibold">Shrnutí objednávky</h2>
            <div className="space-y-3 pt-6 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Mezisoučet</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Doprava</span>
                <span className={shipping === 0 ? "font-medium text-success" : ""}>{shipping === 0 ? "Zdarma" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t pt-4 text-base font-semibold"><span>Celkem</span><span>{formatPrice(total)}</span></div>
            </div>
            <Button asChild className="commerce-cta mt-6 h-12 w-full rounded-full">
              <Link to="/checkout">Pokračovat k pokladně <ArrowRight className="ml-2 size-4" /></Link>
            </Button>
            <Link to="/shop" className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground">Pokračovat v nákupu</Link>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
