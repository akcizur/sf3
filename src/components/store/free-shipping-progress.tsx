import { Check, Truck } from "lucide-react";
import {
  formatPrice,
  getFreeShippingProgress,
  getFreeShippingRemaining,
  FREE_SHIPPING_THRESHOLD,
} from "@/lib/commerce.ts";

export default function FreeShippingProgress({ subtotal, compact = false }: { subtotal: number; compact?: boolean }) {
  const progress = getFreeShippingProgress(subtotal);
  const remaining = getFreeShippingRemaining(subtotal);
  const unlocked = remaining === 0;

  return (
    <div className={compact ? "space-y-2" : "commerce-card commerce-top-edge rounded-2xl p-4"}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className={"flex size-7 shrink-0 items-center justify-center rounded-full " + (unlocked ? "bg-success text-success-foreground" : "bg-accent text-accent-foreground")}>
            {unlocked ? <Check className="size-4" /> : <Truck className="size-4" />}
          </span>
          <p className="text-xs leading-5">
            {unlocked
              ? <><span className="font-semibold text-success">Doprava zdarma odemčena.</span> Už nic nepřiplácíte.</>
              : <>Nakupte ještě <span className="font-semibold">{formatPrice(remaining)}</span> a máte dopravu zdarma.</>}
          </p>
        </div>
        {!compact ? <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Doprava zdarma</span> : null}
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
        <div className={"h-full rounded-full transition-[width] duration-500 " + (unlocked ? "bg-success" : "bg-primary")} style={{ width: progress + "%" }} />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>0 Kč</span>
        <span>{formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
      </div>
    </div>
  );
}
