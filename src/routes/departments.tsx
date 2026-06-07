import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Cpu, Radio, BookOpen, Building2, ArrowLeft, ArrowRight,
  FlaskConical, GraduationCap, Clock, Zap, Target, Eye,
  ChevronRight, Users, Award, Monitor,
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
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/departments")({
  component: DepartmentsPage,
});

// ─── Types ────────────────────────────────────────────────────────────────────

type Staff = { name: string; role: string; qual: string; exp: number; spec: string };
type Lab   = { name: string; desc: string; photo: string; highlights: string[] };
type Dept  = {
  id: string; code: string; name: string; shortName: string;
  kind: "branch" | "section"; icon: typeof Cpu;
  accent: string; accentLight: string; accentText: string;
  image: string; coverGradient: string;
  tagline: string; desc: string;
  vision?: string; mission?: string[];
  intake?: number; staff: Staff[]; labs?: Lab[];
  subjects?: string[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const DEPTS: Dept[] = [
  {
    id: "cme", code: "CME", name: "Computer Engineering", shortName: "Computer Engg.",
    kind: "branch", icon: Cpu,
    accent: "bg-blue-600", accentLight: "bg-blue-50", accentText: "text-blue-700",
    image: cmeImg, coverGradient: "from-blue-950/90 via-blue-900/60 to-transparent",
    tagline: "Build the software that runs the world.",
    desc: "The CME program trains students in programming, web development, databases, networking, operating systems, AI essentials and cybersecurity. Graduates join software companies, IT firms and pursue B.Tech via ECET.",
    vision: "To empower students to be technologically adept, innovative and self-motivated citizens with strong human values who contribute meaningfully to the ever-changing field of Computer Engineering.",
    mission: [
      "Prepare diploma students for pivotal roles across modern Computer Engineering.",
      "Ground students in core concepts so they can apply them creatively across engineering domains.",
      "Sensitise students to environmental, safety and economic context of technology.",
      "Build technical skill through intensive training in industry tools and project work.",
    ],
    intake: 66,
    subjects: ["C and C++", "Data Structures", "Web Technologies", "DBMS", "Computer Networks", "Operating Systems", "Python", "AI Essentials", "Cybersecurity Basics"],
    staff: [
      { name: "Sri M. Subramanyam",     role: "Head of Department", qual: "M.Tech (CSE)", exp: 20, spec: "Computer Engineering"           },
      { name: "Sri B. Narasimha Murthy",role: "Senior Lecturer",    qual: "M.Tech (CSE)", exp: 18, spec: "Programming and Data Structures"  },
      { name: "Sri L. Mohana Tirumala", role: "Lecturer",           qual: "M.Tech (CSE)", exp: 10, spec: "Web Technologies"                },
      { name: "Sri Girish Reddy Ginni", role: "Lecturer",           qual: "M.Tech (CSE)", exp: 9,  spec: "Computer Networks"               },
      { name: "Sri Suresh Barukula",    role: "Lecturer",           qual: "M.Tech (CSE)", exp: 8,  spec: "DBMS and Software Engineering"   },
      { name: "Smt. Munji Gayatri",     role: "Lecturer",           qual: "M.Tech (CSE)", exp: 7,  spec: "Operating Systems"               },
      { name: "Smt. Ch. Sarojini",      role: "Lecturer",           qual: "M.Tech (CSE)", exp: 6,  spec: "Python and AI Essentials"        },
    ],
    labs: [
      { name: "Programming Lab",    photo: labImg,      desc: "60-seat coding lab for C, Java, Python and project work.",                       highlights: ["60 Computers", "Java & Python", "Linux Environment"]      },
      { name: "Web Technology Lab", photo: labImg,      desc: "Full-stack development lab with React, Node.js and database integration.",        highlights: ["HTML/CSS/JS", "React & Node", "MySQL"]                   },
      { name: "DBMS Lab",           photo: eventImg,    desc: "Database design, SQL and NoSQL querying with Oracle and MySQL servers.",          highlights: ["Oracle DB", "MySQL", "SQL Practicals"]                   },
      { name: "Networks Lab",       photo: workshopImg, desc: "CISCO-certified networking setup for LAN, WAN, routing and switching.",          highlights: ["CISCO Certified", "Routing & Switching", "Packet Tracer"] },
      { name: "AI and ML Lab",      photo: labImg,      desc: "Machine learning experiments using scikit-learn, TensorFlow and Jupyter.",       highlights: ["Python/TF", "Jupyter Notebooks", "Datasets"]            },
      { name: "Project Lab",        photo: workshopImg, desc: "Final-year project space for prototype development and industry mini-projects.", highlights: ["Open 8AM–8PM", "IoT Kits", "3D Printer"]                },
    ],
  },
  {
    id: "ece", code: "ECE", name: "Electronics and Communication Engineering", shortName: "Electronics and Comm.",
    kind: "branch", icon: Radio,
    accent: "bg-purple-600", accentLight: "bg-purple-50", accentText: "text-purple-700",
    image: eceImg, coverGradient: "from-purple-950/90 via-purple-900/60 to-transparent",
    tagline: "Engineer the signals that connect humanity.",
    desc: "The ECE program covers analog and digital electronics, microcontrollers, communication systems, embedded design, IoT and VLSI. Graduates work in electronics, communication and automation industries.",
    vision: "To enrich the teaching and learning process and produce technically capable manpower with industry exposure, driving socio-economic development through excellence in Electronics and Communication Engineering.",
    mission: [
      "Educate students with state-of-the-art technologies to meet growing industry challenges.",
      "Develop skills through continuous lab upgrades and active industry interaction.",
      "Provide technical expertise alongside professional ethics aligned with societal needs.",
      "Build a strong foundation that enables lifelong and continuing education.",
    ],
    intake: 66,
    subjects: ["Basic Electronics", "Digital Electronics", "Microcontrollers", "Communication Systems", "Embedded Systems", "VLSI Design", "Signal Processing", "IoT", "Microprocessors"],
    staff: [
      { name: "Sri P. Srinivas",         role: "Head of Department", qual: "M.Tech (ECE)", exp: 20, spec: "Communication Systems"          },
      { name: "Sri A. Sri Ranga Raju",   role: "Lecturer",           qual: "M.Tech (ECE)", exp: 14, spec: "Analog and Digital Electronics" },
      { name: "Sri G.M. Soma Sekhar",    role: "Lecturer",           qual: "M.Tech (ECE)", exp: 12, spec: "Embedded Systems"               },
      { name: "Sri Dasari Venkanna",     role: "Lecturer",           qual: "M.Tech (ECE)", exp: 11, spec: "Microcontrollers and IoT"       },
      { name: "Sri Ielapaka Sunilkumar", role: "Lecturer",           qual: "M.Tech (ECE)", exp: 10, spec: "VLSI and Digital Design"        },
      { name: "Smt. Bonthu Srikavya",   role: "Lecturer",           qual: "M.Tech (ECE)", exp: 7,  spec: "Signal Processing"             },
    ],
    labs: [
      { name: "Electronics Lab",          photo: workshopImg, desc: "Experiments with discrete components, oscilloscopes and function generators.", highlights: ["Oscilloscopes", "Signal Generators", "Breadboards"] },
      { name: "Communication Systems Lab",photo: eventImg,    desc: "AM, FM, digital communication circuits and spectrum analysers.",               highlights: ["Spectrum Analyser", "AM/FM Kits", "DSP Boards"]  },
      { name: "Embedded Systems Lab",     photo: workshopImg, desc: "Arduino, PIC and ARM Cortex microcontroller programming and interfacing.",     highlights: ["Arduino", "ARM Cortex", "Raspberry Pi"]          },
      { name: "VLSI Lab",                 photo: labImg,      desc: "Digital circuit simulation using Xilinx ISE and Cadence EDA tools.",           highlights: ["Xilinx ISE", "Cadence", "FPGA Boards"]           },
      { name: "Microprocessor Lab",       photo: workshopImg, desc: "8085 and 8086 microprocessor architecture, assembly language programming.",    highlights: ["8085 Trainer", "8086 Kit", "Assembly Language"]  },
      { name: "IoT Lab",                  photo: labImg,      desc: "Smart system development using ESP32, Raspberry Pi and cloud platforms.",      highlights: ["ESP32", "Cloud IoT", "Sensors & Actuators"]      },
    ],
  },
  {
    id: "general", code: "GS", name: "General Section", shortName: "General Section",
    kind: "section", icon: BookOpen,
    accent: "bg-emerald-600", accentLight: "bg-emerald-50", accentText: "text-emerald-700",
    image: generalImg, coverGradient: "from-emerald-950/90 via-emerald-900/60 to-transparent",
    tagline: "Strong fundamentals. Confident engineers.",
    desc: "The General Section teaches first-year foundation subjects — Mathematics, Physics, Chemistry and English — that underpin both engineering branches. Faculty here shape the analytical and communication skills of every student.",
    subjects: ["Engineering Mathematics", "Engineering Physics", "Engineering Chemistry", "English and Communication Skills"],
    staff: [
      { name: "Dr. Govinda Rao Konkyana",  role: "Head of General Section", qual: "Ph.D",         exp: 22, spec: "Physics"                },
      { name: "Sri Y. Srinivasa Rao",      role: "Senior Lecturer",         qual: "M.Sc, M.Phil", exp: 18, spec: "Chemistry"              },
      { name: "Sri Reddi Ganesh Kumar",    role: "Lecturer",                qual: "M.Sc (Maths)", exp: 12, spec: "Engineering Mathematics" },
      { name: "Smt. Botcha Uma Maheswari",role: "Contract Lecturer",        qual: "M.A. English", exp: 6,  spec: "Communication Skills"   },
    ],
    labs: [
      { name: "Physics Lab",                    photo: workshopImg, desc: "Mechanics, optics, electricity and magnetism experiments per first-year syllabus.", highlights: ["Optical Bench", "Meter Bridges", "Cathode Ray Tubes"] },
      { name: "Chemistry Lab",                  photo: workshopImg, desc: "Qualitative and quantitative analysis in applied engineering chemistry.",           highlights: ["Titration Sets", "Calorimeter", "Distillation Kits"] },
      { name: "Language and Communication Lab", photo: classImg,    desc: "Spoken English, presentations and professional communication training.",            highlights: ["Headphone Sets", "Language Software", "Group Discussion"] },
    ],
  },
  {
    id: "admin", code: "ADM", name: "Administrative Office", shortName: "Administration",
    kind: "section", icon: Building2,
    accent: "bg-slate-600", accentLight: "bg-slate-50", accentText: "text-slate-700",
    image: adminImg, coverGradient: "from-slate-950/90 via-slate-900/60 to-transparent",
    tagline: "Efficient administration. Smooth student experience.",
    desc: "The Administrative Office manages admissions, student records, fee collection, examination coordination, accounts and all day-to-day institutional operations. It is the backbone that keeps academic activity running smoothly.",
    staff: [
      { name: "Prof. I.V.S.S. Srinivasa Rao", role: "Principal",              qual: "M.E.", exp: 30, spec: "Technical Education and Administration" },
      { name: "Sri P.V. Srinivasa Rao",        role: "Administrative Officer", qual: "—",   exp: 25, spec: "Office Administration"                  },
      { name: "Sri P.V. Ravi Prakash",         role: "Office Superintendent",  qual: "—",   exp: 22, spec: "Records and Accounts"                   },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function initials(n: string) {
  return n.replace(/^(Sri|Smt|Dr|Prof)\.?\s+/i, "").split(" ").slice(0, 2).map(p => p[0]).join("").toUpperCase();
}

// ─── Staff Row ────────────────────────────────────────────────────────────────

function StaffRow({ s, accent, accentLight, accentText }: { s: Staff; accent: string; accentLight: string; accentText: string }) {
  const maxExp = 30;
  const pct    = Math.min((s.exp / maxExp) * 100, 100);

  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200">
      {/* Avatar */}
      <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white font-bold text-sm shadow-soft", accent)}>
        {initials(s.name)}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <h4 className="font-semibold text-sm text-foreground leading-snug">{s.name}</h4>
            <p className={cn("text-[11px] font-semibold uppercase tracking-wide mt-0.5", accentText)}>{s.role}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="rounded-full bg-muted text-muted-foreground px-2.5 py-0.5 text-[10px] font-semibold">{s.qual}</span>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-3">
          {/* Experience bar */}
          <div className="flex-1">
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
              <span>{s.spec}</span>
              <span className="font-semibold">{s.exp} yrs</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className={cn("h-full rounded-full opacity-70", accent)} style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Lab Card ─────────────────────────────────────────────────────────────────

function LabCard({ lab, featured = false, accent }: { lab: Lab; featured?: boolean; accent: string }) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl border border-border shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-300",
      featured ? "md:col-span-2 md:row-span-2" : ""
    )}>
      {/* Photo */}
      <div className={cn("overflow-hidden", featured ? "h-64" : "h-44")}>
        <img src={lab.photo} alt={lab.name} loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase text-white mb-1.5 opacity-80", accent)}>
          <FlaskConical className="h-2.5 w-2.5" /> Lab
        </div>
        <h4 className="font-display text-base font-bold text-white leading-snug">{lab.name}</h4>
        <p className="text-[11px] text-white/70 mt-1 leading-relaxed line-clamp-2">{lab.desc}</p>
      </div>

      {/* Highlights — shown on hover */}
      <div className="absolute top-3 right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {lab.highlights.map(h => (
          <span key={h} className="rounded-full bg-black/60 backdrop-blur text-white text-[9px] font-semibold px-2 py-0.5 text-right">
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Department Detail View ───────────────────────────────────────────────────

function DeptDetail({ dept, onBack }: { dept: Dept; onBack: () => void }) {
  const Icon = dept.icon;
  const [activeSection, setActiveSection] = useState<"overview" | "faculty" | "labs">("overview");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const sections = [
    { id: "overview", label: "Overview",  icon: Eye    },
    { id: "faculty",  label: "Faculty",   icon: Users  },
    ...(dept.labs ? [{ id: "labs", label: "Laboratories", icon: FlaskConical }] : []),
  ] as const;

  return (
    <div className="min-h-screen bg-background animate-fade-in">

      {/* Full-bleed hero */}
      <div className="relative h-64 md:h-[420px] overflow-hidden">
        <img src={dept.image} alt={dept.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className={cn("absolute inset-0 bg-gradient-to-r", dept.coverGradient)} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Back */}
        <button onClick={onBack}
          className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/25 transition">
          <ArrowLeft className="h-4 w-4" /> All Departments
        </button>

        {/* Dept info */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 md:px-10 md:pb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className={cn("grid h-10 w-10 place-items-center rounded-xl text-white shadow-lg", dept.accent)}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <span className="rounded-full bg-white/15 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5">
                {dept.kind === "branch" ? "Diploma Branch" : "Support Section"} · {dept.code}
              </span>
            </div>
          </div>
          <h1 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight">{dept.name}</h1>
          <p className="mt-1 text-sm text-white/70 italic">"{dept.tagline}"</p>
        </div>
      </div>

      {/* Stats bar (branches only) */}
      {dept.kind === "branch" && (
        <div className="border-b border-border bg-card">
          <div className="container-page grid grid-cols-3 divide-x divide-border">
            {[
              { icon: Users,       v: `${dept.intake}`,         l: "Annual Intake"   },
              { icon: GraduationCap, v: `${dept.staff.length}`, l: "Faculty Members" },
              { icon: FlaskConical,v: `${dept.labs?.length}`,   l: "Laboratories"    },
            ].map(({ icon: Ico, v, l }) => (
              <div key={l} className="flex items-center gap-3 py-4 px-4 md:px-8">
                <Ico className={cn("h-5 w-5 shrink-0", dept.accentText)} />
                <div>
                  <div className="font-display text-xl font-bold text-foreground">{v}</div>
                  <div className="text-[11px] text-muted-foreground">{l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section nav */}
      <div className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="container-page flex gap-1 py-2">
          {sections.map(({ id, label, icon: Ico }) => (
            <button key={id} onClick={() => setActiveSection(id as typeof activeSection)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition",
                activeSection === id
                  ? cn("text-white shadow-soft", dept.accent)
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}>
              <Ico className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container-page py-8 space-y-10">

        {/* ── Overview ── */}
        {activeSection === "overview" && (
          <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" /> About this Department
                </h2>
                <p className="text-muted-foreground leading-relaxed">{dept.desc}</p>
              </div>

              {/* Subjects */}
              {dept.subjects && (
                <div>
                  <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-primary" /> Key Subjects Taught
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dept.subjects.map(s => (
                      <span key={s} className={cn("rounded-full border px-3 py-1 text-xs font-semibold", dept.accentLight, dept.accentText, "border-transparent")}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Vision and Mission */}
              {dept.vision && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="h-4 w-4 text-gold" />
                      <span className="text-xs font-bold uppercase tracking-wider text-gold">Vision</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{dept.vision}</p>
                  </div>
                  {dept.mission && (
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="h-4 w-4 text-gold" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gold">Mission</span>
                      </div>
                      <ul className="space-y-2">
                        {dept.mission.map((m, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className={cn("mt-1 h-4 w-4 shrink-0 rounded-full grid place-items-center text-[9px] font-bold text-white", dept.accent)}>{i + 1}</span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar quick stats */}
            <div className="space-y-4">
              {dept.kind === "branch" && (
                <>
                  <div className={cn("rounded-2xl p-5 text-white", dept.accent)}>
                    <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Program Duration</p>
                    <p className="font-display text-3xl font-bold">3 Years</p>
                    <p className="text-sm opacity-80 mt-1">Six semesters · SBTET approved</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">After This Diploma</p>
                    <ul className="space-y-2 text-sm">
                      {["B.Tech via AP ECET (lateral entry)", "Industry placements", "AMIE qualification", "Government technical posts"].map(p => (
                        <li key={p} className="flex items-center gap-2">
                          <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="text-muted-foreground">{p}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/placements" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-gold">
                      View placement records <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </>
              )}
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Admission</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Admission is through POLYCET conducted by SBTET Andhra Pradesh.
                  {dept.intake && ` Total intake: ${dept.intake} seats per year.`}
                </p>
                <Link to="/admissions" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-gold">
                  Admission guide <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── Faculty ── */}
        {activeSection === "faculty" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">
                {dept.kind === "branch" ? "Department Faculty" : "Our Team"}
                <span className="ml-2 text-base font-normal text-muted-foreground">({dept.staff.length} members)</span>
              </h2>
            </div>

            {/* HOD spotlight */}
            {(() => {
              const hod = dept.staff[0];
              return (
                <div className={cn("rounded-2xl p-6 mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-5", dept.accentLight)}>
                  <div className={cn("grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-white font-bold text-xl shadow-soft", dept.accent)}>
                    {initials(hod.name)}
                  </div>
                  <div className="flex-1">
                    <span className={cn("text-[10px] font-bold uppercase tracking-widest", dept.accentText)}>{hod.role}</span>
                    <h3 className="font-display text-xl font-bold text-foreground mt-0.5">{hod.name}</h3>
                    <p className="text-sm text-muted-foreground">{hod.qual} &middot; {hod.exp} years experience &middot; {hod.spec}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-bold text-white", dept.accent)}>Department Head</span>
                  </div>
                </div>
              );
            })()}

            {/* Rest of faculty */}
            <div className="grid gap-3">
              {dept.staff.slice(1).map(s => (
                <StaffRow key={s.name} s={s} accent={dept.accent} accentLight={dept.accentLight} accentText={dept.accentText} />
              ))}
            </div>
          </div>
        )}

        {/* ── Labs ── */}
        {activeSection === "labs" && dept.labs && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className={cn("grid h-9 w-9 place-items-center rounded-xl text-white", dept.accent)}>
                <FlaskConical className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">Laboratories</h2>
                <p className="text-xs text-muted-foreground">{dept.labs.length} dedicated lab spaces. Hover a card to see equipment.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dept.labs.map((lab, i) => (
                <LabCard key={lab.name} lab={lab} featured={i === 0} accent={dept.accent} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Selection Card ───────────────────────────────────────────────────────────

function DeptCard({ dept, onClick, large = false }: { dept: Dept; onClick: () => void; large?: boolean }) {
  const Icon = dept.icon;
  return (
    <button onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-3xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
        large ? "aspect-[16/9] md:aspect-[16/8]" : "aspect-[4/3]"
      )}>
      {/* Background image */}
      <img src={dept.image} alt={dept.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />

      {/* Gradient layers */}
      <div className={cn("absolute inset-0 bg-gradient-to-r opacity-70", dept.coverGradient)} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Kind badge */}
      {dept.kind === "branch" && (
        <div className="absolute top-4 left-4">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1", dept.accent)}>
            <Zap className="h-2.5 w-2.5" /> Diploma Branch
          </span>
        </div>
      )}

      {/* Code */}
      <div className="absolute top-4 right-4">
        <span className="font-mono text-white/50 text-xs tracking-widest">{dept.code}</span>
      </div>

      {/* Main content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className={cn("font-display font-bold text-white drop-shadow-lg", large ? "text-2xl md:text-3xl" : "text-xl")}>
              {dept.name}
            </h3>
            <p className="mt-1 text-sm text-white/65 line-clamp-1 italic">"{dept.tagline}"</p>
            {dept.intake && (
              <div className="mt-3 flex items-center gap-3">
                <span className="text-white/60 text-xs flex items-center gap-1">
                  <Award className="h-3 w-3" /> {dept.intake} seats
                </span>
                <span className="text-white/60 text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 3 years
                </span>
              </div>
            )}
          </div>
          <div className={cn(
            "shrink-0 grid place-items-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110",
            dept.accent, large ? "h-14 w-14" : "h-12 w-12"
          )}>
            <Icon className={large ? "h-7 w-7" : "h-6 w-6"} />
          </div>
        </div>

        {/* Hover CTA */}
        <div className="mt-4 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-white bg-white/15 backdrop-blur border border-white/20 rounded-full px-4 py-1.5">
            Explore Department <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function DepartmentsPage() {
  const [selected, setSelected] = useState<Dept | null>(null);

  if (selected) {
    return <DeptDetail dept={selected} onBack={() => setSelected(null)} />;
  }

  const branches  = DEPTS.filter(d => d.kind === "branch");
  const sections  = DEPTS.filter(d => d.kind === "section");

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img src={headerImg} alt="Campus lab" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="container-page relative py-12 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Academics
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            Departments and Sections
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/70 max-w-xl leading-relaxed">
            Two three-year diploma engineering programs supported by a strong general teaching section.
            Select a department to explore faculty, labs and curriculum.
          </p>
          {/* Live stats */}
          <div className="mt-8 flex flex-wrap gap-6">
            {[["132", "Total seats"], ["2", "Diploma branches"], ["12+", "Laboratories"], ["25+", "Faculty members"]].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-bold text-gold">{v}</div>
                <div className="text-xs text-white/60 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-page py-10 space-y-6">

        {/* Diploma branches — large cards */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Diploma Engineering Branches
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {branches.map(d => (
              <DeptCard key={d.id} dept={d} onClick={() => { setSelected(d); window.scrollTo({ top: 0 }); }} large />
            ))}
          </div>
        </div>

        {/* Support sections — smaller cards */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Support Sections
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {sections.map(d => (
              <DeptCard key={d.id} dept={d} onClick={() => { setSelected(d); window.scrollTo({ top: 0 }); }} />
            ))}
          </div>
        </div>

        {/* Bottom info strip */}
        <div className="rounded-2xl border border-border bg-card p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Admission to CME and ECE is through <span className="font-semibold text-foreground">POLYCET</span> conducted by SBTET Andhra Pradesh.
          </p>
          <div className="flex gap-3 shrink-0">
            <Link to="/admissions" className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition">
              Admission Guide <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/placements" className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-accent transition">
              Placements
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}