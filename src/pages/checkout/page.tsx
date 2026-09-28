import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, LockKeyhole } from "lucide-react";
import { useCart } from "@/hooks/use-cart.tsx";
import { formatPrice } from "@/lib/catalog.ts";
import { Button } from "@/components/ui/button.tsx";
import { useSeo } from "@/lib/seo.ts";
import { track } from "@/lib/analytics.ts";
import { toast } from "sonner";

export type OrderRecord = {
  id: string;
  createdAt: string;
  customer: { email: string; name: string; address: string; city: string; postcode: string };
  items: { slug: string; name: string; quantity: number; price: number; options: Record<string, string> }[];
  subtotal: number;
  shipping: number;
  total: number;
};

const ORDERS_KEY = "maison-terre-demo-orders";

export function loadOrders(): OrderRecord[] {
  try {
    const current = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]");
    return Array.isArray(current) ? current : [];
  } catch { return []; }
}

export function saveOrder(order: OrderRecord) {
  try { localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...loadOrders()])); } catch {}
}

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({ email: "", name: "", address: "", city: "", postcode: "", payment: "card" });
  const shipping = subtotal >= 100 ? 0 : 8;
  const total = subtotal + shipping;

  useSeo({ title: "Checkout — Maison Terre", description: "Secure checkout." });
  const validContact = Boolean(form.email.includes("@") && form.name.trim() && form.address.trim() && form.city.trim() && form.postcode.trim());

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validContact || !items.length) return;
    const orderId = "MT-" + Date.now().toString().slice(-8);
    const order: OrderRecord = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: { email: form.email, name: form.name, address: form.address, city: form.city, postcode: form.postcode },
      items: items.map((item) => ({ slug: item.slug, name: item.product.name, quantity: item.quantity, price: item.product.price, options: item.options })),
      subtotal,
      shipping,
      total,
    };
    saveOrder(order);
    try { localStorage.setItem("maison-terre-demo-customer", JSON.stringify({ name: form.name, email: form.email })); } catch {}
    track("purchase", { orderId, total, itemCount: items.length });
    clear();
    toast.success("Order placed");
    navigate("/checkout/success?order=" + encodeURIComponent(orderId));
  };

  if (!items.length) return <div className="mx-auto max-w-xl py-20 text-center"><Check className="mx-auto size-10" /><h1 className="pt-5 text-3xl font-semibold">Nothing to check out</h1><p className="pt-2 text-muted-foreground">Your cart is currently empty.</p><Button asChild className="mt-6 rounded-full"><Link to="/shop">Back to shop</Link></Button></div>;

  return (
    <div>
      <div className="flex items-center justify-between"><Link to="/cart" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Cart</Link><div className="flex items-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="size-3.5" /> Secure checkout</div></div>
      <div className="grid gap-10 pt-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="space-y-5">
          <header><p className="text-xs uppercase tracking-[0.25em] text-primary">Checkout</p><h1 className="pt-2 text-4xl font-semibold tracking-tight">Complete your order</h1></header>
          <div className="flex gap-2 rounded-2xl bg-card p-1"><button type="button" onClick={() => setStep(1)} className={"flex-1 rounded-xl px-4 py-2 text-sm " + (step === 1 ? "bg-background shadow-sm" : "text-muted-foreground")}>1. Delivery</button><button type="button" onClick={() => validContact && setStep(2)} className={"flex-1 rounded-xl px-4 py-2 text-sm " + (step === 2 ? "bg-background shadow-sm" : "text-muted-foreground")}>2. Payment</button></div>
          {step === 1 ? (
            <section className="rounded-[28px] bg-card p-6">
              <h2 className="text-lg font-semibold">Contact & delivery</h2>
              <div className="grid gap-4 pt-5">{[
                ["email", "Email address", "email"], ["name", "Full name", "text"], ["address", "Address", "text"], ["city", "City", "text"], ["postcode", "Postcode", "text"],
              ].map(([key, label, type]) => <label key={key} className="grid gap-1.5 text-sm"><span>{label}</span><input type={type} value={form[key as keyof typeof form]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="h-12 rounded-2xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-ring/30" required /></label>)}</div>
              <div className="pt-6"><p className="text-sm font-medium">Shipping method</p><div className="mt-3 flex items-center justify-between rounded-2xl border border-foreground bg-background p-4"><span><span className="block text-sm font-medium">Standard delivery</span><span className="block pt-1 text-xs text-muted-foreground">3–7 business days</span></span><span className="text-sm">{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div></div>
              <Button type="button" className="mt-6 h-12 w-full rounded-full" disabled={!validContact} onClick={() => { setStep(2); track("begin_checkout", { total }); }}>Continue to payment</Button>
            </section>
          ) : (
            <section className="rounded-[28px] bg-card p-6"><h2 className="text-lg font-semibold">Payment</h2><p className="pt-2 text-sm text-muted-foreground">Frontend demo only. No real payment is processed.</p><label className="mt-5 flex cursor-pointer items-center justify-between rounded-2xl border border-foreground bg-background p-4"><span><span className="block text-sm font-medium">Card</span><span className="block pt-1 text-xs text-muted-foreground">Visa · Mastercard · Apple Pay</span></span><input type="radio" checked={form.payment === "card"} onChange={() => setForm({ ...form, payment: "card" })} /></label><div className="mt-5 grid grid-cols-2 gap-3"><Button type="button" variant="outline" className="h-12 rounded-full" onClick={() => setStep(1)}>Back</Button><Button type="submit" className="h-12 rounded-full">Place order · {formatPrice(total)}</Button></div></section>
          )}
        </form>
        <aside className="h-fit rounded-[28px] bg-card p-6 lg:sticky lg:top-24"><h2 className="font-semibold">Order summary</h2><div className="space-y-4 pt-5">{items.map((item) => <div key={item.key} className="flex gap-3"><img src={item.product.image} alt="" className="size-14 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm">{item.product.name}</p><p className="pt-1 text-xs text-muted-foreground">Qty {item.quantity}</p></div><span className="text-sm">{formatPrice(item.product.price * item.quantity)}</span></div>)}</div><div className="mt-5 space-y-3 border-t pt-5 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div><div className="flex justify-between border-t pt-4 text-base font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div></div></aside>
      </div>
    </div>
  );
}
