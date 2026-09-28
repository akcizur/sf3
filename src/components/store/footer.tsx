import { Link } from "react-router-dom";

const COLUMNS = [
  { title: "Shop", links: [{ label: "All products", to: "/shop" }, { label: "Home Goods", to: "/shop/home-goods" }, { label: "Kitchen", to: "/shop/kitchen" }, { label: "Accessories", to: "/shop/accessories" }] },
  { title: "About", links: [{ label: "Our story", to: "/our-story" }, { label: "Sustainability", to: "/sustainability" }] },
  { title: "Support", links: [{ label: "Shipping & returns", to: "/shipping-returns" }, { label: "Contact us", to: "/contact" }] },
];

export default function Footer() {
  return (
    <footer className="px-4 pt-20 pb-6 md:px-6">
      <div className="mx-auto max-w-[1280px] rounded-[24px] bg-card px-8 py-12 shadow-2xl shadow-black/40 md:px-12">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <p className="text-lg font-semibold">Maison Terre</p>
            <p className="max-w-xs pt-3 text-sm text-muted-foreground">
              Considered goods for a quieter, more deliberate home.
            </p>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className="text-sm font-medium">{c.title}</p>
              <ul className="space-y-3 pt-4">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="cursor-pointer text-sm text-muted-foreground transition hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col justify-between gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Maison Terre. All rights reserved.</p>
          <p>Crafted with care, delivered with intention.</p>
        </div>
      </div>
    </footer>
  );
}
