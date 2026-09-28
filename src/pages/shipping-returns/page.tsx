import { Package, RotateCcw, Truck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.tsx";
import InfoPage, { InfoCards } from "@/components/store/info-page.tsx";

const FAQ = [
  { q: "How much does shipping cost?", a: "Standard shipping is a flat $6. Orders over $100 ship free." },
  { q: "How long does delivery take?", a: "Most orders arrive within 3 to 7 business days. You will receive a tracking link once your order ships." },
  { q: "What is your return policy?", a: "Unused items can be returned within 30 days of delivery for a full refund." },
  { q: "How do I start a return?", a: "Contact us with your order number and we will send you a prepaid return label." },
  { q: "Do you ship internationally?", a: "We currently ship within the US and to most of Europe. International rates are shown at checkout." },
];

export default function ShippingReturnsPage() {
  return (
    <InfoPage eyebrow="Support" title="Shipping & returns" intro="Clear pricing, careful packaging, and an easy return process if something isn't right.">
      <InfoCards
        items={[
          { icon: Truck, title: "Standard shipping", text: "Delivered in 3 to 7 business days. Tracking is emailed once your order ships." },
          { icon: Package, title: "Careful packaging", text: "Every order is hand-packed with recyclable, plastic-free materials." },
          { icon: RotateCcw, title: "30-day returns", text: "Not the right fit? Return unused items within 30 days for a full refund." },
        ]}
      />
      <Accordion type="single" collapsible className="rounded-[20px] bg-card px-6 shadow-xl shadow-black/30">
        {FAQ.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="cursor-pointer">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </InfoPage>
  );
}
