import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; to?: string }[];
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
      {image ? (
        <>
          <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[oklch(0.22_0.07_258)]" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px, 60px 60px",
            }}
          />
        </>
      )}
      <div className="container-page relative py-8 md:py-16 animate-fade-up">
        {eyebrow && (
          <div className="inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-3 font-display text-2xl md:text-5xl font-semibold max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm md:text-lg opacity-90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)] line-clamp-2 md:line-clamp-none">
            {description}
          </p>
        )}
        {breadcrumb && (
          <nav className="mt-4 flex items-center gap-1.5 text-xs md:text-sm opacity-85">
            <Link to="/" className="hover:text-gold">Home</Link>
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" />
                {b.to ? (
                  <Link to={b.to} className="hover:text-gold">{b.label}</Link>
                ) : (
                  <span>{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}