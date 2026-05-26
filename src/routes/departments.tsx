import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Cpu,
  Radio,
  BookOpen,
  Building2,
  ArrowRight,
  FlaskConical,
  Users,
  Award,
  GraduationCap,
  Briefcase,
  Calendar,
} from "lucide-react";
import headerImg from "@/assets/gallery-lab.jpg";
import cmeImg from "@/assets/dept-cme.jpg";
import eceImg from "@/assets/dept-ece.jpg";
import generalImg from "@/assets/dept-general.jpg";
import adminImg from "@/assets/dept-admin.jpg";

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title: "Departments — Government Polytechnic, Anakapalli" },
      {
        name: "description",
        content:
          "Departments and sections at Government Polytechnic, Anakapalli — Computer Engineering, Electronics & Communication, General Section and Administrative Office.",
      },
    ],
  }),
  component: DepartmentsPage,
});

type Staff = {
  name: string;
  role: string;
  qual: string;
  exp: number;
  spec: string;
  photo?: string; // future: path to staff photo
};

type Dept = {
  id: string;
  code: string;
  name: string;
  shortName: string;
  kind: "branch" | "section";
  icon: typeof Cpu;
  image: string;
  desc: string;
  vision?: string;
  mission?: string[];
  intake?: number;
  labs?: number;
  labsList?: string[];
  staff: Staff[];
};

