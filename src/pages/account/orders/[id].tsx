import { ArrowLeft, Check, Package, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { loadOrders } from "@/pages/checkout/page.tsx";
import { formatDate, formatPrice } from "@/lib/commerce.ts";
import { Button } from "@/components/ui/button.tsx";
import { useSeo } from "@/lib/seo.ts";

export default function OrderPage() {
  const { id = "" } = useParams();
  const order = useMemo(() => loadOrders().find((item) => item.id === id), [id]);
  useSeo({ title: "Objednávka " + id + " — Maison Terre", description: "Detail objednávky.", noindex: true });

  if (!order) return <div className="mx-auto max-w-xl py-20 text-center"><h1 className="text-3xl font-semibold">Objednávka nebyla nalezena</h1><p className="pt-2 text-muted-foreground">Toto demo zobrazuje pouze objednávky uložené v tomto prohlížeči.</p><Button asChild className="mt-6 rounded-full"><Link to="/account">Zpět k účtu</Link></Button></div>;

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/account" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Účet</Link>
      <header className="pt-7"><p className="text-xs uppercase tracking-[0.25em] text-primary">Objednávka</p><h1 className="pt-2 font-mono text-3xl font-semibold">{order.id}</h1><p className="pt-2 text-sm text-muted-foreground">{formatDate(order.createdAt)}</p></header>
      <div className="grid gap-5 pt-8 md:grid-cols-3">
        {[
          ["Objednávka přijata", Check, "Potvrzeno"],
          ["Příprava", Package, "Demo stav"],
          ["Doručení", Truck, "3–7 pracovních dnů"],
        ].map(([label, Icon, detail], index) => (
          <div key={label as string} className="rounded-2xl bg-card p-5"><div className="flex size-9 items-center justify-center rounded-full bg-secondary"><Icon className="size-4" /></div><p className="pt-4 text-sm font-medium">{label as string}</p><p className="pt-1 text-xs text-muted-foreground">{detail as string}</p>{index === 0 ? <span className="mt-3 inline-block text-xs font-medium text-primary">Dokončeno</span> : null}</div>
        ))}
      </div>
      <div className="grid gap-5 pt-8 lg:grid-cols-[1fr_320px]">
        <section className="rounded-[26px] bg-card p-6"><h2 className="font-semibold">Položky</h2><div className="divide-y pt-2">{order.items.map((item) => <div key={item.slug + JSON.stringify(item.options)} className="flex gap-4 py-4"><div className="min-w-0 flex-1"><p className="text-sm font-medium">{item.name}</p><p className="pt-1 text-xs text-muted-foreground">Množství {item.quantity} · {Object.values(item.options).join(" · ")}</p></div><span className="text-sm">{formatPrice(item.price * item.quantity)}</span></div>)}</div></section>
        <aside className="h-fit rounded-[26px] bg-card p-6"><h2 className="font-semibold">Shrnutí</h2><div className="space-y-3 pt-5 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Mezisoučet</span><span>{formatPrice(order.subtotal)}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Doprava</span><span>{order.shipping === 0 ? "Zdarma" : formatPrice(order.shipping)}</span></div><div className="flex justify-between border-t pt-4 text-base font-semibold"><span>Celkem</span><span>{formatPrice(order.total)}</span></div></div><div className="mt-5 border-t pt-5 text-sm"><p className="font-medium">Doručení na adresu</p><p className="pt-2 text-muted-foreground">{order.customer.name}<br />{order.customer.address}<br />{order.customer.postcode} {order.customer.city}</p></div></aside>
      </div>
    </div>
  );
}
