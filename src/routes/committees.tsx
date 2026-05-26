import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { useState } from "react";
import headerImg from "@/assets/gallery-campus.jpg";
import {
  ShieldAlert,
  Users,
  FileSearch,
  HeartHandshake,
  ShieldCheck,
  UserCheck,
  Scale,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/committees")({
  head: () => ({
    meta: [
      { title: "Committees — Government Polytechnic, Anakapalli" },
      {
        name: "description",
        content:
          "Institutional committees at Government Polytechnic, Anakapalli — Grievance Cell, Anti-Ragging, ICC, SC/ST Cell, Women Protection Cell, RTI and Student Advisors.",
      },
    ],
  }),
  component: CommitteesPage,
});

// ─── Data ────────────────────────────────────────────────────────────────────

type Member = { name: string; role: string; designation: string };

type Committee = {
  id: string;
  icon: React.ElementType;
  color: string;
  title: string;
  shortTitle: string;
  procNo: string;
  date: string;
  purpose: string;
  description: string;
  members: Member[];
  reportable: boolean;
  reportNote?: string;
};

const COMMITTEES: Committee[] = [
  {
    id: "student-advisors",
    icon: UserCheck,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    title: "Student Advisors",
    shortTitle: "Student Advisors",
    procNo: "B/In-charge Arrangements/2025",
    date: "20 July 2025",
    purpose: "Welfare, discipline and counselling of students",
    description:
      "Student Advisors are appointed to ensure the welfare, discipline and counselling of both male and female students. They coordinate with each other to address all student-related issues.",
    members: [
      {
        name: "R. Ganesh Kumar",
        role: "Advisor — Male Students",
        designation: "Lecturer, Mathematics",
      },
      {
        name: "Ch. Sarojini",
        role: "Advisor — Female Students",
        designation: "Lecturer, CME",
      },
    ],
    reportable: true,
    reportNote:
      "Reach out if you need personal counselling, have discipline concerns, or need welfare support.",
  },
  {
    id: "grievance-cell",
    icon: HeartHandshake,
    color: "bg-green-50 text-green-700 border-green-200",
    title: "Grievance Cell",
    shortTitle: "Grievance Cell",
    procNo: "B/1/Grievance/2025",
    date: "20 July 2025",
    purpose: "Receive and resolve grievances of staff and students",
    description:
      "The Staff-cum-Student Grievance Cell receives grievances and suggestions from students and staff and attends to them immediately. Any academic, personal or institutional grievance can be reported here.",
    members: [
      {
        name: "P. Srinivas",
        role: "Chairperson",
        designation: "HOD, ECE Section",
      },
      {
        name: "Dr. K. Govinda Rao",
        role: "Member",
        designation: "HOD, General Sciences",
      },
      {
        name: "B. Narasimha Murthy",
        role: "Member",
        designation: "Sr. Lecturer, CME",
      },
      {
        name: "Ch. Sarojini",
        role: "Member",
        designation: "Lecturer, CME",
      },
      {
        name: "B. Srikavya",
        role: "Member",
        designation: "Lecturer, ECE",
      },
      {
        name: "L. Mohana Tirumala",
        role: "Member",
        designation: "Lecturer, CME",
      },
    ],
    reportable: true,
    reportNote:
      "Submit your grievance or suggestion here. All submissions are treated confidentially.",
  },
  {
    id: "anti-ragging",
    icon: ShieldAlert,
    color: "bg-red-50 text-red-700 border-red-200",
    title: "Anti-Ragging Committee",
    shortTitle: "Anti-Ragging",
    procNo: "B/001/2025",
    date: "20 July 2025",
    purpose: "Prevention and elimination of ragging in the institution",
    description:
      "The Anti-Ragging Committee enforces a strict zero-tolerance policy against ragging in any form — physical, verbal, psychological or online. Complaints are acted upon immediately and confidentially.",
    members: [
      {
        name: "P. Srinivas",
        role: "Chairperson",
        designation: "HOD, ECE Section",
      },
      {
        name: "Dr. K. Govinda Rao",
        role: "Member",
        designation: "HOD, General Sciences",
      },
      {
        name: "B. Narasimha Murthy",
        role: "Member",
        designation: "Sr. Lecturer, CME",
      },
      {
        name: "Y. Srinivasa Rao",
        role: "Member",
        designation: "Sr. Lecturer, Chemistry",
      },
      {
        name: "B. Srikavya",
        role: "Member",
        designation: "Lecturer, ECE",
      },
      {
        name: "B. Suresh",
        role: "Member",
        designation: "Lecturer, CME",
      },
    ],
    reportable: true,
    reportNote:
      "Report ragging incidents here. Your identity will be kept strictly confidential. You may also call the National Anti-Ragging Helpline: 1800-180-5522.",
  },
  {
    id: "icc",
    icon: Scale,
    color: "bg-purple-50 text-purple-700 border-purple-200",
    title: "Internal Complaints Committee (ICC)",
    shortTitle: "ICC",
    procNo: "C2/ICC/2025",
    date: "20 July 2025",
    purpose: "Prevention and redressal of sexual harassment complaints",
    description:
      "Constituted under AICTE's Gender Sensitization, Prevention and Prohibition of Sexual Harassment of Women Employees and Students Regulations 2016. The ICC ensures a safe and respectful environment for all women in the institution.",
    members: [
      {
        name: "Dr. K. Govinda Rao",
        role: "Chairperson",
        designation: "HOD, General Sciences",
      },
      {
        name: "P. Srinivas",
        role: "Member",
        designation: "HOD, ECE Section",
      },
      {
        name: "B. Narasimha Murthy",
        role: "Member",
        designation: "Sr. Lecturer, ECE",
      },
      {
        name: "G. M. Soma Sekhar",
        role: "Member",
        designation: "Lecturer, ECE",
      },
      {
        name: "G. Girish Reddy",
        role: "Member",
        designation: "Lecturer, CME",
      },
      {
        name: "A. Sri Ranga Raju",
        role: "Member",
        designation: "Lecturer, CME",
      },
      {
        name: "Ch. Sarojini",
        role: "Member",
        designation: "Lecturer, CME",
      },
      {
        name: "K. Eswramma",
        role: "Member",
        designation: "Sr. Assistant",
      },
      {
        name: "K. Gabriel Thomas",
        role: "Student Member",
        designation: "III Year, CME",
      },
      {
        name: "P. Ashritha Lakshmi",
        role: "Student Member",
        designation: "II Year, CME",
      },
      {
        name: "L. Yasawani",
        role: "Student Member",
        designation: "II Year, ECE",
      },
    ],
    reportable: true,
    reportNote:
      "All complaints are handled with strict confidentiality as per AICTE regulations. Women students and staff may report any form of sexual harassment here.",
  },
  {
    id: "sc-st-cell",
    icon: ShieldCheck,
    color: "bg-amber-50 text-amber-700 border-amber-200",
    title: "SC/ST Protection Cell",
    shortTitle: "SC/ST Cell",
    procNo: "B/001/2025",
    date: "20 July 2025",
    purpose: "Protection and welfare of SC/ST students and staff",
    description:
      "The SC/ST Protection Cell safeguards the rights and welfare of students and staff belonging to Scheduled Castes and Scheduled Tribes. It addresses discrimination, ensures scholarship access and promotes equal opportunity.",
    members: [
      {
        name: "Y. Srinivasa Rao",
        role: "Chairperson",
        designation: "Sr. Lecturer, Chemistry",
      },
      {
        name: "B. Srikavya",
        role: "Member",
        designation: "Lecturer, ECE",
      },
      {
        name: "B. A. Mangathayaru",
        role: "Member",
        designation: "Jr. Assistant",
      },
      {
        name: "V. Prasanna Kumar",
        role: "Member",
        designation: "Jr. Assistant",
      },
    ],
    reportable: true,
    reportNote:
      "SC/ST students and staff may report discrimination, caste-based harassment, or any denial of rights and entitlements here.",
  },
  {
    id: "women-protection",
    icon: HeartHandshake,
    color: "bg-pink-50 text-pink-700 border-pink-200",
    title: "Women Protection Cell",
    shortTitle: "Women's Cell",
    procNo: "B/001/2025",
    date: "20 July 2025",
    purpose: "Safety, dignity and grievance redressal for women",
    description:
      "The Women Protection Cell ensures the safety, dignity and well-being of all women students and staff. It addresses harassment, safety concerns and any issues impacting the welfare of women on campus.",
    members: [
      {
        name: "Ch. Sarojini",
        role: "Chairperson",
        designation: "Lecturer, CME",
      },
      {
        name: "B. Srikavya",
        role: "Member",
        designation: "Lecturer, ECE",
      },
      {
        name: "L. Mohana Tirumala",
        role: "Member",
        designation: "Lecturer, CME",
      },
      {
        name: "K. Eswramma",
        role: "Member",
        designation: "Sr. Assistant",
      },
      {
        name: "B. Aruna",
        role: "Member",
        designation: "Jr. Assistant",
      },
      {
        name: "K. Jyothi Mahi",
        role: "Member",
        designation: "Jr. Assistant",
      },
    ],
    reportable: true,
    reportNote:
      "Women students and staff may report safety concerns, harassment or any issue affecting their welfare on campus.",
  },
  {
    id: "rti",
    icon: FileSearch,
    color: "bg-slate-50 text-slate-700 border-slate-200",
    title: "RTI — Right to Information",
    shortTitle: "RTI",
    procNo: "B/RTI/2025",
    date: "20 July 2025",
    purpose: "Transparency and public information access under RTI Act 2005",
    description:
      "Under the Right to Information Act 2005, citizens may seek information from the institution. The Appellate Authority, Public Information Officer (PIO) and Assistant PIO are appointed to handle RTI applications and appeals.",
    members: [
      {
        name: "Prof. I.V.S.S. Srinivasa Rao",
        role: "Appellate Authority",
        designation: "Principal",
      },
      {
        name: "P. Srinivas",
        role: "Public Information Officer (PIO)",
        designation: "HOD, ECE Section",
      },
      {
        name: "P. V. Srinivasa Rao",
        role: "Asst. Public Information Officer",
        designation: "Administrative Officer",
      },
    ],
    reportable: false,
  },
];

