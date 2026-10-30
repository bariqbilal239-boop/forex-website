import Link from "next/link";
import { series, toPath } from "@/lib/chart";
import type { Article } from "@/lib/data";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function SectionHeading({ eyebrow, title, text, action }: { eyebrow: string; title: string; text?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {text && <p className="mt-2 text-muted">{text}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgb(212_175_55/0.14),transparent_55%)]" />
      <div className="container-x relative py-14 sm:py-20">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{text}</p>
        <div className="mt-8 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
      </div>
    </header>
  );
}

export function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "gold" | "bull" | "bear" | "info" }) {
  const tones = {
    default: "bg-white/5 text-muted",
    gold: "bg-gold/15 text-gold",
    bull: "bg-bull/15 text-green-400",
    bear: "bg-bear/15 text-red-400",
    info: "bg-info/15 text-blue-300",
  };
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", tones[tone])}>{children}</span>;
}

export function SampleNote({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-center gap-2 text-xs text-muted", className)}>
      <span className="h-2 w-2 rounded-full bg-info" />
      Illustrative sample values — not live quotes
    </p>
  );
}

export function Change({ value }: { value: number }) {
  return (
    <span className={cn("num text-sm font-semibold", value >= 0 ? "text-green-400" : "text-red-400")}>
      {value >= 0 ? "▲ +" : "▼ "}
      {value.toFixed(2)}%
    </span>
  );
}

export function LineChart({ seed, points = 90, start = 100, up = true, className, light }: { seed: number; points?: number; start?: number; up?: boolean; className?: string; light?: boolean }) {
  const w = 600;
  const h = 200;
  const d = toPath(series(points, start, start * 0.02, up ? start * 0.0015 : -start * 0.0015, seed), w, h);
  const color = up ? "#D4AF37" : "#DC2626";
  const id = `g${seed}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={cn("h-full w-full", className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[1, 2, 3, 4].map((i) => (
        <line key={i} x1="0" x2={w} y1={(h * i) / 5} y2={(h * i) / 5} stroke={light ? "#E2E8F0" : "#243044"} strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const initials = (name: string) => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

export function Avatar({ name, size = "sm" }: { name: string; size?: "sm" | "lg" }) {
  return (
    <span className={cn("grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold to-[#6b5413] font-bold text-navy", size === "sm" ? "h-8 w-8 text-xs" : "h-14 w-14 text-lg")}>{initials(name)}</span>
  );
}

const thumbs: Record<string, string> = {
  "Gold Analysis": "from-[#3a2e0b] via-[#5a4613] to-midnight",
  "Bitcoin & Crypto": "from-[#4a2a08] via-[#7a4510] to-midnight",
  "Forex Trading": "from-[#0e2142] via-[#183766] to-midnight",
  "Technical Analysis": "from-[#0c2a3a] via-[#124560] to-midnight",
  "Fundamental Analysis": "from-[#1e293b] via-[#334155] to-midnight",
  "Trading Education": "from-[#2a1640] via-[#43246a] to-midnight",
  "Market Psychology": "from-[#10261a] via-[#1b4630] to-midnight",
};

export function Thumb({ category, className }: { category: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br", thumbs[category] ?? thumbs["Fundamental Analysis"], className)}>
      <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
    </div>
  );
}

export function ArticleCard({ article, light }: { article: Article; light?: boolean }) {
  const a = article;
  return (
    <Link
      href={`/blog/${a.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border transition hover:-translate-y-1",
        light ? "border-slate-200 bg-white hover:shadow-xl" : "border-line bg-card/60 hover:border-gold/50"
      )}
    >
      <Thumb category={a.category} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-5">
        <div>
          <Badge tone={a.category === "Gold Analysis" ? "gold" : "default"}>{a.category}</Badge>
        </div>
        <h3 className={cn("mt-3 text-lg font-bold leading-snug group-hover:text-gold", light && "text-navy")}>{a.title}</h3>
        <p className={cn("mt-2 line-clamp-2 text-sm", light ? "text-slate-600" : "text-muted")}>{a.excerpt}</p>
        <div className={cn("mt-auto flex items-center gap-2 pt-5 text-xs", light ? "text-slate-500" : "text-muted")}>
          <Avatar name={a.author} />
          <span>
            {a.author} · {a.date} · {a.minutes} min
          </span>
        </div>
      </div>
    </Link>
  );
}