const DEPTS: Dept[] = [
  {
    id: "cme",
    code: "CME",
    name: "Computer Engineering",
    shortName: "Computer Engg.",
    kind: "branch",
    icon: Cpu,
    image: cmeImg,
    desc: "Programming foundations, web & mobile development, databases, computer networks, AI essentials and cybersecurity basics.",
    vision:
      "To empower students to be technologically adept, innovative and self-motivated citizens with strong human values and high-quality skills who contribute meaningfully to the ever-changing field of Computer Engineering.",
    mission: [
      "Prepare diploma students capable of taking pivotal roles across modern Computer Engineering.",
      "Ground students in core concepts so they can apply them creatively across engineering domains.",
      "Sensitise students to environmental, safety and economic context.",
      "Build technical skill through intensive training in industry tools and project work.",
    ],
    intake: 66,
    labs: 6,
    labsList: ["Programming Lab", "Web Tech Lab", "DBMS Lab", "Networks Lab", "AI/ML Lab", "Project Lab"],
    staff: [
      { name: "Sri M. Subramanyam", role: "Head of Department", qual: "M.Tech (CSE)", exp: 20, spec: "Computer Engineering" },
      { name: "Sri B. Narasimha Murthy", role: "Senior Lecturer", qual: "M.Tech (CSE)", exp: 18, spec: "Programming & Data Structures" },
      { name: "Sri L. Mohana Tirumala", role: "Lecturer", qual: "M.Tech (CSE)", exp: 10, spec: "Web Technologies" },
      { name: "Sri Girish Reddy Ginni", role: "Lecturer", qual: "M.Tech (CSE)", exp: 9, spec: "Computer Networks" },
      { name: "Sri Suresh Barukula", role: "Lecturer", qual: "M.Tech (CSE)", exp: 8, spec: "DBMS & Software Engg." },
      { name: "Smt. Munji Gayatri", role: "Lecturer", qual: "M.Tech (CSE)", exp: 7, spec: "Operating Systems" },
      { name: "Smt. Ch. Sarojini", role: "Lecturer", qual: "M.Tech (CSE)", exp: 6, spec: "Python & AI Essentials" },
    ],
  },
  {
    id: "ece",
    code: "ECE",
    name: "Electronics & Communication Engineering",
    shortName: "Electronics & Comm.",
    kind: "branch",
    icon: Radio,
    image: eceImg,
    desc: "Analog & digital electronics, microcontrollers, communication systems, embedded design, IoT and VLSI fundamentals.",
    vision:
      "To enrich the teaching–learning process and produce technically capable manpower with the exposure needed by industry, driving socio-economic development through excellence in Electronics & Communication Engineering.",
    mission: [
      "Educate students with state-of-the-art technologies to meet growing industry challenges.",
      "Develop skills through continuous lab upgrades and active industry interaction.",
      "Provide technical expertise alongside professional ethics aligned with societal needs.",
      "Build a strong foundation that enables life-long and continuing education.",
    ],
    intake: 66,
    labs: 6,
    labsList: ["Electronics Lab", "Comm. Systems Lab", "Embedded Lab", "VLSI Lab", "Microprocessor Lab", "IoT Lab"],
    staff: [
      { name: "Sri P. Srinivas", role: "Head of Department", qual: "M.Tech (ECE)", exp: 20, spec: "Communication Systems" },
      { name: "Sri A. Sri Ranga Raju", role: "Lecturer", qual: "M.Tech (ECE)", exp: 14, spec: "Analog & Digital Electronics" },
      { name: "Sri G.M. Soma Sekhar", role: "Lecturer", qual: "M.Tech (ECE)", exp: 12, spec: "Embedded Systems" },
      { name: "Sri Dasari Venkanna", role: "Lecturer", qual: "M.Tech (ECE)", exp: 11, spec: "Microcontrollers & IoT" },
      { name: "Sri Ielapaka Sunilkumar", role: "Lecturer", qual: "M.Tech (ECE)", exp: 10, spec: "VLSI & Digital Design" },
      { name: "Smt. Bonthu Srikavya", role: "Lecturer", qual: "M.Tech (ECE)", exp: 7, spec: "Signal Processing" },
    ],
  },
  {
    id: "general",
    code: "GS",
    name: "General Section",
    shortName: "General Section",
    kind: "section",
    icon: BookOpen,
    image: generalImg,
    desc: "Foundation subjects — Mathematics, Physics, Chemistry and English — that underpin both engineering branches and shape well-rounded diploma graduates.",
    staff: [
      { name: "Dr. Govinda Rao Konkyana", role: "Head of General Section", qual: "Ph.D", exp: 22, spec: "Physics" },
      { name: "Sri Y. Srinivasa Rao", role: "Senior Lecturer", qual: "M.Sc, M.Phil", exp: 18, spec: "Chemistry" },
      { name: "Sri Reddi Ganesh Kumar", role: "Lecturer", qual: "M.Sc (Maths)", exp: 12, spec: "Engineering Mathematics" },
      { name: "Smt. Botcha Uma Maheswari", role: "Contract Lecturer", qual: "M.A. English", exp: 6, spec: "Communication Skills" },
    ],
  },
  {
    id: "admin",
    code: "ADM",
    name: "Administrative Office",
    shortName: "Administration",
    kind: "section",
    icon: Building2,
    image: adminImg,
    desc: "The office handles admissions, records, accounts, examinations co-ordination and day-to-day administration of the polytechnic.",
    staff: [
      { name: "Prof. I.V.S.S. Srinivasa Rao", role: "Principal", qual: "M.E.", exp: 30, spec: "Technical Education & Administration" },
      { name: "Sri P.V. Srinivasa Rao", role: "Administrative Officer", qual: "—", exp: 25, spec: "Office Administration" },
      { name: "Sri P.V. Ravi Prakash", role: "Office Superintendent", qual: "—", exp: 22, spec: "Records & Accounts" },
    ],
  },
];

