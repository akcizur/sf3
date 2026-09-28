import { Camera, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const COLUMNS = [
  { title: "Obchod", links: [{ label: "Všechny produkty", to: "/shop" }, { label: "Domov", to: "/shop/home-goods" }, { label: "Kuchyně", to: "/shop/kitchen" }, { label: "Doplňky", to: "/shop/accessories" }, { label: "Oblíbené", to: "/wishlist" }] },
  { title: "O nás", links: [{ label: "Náš příběh", to: "/our-story" }, { label: "Udržitelnost", to: "/sustainability" }, { label: "Kontakt", to: "/contact" }] },
  { title: "Podpora", links: [{ label: "Doprava a vrácení", to: "/shipping-returns" }, { label: "Obchodní podmínky", to: "/terms" }, { label: "Ochrana soukromí", to: "/privacy" }] },
];

export default function Footer() {
  return (
    <footer className="px-4 pb-8 pt-16 md:px-6">
      <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[28px] bg-card px-6 py-10 md:px-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <p className="text-xl font-semibold tracking-tight">Maison Terre</p>
            <p className="max-w-sm pt-3 text-sm leading-6 text-muted-foreground">Promyšlené věci pro klidnější a přirozenější domov.</p>
            <div className="flex gap-2 pt-6">
              <a href="mailto:hello@maisonterre.example" className="flex size-10 items-center justify-center rounded-full border border-border hover:bg-accent" aria-label="E-mail"><Mail className="size-4" /></a>
              <a href="#" className="flex size-10 items-center justify-center rounded-full border border-border hover:bg-accent" aria-label="Sociální sítě"><Camera className="size-4" /></a>
            </div>
          </div>
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-medium">{column.title}</p>
              <ul className="space-y-3 pt-4">{column.links.map((link) => <li key={link.label}><Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground">{link.label}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border/70 pt-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Maison Terre. Všechna práva vyhrazena.</p>
          <p>Bezpečný nákup · vrácení do 14 dnů · podpora do 1 pracovního dne</p>
        </div>
      </div>
    </footer>
  );
}
