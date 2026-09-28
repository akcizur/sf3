import { Heart, Search, ShoppingBag, Moon, Sun, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils.ts";
import { useCart } from "@/hooks/use-cart.tsx";
import { useTheme } from "@/hooks/use-theme.ts";
import { useWishlist } from "@/hooks/use-wishlist.ts";
import { useSearch } from "./search-dialog.tsx";

const LINKS = [
  { to: "/", label: "Domů" },
  { to: "/shop", label: "Obchod" },
  { to: "/our-story", label: "O nás" },
];

export default function Navbar() {
  const { count, setOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { open: openSearch } = useSearch();

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div className="mx-auto flex h-14 max-w-[1320px] items-center justify-between rounded-[28px] border border-border/70 bg-background/88 px-3 shadow-lg shadow-black/5 backdrop-blur-2xl">
        <Link to="/" className="whitespace-nowrap px-2 text-base font-semibold tracking-tight md:text-lg">Maison Terre</Link>
        <nav className="hidden items-center gap-1 rounded-full bg-secondary/80 p-1 lg:flex" aria-label="Hlavní navigace">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={({ isActive }) => cn(
              "rounded-full px-4 py-2 text-sm transition",
              isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}>{link.label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button type="button" onClick={openSearch} className="hidden h-10 items-center gap-2 rounded-full border border-border/70 bg-secondary/60 px-4 text-sm text-muted-foreground hover:text-foreground sm:flex" aria-label="Vyhledat produkty">
            <Search className="size-4" /><span>Hledat</span><kbd className="ml-1 hidden rounded bg-background px-1.5 py-0.5 text-[10px] sm:inline">⌘K</kbd>
          </button>
          <Link to="/account" className="hidden size-10 items-center justify-center rounded-full hover:bg-accent md:flex" aria-label="Účet"><UserRound className="size-4" /></Link>
          <Link to="/wishlist" className="relative flex size-10 items-center justify-center rounded-full hover:bg-accent" aria-label="Oblíbené">
            <Heart className="size-4" />{wishlistCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">{wishlistCount}</span>}
          </Link>
          <button type="button" onClick={toggleTheme} className="hidden size-10 items-center justify-center rounded-full hover:bg-accent sm:flex" aria-label="Přepnout vzhled">
            {theme === "light" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button type="button" onClick={() => setOpen(true)} className="relative flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-label="Otevřít košík">
            <ShoppingBag className="size-4" />{count > 0 && <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">{count}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
