import { ArrowRight, Leaf, Package, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { CATEGORIES, HERO_IMAGE, PRODUCTS } from "@/lib/catalog.ts";
import ProductCard from "@/components/store/product-card.tsx";
import { useSeo } from "@/lib/seo.ts";

const BENEFITS = [
  { icon: Leaf, title: "Natural materials", text: "Wood, stoneware, canvas and leather chosen for everyday use." },
  { icon: Package, title: "Thoughtful packaging", text: "Carefully packed with recyclable materials and minimal waste." },
  { icon: Truck, title: "Simple delivery", text: "Reliable dispatch with clear delivery expectations." },
  { icon: ShieldCheck, title: "Easy returns", text: "14-day returns with straightforward support." },
];

export default function Index() {
  useSeo({
    title: "Maison Terre — Considered goods for a quieter home",
    description: "Handmade objects in natural materials, chosen for everyday use and made to last.",
    image: HERO_IMAGE,
  });

  return (
    <div className="space-y-20 md:space-y-28">
      <section className="grid items-center gap-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-14">
        <div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-medium uppercase tracking-[0.32em] text-primary">New season collection</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="pt-5 text-5xl font-semibold tracking-tight text-balance md:text-6xl lg:text-7xl">Considered goods for a quieter home.</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }} className="max-w-xl pt-6 text-lg leading-8 text-muted-foreground">Handmade objects in natural materials, chosen to be used every day and kept for years.</motion.p>
          <div className="flex flex-wrap gap-3 pt-8">
            <Link to="/shop" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground">Shop the collection <ArrowRight className="size-4" /></Link>
            <Link to="/our-story" className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-7 text-sm font-medium">Our story</Link>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-8 text-xs text-muted-foreground"><span>Free shipping over $100</span><span>14-day returns</span><span>Secure checkout</span></div>
        </div>
        <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }} className="relative overflow-hidden rounded-[30px] bg-card">
          <img src={HERO_IMAGE} alt="Terracotta and stoneware on a wooden table" className="aspect-[1.08/1] w-full object-cover" fetchPriority="high" />
          <div className="absolute bottom-4 left-4 rounded-full bg-background/88 px-4 py-2 text-xs backdrop-blur">Made slowly · designed to last</div>
        </motion.div>
      </section>

      <section>
        <div className="flex items-end justify-between pb-7">
          <div><p className="text-xs uppercase tracking-[0.25em] text-primary">Shop by category</p><h2 className="pt-2 text-3xl font-semibold tracking-tight">Find your next everyday piece</h2></div>
          <Link to="/shop" className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:flex">All products <ArrowRight className="size-4" /></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {CATEGORIES.map((category, index) => (
            <Link key={category.slug} to={"/shop/" + category.slug} className="group rounded-[26px] bg-card p-6 transition hover:-translate-y-0.5 hover:bg-accent">
              <div className="flex items-center justify-between"><span className="text-sm font-medium">{category.name}</span><span className="text-xs text-muted-foreground">0{index + 1}</span></div>
              <p className="max-w-xs pt-12 text-sm leading-6 text-muted-foreground">{category.description}</p>
              <div className="flex items-center gap-2 pt-8 text-sm font-medium">Explore <ArrowRight className="size-4 transition group-hover:translate-x-1" /></div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between pb-7">
          <div><p className="text-xs uppercase tracking-[0.25em] text-primary">Curated selection</p><h2 className="pt-2 text-3xl font-semibold tracking-tight">Featured products</h2></div>
          <Link to="/shop" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">View all <ArrowRight className="size-4" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">{PRODUCTS.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} />)}</div>
      </section>

      <section className="grid gap-8 overflow-hidden rounded-[32px] bg-card p-6 md:grid-cols-2 md:p-10 lg:p-12">
        <div className="flex flex-col justify-center">
          <Sparkles className="size-5 text-primary" />
          <p className="pt-8 text-xs uppercase tracking-[0.25em] text-primary">The Maison Terre standard</p>
          <h2 className="max-w-xl pt-3 text-4xl font-semibold tracking-tight">Buy less. Use longer. Keep things beautiful.</h2>
          <p className="max-w-xl pt-5 leading-7 text-muted-foreground">We focus on natural materials, quiet forms and practical objects that become part of daily life instead of disposable decoration.</p>
          <Link to="/sustainability" className="pt-7 text-sm font-medium">Read our approach <ArrowRight className="ml-1 inline size-4" /></Link>
        </div>
        <img src={PRODUCTS[4].gallery[0]} alt="Natural woven storage basket" className="aspect-square w-full rounded-[24px] object-cover" loading="lazy" />
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-[24px] bg-card p-6">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon className="size-5" /></div>
            <h3 className="pt-5 text-sm font-semibold">{title}</h3>
            <p className="pt-2 text-sm leading-6 text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[30px] bg-foreground px-6 py-12 text-background md:px-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] opacity-60">Stay in the loop</p>
          <h2 className="pt-3 text-3xl font-semibold">A quiet monthly note, not a noisy inbox.</h2>
          <p className="pt-3 text-sm leading-6 opacity-70">New collections, studio notes and useful objects. No spam.</p>
          <form onSubmit={(event) => { event.preventDefault(); (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value = ""; }} className="flex flex-col gap-2 pt-6 sm:flex-row">
            <input required type="email" name="email" placeholder="Email address" className="h-12 flex-1 rounded-full bg-background px-5 text-sm text-foreground outline-none" />
            <button className="h-12 rounded-full bg-background px-6 text-sm font-medium text-foreground">Subscribe</button>
          </form>
          <p className="pt-3 text-[11px] opacity-50">Frontend demo: subscription is not sent to a backend.</p>
        </div>
      </section>
    </div>
  );
}
