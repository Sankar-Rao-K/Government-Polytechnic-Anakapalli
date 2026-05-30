import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { Calendar, FileText, Download } from "lucide-react";
import { useMemo, useState } from "react";
import headerImg from "@/assets/gallery-library.jpg";
import { useAdmin } from "@/contexts/AdminContext";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notices")({
  head: () => ({
    meta: [
      { title: "Notices & Announcements — Government Polytechnic, Anakapalli" },
      { name: "description", content: "Latest notices, circulars and announcements from Government Polytechnic, Anakapalli." },
    ],
  }),
  component: NoticesPage,
});

const CATS = ["All", "Examination", "Placements", "Scholarships", "Academics", "General", "Library", "Events"];

function NoticesPage() {
  const { content } = useAdmin();
  const [cat, setCat] = useState("All");

  const filtered = useMemo(
    () => content.notices.filter((n) => cat === "All" || n.category === cat),
    [cat, content.notices]
  );

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
        {/* Category filter — scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
                cat === c ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
              )}>
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground text-sm">No notices in this category.</div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((n) => (
              <article key={n.id}
                className={cn(
                  "group rounded-xl border bg-card p-4 hover:shadow-elevated transition flex flex-col md:flex-row md:items-center gap-3",
                  n.urgent ? "border-red-300 bg-red-50/50" : "border-border"
                )}>
                <div className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-lg",
                  n.urgent ? "bg-red-100 text-red-600" : "bg-primary/5 text-primary"
                )}>
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {n.date}
                    </span>
                    <span className="rounded-full bg-secondary text-secondary-foreground px-2 py-0.5 font-medium">{n.category}</span>
                    {n.urgent && (
                      <span className="rounded-full bg-red-100 text-red-600 px-2 py-0.5 font-bold">🔴 URGENT</span>
                    )}
                  </div>
                  <h3 className="mt-1 font-semibold text-sm text-foreground group-hover:text-primary">{n.title}</h3>
                </div>
                <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold hover:bg-accent self-start md:self-center shrink-0">
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}