import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { BookOpen, Monitor, Newspaper, Wifi, Clock } from "lucide-react";
import galleryLibrary from "@/assets/gallery-library.jpg";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Central Library — Government Polytechnic, Anakapalli" },
      { name: "description", content: "Central library facilities, collections and digital resources at Government Polytechnic, Anakapalli." },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Knowledge Hub"
        title="The Central Library."
        description="A modern, well-stocked library that serves as the academic heart of our campus."
        breadcrumb={[{ label: "Library" }]}
        image={galleryLibrary}
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <img src={galleryLibrary} alt="Library" width={1024} height={768} loading="lazy" className="rounded-2xl shadow-elevated" />
          <div>
            <SectionHeading eyebrow="At a glance" title="Books, journals, and digital access." />
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                ["24,000+", "Books"],
                ["120+", "Journals"],
                ["12,000+", "E-books"],
                ["50", "Reading seats"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl border border-border bg-card p-4">
                  <div className="font-display text-2xl font-semibold text-primary">{v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Facilities" title="What the library offers" center />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: BookOpen, t: "Reference Section", d: "Curated reference books, handbooks and competitive exam material." },
            { icon: Monitor, t: "Digital Library", d: "Access to NPTEL, IEEE Xplore, Springer, and DELNET e-resources." },
            { icon: Newspaper, t: "Periodicals", d: "National & international journals, magazines and newspapers." },
            { icon: Wifi, t: "Wi-Fi Reading Zone", d: "Quiet, high-speed Wi-Fi study area open to all students." },
            { icon: Clock, t: "Extended Hours", d: "Open Mon–Sat: 8 AM – 8 PM. Exam season: extended to 10 PM." },
            { icon: BookOpen, t: "Book Bank", d: "Free textbook loan for SC/ST and economically weaker students." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-12">
          <SectionHeading eyebrow="Rules" title="Library guidelines" />
          <ul className="mt-6 grid md:grid-cols-2 gap-3 text-sm opacity-90">
            {[
              "Carry your ID card at all times inside the library.",
              "Maintain silence in the reading hall.",
              "Books may be borrowed for 14 days, renewable once.",
              "Mobile phones must be on silent mode.",
              "Food and drinks are not allowed inside.",
              "Lost or damaged books must be replaced or paid for.",
            ].map((r) => (
              <li key={r} className="flex gap-3"><span className="text-gold">•</span> {r}</li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
