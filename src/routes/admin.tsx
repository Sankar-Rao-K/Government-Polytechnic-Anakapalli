import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  Bell, Users, Briefcase, Calendar, Settings2, LogOut,
  Plus, Pencil, Trash2, Save, Check, Upload, Download,
  RotateCcw, ChevronDown, ChevronUp, Shield,
} from "lucide-react";
import { useAdmin, makeId, type Notice, type FacultyMember, type PlacementRecord, type SiteEvent, type SiteInfo, type NoticeCategory } from "@/contexts/AdminContext";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1">
      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
const inp = "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

// ─── Confirm delete ───────────────────────────────────────────────────────────
function Confirm({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-3 py-2">
      <span className="text-xs font-semibold text-red-700">Delete?</span>
      <button onClick={onConfirm} className="rounded-lg bg-red-600 text-white px-2.5 py-1 text-xs font-bold hover:bg-red-700">Yes</button>
      <button onClick={onCancel} className="rounded-lg border border-border bg-white px-2.5 py-1 text-xs font-semibold hover:bg-slate-50">No</button>
    </div>
  );
}

// ─── NOTICES EDITOR ───────────────────────────────────────────────────────────
const NOTICE_CATS: NoticeCategory[] = ["Examination","Placements","Scholarships","Academics","General","Library","Events"];
function NoticesEditor() {
  const { content, dispatch } = useAdmin();
  const blank: Notice = { id: "", date: "", category: "General", title: "", urgent: false };
  const [form, setForm]       = useState<Notice>(blank);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding]   = useState(false);
  const [del, setDel]         = useState<string | null>(null);

  function openAdd() { setForm({ ...blank, id: makeId() }); setAdding(true); setEditing(false); }
  function openEdit(n: Notice) { setForm(n); setEditing(true); setAdding(false); }
  function cancel() { setAdding(false); setEditing(false); }
  function save() {
    if (!form.date || !form.title) return;
    dispatch({ type: adding ? "ADD_NOTICE" : "UPDATE_NOTICE", payload: form }); cancel();
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button onClick={openAdd} className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-bold hover:opacity-90">
          <Plus className="h-3.5 w-3.5" /> Add Notice
        </button>
      </div>
      {(adding || editing) && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-3">
          <p className="font-bold text-sm text-primary">{adding ? "New Notice" : "Edit Notice"}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Date"><input className={inp} placeholder="e.g. 15 Jun 2026" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></Field>
            <Field label="Category">
              <select className={inp} value={form.category} onChange={e => setForm({...form, category: e.target.value as NoticeCategory})}>
                {NOTICE_CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Title"><input className={inp} placeholder="Notice title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></Field>
          <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.urgent} onChange={e => setForm({...form, urgent: e.target.checked})} className="accent-red-600" /><span className="font-semibold text-red-700">Mark as urgent</span></label>
          <div className="flex gap-2">
            <button onClick={save} className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-bold hover:opacity-90"><Save className="h-3.5 w-3.5" /> Save</button>
            <button onClick={cancel} className="rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-accent">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-2">
        {content.notices.map(n => (
          <div key={n.id} className={cn("rounded-xl border p-4", n.urgent ? "border-red-200 bg-red-50/50" : "border-border bg-card")}>
            {del === n.id ? <Confirm onConfirm={() => { dispatch({type:"DELETE_NOTICE",payload:n.id}); setDel(null); }} onCancel={() => setDel(null)} /> : (
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground mb-1">
                    <span>{n.date}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 font-medium">{n.category}</span>
                    {n.urgent && <span className="rounded-full bg-red-100 text-red-600 px-2 py-0.5 font-bold">URGENT</span>}
                  </div>
                  <p className="text-sm font-semibold text-foreground line-clamp-2">{n.title}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEdit(n)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => setDel(n.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FACULTY EDITOR ───────────────────────────────────────────────────────────
function FacultyEditor() {
  const { content, dispatch } = useAdmin();
  const blank: FacultyMember = { id:"", name:"", dept:"CME", designation:"", qual:"", exp:0, spec:"" };
  const [form, setForm]       = useState<FacultyMember>(blank);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding]   = useState(false);
  const [del, setDel]         = useState<string|null>(null);
  const [dFilter, setDFilter] = useState("All");

  const filtered = content.faculty.filter(f => dFilter === "All" || f.dept === dFilter);
  function openAdd() { setForm({...blank, id:makeId()}); setAdding(true); setEditing(false); }
  function openEdit(f: FacultyMember) { setForm(f); setEditing(true); setAdding(false); }
  function cancel() { setAdding(false); setEditing(false); }
  function save() {
    if (!form.name || !form.designation) return;
    dispatch({ type: adding ? "ADD_FACULTY" : "UPDATE_FACULTY", payload: form }); cancel();
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1.5 flex-wrap">
          {["All","CME","ECE","General","Administration"].map(d => (
            <button key={d} onClick={() => setDFilter(d)} className={cn("rounded-full px-3 py-1 text-[11px] font-bold transition", dFilter===d ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent")}>
              {d}
            </button>
          ))}
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-bold hover:opacity-90"><Plus className="h-3.5 w-3.5" /> Add Member</button>
      </div>
      {(adding || editing) && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-3">
          <p className="font-bold text-sm text-primary">{adding ? "New Faculty Member" : "Edit Member"}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Full Name"><input className={inp} value={form.name} onChange={e => setForm({...form,name:e.target.value})} /></Field>
            <Field label="Department"><select className={inp} value={form.dept} onChange={e => setForm({...form,dept:e.target.value as FacultyMember["dept"]})}><option>CME</option><option>ECE</option><option>General</option><option>Administration</option></select></Field>
            <Field label="Designation"><input className={inp} value={form.designation} onChange={e => setForm({...form,designation:e.target.value})} /></Field>
            <Field label="Qualification"><input className={inp} value={form.qual} onChange={e => setForm({...form,qual:e.target.value})} /></Field>
            <Field label="Experience (yrs)"><input type="number" className={inp} min={0} value={form.exp} onChange={e => setForm({...form,exp:Number(e.target.value)})} /></Field>
            <Field label="Specialization"><input className={inp} value={form.spec} onChange={e => setForm({...form,spec:e.target.value})} /></Field>
          </div>
          <div className="flex gap-2"><button onClick={save} className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-bold hover:opacity-90"><Save className="h-3.5 w-3.5" /> Save</button><button onClick={cancel} className="rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-accent">Cancel</button></div>
        </div>
      )}
      <div className="space-y-2">
        {filtered.map(f => (
          <div key={f.id} className="rounded-xl border border-border bg-card p-4">
            {del === f.id ? <Confirm onConfirm={() => { dispatch({type:"DELETE_FACULTY",payload:f.id}); setDel(null); }} onCancel={() => setDel(null)} /> : (
              <div className="flex items-center gap-3">
                <div className="flex-1"><p className="font-semibold text-sm">{f.name}</p><p className="text-xs text-muted-foreground">{f.designation} · {f.dept} · {f.exp} yrs</p></div>
                <div className="flex gap-1"><button onClick={() => openEdit(f)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Pencil className="h-3.5 w-3.5" /></button><button onClick={() => setDel(f.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="h-3.5 w-3.5" /></button></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PLACEMENTS EDITOR ────────────────────────────────────────────────────────
function PlacementsEditor() {
  const { content, dispatch } = useAdmin();
  const blank: PlacementRecord = { id:"", year:"2025-26", company:"", location:"", branch:"CME", placed:1, lpa:2.0 };
  const [form,setForm]         = useState<PlacementRecord>(blank);
  const [adding,setAdding]     = useState(false);
  const [editing,setEditing]   = useState(false);
  const [del,setDel]           = useState<string|null>(null);

  function openAdd() { setForm({...blank,id:makeId()}); setAdding(true); setEditing(false); }
  function openEdit(p: PlacementRecord) { setForm(p); setEditing(true); setAdding(false); }
  function cancel() { setAdding(false); setEditing(false); }
  function save() {
    if(!form.company||!form.location) return;
    dispatch({type:adding?"ADD_PLACEMENT":"UPDATE_PLACEMENT",payload:form}); cancel();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end"><button onClick={openAdd} className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-bold hover:opacity-90"><Plus className="h-3.5 w-3.5" /> Add Record</button></div>
      {(adding||editing) && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-3">
          <p className="font-bold text-sm text-primary">{adding ? "New Record" : "Edit Record"}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Year"><select className={inp} value={form.year} onChange={e=>setForm({...form,year:e.target.value as PlacementRecord["year"]})}><option>2025-26</option><option>2024-25</option><option>2023-24</option></select></Field>
            <Field label="Branch"><select className={inp} value={form.branch} onChange={e=>setForm({...form,branch:e.target.value as PlacementRecord["branch"]})}><option>CME</option><option>ECE</option><option>Both</option></select></Field>
            <Field label="Company"><input className={inp} value={form.company} onChange={e=>setForm({...form,company:e.target.value})} /></Field>
            <Field label="Location"><input className={inp} value={form.location} onChange={e=>setForm({...form,location:e.target.value})} /></Field>
            <Field label="Students Placed"><input type="number" min={1} className={inp} value={form.placed} onChange={e=>setForm({...form,placed:Number(e.target.value)})} /></Field>
            <Field label="Package (LPA)"><input type="number" min={0} step={0.1} className={inp} value={form.lpa} onChange={e=>setForm({...form,lpa:Number(e.target.value)})} /></Field>
          </div>
          <div className="flex gap-2"><button onClick={save} className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-bold hover:opacity-90"><Save className="h-3.5 w-3.5" /> Save</button><button onClick={cancel} className="rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-accent">Cancel</button></div>
        </div>
      )}
      {(["2025-26","2024-25","2023-24"] as const).map(yr => {
        const recs = content.placements.filter(p=>p.year===yr);
        return (
          <div key={yr}>
            <p className="font-bold text-sm text-muted-foreground mb-2">{yr} · {recs.length} companies · {recs.reduce((s,r)=>s+r.placed,0)} students</p>
            <div className="space-y-2">
              {recs.map(r => (
                <div key={r.id} className="rounded-xl border border-border bg-card p-4">
                  {del===r.id ? <Confirm onConfirm={()=>{dispatch({type:"DELETE_PLACEMENT",payload:r.id});setDel(null);}} onCancel={()=>setDel(null)} /> : (
                    <div className="flex items-center gap-3"><div className="flex-1"><p className="font-semibold text-sm">{r.company}</p><p className="text-xs text-muted-foreground">{r.location} · {r.branch} · {r.placed} placed · ₹{r.lpa}L</p></div><div className="flex gap-1"><button onClick={()=>openEdit(r)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Pencil className="h-3.5 w-3.5" /></button><button onClick={()=>setDel(r.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="h-3.5 w-3.5" /></button></div></div>
                  )}
                </div>
              ))}
              {recs.length===0 && <p className="text-xs text-muted-foreground py-2 pl-1">No records yet.</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── EVENTS EDITOR ────────────────────────────────────────────────────────────
function EventsEditor() {
  const { content, dispatch } = useAdmin();
  const blank: SiteEvent = { id:"", date:"", title:"", description:"", category:"General", venue:"", organizer:"", image:"", galleryImages:[] };
  const [form,setForm]       = useState<SiteEvent>(blank);
  const [adding,setAdding]   = useState(false);
  const [editing,setEditing] = useState(false);
  const [del,setDel]         = useState<string|null>(null);

  function openAdd() { setForm({...blank,id:makeId()}); setAdding(true); setEditing(false); }
  function openEdit(e: SiteEvent) { setForm(e); setEditing(true); setAdding(false); }
  function cancel() { setAdding(false); setEditing(false); }
  function save() {
    if(!form.title||!form.date) return;
    dispatch({type:adding?"ADD_EVENT":"UPDATE_EVENT",payload:form}); cancel();
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end"><button onClick={openAdd} className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-bold hover:opacity-90"><Plus className="h-3.5 w-3.5" /> Add Event</button></div>
      {(adding||editing) && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-3">
          <p className="font-bold text-sm text-primary">{adding ? "New Event" : "Edit Event"}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Title"><input className={inp} value={form.title} onChange={e=>setForm({...form,title:e.target.value})} /></Field>
            <Field label="Date"><input className={inp} placeholder="e.g. 15 Feb 2026" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} /></Field>
            <Field label="Category"><select className={inp} value={form.category} onChange={e=>setForm({...form,category:e.target.value as SiteEvent["category"]})}><option>Technical</option><option>Cultural</option><option>Sports</option><option>Placements</option><option>Academic</option><option>General</option></select></Field>
            <Field label="Venue"><input className={inp} value={form.venue} onChange={e=>setForm({...form,venue:e.target.value})} /></Field>
            <div className="sm:col-span-2"><Field label="Organizer"><input className={inp} value={form.organizer} onChange={e=>setForm({...form,organizer:e.target.value})} /></Field></div>
            <div className="sm:col-span-2"><Field label="Cover Image URL"><input className={inp} placeholder="https://..." value={form.image} onChange={e=>setForm({...form,image:e.target.value})} /></Field></div>
            <div className="sm:col-span-2"><Field label="Description"><textarea className={inp} rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} /></Field></div>
          </div>
          <div className="flex gap-2"><button onClick={save} className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-bold hover:opacity-90"><Save className="h-3.5 w-3.5" /> Save</button><button onClick={cancel} className="rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-accent">Cancel</button></div>
        </div>
      )}
      <div className="space-y-2">
        {content.events.map(e => (
          <div key={e.id} className="rounded-xl border border-border bg-card p-4">
            {del===e.id ? <Confirm onConfirm={()=>{dispatch({type:"DELETE_EVENT",payload:e.id});setDel(null);}} onCancel={()=>setDel(null)} /> : (
              <div className="flex items-start gap-3">
                <div className="flex-1"><p className="font-semibold text-sm">{e.title}</p><p className="text-xs text-muted-foreground">{e.date} · {e.category} · {e.venue}</p></div>
                <div className="flex gap-1"><button onClick={()=>openEdit(e)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Pencil className="h-3.5 w-3.5" /></button><button onClick={()=>setDel(e.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="h-3.5 w-3.5" /></button></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SETTINGS EDITOR ──────────────────────────────────────────────────────────
function SettingsEditor() {
  const { content, dispatch } = useAdmin();
  const [form, setForm] = useState<SiteInfo>(content.siteInfo);
  const [saved, setSaved] = useState(false);
  function save() { dispatch({type:"UPDATE_SITE_INFO",payload:form}); setSaved(true); setTimeout(()=>setSaved(false),2000); }
  return (
    <div className="space-y-4 max-w-lg">
      <Field label="Phone"><input className={inp} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></Field>
      <Field label="Email"><input type="email" className={inp} value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></Field>
      <Field label="Address"><textarea className={inp} rows={2} value={form.address} onChange={e=>setForm({...form,address:e.target.value})} /></Field>
      <Field label="Principal Name"><input className={inp} value={form.principalName} onChange={e=>setForm({...form,principalName:e.target.value})} /></Field>
      <Field label="Principal Designation"><input className={inp} value={form.principalDesignation} onChange={e=>setForm({...form,principalDesignation:e.target.value})} /></Field>
      <Field label="Principal Message"><textarea className={inp} rows={5} value={form.principalMessage} onChange={e=>setForm({...form,principalMessage:e.target.value})} /></Field>
      <button onClick={save} className={cn("inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition", saved ? "bg-emerald-600 text-white" : "bg-primary text-primary-foreground hover:opacity-90")}>
        {saved ? <><Check className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save Settings</>}
      </button>
    </div>
  );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────
type Tab = { id: string; label: string; icon: typeof Bell; component: () => JSX.Element };
const TABS: Tab[] = [
  { id:"notices",    label:"Notices",    icon:Bell,       component:NoticesEditor    },
  { id:"faculty",    label:"Faculty",    icon:Users,      component:FacultyEditor    },
  { id:"placements", label:"Placements", icon:Briefcase,  component:PlacementsEditor },
  { id:"events",     label:"Events",     icon:Calendar,   component:EventsEditor     },
  { id:"settings",   label:"Settings",   icon:Settings2,  component:SettingsEditor   },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────
function AdminPage() {
  const { isAdmin, logout, exportContent, importContent, resetToDefaults, content } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("notices");
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAdmin) navigate({ to: "/admin-login" });
  }, [isAdmin, navigate]);

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { const ok = importContent(ev.target?.result as string); alert(ok ? "Content imported!" : "Invalid file."); };
    reader.readAsText(file); e.target.value = "";
  }

  if (!isAdmin) return null;

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component ?? NoticesEditor;

  // Summary counts
  const counts = {
    notices:    content.notices.length,
    faculty:    content.faculty.length,
    placements: content.placements.length,
    events:     content.events.length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-700 px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={logo} alt="logo" className="h-8 w-8 object-contain" />
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-white leading-none">Admin Dashboard</p>
            <p className="text-[10px] text-slate-400 mt-0.5">GP Anakapalli</p>
          </div>
        </Link>
        <div className="flex-1" />
        {/* Action buttons */}
        <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
        <button onClick={() => fileRef.current?.click()} title="Import backup" className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition"><Upload className="h-4 w-4" /></button>
        <button onClick={exportContent} title="Export backup" className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition"><Download className="h-4 w-4" /></button>
        <button onClick={() => setConfirmReset(true)} title="Reset to defaults" className="p-2 rounded-lg bg-slate-700 hover:bg-red-700 text-slate-300 transition"><RotateCcw className="h-4 w-4" /></button>
        <button onClick={() => { logout(); navigate({to:"/"}); }} className="inline-flex items-center gap-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-2 text-xs font-bold transition">
          <LogOut className="h-3.5 w-3.5" /> Logout
        </button>
      </header>

      {/* Reset confirm banner */}
      {confirmReset && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3 flex items-center gap-3 text-sm">
          <span className="text-red-700 font-semibold flex-1">Reset ALL content to defaults? This cannot be undone.</span>
          <button onClick={() => { resetToDefaults(); setConfirmReset(false); }} className="rounded-lg bg-red-600 text-white px-3 py-1.5 text-xs font-bold">Reset</button>
          <button onClick={() => setConfirmReset(false)} className="rounded-lg border px-3 py-1.5 text-xs font-semibold">Cancel</button>
        </div>
      )}

      <div className="container-page py-6 grid lg:grid-cols-[220px_1fr] gap-6 items-start">

        {/* ── Sidebar ── */}
        <aside className="sticky top-20 space-y-3">
          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label:"Notices",    val:counts.notices,    color:"bg-blue-500"   },
              { label:"Faculty",    val:counts.faculty,    color:"bg-purple-500" },
              { label:"Placements", val:counts.placements, color:"bg-emerald-500"},
              { label:"Events",     val:counts.events,     color:"bg-amber-500"  },
            ].map(s => (
              <div key={s.label} className="rounded-xl bg-white border border-slate-200 p-3 text-center shadow-sm">
                <div className={cn("font-display text-xl font-bold text-white rounded-lg px-2 py-0.5 mx-auto w-fit", s.color)}>{s.val}</div>
                <div className="text-[10px] text-slate-500 font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Nav */}
          <nav className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold transition border-b border-slate-100 last:border-0",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-slate-600 hover:bg-slate-50"
                  )}>
                  <Icon className="h-4 w-4 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="rounded-xl bg-white border border-slate-200 p-3 text-[10px] text-slate-400 text-center shadow-sm">
            Changes save automatically.<br />Use Export to create a backup.
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4 flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="font-display text-lg font-bold text-slate-800">
              {TABS.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          <div className="p-6">
            <ActiveComponent />
          </div>
        </main>
      </div>
    </div>
  );
}