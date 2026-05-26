import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { Target, Eye, Award, Users, Building2, BookOpen } from "lucide-react";
import galleryCampus from "@/assets/gallery-campus.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Government Polytechnic, Anakapalli — Vision, Mission & Legacy" },
      { name: "description", content: "Learn about Government Polytechnic, Anakapalli — 40+ years of technical education, vision, mission and core values." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Shaping skilled engineers since 2008."
        description="Government Polytechnic, Anakapalli was established in 2008 at Rebaka village to make quality technical education accessible to students from across coastal Andhra Pradesh."
        breadcrumb={[{ label: "About" }]}
        image={galleryCampus}
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img src={galleryCampus} alt="Campus" width={1024} height={768} loading="lazy" className="rounded-2xl shadow-elevated" />
          <div>
            <SectionHeading eyebrow="Our Story" title="Rooted in purpose. Built for the future." />
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Established in 2008 under the Government of Andhra Pradesh and approved by AICTE,
              Government Polytechnic, Anakapalli is one of the leading polytechnics in the region,
              offering two diploma programs — Computer Engineering and Electronics & Communication
              Engineering — with an intake of 66 students each.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              The campus is set on 9.74 acres at Rebaka village on the Anakapalli–Sabbavaram Highway,
              with a pleasant ambience adjacent to the hills. Spacious buildings, internal roads,
              a seminar hall, central library, girls' waiting hall and playgrounds support a
              well-rounded student experience. All classrooms and laboratories are networked with
              100 Mbps internet connectivity and equipped with over 150 computers.
            </p>
          </div>
        </div>
      </Section>

      <Section muted>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Target, title: "Our Mission", body: "To provide accessible, affordable, industry-relevant technical education that empowers students to lead productive careers and contribute to society." },
            { icon: Eye, title: "Our Vision", body: "To be among the most respected polytechnic institutions in India — known for academic rigor, ethical practice and student outcomes." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <Icon className="h-8 w-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Core Values" title="What we stand for" center />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Award, t: "Excellence", d: "Pursuit of quality in teaching, learning and administration." },
            { icon: Users, t: "Inclusion", d: "Equal opportunity for every student regardless of background." },
            { icon: Building2, t: "Integrity", d: "Honesty and accountability in everything we do." },
            { icon: BookOpen, t: "Lifelong Learning", d: "A culture of curiosity, growth and innovation." },
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

      <Section muted>
        <SectionHeading eyebrow="Milestones" title="A journey of growth" />
        <div className="mt-10 grid gap-4">
          {[
            ["2008", "Institution established by the Government of Andhra Pradesh at Rebaka village"],
            ["2008", "Computer Engineering (CME) and Electronics & Communication (ECE) programs launched"],
            ["2014", "Campus expansion with modern laboratories and seminar hall"],
            ["2018", "CISCO routing & switching setup and 100 Mbps networked classrooms"],
            ["2021", "AEBAS biometric attendance, CCTV surveillance and RO/UV facilities added"],
            ["2024", "Skill Development Center expanded for soft skills and life skills training"],
          ].map(([year, body]) => (
            <div key={year} className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-4 rounded-xl border border-border bg-card p-5">
              <div className="font-display text-xl md:text-2xl font-semibold text-gold">{year}</div>
              <div className="text-muted-foreground">{body}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
