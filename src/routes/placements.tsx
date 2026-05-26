import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { GraduationCap, Briefcase, BookOpen, Compass, Quote } from "lucide-react";
import headerImg from "@/assets/gallery-event.jpg";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Careers & Higher Education — Government Polytechnic, Anakapalli" },
      { name: "description", content: "Most students from Government Polytechnic, Anakapalli pursue B.Tech via ECET; the placement cell also supports students interested in industry roles." },
    ],
  }),
  component: PlacementsPage,
});

const PATHWAYS = [
  { icon: GraduationCap, t: "B.Tech via ECET", d: "Lateral entry into the second year of B.Tech in engineering colleges across Andhra Pradesh through the AP ECET examination." },
  { icon: BookOpen, t: "AMIE", d: "Associate Membership of the Institution of Engineers (India) — a recognised pathway to a degree-equivalent qualification." },
  { icon: Briefcase, t: "Industry Placements", d: "Direct placements and apprenticeships with PSUs and private companies for students who choose to enter the workforce." },
  { icon: Compass, t: "Government Jobs", d: "Eligibility for SSC, RRB, BSNL, BEL and state-level technical posts that accept a diploma qualification." },
];

const RECRUITERS = ["TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra", "Cognizant", "Bosch", "BHEL", "BEL", "BSNL"];

const TESTIMONIALS = [
  { name: "Ramesh K.", role: "B.Tech CSE, JNTUK (CME, 2023)", body: "The diploma fundamentals made my B.Tech transition smooth. ECET coaching from our faculty helped me secure a top college." },
  { name: "Sushma P.", role: "Diploma Engineer, BEL (ECE, 2022)", body: "The placement cell guided me through every step of the BEL selection. The labs gave me real hands-on confidence." },
  { name: "Karthik M.", role: "B.Tech ECE, Andhra University (ECE, 2024)", body: "Strong basics in communication systems and continuous mentoring made ECET feel manageable." },
];

function PlacementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers & Higher Education"
        title="Most students continue to B.Tech — and we support every pathway."
        description="Nearly all our graduates pursue higher education through ECET or AMIE. For students who prefer to enter the workforce directly, the placement cell offers structured support."
        breadcrumb={[{ label: "Careers" }]}
        image={headerImg}
      />

      <Section>
        <SectionHeading eyebrow="Pathways" title="Where our students go after the diploma" center />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PATHWAYS.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/5 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionHeading eyebrow="Higher Education" title="The preferred route for our graduates." />
            <p className="mt-5 text-muted-foreground leading-relaxed">
              The vast majority of our students appear for the Andhra Pradesh Engineering Common
              Entrance Test (AP ECET) for lateral entry into the second year of B.Tech. Faculty
              members provide subject coaching, previous-paper practice and college selection
              guidance throughout the final year.
            </p>
            <ul className="mt-6 grid gap-3 text-sm">
              {[
                "Dedicated ECET coaching schedule alongside regular classes",
                "Mock tests and previous year question paper practice",
                "Counselling support for college and branch selection",
                "AMIE guidance for working professionals and aspirants",
              ].map((x) => (
                <li key={x} className="rounded-lg border border-border bg-card p-3 px-4">{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Placement Cell" title="Industry support for those who want it." />
            <p className="mt-5 text-muted-foreground leading-relaxed">
              A few students prefer to enter the workforce immediately after the diploma. Our
              Training & Placement Cell partners with industry to provide aptitude training,
              communication coaching, mock interviews and internship opportunities.
            </p>
            <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Companies that have visited / hired</div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {RECRUITERS.map((r) => (
                  <div key={r} className="rounded-lg bg-secondary text-secondary-foreground px-3 py-2 text-xs font-semibold text-center">{r}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Voices" title="What our alumni say" center />
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <Quote className="h-7 w-7 text-gold" />
              <p className="mt-4 text-sm leading-relaxed text-foreground">"{t.body}"</p>
              <div className="mt-5">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
