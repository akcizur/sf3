import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty.tsx";
import { useCart } from "@/hooks/use-cart.tsx";
import { formatPrice } from "@/lib/catalog.ts";
import QuantitySelector from "./quantity-selector.tsx";

export default function CartDrawer() {
  const { items, subtotal, isOpen, setOpen, setQuantity, remove } = useCart();
  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 border-l bg-background sm:max-w-[480px]">
        <SheetHeader className="border-b p-6">
          <SheetTitle className="text-xl">Your cart <span className="text-sm font-normal text-muted-foreground">({items.length})</span></SheetTitle>
          <SheetDescription className="sr-only">Items in your shopping cart</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <Empty className="flex-1">
            <EmptyHeader>
              <EmptyMedia variant="icon"><ShoppingBag /></EmptyMedia>
              <EmptyTitle>Your cart is empty</EmptyTitle>
              <EmptyDescription>Find something considered for your home.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild className="rounded-full" onClick={() => setOpen(false)}>
                <Link to="/shop">Browse the shop</Link>
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-auto p-4 md:p-6">
              {items.map((item) => (
                <li key={item.key} className="rounded-[22px] bg-card p-3">
                  <div className="flex gap-3">
                    <img src={item.product.image} alt={item.product.name} className="size-20 shrink-0 rounded-[16px] object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link to={"/product/" + item.slug} onClick={() => setOpen(false)} className="min-w-0">
                          <p className="truncate text-sm font-medium">{item.product.name}</p>
                          <p className="pt-0.5 text-xs text-muted-foreground">{Object.values(item.options).join(" · ")}</p>
                        </Link>
                        <button type="button" aria-label="Remove item" onClick={() => remove(item.key)} className="text-muted-foreground hover:text-foreground"><Trash2 className="size-4" /></button>
                      </div>
                      <div className="flex items-center justify-between pt-3">
                        <QuantitySelector size="sm" min={0} value={item.quantity} onChange={(q) => setQuantity(item.key, q)} />
                        <span className="text-sm font-medium tabular-nums">{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t p-6">
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
              <div className="flex items-center justify-between border-t pt-3"><span className="font-medium">Total</span><span className="text-lg font-semibold tabular-nums">{formatPrice(total)}</span></div>
              {subtotal > 0 && subtotal < 100 ? <p className="text-xs text-muted-foreground">Add {formatPrice(100 - subtotal)} for free shipping.</p> : null}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline" asChild className="h-11 rounded-full"><Link to="/cart" onClick={() => setOpen(false)}>View cart</Link></Button>
                <Button asChild className="h-11 rounded-full"><Link to="/checkout" onClick={() => setOpen(false)}>Checkout <ArrowRight className="ml-2 size-4" /></Link></Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
