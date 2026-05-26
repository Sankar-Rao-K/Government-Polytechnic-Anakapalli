import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import headerImg from "@/assets/hero-campus.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Government Polytechnic, Anakapalli" },
      { name: "description", content: "Reach Government Polytechnic, Anakapalli — address, phone, email and map." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="We'd love to hear from you."
        description="Reach out for academic queries, certificates or general information."
        breadcrumb={[{ label: "Contact" }]}
        image={headerImg}
      />

      <Section>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <div className="grid gap-4 content-start">
            {[
              { icon: MapPin, t: "Address", d: "Government Polytechnic, Anakapalli\nRebaka Village, Anakapalli Mandal\nVisakhapatnam Dist., Andhra Pradesh — 531002" },
              { icon: Phone, t: "Phone", d: "+91 90102 22173" },
              { icon: Mail, t: "Email", d: "polytechnic.government173@gmail.com" },
              { icon: Clock, t: "Office Hours", d: "Monday – Saturday\n9:00 AM – 5:00 PM" },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-6 flex gap-4 shadow-soft">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{d}</div>
                </div>
              </div>
            ))}
          </div>

          <form className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-soft">
            <SectionHeading eyebrow="Send Message" title="Drop us a line" />
            <div className="mt-6 grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="grid gap-1.5">
                  <span className="text-sm font-medium">Full name</span>
                  <input required className="rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-sm font-medium">Phone</span>
                  <input className="rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </label>
              </div>
              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Email</span>
                <input type="email" required className="rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </label>
              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Subject</span>
                <select className="rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Academics</option><option>Examinations</option><option>Placements</option><option>General</option>
                </select>
              </label>
              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Message</span>
                <textarea rows={5} required className="rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              </label>
              <button type="submit" className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Location" title="Find us on the map" />
        <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-soft aspect-[16/9] md:aspect-[21/9]">
          <iframe
            src="https://www.google.com/maps?q=Rebaka+Village,Anakapalli,Andhra+Pradesh&output=embed"
            title="Government Polytechnic, Anakapalli location"
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </Section>
    </>
  );
}
