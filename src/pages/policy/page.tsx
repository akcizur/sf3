import { useSeo } from "@/lib/seo.ts";
import Breadcrumbs from "@/components/store/breadcrumbs.tsx";

const CONTENT = {
  terms: {
    title: "Obchodní podmínky",
    intro: "Základní informace pro používání a nákup v tomto frontendovém storefrontu.",
    sections: [
      ["Objednávky", "Objednávka vzniká dokončením checkout flow. Toto demo objednávky ukládá pouze do aktuálního prohlížeče a nevytváří skutečný obchodní vztah."],
      ["Ceny", "Ceny jsou v prototypu uváděny v českých korunách (Kč) a představují konfigurovatelný demo katalog. Finální daňová pravidla a ceny budou řízeny obchodním backendem."],
      ["Vrácení", "Finální podmínky vrácení, reklamací a zákonných práv zákazníka budou součástí produkční konfigurace obchodu."],
    ],
  },
  privacy: {
    title: "Ochrana soukromí",
    intro: "Přehled toho, jak tato frontendová verze nakládá s daty v prohlížeči.",
    sections: [
      ["Lokální úložiště", "Košík, oblíbené produkty, demo účet a demo objednávky se ukládají do localStorage tohoto prohlížeče, aby mohl storefront fungovat bez backendu."],
      ["Analytika", "Frontend pouze vysílá interní události přes vlastní event bus. Externí analytický nástroj zatím není připojen."],
      ["Produkce", "Živá verze nahradí tento prototyp finálními údaji o správci, zpracovatelích, uchování dat a právech zákazníků."],
    ],
  },
} as const;

export default function PolicyPage({ kind }: { kind: keyof typeof CONTENT }) {
  const content = CONTENT[kind];
  useSeo({ title: content.title + " — Maison Terre", description: content.intro, noindex: false });
  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs items={[{ label: "Domů", to: "/" }, { label: content.title }]} />
      <p className="pt-8 text-xs uppercase tracking-[0.25em] text-primary">Informace</p>
      <h1 className="pt-2 text-4xl font-semibold tracking-tight md:text-5xl">{content.title}</h1>
      <p className="pt-4 text-lg leading-7 text-muted-foreground">{content.intro}</p>
      <div className="space-y-8 pt-10">{content.sections.map(([title, text]) => <section key={title} className="border-t border-border/70 pt-6"><h2 className="text-xl font-semibold">{title}</h2><p className="pt-3 text-sm leading-7 text-muted-foreground">{text}</p></section>)}</div>
    </article>
  );
}
