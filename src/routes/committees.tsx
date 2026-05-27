import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
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
  ArrowLeft,
  Send,
  X,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Phone,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/committees")({
  head: () => ({
    meta: [
      { title: "Committees — Government Polytechnic, Anakapalli" },
      {
        name: "description",
        content: "Institutional committees at Government Polytechnic, Anakapalli.",
      },
    ],
  }),
  component: CommitteesPage,
});

type Member = { name: string; role: string; designation: string };

type Committee = {
  id: string;
  icon: React.ElementType;
  photo: string;
  color: string;
  gradientFrom: string;
  tag: string;
  title: string;
  shortTitle: string;
  procNo: string;
  date: string;
  tagline: string;
  brief: string;
  whoCanApproach: string;
  whatToExpect: string;
  members: Member[];
  reportable: boolean;
  reportNote?: string;
  helpline?: string;
};

const COMMITTEES: Committee[] = [
  {
    id: "student-advisors",
    icon: UserCheck,
    photo: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    color: "from-blue-600 to-blue-800",
    gradientFrom: "from-blue-900/80",
    tag: "Welfare & Counselling",
    title: "Student Advisors",
    shortTitle: "Student Advisors",
    procNo: "B/In-charge Arrangements/2025",
    date: "20 July 2025",
    tagline: "Your first point of contact for any concern.",
    brief:
      "Every student deserves someone to turn to. The Student Advisors at GP Anakapalli are experienced faculty members appointed specifically to listen, guide, and support you — whether you're struggling academically, dealing with personal stress, or simply need direction. Think of them as your mentors within the institution.",
    whoCanApproach:
      "Any student — male or female — who needs personal counselling, academic guidance, welfare support, or help navigating institutional processes.",
    whatToExpect:
      "A confidential, non-judgmental conversation. Your advisor will guide you to the right resources or committee if needed, and follow up to make sure your concern is resolved.",
    members: [
      { name: "R. Ganesh Kumar", role: "Advisor — Male Students", designation: "Lecturer, Mathematics" },
      { name: "Ch. Sarojini", role: "Advisor — Female Students", designation: "Lecturer, CME" },
    ],
    reportable: true,
    reportNote: "Use this form to reach your Student Advisor for counselling, welfare support, or general guidance.",
  },
  {
    id: "grievance-cell",
    icon: HeartHandshake,
    photo: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=800&q=80",
    color: "from-emerald-600 to-emerald-800",
    gradientFrom: "from-emerald-900/80",
    tag: "Grievance Redressal",
    title: "Staff-cum-Student Grievance Cell",
    shortTitle: "Grievance Cell",
    procNo: "B/1/Grievance/2025",
    date: "20 July 2025",
    tagline: "Every complaint deserves a fair hearing.",
    brief:
      "The Grievance Cell is the institution's official channel for resolving complaints and suggestions from both students and staff. Whether it's an issue with examinations, fee collection, facilities, classroom management, or interpersonal conflicts — this cell ensures your voice is heard and acted upon promptly. No concern is too small.",
    whoCanApproach:
      "Students and staff members who have any academic, administrative, or personal grievance related to the institution. Even suggestions for improvement are welcome.",
    whatToExpect:
      "Your grievance is registered, reviewed by the committee, and resolved within a reasonable timeframe. You will be informed of the outcome. All submissions are treated with confidentiality.",
    members: [
      { name: "P. Srinivas", role: "Chairperson", designation: "HOD, ECE Section" },
      { name: "Dr. K. Govinda Rao", role: "Member", designation: "HOD, General Sciences" },
      { name: "B. Narasimha Murthy", role: "Member", designation: "Sr. Lecturer, CME" },
      { name: "Ch. Sarojini", role: "Member", designation: "Lecturer, CME" },
      { name: "B. Srikavya", role: "Member", designation: "Lecturer, ECE" },
      { name: "L. Mohana Tirumala", role: "Member", designation: "Lecturer, CME" },
    ],
    reportable: true,
    reportNote: "Submit your grievance or suggestion here. All submissions are treated confidentially and reviewed promptly.",
  },
  {
    id: "anti-ragging",
    icon: ShieldAlert,
    photo: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
    color: "from-red-600 to-red-800",
    gradientFrom: "from-red-900/80",
    tag: "Zero Tolerance",
    title: "Anti-Ragging Committee",
    shortTitle: "Anti-Ragging",
    procNo: "B/001/2025",
    date: "20 July 2025",
    tagline: "A campus where every student feels safe.",
    brief:
      "Ragging is not a tradition — it is abuse. The Anti-Ragging Committee at GP Anakapalli enforces a strict zero-tolerance policy against ragging in any form: physical, verbal, psychological, or online. Backed by Supreme Court directives and UGC regulations, this committee investigates all complaints swiftly and takes strict disciplinary action. Your identity is always protected.",
    whoCanApproach:
      "Any student who has experienced or witnessed ragging, bullying, intimidation, or any form of harassment by seniors or peers — inside or outside the campus.",
    whatToExpect:
      "Immediate action. Your complaint is treated urgently and confidentially. The accused will face disciplinary proceedings as per institutional rules and applicable law.",
    members: [
      { name: "P. Srinivas", role: "Chairperson", designation: "HOD, ECE Section" },
      { name: "Dr. K. Govinda Rao", role: "Member", designation: "HOD, General Sciences" },
      { name: "B. Narasimha Murthy", role: "Member", designation: "Sr. Lecturer, CME" },
      { name: "Y. Srinivasa Rao", role: "Member", designation: "Sr. Lecturer, Chemistry" },
      { name: "B. Srikavya", role: "Member", designation: "Lecturer, ECE" },
      { name: "B. Suresh", role: "Member", designation: "Lecturer, CME" },
    ],
    reportable: true,
    reportNote: "Report ragging incidents here. Your identity will be kept strictly confidential.",
    helpline: "1800-180-5522",
  },
  {
    id: "icc",
    icon: Scale,
    photo: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    color: "from-purple-600 to-purple-800",
    gradientFrom: "from-purple-900/80",
    tag: "AICTE Mandated",
    title: "Internal Complaints Committee",
    shortTitle: "ICC",
    procNo: "C2/ICC/2025",
    date: "20 July 2025",
    tagline: "A safe space for every woman on campus.",
    brief:
      "Constituted under AICTE's Gender Sensitization, Prevention and Prohibition of Sexual Harassment of Women Employees and Students Regulations 2016, the ICC is a legally mandated body that ensures every woman — student or staff — can work and study in a dignified, harassment-free environment. The committee includes student members to ensure relatability and trust.",
    whoCanApproach:
      "Women students and women staff members who have experienced sexual harassment, gender-based discrimination, or any conduct that creates a hostile or uncomfortable environment.",
    whatToExpect:
      "Strict confidentiality throughout the process. The ICC follows a structured inquiry process as defined by AICTE regulations, with a fair hearing for both parties and action taken within the prescribed timeframe.",
    members: [
      { name: "Dr. K. Govinda Rao", role: "Chairperson", designation: "HOD, General Sciences" },
      { name: "P. Srinivas", role: "Member", designation: "HOD, ECE Section" },
      { name: "B. Narasimha Murthy", role: "Member", designation: "Sr. Lecturer, ECE" },
      { name: "G. M. Soma Sekhar", role: "Member", designation: "Lecturer, ECE" },
      { name: "G. Girish Reddy", role: "Member", designation: "Lecturer, CME" },
      { name: "A. Sri Ranga Raju", role: "Member", designation: "Lecturer, CME" },
      { name: "Ch. Sarojini", role: "Member", designation: "Lecturer, CME" },
      { name: "K. Eswramma", role: "Member", designation: "Sr. Assistant" },
      { name: "K. Gabriel Thomas", role: "Student Member", designation: "III Year, CME" },
      { name: "P. Ashritha Lakshmi", role: "Student Member", designation: "II Year, CME" },
      { name: "L. Yasawani", role: "Student Member", designation: "II Year, ECE" },
    ],
    reportable: true,
    reportNote: "Women students and staff may report any form of sexual harassment or gender-based discrimination here. Strict confidentiality is guaranteed.",
  },
  {
    id: "sc-st-cell",
    icon: ShieldCheck,
    photo: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80",
    color: "from-amber-600 to-amber-800",
    gradientFrom: "from-amber-900/80",
    tag: "Equal Rights",
    title: "SC/ST Protection Cell",
    shortTitle: "SC/ST Cell",
    procNo: "B/001/2025",
    date: "20 July 2025",
    tagline: "Protecting rights. Ensuring equality.",
    brief:
      "The SC/ST Protection Cell stands as a watchdog for the rights and dignity of students and staff from Scheduled Caste and Scheduled Tribe communities. Caste-based discrimination has no place in education. This cell actively addresses discrimination, helps ensure access to scholarships and reservations, and creates a level playing field for every learner.",
    whoCanApproach:
      "Students and staff belonging to SC/ST communities who face caste-based discrimination, social exclusion, denial of reserved benefits, or any form of caste-related harassment.",
    whatToExpect:
      "Sensitive, empathetic handling of your complaint. The cell will investigate the matter, take corrective action, and connect you with relevant government support schemes if needed.",
    members: [
      { name: "Y. Srinivasa Rao", role: "Chairperson", designation: "Sr. Lecturer, Chemistry" },
      { name: "B. Srikavya", role: "Member", designation: "Lecturer, ECE" },
      { name: "B. A. Mangathayaru", role: "Member", designation: "Jr. Assistant" },
      { name: "V. Prasanna Kumar", role: "Member", designation: "Jr. Assistant" },
    ],
    reportable: true,
    reportNote: "SC/ST students and staff may report discrimination, caste-based harassment, or denial of rights here.",
  },
  {
    id: "women-protection",
    icon: HeartHandshake,
    photo: "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=800&q=80",
    color: "from-pink-600 to-pink-800",
    gradientFrom: "from-pink-900/80",
    tag: "Women's Safety",
    title: "Women Protection Cell",
    shortTitle: "Women's Cell",
    procNo: "B/001/2025",
    date: "20 July 2025",
    tagline: "Safety, dignity and empowerment for every woman.",
    brief:
      "The Women Protection Cell goes beyond just handling complaints — it actively works to create a campus culture of respect, safety, and empowerment for all women. From safety awareness to addressing day-to-day concerns, the cell is a dedicated support system for female students and staff. No issue is too small to bring here.",
    whoCanApproach:
      "All women students and staff members who have any safety concern, welfare issue, or experience that made them feel unsafe, disrespected, or uncomfortable on campus.",
    whatToExpect:
      "A supportive, women-led response. Your concern will be handled with care, privacy, and urgency. The cell coordinates with the ICC and Anti-Ragging Committee when needed.",
    members: [
      { name: "Ch. Sarojini", role: "Chairperson", designation: "Lecturer, CME" },
      { name: "B. Srikavya", role: "Member", designation: "Lecturer, ECE" },
      { name: "L. Mohana Tirumala", role: "Member", designation: "Lecturer, CME" },
      { name: "K. Eswramma", role: "Member", designation: "Sr. Assistant" },
      { name: "B. Aruna", role: "Member", designation: "Jr. Assistant" },
      { name: "K. Jyothi Mahi", role: "Member", designation: "Jr. Assistant" },
    ],
    reportable: true,
    reportNote: "Women students and staff may report safety concerns, harassment, or any welfare issue here.",
  },
  {
    id: "rti",
    icon: FileSearch,
    photo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    color: "from-slate-600 to-slate-800",
    gradientFrom: "from-slate-900/80",
    tag: "RTI Act 2005",
    title: "Right to Information Cell",
    shortTitle: "RTI Cell",
    procNo: "B/RTI/2025",
    date: "20 July 2025",
    tagline: "Transparency is the foundation of trust.",
    brief:
      "Under the Right to Information Act 2005, every citizen has the legal right to request information from any government institution. The RTI Cell at GP Anakapalli facilitates this process through appointed officers. Whether you want to know about admissions, expenditure, infrastructure, or any institutional matter — you have the right to ask, and we have the duty to respond.",
    whoCanApproach:
      "Any citizen — student, parent, staff, or member of the public — who wishes to seek information about the institution under the RTI Act 2005.",
    whatToExpect:
      "Your RTI application will be processed within 30 days as per the Act. Information will be provided in the format requested, subject to exemptions under the Act.",
    members: [
      { name: "Prof. I.V.S.S. Srinivasa Rao", role: "Appellate Authority", designation: "Principal" },
      { name: "P. Srinivas", role: "Public Information Officer (PIO)", designation: "HOD, ECE Section" },
      { name: "P. V. Srinivasa Rao", role: "Asst. Public Information Officer", designation: "Administrative Officer" },
    ],
    reportable: false,
  },
];

