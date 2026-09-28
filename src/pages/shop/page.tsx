import { useState } from "react";
import { Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet.tsx";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty.tsx";
import { cn } from "@/lib/utils.ts";
import { CATEGORIES, getCategory, PRODUCTS, type Product } from "@/lib/catalog.ts";
import ProductCard from "@/components/store/product-card.tsx";
import Breadcrumbs from "@/components/store/breadcrumbs.tsx";
import { useSeo } from "@/lib/seo.ts";

const SORTS = {
  featured: { label: "Doporučené", fn: (_a: Product, _b: Product) => 0 },
  "price-low": { label: "Cena: od nejnižší", fn: (a: Product, b: Product) => a.price - b.price },
  "price-high": { label: "Cena: od nejvyšší", fn: (a: Product, b: Product) => b.price - a.price },
  rating: { label: "Nejlépe hodnocené", fn: (a: Product, b: Product) => b.rating - a.rating },
  name: { label: "Název: A–Z", fn: (a: Product, b: Product) => a.name.localeCompare(b.name, "cs") },
} as const;

type SortKey = keyof typeof SORTS;

function FilterContent({ params, setParams }: { params: URLSearchParams; setParams: (next: URLSearchParams) => void }) {
  const availability = params.get("availability") ?? "all";
  const rating = params.get("rating") ?? "0";
  const max = params.get("max") ?? "";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value && value !== "all" && value !== "0") next.set(key, value); else next.delete(key);
    setParams(next);
  };

  return (
    <div className="space-y-7">
      <section>
        <p className="text-sm font-medium">Dostupnost</p>
        <div className="space-y-2 pt-3">
          {[["all", "Všechny produkty"], ["in-stock", "Skladem"]].map(([value, label]) => (
            <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground"><input type="radio" name="availability" checked={availability === value} onChange={() => update("availability", value)} />{label}</label>
          ))}
        </div>
      </section>
      <section>
        <p className="text-sm font-medium">Cena</p>
        <div className="grid grid-cols-2 gap-2 pt-3">
          <label className="rounded-xl bg-secondary px-3 py-2"><span className="block text-[10px] uppercase tracking-wider text-muted-foreground">Maximum</span><input inputMode="numeric" value={max} onChange={(e) => update("max", e.target.value.replace(/[^0-9]/g, ""))} placeholder="Libovolná" className="w-full bg-transparent text-sm outline-none" /></label>
          <button type="button" onClick={() => update("max", "1500")} className={cn("rounded-xl bg-secondary px-3 py-2 text-sm", max === "1500" && "bg-foreground text-background")}>Do 1 500 Kč</button>
        </div>
      </section>
      <section>
        <p className="text-sm font-medium">Hodnocení</p>
        <div className="space-y-2 pt-3">
          {[["0", "Jakékoli hodnocení"], ["4.5", "4,5+ hvězdiček"], ["4", "4+ hvězdičky"]].map(([value, label]) => (
            <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground"><input type="radio" name="rating" checked={rating === value} onChange={() => update("rating", value)} />{label}</label>
          ))}
        </div>
      </section>
      <button type="button" onClick={() => setParams(new URLSearchParams())} className="text-sm font-medium underline underline-offset-4">Zrušit filtry</button>
    </div>
  );
}