function initials(n: string) {
  return n
    .split(" ")
    .filter((p) => /^[A-Z]/.test(p))
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

function StaffCard({ s }: { s: Staff }) {
  return (
    <div className="group relative rounded-xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-elevated hover:-translate-y-0.5 transition">
      {/* Portrait area — ready for real photos */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/70">
        {s.photo ? (
          <img
            src={s.photo}
            alt={s.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-display font-semibold text-primary-foreground/95 text-5xl tracking-wide">
                {initials(s.name) || "—"}
              </span>
            </div>
            <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/30 backdrop-blur px-2 py-0.5 text-[10px] font-medium text-white/90">
              <Users className="h-3 w-3" /> Photo soon
            </div>
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-gold">{s.role}</div>
          <h4 className="font-display font-semibold text-sm text-white leading-tight line-clamp-2">{s.name}</h4>
        </div>
      </div>

      {/* Info */}
      <dl className="p-4 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-3.5 w-3.5 text-gold shrink-0" />
          <span className="font-medium truncate">{s.qual}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-gold shrink-0" />
          <span className="font-medium">{s.exp} years experience</span>
        </div>
        <div className="flex items-start gap-2">
          <Briefcase className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
          <span className="font-medium">{s.spec}</span>
        </div>
      </dl>
    </div>
  );
}

function DepartmentPanel({ d }: { d: Dept }) {
  const Icon = d.icon;
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
      {/* Hero */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img
          src={d.image}
          alt={`${d.name} at Government Polytechnic, Anakapalli`}
          width={1280}
          height={800}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
        <div className="relative h-full p-6 md:p-8 flex flex-col justify-between text-white">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                d.kind === "branch" ? "bg-gold text-primary" : "bg-white/15 text-white border border-white/25"
              }`}
            >
              {d.kind === "branch" ? "Diploma Branch" : "Support Section"}
            </span>
            <span className="font-mono text-[11px] tracking-widest opacity-80">{d.code}</span>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 backdrop-blur">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold leading-tight">{d.name}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <p className="text-muted-foreground leading-relaxed max-w-3xl">{d.desc}</p>

        {d.kind === "branch" && (
          <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
            {[
              [Users, `${d.intake}`, "Annual intake"],
              [Award, `${d.staff.length}`, "Faculty"],
              [FlaskConical, `${d.labs}`, "Laboratories"],
            ].map(([Ico, v, l]) => {
              const I = Ico as typeof Users;
              return (
                <div key={l as string} className="rounded-lg border border-border p-3 text-center">
                  <I className="h-4 w-4 mx-auto text-gold" />
                  <div className="mt-1 font-display text-xl font-semibold text-primary">{v as string}</div>
                  <div className="text-[11px] text-muted-foreground">{l as string}</div>
                </div>
              );
            })}
          </div>
        )}

        {d.vision && (
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-border p-5 bg-surface">
              <div className="text-xs font-semibold uppercase tracking-wider text-gold">Vision</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.vision}</p>
            </div>
            {d.mission && (
              <div className="rounded-xl border border-border p-5 bg-surface">
                <div className="text-xs font-semibold uppercase tracking-wider text-gold">Mission</div>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground list-disc pl-4">
                  {d.mission.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {d.labsList && (
          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Laboratories</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {d.labsList.map((l) => (
                <span key={l} className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">
                  {l}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Staff */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">
              {d.kind === "branch" ? "Faculty" : "Team"}
              <span className="ml-2 text-sm text-muted-foreground font-normal">({d.staff.length})</span>
            </h3>
            <Link to="/faculty" className="text-xs font-semibold text-primary hover:text-gold inline-flex items-center gap-1">
              All faculty <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {d.staff.map((s) => (
              <StaffCard key={s.name} s={s} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DepartmentsPage() {
  const [active, setActive] = useState(DEPTS[0].id);

  return (
    <>
      <PageHeader
        eyebrow="Academics"
        title="Departments & Sections"
        description="Two diploma engineering branches supported by a strong general teaching section and an efficient administrative office."
        breadcrumb={[{ label: "Departments" }]}
        image={headerImg}
      />

      <Section>
        <Tabs value={active} onValueChange={setActive} className="w-full">
          {/* Custom tab list — large cards */}
          <TabsList className="h-auto p-1.5 bg-muted/60 grid grid-cols-2 md:grid-cols-4 gap-1.5 w-full">
            {DEPTS.map((d) => {
              const Icon = d.icon;
              return (
                <TabsTrigger
                  key={d.id}
                  value={d.id}
                  className="flex items-center gap-2 justify-start px-3 py-2.5 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <div className="text-left min-w-0">
                    <div className="text-xs font-mono tracking-wider opacity-70">{d.code}</div>
                    <div className="text-sm font-semibold truncate">{d.shortName}</div>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {DEPTS.map((d) => (
            <TabsContent key={d.id} value={d.id} className="mt-6">
              <DepartmentPanel d={d} />
            </TabsContent>
          ))}
        </Tabs>

        <p className="mt-6 text-xs text-muted-foreground text-center">
          Note: Government Polytechnic, Anakapalli offers two diploma branches — <span className="font-semibold text-foreground">CME</span> and <span className="font-semibold text-foreground">ECE</span>. The General Section and Administrative Office are support units that serve both branches.
        </p>
      </Section>
    </>
  );
}
