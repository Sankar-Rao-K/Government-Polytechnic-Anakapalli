import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Building2, Briefcase, Bell, Award, Download,
  ClipboardList, Users, Cpu, Radio, Calendar, FileText, Quote, BookOpen,
} from "lucide-react";
import heroImg from "@/assets/hero-campus.jpg";
import principalImg from "@/assets/principal.jpg";
import galleryLab from "@/assets/gallery-lab.jpg";
import galleryClass from "@/assets/gallery-classroom.jpg";
import galleryEvent from "@/assets/gallery-event.jpg";
import galleryWorkshop from "@/assets/gallery-workshop.jpg";
import galleryLibrary from "@/assets/gallery-library.jpg";
import galleryCampus from "@/assets/gallery-campus.jpg";
import { Section, SectionHeading } from "@/components/site/Section";
import { Counter } from "@/components/site/Counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Government Polytechnic, Anakapalli — Premier Diploma Institution" },
      { name: "description", content: "Government Polytechnic, Anakapalli — SBTET Andhra Pradesh recognized diploma programs in Computer Engineering (CME) and Electronics & Communication Engineering (ECE). Modern labs and strong placements." },
    ],
  }),
  component: HomePage,
});

const QUICK = [
  { to: "/departments", icon: Building2, label: "Departments", desc: "CME & ECE" },
  { to: "/faculty", icon: Users, label: "Faculty", desc: "Meet our team" },
  { to: "/placements", icon: Briefcase, label: "Placements", desc: "Strong record" },
  { to: "/notices", icon: Bell, label: "Notices", desc: "Latest updates" },
  { to: "/scholarships", icon: Award, label: "Scholarships", desc: "SC/ST/BC/EBC" },
  { to: "/downloads", icon: Download, label: "Downloads", desc: "Forms & syllabus" },
  { to: "/notices", icon: ClipboardList, label: "Results", desc: "Sem & exam" },
  { to: "/library", icon: BookOpen, label: "Library", desc: "Books & e-resources" },
] as const;

const DEPTS = [
  { icon: Cpu, name: "Computer Engineering", code: "CME", desc: "Programming foundations, web & mobile development, databases, networks and AI essentials." },
  { icon: Radio, name: "Electronics & Communication Engineering", code: "ECE", desc: "Analog & digital electronics, embedded systems, communication and VLSI fundamentals." },
];

const RECRUITERS = ["TCS", "Infosys", "Wipro", "L&T", "Bosch", "HCL", "Tech Mahindra", "Cognizant", "Capgemini", "Reliance"];

const NOTICES = [
  { date: "12 May 2026", cat: "Examination", title: "III Semester end-exam timetable announced" },
  { date: "08 May 2026", cat: "Placements", title: "TCS recruitment drive on 22 May — register now" },
  { date: "02 May 2026", cat: "Academics", title: "Industrial visit schedule for CME & ECE" },
  { date: "28 Apr 2026", cat: "Scholarships", title: "Post-matric scholarship renewal forms open" },
];

const GALLERY = [
  { src: galleryLab, alt: "Computer lab" },
  { src: galleryClass, alt: "Classroom" },
  { src: galleryWorkshop, alt: "Workshop" },
  { src: galleryLibrary, alt: "Library" },
  { src: galleryEvent, alt: "Campus event" },
  { src: galleryCampus, alt: "Campus building" },
];

