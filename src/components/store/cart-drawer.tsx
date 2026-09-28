import { ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty.tsx";
import { useCart } from "@/hooks/use-cart.tsx";
import { formatPrice } from "@/lib/catalog.ts";
import QuantitySelector from "./quantity-selector.tsx";

export default function CartDrawer() {
  const { items, subtotal, isOpen, setOpen, setQuantity, remove } = useCart();
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 border-l bg-background sm:max-w-[420px]">
        <SheetHeader className="p-6">
          <SheetTitle className="text-xl">Your cart</SheetTitle>
          <SheetDescription className="sr-only">Items in your cart</SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <Empty className="flex-1">
            <EmptyHeader>
              <EmptyMedia variant="icon"><ShoppingBag /></EmptyMedia>
              <EmptyTitle>Your cart is empty</EmptyTitle>
              <EmptyDescription>Find something considered for your home.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild className="rounded-[30px]" onClick={() => setOpen(false)}>
                <Link to="/shop">Browse the shop</Link>
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-auto px-6">
              {items.map((i) => (
                <li key={i.slug} className="flex gap-4 rounded-[20px] bg-card p-3">
                  <img src={i.product.image} alt={i.product.name} className="size-20 shrink-0 rounded-[16px] object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-medium">{i.product.name}</p>
                      <button
                        type="button"
                        aria-label="Remove"
                        onClick={() => remove(i.slug)}
                        className="cursor-pointer text-muted-foreground transition hover:text-foreground"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <QuantitySelector size="sm" min={0} value={i.quantity} onChange={(q) => setQuantity(i.slug, q)} />
                      <span className="text-sm tabular-nums">{formatPrice(i.product.price * i.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-medium tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
              <Button
                size="lg"
                className="h-12 w-full rounded-[30px]"
                onClick={() => toast("Checkout will be available once the store is connected.")}
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
