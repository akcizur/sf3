import type { LucideIcon } from "lucide-react";

type Props = { eyebrow: string; title: string; intro: string; children: React.ReactNode };

export default function InfoPage({ eyebrow, title, intro, children }: Props) {
  return (
    <article className="mx-auto max-w-[860px]">
      <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">{eyebrow}</p>
      <h1 className="pt-3 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      <p className="max-w-2xl pt-4 text-lg text-muted-foreground">{intro}</p>
      <div className="space-y-12 pt-12">{children}</div>
    </article>
  );
}

export type InfoCard = { icon: LucideIcon; title: string; text: string };

export function InfoCards({ items }: { items: InfoCard[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((c) => (
        <div key={c.title} className="rounded-[20px] bg-card p-6">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary"><c.icon className="size-5" /></div>
          <h3 className="pt-6 font-medium">{c.title}</h3>
          <p className="pt-2 text-sm text-muted-foreground">{c.text}</p>
        </div>
      ))}
    </div>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return <div className="space-y-4 leading-7 text-muted-foreground">{paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>;
}
