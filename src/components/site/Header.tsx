import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, ChevronDown, Settings2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { useAdmin } from "@/contexts/AdminContext";

const NAV = [
  { to: "/",            label: "Home"        },
  { to: "/about",       label: "About"       },
  { to: "/departments", label: "Departments" },
  { to: "/placements",  label: "Placements"  },
  { to: "/notices",     label: "Notices"     },
  { to: "/events",      label: "Events"      },
  { to: "/gallery",     label: "Gallery"     },
  { to: "/contact",     label: "Contact"     },
] as const;

const MORE = [
  { to: "/committees",      label: "Committees & Cells" },
  { to: "/scholarships",    label: "Scholarships"       },
  { to: "/library",         label: "Library"            },
  { to: "/downloads",       label: "Downloads"          },
  { to: "/student-services",label: "Student Services"   },
  { to: "/anti-ragging",    label: "Anti-Ragging"       },
];

export function Header() {
  const { isAdmin, logout }     = useAdmin();
  const [open,      setOpen]    = useState(false);
  const [moreOpen,  setMoreOpen]= useState(false);
  const moreRef  = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const moreActive = MORE.some(item => pathname === item.to);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">

      {/* ── Top utility bar ── */}
      <div className="hidden md:block bg-primary text-primary-foreground text-xs">
        <div className="container-page flex h-9 items-center justify-between">
          <span className="opacity-90">
            Government of Andhra Pradesh · State Board of Technical Education and Training
          </span>
          <div className="flex items-center gap-4 opacity-90">
            <a href="tel:+919010222173" className="inline-flex items-center gap-1.5 hover:text-gold transition">
              <Phone className="h-3 w-3" /> +91 90102 22173
            </a>
            <span className="hidden sm:inline">polytechnic.government173@gmail.com</span>
            {/* Admin button in top bar */}
            {isAdmin ? (
              <div className="flex items-center gap-2 border-l border-white/20 pl-4">
                <Link to="/admin"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold px-2.5 py-0.5 text-[11px] font-bold hover:bg-gold/30 transition">
                  <Settings2 className="h-3 w-3" /> Admin Panel
                </Link>
                <button onClick={logout}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/60 hover:text-white transition">
                  <LogOut className="h-3 w-3" /> Logout
                </button>
              </div>
            ) : (
              <Link to="/admin-login"
                className="border-l border-white/20 pl-4 text-[11px] font-semibold text-white/70 hover:text-white transition">
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Institution logo" className="h-12 w-12 object-contain shrink-0" />
          <div className="leading-tight">
            <div className="font-display text-base md:text-lg font-semibold text-primary">
              Government Polytechnic, Anakapalli
            </div>
            <div className="text-[11px] md:text-xs text-muted-foreground">
              Knowledge is Power · Estd. 2008
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map(item => {
            const active = pathname === item.to;
            return (
              <Link key={item.to} to={item.to}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  active ? "text-primary" : "text-foreground/75 hover:text-primary hover:bg-accent"
                )}>
                {item.label}
                {active && <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gold" />}
              </Link>
            );
          })}

          {/* More dropdown */}
          <div ref={moreRef} className="relative">
            <button onClick={() => setMoreOpen(v => !v)}
              className={cn(
                "relative inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                moreActive ? "text-primary" : "text-foreground/75 hover:text-primary hover:bg-accent"
              )}>
              More
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", moreOpen && "rotate-180")} />
              {moreActive && <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gold" />}
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border bg-background shadow-elevated py-1.5 animate-fade-in">
                {MORE.map(item => {
                  const active = pathname === item.to;
                  return (
                    <Link key={item.to} to={item.to} onClick={() => setMoreOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-2.5 text-sm font-medium transition-colors",
                        active ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-accent hover:text-primary"
                      )}>
                      {active && <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right side: Contact + Admin button (desktop) */}
        <div className="hidden lg:flex items-center gap-2">
          {isAdmin ? (
            <Link to="/admin"
              className="inline-flex items-center gap-1.5 rounded-md bg-amber-500 text-white px-4 py-2 text-sm font-semibold shadow-soft hover:bg-amber-600 transition">
              <Settings2 className="h-4 w-4" /> Admin
            </Link>
          ) : (
            <Link to="/contact"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95 transition">
              Contact Us
            </Link>
          )}
        </div>

        {/* Hamburger */}
        <button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(v => !v)}
          className="lg:hidden inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container-page py-3 grid gap-1">
            {[...NAV, ...MORE].map(item => {
              const active = pathname === item.to;
              return (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)}
                  className={cn("rounded-md px-3 py-3 text-sm font-medium", active ? "bg-primary text-primary-foreground" : "hover:bg-accent")}>
                  {item.label}
                </Link>
              );
            })}
            {/* Admin link in mobile menu */}
            {isAdmin ? (
              <>
                <Link to="/admin" onClick={() => setOpen(false)} className="mt-2 rounded-md bg-amber-500 text-white px-3 py-3 text-sm font-semibold flex items-center gap-2">
                  <Settings2 className="h-4 w-4" /> Admin Panel
                </Link>
                <button onClick={() => { logout(); setOpen(false); }} className="rounded-md border border-border px-3 py-3 text-sm font-semibold text-muted-foreground flex items-center gap-2 hover:bg-accent">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <Link to="/admin-login" onClick={() => setOpen(false)} className="mt-2 rounded-md border border-border px-3 py-3 text-sm font-semibold text-muted-foreground flex items-center gap-2 hover:bg-accent">
                <Settings2 className="h-4 w-4" /> Admin Login
              </Link>
            )}
            <Link to="/contact" onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center rounded-md bg-gold px-4 py-3 text-sm font-semibold text-gold-foreground">
              Contact Office
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}