// ─── Report Form ──────────────────────────────────────────────────────────────

function ReportForm({ committee }: { committee: Committee }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", rollNo: "", phone: "", email: "",
    category: "", description: "", anonymous: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <h4 className="font-display text-lg font-semibold text-foreground">Complaint Submitted</h4>
        <p className="text-sm text-muted-foreground max-w-sm">
          Your report has been received by the <strong>{committee.shortTitle}</strong>. The committee will review it and take appropriate action.
        </p>
        <button onClick={() => setSubmitted(false)} className="mt-1 rounded-md border border-border px-5 py-2 text-sm font-medium hover:bg-accent">
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {committee.reportNote && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 leading-relaxed">
          {committee.reportNote}
        </div>
      )}
      {committee.helpline && (
        <a href={`tel:${committee.helpline}`} className="inline-flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-100">
          <Phone className="h-4 w-4" />
          National Helpline: {committee.helpline} (24×7, Free)
        </a>
      )}
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" name="anonymous" checked={form.anonymous} onChange={handleChange}
          className="h-4 w-4 rounded border-border accent-primary" />
        <span className="text-sm font-medium text-foreground">Submit anonymously</span>
      </label>
      {!form.anonymous && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Full Name *</label>
              <input required name="name" value={form.name} onChange={handleChange} placeholder="Your full name"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Roll / Staff ID</label>
              <input name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="e.g. 23CME01"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="+91 XXXXX XXXXX"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email</label>
              <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@example.com"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
        </>
      )}
      <div className="grid gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nature of Complaint *</label>
        <select required name="category" value={form.category} onChange={handleChange}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
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
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Describe your complaint *</label>
        <textarea required name="description" value={form.description} onChange={handleChange} rows={4}
          placeholder="Describe the incident in detail — what happened, when, where, and who was involved."
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
      </div>
      <button type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 transition">
        <Send className="h-4 w-4" />
        Submit Report
      </button>
    </form>
  );
}

