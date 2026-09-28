import { ArrowRight, Leaf, Package, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { CATEGORIES, HERO_IMAGE, PRODUCTS } from "@/lib/catalog.ts";
import ProductCard from "@/components/store/product-card.tsx";
import { useSeo } from "@/lib/seo.ts";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/commerce.ts";
import { formatPrice } from "@/lib/commerce.ts";

const BENEFITS = [
  { icon: Leaf, title: "Přírodní materiály", text: "Dřevo, kamenina, plátno a kůže vybrané pro každodenní používání." },
  { icon: Package, title: "Promyšlené balení", text: "Každou objednávku balíme šetrně a s minimem zbytečného odpadu." },
  { icon: Truck, title: "Jednoduché doručení", text: "Přehledné možnosti dopravy a jasná očekávání." },
  { icon: ShieldCheck, title: "Snadné vrácení", text: "14denní lhůta pro vrácení s jednoduchou podporou." },
];

export default function Index() {
  useSeo({
    title: "Maison Terre — Promyšlené věci pro klidnější domov",
    description: "Ručně vyráběné věci z přírodních materiálů pro každodenní používání.",
    image: HERO_IMAGE,
  });

  return (
    <div className="space-y-20 md:space-y-28">
      <section className="grid items-center gap-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-14">
        <div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-medium uppercase tracking-[0.32em] text-primary">Nová kolekce</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="pt-5 text-5xl font-semibold tracking-tight text-balance md:text-6xl lg:text-7xl">Promyšlené věci pro klidnější domov.</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }} className="max-w-xl pt-6 text-lg leading-8 text-muted-foreground">Ruční výroba, přírodní materiály a předměty, které chcete používat každý den a nechat si je roky.</motion.p>
          <div className="flex flex-wrap gap-3 pt-8">
            <Link to="/shop" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground">Prohlédnout kolekci <ArrowRight className="size-4" /></Link>
            <Link to="/our-story" className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-7 text-sm font-medium">Náš příběh</Link>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-8 text-xs text-muted-foreground"><span>Doprava zdarma od {formatPrice(FREE_SHIPPING_THRESHOLD)}</span><span>Vrácení do 14 dnů</span><span>Bezpečný nákup</span></div>
        </div>
        <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }} className="relative overflow-hidden rounded-[30px] bg-card">
          <img src={HERO_IMAGE} alt="Terakota a kamenina na dřevěném stole" className="aspect-[1.08/1] w-full object-cover" fetchPriority="high" decoding="async" />
          <div className="absolute bottom-4 left-4 rounded-full bg-background/88 px-4 py-2 text-xs backdrop-blur">Vyrobeno pomalu · navrženo na dlouho</div>
        </motion.div>
      </section>

      <section>
        <div className="flex items-end justify-between pb-7">
          <div><p className="text-xs uppercase tracking-[0.25em] text-primary">Nakupovat podle kategorie</p><h2 className="pt-2 text-3xl font-semibold tracking-tight">Vyberte si svůj každodenní kousek</h2></div>
          <Link to="/shop" className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:flex">Všechny produkty <ArrowRight className="size-4" /></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {CATEGORIES.map((category, index) => (
            <Link key={category.slug} to={"/shop/" + category.slug} className="group rounded-[26px] bg-card p-6 transition hover:-translate-y-0.5 hover:bg-accent">
              <div className="flex items-center justify-between"><span className="text-sm font-medium">{category.name}</span><span className="text-xs text-muted-foreground">0{index + 1}</span></div>
              <p className="max-w-xs pt-12 text-sm leading-6 text-muted-foreground">{category.description}</p>
              <div className="flex items-center gap-2 pt-8 text-sm font-medium">Prohlédnout <ArrowRight className="size-4 transition group-hover:translate-x-1" /></div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between pb-7">
          <div><p className="text-xs uppercase tracking-[0.25em] text-primary">Výběr z kolekce</p><h2 className="pt-2 text-3xl font-semibold tracking-tight">Doporučené produkty</h2></div>
          <Link to="/shop" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">Zobrazit vše <ArrowRight className="size-4" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">{PRODUCTS.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} />)}</div>
      </section>

      <section className="grid gap-8 overflow-hidden rounded-[32px] bg-card p-6 md:grid-cols-2 md:p-10 lg:p-12">
        <div className="flex flex-col justify-center">
          <Sparkles className="size-5 text-primary" />
          <p className="pt-8 text-xs uppercase tracking-[0.25em] text-primary">Náš přístup</p>
          <h2 className="max-w-xl pt-3 text-4xl font-semibold tracking-tight">Kupovat méně. Používat déle. Mít věci rádi.</h2>
          <p className="max-w-xl pt-5 leading-7 text-muted-foreground">Soustředíme se na přírodní materiály, klidné tvary a praktické věci, které se stanou součástí každodenního života místo jednorázové dekorace.</p>
          <Link to="/sustainability" className="pt-7 text-sm font-medium">Jak přemýšlíme o udržitelnosti <ArrowRight className="ml-1 inline size-4" /></Link>
        </div>
        <img src={PRODUCTS[4].gallery[0]} alt="Přírodní úložný koš z mořské trávy" className="aspect-square w-full rounded-[24px] object-cover" loading="lazy" decoding="async" />
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-[24px] bg-card p-6"><div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon className="size-5" /></div><h3 className="pt-5 text-sm font-semibold">{title}</h3><p className="pt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>
        ))}
      </section>

      <section className="rounded-[30px] bg-foreground px-6 py-12 text-background md:px-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] opacity-60">Novinky do e-mailu</p>
          <h2 className="pt-3 text-3xl font-semibold">Jednou za měsíc. Žádný spam.</h2>
          <p className="pt-3 text-sm leading-6 opacity-70">Nové kolekce, zákulisí a užitečné věci pro domov.</p>
          <form onSubmit={(event) => { event.preventDefault(); (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value = ""; }} className="flex flex-col gap-2 pt-6 sm:flex-row">
            <input required type="email" name="email" placeholder="E-mailová adresa" className="h-12 flex-1 rounded-full bg-background px-5 text-sm text-foreground outline-none" />
            <button className="h-12 rounded-full bg-background px-6 text-sm font-medium text-foreground">Přihlásit se</button>
          </form>
          <p className="pt-3 text-[11px] opacity-50">Demo bez backendu — e-mail se nikam neodesílá.</p>
        </div>
      </section>
    </div>
  );
}
