import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Heart, Minus, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getCategory, getProduct, getRelatedProducts } from "@/lib/catalog.ts";
import { formatPrice } from "@/lib/commerce.ts";
import type { CartOptions } from "@/hooks/use-cart.tsx";
import { useCart } from "@/hooks/use-cart.tsx";
import { useWishlist } from "@/hooks/use-wishlist.ts";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed.ts";
import Breadcrumbs from "@/components/store/breadcrumbs.tsx";
import ProductGallery from "@/components/store/product-gallery.tsx";
import VariantSelector from "@/components/store/variant-selector.tsx";
import ProductCard from "@/components/store/product-card.tsx";
import NotFound from "../NotFound.tsx";
import { useSeo } from "@/lib/seo.ts";
import { track } from "@/lib/analytics.ts";
import { toast } from "sonner";

export default function ProductPage() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const { products: recentlyViewed } = useRecentlyViewed(slug);
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState<CartOptions>(() => product ? Object.fromEntries(product.options.map((option) => [option.name, option.values[0]])) : {});
  const [openPanel, setOpenPanel] = useState<string | null>("description");

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setOptions(Object.fromEntries(product.options.map((option) => [option.name, option.values[0]])));
      track("view_product", { slug: product.slug });
    }
  }, [product]);

  const category = product ? getCategory(product.category) : undefined;
  const missingOption = product?.options.some((option) => !options[option.name]) ?? false;
  const related = product ? getRelatedProducts(product, 4) : [];
  const discount = product?.compareAtPrice ? Math.round((1 - product.price / product.compareAtPrice) * 100) : 0;
  const available = (product?.stock ?? 0) > 0;
  const lowStock = available && (product?.stock ?? 0) <= 5;

  const jsonLd = useMemo(() => product ? ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.gallery,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount },
    offers: {
      "@type": "Offer",
      priceCurrency: "CZK",
      price: product.price,
      availability: available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: window.location.href,
    },
  }) : undefined, [product, available]);

  useSeo({
    title: product ? product.name + " — Maison Terre" : "Produkt — Maison Terre",
    description: product?.shortDescription,
    image: product?.image,
    canonical: window.location.href,
    type: "product",
    jsonLd,
  });

  if (!product) return <NotFound />;

  const addToCart = () => {
    if (!available || missingOption) return;
    add(product.slug, quantity, options);
    setQuantity(1);
    toast.success("Produkt byl přidán do košíku");
  };

  const toggleWishlist = () => {
    toggle(product.slug);
    track(has(product.slug) ? "wishlist_remove" : "wishlist_add", { slug: product.slug });
    toast(has(product.slug) ? "Odebráno z oblíbených" : "Uloženo do oblíbených");
  };

  return (
    <div className="pb-10 lg:pb-0">
      <Breadcrumbs items={[{ label: "Domů", to: "/" }, { label: "Obchod", to: "/shop" }, ...(category ? [{ label: category.name, to: "/shop/" + category.slug }] : []), { label: product.name }]} />

      <div className="grid gap-10 pt-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,.92fr)] lg:gap-14">
        <ProductGallery images={product.gallery} name={product.name} />

        <div className="lg:pt-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">{category?.name}</p>
            {discount > 0 ? <span className="rounded-full bg-warning px-3 py-1 text-xs font-semibold text-warning-foreground">−{discount} %</span> : null}
          </div>

          <h1 className="pt-3 text-4xl font-semibold tracking-tight md:text-5xl">{product.name}</h1>
          <p className="pt-3 text-sm text-muted-foreground">{product.shortDescription}</p>

          <div className="flex flex-wrap items-center gap-3 pt-5">
            <span className="text-2xl font-semibold tabular-nums">{formatPrice(product.price)}</span>
            {product.compareAtPrice ? <span className="text-base text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span> : null}
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <span className="text-warning">★</span> {product.rating.toFixed(1)} · {product.reviewCount} hodnocení
            </span>
          </div>

          <div className="pt-7"><VariantSelector options={product.options} value={options} onChange={setOptions} /></div>

          <div className="flex items-center gap-3 pt-7">
            <div className="inline-flex items-center rounded-full bg-secondary p-1">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity <= 1} className="flex size-10 items-center justify-center rounded-full disabled:opacity-30" aria-label="Snížit množství"><Minus className="size-4" /></button>
              <span className="w-10 text-center text-sm tabular-nums">{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => Math.min(Math.max(product.stock, 1), value + 1))} disabled={!available || quantity >= product.stock} className="flex size-10 items-center justify-center rounded-full disabled:opacity-30" aria-label="Zvýšit množství"><Plus className="size-4" /></button>
            </div>
            <button type="button" disabled={!available || missingOption} onClick={addToCart} className="commerce-cta flex h-12 flex-1 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45">
              {available ? "Přidat do košíku" : "Vyprodáno"}
            </button>
            <button type="button" onClick={toggleWishlist} aria-pressed={has(product.slug)} aria-label={has(product.slug) ? "Odebrat z oblíbených" : "Přidat do oblíbených"} className={"flex size-12 items-center justify-center rounded-full border transition " + (has(product.slug) ? "bg-foreground text-background" : "hover:bg-accent")}>
              <Heart className={"size-5 " + (has(product.slug) ? "fill-current" : "")} />
            </button>
          </div>

          <div className="pt-3" aria-live="polite">
            {!available ? (
              <p className="flex items-center gap-2 text-sm text-muted-foreground"><span className="size-2 rounded-full bg-foreground/30" /> Tento produkt je momentálně vyprodaný.</p>
            ) : lowStock ? (
              <p className="flex items-center gap-2 text-sm font-medium text-warning"><span className="size-2 rounded-full bg-warning" /> Zbývá posledních {product.stock} ks.</p>
            ) : (
              <p className="flex items-center gap-2 text-sm text-success"><span className="size-2 rounded-full bg-success" /> Skladem · odesíláme do 1–2 pracovních dnů.</p>
            )}
          </div>

          <div className="grid gap-3 pt-7 sm:grid-cols-3">
            {[
              [Truck, "Rychlé odeslání", "3–7 pracovních dnů", "text-info"],
              [RotateCcw, "Snadné vrácení", "14 dní", "text-success"],
              [ShieldCheck, "Bezpečný nákup", "Chráněná platba", "text-success"],
            ].map(([Icon, title, text, tone]) => (
              <div key={title as string} className="commerce-card rounded-2xl p-4">
                <Icon className={"size-4 " + tone} />
                <p className="pt-3 text-xs font-medium">{title as string}</p>
                <p className="pt-1 text-xs text-muted-foreground">{text as string}</p>
              </div>
            ))}
          </div>

          <div className="pt-8">
            {[
              ["description", "Popis", <p key="description" className="text-sm leading-7 text-muted-foreground">{product.description}</p>],
              ["features", "Hlavní vlastnosti", <ul key="features" className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">{product.features.map((feature) => <li key={feature} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" />{feature}</li>)}</ul>],
              ["specs", "Specifikace", <dl key="specs" className="grid grid-cols-2 gap-y-3 text-sm">{Object.entries(product.specs).map(([key, value]) => <div key={key}><dt className="text-muted-foreground">{key}</dt><dd className="pt-1">{value}</dd></div>)}</dl>],
              ["reviews", "Hodnocení", <div key="reviews" className="space-y-4">{product.reviews.map((review) => <article key={review.author + review.title} className="commerce-card rounded-2xl p-4"><div className="flex justify-between gap-4"><div className="text-sm font-medium">{review.title}</div><div className="text-sm text-warning" aria-label={review.rating + " z 5 hvězdiček"}>{"★".repeat(review.rating)}</div></div><p className="pt-2 text-sm leading-6 text-muted-foreground">{review.body}</p><p className="pt-3 text-xs text-muted-foreground">{review.author}</p></article>)}</div>,
            ].map(([id, title, content]) => (
              <section key={id as string} className="border-t border-border/70">
                <button type="button" onClick={() => setOpenPanel(openPanel === id ? null : id as string)} className="flex w-full items-center justify-between py-5 text-left text-sm font-medium">{title as string}<ChevronDown className={"size-4 transition " + (openPanel === id ? "rotate-180" : "")} /></button>
                {openPanel === id ? <div className="pb-6">{content}</div> : null}
              </section>
            ))}
          </div>
        </div>
      </div>

      <div className="commerce-card fixed inset-x-3 bottom-[5.75rem] z-30 flex items-center gap-3 rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl lg:hidden">
        <div className="min-w-0 pl-2">
          <p className="truncate text-xs font-medium">{product.name}</p>
          <p className="pt-0.5 text-sm font-semibold tabular-nums">{formatPrice(product.price)}</p>
        </div>
        <button type="button" disabled={!available || missingOption} onClick={addToCart} className="commerce-cta ml-auto h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground disabled:opacity-45">
          {available ? "Přidat do košíku" : "Vyprodáno"}
        </button>
      </div>

      {(related.length > 0 || recentlyViewed.length > 0) ? (
        <div className="space-y-16 pt-20">
          {related.length > 0 ? <section><div className="flex items-end justify-between gap-4 pb-7"><div><p className="text-xs uppercase tracking-[0.25em] text-primary">Mohlo by se hodit</p><h2 className="pt-2 text-3xl font-semibold tracking-tight">Související produkty</h2></div><Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground">Zobrazit vše</Link></div><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((item) => <ProductCard key={item.slug} product={item} />)}</div></section> : null}
          {recentlyViewed.length > 0 ? <section><h2 className="pb-7 text-2xl font-semibold tracking-tight">Nedávno zobrazené</h2><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{recentlyViewed.slice(0, 4).map((item) => <ProductCard key={item.slug} product={item} />)}</div></section> : null}
        </div>
      ) : null}
    </div>
  );
}
