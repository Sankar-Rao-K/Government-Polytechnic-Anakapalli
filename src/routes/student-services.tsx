import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { Heart, Home, Bus, Trophy, Stethoscope, Users, ShieldCheck, HandHelping } from "lucide-react";
import headerImg from "@/assets/gallery-classroom.jpg";

export const Route = createFileRoute("/student-services")({
  head: () => ({
    meta: [
      { title: "Student Services — Government Polytechnic, Anakapalli" },
      { name: "description", content: "Hostel, transport, sports, health, counselling and welfare services for students of Government Polytechnic, Anakapalli." },
    ],
  }),
  component: ServicesPage,
});

const SVCS = [
  { icon: Home, t: "Hostel Facilities", d: "Separate hostels for boys and girls with hygienic mess, study halls, Wi-Fi, and 24/7 security." },
  { icon: Bus, t: "Transport", d: "College bus service connects students from Visakhapatnam, Yelamanchili and nearby towns." },
  { icon: Trophy, t: "Sports & Games", d: "Cricket, volleyball, kabaddi, athletics, indoor games — annual sports meet and inter-college tournaments." },
  { icon: Stethoscope, t: "Medical Care", d: "On-campus first-aid unit. Tie-up with Anakapalli area hospital for emergency medical assistance." },
  { icon: Heart, t: "Counselling Cell", d: "Confidential academic and personal counselling support for every student." },
  { icon: Users, t: "Student Clubs", d: "Tech, cultural, literary, NSS, eco and entrepreneurship clubs led by students." },
  { icon: ShieldCheck, t: "Women's Cell", d: "Dedicated cell to ensure safety, dignity and grievance redressal for women students." },
  { icon: HandHelping, t: "Grievance Redressal", d: "Online and in-person grievance portal — every complaint is acknowledged within 48 hours." },
];

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Student Life"
        title="Beyond the classroom."
        description="A full range of welfare, infrastructure and co-curricular services that support every student's journey."
        breadcrumb={[{ label: "Student Services" }]}
        image={headerImg}
      />

      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SVCS.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/5 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
