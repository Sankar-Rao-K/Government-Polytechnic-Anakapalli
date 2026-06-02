import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Search, Plus, MapPin, Calendar, User, X, ChevronLeft,
  ChevronRight, Pencil, Trash2, Save, AlertCircle,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { useAdmin, makeId, type SiteEvent } from "@/contexts/AdminContext";
import headerImg from "@/assets/gallery-event.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Government Polytechnic, Anakapalli" },
      { name: "description", content: "Campus events, technical fests, cultural programmes and sports activities at Government Polytechnic, Anakapalli." },
    ],
  }),
  component: EventsPage,
});

// ─── Category config ──────────────────────────────────────────────────────────

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

// ─── Event Form (Add / Edit) ──────────────────────────────────────────────────

const BLANK: SiteEvent = {
  id: "", title: "", date: "", category: "Technical",
  venue: "", organizer: "", description: "", image: "", galleryImages: [],
};

function EventForm({
  initial, onSave, onCancel,
}: {
  initial?: SiteEvent;
  onSave: (e: SiteEvent) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<SiteEvent>(initial ?? { ...BLANK, id: makeId() });
  const [galleryInput, setGalleryInput] = useState("");
  const [err, setErr] = useState("");

  function set(k: keyof SiteEvent, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  function addGallery() {
    const url = galleryInput.trim();
    if (!url) return;
    setForm((f) => ({ ...f, galleryImages: [...(f.galleryImages ?? []), url] }));
    setGalleryInput("");
  }

  function removeGallery(i: number) {
    setForm((f) => ({ ...f, galleryImages: f.galleryImages.filter((_, idx) => idx !== i) }));
  }

  function handleSave() {
    if (!form.title || !form.date || !form.venue || !form.description) {
      setErr("Please fill in Title, Date, Venue and Description.");
      return;
    }
    onSave(form);
  }

  const inp = "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <div className="space-y-4">
      {err && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" /> {err}
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Event Title *</label>
          <input className={inp} placeholder="e.g. POLYTEX 2026 — Annual Technical Fest" value={form.title} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Date *</label>
          <input className={inp} placeholder="e.g. 15 Feb 2026" value={form.date} onChange={(e) => set("date", e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Category *</label>
          <select className={inp} value={form.category} onChange={(e) => set("category", e.target.value as SiteEvent["category"])}>
            {CATEGORIES.slice(1).map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Venue *</label>
          <input className={inp} placeholder="e.g. Seminar Hall" value={form.venue} onChange={(e) => set("venue", e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Organizer</label>
          <input className={inp} placeholder="e.g. CME Department" value={form.organizer} onChange={(e) => set("organizer", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Cover Image URL</label>
          <input className={inp} placeholder="https://... (paste image URL)" value={form.image} onChange={(e) => set("image", e.target.value)} />
          {form.image && <img src={form.image} alt="preview" className="mt-2 h-28 w-full rounded-lg object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Description *</label>
          <textarea className={inp} rows={4} placeholder="Describe the event..." value={form.description} onChange={(e) => set("description", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Gallery Image URLs</label>
          <div className="flex gap-2">
            <input className={inp} placeholder="Paste an image URL and click Add" value={galleryInput} onChange={(e) => setGalleryInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGallery())} />
            <button type="button" onClick={addGallery} className="shrink-0 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:opacity-90">Add</button>
          </div>
          {form.galleryImages.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {form.galleryImages.map((url, i) => (
                <div key={i} className="relative group h-16 w-24 rounded-lg overflow-hidden border border-border">
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <button onClick={() => removeGallery(i)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition grid place-items-center text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90">
          <Save className="h-4 w-4" /> Save Event
        </button>
        <button onClick={onCancel} className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold hover:bg-accent">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Event Detail Modal ───────────────────────────────────────────────────────

function EventDetailModal({ event, onClose }: { event: SiteEvent; onClose: () => void }) {
  const [galleryIdx, setGalleryIdx] = useState(0);
  const imgs = event.galleryImages ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background shadow-2xl">
        {/* Cover */}
        {event.image ? (
          <div className="relative h-56 w-full overflow-hidden rounded-t-2xl">
            <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className={cn("absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold", CAT_COLOR[event.category] ?? "bg-muted text-muted-foreground")}>
              {event.category}
            </span>
          </div>
        ) : (
          <div className="h-16 rounded-t-2xl bg-primary" />
        )}

        <button onClick={onClose}
          className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur">
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 space-y-5">
          <h2 className="font-display text-2xl font-bold text-foreground">{event.title}</h2>

          <div className="grid sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-muted/60 border border-border p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Date</p>
              <p className="mt-1 text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary" /> {event.date}
              </p>
            </div>
            <div className="rounded-xl bg-muted/60 border border-border p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Venue</p>
              <p className="mt-1 text-sm font-semibold text-foreground flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" /> {event.venue || "—"}
              </p>
            </div>
            <div className="rounded-xl bg-muted/60 border border-border p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Organizer</p>
              <p className="mt-1 text-sm font-semibold text-foreground flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary" /> {event.organizer || "GP Anakapalli"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">About the Event</p>
            <p className="text-sm text-foreground leading-relaxed">{event.description}</p>
          </div>

          {imgs.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Event Gallery</p>
              {/* Main viewer */}
              <div className="relative rounded-xl overflow-hidden aspect-video bg-black">
                <img src={imgs[galleryIdx]} alt={`Gallery ${galleryIdx + 1}`} className="h-full w-full object-cover" />
                {imgs.length > 1 && (
                  <>
                    <button onClick={() => setGalleryIdx((i) => (i - 1 + imgs.length) % imgs.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white hover:bg-black/70">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button onClick={() => setGalleryIdx((i) => (i + 1) % imgs.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white hover:bg-black/70">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {imgs.map((_, i) => (
                        <button key={i} onClick={() => setGalleryIdx(i)}
                          className={cn("h-1.5 rounded-full transition-all", i === galleryIdx ? "w-4 bg-white" : "w-1.5 bg-white/50")} />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                {imgs.map((src, i) => (
                  <button key={i} onClick={() => setGalleryIdx(i)}
                    className={cn("shrink-0 h-14 w-20 rounded-lg overflow-hidden border-2 transition",
                      i === galleryIdx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100")}>
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Event Card ───────────────────────────────────────────────────────────────

function EventCard({
  event, onView, onEdit, onDelete, isAdmin,
}: {
  event: SiteEvent;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isAdmin: boolean;
}) {
  const [confirmDel, setConfirmDel] = useState(false);
  const fallback = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80";

  return (
    <div className="group rounded-2xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-elevated hover:-translate-y-1.5 transition-all duration-300">
      {/* Cover image */}
      <div className="relative h-52 overflow-hidden">
        <img src={event.image || fallback} alt={event.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Category + admin buttons */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={cn("rounded-full px-3 py-1 text-xs font-semibold shadow-sm", CAT_COLOR[event.category] ?? "bg-white text-slate-700")}>
            {event.category}
          </span>
          {isAdmin && !confirmDel && (
            <div className="flex gap-1">
              <button onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="grid h-7 w-7 place-items-center rounded-lg bg-white/90 text-blue-600 hover:bg-white shadow-sm">
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setConfirmDel(true); }}
                className="grid h-7 w-7 place-items-center rounded-lg bg-white/90 text-red-600 hover:bg-white shadow-sm">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          {isAdmin && confirmDel && (
            <div className="flex items-center gap-1.5 rounded-xl bg-white/95 shadow px-2 py-1">
              <span className="text-xs font-semibold text-red-700">Delete?</span>
              <button onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="rounded-md bg-red-600 text-white text-xs px-2 py-0.5 font-semibold">Yes</button>
              <button onClick={(e) => { e.stopPropagation(); setConfirmDel(false); }}
                className="rounded-md border text-xs px-2 py-0.5 font-semibold">No</button>
            </div>
          )}
        </div>
        {/* Date chip */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur text-white text-xs font-medium px-2.5 py-1">
            <Calendar className="h-3 w-3" /> {event.date}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-display text-base font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition">
          {event.title}
        </h3>
        <div className="mt-2 flex flex-col gap-1">
          {event.venue && (
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-3 w-3 shrink-0 text-primary" /> {event.venue}
            </p>
          )}
          {event.organizer && (
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <User className="h-3 w-3 shrink-0 text-primary" /> {event.organizer}
            </p>
          )}
        </div>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{event.description}</p>
        <button onClick={onView}
          className="mt-4 w-full rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:opacity-90 transition">
          View Details
        </button>
      </div>
    </div>
  );
}

// ─── Add Event Modal ──────────────────────────────────────────────────────────

function AddEventModal({ onClose }: { onClose: () => void }) {
  const { dispatch } = useAdmin();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 py-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background shadow-2xl">
        <div className="flex items-center justify-between bg-primary px-6 py-4 rounded-t-2xl">
          <h2 className="font-display text-lg font-bold text-primary-foreground">Add New Event</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-primary-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <EventForm
            onSave={(e) => { dispatch({ type: "ADD_EVENT", payload: e }); onClose(); }}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}

function EditEventModal({ event, onClose }: { event: SiteEvent; onClose: () => void }) {
  const { dispatch } = useAdmin();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 py-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background shadow-2xl">
        <div className="flex items-center justify-between bg-primary px-6 py-4 rounded-t-2xl">
          <h2 className="font-display text-lg font-bold text-primary-foreground">Edit Event</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-primary-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <EventForm
            initial={event}
            onSave={(e) => { dispatch({ type: "UPDATE_EVENT", payload: e }); onClose(); }}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function EventsPage() {
  const { content, isAdmin, dispatch } = useAdmin();
  const [search,   setSearch]   = useState("");
  const [cat,      setCat]      = useState<Category>("All");
  const [viewing,  setViewing]  = useState<SiteEvent | null>(null);
  const [editing,  setEditing]  = useState<SiteEvent | null>(null);
  const [adding,   setAdding]   = useState(false);

  const filtered = useMemo(() =>
    content.events.filter((e) =>
      (cat === "All" || e.category === cat) &&
      (search === "" || e.title.toLowerCase().includes(search.toLowerCase()) ||
       e.description.toLowerCase().includes(search.toLowerCase()))
    ), [content.events, cat, search]);

  // Collect all gallery photos across all events
  const allGallery = useMemo(() =>
    content.events.flatMap((e) => e.galleryImages ?? []).filter(Boolean),
    [content.events]);

  return (
    <>
      <PageHeader
        eyebrow="Campus Events"
        title="Events & Activities"
        description="Technical fests, cultural programmes, sports, placements and industrial visits — life beyond the classroom."
        breadcrumb={[{ label: "Events" }]}
        image={headerImg}
      />

      {/* Search + Filter + Add */}
      <div className="border-b border-border bg-card sticky top-[calc(var(--header-h,0px))] z-20">
        <div className="container-page py-3 flex flex-col sm:flex-row gap-3 items-center">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events…"
              className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          {/* Category pills — scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none flex-1 pb-0.5">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition",
                  cat === c ? "bg-primary text-primary-foreground" : "border border-border bg-background hover:bg-accent"
                )}>
                {c}
              </button>
            ))}
          </div>
          {/* Add event — admin only */}
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
            <p className="text-2xl font-bold text-foreground">No events found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try a different search or category.</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-5">{filtered.length} event{filtered.length !== 1 ? "s" : ""}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((ev) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  isAdmin={isAdmin}
                  onView={() => setViewing(ev)}
                  onEdit={() => setEditing(ev)}
                  onDelete={() => dispatch({ type: "DELETE_EVENT", payload: ev.id })}
                />
              ))}
            </div>
          </>
        )}
      </Section>

      {/* Photo Gallery */}
      {allGallery.length > 0 && (
        <Section muted>
          <SectionHeading
            eyebrow="Event Gallery"
            title="Memories from our campus events"
            description="Photos from technical fests, cultural programmes and sports activities."
            center
          />
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allGallery.map((src, i) => (
              <div key={i}
                className="overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer shadow-soft hover:shadow-elevated"
                onClick={() => window.open(src, "_blank")}>
                <img src={src} alt={`Gallery ${i + 1}`} loading="lazy"
                  className="h-full w-full object-cover hover:scale-110 transition duration-500" />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Modals */}
      {viewing  && <EventDetailModal event={viewing}  onClose={() => setViewing(null)} />}
      {adding   && <AddEventModal    onClose={() => setAdding(false)} />}
      {editing  && <EditEventModal   event={editing}  onClose={() => setEditing(null)} />}
    </>
  );
}