export default function ShopPage() {
  const { category } = useParams();
  const [params, setParamsState] = useSearchParams();
  const [mobileFilters, setMobileFilters] = useState(false);
  const current = category ? getCategory(category) : undefined;
  const q = params.get("q") ?? "";
  const sortParam = params.get("sort") ?? "featured";
  const sort: SortKey = sortParam in SORTS ? sortParam as SortKey : "featured";
  const availability = params.get("availability") ?? "all";
  const max = Number(params.get("max") ?? "") || Infinity;
  const minRating = Number(params.get("rating") ?? "0") || 0;

  const products = PRODUCTS.filter((p) => !current || p.category === current.slug)
    .filter((p) => !q.trim() || [p.name, p.shortDescription, p.description, ...p.tags].join(" ").toLocaleLowerCase("cs").includes(q.trim().toLocaleLowerCase("cs")))
    .filter((p) => availability === "all" || p.stock > 0)
    .filter((p) => p.price <= max)
    .filter((p) => p.rating >= minRating)
    .sort(SORTS[sort].fn);

  const updateParams = (next: URLSearchParams) => setParamsState(next, { replace: true });
  const setSearch = (value: string) => { const next = new URLSearchParams(params); if (value) next.set("q", value); else next.delete("q"); updateParams(next); };

  useSeo({ title: current ? current.name + " — Maison Terre" : "Obchod — Maison Terre", description: current?.description ?? "Prohlédněte si kolekci Maison Terre.", canonical: window.location.origin + window.location.pathname });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Domů", to: "/" }, current ? { label: "Obchod", to: "/shop" } : { label: "Obchod" }, ...(current ? [{ label: current.name }] : [])]} />
      <header className="pt-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">Kolekce</p><h1 className="pt-2 text-4xl font-semibold tracking-tight md:text-5xl">{current?.name ?? "Všechny produkty"}</h1><p className="max-w-2xl pt-3 text-muted-foreground">{current?.description ?? "Předměty vybrané podle materiálu, funkce a dlouhé životnosti."}</p></div>
          <div className="text-sm text-muted-foreground">{products.length} {products.length === 1 ? "produkt" : products.length < 5 ? "produkty" : "produktů"}</div>
        </div>
      </header>

      <div className="flex flex-col gap-6 pt-8 lg:flex-row">
        <aside className="hidden w-56 shrink-0 lg:block"><div className="sticky top-24"><p className="pb-5 text-sm font-semibold">Filtry</p><FilterContent params={params} setParams={updateParams} /></div></aside>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 border-b border-border/70 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
              <NavLink end to="/shop" className={({ isActive }) => cn("whitespace-nowrap rounded-full px-3.5 py-2 text-sm", isActive && !category ? "bg-foreground text-background" : "bg-card text-muted-foreground hover:text-foreground")}>Vše</NavLink>
              {CATEGORIES.map((item) => <NavLink key={item.slug} to={"/shop/" + item.slug} className={({ isActive }) => cn("whitespace-nowrap rounded-full px-3.5 py-2 text-sm", isActive ? "bg-foreground text-background" : "bg-card text-muted-foreground hover:text-foreground")}>{item.name}</NavLink>)}
            </div>
            <div className="flex gap-2">
              <div className="relative min-w-0 flex-1 sm:w-64 sm:flex-none"><Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={q} onChange={(e) => setSearch(e.target.value)} placeholder="Hledat produkty" className="h-10 w-full rounded-full bg-card pl-10 pr-9 text-sm outline-none focus:ring-2 focus:ring-ring/30" aria-label="Hledat produkty" />{q ? <button type="button" onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Vymazat hledání"><X className="size-4" /></button> : null}</div>
              <button type="button" onClick={() => setMobileFilters(true)} className="flex h-10 items-center gap-2 rounded-full bg-card px-4 text-sm lg:hidden"><SlidersHorizontal className="size-4" /> Filtry</button>
              <Select value={sort} onValueChange={(value) => { const next = new URLSearchParams(params); next.set("sort", value); updateParams(next); }}><SelectTrigger className="h-10 w-48 rounded-full border-0 bg-card px-4"><SelectValue /></SelectTrigger><SelectContent>{Object.entries(SORTS).map(([value, item]) => <SelectItem key={value} value={value}>{item.label}</SelectItem>)}</SelectContent></Select>
            </div>
          </div>

          {q || params.get("availability") || params.get("max") || params.get("rating") ? (
            <div className="flex flex-wrap gap-2 pt-4">
              {q ? <button type="button" onClick={() => setSearch("")} className="rounded-full bg-secondary px-3 py-1.5 text-xs">{q} ×</button> : null}
              {params.get("availability") ? <button type="button" onClick={() => { const n = new URLSearchParams(params); n.delete("availability"); updateParams(n); }} className="rounded-full bg-secondary px-3 py-1.5 text-xs">Skladem ×</button> : null}
              {params.get("max") ? <button type="button" onClick={() => { const n = new URLSearchParams(params); n.delete("max"); updateParams(n); }} className="rounded-full bg-secondary px-3 py-1.5 text-xs">Do {params.get("max")} Kč ×</button> : null}
              {params.get("rating") ? <button type="button" onClick={() => { const n = new URLSearchParams(params); n.delete("rating"); updateParams(n); }} className="rounded-full bg-secondary px-3 py-1.5 text-xs">{params.get("rating")}+ ★ ×</button> : null}
            </div>
          ) : null}

          {products.length === 0 ? (
            <Empty className="py-20"><EmptyHeader><EmptyMedia variant="icon"><SearchX /></EmptyMedia><EmptyTitle>Nic jsme nenašli</EmptyTitle><EmptyDescription>Zkuste upravit filtr nebo použít obecnější hledání.</EmptyDescription></EmptyHeader><EmptyContent><Button className="rounded-full" onClick={() => updateParams(new URLSearchParams())}>Zrušit filtry</Button></EmptyContent></Empty>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 pt-8 md:gap-x-5 lg:grid-cols-3 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div>
          )}
        </div>
      </div>

      <Sheet open={mobileFilters} onOpenChange={setMobileFilters}><SheetContent side="right" className="w-full sm:max-w-md"><SheetHeader><SheetTitle>Filtry</SheetTitle></SheetHeader><div className="overflow-auto p-6"><FilterContent params={params} setParams={updateParams} /></div></SheetContent></Sheet>
    </div>
  );
}
