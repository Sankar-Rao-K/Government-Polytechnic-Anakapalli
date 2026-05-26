import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { FileText, Download } from "lucide-react";
import headerImg from "@/assets/gallery-library.jpg";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads — Government Polytechnic, Anakapalli" },
      { name: "description", content: "Download forms, syllabus, circulars and academic resources from Government Polytechnic, Anakapalli." },
    ],
  }),
  component: DownloadsPage,
});

const SECTIONS = [
  {
    title: "Student Forms",
    items: ["Bonafide Certificate Request", "Transfer Certificate Application", "Duplicate ID Card Request", "Branch Change Application"],
  },
  {
    title: "Syllabus & Curriculum",
    items: ["CME Syllabus (3-year)", "ECE Syllabus (3-year)", "Academic Calendar 2025-26", "Lab Manuals"],
  },
  {
    title: "Examination",
    items: ["Exam Timetable — Sem III", "Revaluation Form", "Migration Certificate Form", "Duplicate Marks Memo Application"],
  },
  {
    title: "Scholarships & Welfare",
    items: ["ePASS Renewal Form", "PMSS Form", "Hostel Application", "Fee Concession Request"],
  },
  {
    title: "General",
    items: ["College Brochure", "Annual Report 2024", "Anti-Ragging Affidavit", "Code of Conduct"],
  },
];

function DownloadsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Downloads & forms."
        description="All academic forms, syllabus copies and circulars in one place."
        breadcrumb={[{ label: "Downloads" }]}
        image={headerImg}
      />
      <Section>
        <div className="grid gap-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-xl font-semibold text-primary mb-4">{s.title}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {s.items.map((it) => (
                  <a key={it} href="#" className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 hover:shadow-elevated transition">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/5 text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary">{it}</span>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