// ─── Detail View ──────────────────────────────────────────────────────────────

function CommitteeDetail({ committee, onBack }: { committee: Committee; onBack: () => void }) {
  const Icon = committee.icon;
  const [showMembers, setShowMembers] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const chairperson = committee.members.find(
    (m) => m.role.toLowerCase().includes("chair") || m.role.toLowerCase().includes("appellate")
  );

  return (
    <div className="min-h-screen bg-background animate-fade-in">

      {/* Compact Hero — fixed height on mobile */}
      <div className="relative h-52 md:h-80 overflow-hidden">
        <img src={committee.photo} alt={committee.title}
          className="absolute inset-0 h-full w-full object-cover" />
        <div className={cn("absolute inset-0 bg-gradient-to-t", committee.gradientFrom, "to-transparent")} />
        <div className="absolute inset-0 bg-black/45" />

        <button onClick={onBack}
          className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 md:px-10">
          <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur border border-white/20 px-2.5 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider">
            {committee.tag}
          </span>
          <h1 className="mt-2 font-display text-xl md:text-4xl font-bold text-white drop-shadow-lg leading-snug">
            {committee.title}
          </h1>
          <p className="mt-1 text-xs md:text-base text-white/75 italic line-clamp-1">
            "{committee.tagline}"
          </p>
        </div>
      </div>

      {/* Mobile: stacked tabs layout. Desktop: two-column */}
      <div className="container-page py-6 md:py-10 grid lg:grid-cols-3 gap-6 md:gap-10">

        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">

          {/* About */}
          <div>
            <h2 className="font-display text-base md:text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
              <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
              About this Committee
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {committee.brief}
            </p>
          </div>

          <hr className="border-border" />

          {/* Who / What — stacked on mobile, side by side on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
              <h3 className="font-semibold text-xs text-primary uppercase tracking-wide mb-1.5">Who can approach?</h3>
              <p className="text-sm text-foreground leading-relaxed">{committee.whoCanApproach}</p>
            </div>
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
              <h3 className="font-semibold text-xs text-emerald-700 uppercase tracking-wide mb-1.5">What to expect?</h3>
              <p className="text-sm text-foreground leading-relaxed">{committee.whatToExpect}</p>
            </div>
          </div>

          {/* Members accordion */}
          <div>
            <button onClick={() => setShowMembers((v) => !v)}
              className="w-full flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 hover:bg-accent transition">
              <div className="flex items-center gap-2.5">
                <Users className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm text-foreground">
                  Committee Members ({committee.members.length})
                </span>
              </div>
              {showMembers
                ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
                : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </button>

            {showMembers && (
              <div className="mt-2 rounded-xl border border-border overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className="bg-muted text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      <th className="px-3 py-2.5 text-left">#</th>
                      <th className="px-3 py-2.5 text-left">Name</th>
                      <th className="px-3 py-2.5 text-left hidden sm:table-cell">Designation</th>
                      <th className="px-3 py-2.5 text-left">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {committee.members.map((m, i) => (
                      <tr key={i} className="border-t border-border hover:bg-accent/40 transition">
                        <td className="px-3 py-2.5 text-muted-foreground">{i + 1}</td>
                        <td className="px-3 py-2.5 font-medium text-foreground whitespace-nowrap">{m.name}</td>
                        <td className="px-3 py-2.5 text-muted-foreground hidden sm:table-cell">{m.designation}</td>
                        <td className="px-3 py-2.5">
                          <span className={cn(
                            "inline-block rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap",
                            m.role.toLowerCase().includes("chair") || m.role.toLowerCase().includes("appellate")
                              ? "bg-primary/10 text-primary"
                              : m.role.toLowerCase().includes("student")
                                ? "bg-amber-100 text-amber-800"
                                : "bg-muted text-muted-foreground"
                          )}>
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

          <p className="text-xs text-muted-foreground">
            Proc. No: <span className="font-mono">{committee.procNo}</span> · {committee.date}
          </p>
        </div>

        {/* Sidebar — comes BEFORE main on mobile via order, after on desktop */}
        <div className="space-y-4 lg:order-last order-first">

          {/* Chairperson */}
          {chairperson && (
            <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <p className="text-[10px] font-semibold text-primary uppercase tracking-wide mb-2">{chairperson.role}</p>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-bold">
                  {chairperson.name.split(" ").pop()?.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{chairperson.name}</div>
                  <div className="text-xs text-muted-foreground">{chairperson.designation}</div>
                </div>
              </div>
            </div>
          )}

          {/* Complaint form toggle */}
          {committee.reportable ? (
            <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
              <button onClick={() => setShowForm((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-primary text-primary-foreground hover:opacity-95 transition">
                <span className="flex items-center gap-2 font-semibold text-sm">
                  <Send className="h-4 w-4" />
                  Raise a Complaint
                </span>
                {showForm ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {showForm && (
                <div className="p-4">
                  <ReportForm committee={committee} />
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-4 shadow-soft text-sm text-muted-foreground leading-relaxed">
              <FileSearch className="h-5 w-5 text-primary mb-2" />
              To file an RTI application, submit a written request to the PIO with the prescribed fee (₹10 by IPO/DD/Banker's Cheque). Response within 30 days.
            </div>
          )}

          <div className="rounded-xl bg-muted/60 border border-border px-4 py-3 text-xs text-muted-foreground leading-relaxed">
            🔒 All complaints are handled with strict confidentiality. Your identity is protected throughout.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile List Card (replaces tall photo cards on mobile) ──────────────────

function MobileCommitteeCard({ committee, onClick }: { committee: Committee; onClick: () => void }) {
  const Icon = committee.icon;
  return (
    <button onClick={onClick}
      className="w-full flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left hover:bg-accent transition active:scale-[0.98]">
      <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden">
        <img src={committee.photo} alt={committee.title} className="h-full w-full object-cover" />
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60", committee.color)} />
        <div className="absolute inset-0 grid place-items-center">
          <Icon className="h-5 w-5 text-white drop-shadow" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{committee.tag}</span>
        <h3 className="font-semibold text-sm text-foreground leading-snug mt-0.5 truncate">{committee.title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{committee.tagline}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
    </button>
  );
}

// ─── Desktop Gallery Card ─────────────────────────────────────────────────────

function DesktopCommitteeCard({ committee, index, onClick }: { committee: Committee; index: number; onClick: () => void }) {
  const Icon = committee.icon;
  const isWide = index === 0 || index === 3;

  return (
    <button onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isWide ? "md:col-span-2" : "md:col-span-1"
      )}
      style={{ aspectRatio: isWide ? "16/7" : "4/3" }}>
      <img src={committee.photo} alt={committee.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", committee.color)} />
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur border border-white/20 px-2.5 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider mb-2">
              {committee.tag}
            </span>
            <h3 className="font-display text-lg md:text-xl font-bold text-white leading-tight drop-shadow">
              {committee.title}
            </h3>
            <p className="mt-1 text-xs text-white/70 line-clamp-2">{committee.tagline}</p>
          </div>
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur border border-white/20 text-white">
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-xs font-semibold text-white bg-white/20 backdrop-blur rounded-full px-3 py-1">
            Learn more & report →
          </span>
        </div>
      </div>
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function CommitteesPage() {
  const [selected, setSelected] = useState<Committee | null>(null);

  const handleSelect = (c: Committee) => {
    setSelected(c);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selected) {
    return <CommitteeDetail committee={selected} onBack={handleBack} />;
  }

  return (
    <>
      <PageHeader
        eyebrow="Institutional Committees"
        title="Committees & Cells"
        description="Tap any committee to learn about its purpose, members, and how to raise a complaint."
        breadcrumb={[{ label: "Committees" }]}
        image={headerImg}
      />

      {/* Quick find — horizontal scroll on mobile, no wrapping */}
      <div className="bg-amber-50 border-b border-amber-100 py-3">
        <div className="container-page">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wide shrink-0">
              Quick find:
            </span>
            {[
              { label: "Ragging", id: "anti-ragging" },
              { label: "Harassment", id: "icc" },
              { label: "Grievance", id: "grievance-cell" },
              { label: "Women's Safety", id: "women-protection" },
              { label: "SC/ST Rights", id: "sc-st-cell" },
              { label: "RTI", id: "rti" },
            ].map(({ label, id }) => (
              <button key={id}
                onClick={() => handleSelect(COMMITTEES.find((c) => c.id === id)!)}
                className="shrink-0 rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-medium text-amber-800 hover:bg-amber-100 transition">
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile list (shown only on mobile) */}
      <div className="md:hidden container-page py-6 space-y-3">
        <p className="text-xs text-muted-foreground text-center mb-4">
          Tap any committee to explore details and raise a complaint.
        </p>
        {COMMITTEES.map((c) => (
          <MobileCommitteeCard key={c.id} committee={c} onClick={() => handleSelect(c)} />
        ))}
      </div>

      {/* Desktop photo gallery (hidden on mobile) */}
      <div className="hidden md:block container-page py-12">
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Click any committee to explore its purpose, meet the members, and submit a complaint.
        </p>
        <div className="grid grid-cols-3 gap-4">
          {COMMITTEES.map((c, i) => (
            <DesktopCommitteeCard key={c.id} committee={c} index={i} onClick={() => handleSelect(c)} />
          ))}
        </div>
      </div>

      {/* Bottom helpline bar */}
      <div className="bg-primary/5 border-t border-border py-6 md:py-10">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="font-display text-base md:text-lg font-semibold text-foreground">Need immediate help?</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">Contact the Principal's office directly.</p>
          </div>
          <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
            <a href="tel:+919010222173"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
              <Phone className="h-4 w-4" />
              +91 90102 22173
            </a>
            <a href="tel:18001805522"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent transition">
              Anti-Ragging: 1800-180-5522
            </a>
          </div>
        </div>
      </div>
    </>
  );
}