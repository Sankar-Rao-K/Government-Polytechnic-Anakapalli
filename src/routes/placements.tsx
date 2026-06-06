import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  MapPin, TrendingUp, Users, Award, Briefcase,
  GraduationCap, BookMarked, Building, ChevronRight,
  ArrowRight, CheckCircle,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { cn } from "@/lib/utils";
import headerImg from "@/assets/gallery-event.jpg";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Careers and Placements — Diploma Programs" },
      { name: "description", content: "Three years of real campus placement data across leading companies. Industry placements, B.Tech via ECET, AMIE and government job pathways." },
    ],
  }),
  component: PlacementsPage,
});

// ─── Data ─────────────────────────────────────────────────────────────────────

type Branch = "CME" | "ECE" | "Both";

interface Company {
  name: string;
  location: string;
  branch: Branch;
  placed: number;
  lpa: number;
  domain?: string; // for auto logo loading
}

interface YearData {
  year: string;
  label: string;
  companies: Company[];
}

const YEARS: YearData[] = [
  {
    year: "2023-24", label: "2023 – 24",
    companies: [
      { name: "Thoughtworks",                       location: "Bangalore",       branch: "CME", placed: 3,  lpa: 8.0,  domain: "thoughtworks.com"  },
      { name: "Tecnics Integration Technologies",   location: "Hyderabad",       branch: "CME", placed: 16, lpa: 2.52, domain: "tecnics.com"        },
      { name: "HL Mando",                           location: "Andhra Pradesh",  branch: "Both",placed: 3,  lpa: 2.2,  domain: "hlmando.com"        },
      { name: "Texas Instruments",                  location: "Bangalore",       branch: "ECE", placed: 2,  lpa: 8.5,  domain: "ti.com"             },
      { name: "Instrumentation and Automation Solutions", location: "Anakapalli",branch: "ECE", placed: 6,  lpa: 3.0                               },
      { name: "Medhaservo",                         location: "Hyderabad",       branch: "ECE", placed: 3,  lpa: 3.0                               },
      { name: "Daikin",                             location: "Sri City",        branch: "ECE", placed: 28, lpa: 2.2,  domain: "daikin.com"         },
      { name: "Structural Solutions Pvt. Ltd.",     location: "Hyderabad",       branch: "ECE", placed: 2,  lpa: 2.4                               },
      { name: "Wheels India",                       location: "Chennai",         branch: "ECE", placed: 6,  lpa: 2.5,  domain: "wheelsindia.com"    },
      { name: "Moschip",                            location: "Hyderabad",       branch: "ECE", placed: 3,  lpa: 2.4,  domain: "moschip.com"        },
    ],
  },
  {
    year: "2024-25", label: "2024 – 25",
    companies: [
      { name: "SKL Associates",                     location: "Hyderabad",       branch: "CME", placed: 41, lpa: 1.44                              },
      { name: "Tecnics Integration Technologies",   location: "Hyderabad",       branch: "CME", placed: 10, lpa: 3.05, domain: "tecnics.com"        },
      { name: "Royal Enfield",                      location: "Chennai",         branch: "CME", placed: 15, lpa: 2.4,  domain: "royalenfield.com"   },
      { name: "Thoughtworks",                       location: "Bangalore",       branch: "ECE", placed: 1,  lpa: 8.0,  domain: "thoughtworks.com"   },
      { name: "Wipro",                              location: "Bangalore",       branch: "ECE", placed: 4,  lpa: 3.4,  domain: "wipro.com"          },
      { name: "Medhaservo",                         location: "Hyderabad",       branch: "ECE", placed: 10, lpa: 3.0                               },
      { name: "Efftronics",                         location: "Mangalagiri",     branch: "ECE", placed: 11, lpa: 2.8,  domain: "efftronics.com"     },
      { name: "Daikin",                             location: "Sri City",        branch: "ECE", placed: 23, lpa: 2.2,  domain: "daikin.com"         },
      { name: "HL Mando",                           location: "Andhra Pradesh",  branch: "ECE", placed: 10, lpa: 2.2,  domain: "hlmando.com"        },
      { name: "Royal Enfield",                      location: "Chennai",         branch: "ECE", placed: 6,  lpa: 2.4,  domain: "royalenfield.com"   },
      { name: "Dreams Technologies",                location: "Hyderabad",       branch: "ECE", placed: 1,  lpa: 1.44                              },
    ],
  },
  {
    year: "2025-26", label: "2025 – 26",
    companies: [
      { name: "Thoughtworks India Pvt. Ltd.",       location: "Bangalore",       branch: "CME", placed: 4,  lpa: 8.0,  domain: "thoughtworks.com"   },
      { name: "Tecnics",                            location: "Hyderabad",       branch: "CME", placed: 10, lpa: 3.05, domain: "tecnics.com"         },
      { name: "EmbSoft Solutions Pvt. Ltd.",        location: "Visakhapatnam",   branch: "CME", placed: 6,  lpa: 1.8                               },
      { name: "Sri BSG Enterprises",               location: "Kancheepuram",    branch: "CME", placed: 21, lpa: 2.02, domain: "motherson.com"       },
      { name: "Shri MK Embedded Solutions",        location: "Visakhapatnam",   branch: "CME", placed: 6,  lpa: 1.8                               },
      { name: "NDR Infotech",                       location: "Bangalore",       branch: "CME", placed: 6,  lpa: 1.8                               },
      { name: "Jain Engineering Services Pvt. Ltd.",location: "Visakhapatnam",  branch: "CME", placed: 6,  lpa: 1.8                               },
      { name: "HMIES Solution (OPC) Pvt. Ltd.",    location: "Visakhapatnam",   branch: "CME", placed: 6,  lpa: 1.8                               },
      { name: "HMI Engineering Services",           location: "Visakhapatnam",   branch: "CME", placed: 6,  lpa: 1.8                               },
      { name: "Moschip",                            location: "Hyderabad",       branch: "ECE", placed: 7,  lpa: 2.4,  domain: "moschip.com"        },
      { name: "Medhaservo",                         location: "Hyderabad",       branch: "ECE", placed: 2,  lpa: 3.0                               },
      { name: "Efftronics",                         location: "Mangalagiri",     branch: "ECE", placed: 11, lpa: 2.8,  domain: "efftronics.com"     },
      { name: "Daikin",                             location: "Sri City",        branch: "ECE", placed: 21, lpa: 2.4,  domain: "daikin.com"         },
      { name: "Tata Electronics Pvt. Ltd.",         location: "Hosur",           branch: "ECE", placed: 5,  lpa: 2.4,  domain: "tata.com"           },
      { name: "Wheels India",                       location: "Chennai",         branch: "ECE", placed: 1,  lpa: 2.4,  domain: "wheelsindia.com"    },
    ],
  },
];

