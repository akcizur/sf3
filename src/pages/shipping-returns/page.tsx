import { Package, RotateCcw, Truck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.tsx";
import InfoPage, { InfoCards } from "@/components/store/info-page.tsx";
import { formatPrice, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING } from "@/lib/commerce.ts";
import { useSeo } from "@/lib/seo.ts";

const FAQ = [
  { q: "Kolik stojí doprava?", a: "Standardní doprava stojí " + formatPrice(STANDARD_SHIPPING) + ". Při objednávce od " + formatPrice(FREE_SHIPPING_THRESHOLD) + " je doprava zdarma." },
  { q: "Jak dlouho trvá doručení?", a: "Většinu objednávek doručíme za 3–7 pracovních dnů. Jakmile zásilku odešleme, v produkční verzi obdržíte odkaz pro její sledování." },
  { q: "Jak funguje vrácení?", a: "Nepoužité zboží můžete podle finálních obchodních podmínek vrátit ve lhůtě 14 dnů." },
  { q: "Jak zahájím vrácení?", a: "Napište nám číslo objednávky a požadavek na vrácení. V produkční verzi naváže proces podle zvoleného dopravce." },
  { q: "Kam doručujete?", a: "Tato frontendová verze je připravená pro český storefront. Konkrétní zóny dopravy budou později řízeny backendem." },
];

export default function ShippingReturnsPage() {
  useSeo({ title: "Doprava a vrácení — Maison Terre", description: "Informace o dopravě, doručení a vrácení objednávek." });
  return (
    <InfoPage eyebrow="Podpora" title="Doprava a vrácení" intro="Jasné podmínky, pečlivé balení a jednoduchý proces vrácení.">
      <InfoCards items={[
        { icon: Truck, title: "Standardní doprava", text: "3–7 pracovních dnů. Cena " + formatPrice(STANDARD_SHIPPING) + ", doprava zdarma od " + formatPrice(FREE_SHIPPING_THRESHOLD) + "." },
        { icon: Package, title: "Pečlivé balení", text: "Objednávky balíme šetrně s důrazem na recyklovatelné materiály." },
        { icon: RotateCcw, title: "14denní vrácení", text: "Nepoužité zboží můžete vrátit podle finálních podmínek obchodu." },
      ]} />
      <Accordion type="single" collapsible className="rounded-[20px] bg-card px-6">{FAQ.map((f) => <AccordionItem key={f.q} value={f.q}><AccordionTrigger>{f.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{f.a}</AccordionContent></AccordionItem>)}</Accordion>
    </InfoPage>
  );
}
