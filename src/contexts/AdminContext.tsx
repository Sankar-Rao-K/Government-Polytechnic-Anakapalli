import {
  createContext, useContext, useReducer, useEffect,
  useCallback, useState, ReactNode,
} from "react";
import { supabase, hasSupabase } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

export type NoticeCategory =
  | "Examination" | "Placements" | "Scholarships"
  | "Academics" | "General" | "Library" | "Events";

export interface Notice {
  id: string; date: string; category: NoticeCategory; title: string; urgent: boolean;
}
export interface FacultyMember {
  id: string; name: string; dept: "CME" | "ECE" | "General" | "Administration";
  designation: string; qual: string; exp: number; spec: string;
}
export interface PlacementRecord {
  id: string; year: "2023-24" | "2024-25" | "2025-26";
  company: string; location: string; branch: "CME" | "ECE" | "Both";
  placed: number; lpa: number;
}
export interface SiteEvent {
  id: string; date: string; title: string; description: string;
  category: "Technical" | "Cultural" | "Sports" | "Placements" | "Academic" | "General";
  venue: string; organizer: string; image: string; galleryImages: string[];
}
export interface SiteInfo {
  phone: string; email: string; address: string;
  principalName: string; principalDesignation: string; principalMessage: string;
}
export interface AdminContent {
  notices: Notice[]; faculty: FacultyMember[];
  placements: PlacementRecord[]; events: SiteEvent[]; siteInfo: SiteInfo;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const DEFAULT_CONTENT: AdminContent = {
  notices: [
    { id: "n1", date: "10 May 2026", category: "Examination",  title: "Revised exam time-table for III semester (CME and ECE)", urgent: true  },
    { id: "n2", date: "08 May 2026", category: "Examination",  title: "Hall ticket download portal opens 15 May",               urgent: false },
    { id: "n3", date: "05 May 2026", category: "Placements",   title: "TCS NQT registration deadline extended to 20 May",       urgent: false },
    { id: "n4", date: "02 May 2026", category: "Placements",   title: "Infosys campus drive on 28 May — eligibility criteria",  urgent: false },
    { id: "n5", date: "28 Apr 2026", category: "Scholarships", title: "ePASS post-matric scholarship renewal forms open",        urgent: false },
    { id: "n6", date: "22 Apr 2026", category: "General",      title: "Sports day postponed to 5 June due to weather advisory",  urgent: false },
    { id: "n7", date: "18 Apr 2026", category: "Academics",    title: "Industrial visit schedule for CME and ECE final year",    urgent: false },
    { id: "n8", date: "10 Apr 2026", category: "Library",      title: "New journals subscription — IEEE, Springer added",        urgent: false },
  ],
  faculty: [
    { id: "f1",  name: "Prof. I.V.S.S. Srinivasa Rao", dept: "Administration", designation: "Principal",                        qual: "M.E.",         exp: 30, spec: "Technical Education" },
    { id: "f2",  name: "Sri M. Subramanyam",            dept: "CME",            designation: "HOD, Computer Engineering",        qual: "M.Tech (CSE)", exp: 20, spec: "Computer Engineering" },
    { id: "f3",  name: "Sri B. Narasimha Murthy",       dept: "CME",            designation: "Senior Lecturer",                  qual: "M.Tech (CSE)", exp: 18, spec: "Programming and Data Structures" },
    { id: "f8",  name: "Sri P. Srinivas",               dept: "ECE",            designation: "HOD, Electronics and Communication",qual: "M.Tech (ECE)", exp: 20, spec: "Communication Systems" },
    { id: "f12", name: "Dr. Govinda Rao Konkyana",      dept: "General",        designation: "Head of General Section",          qual: "Ph.D",         exp: 22, spec: "Physics" },
  ],
  placements: [
    { id: "p1", year: "2023-24", company: "Thoughtworks",       location: "Bangalore",   branch: "CME", placed: 3,  lpa: 8.0  },
    { id: "p2", year: "2023-24", company: "Texas Instruments",  location: "Bangalore",   branch: "ECE", placed: 2,  lpa: 8.5  },
    { id: "p3", year: "2024-25", company: "Royal Enfield",      location: "Chennai",     branch: "CME", placed: 15, lpa: 2.4  },
    { id: "p4", year: "2024-25", company: "Wipro",              location: "Bangalore",   branch: "ECE", placed: 4,  lpa: 3.4  },
    { id: "p5", year: "2025-26", company: "Thoughtworks India", location: "Bangalore",   branch: "CME", placed: 4,  lpa: 8.0  },
    { id: "p6", year: "2025-26", company: "Tata Electronics",   location: "Hosur",       branch: "ECE", placed: 5,  lpa: 2.4  },
  ],
  events: [
    { id: "e1", title: "POLYTEX 2025", date: "14 Feb 2025", category: "Technical",
      venue: "Seminar Hall", organizer: "CME and ECE Departments",
      description: "Annual technical festival with project showcase, coding challenges and paper presentations.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80", galleryImages: [] },
    { id: "e2", title: "Annual Sports Day 2025", date: "08 Mar 2025", category: "Sports",
      venue: "College Playground", organizer: "Physical Education Department",
      description: "Sports Day with competitions in cricket, volleyball, kabaddi and athletics.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80", galleryImages: [] },
  ],
  siteInfo: {
    phone: "+91 90102 22173",
    email: "polytechnic.government173@gmail.com",
    address: "Rebaka Village, Anakapalli District, Andhra Pradesh — 531 001",
    principalName: "Prof. I.V.S.S. Srinivasa Rao, M.E.",
    principalDesignation: "Principal, Government Polytechnic, Anakapalli",
    principalMessage: "Since 2008, our institution has nurtured technical competence, innovation and ethical values. With NBA-accredited diploma programs and strong placements, we remain committed to transforming students into responsible citizens and skilled professionals.",
  },
};

// ─── Reducer (local state only) ───────────────────────────────────────────────

type Action =
  | { type: "SET_CONTENT";       payload: AdminContent }
  | { type: "ADD_NOTICE";        payload: Notice }
  | { type: "UPDATE_NOTICE";     payload: Notice }
  | { type: "DELETE_NOTICE";     payload: string }
  | { type: "ADD_FACULTY";       payload: FacultyMember }
  | { type: "UPDATE_FACULTY";    payload: FacultyMember }
  | { type: "DELETE_FACULTY";    payload: string }
  | { type: "ADD_PLACEMENT";     payload: PlacementRecord }
  | { type: "UPDATE_PLACEMENT";  payload: PlacementRecord }
  | { type: "DELETE_PLACEMENT";  payload: string }
  | { type: "ADD_EVENT";         payload: SiteEvent }
  | { type: "UPDATE_EVENT";      payload: SiteEvent }
  | { type: "DELETE_EVENT";      payload: string }
  | { type: "UPDATE_SITE_INFO";  payload: SiteInfo };

function reducer(state: AdminContent, action: Action): AdminContent {
  switch (action.type) {
    case "SET_CONTENT":      return action.payload;
    case "ADD_NOTICE":       return { ...state, notices:    [action.payload, ...state.notices] };
    case "UPDATE_NOTICE":    return { ...state, notices:    state.notices.map(n => n.id === action.payload.id ? action.payload : n) };
    case "DELETE_NOTICE":    return { ...state, notices:    state.notices.filter(n => n.id !== action.payload) };
    case "ADD_FACULTY":      return { ...state, faculty:    [...state.faculty, action.payload] };
    case "UPDATE_FACULTY":   return { ...state, faculty:    state.faculty.map(f => f.id === action.payload.id ? action.payload : f) };
    case "DELETE_FACULTY":   return { ...state, faculty:    state.faculty.filter(f => f.id !== action.payload) };
    case "ADD_PLACEMENT":    return { ...state, placements: [...state.placements, action.payload] };
    case "UPDATE_PLACEMENT": return { ...state, placements: state.placements.map(p => p.id === action.payload.id ? action.payload : p) };
    case "DELETE_PLACEMENT": return { ...state, placements: state.placements.filter(p => p.id !== action.payload) };
    case "ADD_EVENT":        return { ...state, events:     [action.payload, ...state.events] };
    case "UPDATE_EVENT":     return { ...state, events:     state.events.map(e => e.id === action.payload.id ? action.payload : e) };
    case "DELETE_EVENT":     return { ...state, events:     state.events.filter(e => e.id !== action.payload) };
    case "UPDATE_SITE_INFO": return { ...state, siteInfo:   action.payload };
    default: return state;
  }
}

// ─── Supabase sync ────────────────────────────────────────────────────────────

// Map camelCase SiteEvent ↔ snake_case DB row
function eventToRow(e: SiteEvent) {
  return { id: e.id, title: e.title, date: e.date, category: e.category,
    venue: e.venue, organizer: e.organizer, description: e.description,
    image: e.image, gallery_images: e.galleryImages };
}
function rowToEvent(r: Record<string, unknown>): SiteEvent {
  return { id: r.id as string, title: r.title as string, date: r.date as string,
    category: r.category as SiteEvent["category"], venue: (r.venue as string) ?? "",
    organizer: (r.organizer as string) ?? "", description: (r.description as string) ?? "",
    image: (r.image as string) ?? "", galleryImages: (r.gallery_images as string[]) ?? [] };
}
function rowToSiteInfo(r: Record<string, unknown>): SiteInfo {
  return { phone: (r.phone as string) ?? "", email: (r.email as string) ?? "",
    address: (r.address as string) ?? "", principalName: (r.principal_name as string) ?? "",
    principalDesignation: (r.principal_designation as string) ?? "",
    principalMessage: (r.principal_message as string) ?? "" };
}
function siteInfoToRow(s: SiteInfo) {
  return { id: 1, phone: s.phone, email: s.email, address: s.address,
    principal_name: s.principalName, principal_designation: s.principalDesignation,
    principal_message: s.principalMessage };
}

async function fetchAll(): Promise<AdminContent> {
  if (!supabase) throw new Error("Supabase not configured");
  const [n, f, p, e, si] = await Promise.all([
    supabase.from("notices").select("*").order("created_at", { ascending: false }),
    supabase.from("faculty").select("*").order("created_at"),
    supabase.from("placements").select("*").order("year"),
    supabase.from("events").select("*").order("created_at", { ascending: false }),
    supabase.from("site_info").select("*").eq("id", 1).single(),
  ]);
  return {
    notices:    (n.data ?? []) as Notice[],
    faculty:    (f.data ?? []) as FacultyMember[],
    placements: (p.data ?? []) as PlacementRecord[],
    events:     (e.data ?? []).map(rowToEvent),
    siteInfo:   si.data ? rowToSiteInfo(si.data as Record<string, unknown>) : DEFAULT_CONTENT.siteInfo,
  };
}

async function syncAction(action: Action): Promise<void> {
  if (!supabase) return;
  switch (action.type) {
    case "ADD_NOTICE":       await supabase.from("notices").insert(action.payload);             break;
    case "UPDATE_NOTICE":    await supabase.from("notices").update(action.payload).eq("id", action.payload.id); break;
    case "DELETE_NOTICE":    await supabase.from("notices").delete().eq("id", action.payload);  break;
    case "ADD_FACULTY":      await supabase.from("faculty").insert(action.payload);             break;
    case "UPDATE_FACULTY":   await supabase.from("faculty").update(action.payload).eq("id", action.payload.id); break;
    case "DELETE_FACULTY":   await supabase.from("faculty").delete().eq("id", action.payload);  break;
    case "ADD_PLACEMENT":    await supabase.from("placements").insert(action.payload);          break;
    case "UPDATE_PLACEMENT": await supabase.from("placements").update(action.payload).eq("id", action.payload.id); break;
    case "DELETE_PLACEMENT": await supabase.from("placements").delete().eq("id", action.payload); break;
    case "ADD_EVENT":        await supabase.from("events").insert(eventToRow(action.payload));  break;
    case "UPDATE_EVENT":     await supabase.from("events").update(eventToRow(action.payload)).eq("id", action.payload.id); break;
    case "DELETE_EVENT":     await supabase.from("events").delete().eq("id", action.payload);   break;
    case "UPDATE_SITE_INFO": await supabase.from("site_info").upsert(siteInfoToRow(action.payload)); break;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const LS_KEY         = "gpa_site_content";
const ADMIN_NAME  = "admin";
const ADMIN_EMAIL = "admin@gpa.edu.in";

interface AdminContextValue {
  content:         AdminContent;
  isAdmin:         boolean;
  loading:         boolean;
  login:           (email: string, pw: string) => boolean;
  logout:          () => void;
  dispatch:        (action: Action) => void;
  exportContent:   () => void;
  importContent:   (json: string) => boolean;
  resetToDefaults: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin,  setIsAdmin]  = useState(false);
  const [loading,  setLoading]  = useState(true);
  const [content,  localDispatch] = useReducer(reducer, DEFAULT_CONTENT);

  // ── Load data on mount ──
  useEffect(() => {
    if (hasSupabase) {
      fetchAll()
        .then(data => { localDispatch({ type: "SET_CONTENT", payload: data }); })
        .catch(() => {
          // Supabase failed — fall back to localStorage
          try {
            const saved = localStorage.getItem(LS_KEY);
            if (saved) localDispatch({ type: "SET_CONTENT", payload: JSON.parse(saved) });
          } catch { /* ignore */ }
        })
        .finally(() => setLoading(false));
    } else {
      // No Supabase — use localStorage
      try {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) localDispatch({ type: "SET_CONTENT", payload: JSON.parse(saved) });
      } catch { /* ignore */ }
      setLoading(false);
    }
    if (sessionStorage.getItem("gpa_admin") === "true") setIsAdmin(true);
  }, []);

  // ── Persist to localStorage when Supabase not available ──
  useEffect(() => {
    if (!loading && !hasSupabase) {
      try { localStorage.setItem(LS_KEY, JSON.stringify(content)); } catch { /* ignore */ }
    }
  }, [content, loading]);

  // ── Dispatch: update local state + sync to Supabase ──
  const dispatch = useCallback((action: Action) => {
    localDispatch(action);
    syncAction(action).catch(err => console.error("Supabase sync error:", err));
  }, []);

  const login = useCallback((name: string, email: string): boolean => {
    if (name.trim().toLowerCase() === ADMIN_NAME && email.trim().toLowerCase() === ADMIN_EMAIL) {
      setIsAdmin(true);
      sessionStorage.setItem("gpa_admin", "true");
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    sessionStorage.removeItem("gpa_admin");
  }, []);

  const exportContent = useCallback(() => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = `gpa-content-${new Date().toISOString().slice(0,10)}.json`; a.click();
    URL.revokeObjectURL(url);
  }, [content]);

  const importContent = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json) as AdminContent;
      if (!parsed.notices || !parsed.faculty) return false;
      dispatch({ type: "SET_CONTENT", payload: parsed });
      return true;
    } catch { return false; }
  }, [dispatch]);

  const resetToDefaults = useCallback(() => {
    dispatch({ type: "SET_CONTENT", payload: DEFAULT_CONTENT });
  }, [dispatch]);

  return (
    <AdminContext.Provider value={{ content, isAdmin, loading, login, logout, dispatch, exportContent, importContent, resetToDefaults }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}

export function makeId() { return Math.random().toString(36).slice(2, 10); }