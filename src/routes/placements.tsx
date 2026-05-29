import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { useState } from "react";
import {
  GraduationCap, Briefcase, BookOpen, Compass, Quote,
  MapPin, TrendingUp, Users, Award, ChevronDown, ChevronUp,
} from "lucide-react";
import headerImg from "@/assets/gallery-event.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Placements — Government Polytechnic, Anakapalli" },
      { name: "description", content: "Campus placement data for 2023-26 at Government Polytechnic, Anakapalli — real student placements across leading companies." },
    ],
  }),
  component: PlacementsPage,
});

// ─── Data ─────────────────────────────────────────────────────────────────────

type Placement = {
  company: string;
  location: string;
  branch: "CME" | "ECE" | "Both";
  placed: number;
  lpa: number;
  logo: string;
};

type YearData = {
  year: string;
  label: string;
  placements: Placement[];
};

const YEARS: YearData[] = [
  {
    year: "2023-24",
    label: "2023 – 24",
    placements: [
      { company: "Thoughtworks", location: "Bangalore", branch: "CME", placed: 3, lpa: 8.0, logo: "https://logo.clearbit.com/thoughtworks.com" },
      { company: "Tecnics Integration Technologies", location: "Hyderabad", branch: "CME", placed: 16, lpa: 2.52, logo: "https://logo.clearbit.com/tecnics.com" },
      { company: "HL Mando", location: "Andhra Pradesh", branch: "Both", placed: 3, lpa: 2.2, logo: "https://logo.clearbit.com/hlmando.com" },
      { company: "Texas Instruments", location: "Bangalore", branch: "ECE", placed: 2, lpa: 8.5, logo: "https://logo.clearbit.com/ti.com" },
      { company: "Instrumentation & Automation Solutions", location: "Anakapalli", branch: "ECE", placed: 6, lpa: 3.0, logo: "" },
      { company: "Medhaservo", location: "Hyderabad", branch: "ECE", placed: 3, lpa: 3.0, logo: "" },
      { company: "Daikin", location: "Sri City", branch: "ECE", placed: 28, lpa: 2.2, logo: "https://logo.clearbit.com/daikin.com" },
      { company: "Structural Solutions Pvt. Ltd.", location: "Hyderabad", branch: "ECE", placed: 2, lpa: 2.4, logo: "" },
      { company: "Wheels India", location: "Chennai", branch: "ECE", placed: 6, lpa: 2.5, logo: "" },
      { company: "Moschip", location: "Hyderabad", branch: "ECE", placed: 3, lpa: 2.4, logo: "https://logo.clearbit.com/moschip.com" },
    ],
  },
  {
    year: "2024-25",
    label: "2024 – 25",
    placements: [
      { company: "SKL Associates", location: "Hyderabad", branch: "CME", placed: 41, lpa: 1.44, logo: "" },
      { company: "Tecnics Integration Technologies", location: "Hyderabad", branch: "CME", placed: 10, lpa: 3.05, logo: "https://logo.clearbit.com/tecnics.com" },
      { company: "Royal Enfield", location: "Chennai", branch: "CME", placed: 15, lpa: 2.4, logo: "https://logo.clearbit.com/royalenfield.com" },
      { company: "Thoughtworks", location: "Bangalore", branch: "ECE", placed: 1, lpa: 8.0, logo: "https://logo.clearbit.com/thoughtworks.com" },
      { company: "Wipro", location: "Bangalore", branch: "ECE", placed: 4, lpa: 3.4, logo: "https://logo.clearbit.com/wipro.com" },
      { company: "Medhaservo", location: "Hyderabad", branch: "ECE", placed: 10, lpa: 3.0, logo: "" },
      { company: "Efftronics", location: "Mangalagiri", branch: "ECE", placed: 11, lpa: 2.8, logo: "" },
      { company: "Daikin", location: "Sri City", branch: "ECE", placed: 23, lpa: 2.2, logo: "https://logo.clearbit.com/daikin.com" },
      { company: "HL Mando", location: "Andhra Pradesh", branch: "ECE", placed: 10, lpa: 2.2, logo: "https://logo.clearbit.com/hlmando.com" },
      { company: "Royal Enfield", location: "Chennai", branch: "ECE", placed: 6, lpa: 2.4, logo: "https://logo.clearbit.com/royalenfield.com" },
      { company: "Dreams Technologies", location: "Hyderabad", branch: "ECE", placed: 1, lpa: 1.44, logo: "" },
    ],
  },
  {
    year: "2025-26",
    label: "2025 – 26",
    placements: [
      { company: "Thoughtworks India Pvt. Ltd.", location: "Bangalore", branch: "CME", placed: 4, lpa: 8.0, logo: "https://logo.clearbit.com/thoughtworks.com" },
      { company: "Tecnics", location: "Hyderabad", branch: "CME", placed: 10, lpa: 3.05, logo: "https://logo.clearbit.com/tecnics.com" },
      { company: "EmbSoft Solutions Pvt. Ltd.", location: "Visakhapatnam", branch: "CME", placed: 6, lpa: 1.8, logo: "" },
      { company: "Sri BSG Enterprises (Motherson Sumi)", location: "Kancheepuram", branch: "CME", placed: 21, lpa: 2.02, logo: "https://logo.clearbit.com/motherson.com" },
      { company: "Shri MK Embedded Solutions", location: "Visakhapatnam", branch: "CME", placed: 6, lpa: 1.8, logo: "" },
      { company: "NDR Infotech", location: "Bangalore", branch: "CME", placed: 6, lpa: 1.8, logo: "" },
      { company: "Jain Engineering Services Pvt. Ltd.", location: "Visakhapatnam", branch: "CME", placed: 6, lpa: 1.8, logo: "" },
      { company: "HMIES Solution (OPC) Pvt. Ltd.", location: "Visakhapatnam", branch: "CME", placed: 6, lpa: 1.8, logo: "" },
      { company: "HMI Engineering Services", location: "Visakhapatnam", branch: "CME", placed: 6, lpa: 1.8, logo: "" },
      { company: "Moschip", location: "Hyderabad", branch: "ECE", placed: 7, lpa: 2.4, logo: "https://logo.clearbit.com/moschip.com" },
      { company: "Medhaservo", location: "Hyderabad", branch: "ECE", placed: 2, lpa: 3.0, logo: "" },
      { company: "Efftronics", location: "Mangalagiri", branch: "ECE", placed: 11, lpa: 2.8, logo: "" },
      { company: "Daikin", location: "Sri City", branch: "ECE", placed: 21, lpa: 2.4, logo: "https://logo.clearbit.com/daikin.com" },
      { company: "Tata Electronics Pvt. Ltd.", location: "Hosur", branch: "ECE", placed: 5, lpa: 2.4, logo: "https://logo.clearbit.com/tata.com" },
      { company: "Wheels India", location: "Chennai", branch: "ECE", placed: 1, lpa: 2.4, logo: "" },
    ],
  },
];

