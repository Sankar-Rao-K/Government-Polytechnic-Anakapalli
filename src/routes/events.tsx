import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Search, Plus, MapPin, Calendar, User, X,
  ChevronLeft, ChevronRight, Pencil, Trash2, Save, AlertCircle, ArrowLeft,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { useAdmin, makeId, type SiteEvent } from "@/contexts/AdminContext";
import headerImg from "@/assets/gallery-event.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events")({
  component: EventsPage,
});

function useSEO(title: string, desc: string) {
  useEffect(() => {
    document.title = title;
    let tag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!tag) { tag = document.createElement("meta"); tag.name = "description"; document.head.appendChild(tag); }
    tag.content = desc;
  }, [title, desc]);
}

const CATEGORIES = ["All", "Technical", "Cultural", "Sports", "Placements", "Academic", "General"] as const;
type Category = typeof CATEGORIES[number];

const CAT_COLOR: Record<string, string> = {
  Technical:  "bg-blue-100   text-blue-700",
  Cultural:   "bg-pink-100   text-pink-700",
  Sports:     "bg-green-100  text-green-700",
  Placements: "bg-purple-100 text-purple-700",
  Academic:   "bg-amber-100  text-amber-700",
  General:    "bg-slate-100  text-slate-600",
};

const FALLBACK = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80";

// ─── Event Form ───────────────────────────────────────────────────────────────

const BLANK: SiteEvent = { id: "", title: "", date: "", category: "Technical", venue: "", organizer: "", description: "", image: "", galleryImages: [] };
const inp = "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

