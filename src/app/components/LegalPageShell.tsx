import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

interface LegalPageShellProps {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt: string;
  highlights: Array<{ label: string; value: string }>;
  children: ReactNode;
}

export function LegalPageShell({
  eyebrow,
  title,
  intro,
  updatedAt,
  highlights,
  children,
}: LegalPageShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_left,_rgba(110,126,59,0.16),_transparent_35%),linear-gradient(180deg,_rgba(237,232,216,0.72),_rgba(246,242,232,1))]">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "linear-gradient(90deg, #6e7e3b 1px, transparent 1px), linear-gradient(180deg, #6e7e3b 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/15 bg-background/80 text-primary text-xs font-semibold uppercase tracking-[0.2em]">
              {eyebrow}
            </span>
            <h1
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
              >
                Nous contacter
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/produits"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                Voir le catalogue
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-card/90 p-5 shadow-sm backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            Dernière mise à jour: {updatedAt}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
