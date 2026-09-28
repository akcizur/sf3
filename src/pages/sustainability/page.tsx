import { Link } from "react-router-dom";
import { Leaf, Recycle, Sprout } from "lucide-react";
import InfoPage, { InfoCards, Prose } from "@/components/store/info-page.tsx";
import { PRODUCTS } from "@/lib/catalog.ts";

export default function SustainabilityPage() {
  return (
    <InfoPage
      eyebrow="About"
      title="Sustainability"
      intro="Considered design and environmental care go hand in hand. Here is how we try to get it right."
    >
      <img src={PRODUCTS[4].image} alt="Seagrass basket" className="aspect-[16/9] w-full rounded-[24px] object-cover" />
      <InfoCards
        items={[
          { icon: Leaf, title: "Natural materials", text: "Terracotta, stoneware, seagrass, linen and full-grain leather that age gracefully and biodegrade responsibly." },
          { icon: Sprout, title: "Made to last, not to landfill", text: "Durability is a design requirement. Fewer, better things means less waste over time." },
          { icon: Recycle, title: "Responsible production", text: "Small workshops, low-impact dyes and finishes, and no single-use plastic in our packaging." },
        ]}
      />
      <Prose
        paragraphs={[
          "We are a small business, and sustainability is a journey rather than a finish line. We choose durable natural materials over synthetic ones and keep our catalog small so every product gets the attention it deserves.",
        ]}
      />
      <p className="text-muted-foreground">
        Have a question about how a piece is made?{" "}
        <Link to="/contact" className="cursor-pointer text-primary underline underline-offset-4">Get in touch</Link>.
      </p>
    </InfoPage>
  );
}
