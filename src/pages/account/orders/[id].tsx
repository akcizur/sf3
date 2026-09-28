import { ArrowLeft, Check, Package, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { loadOrders } from "@/pages/checkout/page.tsx";
import { formatPrice } from "@/lib/catalog.ts";
import { Button } from "@/components/ui/button.tsx";
import { useSeo } from "@/lib/seo.ts";

export default function OrderPage() {
  const { id = "" } = useParams();
  const order = useMemo(() => loadOrders().find((item) => item.id === id), [id]);
  useSeo({ title: "Order " + id + " — Maison Terre", description: "Order details.", noindex: true });

  if (!order) return (
    <div className="mx-auto max-w-xl py-20 text-center">
      <h1 className="text-3xl font-semibold">Order not found</h1>
      <p className="pt-2 text-muted-foreground">This frontend demo can only show orders stored in this browser.</p>
      <Button asChild className="mt-6 rounded-full"><Link to="/account">Back to account</Link></Button>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/account" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Account</Link>
      <header className="pt-7"><p className="text-xs uppercase tracking-[0.25em] text-primary">Order</p><h1 className="pt-2 font-mono text-3xl font-semibold">{order.id}</h1><p className="pt-2 text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleString("en-US")}</p></header>

      <div className="grid gap-5 pt-8 md:grid-cols-3">
        {[["Order placed", Check, "Confirmed"], ["Preparing", Package, "Demo status"], ["Delivery", Truck, "3–7 business days"]].map(([label, Icon, detail], index) => (
          <div key={label as string} className="rounded-2xl bg-card p-5">
            <div className="flex size-9 items-center justify-center rounded-full bg-secondary"><Icon className="size-4" /></div>
            <p className="pt-4 text-sm font-medium">{label as string}</p>
            <p className="pt-1 text-xs text-muted-foreground">{detail as string}</p>
            {index === 0 ? <span className="mt-3 inline-block text-xs font-medium text-primary">Complete</span> : null}
          </div>
        ))}
      </div>

      <div className="grid gap-5 pt-8 lg:grid-cols-[1fr_320px]">
        <section className="rounded-[26px] bg-card p-6">
          <h2 className="font-semibold">Items</h2>
          <div className="divide-y pt-2">{order.items.map((item) => <div key={item.slug + JSON.stringify(item.options)} className="flex gap-4 py-4"><div className="min-w-0 flex-1"><p className="text-sm font-medium">{item.name}</p><p className="pt-1 text-xs text-muted-foreground">Qty {item.quantity} · {Object.values(item.options).join(" · ")}</p></div><span className="text-sm">{formatPrice(item.price * item.quantity)}</span></div>)}</div>
        </section>
        <aside className="h-fit rounded-[26px] bg-card p-6">
          <h2 className="font-semibold">Summary</h2>
          <div className="space-y-3 pt-5 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span></div>
            <div className="flex justify-between border-t pt-4 text-base font-semibold"><span>Total</span><span>{formatPrice(order.total)}</span></div>
          </div>
          <div className="mt-5 border-t pt-5 text-sm"><p className="font-medium">Delivery to</p><p className="pt-2 text-muted-foreground">{order.customer.name}<br />{order.customer.address}<br />{order.customer.postcode} {order.customer.city}</p></div>
        </aside>
      </div>
    </div>
  );
}
