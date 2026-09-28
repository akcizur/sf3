import { Hand, Heart, Leaf } from "lucide-react";
import InfoPage, { InfoCards, Prose } from "@/components/store/info-page.tsx";
import { HERO_IMAGE } from "@/lib/catalog.ts";

export default function OurStoryPage() {
  return (
    <InfoPage eyebrow="About" title="Our story" intro="Maison Terre began with a simple idea: fewer, better things for the home.">
      <img src={HERO_IMAGE} alt="Terracotta and stoneware on a table" className="aspect-[16/9] w-full rounded-[24px] object-cover" />
      <Prose
        paragraphs={[
          "We started as two friends collecting pieces from small workshops on our travels: a potter in Portugal, a basket weaver on the coast, a leatherworker who had been refining the same wallet for decades.",
          "Today we still work directly with makers like these. Each object in our catalog is chosen because it is useful, beautiful and made to last, not because it is new.",
        ]}
      />
      <InfoCards
        items={[
          { icon: Hand, title: "Made by people", text: "We know the names of the makers behind every product we sell." },
          { icon: Leaf, title: "Honest materials", text: "Clay, wood, seagrass, canvas and leather, left as natural as possible." },
          { icon: Heart, title: "Kept for years", text: "We design our catalog around pieces that grow better with use." },
        ]}
      />
    </InfoPage>
  );
}
