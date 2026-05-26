import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { Calendar, FileText, Download } from "lucide-react";
import { useMemo, useState } from "react";
import headerImg from "@/assets/gallery-library.jpg";

export const Route = createFileRoute("/notices")({
  head: () => ({
    meta: [
      { title: "Notices & Announcements — Government Polytechnic, Anakapalli" },
      { name: "description", content: "Latest notices, circulars and announcements from Government Polytechnic, Anakapalli." },
    ],
  }),
  component: NoticesPage,
});

const NOTICES = [
  { date: "10 May 2026", cat: "Examination", title: "Revised exam time-table for III semester (CME & ECE)" },
  { date: "08 May 2026", cat: "Examination", title: "Hall ticket download portal opens 15 May" },
  { date: "05 May 2026", cat: "Placements", title: "TCS NQT registration deadline extended to 20 May" },
  { date: "02 May 2026", cat: "Placements", title: "Infosys campus drive on 28 May — eligibility criteria" },
  { date: "28 Apr 2026", cat: "Scholarships", title: "ePASS post-matric scholarship renewal forms open" },
  { date: "22 Apr 2026", cat: "General", title: "Sports day postponed to 5 June due to weather advisory" },
  { date: "18 Apr 2026", cat: "Academics", title: "Industrial visit schedule for CME & ECE final year" },
  { date: "10 Apr 2026", cat: "Library", title: "New journals subscription — IEEE, Springer added" },
  { date: "05 Apr 2026", cat: "General", title: "Independence Day celebration — student volunteers needed" },
];

const CATS = ["All", "Examination", "Placements", "Scholarships", "Academics", "General", "Library"];

function NoticesPage() {
  const [cat, setCat] = useState("All");
  const filtered = useMemo(() => NOTICES.filter((n) => cat === "All" || n.cat === cat), [cat]);

  return (
    <>
      <PageHeader
        eyebrow="Notices"
        title="Latest announcements & circulars."
        description="Stay updated with academic, examination and placement notifications."
        breadcrumb={[{ label: "Notices" }]}
        image={headerImg}
      />

      <Section>
        <div className="flex flex-wrap gap-2 mb-8">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium min-h-11 transition ${
                cat === c ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          {filtered.map((n) => (
            <article key={n.title} className="group rounded-xl border border-border bg-card p-5 hover:shadow-elevated transition flex flex-col md:flex-row md:items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary/5 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {n.date}</span>
                  <span className="rounded-full bg-secondary text-secondary-foreground px-2 py-0.5 font-medium">{n.cat}</span>
                </div>
                <h3 className="mt-1.5 font-semibold text-foreground group-hover:text-primary">{n.title}</h3>
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold hover:bg-accent self-start md:self-center">
                <Download className="h-3.5 w-3.5" /> Download
              </button>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
