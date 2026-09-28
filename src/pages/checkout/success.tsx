import { Check, Package, ArrowRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { loadOrders } from "./page.tsx";
import { formatPrice } from "@/lib/catalog.ts";
import { useSeo } from "@/lib/seo.ts";

export default function CheckoutSuccessPage() {
  const [params] = useSearchParams();
  const id = params.get("order") ?? "";
  const order = loadOrders().find((item) => item.id === id);

  useSeo({ title: "Order confirmed — Maison Terre", description: "Your Maison Terre order has been confirmed.", noindex: true });

  return (
    <div className="mx-auto max-w-2xl py-10">
      <div className="rounded-[32px] bg-card p-7 text-center md:p-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="size-8" /></div>
        <p className="pt-6 text-xs uppercase tracking-[0.25em] text-primary">Thank you</p>
        <h1 className="pt-2 text-4xl font-semibold tracking-tight">Order confirmed</h1>
        <p className="pt-3 text-muted-foreground">Your order has been recorded in this frontend demo.</p>

        {order ? (
          <>
            <div className="mt-8 rounded-2xl bg-background p-5 text-left">
              <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Order</span><span className="font-mono text-sm">{order.id}</span></div>
              <div className="flex items-center justify-between border-t border-border/70 pt-3 mt-3"><span className="text-sm text-muted-foreground">Total</span><span className="font-semibold">{formatPrice(order.total)}</span></div>
            </div>
            <div className="mt-5 rounded-2xl bg-background p-5 text-left">
              <div className="flex items-center gap-3"><Package className="size-5" /><div><p className="text-sm font-medium">Standard delivery</p><p className="pt-1 text-xs text-muted-foreground">3–7 business days · demo status</p></div></div>
            </div>
          </>
        ) : <p className="pt-8 text-sm text-muted-foreground">The order detail is no longer available in local storage.</p>}

        <div className="mt-8 grid gap-2 sm:grid-cols-2">
          <Button asChild className="h-11 rounded-full"><Link to="/shop">Continue shopping</Link></Button>
          <Button asChild variant="outline" className="h-11 rounded-full"><Link to={"/account/orders/" + encodeURIComponent(id)}>View order <ArrowRight className="ml-2 size-4" /></Link></Button>
        </div>
      </div>
    </div>
  );
}
