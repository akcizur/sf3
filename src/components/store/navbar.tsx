import { Link, NavLink } from "react-router-dom";
import { Moon, ShoppingBag, Sun } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { useCart } from "@/hooks/use-cart.tsx";
import { useTheme } from "@/hooks/use-theme.ts";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
];

export default function Navbar() {
  const { count, setOpen } = useCart();
  const { theme, toggleTheme } = useTheme();

  const nextThemeLabel = theme === "light" ? "dark" : "light";

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-6 md:pt-6">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between rounded-[40px] border border-border/60 bg-card/90 py-2.5 pr-2.5 pl-6 shadow-2xl shadow-black/10 backdrop-blur-xl transition-colors duration-300">
        <Link
          to="/"
          className="cursor-pointer whitespace-nowrap text-base font-semibold tracking-tight transition-colors duration-300 md:text-lg"
        >
          Maison Terre
        </Link>

        <nav className="flex items-center gap-1 rounded-[30px] bg-secondary p-1 transition-colors duration-300">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "cursor-pointer rounded-[30px] px-3 py-1.5 text-sm transition-colors duration-300 md:px-4",
                  isActive
                    ? "bg-accent text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label={`Switch to ${nextThemeLabel} mode`}
            aria-pressed={theme === "dark"}
            title={`Switch to ${nextThemeLabel} mode`}
            onClick={toggleTheme}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-secondary text-muted-foreground transition-[background-color,color,border-color,transform] duration-300 hover:bg-accent hover:text-foreground active:scale-95 focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {theme === "light" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <button
            type="button"
            aria-label="Open cart"
            onClick={() => setOpen(true)}
            className="relative flex size-10 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-secondary transition-[background-color,border-color,transform] duration-300 hover:bg-accent active:scale-95 focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <ShoppingBag className="size-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
