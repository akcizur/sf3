import { Heart } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { useWishlist } from "@/hooks/use-wishlist.ts";
import { track } from "@/lib/analytics.ts";

export default function WishlistButton({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const { has, toggle } = useWishlist();
  const active = has(slug);
  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(slug);
        track(active ? "wishlist_remove" : "wishlist_add", { slug });
      }}
      className={cn(
        "flex items-center justify-center rounded-full border border-border/70 bg-background/85 text-muted-foreground shadow-sm backdrop-blur transition hover:scale-105 hover:text-foreground",
        compact ? "size-9" : "size-10",
        active && "bg-foreground text-background",
      )}
    >
      <Heart className={cn(compact ? "size-4" : "size-[18px]", active && "fill-current")} />
    </button>
  );
}
