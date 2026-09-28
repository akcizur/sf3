import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";

const COLUMNS = [
  { title: "Shop", links: [{ label: "All products", to: "/shop" }, { label: "Home Goods", to: "/shop/home-goods" }, { label: "Kitchen", to: "/shop/kitchen" }, { label: "Accessories", to: "/shop/accessories" }, { label: "Wishlist", to: "/wishlist" }] },
  { title: "About", links: [{ label: "Our story", to: "/our-story" }, { label: "Sustainability", to: "/sustainability" }, { label: "Contact", to: "/contact" }] },
  { title: "Support", links: [{ label: "Shipping & returns", to: "/shipping-returns" }, { label: "Terms", to: "/terms" }, { label: "Privacy", to: "/privacy" }] },
];

export default function Footer() {
  return (
    <footer className="px-4 pb-8 pt-16 md:px-6">
      <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[28px] bg-card px-6 py-10 md:px-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <p className="text-xl font-semibold tracking-tight">Maison Terre</p>
            <p className="max-w-sm pt-3 text-sm leading-6 text-muted-foreground">Considered goods for a quieter, more deliberate home.</p>
            <div className="flex gap-2 pt-6">
              <a href="mailto:hello@maisonterre.example" className="flex size-10 items-center justify-center rounded-full border border-border hover:bg-accent" aria-label="Email"><Mail className="size-4" /></a>
              <a href="#" className="flex size-10 items-center justify-center rounded-full border border-border hover:bg-accent" aria-label="Instagram"><Instagram className="size-4" /></a>
            </div>
          </div>
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-medium">{column.title}</p>
              <ul className="space-y-3 pt-4">
                {column.links.map((link) => <li key={link.label}><Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground">{link.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border/70 pt-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Maison Terre. All rights reserved.</p>
          <p>Secure checkout · 14-day returns · Support within 1 business day</p>
        </div>
      </div>
    </footer>
  );
}