const PATHWAYS = [
  { icon: GraduationCap, t: "B.Tech via ECET", d: "Lateral entry into B.Tech second year in AP engineering colleges through the AP ECET examination." },
  { icon: BookOpen, t: "AMIE", d: "Associate Membership of the Institution of Engineers (India) — a degree-equivalent qualification pathway." },
  { icon: Briefcase, t: "Industry Placements", d: "Direct placements with PSUs and private companies for students choosing to enter the workforce immediately." },
  { icon: Compass, t: "Government Jobs", d: "Eligibility for SSC, RRB, BSNL, BEL and state-level technical posts that accept a diploma qualification." },
];

const TESTIMONIALS = [
  { name: "Ramesh K.", role: "B.Tech CSE, JNTUK (CME, 2023)", body: "The diploma fundamentals made my B.Tech transition smooth. ECET coaching from our faculty helped me secure a top college." },
  { name: "Sushma P.", role: "Diploma Engineer, BEL (ECE, 2022)", body: "The placement cell guided me through every step of the BEL selection. The labs gave me real hands-on confidence." },
  { name: "Karthik M.", role: "B.Tech ECE, Andhra University (ECE, 2024)", body: "Strong basics in communication systems and continuous mentoring made ECET feel manageable." },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getStats(data: YearData) {
  const total = data.placements.reduce((s, p) => s + p.placed, 0);
  const companies = data.placements.length;
  const highest = Math.max(...data.placements.map((p) => p.lpa));
  return { total, companies, highest };
}

function CompanyLogo({ logo, name }: { logo: string; name: string }) {
  const [err, setErr] = useState(false);
  if (!logo || err) {
    return (
      <div className="h-8 w-8 rounded-full bg-primary/10 grid place-items-center text-primary font-bold text-xs shrink-0">
        {name.charAt(0)}
      </div>
    );
  }
  return (
    <img
      src={logo}
      alt={name}
      onError={() => setErr(true)}
      className="h-8 w-8 rounded-full object-contain bg-white border border-border p-0.5 shrink-0"
    />
  );
}

function BranchBadge({ branch }: { branch: "CME" | "ECE" | "Both" }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
      branch === "CME" ? "bg-blue-100 text-blue-700" :
      branch === "ECE" ? "bg-purple-100 text-purple-700" :
      "bg-slate-100 text-slate-600"
    )}>
      {branch}
    </span>
  );
}

