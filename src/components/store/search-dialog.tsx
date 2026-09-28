import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ArrowRight, Command, Search, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchProducts } from "@/lib/catalog.ts";

type SearchContextValue = { open: () => void; close: () => void };
const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearch() {
  const value = useContext(SearchContext);
  if (!value) throw new Error("useSearch must be used inside SearchDialog");
  return value;
}

export default function SearchDialog() {
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setQuery("");
      setOpen(false);
    }
  }, [location.pathname]);

  const results = useMemo(() => searchProducts(query).slice(0, 6), [query]);

  const submit = (value = query) => {
    const next = value.trim();
    setOpen(false);
    if (next) navigate("/shop?q=" + encodeURIComponent(next));
  };

  return (
    <SearchContext.Provider value={{ open: () => setOpen(true), close: () => setOpen(false) }}>
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/45 p-3 backdrop-blur-sm" onMouseDown={() => setOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label="Search products" onMouseDown={(event) => event.stopPropagation()} className="mx-auto mt-[8vh] max-w-2xl overflow-hidden rounded-[28px] border border-border bg-background shadow-2xl">
            <div className="flex items-center gap-3 border-b border-border/70 px-5 py-4">
              <Search className="size-5 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && submit()}
                placeholder="Search products, categories or materials"
                className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden rounded bg-secondary px-2 py-1 text-[10px] sm:block"><Command className="inline size-3" /> K</kbd>
              <button type="button" onClick={() => setOpen(false)} className="flex size-8 items-center justify-center rounded-full hover:bg-accent" aria-label="Close search"><X className="size-4" /></button>
            </div>
            <div className="max-h-[58vh] overflow-auto p-3">
              {query.trim() === "" ? (
                <div className="grid gap-2 p-3 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Popular searches</p>
                  {["kitchen", "leather", "home", "handmade"].map((item) => (
                    <button key={item} onClick={() => { setQuery(item); submit(item); }} className="rounded-xl px-3 py-2 text-left hover:bg-accent">{item}</button>
                  ))}
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="font-medium">No products found</p>
                  <p className="pt-1 text-sm text-muted-foreground">Try another search.</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {results.map((product) => (
                    <button key={product.slug} onClick={() => { setOpen(false); navigate("/product/" + product.slug); }} className="flex w-full items-center gap-3 rounded-2xl p-2.5 text-left hover:bg-accent">
                      <img src={product.image} alt="" className="size-14 rounded-xl object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{product.name}</span>
                        <span className="block pt-0.5 text-xs text-muted-foreground">{product.shortDescription}</span>
                      </span>
                      <ArrowRight className="size-4 text-muted-foreground" />
                    </button>
                  ))}
                  <button onClick={() => submit()} className="mt-2 flex w-full items-center justify-between rounded-2xl bg-secondary px-4 py-3 text-sm font-medium">
                    View all results <ArrowRight className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <>{null}</>
    </SearchContext.Provider>
  );
}
