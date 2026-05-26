import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import galleryLab from "@/assets/gallery-lab.jpg";
import galleryClass from "@/assets/gallery-classroom.jpg";
import galleryEvent from "@/assets/gallery-event.jpg";
import galleryWorkshop from "@/assets/gallery-workshop.jpg";
import galleryLibrary from "@/assets/gallery-library.jpg";
import galleryCampus from "@/assets/gallery-campus.jpg";
import heroImg from "@/assets/hero-campus.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Government Polytechnic, Anakapalli" },
      { name: "description", content: "Campus life, labs, classrooms, events and workshops at Government Polytechnic, Anakapalli." },
    ],
  }),
  component: GalleryPage,
});

const ITEMS = [
  { src: heroImg, cat: "Campus", alt: "Main campus view" },
  { src: galleryLab, cat: "Labs", alt: "Computer lab" },
  { src: galleryClass, cat: "Classroom", alt: "Classroom session" },
  { src: galleryWorkshop, cat: "Workshop", alt: "Mechanical workshop" },
  { src: galleryLibrary, cat: "Library", alt: "Library" },
  { src: galleryEvent, cat: "Events", alt: "Campus event" },
  { src: galleryCampus, cat: "Campus", alt: "Building facade" },
  { src: galleryLab, cat: "Labs", alt: "Lab session" },
  { src: galleryClass, cat: "Classroom", alt: "Lecture hall" },
];

function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Campus life in pictures."
        description="Moments from classrooms, labs, workshops, events and everyday college life."
        breadcrumb={[{ label: "Gallery" }]}
        image={heroImg}
      />
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ITEMS.map((it, i) => (
            <figure key={i} className="group overflow-hidden rounded-xl border border-border bg-card relative">
              <img src={it.src} alt={it.alt} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-background/95 backdrop-blur px-3 py-1 text-xs font-semibold text-primary">
                {it.cat}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}
