import { Hand, Heart, Leaf } from "lucide-react";
import InfoPage, { InfoCards, Prose } from "@/components/store/info-page.tsx";
import { HERO_IMAGE } from "@/lib/catalog.ts";
import { useSeo } from "@/lib/seo.ts";

export default function OurStoryPage() {
  useSeo({ title: "Náš příběh — Maison Terre", description: "Příběh Maison Terre a náš přístup k výběru produktů." });
  return (
    <InfoPage eyebrow="O nás" title="Náš příběh" intro="Maison Terre vzniklo z jednoduché myšlenky: méně věcí, ale lepších.">
      <img src={HERO_IMAGE} alt="Terakota a kamenina na stole" className="aspect-[16/9] w-full rounded-[24px] object-cover" />
      <Prose paragraphs={[
        "Začali jsme jako dva lidé, kteří na cestách objevovali malé dílny: hrnčíře v Portugalsku, košíkáře u pobřeží a brašnáře, který desítky let zdokonaloval stejný typ peněženky.",
        "Dodnes spolupracujeme s podobnými tvůrci. Každý předmět vybíráme podle toho, zda je užitečný, krásný a vyrobený na dlouho — ne proto, že je právě nový.",
      ]} />
      <InfoCards items={[
        { icon: Hand, title: "Vyrobeno lidmi", text: "Chceme znát příběh a původ věcí, které nabízíme." },
        { icon: Leaf, title: "Poctivé materiály", text: "Hlína, dřevo, mořská tráva, plátno a kůže, pokud možno v přirozené podobě." },
        { icon: Heart, title: "Na dlouho", text: "Kolekci stavíme kolem věcí, které používáním získávají charakter." },
      ]} />
    </InfoPage>
  );
}
