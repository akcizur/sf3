import { cn } from "@/lib/utils.ts";
import type { CartOptions } from "@/hooks/use-cart.tsx";
import type { ProductOption } from "@/lib/catalog.ts";

export default function VariantSelector({ options, value, onChange }: {
  options: ProductOption[];
  value: CartOptions;
  onChange: (next: CartOptions) => void;
}) {
  if (!options.length) return null;
  return (
    <div className="space-y-5">
      {options.map((option) => (
        <div key={option.name}>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium">{option.name}</label>
            <span className="text-xs text-muted-foreground">{value[option.name] ?? "Choose"}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {option.values.map((item) => {
              const active = value[option.name] === item;
              return (
                <button key={item} type="button" onClick={() => onChange({ ...value, [option.name]: item })} className={cn(
                  "rounded-full border px-4 py-2 text-sm transition",
                  active ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:bg-accent",
                )}>
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
