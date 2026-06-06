import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { Calendar, ChevronDown, ChevronUp, ExternalLink, Bell, BookOpen, ClipboardList, GraduationCap, FileCheck, Award } from "lucide-react";
import { useMemo, useState } from "react";
import headerImg from "@/assets/gallery-library.jpg";
import { useAdmin } from "@/contexts/AdminContext";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notices")({
  component: NoticesPage,
});

// ─── SEO ─────────────────────────────────────────────────────────────────────
// Set document title and meta description in-component for SPA
import { useEffect } from "react";
function useSEO(title: string, desc: string) {
  useEffect(() => {
    document.title = title;
    let tag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!tag) { tag = document.createElement("meta"); tag.name = "description"; document.head.appendChild(tag); }
    tag.content = desc;
  }, [title, desc]);
}

// ─── Quick links (SBTET resources) ───────────────────────────────────────────

const QUICK_LINKS = [
  { icon: ClipboardList, label: "Exam Results",        href: "https://sbtet.ap.gov.in/sbtet/Results/results.do",        desc: "Check semester results"       },
  { icon: FileCheck,     label: "Hall Tickets",        href: "https://sbtet.ap.gov.in/sbtet/HallTicket/hallticket.do",  desc: "Download hall tickets"        },
  { icon: Calendar,      label: "Time Tables",         href: "https://sbtet.ap.gov.in/sbtet/Notifications/notifications.do", desc: "Exam schedules"          },
  { icon: Bell,          label: "SBTET Notifications", href: "https://sbtet.ap.gov.in/sbtet/Notifications/notifications.do", desc: "Official circulars"      },
  { icon: BookOpen,      label: "Syllabus",            href: "https://sbtet.ap.gov.in/sbtet/Syllabus/syllabus.do",      desc: "Course syllabi"               },
  { icon: GraduationCap, label: "Scholarships",        href: "https://apepass.cgg.gov.in",                              desc: "ePASS portal"                 },
  { icon: Award,         label: "Study Material",      href: "https://sbtet.ap.gov.in/sbtet/StudyMaterial/studymaterial.do", desc: "Notes and references"    },
  { icon: ClipboardList, label: "Student Registration",href: "https://sbtet.ap.gov.in/sbtet/StudentRegistration/studentregistration.do", desc: "New registration" },
];

// ─── Category config ──────────────────────────────────────────────────────────

const CATS = ["All", "Examination", "Placements", "Scholarships", "Academics", "General", "Library", "Events"] as const;

const CAT_COLOR: Record<string, string> = {
  Examination:  "bg-red-100    text-red-700",
  Placements:   "bg-purple-100 text-purple-700",
  Scholarships: "bg-green-100  text-green-700",
  Academics:    "bg-blue-100   text-blue-700",
  General:      "bg-slate-100  text-slate-600",
  Library:      "bg-amber-100  text-amber-700",
  Events:       "bg-pink-100   text-pink-700",
};

// ─── Notice accordion item ────────────────────────────────────────────────────

function NoticeItem({ n }: { n: ReturnType<typeof useAdmin>["content"]["notices"][0] }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={cn(
        "rounded-2xl border transition-all duration-200",
        n.urgent
          ? "border-red-300 bg-red-50/40 hover:border-red-400"
          : "border-border bg-card hover:border-primary/30 hover:shadow-soft",
        open && "shadow-soft"
      )}
    >
      {/* Clickable header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-4 p-4 text-left"
      >
        {/* Date block */}
        <div className={cn(
          "shrink-0 flex flex-col items-center justify-center rounded-xl w-12 h-12 text-center",
          n.urgent ? "bg-red-100 text-red-700" : "bg-primary/8 text-primary"
        )}>
          <span className="text-[10px] font-semibold uppercase leading-none">
            {n.date.split(" ")[1]?.slice(0, 3) ?? ""}
          </span>
          <span className="font-display text-lg font-bold leading-none mt-0.5">
            {n.date.split(" ")[0]}
          </span>
        </div>

        {/* Title and badges */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-semibold", CAT_COLOR[n.category] ?? "bg-muted text-muted-foreground")}>
              {n.category}
            </span>
            {n.urgent && (
              <span className="rounded-full bg-red-500 text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                Urgent
              </span>
            )}
          </div>
          <h3 className="font-semibold text-sm text-foreground leading-snug pr-2">{n.title}</h3>
        </div>

        {/* Expand toggle */}
        <div className={cn("shrink-0 grid h-7 w-7 place-items-center rounded-full transition-colors", open ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="border-t border-border mx-4 pt-4 pb-4 animate-fade-in">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-muted/60 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Date</p>
              <p className="font-semibold text-sm text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" /> {n.date}
              </p>
            </div>
            <div className="rounded-xl bg-muted/60 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Category</p>
              <p className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", CAT_COLOR[n.category] ?? "bg-muted text-muted-foreground")}>
                {n.category}
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            This notice was issued on <strong>{n.date}</strong>. For queries or clarification, contact the administrative office.
          </p>
        </div>
      )}
    </article>
  );
}

// ─── Quick Links sidebar ──────────────────────────────────────────────────────

function QuickLinks() {
  return (
    <aside className="sticky top-24">
      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="bg-primary px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wider text-primary-foreground/70">SBTET Resources</p>
          <h2 className="font-display text-base font-bold text-white mt-0.5">Student Quick Links</h2>
        </div>
        <div className="p-3 space-y-1.5">
          {QUICK_LINKS.map(({ icon: Icon, label, href, desc }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-3 hover:bg-accent hover:border-primary/30 hover:shadow-soft transition group"
            >
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/8 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-none">{label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition" />
            </a>
          ))}
        </div>
        <div className="border-t border-border px-4 py-3">
          <a
            href="https://sbtet.ap.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:opacity-90 transition"
          >
            Visit SBTET Portal <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </aside>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function NoticesPage() {
  useSEO(
    "Notices and Announcements | Diploma Polytechnic, Anakapalli",
    "Official notices, exam timetables, scholarship deadlines and academic announcements for diploma students at Anakapalli Polytechnic."
  );

  const { content } = useAdmin();
  const [cat, setCat] = useState("All");

  const filtered = useMemo(
    () => content.notices.filter((n) => cat === "All" || n.category === cat),
    [cat, content.notices]
  );

  return (
    <>
      <PageHeader
        eyebrow="Notice Board"
        title="Notices and Announcements"
        description="Stay updated with examination schedules, scholarship deadlines and academic notifications."
        breadcrumb={[{ label: "Notices" }]}
        image={headerImg}
      />

      <Section>
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">

          {/* ── Main notices column ── */}
          <div>
            {/* Category filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
                    cat === c
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "border border-border bg-card hover:bg-accent"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Count */}
            <p className="text-xs text-muted-foreground mb-4">
              {filtered.length} notice{filtered.length !== 1 ? "s" : ""}{cat !== "All" ? ` in ${cat}` : ""}
            </p>

            {/* Notices */}
            {filtered.length === 0 ? (
              <div className="py-16 text-center rounded-2xl border border-border bg-muted/30">
                <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-semibold text-foreground">No notices in this category</p>
                <p className="text-sm text-muted-foreground mt-1">Check back later or view all categories.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((n) => <NoticeItem key={n.id} n={n} />)}
              </div>
            )}
          </div>

          {/* ── Quick links sidebar ── */}
          <QuickLinks />
        </div>
      </Section>
    </>
  );
}