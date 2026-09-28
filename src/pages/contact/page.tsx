import { Clock, Mail, MapPin } from "lucide-react";
import InfoPage, { InfoCards } from "@/components/store/info-page.tsx";

const EMAIL = "hello@maisonterre.com";

export default function ContactPage() {
  return (
    <InfoPage eyebrow="Support" title="Contact us" intro="Questions about an order, a product or a collaboration? We read every message.">
      <InfoCards
        items={[
          { icon: Mail, title: "Email", text: EMAIL },
          { icon: Clock, title: "Response time", text: "We reply within one business day, Monday to Friday." },
          { icon: MapPin, title: "Studio", text: "Visits by appointment only. Write to us to arrange one." },
        ]}
      />
      <div className="rounded-[24px] bg-card p-8 text-center shadow-xl shadow-black/30 md:p-12">
        <h2 className="text-2xl font-semibold tracking-tight">Write to us</h2>
        <p className="pt-2 text-muted-foreground">Include your order number if your question is about a purchase.</p>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-[30px] bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
        >
          <Mail className="size-4" /> Send an email
        </a>
      </div>
    </InfoPage>
  );
}
