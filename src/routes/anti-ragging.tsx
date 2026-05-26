import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { ShieldAlert, Phone, Mail, AlertTriangle } from "lucide-react";
import headerImg from "@/assets/gallery-campus.jpg";

export const Route = createFileRoute("/anti-ragging")({
  head: () => ({
    meta: [
      { title: "Anti-Ragging Cell — Government Polytechnic, Anakapalli" },
      { name: "description", content: "Anti-ragging policy, committee and helpline numbers at Government Polytechnic, Anakapalli." },
    ],
  }),
  component: AntiRaggingPage,
});

function AntiRaggingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Zero Tolerance"
        title="Anti-Ragging Cell."
        description="Government Polytechnic, Anakapalli enforces a strict zero-tolerance policy against ragging in any form."
        breadcrumb={[{ label: "Anti-Ragging" }]}
        image={headerImg}
      />

      <Section>
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 md:p-8 flex gap-4">
          <AlertTriangle className="h-7 w-7 text-destructive shrink-0" />
          <div>
            <h2 className="font-display text-xl font-semibold text-destructive">Ragging is a punishable offence</h2>
            <p className="mt-2 text-sm text-foreground leading-relaxed">
              As per UGC Regulations 2009 and Supreme Court directives, ragging in any form is strictly
              prohibited. Offenders face suspension, expulsion and criminal prosecution.
            </p>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Helpline" title="Report immediately. We're here 24/7." />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t: "National Anti-Ragging Helpline", v: "1800-180-5522", icon: Phone },
            { t: "Campus Anti-Ragging Cell", v: "+91 90102 22173", icon: Phone },
            { t: "Email Complaint", v: "polytechnic.government173@gmail.com", icon: Mail },
            { t: "Principal's Office", v: "+91 90102 22173", icon: Phone },
            { t: "UGC Helpline", v: "helpline@antiragging.in", icon: Mail },
            { t: "Women Helpline", v: "1091", icon: Phone },
          ].map(({ t, v, icon: Icon }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <Icon className="h-5 w-5 text-gold" />
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{t}</div>
              <div className="mt-1 font-display text-lg font-semibold text-primary">{v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Committee" title="Anti-Ragging Committee" />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ["Chairperson", "Principal", "Prof. I.V.S.S. Srinivasa Rao"],
            ["Convener", "CME HOD", "Sri M. Subramanyam"],
            ["Member", "ECE HOD", "Sri P. Srinivas"],
            ["Member", "Head of General Section", "Dr. Govinda Rao Konkyana"],
            ["Member", "Administrative Officer", "Sri P.V. Srinivasa Rao"],
            ["Member (Student)", "Student Representative", "Class Representative"],
          ].map(([role, post, name]) => (
            <div key={name} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <ShieldAlert className="h-5 w-5 text-primary" />
                <div className="text-xs text-muted-foreground">{role}</div>
              </div>
              <div className="mt-3 font-semibold">{name}</div>
              <div className="text-xs text-muted-foreground">{post}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Policy" title="What constitutes ragging" />
        <ul className="mt-6 grid gap-3 max-w-3xl">
          {[
            "Any disorderly conduct that causes annoyance, hardship or psychological harm to a junior student.",
            "Asking a student to do any act which causes shame or embarrassment.",
            "Any act of financial extortion or forceful expenditure.",
            "Any act of physical abuse including sexual harassment.",
            "Any act of abuse by spoken words, emails, posts on social media.",
          ].map((p) => (
            <li key={p} className="flex gap-3 rounded-lg bg-card border border-border p-4 text-sm">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive font-semibold text-xs">!</span>
              <span className="text-muted-foreground">{p}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
