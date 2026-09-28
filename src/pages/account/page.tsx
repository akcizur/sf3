import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, LogOut, MapPin, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { useSeo } from "@/lib/seo.ts";
import { loadOrders } from "@/pages/checkout/page.tsx";
import { formatDate, formatPrice } from "@/lib/commerce.ts";

type Customer = { name: string; email: string };

export default function AccountPage() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    try {
      const value = localStorage.getItem("maison-terre-demo-customer");
      if (value) {
        const parsed = JSON.parse(value);
        if (parsed?.name && parsed?.email) { setCustomer(parsed); setForm(parsed); }
      }
    } catch {}
  }, []);

  useSeo({ title: "Účet — Maison Terre", description: "Správa účtu a objednávek Maison Terre." });

  const signIn = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.includes("@")) return;
    const next = { name: form.name.trim(), email: form.email.trim() };
    try { localStorage.setItem("maison-terre-demo-customer", JSON.stringify(next)); } catch {}
    setCustomer(next);
  };

  if (!customer) {
    return (
      <div className="mx-auto max-w-xl py-10"><div className="rounded-[32px] bg-card p-7 md:p-10">
        <div className="flex size-12 items-center justify-center rounded-full bg-secondary"><UserRound className="size-5" /></div>
        <p className="pt-6 text-xs uppercase tracking-[0.25em] text-primary">Zákaznická zóna</p>
        <h1 className="pt-2 text-4xl font-semibold tracking-tight">Váš účet</h1>
        <p className="pt-3 text-sm text-muted-foreground">V tomto frontendovém demu se účet ukládá pouze do tohoto prohlížeče. Přihlášení napojíme později.</p>
        <form onSubmit={signIn} className="space-y-4 pt-7">
          <label className="grid gap-1.5 text-sm"><span>Jméno</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="h-12 rounded-2xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-ring/30" /></label>
          <label className="grid gap-1.5 text-sm"><span>E-mail</span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="h-12 rounded-2xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-ring/30" /></label>
          <Button className="h-12 w-full rounded-full">Pokračovat</Button>
        </form>
      </div></div>
    );
  }

  const orders = loadOrders();
  const signOut = () => { try { localStorage.removeItem("maison-terre-demo-customer"); } catch {} setCustomer(null); navigate("/account"); };

  return (
    <div>
      <header className="pt-4"><p className="text-xs uppercase tracking-[0.25em] text-primary">Zákaznická zóna</p><h1 className="pt-2 text-4xl font-semibold tracking-tight">Dobrý den, {customer.name.split(" ")[0]}</h1><p className="pt-2 text-muted-foreground">{customer.email}</p></header>
      <div className="grid gap-5 pt-10 md:grid-cols-3">
        <div className="rounded-[26px] bg-card p-6"><p className="text-sm text-muted-foreground">Objednávky</p><p className="pt-2 text-3xl font-semibold">{orders.length}</p><span className="pt-5 inline-flex text-sm text-muted-foreground">Uložené v tomto prohlížeči</span></div>
        <div className="rounded-[26px] bg-card p-6"><p className="text-sm text-muted-foreground">Poslední doručení</p><p className="pt-2 font-medium">{orders[0]?.customer.city ?? "Nenastaveno"}</p><p className="pt-1 text-sm text-muted-foreground">{orders[0]?.customer.postcode ?? "Doplní se při objednávce"}</p></div>
        <Link to="/wishlist" className="rounded-[26px] bg-card p-6 transition hover:bg-accent"><p className="text-sm text-muted-foreground">Uložené produkty</p><p className="pt-2 text-xl font-semibold">Oblíbené</p><ArrowRight className="mt-5 size-4" /></Link>
      </div>
      <section className="pt-12">
        <div className="flex items-center justify-between"><h2 className="text-2xl font-semibold">Poslední objednávky</h2><button type="button" onClick={signOut} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><LogOut className="size-4" /> Odhlásit</button></div>
        {orders.length === 0 ? (
          <div className="mt-5 rounded-[26px] bg-card p-8 text-center"><MapPin className="mx-auto size-6 text-muted-foreground" /><p className="pt-3 text-sm text-muted-foreground">Zatím zde nejsou žádné objednávky.</p><Button asChild className="mt-5 rounded-full"><Link to="/shop">Začít nakupovat</Link></Button></div>
        ) : (
          <div className="mt-5 divide-y rounded-[26px] bg-card">{orders.slice(0, 6).map((order) => <Link key={order.id} to={"/account/orders/" + order.id} className="flex items-center justify-between gap-4 p-5 hover:bg-accent"><div><p className="font-mono text-sm">{order.id}</p><p className="pt-1 text-xs text-muted-foreground">{formatDate(order.createdAt)} · {order.items.length} položek</p></div><div className="flex items-center gap-3"><span className="text-sm font-semibold">{formatPrice(order.total)}</span><ArrowRight className="size-4" /></div></Link>)}</div>
        )}
      </section>
    </div>
  );
}
