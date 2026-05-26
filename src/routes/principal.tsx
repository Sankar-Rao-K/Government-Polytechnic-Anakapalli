import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { Quote } from "lucide-react";
import principalImg from "@/assets/principal.jpg";

export const Route = createFileRoute("/principal")({
  head: () => ({
    meta: [
      { title: "Principal's Message — Government Polytechnic, Anakapalli" },
      {
        name: "description",
        content:
          "Message from Prof. I.V.S.S. Srinivasa Rao, Principal, Government Polytechnic, Anakapalli on the institution's vision, achievements and commitment to excellence.",
      },
    ],
  }),
  component: PrincipalPage,
});

function PrincipalPage() {
  return (
    <>
      <PageHeader
        eyebrow="From the Principal's Desk"
        title="A message from our Principal"
        description="Prof. I.V.S.S. Srinivasa Rao, M.E. — Principal, Government Polytechnic, Anakapalli"
        breadcrumb={[{ label: "Principal's Message" }]}
        image={principalImg}
      />

      <Section>
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 max-w-5xl mx-auto">
          <div className="lg:sticky lg:top-24 self-start">
            <img
              src={principalImg}
              alt="Prof. I.V.S.S. Srinivasa Rao, Principal"
              className="w-full rounded-2xl object-cover shadow-elevated aspect-[3/4]"
            />
            <div className="mt-4">
              <div className="font-display text-lg font-semibold">
                Prof. I.V.S.S. Srinivasa Rao, M.E.
              </div>
              <div className="text-sm text-muted-foreground">
                Principal, Government Polytechnic, Anakapalli
              </div>
            </div>
          </div>

          <article className="prose-like">
            <Quote className="h-10 w-10 text-gold" />
            <p className="mt-4 text-lg leading-relaxed text-foreground">
              It is a matter of great pride and privilege to lead an institution committed to
              nurturing technical competence, innovation and ethical values. Since its
              establishment in 2008, Government Polytechnic, Anakapalli has been dedicated to
              providing quality technical education and preparing young minds to meet the
              challenges of a rapidly evolving technological world.
            </p>

            <p className="mt-5 text-muted-foreground leading-relaxed">
              The institution commenced its academic journey with two diploma programs —
              Electronics & Communication Engineering (ECE) and Computer Engineering — with an
              initial intake of 60 students each. Over the years, the intake has been enhanced
              to 60 + 6 (EWS) seats in each branch, reflecting steady growth and the confidence
              placed in us by students, parents and the community.
            </p>

            <p className="mt-5 text-muted-foreground leading-relaxed">
              Our campus is equipped with modern academic infrastructure including well-designed
              classrooms, digital classrooms and sixteen fully functional laboratories. These
              facilities, combined with the dedication of our highly qualified faculty, create
              an environment that fosters academic excellence, innovation and practical learning.
            </p>

            <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
              NBA Accreditation & IoT Laboratory
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              A landmark achievement in our journey was the accreditation of both diploma
              programs by the National Board of Accreditation (NBA), New Delhi in 2023 for a
              period of three years — a testament to our continuous efforts to maintain high
              academic standards and outcome-based education.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              In 2024, a state-of-the-art Internet of Things (IoT) Laboratory was established
              with equipment worth ₹31 lakhs, generously sponsored by IREL (India) – REPM Plant,
              Visakhapatnam with the support of the Hon'ble District Collector, Anakapalli.
            </p>

            <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
              Inclusive education & student success
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Through the Pragathi Scholarship Scheme of the Ministry of Education and AICTE, 75
              girl students receive financial assistance each year. The college consistently
              maintains a student enrollment rate exceeding 98%, and we are proud to have
              achieved 100% placements over the last three years, with students joining reputed
              organizations such as Texas Instruments, ThoughtWorks, Medha Servo Drives,
              Efftronics, MosChip, Wipro, Daikin and Royal Enfield.
            </p>

            <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
              Beyond academics
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              The institution emphasizes holistic development through industrial visits, skill
              development programs, cultural events, environmental initiatives and community
              outreach. With the support of the Hon'ble local MLA, a 750-meter cement concrete
              road was constructed, greatly improving connectivity to the campus.
            </p>

            <blockquote className="mt-8 border-l-4 border-gold pl-5 italic text-foreground">
              "Education is not merely the acquisition of knowledge, but the transformation of
              individuals into responsible citizens and skilled professionals."
            </blockquote>

            <p className="mt-6 text-muted-foreground leading-relaxed">
              With the continued support of our dedicated faculty, enthusiastic students,
              supportive parents, industry partners and well-wishers, we are confident of
              achieving greater milestones and contributing meaningfully to society and the
              nation. I invite all stakeholders to join us in our journey towards excellence and
              innovation in technical education.
            </p>

            <div className="mt-8 border-t border-border pt-5">
              <div className="font-display font-semibold text-foreground">
                Prof. I.V.S.S. Srinivasa Rao, M.E.
              </div>
              <div className="text-sm text-muted-foreground">
                Principal, Government Polytechnic, Anakapalli
              </div>
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
