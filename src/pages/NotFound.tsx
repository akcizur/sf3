import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { useSeo } from "@/lib/seo.ts";

export default function NotFound() {
  useSeo({ title: "Stránka nenalezena — Maison Terre", description: "Požadovaná stránka neexistuje.", noindex: true });
  return (
    <div className="flex items-center justify-center py-20">
      <div className="space-y-6 text-center">
        <div className="space-y-2"><h1 className="text-6xl font-bold text-muted-foreground">404</h1><h2 className="text-2xl font-semibold">Stránka nebyla nalezena</h2></div>
        <p className="mx-auto max-w-md text-lg text-muted-foreground">Tato stránka neexistuje nebo byla přesunuta.</p>
        <Button asChild className="rounded-full"><Link to="/">Zpět na domovskou stránku</Link></Button>
      </div>
    </div>
  );
}
