import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Cpu, Radio, BookOpen, Building2, ArrowRight,
  FlaskConical, Users, Award, GraduationCap, Briefcase, Calendar,
} from "lucide-react";
import headerImg   from "@/assets/gallery-lab.jpg";
import cmeImg      from "@/assets/dept-cme.jpg";
import eceImg      from "@/assets/dept-ece.jpg";
import generalImg  from "@/assets/dept-general.jpg";
import adminImg    from "@/assets/dept-admin.jpg";
import labImg      from "@/assets/gallery-lab.jpg";
import workshopImg from "@/assets/gallery-workshop.jpg";
import classImg    from "@/assets/gallery-classroom.jpg";
import eventImg    from "@/assets/gallery-event.jpg";

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title: "Departments — Diploma Programs in Computer Engineering & ECE" },
      { name: "description", content: "Computer Engineering, Electronics and Communication Engineering, General Section and Administrative Office. Explore faculty, labs and curriculum." },
    ],
  }),
  component: DepartmentsPage,
});

// ─── Types ────────────────────────────────────────────────────────────────────

type Staff = {
  name: string; role: string; qual: string; exp: number; spec: string; photo?: string;
};

type Lab = {
  name: string; desc: string; photo: string;
};

type Dept = {
  id: string; code: string; name: string; shortName: string;
  kind: "branch" | "section";
  icon: typeof Cpu;
  image: string;
  desc: string;
  vision?: string;
  mission?: string[];
  intake?: number;
  staff: Staff[];
  labs?: Lab[];
};

// ─── Department Data ──────────────────────────────────────────────────────────

