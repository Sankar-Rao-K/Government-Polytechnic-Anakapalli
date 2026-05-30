import {
  createContext, useContext, useReducer, useEffect, useCallback, ReactNode, useState
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type NoticeCategory =
  | "Examination" | "Placements" | "Scholarships"
  | "Academics" | "General" | "Library" | "Events";

export interface Notice {
  id: string;
  date: string;
  category: NoticeCategory;
  title: string;
  urgent: boolean;
}

export interface FacultyMember {
  id: string;
  name: string;
  dept: "CME" | "ECE" | "General" | "Administration";
  designation: string;
  qual: string;
  exp: number;
  spec: string;
}

export interface PlacementRecord {
  id: string;
  year: "2023-24" | "2024-25" | "2025-26";
  company: string;
  location: string;
  branch: "CME" | "ECE" | "Both";
  placed: number;
  lpa: number;
}

export interface SiteEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
}

export interface SiteInfo {
  phone: string;
  email: string;
  address: string;
  principalName: string;
  principalDesignation: string;
  principalMessage: string;
}

export interface AdminContent {
  notices: Notice[];
  faculty: FacultyMember[];
  placements: PlacementRecord[];
  events: SiteEvent[];
  siteInfo: SiteInfo;
}

// ─── Default Content ──────────────────────────────────────────────────────────

