import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  GraduationCap, ClipboardList, CheckCircle, Info,
  ArrowRight, ChevronDown, ChevronUp, ExternalLink,
  TrendingDown, Users, BookOpen, Award, ShieldCheck,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import heroImg from "@/assets/gallery-campus.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admissions")({
  component: AdmissionsPage,
});

function useSEO(title: string, desc: string) {
  useEffect(() => {
    document.title = title;
    let m = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
    m.content = desc;
  }, [title, desc]);
}

// ─── Rank data ────────────────────────────────────────────────────────────────

const CME_RANKS = [
  { category: "Open Competition (OC)", opening: 556,    closing: 6409,   color: "bg-blue-500"   },
  { category: "EWS",                   opening: 7060,   closing: 9419,   color: "bg-cyan-500"   },
  { category: "BC-D",                  opening: 7334,   closing: 8091,   color: "bg-indigo-500" },
  { category: "BC-B",                  opening: 8770,   closing: 11371,  color: "bg-violet-500" },
  { category: "BC-A",                  opening: 7872,   closing: 12135,  color: "bg-purple-500" },
  { category: "BC-E",                  opening: 12388,  closing: 24856,  color: "bg-fuchsia-500"},
  { category: "SC",                    opening: 8575,   closing: 83702,  color: "bg-amber-500"  },
  { category: "ST",                    opening: 46186,  closing: 77336,  color: "bg-green-600"  },
];

const ECE_RANKS = [
  { category: "Open Competition (OC)", opening: 702,    closing: 7501,   color: "bg-blue-500"   },
  { category: "EWS",                   opening: 7704,   closing: 11794,  color: "bg-cyan-500"   },
  { category: "BC-D",                  opening: 7962,   closing: 12145,  color: "bg-indigo-500" },
  { category: "BC-B",                  opening: 8469,   closing: 15145,  color: "bg-violet-500" },
  { category: "BC-A",                  opening: 11986,  closing: 13848,  color: "bg-purple-500" },
  { category: "BC-E",                  opening: 25411,  closing: 49146,  color: "bg-fuchsia-500"},
  { category: "SC",                    opening: 21928,  closing: 84239,  color: "bg-amber-500"  },
  { category: "ST",                    opening: 26221,  closing: 88702,  color: "bg-green-600"  },
];

// ─── Rank visual bar ──────────────────────────────────────────────────────────

const MAX_RANK = 110000;

function RankBar({ opening, closing, color }: { opening: number; closing: number; color: string }) {
  const openPct  = (opening / MAX_RANK) * 100;
  const closePct = (closing / MAX_RANK) * 100;
  const width    = closePct - openPct;

  return (
    <div className="relative h-2.5 w-full rounded-full bg-muted overflow-hidden">
      <div
        className={cn("absolute h-full rounded-full opacity-80", color)}
        style={{ left: `${openPct}%`, width: `${Math.max(width, 0.5)}%` }}
      />
    </div>
  );
}

