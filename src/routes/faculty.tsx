import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { Search, GraduationCap, Calendar, Briefcase, Users } from "lucide-react";
import { useMemo, useState } from "react";
import headerImg from "@/assets/gallery-classroom.jpg";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — Government Polytechnic, Anakapalli" },
      { name: "description", content: "Meet the experienced faculty members at Government Polytechnic, Anakapalli." },
    ],
  }),
  component: FacultyPage,
});

type F = { name: string; dept: string; designation: string; qual: string; exp: number; spec: string };

const FACULTY: F[] = [
  { name: "Prof. I.V.S.S. Srinivasa Rao", dept: "Administration", designation: "Principal", qual: "M.E.", exp: 30, spec: "Technical Education & Administration" },
  // CME
  { name: "Sri M. Subramanyam", dept: "CME", designation: "HOD, Computer Engineering", qual: "M.Tech (CSE)", exp: 20, spec: "Computer Engineering" },
  { name: "Sri B. Narasimha Murthy", dept: "CME", designation: "Senior Lecturer", qual: "M.Tech (CSE)", exp: 18, spec: "Programming & Data Structures" },
  { name: "Sri L. Mohana Tirumala", dept: "CME", designation: "Lecturer", qual: "M.Tech (CSE)", exp: 10, spec: "Web Technologies" },
  { name: "Sri Girish Reddy Ginni", dept: "CME", designation: "Lecturer", qual: "M.Tech (CSE)", exp: 9, spec: "Computer Networks" },
  { name: "Sri Suresh Barukula", dept: "CME", designation: "Lecturer", qual: "M.Tech (CSE)", exp: 8, spec: "DBMS & Software Engg." },
  { name: "Smt. Munji Gayatri", dept: "CME", designation: "Lecturer", qual: "M.Tech (CSE)", exp: 7, spec: "Operating Systems" },
  { name: "Smt. Ch. Sarojini", dept: "CME", designation: "Lecturer", qual: "M.Tech (CSE)", exp: 6, spec: "Python & AI Essentials" },
  // ECE
  { name: "Sri P. Srinivas", dept: "ECE", designation: "HOD, Electronics & Communication", qual: "M.Tech (ECE)", exp: 20, spec: "Communication Systems" },
  { name: "Sri A. Sri Ranga Raju", dept: "ECE", designation: "Lecturer", qual: "M.Tech (ECE)", exp: 14, spec: "Analog & Digital Electronics" },
  { name: "Sri G.M. Soma Sekhar", dept: "ECE", designation: "Lecturer", qual: "M.Tech (ECE)", exp: 12, spec: "Embedded Systems" },
  { name: "Sri Dasari Venkanna", dept: "ECE", designation: "Lecturer", qual: "M.Tech (ECE)", exp: 11, spec: "Microcontrollers & IoT" },
  { name: "Sri Ielapaka Sunilkumar", dept: "ECE", designation: "Lecturer", qual: "M.Tech (ECE)", exp: 10, spec: "VLSI & Digital Design" },
  { name: "Smt. Bonthu Srikavya", dept: "ECE", designation: "Lecturer", qual: "M.Tech (ECE)", exp: 7, spec: "Signal Processing" },
  // General
  { name: "Dr. Govinda Rao Konkyana", dept: "General", designation: "Head of General Section", qual: "Ph.D", exp: 22, spec: "Physics" },
  { name: "Sri Y. Srinivasa Rao", dept: "General", designation: "Senior Lecturer in Chemistry", qual: "M.Sc, M.Phil", exp: 18, spec: "Chemistry" },
  { name: "Sri Reddi Ganesh Kumar", dept: "General", designation: "Lecturer in Mathematics", qual: "M.Sc (Maths)", exp: 12, spec: "Engineering Mathematics" },
  { name: "Smt. Botcha Uma Maheswari", dept: "General", designation: "Contract Lecturer", qual: "M.A. English", exp: 6, spec: "Communication Skills" },
  // Office
  { name: "Sri P.V. Srinivasa Rao", dept: "Administration", designation: "Administrative Officer", qual: "—", exp: 25, spec: "Office Administration" },
  { name: "Sri P.V. Ravi Prakash", dept: "Administration", designation: "Office Superintendent", qual: "—", exp: 22, spec: "Records & Accounts" },
];

const DEPTS = ["All", "CME", "ECE", "General", "Administration"];

function initials(n: string) {
  return n.split(" ").filter((p) => /^[A-Z]/.test(p)).slice(0, 2).map((p) => p[0]).join("");
}

function FacultyPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");

  const filtered = useMemo(
    () => FACULTY.filter((f) => (dept === "All" || f.dept === dept) && (q === "" || f.name.toLowerCase().includes(q.toLowerCase()) || f.spec.toLowerCase().includes(q.toLowerCase()))),
    [q, dept],
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
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <label className="relative flex-1">
            <span className="sr-only">Search faculty</span>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or specialization"
              className="w-full rounded-md border border-input bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {DEPTS.map((d) => (
              <button
                key={d}
                onClick={() => setDept(d)}
                className={`rounded-md px-3 py-2 text-sm font-medium min-h-11 transition ${
                  dept === d ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((f) => (
            <div key={f.name} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-elevated hover:-translate-y-0.5 transition">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/70">
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display font-semibold text-primary-foreground/95 text-5xl tracking-wide">
                    {initials(f.name) || "—"}
                  </span>
                </div>
                <div className="absolute top-2 left-2 inline-block rounded-full bg-white/15 backdrop-blur text-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border border-white/20">
                  {f.dept}
                </div>
                <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/30 backdrop-blur px-2 py-0.5 text-[10px] font-medium text-white/90">
                  <Users className="h-3 w-3" /> Photo soon
                </div>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-gold">{f.designation}</div>
                  <h3 className="font-display font-semibold text-sm text-white leading-tight line-clamp-2">{f.name}</h3>
                </div>
              </div>
              <dl className="p-4 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-3.5 w-3.5 text-gold shrink-0" />
                  <span className="font-medium truncate">{f.qual}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-gold shrink-0" />
                  <span className="font-medium">{f.exp} years experience</span>
                </div>
                <div className="flex items-start gap-2">
                  <Briefcase className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span className="font-medium">{f.spec}</span>
                </div>
              </dl>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No faculty match your search.</div>
        )}
      </Section>
    </>
  );
}