// ─── Year Panel ───────────────────────────────────────────────────────────────

function YearPanel({ data }: { data: YearData }) {
  const stats = getStats(data);
  const [filter, setFilter] = useState<"All" | "CME" | "ECE">("All");
  const [expanded, setExpanded] = useState(false);

  const filtered = data.placements.filter(
    (p) => filter === "All" || p.branch === filter || p.branch === "Both"
  );
  const visible = expanded ? filtered : filtered.slice(0, 6);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      {/* Year header */}
      <div className="bg-primary px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-primary-foreground/70 uppercase tracking-wider">Academic Year</p>
          <h3 className="font-display text-xl font-bold text-white">{data.label}</h3>
        </div>
        <div className="flex gap-4 text-center">
          {[
            [stats.total, "Students Placed"],
            [stats.companies, "Companies"],
            [`₹${stats.highest}L`, "Highest CTC"],
          ].map(([v, l]) => (
            <div key={l as string}>
              <div className="font-display text-lg font-bold text-gold">{v}</div>
              <div className="text-[10px] text-primary-foreground/70">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Branch filter */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-muted/40">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Filter:</span>
        {(["All", "CME", "ECE"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition",
              filter === f ? "bg-primary text-primary-foreground" : "bg-background border border-border hover:bg-accent"
            )}>
            {f}
          </button>
        ))}
      </div>

      {/* Company grid */}
      <div className="p-4 grid gap-2">
        {visible.map((p, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 hover:bg-accent/50 transition">
            <CompanyLogo logo={p.logo} name={p.company} />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-foreground truncate">{p.company}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="h-3 w-3 shrink-0" />
                {p.location}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <BranchBadge branch={p.branch} />
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-emerald-600">{p.placed} placed</span>
                <span className="text-muted-foreground">·</span>
                <span className="font-semibold text-primary">₹{p.lpa}L</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length > 6 && (
        <div className="px-4 pb-4">
          <button onClick={() => setExpanded((v) => !v)}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-semibold text-primary hover:bg-accent transition">
            {expanded
              ? <><ChevronUp className="h-4 w-4" /> Show less</>
              : <><ChevronDown className="h-4 w-4" /> Show all {filtered.length} companies</>}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Summary Stats across all 3 years ────────────────────────────────────────

function OverallStats() {
  const allPlacements = YEARS.flatMap((y) => y.placements);
  const totalPlaced = allPlacements.reduce((s, p) => s + p.placed, 0);
  const uniqueCompanies = new Set(allPlacements.map((p) => p.company)).size;
  const highestLPA = Math.max(...allPlacements.map((p) => p.lpa));
  const avgLPA = (allPlacements.reduce((s, p) => s + p.lpa, 0) / allPlacements.length).toFixed(1);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { icon: Users, value: totalPlaced, label: "Students Placed", suffix: "", color: "text-blue-600 bg-blue-50" },
        { icon: Briefcase, value: uniqueCompanies, label: "Unique Companies", suffix: "+", color: "text-purple-600 bg-purple-50" },
        { icon: TrendingUp, value: `₹${highestLPA}L`, label: "Highest Package", suffix: "", color: "text-emerald-600 bg-emerald-50" },
        { icon: Award, value: `₹${avgLPA}L`, label: "Avg. Package", suffix: "", color: "text-amber-600 bg-amber-50" },
      ].map(({ icon: Icon, value, label, suffix, color }) => (
        <div key={label} className="rounded-2xl border border-border bg-card p-4 shadow-soft text-center">
          <div className={cn("grid h-10 w-10 place-items-center rounded-xl mx-auto mb-3", color)}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="font-display text-2xl font-bold text-foreground">
            {value}{suffix}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
          <div className="text-[10px] text-muted-foreground/70">2023 – 2026</div>
        </div>
      ))}
    </div>
  );
}

// ─── Notable Companies Showcase ───────────────────────────────────────────────

const NOTABLE = [
  { company: "Thoughtworks", logo: "https://logo.clearbit.com/thoughtworks.com", lpa: "₹8 LPA", tag: "Top Package" },
  { company: "Texas Instruments", logo: "https://logo.clearbit.com/ti.com", lpa: "₹8.5 LPA", tag: "Highest CTC" },
  { company: "Wipro", logo: "https://logo.clearbit.com/wipro.com", lpa: "₹3.4 LPA", tag: "MNC" },
  { company: "Daikin", logo: "https://logo.clearbit.com/daikin.com", lpa: "₹2.4 LPA", tag: "Most Hired" },
  { company: "Royal Enfield", logo: "https://logo.clearbit.com/royalenfield.com", lpa: "₹2.4 LPA", tag: "Automotive" },
  { company: "Tata Electronics", logo: "https://logo.clearbit.com/tata.com", lpa: "₹2.4 LPA", tag: "Tata Group" },
  { company: "Motherson Sumi", logo: "https://logo.clearbit.com/motherson.com", lpa: "₹2.02 LPA", tag: "Auto Parts" },
  { company: "Moschip", logo: "https://logo.clearbit.com/moschip.com", lpa: "₹2.4 LPA", tag: "Semiconductor" },
];

function NotableCompanies() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {NOTABLE.map(({ company, logo, lpa, tag }) => {
        const [err, setErr] = useState(false);
        return (
          <div key={company} className="rounded-2xl border border-border bg-card p-4 shadow-soft flex flex-col items-center text-center gap-2 hover:shadow-elevated transition">
            {!err && logo ? (
              <img src={logo} alt={company} onError={() => setErr(true)}
                className="h-12 w-12 rounded-xl object-contain bg-white border border-border p-1" />
            ) : (
              <div className="h-12 w-12 rounded-xl bg-primary/10 grid place-items-center text-primary font-bold text-lg">
                {company.charAt(0)}
              </div>
            )}
            <div>
              <div className="font-semibold text-xs text-foreground leading-snug">{company}</div>
              <div className="text-[10px] font-semibold text-emerald-600 mt-0.5">{lpa}</div>
            </div>
            <span className="rounded-full bg-primary/5 text-primary px-2 py-0.5 text-[10px] font-medium">{tag}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function PlacementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Campus Placements"
        title="Real placements. Real companies. Real salaries."
        description="3 years of campus placement data — 2023 to 2026 — with actual student numbers and packages."
        breadcrumb={[{ label: "Placements" }]}
        image={headerImg}
      />

      {/* Overall stats */}
      <Section muted>
        <SectionHeading
          eyebrow="3-Year Summary"
          title="Placement highlights — 2023 to 2026"
          description="Across all three batches, our students have been placed in leading companies across India."
          center
        />
        <div className="mt-8">
          <OverallStats />
        </div>
      </Section>

      {/* Notable companies */}
      <Section>
        <SectionHeading
          eyebrow="Recruiters"
          title="Companies that hired our students"
        />
        <div className="mt-6">
          <NotableCompanies />
        </div>
      </Section>

      {/* Year-wise data */}
      <Section muted>
        <SectionHeading
          eyebrow="Year-wise Data"
          title="Placement records by academic year"
          description="Filter by branch — CME (Computer Engineering) or ECE (Electronics & Communication)."
          center
        />
        <div className="mt-8 grid lg:grid-cols-3 gap-5">
          {YEARS.map((y) => (
            <YearPanel key={y.year} data={y} />
          ))}
        </div>
      </Section>

      {/* Pathways */}
      <Section>
        <SectionHeading
          eyebrow="After the Diploma"
          title="Multiple pathways for every student"
          center
        />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PATHWAYS.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/5 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-sm">{t}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Higher education support */}
      <Section muted>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <SectionHeading eyebrow="Higher Education" title="The preferred route for our graduates." />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              The vast majority of our students appear for AP ECET for lateral entry into B.Tech second year.
              Faculty members provide subject coaching, previous-paper practice and college selection guidance throughout the final year.
            </p>
            <ul className="mt-5 grid gap-2.5 text-sm">
              {[
                "Dedicated ECET coaching alongside regular classes",
                "Mock tests and previous year question paper practice",
                "Counselling support for college and branch selection",
                "AMIE guidance for working professionals and aspirants",
              ].map((x) => (
                <li key={x} className="rounded-lg border border-border bg-card p-3 px-4 text-sm">{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Placement Cell" title="Industry support for those who want it." />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Our Training & Placement Cell partners with industry to provide aptitude training,
              communication coaching, mock interviews and internship opportunities for students who
              prefer to enter the workforce directly.
            </p>
            <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Top hiring locations</div>
              <div className="flex flex-wrap gap-2">
                {["Hyderabad", "Bangalore", "Visakhapatnam", "Chennai", "Sri City", "Mangalagiri", "Hosur", "Kancheepuram"].map((loc) => (
                  <span key={loc} className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
                    <MapPin className="h-3 w-3 text-primary" />
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeading eyebrow="Alumni Voices" title="What our students say" center />
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <Quote className="h-6 w-6 text-gold" />
              <p className="mt-3 text-sm leading-relaxed text-foreground">"{t.body}"</p>
              <div className="mt-4">
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}