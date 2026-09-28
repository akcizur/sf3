import { useEffect, useState } from "react";

const KEY = "maison-terre-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try { setVisible(localStorage.getItem(KEY) !== "accepted"); } catch { setVisible(true); }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-xl rounded-[24px] border border-border bg-background/95 p-5 shadow-2xl backdrop-blur-xl lg:bottom-6">
      <p className="text-sm font-medium">Soukromí a cookies</p>
      <p className="pt-1 text-xs leading-5 text-muted-foreground">Tato verze používá nezbytné lokální úložiště pro košík a oblíbené produkty. Volitelná analytika zatím není připojena.</p>
      <div className="flex gap-2 pt-4">
        <button type="button" onClick={() => { try { localStorage.setItem(KEY, "accepted"); } catch {} setVisible(false); }} className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Souhlasím</button>
        <button type="button" onClick={() => setVisible(false)} className="rounded-full bg-secondary px-4 py-2 text-sm font-medium">Pokračovat</button>
      </div>
    </div>
  );
}
