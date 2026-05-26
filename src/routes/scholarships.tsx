import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { Award, CheckCircle2 } from "lucide-react";
import headerImg from "@/assets/gallery-event.jpg";

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships — Government Polytechnic, Anakapalli" },
      { name: "description", content: "Government scholarship schemes available for diploma students at Government Polytechnic, Anakapalli — ePASS, PMSS, minority and merit scholarships." },
    ],
  }),
  component: ScholarshipsPage,
});

const SCH = [
  { t: "ePASS (SC/ST/BC/EBC/Minority)", elig: "Family income below ₹2,00,000 per annum. Native of Andhra Pradesh.", benefit: "Full tuition fee reimbursement + ₹6,000 maintenance allowance per year" },
  { t: "Post-Matric Scholarship (PMSS)", elig: "Students belonging to SC/ST categories with valid caste certificate.", benefit: "Tuition fee + non-refundable charges + monthly stipend" },
  { t: "Minority Scholarship", elig: "Students from Muslim, Christian, Sikh, Buddhist, Jain, Parsi communities.", benefit: "₹10,000 per annum including course & maintenance allowance" },
  { t: "Merit Scholarship", elig: "Students securing 85% or above in previous semester.", benefit: "₹5,000 to ₹15,000 based on rank within the institution" },
  { t: "Differently-Abled Scholarship", elig: "Students with 40% or more disability (with PWD certificate).", benefit: "Full fee waiver + reader/escort allowance" },
  { t: "AICTE Pragati & Saksham", elig: "Female students (Pragati) and differently-abled students (Saksham) in AICTE-approved courses.", benefit: "₹50,000 per annum including ₹30,000 contingency + ₹20,000 tuition" },
];

function ScholarshipsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Financial Aid"
        title="Scholarships make education accessible."
        description="Multiple government and AICTE scholarships ensure no eligible student is denied a quality education due to financial constraints."
        breadcrumb={[{ label: "Scholarships" }]}
        image={headerImg}
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-5">
          {SCH.map((s) => (
            <div key={s.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <Award className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-display text-lg font-semibold text-primary">{s.t}</h3>
              <div className="mt-4 grid gap-3 text-sm">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Eligibility</div>
                  <p className="mt-1 text-foreground">{s.elig}</p>
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Benefit</div>
                  <p className="mt-1 text-foreground">{s.benefit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="How to Apply" title="Application process" />
        <ol className="mt-8 grid gap-3 max-w-3xl">
          {[
            "Register on jnanabhumi.ap.gov.in (ePASS) or scholarships.gov.in (National)",
            "Fill in personal, academic and bank details accurately",
            "Upload caste, income, Aadhaar and bonafide certificates",
            "Submit print-out to college scholarship cell for verification",
            "Track status online — funds are disbursed directly to your bank account",
          ].map((step, i) => (
            <li key={i} className="flex gap-4 rounded-xl bg-card border border-border p-4">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