function RankTable({ data, branch }: { data: typeof CME_RANKS; branch: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      <div className="bg-primary px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-primary-foreground/70 uppercase tracking-wider">2024–25 Closing Ranks</p>
          <h3 className="font-display text-xl font-bold text-white mt-0.5">{branch}</h3>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-primary-foreground/60">Best rank admitted</p>
          <p className="font-display text-2xl font-bold text-gold">{data[0].opening.toLocaleString()}</p>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {data.map((row) => (
          <div key={row.category}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold text-foreground">{row.category}</span>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-emerald-600">Open:</span>
                  {row.opening.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-red-500">Close:</span>
                  {row.closing.toLocaleString()}
                </span>
              </div>
            </div>
            <RankBar opening={row.opening} closing={row.closing} color={row.color} />
          </div>
        ))}
      </div>

      <div className="border-t border-border px-4 py-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Info className="h-3.5 w-3.5 shrink-0" />
        Opening rank = first student admitted. Closing rank = last student admitted. All AU region.
      </div>
    </div>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-accent transition"
      >
        <span className="font-semibold text-sm text-foreground">{title}</span>
        {open
          ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
          : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
      </button>
      {open && (
        <div className="border-t border-border px-5 py-4 text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function AdmissionsPage() {
  useSEO(
    "Admissions via POLYCET | Diploma Polytechnic, Anakapalli",
    "Complete guide to POLYCET admission process for diploma programs in Computer Engineering and ECE at Anakapalli Polytechnic. Previous year closing ranks and category-wise seat details."
  );

  const [activeRank, setActiveRank] = useState<"CME" | "ECE">("CME");

  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="Join via POLYCET"
        description="Everything you need to know about the admission process, eligibility, seat reservation and previous year closing ranks."
        breadcrumb={[{ label: "Admissions" }]}
        image={heroImg}
      />

      {/* Quick links strip */}
      <div className="bg-primary/5 border-b border-border py-3">
        <div className="container-page flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Official Links:</span>
          {[
            ["POLYCET Portal",     "https://polycetap.nic.in"],
            ["SBTET AP",           "https://apsbtet.ap.gov.in"],
            ["Rank Card Download", "https://polycetap.nic.in"],
            ["ePASS Scholarship",  "https://apepass.cgg.gov.in"],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition">
              {label} <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      </div>

      {/* Overview */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionHeading
              eyebrow="What is POLYCET"
              title="Your gateway to a diploma in engineering."
            />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              POLYCET (Polytechnic Common Entrance Test) is conducted by the State Board of
              Technical Education and Training, Andhra Pradesh. It is the single gateway for
              admission into all government and private polytechnics across the state.
              Candidates with a valid POLYCET rank are eligible to join the three-year
              diploma programs in Computer Engineering (CME) or Electronics and Communication
              Engineering (ECE) at this institution.
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Admission is conducted via web counselling — no separate application is needed.
              The POLYCET application itself serves as the admission application. After results,
              candidates attend certificate verification and enter their preferred
              college-branch combinations online.
            </p>

            {/* Exam snapshot */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: ClipboardList, label: "Total Questions", value: "120 MCQs"          },
                { icon: BookOpen,      label: "Subjects",        value: "Maths · Physics · Chemistry" },
                { icon: Award,         label: "Total Marks",     value: "120 (No Negative)"  },
                { icon: GraduationCap, label: "Duration",        value: "2 Hours"             },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl border border-border bg-muted/40 p-3">
                  <Icon className="h-4 w-4 text-primary mb-1.5" />
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
                  <div className="text-sm font-bold text-foreground mt-0.5">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-step process */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Admission Process</p>
            <ol className="space-y-3">
              {[
                { step: "01", title: "Appear for POLYCET",       body: "Write the POLYCET exam conducted by SBTET AP. The paper covers Mathematics (50 marks), Physics (40 marks) and Chemistry (30 marks) from the SSC syllabus." },
                { step: "02", title: "Download Rank Card",        body: "Rank cards are available on the official POLYCET portal after results. The rank card must be preserved throughout the admission process." },
                { step: "03", title: "Certificate Verification",  body: "Attend the scheduled certificate verification session at any designated Help Line Centre with all original documents. Verify your category and local area status carefully." },
                { step: "04", title: "Enter College Preferences", body: "Using the counselling portal and your generated password, enter college-branch combinations in order of preference. Enter as many as possible to maximise chances." },
                { step: "05", title: "Seat Allotment",            body: "Seats are allotted based on rank, category and preferences entered. Check the allotment on the portal and report to the allotted institution for admission." },
                { step: "06", title: "Report to Institution",     body: "Bring the allotment order, original certificates, POLYCET hall ticket, rank card and pay the prescribed fee to complete admission." },
              ].map(({ step, title, body }) => (
                <li key={step} className="flex gap-4">
                  <div className="shrink-0 font-display text-2xl font-bold text-primary/20 w-8 text-right leading-none mt-1">{step}</div>
                  <div className="flex-1 rounded-xl border border-border bg-card p-4">
                    <h4 className="font-semibold text-sm text-foreground">{title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Eligibility */}
      <Section muted>
        <SectionHeading eyebrow="Eligibility" title="Who can apply" center />
        <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { icon: CheckCircle, title: "Qualification",   body: "Passed or appeared for SSC (10th class) from BSEAP, CBSE, ICSE, NIOS, APOSS or any equivalent state board. Mathematics is a mandatory subject." },
            { icon: CheckCircle, title: "Domicile",        body: "Must be a resident of Andhra Pradesh. 85% of seats are reserved for local candidates from the Andhra University region. 15% are unreserved." },
            { icon: CheckCircle, title: "Age",             body: "There is no age restriction for appearing in POLYCET. All eligible candidates regardless of age may apply." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <Icon className="h-5 w-5 text-emerald-500 mb-3" />
              <h3 className="font-semibold text-sm">{title}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Seat reservation */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionHeading eyebrow="Seat Reservation" title="Category-wise seat distribution." />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Each branch has 66 seats. Seats are distributed across reservation categories
              as mandated by the Government of Andhra Pradesh. An additional 33.33%
              horizontal reservation is provided for girl candidates within each category.
            </p>

            {/* Reservation pie visual */}
            <div className="mt-5 space-y-2">
              {[
                { label: "Open Competition (OC)",     pct: 50,   color: "bg-blue-500"    },
                { label: "Backward Classes (BC)",      pct: 29,   color: "bg-violet-500"  },
                { label: "Scheduled Castes (SC)",      pct: 15,   color: "bg-amber-500"   },
                { label: "Scheduled Tribes (ST)",      pct: 6,    color: "bg-green-500"   },
              ].map(({ label, pct, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={cn("h-3 rounded-full shrink-0", color)} style={{ width: `${pct * 1.8}px` }} />
                  <span className="text-sm text-foreground font-medium">{label}</span>
                  <span className="ml-auto text-sm font-bold text-muted-foreground">{pct}%</span>
                </div>
              ))}
              <p className="text-[11px] text-muted-foreground mt-3 pt-3 border-t border-border">
                Within BC: A-7%, B-10%, C-1%, D-7%, E-4%. Girls get 33.33% horizontal reservation in each category.
              </p>
            </div>
          </div>

          {/* Fee structure */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Annual Fee Structure</p>
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    <th className="px-4 py-3 text-left">Fee Head</th>
                    <th className="px-4 py-3 text-right">Govt. Polytechnic</th>
                    <th className="px-4 py-3 text-right">Private</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Tuition Fee",           "₹2,000",  "₹24,000"],
                    ["Lab and Workshop Fee",  "₹900",    "—"       ],
                    ["Library Fee",           "₹400",    "—"       ],
                    ["Games Fee",             "₹100",    "₹100"    ],
                    ["Other Fees",            "₹1,300",  "₹900"    ],
                  ].map(([head, gov, pvt]) => (
                    <tr key={head} className="border-t border-border hover:bg-accent/40">
                      <td className="px-4 py-2.5 text-muted-foreground">{head}</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-foreground">{gov}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{pvt}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-border bg-primary/5 font-bold">
                    <td className="px-4 py-3 text-foreground">Total</td>
                    <td className="px-4 py-3 text-right text-primary text-base">₹4,700</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">₹25,000</td>
                  </tr>
                </tbody>
              </table>
              <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
                Candidates with family income below ₹2.5 lakhs are eligible for full fee reimbursement via ePASS.
              </div>
            </div>

            {/* POLYCET exam fee */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-xs text-muted-foreground">OC / BC Exam Fee</p>
                <p className="font-display text-2xl font-bold text-foreground mt-1">₹400</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-xs text-muted-foreground">SC / ST Exam Fee</p>
                <p className="font-display text-2xl font-bold text-foreground mt-1">₹100</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Previous year ranks */}
      <Section muted>
        <SectionHeading
          eyebrow="Previous Year Data"
          title="2024–25 closing ranks at this institution."
          description="These are the actual ranks of the last students admitted in each category last year. Use these as a reference to estimate your chances."
          center
        />

        {/* Branch toggle */}
        <div className="flex justify-center gap-3 mt-6 mb-8">
          {(["CME", "ECE"] as const).map(b => (
            <button key={b} onClick={() => setActiveRank(b)}
              className={cn(
                "rounded-xl px-8 py-3 text-sm font-bold transition",
                activeRank === b ? "bg-primary text-primary-foreground shadow-soft" : "border border-border bg-card hover:bg-accent"
              )}>
              {b === "CME" ? "Computer Engineering (CME)" : "Electronics & Communication (ECE)"}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <RankTable data={activeRank === "CME" ? CME_RANKS : ECE_RANKS} branch={activeRank === "CME" ? "Computer Engineering (CME)" : "Electronics & Communication Engineering (ECE)"} />
        </div>

        {/* Overall summary */}
        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(activeRank === "CME" ? [
            { label: "Best rank admitted",  value: "556",    icon: TrendingDown, color: "text-emerald-600" },
            { label: "Last rank (overall)", value: "83,702", icon: TrendingDown, color: "text-red-500"     },
            { label: "Total students",      value: "65",     icon: Users,        color: "text-primary"     },
            { label: "OC closing rank",     value: "6,409",  icon: ShieldCheck,  color: "text-blue-600"   },
          ] : [
            { label: "Best rank admitted",  value: "702",    icon: TrendingDown, color: "text-emerald-600" },
            { label: "Last rank (overall)", value: "1,07,147",icon:TrendingDown, color: "text-red-500"     },
            { label: "Total students",      value: "65",     icon: Users,        color: "text-primary"     },
            { label: "OC closing rank",     value: "7,501",  icon: ShieldCheck,  color: "text-blue-600"   },
          ]).map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-4 text-center shadow-soft">
              <Icon className={cn("h-5 w-5 mx-auto mb-2", color)} />
              <div className="font-display text-xl font-bold text-foreground">{value}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{label}</div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs text-center text-muted-foreground max-w-xl mx-auto">
          Data from the official POLYCET 2024-25 seat allotment published by SBTET AP.
          Ranks shown are for the Andhra University region. UR = Unreserved seats.
        </p>
      </Section>

      {/* FAQs */}
      <Section>
        <SectionHeading eyebrow="FAQs" title="Common questions about admission" />
        <div className="mt-6 grid md:grid-cols-2 gap-3 max-w-5xl">
          <Accordion title="Is there any age limit to apply for POLYCET?">
            No. There is no age restriction for appearing in POLYCET. Candidates of any age who have passed or appeared for the SSC examination with Mathematics as a subject are eligible.
          </Accordion>
          <Accordion title="Does a high rank in POLYCET guarantee admission?">
            No. Securing a rank does not guarantee admission. Candidates must satisfy all eligibility conditions, attend certificate verification, and enter preferences during web counselling. Seat allotment depends on rank, category, preferences and seat availability.
          </Accordion>
          <Accordion title="What documents are needed for certificate verification?">
            SSC marks memo and pass certificate, POLYCET hall ticket and rank card, caste certificate (if applicable), income certificate (for EWS/fee reimbursement), Aadhaar card, and recent passport-size photographs.
          </Accordion>
          <Accordion title="Can I change my branch after admission?">
            No. Requests for course or institution changes are not permitted after the admission process concludes. Choose your options carefully during the counselling phase.
          </Accordion>
          <Accordion title="Are there scholarships available?">
            Yes. Several scholarships are available: ePASS (fee reimbursement for family income below ₹2.5L), Pragati Scholarship by AICTE for girl students (₹50,000/year), Saksham Scholarship for specially-abled students, and Swanath Scholarship for students who lost parents. Visit our Scholarships page for details.
          </Accordion>
          <Accordion title="What is the passing mark in POLYCET?">
            Candidates must score at least 25% (30 out of 120 marks) to pass. There is no minimum marks requirement for SC and ST candidates. There is no negative marking.
          </Accordion>
          <Accordion title="What is the total intake at this institution?">
            Each branch (CME and ECE) has 66 seats, making the total intake 132 students per year. 33.33% of seats in each category are reserved for girl candidates.
          </Accordion>
          <Accordion title="Who is not eligible for admission through POLYCET?">
            Candidates from the TS (Osmania University region) are not eligible for admission through POLYCET after 01-06-2024 as per the AP State Reorganisation Act 2014.
          </Accordion>
        </div>
      </Section>

      {/* CTA */}
      <Section muted>
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-10 max-w-4xl mx-auto text-center">
          <GraduationCap className="h-10 w-10 mx-auto mb-4 opacity-80" />
          <h2 className="font-display text-2xl font-bold">Ready to apply?</h2>
          <p className="mt-3 text-sm opacity-80 max-w-lg mx-auto leading-relaxed">
            Appear for POLYCET through the official SBTET AP portal. For queries about the admission process, contact the institution or visit any POLYCET Help Line Centre.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="https://polycetap.nic.in" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gold text-primary px-5 py-3 text-sm font-bold hover:opacity-90 transition">
              Apply on POLYCET Portal <ExternalLink className="h-4 w-4" />
            </a>
            <Link to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 text-white px-5 py-3 text-sm font-bold hover:bg-white/20 transition">
              Contact the Institution <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
