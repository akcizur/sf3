import { Link } from "react-router-dom";
import { Leaf, Recycle, Sprout } from "lucide-react";
import InfoPage, { InfoCards, Prose } from "@/components/store/info-page.tsx";
import { PRODUCTS } from "@/lib/catalog.ts";
import { useSeo } from "@/lib/seo.ts";

export default function SustainabilityPage() {
  useSeo({ title: "Udržitelnost — Maison Terre", description: "Jak Maison Terre přemýšlí o materiálech, životnosti a odpovědné výrobě." });
  return (
    <InfoPage eyebrow="O nás" title="Udržitelnost" intro="Promyšlený design a ohleduplnost k prostředí jdou ruku v ruce.">
      <img src={PRODUCTS[4].image} alt="Koš z mořské trávy" className="aspect-[16/9] w-full rounded-[24px] object-cover" loading="lazy" decoding="async" />
      <InfoCards items={[
        { icon: Leaf, title: "Přírodní materiály", text: "Terakota, kamenina, mořská tráva, plátno a celozrnná kůže, které přirozeně stárnou." },
        { icon: Sprout, title: "Navrženo na dlouho", text: "Odolnost je součástí návrhu. Méně, ale lepších věcí znamená méně odpadu." },
        { icon: Recycle, title: "Odpovědnější výroba", text: "Menší dílny, šetrnější procesy a minimum jednorázových plastů v balení." },
      ]} />
      <Prose paragraphs={["Jsme malý obchod a udržitelnost pro nás není jednorázový projekt. Upřednostňujeme odolné materiály a držíme kolekci menší, aby každá věc měla svůj smysl."]} />
      <p className="text-muted-foreground">Máte dotaz k původu produktu? <Link to="/contact" className="text-primary underline underline-offset-4">Napište nám</Link>.</p>
    </InfoPage>
  );
}