const DEPTS: Dept[] = [
  {
    id: "cme", code: "CME", name: "Computer Engineering",
    shortName: "Computer Engg.", kind: "branch", icon: Cpu, image: cmeImg,
    desc: "Programming foundations, web development, databases, computer networks, AI essentials and cybersecurity basics.",
    vision: "To empower students to be technologically adept, innovative and self-motivated citizens with strong human values and high-quality skills who contribute meaningfully to the ever-changing field of Computer Engineering.",
    mission: [
      "Prepare diploma students capable of taking pivotal roles across modern Computer Engineering.",
      "Ground students in core concepts so they can apply them creatively across engineering domains.",
      "Sensitise students to environmental, safety and economic context.",
      "Build technical skill through intensive training in industry tools and project work.",
    ],
    intake: 66,
    staff: [
      { name: "Sri M. Subramanyam",     role: "Head of Department", qual: "M.Tech (CSE)", exp: 20, spec: "Computer Engineering"          },
      { name: "Sri B. Narasimha Murthy",role: "Senior Lecturer",    qual: "M.Tech (CSE)", exp: 18, spec: "Programming and Data Structures" },
      { name: "Sri L. Mohana Tirumala", role: "Lecturer",           qual: "M.Tech (CSE)", exp: 10, spec: "Web Technologies"               },
      { name: "Sri Girish Reddy Ginni", role: "Lecturer",           qual: "M.Tech (CSE)", exp: 9,  spec: "Computer Networks"              },
      { name: "Sri Suresh Barukula",    role: "Lecturer",           qual: "M.Tech (CSE)", exp: 8,  spec: "DBMS and Software Engineering"  },
      { name: "Smt. Munji Gayatri",     role: "Lecturer",           qual: "M.Tech (CSE)", exp: 7,  spec: "Operating Systems"              },
      { name: "Smt. Ch. Sarojini",      role: "Lecturer",           qual: "M.Tech (CSE)", exp: 6,  spec: "Python and AI Essentials"       },
    ],
    labs: [
      { name: "Programming Lab",       photo: labImg,      desc: "Hands-on coding lab equipped with 60 computers. Students practise C, Java and Python programming." },
      { name: "Web Technology Lab",    photo: labImg,      desc: "Full-stack web development using HTML, CSS, JavaScript, React and backend frameworks." },
      { name: "DBMS Lab",              photo: labImg,      desc: "Database design, SQL querying and administration using Oracle and MySQL." },
      { name: "Networks Lab",          photo: eventImg,    desc: "CISCO-certified networking lab covering LAN, WAN, routing and switching fundamentals." },
      { name: "AI and ML Lab",         photo: labImg,      desc: "Machine learning experiments using Python libraries — scikit-learn, TensorFlow and data visualisation tools." },
      { name: "Project Lab",           photo: workshopImg, desc: "Dedicated space for final-year project work, prototype development and industry-aligned mini-projects." },
    ],
  },
  {
    id: "ece", code: "ECE", name: "Electronics and Communication Engineering",
    shortName: "Electronics and Comm.", kind: "branch", icon: Radio, image: eceImg,
    desc: "Analog and digital electronics, microcontrollers, communication systems, embedded design, IoT and VLSI fundamentals.",
    vision: "To enrich the teaching and learning process and produce technically capable manpower with the exposure needed by industry, driving socio-economic development through excellence in Electronics and Communication Engineering.",
    mission: [
      "Educate students with state-of-the-art technologies to meet growing industry challenges.",
      "Develop skills through continuous lab upgrades and active industry interaction.",
      "Provide technical expertise alongside professional ethics aligned with societal needs.",
      "Build a strong foundation that enables lifelong and continuing education.",
    ],
    intake: 66,
    staff: [
      { name: "Sri P. Srinivas",          role: "Head of Department", qual: "M.Tech (ECE)", exp: 20, spec: "Communication Systems"          },
      { name: "Sri A. Sri Ranga Raju",    role: "Lecturer",           qual: "M.Tech (ECE)", exp: 14, spec: "Analog and Digital Electronics" },
      { name: "Sri G.M. Soma Sekhar",     role: "Lecturer",           qual: "M.Tech (ECE)", exp: 12, spec: "Embedded Systems"               },
      { name: "Sri Dasari Venkanna",      role: "Lecturer",           qual: "M.Tech (ECE)", exp: 11, spec: "Microcontrollers and IoT"        },
      { name: "Sri Ielapaka Sunilkumar",  role: "Lecturer",           qual: "M.Tech (ECE)", exp: 10, spec: "VLSI and Digital Design"        },
      { name: "Smt. Bonthu Srikavya",     role: "Lecturer",           qual: "M.Tech (ECE)", exp: 7,  spec: "Signal Processing"              },
    ],
    labs: [
      { name: "Electronics Lab",          photo: workshopImg, desc: "Basic and advanced electronics experiments using discrete components, oscilloscopes and function generators." },
      { name: "Communication Systems Lab",photo: workshopImg, desc: "AM, FM and digital communication experiments. Spectrum analysers and signal processing equipment." },
      { name: "Embedded Systems Lab",     photo: workshopImg, desc: "Microcontroller programming using Arduino, PIC and ARM Cortex boards with real-time project work." },
      { name: "VLSI Lab",                 photo: eventImg,    desc: "Digital circuit simulation and design using EDA tools including Xilinx ISE and Cadence." },
      { name: "Microprocessor Lab",       photo: workshopImg, desc: "8085 and 8086 microprocessor architecture, assembly programming and interfacing experiments." },
      { name: "IoT Lab",                  photo: labImg,      desc: "Internet of Things projects using Raspberry Pi, ESP32 and cloud platforms for smart system development." },
    ],
  },
  {
    id: "general", code: "GS", name: "General Section",
    shortName: "General Section", kind: "section", icon: BookOpen, image: generalImg,
    desc: "Foundation subjects including Mathematics, Physics, Chemistry and English that underpin both engineering branches and shape well-rounded diploma graduates.",
    staff: [
      { name: "Dr. Govinda Rao Konkyana",  role: "Head of General Section", qual: "Ph.D",         exp: 22, spec: "Physics"                },
      { name: "Sri Y. Srinivasa Rao",      role: "Senior Lecturer",         qual: "M.Sc, M.Phil", exp: 18, spec: "Chemistry"              },
      { name: "Sri Reddi Ganesh Kumar",    role: "Lecturer",                qual: "M.Sc (Maths)", exp: 12, spec: "Engineering Mathematics" },
      { name: "Smt. Botcha Uma Maheswari", role: "Contract Lecturer",       qual: "M.A. English", exp: 6,  spec: "Communication Skills"    },
    ],
    labs: [
      { name: "Physics Lab",              photo: workshopImg, desc: "Experiments covering mechanics, optics, electricity and magnetism aligned with the first-year engineering physics syllabus." },
      { name: "Chemistry Lab",            photo: workshopImg, desc: "Qualitative and quantitative analysis experiments in applied chemistry for engineering applications." },
      { name: "Language and Communication Lab", photo: classImg, desc: "Spoken English, presentation skills and professional communication training for all students." },
    ],
  },
  {
    id: "admin", code: "ADM", name: "Administrative Office",
    shortName: "Administration", kind: "section", icon: Building2, image: adminImg,
    desc: "The office handles admissions, records, accounts, examination coordination and day-to-day administration of the polytechnic.",
    staff: [
      { name: "Prof. I.V.S.S. Srinivasa Rao", role: "Principal",              qual: "M.E.", exp: 30, spec: "Technical Education and Administration" },
      { name: "Sri P.V. Srinivasa Rao",        role: "Administrative Officer", qual: "—",    exp: 25, spec: "Office Administration"                  },
      { name: "Sri P.V. Ravi Prakash",          role: "Office Superintendent",  qual: "—",    exp: 22, spec: "Records and Accounts"                   },
    ],
  },
];