export const DEFAULT_CONTENT: AdminContent = {
  notices: [
    { id: "n1", date: "10 May 2026", category: "Examination", title: "Revised exam time-table for III semester (CME & ECE)", urgent: true },
    { id: "n2", date: "08 May 2026", category: "Examination", title: "Hall ticket download portal opens 15 May", urgent: false },
    { id: "n3", date: "05 May 2026", category: "Placements", title: "TCS NQT registration deadline extended to 20 May", urgent: false },
    { id: "n4", date: "02 May 2026", category: "Placements", title: "Infosys campus drive on 28 May — eligibility criteria", urgent: false },
    { id: "n5", date: "28 Apr 2026", category: "Scholarships", title: "ePASS post-matric scholarship renewal forms open", urgent: false },
    { id: "n6", date: "22 Apr 2026", category: "General", title: "Sports day postponed to 5 June due to weather advisory", urgent: false },
    { id: "n7", date: "18 Apr 2026", category: "Academics", title: "Industrial visit schedule for CME & ECE final year", urgent: false },
    { id: "n8", date: "10 Apr 2026", category: "Library", title: "New journals subscription — IEEE, Springer added", urgent: false },
  ],
  faculty: [
    { id: "f1", name: "Prof. I.V.S.S. Srinivasa Rao", dept: "Administration", designation: "Principal", qual: "M.E.", exp: 30, spec: "Technical Education & Administration" },
    { id: "f2", name: "Sri M. Subramanyam", dept: "CME", designation: "HOD, Computer Engineering", qual: "M.Tech (CSE)", exp: 20, spec: "Computer Engineering" },
    { id: "f3", name: "Sri B. Narasimha Murthy", dept: "CME", designation: "Senior Lecturer", qual: "M.Tech (CSE)", exp: 18, spec: "Programming & Data Structures" },
    { id: "f4", name: "Sri L. Mohana Tirumala", dept: "CME", designation: "Lecturer", qual: "M.Tech (CSE)", exp: 10, spec: "Web Technologies" },
    { id: "f5", name: "Sri Girish Reddy Ginni", dept: "CME", designation: "Lecturer", qual: "M.Tech (CSE)", exp: 9, spec: "Computer Networks" },
    { id: "f6", name: "Sri Suresh Barukula", dept: "CME", designation: "Lecturer", qual: "M.Tech (CSE)", exp: 8, spec: "DBMS & Software Engineering" },
    { id: "f7", name: "Smt. Ch. Sarojini", dept: "CME", designation: "Lecturer", qual: "M.Tech (CSE)", exp: 6, spec: "Python & AI Essentials" },
    { id: "f8", name: "Sri P. Srinivas", dept: "ECE", designation: "HOD, Electronics & Communication", qual: "M.Tech (ECE)", exp: 20, spec: "Communication Systems" },
    { id: "f9", name: "Sri A. Sri Ranga Raju", dept: "ECE", designation: "Lecturer", qual: "M.Tech (ECE)", exp: 14, spec: "Analog & Digital Electronics" },
    { id: "f10", name: "Sri G.M. Soma Sekhar", dept: "ECE", designation: "Lecturer", qual: "M.Tech (ECE)", exp: 12, spec: "Embedded Systems" },
    { id: "f11", name: "Smt. Bonthu Srikavya", dept: "ECE", designation: "Lecturer", qual: "M.Tech (ECE)", exp: 7, spec: "Signal Processing" },
    { id: "f12", name: "Dr. Govinda Rao Konkyana", dept: "General", designation: "Head of General Section", qual: "Ph.D", exp: 22, spec: "Physics" },
    { id: "f13", name: "Sri Y. Srinivasa Rao", dept: "General", designation: "Senior Lecturer in Chemistry", qual: "M.Sc, M.Phil", exp: 18, spec: "Chemistry" },
    { id: "f14", name: "Sri Reddi Ganesh Kumar", dept: "General", designation: "Lecturer in Mathematics", qual: "M.Sc (Maths)", exp: 12, spec: "Engineering Mathematics" },
    { id: "f15", name: "Sri P.V. Srinivasa Rao", dept: "Administration", designation: "Administrative Officer", qual: "—", exp: 25, spec: "Office Administration" },
  ],
  placements: [
    { id: "p1", year: "2023-24", company: "Thoughtworks", location: "Bangalore", branch: "CME", placed: 3, lpa: 8.0 },
    { id: "p2", year: "2023-24", company: "Tecnics Integration Technologies", location: "Hyderabad", branch: "CME", placed: 16, lpa: 2.52 },
    { id: "p3", year: "2023-24", company: "Daikin", location: "Sri City", branch: "ECE", placed: 28, lpa: 2.2 },
    { id: "p4", year: "2023-24", company: "Texas Instruments", location: "Bangalore", branch: "ECE", placed: 2, lpa: 8.5 },
    { id: "p5", year: "2024-25", company: "SKL Associates", location: "Hyderabad", branch: "CME", placed: 41, lpa: 1.44 },
    { id: "p6", year: "2024-25", company: "Royal Enfield", location: "Chennai", branch: "CME", placed: 15, lpa: 2.4 },
    { id: "p7", year: "2024-25", company: "Wipro", location: "Bangalore", branch: "ECE", placed: 4, lpa: 3.4 },
    { id: "p8", year: "2024-25", company: "Daikin", location: "Sri City", branch: "ECE", placed: 23, lpa: 2.2 },
    { id: "p9", year: "2025-26", company: "Thoughtworks India Pvt. Ltd.", location: "Bangalore", branch: "CME", placed: 4, lpa: 8.0 },
    { id: "p10", year: "2025-26", company: "Motherson Sumi", location: "Kancheepuram", branch: "CME", placed: 21, lpa: 2.02 },
    { id: "p11", year: "2025-26", company: "Daikin", location: "Sri City", branch: "ECE", placed: 21, lpa: 2.4 },
    { id: "p12", year: "2025-26", company: "Tata Electronics Pvt. Ltd.", location: "Hosur", branch: "ECE", placed: 5, lpa: 2.4 },
    { id: "p13", year: "2025-26", company: "Efftronics", location: "Mangalagiri", branch: "ECE", placed: 11, lpa: 2.8 },
  ],
  events: [
    { id: "e1", date: "22 May 2026", title: "TCS Recruitment Drive", description: "Campus recruitment drive by TCS for CME & ECE final year students. Bring ID card and resume.", category: "Placements" },
    { id: "e2", date: "10 May 2026", title: "Annual Sports Meet", description: "Inter-department sports competition. All students encouraged to participate.", category: "Sports" },
    { id: "e3", date: "01 May 2026", title: "Industrial Visit — CME", description: "Visit to software firms in Visakhapatnam for III year CME students.", category: "Academics" },
  ],
  siteInfo: {
    phone: "+91 90102 22173",
    email: "polytechnic.government173@gmail.com",
    address: "Rebaka Village, Anakapalli District, Andhra Pradesh — 531 001",
    principalName: "Prof. I.V.S.S. Srinivasa Rao, M.E.",
    principalDesignation: "Principal, Government Polytechnic, Anakapalli",
    principalMessage: "Since 2008, our institution has nurtured technical competence, innovation and ethical values. With NBA-accredited diploma programs, a state-of-the-art IoT Laboratory and strong placements over the last three years, we remain committed to transforming students into responsible citizens and skilled professionals.",
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "gpa_site_content";
const ADMIN_PASSWORD = "GPA@2025";

type Action =
  | { type: "SET_CONTENT"; payload: AdminContent }
  | { type: "ADD_NOTICE"; payload: Notice }
  | { type: "UPDATE_NOTICE"; payload: Notice }
  | { type: "DELETE_NOTICE"; payload: string }
  | { type: "ADD_FACULTY"; payload: FacultyMember }
  | { type: "UPDATE_FACULTY"; payload: FacultyMember }
  | { type: "DELETE_FACULTY"; payload: string }
  | { type: "ADD_PLACEMENT"; payload: PlacementRecord }
  | { type: "UPDATE_PLACEMENT"; payload: PlacementRecord }
  | { type: "DELETE_PLACEMENT"; payload: string }
  | { type: "ADD_EVENT"; payload: SiteEvent }
  | { type: "UPDATE_EVENT"; payload: SiteEvent }
  | { type: "DELETE_EVENT"; payload: string }
  | { type: "UPDATE_SITE_INFO"; payload: SiteInfo };

function reducer(state: AdminContent, action: Action): AdminContent {
  switch (action.type) {
    case "SET_CONTENT": return action.payload;
    case "ADD_NOTICE": return { ...state, notices: [action.payload, ...state.notices] };
    case "UPDATE_NOTICE": return { ...state, notices: state.notices.map((n) => n.id === action.payload.id ? action.payload : n) };
    case "DELETE_NOTICE": return { ...state, notices: state.notices.filter((n) => n.id !== action.payload) };
    case "ADD_FACULTY": return { ...state, faculty: [...state.faculty, action.payload] };
    case "UPDATE_FACULTY": return { ...state, faculty: state.faculty.map((f) => f.id === action.payload.id ? action.payload : f) };
    case "DELETE_FACULTY": return { ...state, faculty: state.faculty.filter((f) => f.id !== action.payload) };
    case "ADD_PLACEMENT": return { ...state, placements: [...state.placements, action.payload] };
    case "UPDATE_PLACEMENT": return { ...state, placements: state.placements.map((p) => p.id === action.payload.id ? action.payload : p) };
    case "DELETE_PLACEMENT": return { ...state, placements: state.placements.filter((p) => p.id !== action.payload) };
    case "ADD_EVENT": return { ...state, events: [...state.events, action.payload] };
    case "UPDATE_EVENT": return { ...state, events: state.events.map((e) => e.id === action.payload.id ? action.payload : e) };
    case "DELETE_EVENT": return { ...state, events: state.events.filter((e) => e.id !== action.payload) };
    case "UPDATE_SITE_INFO": return { ...state, siteInfo: action.payload };
    default: return state;
  }
}

interface AdminContextValue {
  content: AdminContent;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  dispatch: React.Dispatch<Action>;
  exportContent: () => void;
  importContent: (json: string) => boolean;
  resetToDefaults: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, dispatch] = useReducer(reducer, DEFAULT_CONTENT);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as AdminContent;
        dispatch({ type: "SET_CONTENT", payload: parsed });
      }
      const adminSession = sessionStorage.getItem("gpa_admin_session");
      if (adminSession === "true") setIsAdmin(true);
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch { /* ignore */ }
  }, [content, hydrated]);

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem("gpa_admin_session", "true");
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    sessionStorage.removeItem("gpa_admin_session");
  }, []);

  const exportContent = useCallback(() => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gpa-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [content]);

  const importContent = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json) as AdminContent;
      if (!parsed.notices || !parsed.faculty) return false;
      dispatch({ type: "SET_CONTENT", payload: parsed });
      return true;
    } catch { return false; }
  }, []);

  const resetToDefaults = useCallback(() => {
    dispatch({ type: "SET_CONTENT", payload: DEFAULT_CONTENT });
  }, []);

  return (
    <AdminContext.Provider value={{ content, isAdmin, login, logout, dispatch, exportContent, importContent, resetToDefaults }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function makeId() {
  return Math.random().toString(36).slice(2, 10);
}