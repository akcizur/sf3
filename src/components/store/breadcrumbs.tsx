import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; to?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      {items.map((c, i) => (
        <Fragment key={c.label}>
          {i > 0 && <ChevronRight className="size-3.5" />}
          {c.to ? (
            <Link to={c.to} className="cursor-pointer transition hover:text-foreground">{c.label}</Link>
          ) : (
            <span className="text-foreground">{c.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