// ─── Staff Card ───────────────────────────────────────────────────────────────

function initials(n: string) {
  return n.split(" ").filter((p) => /^[A-Z]/.test(p)).slice(0, 2).map((p) => p[0]).join("");
}

function StaffCard({ s }: { s: Staff }) {
  return (
    <div className="group relative rounded-xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-elevated hover:-translate-y-0.5 transition">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/70">
        {s.photo ? (
          <img src={s.photo} alt={s.name} loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display font-semibold text-primary-foreground/95 text-5xl tracking-wide">
              {initials(s.name) || "?"}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-gold">{s.role}</div>
          <h4 className="font-display font-semibold text-sm text-white leading-tight line-clamp-2">{s.name}</h4>
        </div>
      </div>
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

// ─── Lab Card ─────────────────────────────────────────────────────────────────

function LabCard({ lab }: { lab: Lab }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-elevated hover:-translate-y-0.5 transition group">
      <div className="relative h-44 overflow-hidden">
        <img
          src={lab.photo}
          alt={lab.name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/90 text-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
            <FlaskConical className="h-3 w-3" /> Lab
          </div>
          <h4 className="mt-1.5 font-display text-base font-bold text-white leading-snug">{lab.name}</h4>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">{lab.desc}</p>
      </div>
    </div>
  );
}

// ─── Department Panel ─────────────────────────────────────────────────────────

function DepartmentPanel({ d }: { d: Dept }) {
  const Icon = d.icon;
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">

      {/* Hero */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img
          src={d.image} alt={d.name}
          width={1280} height={800} loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
        <div className="relative h-full p-6 md:p-8 flex flex-col justify-between text-white">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
              d.kind === "branch" ? "bg-gold text-primary" : "bg-white/15 text-white border border-white/25"
            }`}>
              {d.kind === "branch" ? "Diploma Branch" : "Support Section"}
            </span>
            <span className="font-mono text-[11px] tracking-widest opacity-80">{d.code}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 backdrop-blur">
              <Icon className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold leading-tight">{d.name}</h2>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed max-w-3xl">{d.desc}</p>

        {/* Stats */}
        {d.kind === "branch" && (
          <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
            {[
              [Users,        `${d.intake}`,         "Annual intake"   ],
              [Award,        `${d.staff.length}`,   "Faculty members" ],
              [FlaskConical, `${d.labs?.length ?? 0}`, "Laboratories" ],
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

        {/* Vision and Mission */}
        {d.vision && (
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-border p-5 bg-muted/30">
              <div className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">Vision</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.vision}</p>
            </div>
            {d.mission && (
              <div className="rounded-xl border border-border p-5 bg-muted/30">
                <div className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">Mission</div>
                <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-4">
                  {d.mission.map((m) => <li key={m}>{m}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ── FACULTY (shown first) ── */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">
              {d.kind === "branch" ? "Faculty" : "Team"}
              <span className="ml-2 text-sm text-muted-foreground font-normal">({d.staff.length})</span>
            </h3>
            <Link to="/faculty" className="text-xs font-semibold text-primary hover:text-gold inline-flex items-center gap-1">
              All faculty <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {d.staff.map((s) => <StaffCard key={s.name} s={s} />)}
          </div>
        </div>

        {/* ── LABORATORIES (shown after faculty) ── */}
        {d.labs && d.labs.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                <FlaskConical className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Laboratories</h3>
                <p className="text-xs text-muted-foreground">{d.labs.length} dedicated lab spaces</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {d.labs.map((lab) => <LabCard key={lab.name} lab={lab} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function DepartmentsPage() {
  const [active, setActive] = useState(DEPTS[0].id);

  return (
    <>
      <PageHeader
        eyebrow="Academics"
        title="Departments and Sections"
        description="Two diploma engineering branches supported by a strong general teaching section and an efficient administrative office."
        breadcrumb={[{ label: "Departments" }]}
        image={headerImg}
      />

      <Section>
        <Tabs value={active} onValueChange={setActive} className="w-full">
          <TabsList className="h-auto p-1.5 bg-muted/60 grid grid-cols-2 md:grid-cols-4 gap-1.5 w-full">
            {DEPTS.map((d) => {
              const Icon = d.icon;
              return (
                <TabsTrigger
                  key={d.id} value={d.id}
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
          Two diploma branches are offered: <span className="font-semibold text-foreground">CME</span> and <span className="font-semibold text-foreground">ECE</span>. The General Section and Administrative Office are support units serving both branches.
        </p>
      </Section>
    </>
  );
}