import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Building2, Briefcase, Bell, Award, Download,
  ClipboardList, Users, Calendar, FileText, Quote, BookOpen,
  Factory, GraduationCap, BookMarked,
} from "lucide-react";
import heroImg        from "@/assets/hero-campus.jpg";
import principalImg   from "@/assets/principal.jpg";
import deptCmeImg     from "@/assets/dept-cme.jpg";
import deptEceImg     from "@/assets/dept-ece.jpg";
import galleryLab     from "@/assets/gallery-lab.jpg";
import galleryClass   from "@/assets/gallery-classroom.jpg";
import galleryEvent   from "@/assets/gallery-event.jpg";
import galleryWorkshop from "@/assets/gallery-workshop.jpg";
import galleryLibrary from "@/assets/gallery-library.jpg";
import galleryCampus  from "@/assets/gallery-campus.jpg";
import { Section, SectionHeading } from "@/components/site/Section";
import { Counter } from "@/components/site/Counter";
import { useAdmin } from "@/contexts/AdminContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Government Polytechnic, Anakapalli — Premier Diploma Institution" },
      { name: "description", content: "SBTET Andhra Pradesh recognised diploma programs in Computer Engineering and Electronics & Communication Engineering. Modern labs, experienced faculty and strong placements." },
    ],
  }),
  component: HomePage,
});

// ─── Static data ──────────────────────────────────────────────────────────────

const QUICK = [
  { to: "/departments", icon: Building2,   label: "Departments", desc: "CME & ECE"          },
  { to: "/faculty",     icon: Users,        label: "Faculty",     desc: "Meet our team"       },
  { to: "/placements",  icon: Briefcase,    label: "Placements",  desc: "Career pathways"     },
  { to: "/notices",     icon: Bell,         label: "Notices",     desc: "Latest updates"      },
  { to: "/scholarships",icon: Award,        label: "Scholarships",desc: "SC/ST/BC/EBC"        },
  { to: "/downloads",   icon: Download,     label: "Downloads",   desc: "Forms & syllabus"    },
  { to: "/notices",     icon: ClipboardList,label: "Results",     desc: "Sem & exam results"  },
  { to: "/library",     icon: BookOpen,     label: "Library",     desc: "Books & e-resources" },
] as const;