function HomePage() {
  return (
    <>
      {/* HERO — compact on mobile */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img src={heroImg} alt="Government Polytechnic, Anakapalli campus"
          width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="container-page relative py-12 md:py-28">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Government of Andhra Pradesh · Estd. 2008
            </div>
            <h1 className="mt-4 font-display text-3xl md:text-6xl font-semibold leading-tight">
              Building skilled engineers for a stronger India.
            </h1>
            <p className="mt-3 text-sm md:text-lg opacity-85 max-w-2xl leading-relaxed line-clamp-3 md:line-clamp-none">
              Government Polytechnic, Anakapalli offers SBTET-recognized diploma programs in
              Computer Engineering and Electronics & Communication — set on a 9.74-acre campus
              at Rebaka village with modern laboratories, 100 Mbps networked classrooms and
              dedicated faculty.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/departments"
                className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground shadow-soft hover:opacity-95 transition">
                Explore Departments <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/about"
                className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-semibold hover:bg-white/10 transition">
                About the Institution
              </Link>
            </div>

            {/* Stats — 2×2 on mobile, 4 across on desktop */}
            <dl className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              {[["2008", "Established"], ["2", "Diploma programs"], ["132", "Annual intake"], ["9.74", "Acre campus"]].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-xl md:text-3xl font-semibold text-gold">{v}</dt>
                  <dd className="text-xs opacity-75 mt-0.5">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS */}
      <Section muted>
        <SectionHeading
          eyebrow="Quick Access"
          title="Everything students and parents need"
          description="Find results, scholarships, notices and academic resources — all in one place."
        />
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK.map(({ to, icon: Icon, label, desc }) => (
            <Link key={label} to={to}
              className="group rounded-xl border border-border bg-card p-4 shadow-soft hover:shadow-elevated hover:-translate-y-0.5 transition">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <Icon className="h-4 w-4" />
              </div>
              <div className="mt-3 font-semibold text-sm text-foreground">{label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* WHY */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <SectionHeading
              eyebrow="Why Government Polytechnic, Anakapalli"
              title="A trusted government institution with a modern outlook."
              description="Industry-relevant curriculum, well-equipped labs and dedicated mentoring — on a calm 9.74-acre campus."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Government recognized", "AICTE & SBTET Andhra Pradesh approved"],
                ["Affordable education", "Subsidized fees with full scholarship support"],
                ["Industry-ready labs", "150+ computers, CISCO routing & switching"],
                ["Safe & modern campus", "CCTV, AEBAS biometric, RO/UV water"],
              ].map(([t, d]) => (
                <li key={t} className="rounded-xl border border-border p-3">
                  <div className="font-semibold text-sm text-foreground">{t}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{d}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[[132, "", "Annual intake"], [150, "+", "Computers in labs"], [100, " Mbps", "Internet connectivity"], [9, "+ acres", "Green campus"]].map(([n, s, l]) => (
              <div key={l as string} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="font-display text-3xl md:text-5xl font-semibold text-primary">
                  <Counter to={n as number} suffix={s as string} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* DEPARTMENTS */}
      <Section muted>
        <SectionHeading
          eyebrow="Academics"
          title="Two diploma programs. One commitment to excellence."
          description="Three-year SBTET-approved diploma courses with strong fundamentals and hands-on training."
          center
        />
        <div className="mt-8 grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {DEPTS.map(({ icon: Icon, name, code, desc }) => (
            <div key={code} className="group rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated transition">
              <div className="flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono font-semibold text-muted-foreground tracking-wider">{code}</span>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{name}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              <Link to="/departments" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold">
                Explore department <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* AFTER DIPLOMA */}
      <Section>
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div>
            <SectionHeading
              eyebrow="After the Diploma"
              title="Higher education first, with placement support too."
              description="Nearly all graduates progress to B.Tech via ECET or AMIE. Placement support is available for industry roles and apprenticeships."
            />
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[["B.Tech", "via ECET"], ["AMIE", "Pathway"], ["Industry", "Placements"]].map(([v, l]) => (
                <div key={l} className="rounded-xl border border-border bg-card p-3 text-center">
                  <div className="font-display text-base font-semibold text-primary">{v}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{l}</div>
                </div>
              ))}
            </div>
            <Link to="/placements" className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-95">
              Explore career pathways <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Campus facilities</div>
            <div className="grid grid-cols-2 gap-2">
              {["Seminar Hall", "Central Library", "Girls Waiting Hall", "Playgrounds", "RO/UV Drinking Water", "CCTV Surveillance", "AEBAS Biometric", "CISCO Networking", "Skill Dev. Center", "Intercom System"].map((r) => (
                <div key={r} className="rounded-lg bg-card border border-border px-3 py-2 text-xs font-semibold text-foreground text-center shadow-soft">
                  {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PRINCIPAL */}
      <Section muted>
        <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-center max-w-5xl mx-auto">
          <div className="relative mx-auto lg:mx-0">
            <img src={principalImg} alt="Principal portrait" width={800} height={1024} loading="lazy"
              className="h-48 w-48 md:h-64 md:w-64 rounded-2xl object-cover shadow-elevated" />
            <div className="absolute -bottom-3 -right-3 rounded-xl bg-gold text-gold-foreground px-3 py-1.5 text-xs font-semibold shadow-soft">
              Principal's Desk
            </div>
          </div>
          <div>
            <Quote className="h-8 w-8 text-gold" />
            <p className="mt-3 text-sm md:text-lg leading-relaxed text-foreground">
              "Since 2008, our institution has nurtured technical competence, innovation and ethical values.
              With NBA-accredited diploma programs, a state-of-the-art IoT Laboratory and 100% placements
              over the last three years, we remain committed to transforming students into responsible
              citizens and skilled professionals."
            </p>
            <div className="mt-4">
              <div className="font-display font-semibold text-sm md:text-base text-foreground">Prof. I.V.S.S. Srinivasa Rao, M.E.</div>
              <div className="text-xs text-muted-foreground">Principal, Government Polytechnic, Anakapalli</div>
              <Link to="/principal" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold">
                Read full message <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* NOTICES */}
      <Section>
        <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
          <SectionHeading eyebrow="Updates" title="Latest notices & announcements" />
          <Link to="/notices" className="text-sm font-semibold text-primary hover:text-gold inline-flex items-center gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {NOTICES.map((n) => (
            <article key={n.title} className="group rounded-xl border border-border bg-card p-4 hover:shadow-elevated transition">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {n.date}</span>
                <span className="rounded-full bg-primary/5 text-primary px-2 py-0.5 font-medium">{n.cat}</span>
              </div>
              <h3 className="mt-2 font-semibold text-sm text-foreground group-hover:text-primary">{n.title}</h3>
              <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-gold">
                <FileText className="h-3.5 w-3.5" /> Download PDF
              </button>
            </article>
          ))}
        </div>
      </Section>

      {/* GALLERY — 3 images on mobile instead of 6 */}
      <Section muted>
        <SectionHeading eyebrow="Campus Life" title="A glimpse of GP Anakapalli" center />
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {GALLERY.map((g, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-[4/3]"} ${i >= 3 ? "hidden md:block" : ""}`}
            >
              <img src={g.src} alt={g.alt} loading="lazy" width={1024} height={768}
                className="h-full w-full object-cover hover:scale-105 transition duration-500" />
            </div>
          ))}
        </div>
        <div className="mt-5 text-center">
          <Link to="/gallery" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-accent">
            View full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-page py-10 md:py-16 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-semibold">Have a question? We're here to help.</h2>
          <p className="mt-2 max-w-xl mx-auto opacity-85 text-sm md:text-base">
            Reach our office for academic queries, certificates or general information.
            Admissions are conducted centrally through SBTET Andhra Pradesh via POLYCET.
          </p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground hover:opacity-95">
            Contact the Office <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}