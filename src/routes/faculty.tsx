import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { Search, GraduationCap, Calendar, Briefcase } from "lucide-react";
import { useMemo, useState } from "react";
import headerImg from "@/assets/gallery-classroom.jpg";
import { useAdmin } from "@/contexts/AdminContext";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — Government Polytechnic, Anakapalli" },
      { name: "description", content: "Meet the experienced faculty members at Government Polytechnic, Anakapalli." },
    ],
  }),
  component: FacultyPage,
});

const DEPTS = ["All", "CME", "ECE", "General", "Administration"];

function initials(n: string) {
  return n.split(" ").filter((p) => /^[A-Z]/.test(p)).slice(0, 2).map((p) => p[0]).join("");
}

const DEPT_COLOR: Record<string, string> = {
  CME: "bg-blue-100 text-blue-700",
  ECE: "bg-purple-100 text-purple-700",
  General: "bg-green-100 text-green-700",
  Administration: "bg-amber-100 text-amber-700",
};

function FacultyPage() {
  const { content } = useAdmin();
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");

  const filtered = useMemo(
    () => content.faculty.filter(
      (f) =>
        (dept === "All" || f.dept === dept) &&
        (q === "" || f.name.toLowerCase().includes(q.toLowerCase()) || f.spec.toLowerCase().includes(q.toLowerCase()))
    ),
    [q, dept, content.faculty]
  );

  return (
    <>
      <PageHeader
        eyebrow="Faculty"
        title="Meet our experienced educators."
        description="Our faculty bring decades of combined teaching and industry experience to the classroom."
        breadcrumb={[{ label: "Faculty" }]}
        image={headerImg}
      />

      <Section>
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or specialization"
              className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {DEPTS.map((d) => (
              <button key={d} onClick={() => setDept(d)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
                  dept === d ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                )}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-4">{filtered.length} of {content.faculty.length} members</p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((f) => (
            <div key={f.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated transition-all">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {initials(f.name)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm text-foreground leading-snug">{f.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.designation}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold", DEPT_COLOR[f.dept] ?? "bg-muted text-muted-foreground")}>
                  {f.dept}
                </span>
                {f.qual && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted text-muted-foreground px-2.5 py-1 text-[11px] font-medium">
                    <GraduationCap className="h-3 w-3" /> {f.qual}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 rounded-full bg-muted text-muted-foreground px-2.5 py-1 text-[11px] font-medium">
                  <Calendar className="h-3 w-3" /> {f.exp} yrs
                </span>
              </div>
              {f.spec && (
                <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5 border-t border-border pt-3">
                  <Briefcase className="h-3 w-3 shrink-0" /> {f.spec}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}