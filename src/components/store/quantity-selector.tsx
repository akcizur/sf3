import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils.ts";

type Props = { value: number; onChange: (v: number) => void; min?: number; size?: "sm" | "md" };

export default function QuantitySelector({ value, onChange, min = 1, size = "md" }: Props) {
  const btn = cn(
    "flex cursor-pointer items-center justify-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground disabled:opacity-40",
    size === "md" ? "size-10" : "size-7",
  );
  return (
    <div className="inline-flex items-center rounded-[30px] bg-secondary p-1">
      <button type="button" aria-label="Decrease" className={btn} disabled={value <= min} onClick={() => onChange(value - 1)}>
        <Minus className="size-4" />
      </button>
      <span className={cn("text-center text-sm tabular-nums", size === "md" ? "w-10" : "w-7")}>{value}</span>
      <button type="button" aria-label="Increase" className={btn} onClick={() => onChange(value + 1)}>
        <Plus className="size-4" />
      </button>
    </div>
  );
}
