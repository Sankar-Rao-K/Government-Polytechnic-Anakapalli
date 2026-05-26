import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  muted,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        muted && "bg-surface",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