// ─── Report Modal ─────────────────────────────────────────────────────────────

type ReportFormProps = {
  committee: Committee;
  onClose: () => void;
};

function ReportModal({ committee, onClose }: ReportFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    phone: "",
    email: "",
    category: "",
    description: "",
    anonymous: false,
  });

  function handleChange(
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production this would POST to an API endpoint
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-background shadow-elevated overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between bg-primary px-6 py-4 rounded-t-2xl">
          <div>
            <p className="text-xs font-medium text-primary-foreground/70 uppercase tracking-wider">
              Submit Complaint / Report
            </p>
            <h3 className="font-display text-base font-semibold text-primary-foreground mt-0.5">
              {committee.shortTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-primary-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-14 text-center">
            <CheckCircle2 className="h-14 w-14 text-green-500" />
            <h4 className="font-display text-xl font-semibold text-foreground">
              Complaint Submitted
            </h4>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your report has been received by the{" "}
              <strong>{committee.shortTitle}</strong>. The committee will review
              it and act accordingly. If you provided contact details, you will
              be informed of the outcome.
            </p>
            <button
              onClick={onClose}
              className="mt-4 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 grid gap-5">
            {committee.reportNote && (
              <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 leading-relaxed">
                {committee.reportNote}
              </div>
            )}

            {/* Anonymous toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="anonymous"
                checked={form.anonymous}
                onChange={handleChange}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <span className="text-sm font-medium text-foreground">
                Submit anonymously
              </span>
            </label>

            {!form.anonymous && (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      required={!form.anonymous}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Roll No. / Staff ID
                    </label>
                    <input
                      name="rollNo"
                      value={form.rollNo}
                      onChange={handleChange}
                      placeholder="e.g. 23CME01"
                      className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="you@example.com"
                      className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Nature of Complaint *
              </label>
              <select
                required
                name="category"
                value={form.category}
                onChange={handleChange}
                className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Select a category…</option>
                <option>Academic issue</option>
                <option>Ragging / Bullying</option>
                <option>Harassment</option>
                <option>Discrimination</option>
                <option>Safety concern</option>
                <option>Administrative issue</option>
                <option>Infrastructure / Facility</option>
                <option>Other</option>
              </select>
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Describe your complaint *
              </label>
              <textarea
                required
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Please describe the incident or issue in detail — what happened, when, where, and who was involved (if known)."
                className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 transition"
            >
              <Send className="h-4 w-4" />
              Submit Report
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Committee Card ───────────────────────────────────────────────────────────

function CommitteeCard({
  committee,
  onReport,
}: {
  committee: Committee;
  onReport: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = committee.icon;

  const chairperson = committee.members.find(
    (m) =>
      m.role.toLowerCase().includes("chair") ||
      m.role.toLowerCase().includes("appellate")
  );
  const others = committee.members.filter((m) => m !== chairperson);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      {/* Card header */}
      <div className="flex items-start gap-4 p-6">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border ${committee.color}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-semibold text-foreground leading-snug">
            {committee.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {committee.description}
          </p>
        </div>
      </div>

      {/* Chairperson highlight */}
      {chairperson && (
        <div className="mx-6 mb-4 rounded-xl bg-primary/5 border border-primary/10 px-4 py-3 flex items-center gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {chairperson.name.split(" ").pop()?.charAt(0)}
          </div>
          <div>
            <div className="text-xs font-semibold text-primary uppercase tracking-wide">
              {chairperson.role}
            </div>
            <div className="text-sm font-medium text-foreground">
              {chairperson.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {chairperson.designation}
            </div>
          </div>
        </div>
      )}

      {/* Expand members */}
      {others.length > 0 && (
        <div className="px-6 mb-4">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-gold transition"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5" /> Hide all members
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" /> View all{" "}
                {committee.members.length} members
              </>
            )}
          </button>
          {expanded && (
            <div className="mt-3 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-2 text-left">#</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left hidden sm:table-cell">
                      Designation
                    </th>
                    <th className="px-4 py-2 text-left">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {committee.members.map((m, i) => (
                    <tr
                      key={i}
                      className="border-t border-border hover:bg-accent/40 transition"
                    >
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {i + 1}
                      </td>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        {m.name}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground hidden sm:table-cell">
                        {m.designation}
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                            m.role.toLowerCase().includes("chair") ||
                            m.role.toLowerCase().includes("appellate")
                              ? "bg-primary/10 text-primary"
                              : m.role.toLowerCase().includes("student")
                                ? "bg-gold/20 text-amber-800"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {m.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-4 border-t border-border px-6 py-4 flex-wrap">
        <div className="text-xs text-muted-foreground">
          Proc. No: <span className="font-mono">{committee.procNo}</span> ·{" "}
          {committee.date}
        </div>
        {committee.reportable && (
          <button
            onClick={onReport}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition"
          >
            <Send className="h-3.5 w-3.5" />
            Raise a Complaint
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function CommitteesPage() {
  const [activeReport, setActiveReport] = useState<Committee | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Institutional Committees"
        title="Committees & Cells"
        description="Government Polytechnic, Anakapalli has constituted several committees to ensure student welfare, safety, transparency and equal opportunity for all."
        breadcrumb={[{ label: "Committees" }]}
        image={headerImg}
      />

      {/* Quick guide */}
      <Section muted>
        <SectionHeading
          eyebrow="How it works"
          title="Find the right committee for your concern"
          description="Each committee handles a specific area. Browse below, expand member details, and use the 'Raise a Complaint' button to submit your concern directly."
        />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: ShieldAlert,
              label: "Ragging",
              sub: "Anti-Ragging Committee",
            },
            {
              icon: Scale,
              label: "Sexual Harassment",
              sub: "Internal Complaints Committee",
            },
            {
              icon: HeartHandshake,
              label: "General Grievance",
              sub: "Grievance Cell",
            },
            {
              icon: ShieldCheck,
              label: "SC/ST / Women Issues",
              sub: "SC/ST Cell · Women's Cell",
            },
          ].map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-card p-4 flex items-center gap-3 shadow-soft"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {label}
                </div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Committee cards */}
      <Section>
        <SectionHeading
          eyebrow="All Committees"
          title="Constituted as per Government Orders — July 2025"
        />
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {COMMITTEES.map((c) => (
            <CommitteeCard
              key={c.id}
              committee={c}
              onReport={() => setActiveReport(c)}
            />
          ))}
        </div>
      </Section>

      {/* Important note */}
      <Section muted>
        <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
          <Users className="h-10 w-10 text-primary mx-auto mb-4" />
          <h3 className="font-display text-xl font-semibold text-foreground">
            Your complaint is safe with us
          </h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            All complaints submitted through this portal are received directly
            by the respective committee. You may submit anonymously if you
            prefer. For urgent matters involving safety, please approach the
            Principal's office or call{" "}
<a
  href="tel:+919010222173"
  className="font-semibold text-primary hover:text-gold"
>
  +91 90102 22173
</a>{" "}
directly.
          </p>
        </div>
      </Section>

      {/* Report modal */}
      {activeReport && (
        <ReportModal
          committee={activeReport}
          onClose={() => setActiveReport(null)}
        />
      )}
    </>
  );
}