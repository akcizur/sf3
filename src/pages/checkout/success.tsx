import { ArrowRight, Check, Package } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { loadOrders } from "./page.tsx";
import { formatDate, formatPrice } from "@/lib/commerce.ts";
import { useSeo } from "@/lib/seo.ts";

export default function CheckoutSuccessPage() {
  const [params] = useSearchParams();
  const id = params.get("order") ?? "";
  const order = loadOrders().find((item) => item.id === id);

  useSeo({ title: "Objednávka potvrzena — Maison Terre", description: "Vaše objednávka byla úspěšně vytvořena.", noindex: true });

  return (
    <div className="mx-auto max-w-2xl py-10">
      <div className="rounded-[32px] bg-card p-7 text-center md:p-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="size-8" /></div>
        <p className="pt-6 text-xs uppercase tracking-[0.25em] text-primary">Děkujeme</p>
        <h1 className="pt-2 text-4xl font-semibold tracking-tight">Objednávka potvrzena</h1>
        <p className="pt-3 text-muted-foreground">Objednávka je uložena v tomto frontendovém demu.</p>
        {order ? (
          <>
            <div className="mt-8 rounded-2xl bg-background p-5 text-left">
              <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Číslo objednávky</span><span className="font-mono text-sm">{order.id}</span></div>
              <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3"><span className="text-sm text-muted-foreground">Celkem</span><span className="font-semibold">{formatPrice(order.total)}</span></div>
            </div>
            <div className="mt-5 rounded-2xl bg-background p-5 text-left">
              <div className="flex items-center gap-3"><Package className="size-5" /><div><p className="text-sm font-medium">Standardní doručení</p><p className="pt-1 text-xs text-muted-foreground">3–7 pracovních dnů · stav dema</p></div></div>
            </div>
          </>
        ) : <p className="pt-8 text-sm text-muted-foreground">Detail objednávky už není v tomto prohlížeči dostupný.</p>}
        <div className="mt-8 grid gap-2 sm:grid-cols-2">
          <Button asChild className="h-11 rounded-full"><Link to="/shop">Pokračovat v nákupu</Link></Button>
          <Button asChild variant="outline" className="h-11 rounded-full"><Link to={"/account/orders/" + encodeURIComponent(id)}>Zobrazit objednávku <ArrowRight className="ml-2 size-4" /></Link></Button>
        </div>
        {order ? <p className="pt-5 text-xs text-muted-foreground">Vytvořeno {formatDate(order.createdAt)}</p> : null}
      </div>
    </div>
  );
}