function EventForm({ initial, onSave, onCancel }: { initial?: SiteEvent; onSave: (e: SiteEvent) => void; onCancel: () => void }) {
  const [form, setForm] = useState<SiteEvent>(initial ?? { ...BLANK, id: makeId() });
  const [galleryInput, setGalleryInput] = useState("");
  const [err, setErr] = useState("");

  function set(k: keyof SiteEvent, v: string) { setForm(f => ({ ...f, [k]: v })); }
  function addGallery() {
    const url = galleryInput.trim(); if (!url) return;
    setForm(f => ({ ...f, galleryImages: [...(f.galleryImages ?? []), url] })); setGalleryInput("");
  }
  function removeGallery(i: number) { setForm(f => ({ ...f, galleryImages: f.galleryImages.filter((_, idx) => idx !== i) })); }
  function handleSave() {
    if (!form.title || !form.date || !form.venue || !form.description) { setErr("Please fill in Title, Date, Venue and Description."); return; }
    onSave(form);
  }

  return (
    <div className="space-y-4">
      {err && <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"><AlertCircle className="h-4 w-4 shrink-0" /> {err}</div>}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2"><label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Event Title *</label><input className={inp} value={form.title} onChange={e => set("title", e.target.value)} /></div>
        <div><label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Date *</label><input className={inp} placeholder="e.g. 15 Feb 2026" value={form.date} onChange={e => set("date", e.target.value)} /></div>
        <div><label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Category</label>
          <select className={inp} value={form.category} onChange={e => set("category", e.target.value as SiteEvent["category"])}>
            {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div><label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Venue *</label><input className={inp} value={form.venue} onChange={e => set("venue", e.target.value)} /></div>
        <div><label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Organizer</label><input className={inp} value={form.organizer} onChange={e => set("organizer", e.target.value)} /></div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Cover Image URL</label>
          <input className={inp} placeholder="https://..." value={form.image} onChange={e => set("image", e.target.value)} />
          {form.image && <img src={form.image} alt="" className="mt-2 h-28 w-full rounded-lg object-cover" onError={e => (e.currentTarget.style.display = "none")} />}
        </div>
        <div className="sm:col-span-2"><label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Description *</label><textarea className={inp} rows={4} value={form.description} onChange={e => set("description", e.target.value)} /></div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Gallery Image URLs</label>
          <div className="flex gap-2">
            <input className={inp} placeholder="Paste image URL and click Add" value={galleryInput} onChange={e => setGalleryInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addGallery())} />
            <button type="button" onClick={addGallery} className="shrink-0 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:opacity-90">Add</button>
          </div>
          {form.galleryImages.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {form.galleryImages.map((url, i) => (
                <div key={i} className="relative group h-16 w-24 rounded-lg overflow-hidden border border-border">
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <button onClick={() => removeGallery(i)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition grid place-items-center text-white"><X className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90"><Save className="h-4 w-4" /> Save Event</button>
        <button onClick={onCancel} className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold hover:bg-accent">Cancel</button>
      </div>
    </div>
  );
}

function FormModal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 py-6" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background shadow-2xl">
        <div className="flex items-center justify-between bg-primary px-6 py-4 rounded-t-2xl">
          <h2 className="font-display text-lg font-bold text-primary-foreground">{title}</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-primary-foreground"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Event Detail Page ────────────────────────────────────────────────────────

function EventDetailPage({ event, onBack }: { event: SiteEvent; onBack: () => void }) {
  const [galleryIdx, setGalleryIdx] = useState(0);
  const imgs = event.galleryImages ?? [];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Hero */}
      <div className="relative h-64 md:h-[420px] overflow-hidden">
        <img src={event.image || FALLBACK} alt={event.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <button onClick={onBack}
          className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition">
          <ArrowLeft className="h-3.5 w-3.5" /> All Events
        </button>
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 md:px-10">
          <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mb-3", CAT_COLOR[event.category] ?? "bg-white text-slate-700")}>
            {event.category}
          </span>
          <h1 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight">{event.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container-page py-8 grid lg:grid-cols-3 gap-10">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <p className="text-sm text-foreground leading-relaxed text-base">{event.description}</p>

          {/* Gallery */}
          {imgs.length > 0 && (
            <div>
              <h2 className="font-display text-lg font-bold text-foreground mb-4">Event Gallery</h2>
              {/* Main viewer */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-elevated">
                <img src={imgs[galleryIdx]} alt={`${event.title} gallery ${galleryIdx + 1}`} className="h-full w-full object-cover" />
                {imgs.length > 1 && (
                  <>
                    <button onClick={() => setGalleryIdx(i => (i - 1 + imgs.length) % imgs.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white hover:bg-black/70">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button onClick={() => setGalleryIdx(i => (i + 1) % imgs.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white hover:bg-black/70">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {imgs.map((_, i) => (
                        <button key={i} onClick={() => setGalleryIdx(i)}
                          className={cn("h-1.5 rounded-full transition-all", i === galleryIdx ? "w-5 bg-white" : "w-1.5 bg-white/50")} />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {imgs.map((src, i) => (
                  <button key={i} onClick={() => setGalleryIdx(i)}
                    className={cn("shrink-0 h-16 w-24 rounded-xl overflow-hidden border-2 transition", i === galleryIdx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100")}>
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {[
            { icon: Calendar, label: "Date",      value: event.date      },
            { icon: MapPin,   label: "Venue",     value: event.venue     },
            { icon: User,     label: "Organizer", value: event.organizer },
          ].filter(d => d.value).map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="mt-1.5 text-sm font-semibold text-foreground flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary shrink-0" /> {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Event Card (photo + name only, enlarged) ─────────────────────────────────

function EventCard({ event, onView, onEdit, onDelete, isAdmin }: {
  event: SiteEvent; onView: () => void; onEdit: () => void; onDelete: () => void; isAdmin: boolean;
}) {
  const [confirmDel, setConfirmDel] = useState(false);

  return (
    <button
      onClick={onView}
      className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elevated hover:-translate-y-1.5 transition-all duration-300 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{ aspectRatio: "4/5" }}
    >
      {/* Full bleed photo */}
      <img
        src={event.image || FALLBACK}
        alt={event.title}
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Category badge */}
      <div className="absolute top-3 left-3">
        <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-sm", CAT_COLOR[event.category] ?? "bg-white text-slate-700")}>
          {event.category}
        </span>
      </div>

      {/* Admin buttons */}
      {isAdmin && !confirmDel && (
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition">
          <button onClick={e => { e.stopPropagation(); onEdit(); }}
            className="grid h-8 w-8 place-items-center rounded-xl bg-white/90 text-blue-600 hover:bg-white shadow">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button onClick={e => { e.stopPropagation(); setConfirmDel(true); }}
            className="grid h-8 w-8 place-items-center rounded-xl bg-white/90 text-red-600 hover:bg-white shadow">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {isAdmin && confirmDel && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-xl bg-white/95 shadow px-2 py-1.5" onClick={e => e.stopPropagation()}>
          <span className="text-xs font-bold text-red-700">Delete?</span>
          <button onClick={e => { e.stopPropagation(); onDelete(); }} className="rounded-md bg-red-600 text-white text-xs px-2 py-0.5 font-semibold">Yes</button>
          <button onClick={e => { e.stopPropagation(); setConfirmDel(false); }} className="rounded-md border text-xs px-2 py-0.5 font-semibold">No</button>
        </div>
      )}

      {/* Name at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center gap-1.5 text-white/70 text-[11px] font-medium mb-1.5">
          <Calendar className="h-3 w-3" /> {event.date}
        </div>
        <h3 className="font-display text-lg font-bold text-white leading-snug group-hover:text-gold transition-colors">
          {event.title}
        </h3>
      </div>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function EventsPage() {
  useSEO(
    "Events and Activities | Diploma Polytechnic, Anakapalli",
    "Technical fests, cultural programmes, sports competitions, placement drives and industrial visits. Explore all campus events."
  );

  const { content, isAdmin, dispatch } = useAdmin();
  const [search,  setSearch]  = useState("");
  const [cat,     setCat]     = useState<Category>("All");
  const [viewing, setViewing] = useState<SiteEvent | null>(null);
  const [editing, setEditing] = useState<SiteEvent | null>(null);
  const [adding,  setAdding]  = useState(false);

  const filtered = useMemo(() =>
    content.events.filter(e =>
      (cat === "All" || e.category === cat) &&
      (search === "" || e.title.toLowerCase().includes(search.toLowerCase()))
    ), [content.events, cat, search]);

  const allGallery = useMemo(() =>
    content.events.flatMap(e => e.galleryImages ?? []).filter(Boolean),
    [content.events]);

  // Full event detail page
  if (viewing) {
    return (
      <EventDetailPage
        event={viewing}
        onBack={() => { setViewing(null); window.scrollTo({ top: 0 }); }}
      />
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Campus Events"
        title="Events and Activities"
        description="Technical fests, cultural programmes, sports competitions, placement drives and industrial visits."
        breadcrumb={[{ label: "Events" }]}
        image={headerImg}
      />

      {/* Sticky filter bar */}
      <div className="border-b border-border bg-card sticky top-0 z-20">
        <div className="container-page py-3 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events"
              className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-none flex-1 pb-0.5">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={cn("shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition",
                  cat === c ? "bg-primary text-primary-foreground" : "border border-border bg-background hover:bg-accent")}>
                {c}
              </button>
            ))}
          </div>
          {isAdmin && (
            <button onClick={() => setAdding(true)}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-emerald-700 transition">
              <Plus className="h-4 w-4" /> Add Event
            </button>
          )}
        </div>
      </div>

      {/* Events grid */}
      <Section>
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl font-bold text-foreground">No events found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try a different search or category.</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-6">{filtered.length} event{filtered.length !== 1 ? "s" : ""}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(ev => (
                <EventCard
                  key={ev.id} event={ev} isAdmin={isAdmin}
                  onView={() => { setViewing(ev); window.scrollTo({ top: 0 }); }}
                  onEdit={() => setEditing(ev)}
                  onDelete={() => dispatch({ type: "DELETE_EVENT", payload: ev.id })}
                />
              ))}
            </div>
          </>
        )}
      </Section>

      {/* Gallery strip */}
      {allGallery.length > 0 && (
        <Section muted>
          <SectionHeading eyebrow="Event Gallery" title="Moments from our events" center />
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {allGallery.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer shadow-soft hover:shadow-elevated"
                onClick={() => window.open(src, "_blank")}>
                <img src={src} alt={`Event photo ${i + 1}`} loading="lazy"
                  className="h-full w-full object-cover hover:scale-110 transition duration-500" />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Modals */}
      {adding && (
        <FormModal title="Add New Event" onClose={() => setAdding(false)}>
          <EventForm onSave={e => { dispatch({ type: "ADD_EVENT", payload: e }); setAdding(false); }} onCancel={() => setAdding(false)} />
        </FormModal>
      )}
      {editing && (
        <FormModal title="Edit Event" onClose={() => setEditing(null)}>
          <EventForm initial={editing} onSave={e => { dispatch({ type: "UPDATE_EVENT", payload: e }); setEditing(null); }} onCancel={() => setEditing(null)} />
        </FormModal>
      )}
    </>
  );
}