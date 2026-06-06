import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ShieldCheck, AlertCircle, Lock, ArrowLeft,
  Mail, User, LayoutDashboard,
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import galleryCampus   from "@/assets/gallery-campus.jpg";
import galleryLab      from "@/assets/gallery-lab.jpg";
import galleryEvent    from "@/assets/gallery-event.jpg";
import logo            from "@/assets/logo.png";

export const Route = createFileRoute("/admin-login")({
  component: AdminLoginPage,
});

// ─── Credentials (change here to update) ────────────────────────────────────
// Name  : admin
// Email : admin@gpa.edu.in

function AdminLoginPage() {
  const { isAdmin, login } = useAdmin();
  const navigate = useNavigate();
  const [name,    setName]   = useState("");
  const [email,   setEmail]  = useState("");
  const [error,   setError]  = useState("");
  const [loading, setLoading]= useState(false);
  const [shake,   setShake]  = useState(false);
  const [step,    setStep]   = useState<"idle"|"success">("idle");

  useEffect(() => {
    if (isAdmin) navigate({ to: "/admin" });
  }, [isAdmin, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please enter both your name and email address.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const ok = login(name.trim(), email.trim().toLowerCase());
    setLoading(false);
    if (ok) {
      setStep("success");
      await new Promise(r => setTimeout(r, 800));
      navigate({ to: "/admin" });
    } else {
      setError("Name or email not recognised. Please check your credentials.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="min-h-dvh flex">

      {/* ── Left panel — campus imagery + branding ── */}
      <div className="relative hidden lg:flex w-[520px] shrink-0 flex-col overflow-hidden">
        {/* Layered photos */}
        <img src={galleryCampus} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-black/70" />

        {/* Subtle dot pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Floating photo cards */}
        <div className="absolute right-8 top-32 w-40 rounded-2xl overflow-hidden shadow-2xl rotate-3 opacity-80">
          <img src={galleryLab} alt="" className="h-28 w-full object-cover" />
        </div>
        <div className="absolute right-4 top-64 w-36 rounded-2xl overflow-hidden shadow-2xl -rotate-2 opacity-70">
          <img src={galleryEvent} alt="" className="h-24 w-full object-cover" />
        </div>

        {/* Logo + name at top */}
        <div className="relative z-10 p-10 flex items-center gap-3">
          <img src={logo} alt="logo" className="h-14 w-14 object-contain drop-shadow-lg" />
          <div>
            <p className="font-display text-lg font-bold text-white leading-tight">Government Polytechnic</p>
            <p className="text-sm text-white/60">Anakapalli, Andhra Pradesh</p>
          </div>
        </div>

        {/* Centre content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-10 pb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm px-3 py-1.5 w-fit mb-6">
            <Lock className="h-3.5 w-3.5 text-gold" />
            <span className="text-[11px] font-bold text-gold uppercase tracking-widest">Restricted Area</span>
          </div>

          <h1 className="font-display text-4xl font-bold text-white leading-tight">
            Institution<br />Admin Portal
          </h1>
          <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs">
            Manage notices, events, placements, faculty and all website
            content — without writing any code.
          </p>

          {/* Feature chips */}
          <div className="mt-8 flex flex-col gap-2.5">
            {[
              { icon: "📢", text: "Post notices and announcements" },
              { icon: "🎓", text: "Update placement records"       },
              { icon: "📅", text: "Manage events and gallery"      },
              { icon: "⚙️", text: "Edit site info and principal's message" },
            ].map(f => (
              <div key={f.text} className="flex items-center gap-3">
                <span className="text-base">{f.icon}</span>
                <span className="text-sm text-white/75">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="relative z-10 border-t border-white/10 px-10 py-5">
          <p className="text-[11px] text-white/30">
            Authorised personnel only · All sessions are recorded
          </p>
        </div>
      </div>

      {/* ── Right panel — login form ── */}
      <div className="flex-1 flex flex-col bg-background">

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:hidden">
            <img src={logo} alt="logo" className="h-7 w-7 object-contain" />
            <span className="text-xs font-bold text-primary">GP Anakapalli</span>
          </div>
          <span className="text-[11px] text-muted-foreground hidden sm:block">
            Admin access only
          </span>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-sm">

            {step === "success" ? (
              /* ── Success state ── */
              <div className="text-center space-y-4 animate-fade-in">
                <div className="mx-auto h-20 w-20 rounded-full bg-emerald-100 grid place-items-center">
                  <ShieldCheck className="h-10 w-10 text-emerald-600" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">Login Successful</h2>
                <p className="text-sm text-muted-foreground">Redirecting to admin dashboard…</p>
                <div className="mx-auto h-1.5 w-48 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-[progress_0.8s_ease-out_forwards]" style={{width:"0%"}} />
                </div>
                <style>{`@keyframes progress{to{width:100%}}`}</style>
              </div>
            ) : (
              /* ── Login form ── */
              <>
                <div className="mb-8">
                  <div className="h-14 w-14 rounded-2xl bg-primary grid place-items-center mb-5 shadow-soft">
                    <LayoutDashboard className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground">Sign in</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Enter your admin credentials to continue.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  style={shake ? { animation: "shake 0.4s ease-in-out" } : {}}
                >
                  <style>{`
                    @keyframes shake {
                      0%,100%{transform:translateX(0)}
                      20%{transform:translateX(-10px)}
                      40%{transform:translateX(10px)}
                      60%{transform:translateX(-6px)}
                      80%{transform:translateX(6px)}
                    }
                  `}</style>

                  {/* Error */}
                  {error && (
                    <div className="mb-5 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 animate-fade-in">
                      <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  {/* Name */}
                  <div className="mb-4">
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <input
                        type="text"
                        required
                        autoFocus
                        autoComplete="name"
                        placeholder="Your admin name"
                        value={name}
                        onChange={e => { setName(e.target.value); setError(""); }}
                        className="w-full rounded-xl border border-border bg-muted/30 pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary placeholder:text-muted-foreground/40 transition"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-7">
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="admin@gpa.edu.in"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setError(""); }}
                        className="w-full rounded-xl border border-border bg-muted/30 pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary placeholder:text-muted-foreground/40 transition"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-primary text-primary-foreground py-3.5 text-sm font-bold tracking-wide hover:opacity-90 active:scale-[0.98] transition disabled:opacity-60 shadow-soft"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-white/25 border-t-white animate-spin" />
                        Verifying credentials…
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-8 text-center text-[11px] text-muted-foreground leading-relaxed">
                  Restricted to authorised staff only.<br />
                  Contact your web administrator if you need access.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Government Polytechnic, Anakapalli</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}