import { useState, useRef } from "react";
import {
  Settings, X, LogOut, Bell, Users, Briefcase, Calendar,
  Info, Plus, Pencil, Trash2, Save, Upload, Download,
  RotateCcw, Eye, EyeOff, ChevronDown, Check,
} from "lucide-react";
import {
  useAdmin, makeId,
  type Notice, type FacultyMember, type PlacementRecord,
  type SiteEvent, type SiteInfo, type NoticeCategory,
} from "@/contexts/AdminContext";
import { cn } from "@/lib/utils";

// ─── Shared Helpers ───────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inp = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30";
const sel = `${inp} cursor-pointer`;

function Confirm({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs">
      <span className="text-red-700 font-medium">Delete this?</span>
      <button onClick={onConfirm} className="rounded bg-red-600 text-white px-2 py-0.5 font-semibold hover:bg-red-700">Yes</button>
      <button onClick={onCancel} className="rounded bg-white border border-slate-200 px-2 py-0.5 font-semibold hover:bg-slate-50">No</button>
    </div>
  );
}

// ─── Notices Editor ───────────────────────────────────────────────────────────

const NOTICE_CATS: NoticeCategory[] = ["Examination", "Placements", "Scholarships", "Academics", "General", "Library", "Events"];

function NoticesEditor() {
  const { content, dispatch } = useAdmin();
  const [editing, setEditing] = useState<Notice | null>(null);
  const [adding, setAdding] = useState(false);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const blank: Notice = { id: "", date: "", category: "General", title: "", urgent: false };
  const [form, setForm] = useState<Notice>(blank);

  function openAdd() { setForm({ ...blank, id: makeId() }); setAdding(true); setEditing(null); }
  function openEdit(n: Notice) { setForm(n); setEditing(n); setAdding(false); }
  function cancel() { setAdding(false); setEditing(null); }

  function save() {
    if (!form.date || !form.title) return;
    if (adding) dispatch({ type: "ADD_NOTICE", payload: form });
    else dispatch({ type: "UPDATE_NOTICE", payload: form });
    cancel();
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">{content.notices.length} notices</span>
        <button onClick={openAdd} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 text-white px-3 py-1.5 text-xs font-semibold hover:bg-blue-700">
          <Plus className="h-3.5 w-3.5" /> Add Notice
        </button>
      </div>

      {(adding || editing) && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-3">
          <div className="font-semibold text-sm text-blue-800">{adding ? "New Notice" : "Edit Notice"}</div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input type="text" className={inp} placeholder="e.g. 15 Jun 2026" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </Field>
            <Field label="Category">
              <select className={sel} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as NoticeCategory })}>
                {NOTICE_CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Title / Description">
            <input type="text" className={inp} placeholder="Notice title or description" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.urgent} onChange={(e) => setForm({ ...form, urgent: e.target.checked })} className="accent-red-600" />
            <span className="font-medium text-red-700">Mark as urgent</span>
          </label>
          <div className="flex gap-2">
            <button onClick={save} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 text-white px-4 py-2 text-xs font-semibold hover:bg-blue-700">
              <Save className="h-3.5 w-3.5" /> Save
            </button>
            <button onClick={cancel} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold hover:bg-slate-50">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        {content.notices.map((n) => (
          <div key={n.id} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            {confirmDel === n.id ? (
              <Confirm onConfirm={() => { dispatch({ type: "DELETE_NOTICE", payload: n.id }); setConfirmDel(null); }} onCancel={() => setConfirmDel(null)} />
            ) : (
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{n.date}</span>
                    <span className="rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 text-[10px] font-medium">{n.category}</span>
                    {n.urgent && <span className="rounded-full bg-red-100 text-red-600 px-2 py-0.5 text-[10px] font-semibold">URGENT</span>}
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-slate-800 line-clamp-2">{n.title}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEdit(n)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => setConfirmDel(n.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Faculty Editor ───────────────────────────────────────────────────────────

function FacultyEditor() {
  const { content, dispatch } = useAdmin();
  const [editing, setEditing] = useState<FacultyMember | null>(null);
  const [adding, setAdding] = useState(false);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const [deptFilter, setDeptFilter] = useState("All");
  const blank: FacultyMember = { id: "", name: "", dept: "CME", designation: "", qual: "", exp: 0, spec: "" };
  const [form, setForm] = useState<FacultyMember>(blank);

  const filtered = content.faculty.filter((f) => deptFilter === "All" || f.dept === deptFilter);

  function openAdd() { setForm({ ...blank, id: makeId() }); setAdding(true); setEditing(null); }
  function openEdit(f: FacultyMember) { setForm(f); setEditing(f); setAdding(false); }
  function cancel() { setAdding(false); setEditing(null); }

  function save() {
    if (!form.name || !form.designation) return;
    if (adding) dispatch({ type: "ADD_FACULTY", payload: form });
    else dispatch({ type: "UPDATE_FACULTY", payload: form });
    cancel();
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1.5">
          {["All", "CME", "ECE", "General", "Administration"].map((d) => (
            <button key={d} onClick={() => setDeptFilter(d)}
              className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold transition",
                deptFilter === d ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}>
              {d}
            </button>
          ))}
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 text-white px-3 py-1.5 text-xs font-semibold hover:bg-blue-700">
          <Plus className="h-3.5 w-3.5" /> Add Faculty
        </button>
      </div>

      {(adding || editing) && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-3">
          <div className="font-semibold text-sm text-blue-800">{adding ? "New Faculty Member" : "Edit Faculty"}</div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Full Name">
              <input className={inp} placeholder="e.g. Sri A. Kumar" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Department">
              <select className={sel} value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value as FacultyMember["dept"] })}>
                <option>CME</option><option>ECE</option><option>General</option><option>Administration</option>
              </select>
            </Field>
            <Field label="Designation">
              <input className={inp} placeholder="e.g. Lecturer" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
            </Field>
            <Field label="Qualification">
              <input className={inp} placeholder="e.g. M.Tech (CSE)" value={form.qual} onChange={(e) => setForm({ ...form, qual: e.target.value })} />
            </Field>
            <Field label="Experience (years)">
              <input type="number" className={inp} min={0} value={form.exp} onChange={(e) => setForm({ ...form, exp: Number(e.target.value) })} />
            </Field>
            <Field label="Specialization">
              <input className={inp} placeholder="e.g. Web Technologies" value={form.spec} onChange={(e) => setForm({ ...form, spec: e.target.value })} />
            </Field>
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 text-white px-4 py-2 text-xs font-semibold hover:bg-blue-700">
              <Save className="h-3.5 w-3.5" /> Save
            </button>
            <button onClick={cancel} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold hover:bg-slate-50">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        {filtered.map((f) => (
          <div key={f.id} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            {confirmDel === f.id ? (
              <Confirm onConfirm={() => { dispatch({ type: "DELETE_FACULTY", payload: f.id }); setConfirmDel(null); }} onCancel={() => setConfirmDel(null)} />
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-slate-800">{f.name}</p>
                  <p className="text-xs text-slate-500">{f.designation} · {f.dept} · {f.exp} yrs</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(f)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => setConfirmDel(f.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Placements Editor ────────────────────────────────────────────────────────

function PlacementsEditor() {
  const { content, dispatch } = useAdmin();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<PlacementRecord | null>(null);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const blank: PlacementRecord = { id: "", year: "2025-26", company: "", location: "", branch: "CME", placed: 1, lpa: 2.0 };
  const [form, setForm] = useState<PlacementRecord>(blank);

  function openAdd() { setForm({ ...blank, id: makeId() }); setAdding(true); setEditing(null); }
  function openEdit(p: PlacementRecord) { setForm(p); setEditing(p); setAdding(false); }
  function cancel() { setAdding(false); setEditing(null); }

  function save() {
    if (!form.company || !form.location) return;
    if (adding) dispatch({ type: "ADD_PLACEMENT", payload: form });
    else dispatch({ type: "UPDATE_PLACEMENT", payload: form });
    cancel();
  }

  const years = ["2025-26", "2024-25", "2023-24"] as const;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openAdd} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 text-white px-3 py-1.5 text-xs font-semibold hover:bg-blue-700">
          <Plus className="h-3.5 w-3.5" /> Add Record
        </button>
      </div>

      {(adding || editing) && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-3">
          <div className="font-semibold text-sm text-blue-800">{adding ? "New Placement Record" : "Edit Record"}</div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Year">
              <select className={sel} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value as PlacementRecord["year"] })}>
                <option>2025-26</option><option>2024-25</option><option>2023-24</option>
              </select>
            </Field>
            <Field label="Branch">
              <select className={sel} value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value as PlacementRecord["branch"] })}>
                <option>CME</option><option>ECE</option><option>Both</option>
              </select>
            </Field>
            <Field label="Company Name">
              <input className={inp} placeholder="e.g. Infosys" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </Field>
            <Field label="Location">
              <input className={inp} placeholder="e.g. Hyderabad" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </Field>
            <Field label="Students Placed">
              <input type="number" min={1} className={inp} value={form.placed} onChange={(e) => setForm({ ...form, placed: Number(e.target.value) })} />
            </Field>
            <Field label="Package (LPA)">
              <input type="number" min={0} step={0.1} className={inp} value={form.lpa} onChange={(e) => setForm({ ...form, lpa: Number(e.target.value) })} />
            </Field>
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 text-white px-4 py-2 text-xs font-semibold hover:bg-blue-700">
              <Save className="h-3.5 w-3.5" /> Save
            </button>
            <button onClick={cancel} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold">Cancel</button>
          </div>
        </div>
      )}

      {years.map((yr) => {
        const recs = content.placements.filter((p) => p.year === yr);
        const total = recs.reduce((s, r) => s + r.placed, 0);
        return (
          <div key={yr}>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-sm text-slate-700">{yr}</span>
              <span className="text-xs text-slate-400">· {recs.length} companies · {total} students</span>
            </div>
            <div className="space-y-1.5">
              {recs.map((r) => (
                <div key={r.id} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                  {confirmDel === r.id ? (
                    <Confirm onConfirm={() => { dispatch({ type: "DELETE_PLACEMENT", payload: r.id }); setConfirmDel(null); }} onCancel={() => setConfirmDel(null)} />
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{r.company}</p>
                        <p className="text-xs text-slate-500">{r.location} · {r.branch} · {r.placed} placed · ₹{r.lpa}L</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Pencil className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setConfirmDel(r.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {recs.length === 0 && <p className="text-xs text-slate-400 py-2">No records for {yr} yet.</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Events Editor ────────────────────────────────────────────────────────────

function EventsEditor() {
  const { content, dispatch } = useAdmin();
  const [editing, setEditing] = useState<SiteEvent | null>(null);
  const [adding, setAdding] = useState(false);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const blank: SiteEvent = { id: "", date: "", title: "", description: "", category: "General" };
  const [form, setForm] = useState<SiteEvent>(blank);

  function openAdd() { setForm({ ...blank, id: makeId() }); setAdding(true); setEditing(null); }
  function openEdit(e: SiteEvent) { setForm(e); setEditing(e); setAdding(false); }
  function cancel() { setAdding(false); setEditing(null); }
  function save() {
    if (!form.date || !form.title) return;
    if (adding) dispatch({ type: "ADD_EVENT", payload: form });
    else dispatch({ type: "UPDATE_EVENT", payload: form });
    cancel();
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button onClick={openAdd} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 text-white px-3 py-1.5 text-xs font-semibold hover:bg-blue-700">
          <Plus className="h-3.5 w-3.5" /> Add Event
        </button>
      </div>

      {(adding || editing) && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-3">
          <div className="font-semibold text-sm text-blue-800">{adding ? "New Event" : "Edit Event"}</div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input className={inp} placeholder="e.g. 15 Jun 2026" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </Field>
            <Field label="Category">
              <input className={inp} placeholder="e.g. Placements" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </Field>
          </div>
          <Field label="Event Title">
            <input className={inp} placeholder="Event name" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Description">
            <textarea className={inp} rows={3} placeholder="Brief description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <div className="flex gap-2">
            <button onClick={save} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 text-white px-4 py-2 text-xs font-semibold hover:bg-blue-700">
              <Save className="h-3.5 w-3.5" /> Save
            </button>
            <button onClick={cancel} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        {content.events.map((e) => (
          <div key={e.id} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            {confirmDel === e.id ? (
              <Confirm onConfirm={() => { dispatch({ type: "DELETE_EVENT", payload: e.id }); setConfirmDel(null); }} onCancel={() => setConfirmDel(null)} />
            ) : (
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{e.title}</p>
                  <p className="text-xs text-slate-500">{e.date} · {e.category}</p>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{e.description}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(e)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => setConfirmDel(e.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Site Info Editor ─────────────────────────────────────────────────────────

function SiteInfoEditor() {
  const { content, dispatch } = useAdmin();
  const [form, setForm] = useState<SiteInfo>(content.siteInfo);
  const [saved, setSaved] = useState(false);

  function save() {
    dispatch({ type: "UPDATE_SITE_INFO", payload: form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <Field label="Phone Number">
          <input className={inp} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </Field>
        <Field label="Email Address">
          <input className={inp} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Field>
        <Field label="Address">
          <textarea className={inp} rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </Field>
        <Field label="Principal Name">
          <input className={inp} value={form.principalName} onChange={(e) => setForm({ ...form, principalName: e.target.value })} />
        </Field>
        <Field label="Principal Designation">
          <input className={inp} value={form.principalDesignation} onChange={(e) => setForm({ ...form, principalDesignation: e.target.value })} />
        </Field>
        <Field label="Principal Message">
          <textarea className={inp} rows={5} value={form.principalMessage} onChange={(e) => setForm({ ...form, principalMessage: e.target.value })} />
        </Field>
      </div>
      <button onClick={save}
        className={cn("inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold transition",
          saved ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700")}>
        {saved ? <><Check className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save Settings</>}
      </button>
    </div>
  );
}

// ─── Login Modal ──────────────────────────────────────────────────────────────

function LoginModal({ onClose }: { onClose: () => void }) {
  const { login } = useAdmin();
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (login(pw)) { onClose(); }
    else { setErr(true); setTimeout(() => setErr(false), 2000); }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="bg-slate-900 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">GP Anakapalli</p>
              <h2 className="text-white font-bold text-lg mt-0.5">Admin Login</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
          </div>
        </div>
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div className="grid gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
                className={cn(inp, "pr-10", err && "border-red-400 ring-2 ring-red-200")}
              />
              <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {err && <p className="text-xs text-red-600 font-medium">Wrong password. Try again.</p>}
          </div>
          <button type="submit" className="w-full rounded-xl bg-slate-900 text-white py-3 font-semibold hover:bg-slate-800 transition">
            Login to Admin Panel
          </button>
          <p className="text-center text-[11px] text-slate-400">For help, contact the web administrator.</p>
        </form>
      </div>
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────

type Tab = "notices" | "faculty" | "placements" | "events" | "settings";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "notices", label: "Notices", icon: Bell },
  { id: "faculty", label: "Faculty", icon: Users },
  { id: "placements", label: "Placements", icon: Briefcase },
  { id: "events", label: "Events", icon: Calendar },
  { id: "settings", label: "Settings", icon: Info },
];

function AdminDrawer({ onClose }: { onClose: () => void }) {
  const { logout, exportContent, importContent, resetToDefaults } = useAdmin();
  const [tab, setTab] = useState<Tab>("notices");
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const ok = importContent(ev.target?.result as string);
      alert(ok ? "✅ Content imported successfully!" : "❌ Invalid file. Please use a valid backup file.");
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg h-full bg-slate-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-blue-600 grid place-items-center">
              <Settings className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">GP Anakapalli</p>
              <p className="text-white font-bold text-sm leading-none">Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
            <button onClick={() => fileRef.current?.click()} title="Import backup" className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300">
              <Upload className="h-3.5 w-3.5" />
            </button>
            <button onClick={exportContent} title="Export backup" className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300">
              <Download className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => setConfirmReset(true)} title="Reset to defaults" className="p-1.5 rounded-lg bg-slate-700 hover:bg-red-700 text-slate-300">
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => { logout(); onClose(); }} title="Logout" className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300">
              <LogOut className="h-3.5 w-3.5" />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Reset confirmation banner */}
        {confirmReset && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-3 flex items-center gap-3 text-sm shrink-0">
            <span className="text-red-700 font-medium flex-1">Reset ALL content to defaults? This cannot be undone.</span>
            <button onClick={() => { resetToDefaults(); setConfirmReset(false); }} className="rounded-lg bg-red-600 text-white px-3 py-1 text-xs font-semibold">Reset</button>
            <button onClick={() => setConfirmReset(false)} className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold">Cancel</button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-white shrink-0 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition",
                tab === id ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-800"
              )}>
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {tab === "notices" && <NoticesEditor />}
          {tab === "faculty" && <FacultyEditor />}
          {tab === "placements" && <PlacementsEditor />}
          {tab === "events" && <EventsEditor />}
          {tab === "settings" && <SiteInfoEditor />}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-white px-4 py-2.5 shrink-0">
          <p className="text-[10px] text-slate-400 text-center">
            Changes save automatically. Use <strong>Export</strong> to backup · <strong>Import</strong> to restore.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Floating Trigger — rendered in every page ────────────────────────────────

export function AdminPanel() {
  const { isAdmin } = useAdmin();
  const [showLogin, setShowLogin] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
      {/* Floating button — bottom right */}
      <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-2">
        {isAdmin && (
          <div className="rounded-full bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 shadow-lg animate-pulse">
            ADMIN MODE
          </div>
        )}
        <button
          onClick={() => isAdmin ? setShowPanel(true) : setShowLogin(true)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold shadow-elevated transition-all",
            isAdmin
              ? "bg-slate-900 text-white hover:bg-slate-700"
              : "bg-white/90 backdrop-blur border border-slate-200 text-slate-700 hover:bg-white"
          )}
        >
          <Settings className={cn("h-4 w-4", isAdmin && "animate-none")} />
          {isAdmin ? "Admin Panel" : "Admin"}
        </button>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showPanel && isAdmin && <AdminDrawer onClose={() => setShowPanel(false)} />}
    </>
  );
}