import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { Target, Eye, Award, Users, Building2, BookOpen, ShieldCheck } from "lucide-react";
import galleryCampus from "@/assets/gallery-campus.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vision, Mission & Legacy" },
      { name: "description", content: "Established in 2008 at Rebaka village, this AICTE-approved and NBA-accredited polytechnic offers quality diploma programs in Computer Engineering and Electronics & Communication Engineering." },
    ],
  }),
  component: AboutPage,
});

const MISSION_POINTS = [
  "Offer demand-driven diploma programmes to cater to the needs of local industries and other public and private sector agencies.",
  "Provide the best academic environment for students to realise their full potential for acquiring technical knowledge and job skills.",
  "Infuse the human values of integrity, social responsibility and contribute their might for national development with their technical knowledge.",
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Shaping skilled engineers since 2008."
        description="Established at Rebaka village to make quality technical education accessible to students from across coastal Andhra Pradesh."
        breadcrumb={[{ label: "About" }]}
        image={galleryCampus}
      />

      {/* ── OUR STORY ──────────────────────────────────────────────────── */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img
            src={galleryCampus}
            alt="Campus"
            width={1024} height={768} loading="lazy"
            className="rounded-2xl shadow-elevated w-full object-cover"
          />
          <div>
            <SectionHeading eyebrow="Our Story" title="Rooted in purpose. Built for the future." />
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Established in 2008 under the Government of Andhra Pradesh and approved by AICTE,
              this polytechnic is one of the leading diploma institutions in the region. It offers
              two programs — Computer Engineering and Electronics and Communication Engineering —
              with an intake of 66 students each.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              The campus is set on 9.74 acres at Rebaka village on the Anakapalli–Sabbavaram Highway,
              adjacent to the hills. Spacious buildings, internal roads, a seminar hall, central library,
              a girls' waiting hall and playgrounds support a well-rounded student experience.
              All classrooms and laboratories are networked with high-speed internet and equipped
              with over 200 computers.
            </p>

            {/* Accreditation badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { label: "AICTE Approved",         sub: "All India Council for Technical Education" },
                { label: "SBTET Recognised",        sub: "State Board of Technical Education, AP"   },
                { label: "NBA Accredited",          sub: "National Board of Accreditation"          },
              ].map(({ label, sub }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 shadow-soft"
                >
                  <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <div className="text-xs font-bold text-foreground">{label}</div>
                    <div className="text-[10px] text-muted-foreground">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── VISION & MISSION ──────────────────────────────────────────── */}
      <Section muted>
        <div className="grid md:grid-cols-2 gap-6">

          {/* Mission */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <Target className="h-8 w-8 text-gold" />
            <h3 className="mt-4 font-display text-2xl font-semibold">Our Mission</h3>
            <ul className="mt-4 space-y-4">
              {MISSION_POINTS.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <Eye className="h-8 w-8 text-gold" />
            <h3 className="mt-4 font-display text-2xl font-semibold">Our Vision</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              To impart quality technical education in the semi-urban area of northern Andhra Pradesh
              and to produce quality technician manpower to meet the technological needs for the
              economic development of the State, and to become an outstanding polytechnic — an ultimate
              destination for learning multi-technical job skills.
            </p>
          </div>
        </div>
      </Section>

      {/* ── CORE VALUES ───────────────────────────────────────────────── */}
      <Section>
        <SectionHeading eyebrow="Core Values" title="What we stand for" center />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Award,     t: "Excellence",      d: "Pursuit of quality in teaching, learning and administration." },
            { icon: Users,     t: "Inclusion",        d: "Equal opportunity for every student regardless of background." },
            { icon: Building2, t: "Integrity",        d: "Honesty and accountability in everything we do." },
            { icon: BookOpen,  t: "Lifelong Learning",d: "A culture of curiosity, growth and innovation." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-xl border border-border p-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/5 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── MILESTONES ────────────────────────────────────────────────── */}
      <Section muted>
        <SectionHeading eyebrow="Milestones" title="A journey of growth" />
        <div className="mt-10 grid gap-4">
          {[
            ["2008", "Institution established by the Government of Andhra Pradesh at Rebaka village, Anakapalli."],
            ["2008", "Computer Engineering and Electronics and Communication Engineering programs launched with 66 seats each."],
            ["2014", "Campus expanded with modern laboratories and a dedicated seminar hall."],
            ["2018", "CISCO routing and switching setup; high-speed networked classrooms commissioned."],
            ["2021", "AEBAS biometric attendance, CCTV surveillance and RO/UV drinking water facilities added."],
            ["2023", "NBA Accreditation received — recognising academic quality and industry alignment."],
            ["2024", "Skill Development Centre expanded for soft skills, life skills and aptitude training."],
          ].map(([year, body]) => (
            <div
              key={year + body}
              className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="font-display text-xl md:text-2xl font-semibold text-gold">{year}</div>
              <div className="text-muted-foreground text-sm leading-relaxed">{body}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}