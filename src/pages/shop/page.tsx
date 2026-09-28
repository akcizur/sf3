import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { Search, SearchX, X } from "lucide-react";
import { CATEGORIES, getCategory, getProductsByCategory, type Product } from "@/lib/catalog.ts";
import { cn } from "@/lib/utils.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty.tsx";
import { Button } from "@/components/ui/button.tsx";
import ProductCard from "@/components/store/product-card.tsx";
import Breadcrumbs from "@/components/store/breadcrumbs.tsx";
import NotFound from "../NotFound.tsx";

const PILLS = [{ to: "/shop", label: "All products" }, ...CATEGORIES.map((c) => ({ to: `/shop/${c.slug}`, label: c.name }))];

const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price: low to high", fn: (a: Product, b: Product) => a.price - b.price },
  "price-desc": { label: "Price: high to low", fn: (a: Product, b: Product) => b.price - a.price },
  "name-asc": { label: "Name: A to Z", fn: (a: Product, b: Product) => a.name.localeCompare(b.name) },
} as const;
type SortKey = keyof typeof SORTS;
const isSortKey = (v: string | null): v is SortKey => v !== null && v in SORTS;

export default function ShopPage() {
  const { category } = useParams();
  const [params, setParams] = useSearchParams();
  const current = category ? getCategory(category) : undefined;
  if (category && !current) return <NotFound />;

  const q = params.get("q") ?? "";
  const sortParam = params.get("sort");
  const sort: SortKey = isSortKey(sortParam) ? sortParam : "featured";
  const needle = q.trim().toLowerCase();
  const products = getProductsByCategory(current?.slug)
    .filter((p) => p.name.toLowerCase().includes(needle))
    .sort(SORTS[sort].fn);

  const updateParam = (key: string, value: string, fallback: string) => {
    const next = new URLSearchParams(params);
    if (value && value !== fallback) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };
  const suffix = params.toString() ? `?${params.toString()}` : "";

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, current ? { label: "Shop", to: "/shop" } : { label: "Shop" }, ...(current ? [{ label: current.name }] : [])]} />
      {!current && <p className="pt-8 text-xs font-medium tracking-[0.3em] text-primary uppercase">Shop</p>}
      <h1 className="pt-3 text-4xl font-semibold tracking-tight md:text-5xl">{current?.name ?? "All products"}</h1>
      <p className="pt-3 text-muted-foreground">{current?.description ?? "Our full collection of considered goods for everyday living."}</p>

      <div className="flex flex-col gap-4 pt-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {PILLS.map((p) => (
            <NavLink
              key={p.to}
              to={`${p.to}${suffix}`}
              end
              className={({ isActive }) =>
                cn(
                  "cursor-pointer rounded-[30px] px-4 py-2 text-sm transition",
                  isActive ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground",
                )
              }
            >
              {p.label}
            </NavLink>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={q}
              onChange={(e) => updateParam("q", e.target.value, "")}
              placeholder="Search products"
              aria-label="Search products"
              className="h-10 w-full rounded-[30px] bg-card pr-10 pl-10 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-search-cancel-button]:hidden"
            />
            {q && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => updateParam("q", "", "")}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <Select value={sort} onValueChange={(v) => updateParam("sort", v, "featured")}>
            <SelectTrigger aria-label="Sort products" className="h-10 w-full cursor-pointer rounded-[30px] border-0 bg-card px-4 sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(SORTS) as SortKey[]).map((k) => (
                <SelectItem key={k} value={k} className="cursor-pointer">{SORTS[k].label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {products.length === 0 ? (
        <Empty className="pt-16">
          <EmptyHeader>
            <EmptyMedia variant="icon"><SearchX /></EmptyMedia>
            <EmptyTitle>No products found</EmptyTitle>
            <EmptyDescription>{needle ? `Nothing matches "${q}" here.` : "Nothing here yet."}</EmptyDescription>
          </EmptyHeader>
          {needle && (
            <EmptyContent>
              <Button size="sm" className="rounded-[30px]" onClick={() => updateParam("q", "", "")}>Clear search</Button>
            </EmptyContent>
          )}
        </Empty>
      ) : (
        <div className="grid grid-cols-2 gap-6 pt-12 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
