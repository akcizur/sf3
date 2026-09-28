import { Home, Search, ShoppingBag, UserRound, Heart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils.ts";
import { useCart } from "@/hooks/use-cart.tsx";
import { useWishlist } from "@/hooks/use-wishlist.ts";
import { useSearch } from "./search-dialog.tsx";

export default function MobileNav() {
  const { count, setOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { open } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "Domů", icon: Home, to: "/", active: location.pathname === "/" },
    { label: "Hledat", icon: Search, onClick: open, active: location.pathname.startsWith("/shop") },
    { label: "Košík", icon: ShoppingBag, onClick: () => setOpen(true), active: false, count },
    { label: "Oblíbené", icon: Heart, to: "/wishlist", active: location.pathname.startsWith("/wishlist"), count: wishlistCount },
    { label: "Účet", icon: UserRound, to: "/account", active: location.pathname.startsWith("/account") },
  ];

  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-[24px] border border-border/70 bg-background/90 p-1.5 shadow-2xl shadow-black/15 backdrop-blur-2xl lg:hidden" aria-label="Mobilní navigace">
      {items.map((item) => (
        <button key={item.label} type="button" onClick={() => item.onClick ? item.onClick() : navigate(item.to!)} className={cn(
          "relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-[18px] text-[10px] transition",
          item.active ? "bg-secondary text-foreground" : "text-muted-foreground",
        )} aria-label={item.label} aria-current={item.active ? "page" : undefined}>
          <item.icon className="size-[18px]" /><span>{item.label}</span>
          {item.count ? <span className="absolute right-3 top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">{item.count}</span> : null}
        </button>
      ))}
    </nav>
  );
}
