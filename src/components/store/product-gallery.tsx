import { useState } from "react";
import { Expand, X } from "lucide-react";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const current = images[active] ?? images[0];

  return (
    <>
      <div className="grid gap-3 md:grid-cols-[88px_1fr]">
        <div className="order-2 grid grid-cols-4 gap-2 md:order-1 md:grid-cols-1">
          {images.map((image, index) => (
            <button key={image + index} type="button" onClick={() => setActive(index)} className={cnGallery(index === active)}>
              <img src={image} alt="" className="size-full rounded-xl object-cover" />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setLightbox(true)} className="group relative order-1 aspect-square overflow-hidden rounded-[28px] bg-card md:order-2" aria-label="Open product image gallery">
          <img src={current} alt={name} className="size-full object-cover transition duration-500 group-hover:scale-[1.02]" />
          <span className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur"><Expand className="size-4" /></span>
        </button>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[110] bg-black/90 p-4" onClick={() => setLightbox(false)}>
          <button type="button" onClick={() => setLightbox(false)} className="absolute right-5 top-5 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close gallery"><X className="size-5" /></button>
          <div className="flex h-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <img src={current} alt={name} className="max-h-full max-w-full rounded-2xl object-contain" />
          </div>
        </div>
      )}
    </>
  );
}

function cnGallery(active: boolean) {
  return "aspect-square overflow-hidden rounded-xl border " + (active ? "border-foreground ring-2 ring-ring/30" : "border-border/60 opacity-70 hover:opacity-100");
}
