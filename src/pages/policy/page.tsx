import { useSeo } from "@/lib/seo.ts";
import Breadcrumbs from "@/components/store/breadcrumbs.tsx";

const CONTENT: Record<string, { title: string; intro: string; sections: [string, string][] }> = {
  terms: {
    title: "Terms & conditions",
    intro: "General terms for using and purchasing from the Maison Terre storefront.",
    sections: [
      ["Orders", "An order is submitted when the checkout flow is completed. The frontend demo records orders only in the current browser and does not create a real commercial transaction."],
      ["Prices", "Prices are displayed in USD for the prototype. Production pricing, tax rules and currency will come from the commerce backend."],
      ["Returns", "Production returns policy, eligibility and statutory consumer rights will be connected to the final store configuration."],
    ],
  },
  privacy: {
    title: "Privacy",
    intro: "An overview of how this frontend prototype handles browser data.",
    sections: [
      ["Local storage", "Cart, wishlist, demo account and demo orders are stored locally in your browser so the storefront can demonstrate its full UX without a backend."],
      ["Analytics", "The prototype emits frontend events through an internal event bus. No external analytics provider is configured here."],
      ["Production", "A live store will replace this prototype policy with the final controller, processor, retention and rights information."],
    ],
  },
};

export default function PolicyPage({ kind }: { kind: keyof typeof CONTENT }) {
  const content = CONTENT[kind];
  useSeo({ title: content.title + " — Maison Terre", description: content.intro, noindex: false });
  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: content.title }]} />
      <p className="pt-8 text-xs uppercase tracking-[0.25em] text-primary">Information</p>
      <h1 className="pt-2 text-4xl font-semibold tracking-tight md:text-5xl">{content.title}</h1>
      <p className="pt-4 text-lg leading-7 text-muted-foreground">{content.intro}</p>
      <div className="space-y-8 pt-10">{content.sections.map(([title, text]) => <section key={title} className="border-t border-border/70 pt-6"><h2 className="text-xl font-semibold">{title}</h2><p className="pt-3 text-sm leading-7 text-muted-foreground">{text}</p></section>)}</div>
    </article>
  );
}
