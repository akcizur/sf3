import { Clock, Mail, MapPin } from "lucide-react";
import InfoPage, { InfoCards } from "@/components/store/info-page.tsx";
import { useSeo } from "@/lib/seo.ts";

const EMAIL = "hello@maisonterre.com";

export default function ContactPage() {
  useSeo({ title: "Kontakt — Maison Terre", description: "Kontaktujte Maison Terre s dotazem na objednávku nebo produkt." });
  return (
    <InfoPage eyebrow="Podpora" title="Kontakt" intro="Máte dotaz k objednávce, produktu nebo spolupráci? Ozvěte se nám.">
      <InfoCards items={[
        { icon: Mail, title: "E-mail", text: EMAIL },
        { icon: Clock, title: "Doba odpovědi", text: "Odpovídáme do jednoho pracovního dne, pondělí až pátek." },
        { icon: MapPin, title: "Studio", text: "Návštěva je možná po předchozí domluvě." },
      ]} />
      <div className="rounded-[24px] bg-card p-8 text-center md:p-12">
        <h2 className="text-2xl font-semibold tracking-tight">Napište nám</h2>
        <p className="pt-2 text-muted-foreground">U dotazu k objednávce přidejte její číslo.</p>
        <a href={"mailto:" + EMAIL} className="mt-6 inline-flex items-center gap-2 rounded-[30px] bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"><Mail className="size-4" /> Napsat e-mail</a>
      </div>
    </InfoPage>
  );
}