const GALLERY = [
  { src: galleryLab,      alt: "Computer lab"    },
  { src: galleryClass,    alt: "Classroom"       },
  { src: galleryWorkshop, alt: "Workshop"        },
  { src: galleryLibrary,  alt: "Library"         },
  { src: galleryEvent,    alt: "Campus event"    },
  { src: galleryCampus,   alt: "Campus building" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

function HomePage() {
  const { content } = useAdmin();
  const recentNotices = content.notices.slice(0, 4);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImg}
          alt="Campus building"
          width={1920} height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
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
              An SBTET-recognised institution offering three-year diploma programs in Computer
              Engineering and Electronics &amp; Communication Engineering. Our campus at Rebaka
              village is equipped with modern laboratories, high-speed networking and experienced
              faculty committed to student success.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/departments"
                className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground shadow-soft hover:opacity-95 transition"
              >
                Explore Departments <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-semibold hover:bg-white/10 transition"
              >
                About the Institution
              </Link>
            </div>

            <dl className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              {[
                ["2008", "Established"],
                ["2",    "Diploma programs"],
                ["132",  "Annual intake"],
                ["9.74", "Acre campus"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-xl md:text-3xl font-semibold text-gold">{v}</dt>
                  <dd className="text-xs opacity-75 mt-0.5">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── QUICK ACCESS ─────────────────────────────────────────────────── */}
      <Section muted>
        <SectionHeading
          eyebrow="Quick Access"
          title="Everything students and parents need"
          description="Find results, scholarships, notices and academic resources all in one place."
        />
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK.map(({ to, icon: Icon, label, desc }) => (
            <Link
              key={label} to={to}
              className="group rounded-xl border border-border bg-card p-4 shadow-soft hover:shadow-elevated hover:-translate-y-0.5 transition"
            >
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <Icon className="h-4 w-4" />
              </div>
              <div className="mt-3 font-semibold text-sm text-foreground">{label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="A trusted government institution with a modern outlook."
              description="Industry-relevant curriculum, well-equipped labs and dedicated mentoring on a calm 9.74-acre campus."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Government recognised",  "AICTE and SBTET Andhra Pradesh approved"],
                ["Affordable education",   "Subsidised fees with full scholarship support"],
                ["Industry-ready labs",    "200+ computers, CISCO routing and switching"],
                ["Safe and modern campus", "CCTV, AEBAS biometric, RO/UV drinking water"],
              ].map(([t, d]) => (
                <li key={t} className="rounded-xl border border-border p-3">
                  <div className="font-semibold text-sm text-foreground">{t}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{d}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── 4 counter boxes — updated values ── */}
          <div className="grid grid-cols-2 gap-3">
            {[
              [132,  "",    "Annual intake"      ],
              [200,  "+",   "Computers in labs"  ],
              [8.5,  " LPA","Highest package"    ],
              [12,   "+",   "Laboratories"       ],
            ].map(([n, s, l]) => (
              <div key={l as string} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="font-display text-3xl md:text-5xl font-semibold text-primary">
                  <Counter to={n as number} suffix={s as string} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{l as string}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── ACADEMICS — photo cards ───────────────────────────────────────── */}
      <Section muted>
        <SectionHeading
          eyebrow="Academics"
          title="Two diploma programs. One commitment to excellence."
          description="Three-year SBTET-approved diploma courses with strong fundamentals and hands-on training."
          center
        />
        <div className="mt-8 grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">

          {/* CME */}
          <Link
            to="/departments"
            className="group relative h-72 rounded-2xl overflow-hidden shadow-elevated cursor-pointer"
          >
            <img
              src={deptCmeImg}
              alt="Computer Engineering department"
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="text-[10px] font-mono font-bold text-white/60 uppercase tracking-widest">CME</span>
              <h3 className="mt-1 font-display text-xl font-bold text-white leading-snug">
                Computer Engineering
              </h3>
              <p className="mt-1.5 text-xs text-white/75 leading-relaxed line-clamp-2">
                Programming, web development, databases, computer networks and AI essentials.
                Build software skills for today's industry.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold group-hover:gap-2.5 transition-all">
                Explore Department <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>

          {/* ECE */}
          <Link
            to="/departments"
            className="group relative h-72 rounded-2xl overflow-hidden shadow-elevated cursor-pointer"
          >
            <img
              src={deptEceImg}
              alt="Electronics and Communication Engineering department"
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="text-[10px] font-mono font-bold text-white/60 uppercase tracking-widest">ECE</span>
              <h3 className="mt-1 font-display text-xl font-bold text-white leading-snug">
                Electronics &amp; Communication Engineering
              </h3>
              <p className="mt-1.5 text-xs text-white/75 leading-relaxed line-clamp-2">
                Analog and digital electronics, embedded systems, communication and VLSI.
                Build hardware skills for modern industry.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold group-hover:gap-2.5 transition-all">
                Explore Department <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </Section>

      {/* ── AFTER THE DIPLOMA — placements first ─────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="After the Diploma"
          title="Three clear paths forward."
          description="A diploma from this institution opens three strong doors. Choose the one that fits your goal."
          center
        />

        <div className="mt-8 grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">

          {/* 1. Industry Placements */}
          <Link
            to="/placements"
            className="group rounded-2xl border-2 border-primary bg-card p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all flex flex-col"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
              <Factory className="h-6 w-6" />
            </div>
            <div className="mt-4 font-display text-lg font-bold text-foreground">Industry Placements</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
              Join companies like TCS, Wipro, Daikin, Royal Enfield and Tata Electronics directly
              after your diploma. Our placement cell provides aptitude training, mock interviews
              and industry connections. Packages range from 1.4 LPA to 8.5 LPA.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
              View placements <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          {/* 2. AMIE */}
          <Link
            to="/placements"
            className="group rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all flex flex-col"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-100 text-amber-700">
              <BookMarked className="h-6 w-6" />
            </div>
            <div className="mt-4 font-display text-lg font-bold text-foreground">AMIE</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
              The Associate Membership of the Institution of Engineers (India) is a
              degree-equivalent qualification. Study while working at your own pace and
              earn a nationally recognised engineering credential without full-time college.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
              Learn more <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          {/* 3. B.Tech via ECET */}
          <Link
            to="/placements"
            className="group rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all flex flex-col"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="mt-4 font-display text-lg font-bold text-foreground">B.Tech via ECET</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
              Appear for AP ECET and secure lateral entry into the second year of a B.Tech
              program at top engineering colleges across Andhra Pradesh. Our faculty provide
              dedicated ECET coaching, mock tests and college counselling support.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
              Learn more <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* Campus facilities strip below */}
        <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Campus facilities
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              "Seminar Hall", "Central Library", "Girls Waiting Hall",
              "RO/UV Drinking Water", "CCTV Surveillance",
              "AEBAS Biometric", "CISCO Networking", "Skill Dev. Centre",
              "Playgrounds", "Intercom System",
            ].map((r) => (
              <div key={r} className="rounded-lg bg-card border border-border px-3 py-2 text-xs font-semibold text-foreground text-center shadow-soft">
                {r}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PRINCIPAL ────────────────────────────────────────────────────── */}
      <Section muted>
        <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-center max-w-5xl mx-auto">
          <div className="relative mx-auto lg:mx-0">
            <img
              src={principalImg}
              alt="Principal"
              width={800} height={1024} loading="lazy"
              className="h-48 w-48 md:h-64 md:w-64 rounded-2xl object-cover shadow-elevated"
            />
            <div className="absolute -bottom-3 -right-3 rounded-xl bg-gold text-gold-foreground px-3 py-1.5 text-xs font-semibold shadow-soft">
              Principal's Desk
            </div>
          </div>
          <div>
            <Quote className="h-8 w-8 text-gold" />
            <p className="mt-3 text-sm md:text-lg leading-relaxed text-foreground">
              "{content.siteInfo.principalMessage}"
            </p>
            <div className="mt-4">
              <div className="font-display font-semibold text-sm md:text-base text-foreground">
                {content.siteInfo.principalName}
              </div>
              <div className="text-xs text-muted-foreground">
                {content.siteInfo.principalDesignation}
              </div>
              <Link to="/principal" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold">
                Read full message <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ── NOTICES ──────────────────────────────────────────────────────── */}
      <Section>
        <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
          <SectionHeading eyebrow="Updates" title="Latest notices and announcements" />
          <Link to="/notices" className="text-sm font-semibold text-primary hover:text-gold inline-flex items-center gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {recentNotices.map((n) => (
            <article key={n.id} className="group rounded-xl border border-border bg-card p-4 hover:shadow-elevated transition">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {n.date}
                </span>
                <span className="rounded-full bg-primary/5 text-primary px-2 py-0.5 font-medium">
                  {n.category}
                </span>
                {n.urgent && (
                  <span className="rounded-full bg-red-100 text-red-600 px-2 py-0.5 font-bold text-[10px]">URGENT</span>
                )}
              </div>
              <h3 className="mt-2 font-semibold text-sm text-foreground group-hover:text-primary leading-snug">
                {n.title}
              </h3>
              <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-gold">
                <FileText className="h-3.5 w-3.5" /> Download PDF
              </button>
            </article>
          ))}
        </div>
      </Section>

      {/* ── GALLERY ──────────────────────────────────────────────────────── */}
      <Section muted>
        <SectionHeading eyebrow="Campus Life" title="Our Campus" center />
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {GALLERY.map((g, i) => (
            <div
              key={i}
              className={[
                "overflow-hidden rounded-xl",
                i === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-[4/3]",
                i >= 3  ? "hidden md:block" : "",
              ].join(" ")}
            >
              <img
                src={g.src} alt={g.alt}
                loading="lazy" width={1024} height={768}
                className="h-full w-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ))}
        </div>
        <div className="mt-5 text-center">
          <Link to="/gallery" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-accent">
            View full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-page py-10 md:py-16 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-semibold">
            Have a question? We are here to help.
          </h2>
          <p className="mt-2 max-w-xl mx-auto opacity-85 text-sm md:text-base">
            Reach our office for academic queries, certificates or general information.
            Admissions are conducted centrally through SBTET Andhra Pradesh via POLYCET.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground hover:opacity-95"
          >
            Contact the Office <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}