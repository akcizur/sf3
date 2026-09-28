import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty.tsx";
import { useCart } from "@/hooks/use-cart.tsx";
import { formatPrice, getShippingCost } from "@/lib/commerce.ts";
import QuantitySelector from "./quantity-selector.tsx";
import FreeShippingProgress from "./free-shipping-progress.tsx";

export default function CartDrawer() {
  const { items, subtotal, isOpen, setOpen, setQuantity, remove } = useCart();
  const shipping = getShippingCost(subtotal);
  const total = subtotal + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 border-l bg-background sm:max-w-[480px]">
        <SheetHeader className="commerce-top-edge border-b p-6">
          <SheetTitle className="text-xl">Košík <span className="text-sm font-normal text-muted-foreground">({items.reduce((sum, item) => sum + item.quantity, 0)})</span></SheetTitle>
          <SheetDescription className="sr-only">Položky ve vašem nákupním košíku</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <Empty className="flex-1">
            <EmptyHeader><EmptyMedia variant="icon"><ShoppingBag /></EmptyMedia><EmptyTitle>Košík je prázdný</EmptyTitle><EmptyDescription>Vyberte si něco pro svůj domov.</EmptyDescription></EmptyHeader>
            <EmptyContent><Button asChild className="rounded-full" onClick={() => setOpen(false)}><Link to="/shop">Prohlédnout obchod</Link></Button></EmptyContent>
          </Empty>
        ) : (
          <>
            <div className="border-b px-4 py-4 md:px-6">
              <FreeShippingProgress subtotal={subtotal} compact />
            </div>

            <ul className="flex-1 space-y-3 overflow-auto p-4 md:p-6">
              {items.map((item) => (
                <li key={item.key} className="commerce-card rounded-[22px] p-3">
                  <div className="flex gap-3">
                    <img src={item.product.image} alt={item.product.name} loading="lazy" decoding="async" className="size-20 shrink-0 rounded-[16px] object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link to={"/product/" + item.slug} onClick={() => setOpen(false)} className="min-w-0">
                          <p className="truncate text-sm font-medium">{item.product.name}</p>
                          <p className="pt-0.5 text-xs text-muted-foreground">{Object.values(item.options).join(" · ")}</p>
                        </Link>
                        <button type="button" aria-label={"Odebrat " + item.product.name} onClick={() => remove(item.key)} className="text-muted-foreground hover:text-foreground"><Trash2 className="size-4" /></button>
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

            <div className="commerce-top-edge space-y-3 border-t p-6">
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Mezisoučet</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Doprava</span><span className={shipping === 0 ? "font-medium text-success" : ""}>{shipping === 0 ? "Zdarma" : formatPrice(shipping)}</span></div>
              <div className="flex items-center justify-between border-t pt-3"><span className="font-medium">Celkem</span><span className="text-lg font-semibold tabular-nums">{formatPrice(total)}</span></div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline" asChild className="h-11 rounded-full"><Link to="/cart" onClick={() => setOpen(false)}>Zobrazit košík</Link></Button>
                <Button asChild className="commerce-cta h-11 rounded-full"><Link to="/checkout" onClick={() => setOpen(false)}>K pokladně <ArrowRight className="ml-2 size-4" /></Link></Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
