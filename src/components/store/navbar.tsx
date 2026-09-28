import { NavLink, Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { useCart } from "@/hooks/use-cart.tsx";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
];

export default function Navbar() {
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-6 md:pt-6">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between rounded-[40px] bg-card/90 py-2.5 pr-2.5 pl-6 shadow-2xl shadow-black/40 backdrop-blur">
        <Link to="/" className="cursor-pointer text-base font-semibold tracking-tight whitespace-nowrap md:text-lg">
          Maison Terre
        </Link>
        <nav className="flex items-center gap-1 rounded-[30px] bg-secondary p-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "cursor-pointer rounded-[30px] px-3 py-1.5 text-sm transition md:px-4",
                  isActive ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          aria-label="Open cart"
          onClick={() => setOpen(true)}
          className="relative flex size-10 cursor-pointer items-center justify-center rounded-full bg-secondary transition hover:bg-accent"
        >
          <ShoppingBag className="size-4" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
