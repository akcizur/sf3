import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Leaf, Hand, Package } from "lucide-react";
import { HERO_IMAGE, PRODUCTS } from "@/lib/catalog.ts";
import ProductCard from "@/components/store/product-card.tsx";

const FEATURES = [
  { icon: Leaf, title: "Natural materials", text: "Terracotta, stoneware, seagrass, linen and leather that ages gracefully." },
  { icon: Hand, title: "Made by hand", text: "Every piece comes from small workshops that share our values." },
  { icon: Package, title: "Plastic-free delivery", text: "Carefully packed in recyclable materials, shipped in 3 to 7 days." },
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export default function Index() {
  return (
    <div className="space-y-20">
      <section className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.p {...fade(0)} className="text-xs font-medium tracking-[0.3em] text-primary uppercase">
            New season collection
          </motion.p>
          <motion.h1 {...fade(0.1)} className="pt-6 text-5xl font-semibold tracking-tight text-balance md:text-6xl">
            Considered goods for a quieter home.
          </motion.h1>
          <motion.p {...fade(0.2)} className="max-w-md pt-6 text-lg text-muted-foreground">
            Handmade objects in natural materials, chosen to be used every day and kept for years.
          </motion.p>
          <motion.div {...fade(0.3)} className="pt-8">
            <Link
              to="/shop"
              className="inline-flex cursor-pointer items-center gap-2 rounded-[30px] bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
            >
              Shop the collection <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
        <motion.img
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          src={HERO_IMAGE}
          alt="Terracotta and stoneware on a wooden table"
          className="aspect-square w-full rounded-[24px] object-cover lg:max-h-[560px]"
        />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-[20px] bg-card p-8">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <f.icon className="size-5" />
            </div>
            <h3 className="pt-6 font-medium">{f.title}</h3>
            <p className="pt-2 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="flex items-end justify-between pb-8">
          <h2 className="text-3xl font-semibold tracking-tight">Featured Products</h2>
          <Link to="/shop" className="inline-flex cursor-pointer items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