// Notable recruiters for the logo showcase
const RECRUITERS = [
  { name: "Thoughtworks",    domain: "thoughtworks.com",  tag: "Top Package",   lpa: "₹8 LPA"  },
  { name: "Texas Instruments",domain: "ti.com",           tag: "Highest CTC",   lpa: "₹8.5 LPA"},
  { name: "Wipro",           domain: "wipro.com",          tag: "MNC",           lpa: "₹3.4 LPA"},
  { name: "Daikin",          domain: "daikin.com",         tag: "Most Hired",    lpa: "₹2.4 LPA"},
  { name: "Royal Enfield",   domain: "royalenfield.com",   tag: "Automotive",    lpa: "₹2.4 LPA"},
  { name: "Tata Electronics",domain: "tata.com",           tag: "Tata Group",    lpa: "₹2.4 LPA"},
  { name: "Motherson Sumi",  domain: "motherson.com",      tag: "Auto Parts",    lpa: "₹2.02 LPA"},
  { name: "Moschip",         domain: "moschip.com",        tag: "Semiconductor", lpa: "₹2.4 LPA"},
];

// ─── Auto Logo Component ──────────────────────────────────────────────────────

function CompanyLogo({
  domain, name, size = "md",
}: {
  domain?: string; name: string; size?: "sm" | "md" | "lg";
}) {
  const [phase, setPhase] = useState<"clearbit" | "favicon" | "fallback">(
    domain ? "clearbit" : "fallback"
  );

  const sz = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-16 w-16" : "h-12 w-12";
  const txtSz = size === "sm" ? "text-xs" : size === "lg" ? "text-2xl" : "text-base";

  if (phase === "fallback" || !domain) {
    return (
      <div className={cn(sz, "rounded-xl bg-primary/10 grid place-items-center text-primary font-bold shrink-0", txtSz)}>
        {name.charAt(0)}
      </div>
    );
  }

  const src = phase === "clearbit"
    ? `https://logo.clearbit.com/${domain}`
    : `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  return (
    <img
      src={src}
      alt={name}
      onError={() => setPhase(phase === "clearbit" ? "favicon" : "fallback")}
      className={cn(sz, "rounded-xl object-contain bg-white border border-border p-1 shrink-0")}
    />
  );
}

// ─── Branch Badge ─────────────────────────────────────────────────────────────

function BranchBadge({ branch }: { branch: Branch }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
      branch === "CME"  ? "bg-blue-100 text-blue-700"   :
      branch === "ECE"  ? "bg-purple-100 text-purple-700" :
                          "bg-slate-100 text-slate-600"
    )}>
      {branch}
    </span>
  );
}

// ─── Overall Stats ────────────────────────────────────────────────────────────

function OverallStats() {
  const all = YEARS.flatMap(y => y.companies);
  const total    = all.reduce((s, c) => s + c.placed, 0);
  const unique   = new Set(all.map(c => c.name)).size;
  const highest  = Math.max(...all.map(c => c.lpa));
  const avgLPA   = (all.reduce((s, c) => s + c.lpa, 0) / all.length).toFixed(1);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { icon: Users,     value: total,        suffix: "",   label: "Students Placed",   sub: "across all 3 years",   color: "from-blue-500   to-blue-700"   },
        { icon: Briefcase, value: unique,        suffix: "+",  label: "Unique Companies",  sub: "from across India",    color: "from-purple-500 to-purple-700" },
        { icon: TrendingUp,value: `₹${highest}L`,suffix: "",  label: "Highest Package",   sub: "Texas Instruments",    color: "from-emerald-500 to-emerald-700"},
        { icon: Award,     value: `₹${avgLPA}L`, suffix: "",  label: "Average Package",   sub: "2023 to 2026",         color: "from-amber-500  to-amber-700"  },
      ].map(({ icon: Icon, value, label, sub, color }) => (
        <div key={label} className={cn("rounded-2xl bg-gradient-to-br p-5 text-white shadow-elevated", color)}>
          <Icon className="h-6 w-6 opacity-80" />
          <div className="mt-3 font-display text-3xl font-bold">{value}</div>
          <div className="mt-1 font-semibold text-sm">{label}</div>
          <div className="text-xs opacity-70 mt-0.5">{sub}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Growth Chart ─────────────────────────────────────────────────────────────

function GrowthChart() {
  const data = YEARS.map(y => ({
    label: y.label,
    total: y.companies.reduce((s, c) => s + c.placed, 0),
    cme: y.companies.filter(c => c.branch === "CME" || c.branch === "Both").reduce((s, c) => s + c.placed, 0),
    ece: y.companies.filter(c => c.branch === "ECE" || c.branch === "Both").reduce((s, c) => s + c.placed, 0),
  }));
  const max = Math.max(...data.map(d => d.total));

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Year on Year Growth</p>
          <h3 className="font-display text-lg font-bold text-foreground mt-0.5">Students placed per batch</h3>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-500 inline-block" />CME</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-purple-500 inline-block" />ECE</span>
        </div>
      </div>
      <div className="flex items-end gap-4">
        {data.map((d) => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
            {/* Stacked bar */}
            <div className="w-full flex flex-col gap-0.5 justify-end" style={{ height: 160 }}>
              <div className="w-full rounded-t bg-purple-400 transition-all duration-700"
                style={{ height: `${(d.ece / max) * 140}px` }} />
              <div className="w-full rounded-t bg-blue-500 transition-all duration-700"
                style={{ height: `${(d.cme / max) * 140}px` }} />
            </div>
            {/* Total label */}
            <span className="font-display text-2xl font-bold text-foreground">{d.total}</span>
            <span className="text-xs text-muted-foreground font-medium">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Recruiters Grid ─────────────────────────────────────────────────────────

function RecruitersGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {RECRUITERS.map(({ name, domain, tag, lpa }) => (
        <div key={name}
          className="rounded-2xl border border-border bg-card p-4 flex flex-col items-center text-center gap-3 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all">
          <CompanyLogo domain={domain} name={name} size="lg" />
          <div>
            <div className="font-semibold text-sm text-foreground leading-snug">{name}</div>
            <div className="text-xs font-bold text-emerald-600 mt-0.5">{lpa}</div>
          </div>
          <span className="rounded-full bg-primary/8 text-primary px-2.5 py-0.5 text-[10px] font-semibold">{tag}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Company Card ─────────────────────────────────────────────────────────────

function CompanyCard({ c, maxPlaced }: { c: Company; maxPlaced: number }) {
  const pct = Math.round((c.placed / maxPlaced) * 100);
  return (
    <div className="rounded-2xl border border-border bg-background hover:bg-card hover:shadow-elevated transition-all p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <CompanyLogo domain={c.domain} name={c.name} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-foreground leading-snug line-clamp-2">{c.name}</div>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
            <MapPin className="h-3 w-3 shrink-0" /> {c.location}
          </div>
        </div>
        <BranchBadge branch={c.branch} />
      </div>
      {/* Visual bar */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-foreground">{c.placed} students placed</span>
          <span className="text-xs font-bold text-emerald-600">₹{c.lpa}L</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-700",
              c.branch === "CME" ? "bg-blue-500" : c.branch === "ECE" ? "bg-purple-500" : "bg-primary"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Year Panel ───────────────────────────────────────────────────────────────

function YearTabs() {
  const [activeYear, setActiveYear] = useState(0);
  const [filter, setFilter] = useState<"All" | "CME" | "ECE">("All");

  const year = YEARS[activeYear];
  const filtered = useMemo(
    () => year.companies.filter(c => filter === "All" || c.branch === filter || c.branch === "Both"),
    [year, filter]
  );
  const maxPlaced = Math.max(...filtered.map(c => c.placed));
  const stats = {
    total:    filtered.reduce((s, c) => s + c.placed, 0),
    cos:      filtered.length,
    highest:  Math.max(...filtered.map(c => c.lpa)),
  };

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      {/* Year selector */}
      <div className="grid grid-cols-3 border-b border-border">
        {YEARS.map((y, i) => {
          const tot = y.companies.reduce((s, c) => s + c.placed, 0);
          return (
            <button key={y.year} onClick={() => { setActiveYear(i); setFilter("All"); }}
              className={cn(
                "flex flex-col items-center gap-1 py-4 text-sm font-semibold transition-all border-r last:border-r-0 border-border",
                i === activeYear
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground"
              )}>
              <span className="text-base font-bold">{y.label}</span>
              <span className={cn("text-[11px] font-normal", i === activeYear ? "text-primary-foreground/70" : "text-muted-foreground")}>
                {tot} placed
              </span>
            </button>
          );
        })}
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 border-b border-border bg-muted/40">
        {[
          [`${stats.total}`, "Students"],
          [`${stats.cos}`,   "Companies"],
          [`₹${stats.highest}L`, "Highest"],
        ].map(([v, l]) => (
          <div key={l} className="flex flex-col items-center py-3 border-r last:border-r-0 border-border">
            <span className="font-display text-xl font-bold text-primary">{v}</span>
            <span className="text-[11px] text-muted-foreground">{l}</span>
          </div>
        ))}
      </div>

      {/* Branch filter */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <span className="text-xs text-muted-foreground font-medium">Filter:</span>
        {(["All", "CME", "ECE"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition",
              filter === f ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent"
            )}>
            {f}
          </button>
        ))}
      </div>

      {/* Company cards */}
      <div className="p-4 grid sm:grid-cols-2 gap-3">
        {filtered.map((c, i) => (
          <CompanyCard key={`${c.name}-${i}`} c={c} maxPlaced={maxPlaced} />
        ))}
      </div>
    </div>
  );
}

// ─── After Diploma Pathways ───────────────────────────────────────────────────

const PATHWAYS = [
  {
    icon: Briefcase,
    color: "bg-blue-600",
    border: "border-blue-200",
    bg: "bg-blue-50",
    title: "Industry Placements",
    subtitle: "Enter the workforce directly",
    link: "/placements",
    featured: true,
    para: "Our Training and Placement Cell connects final-year students with leading companies across India. Students undergo aptitude training, communication coaching and mock interviews before campus drives begin.",
    points: [
      "Companies like TCS, Wipro, Daikin, Royal Enfield and Tata Electronics recruit directly",
      "Packages range from 1.44 LPA to 8.5 LPA",
      "Both CME and ECE branches are eligible",
      "On-campus and off-campus drives organised each semester",
    ],
    locations: ["Hyderabad", "Bangalore", "Chennai", "Visakhapatnam", "Sri City"],
  },
  {
    icon: GraduationCap,
    color: "bg-emerald-600",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    title: "B.Tech via ECET",
    subtitle: "Lateral entry into second year",
    link: "/placements",
    featured: false,
    para: "The AP Engineering Common Entrance Test (ECET) allows diploma holders to join the second year of any B.Tech program at colleges affiliated with JNTUK, JNTUA and Andhra University.",
    points: [
      "Skip the first year of B.Tech entirely",
      "Faculty provide dedicated ECET coaching from the third semester",
      "Mock tests and previous-year paper practice are organised",
      "Counselling support for college and branch selection",
    ],
    locations: [],
  },
  {
    icon: BookMarked,
    color: "bg-amber-600",
    border: "border-amber-200",
    bg: "bg-amber-50",
    title: "AMIE",
    subtitle: "Study while you work",
    link: "/placements",
    featured: false,
    para: "The Associate Membership of the Institution of Engineers (India) is a degree-equivalent qualification recognised by AICTE and UGC. Diploma holders can pursue this without leaving their job.",
    points: [
      "No full-time college required — self-study and exams",
      "Recognised nationally as equivalent to a B.E. degree",
      "Two sections: Section A (basic sciences) and Section B (specialisation)",
      "Ideal for working students who want higher qualification",
    ],
    locations: [],
  },
  {
    icon: Building,
    color: "bg-rose-600",
    border: "border-rose-200",
    bg: "bg-rose-50",
    title: "Government Jobs",
    subtitle: "SSC, RRB, PSUs and state posts",
    link: "/placements",
    featured: false,
    para: "Diploma holders are eligible for a wide range of central and state government technical posts. Coaching and exam guidance are provided by the institution for interested students.",
    points: [
      "SSC JE (Junior Engineer) — Civil, Electrical, Mechanical, Electronics",
      "RRB JE and NTPC technical cadre",
      "BSNL, BEL and other PSU technical apprenticeships",
      "State government technical posts via APPSC",
    ],
    locations: [],
  },
];

function PathwayCard({ p }: { p: typeof PATHWAYS[0] }) {
  const Icon = p.icon;
  return (
    <div className={cn(
      "rounded-2xl border-2 p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:shadow-elevated",
      p.featured ? "border-blue-400 bg-blue-50" : `${p.border} bg-card`
    )}>
      <div className="flex items-start gap-3">
        <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white", p.color)}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-base font-bold text-foreground">{p.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{p.subtitle}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{p.para}</p>

      <ul className="space-y-2">
        {p.points.map((pt) => (
          <li key={pt} className="flex items-start gap-2 text-sm">
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
            <span className="text-foreground leading-snug">{pt}</span>
          </li>
        ))}
      </ul>

      {p.locations.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {p.locations.map(loc => (
            <span key={loc} className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium">
              <MapPin className="h-2.5 w-2.5 text-primary" /> {loc}
            </span>
          ))}
        </div>
      )}

      <Link to={p.link}
        className={cn(
          "mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-all",
          p.featured ? "text-blue-700 hover:gap-3" : "text-primary hover:gap-3"
        )}>
        Learn more <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function PlacementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers and Placements"
        title="Real placements. Real companies. Real packages."
        description="Three years of verified campus placement data with actual student counts and salary figures."
        breadcrumb={[{ label: "Placements" }]}
        image={headerImg}
      />

      {/* Overall stats */}
      <Section muted>
        <SectionHeading
          eyebrow="3-Year Summary"
          title="Placement highlights from 2023 to 2026"
          description="Across all three batches, students have been placed in leading companies across India."
          center
        />
        <div className="mt-8">
          <OverallStats />
        </div>
      </Section>

      {/* Growth chart */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <GrowthChart />
          <div>
            <SectionHeading
              eyebrow="Placement Growth"
              title="Consistent growth across all three batches."
            />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              From 72 students placed in 2023-24 to 132 in 2024-25, the placement record reflects
              the growing trust of industry in the quality of diploma engineers from this institution.
              Both CME and ECE branches attract recruiters from IT, electronics, manufacturing and
              automotive sectors.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {YEARS.map(y => {
                const tot = y.companies.reduce((s, c) => s + c.placed, 0);
                return (
                  <div key={y.year} className="rounded-xl border border-border bg-card p-3 text-center">
                    <div className="font-display text-2xl font-bold text-primary">{tot}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{y.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* Recruiters */}
      <Section muted>
        <SectionHeading
          eyebrow="Recruiters"
          title="Companies that hire our students"
          description="Logos are automatically loaded from each company's official domain."
        />
        <div className="mt-6">
          <RecruitersGrid />
        </div>
      </Section>

      {/* Year-wise data */}
      <Section>
        <SectionHeading
          eyebrow="Year-wise Records"
          title="Placement data by academic year"
          description="Switch between years and filter by branch to explore every placement record."
          center
        />
        <div className="mt-8">
          <YearTabs />
        </div>
      </Section>

      {/* After the diploma */}
      <Section muted>
        <SectionHeading
          eyebrow="After the Diploma"
          title="Four clear paths forward."
          description="A diploma opens four strong doors. Each path is well-supported and has clear next steps."
          center
        />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PATHWAYS.map(p => <PathwayCard key={p.title} p={p} />)}
        </div>
      </Section>

      {/* Support strip */}
      <Section>
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">Training and Placement Cell</p>
              <h2 className="mt-2 font-display text-2xl font-bold">We prepare students for every path.</h2>
              <p className="mt-3 text-sm opacity-85 leading-relaxed">
                Whether you want to work, study further or join the government sector, the
                placement cell and faculty team provide coaching, mock tests, documentation
                support and guidance through the entire process.
              </p>
            </div>
            <ul className="grid gap-3">
              {[
                "Aptitude and reasoning training from second year",
                "Communication skills and group discussion workshops",
                "Resume building and interview preparation",
                "ECET subject coaching and mock examinations",
                "AMIE and SSC JE guidance for interested students",
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm opacity-90">
                  <ChevronRight className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}