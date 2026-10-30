import type { Metadata } from "next";
import { Badge, PageHeader, cn } from "@/components/ui";
import { events, news } from "@/lib/data";

export const metadata: Metadata = { title: "Global Market News" };

export default function NewsPage() {
  const [lead, ...rest] = news;
  return (
    <>
      <PageHeader eyebrow="News desk" title="Global Market News" text="Central banks, macro data and geopolitics — with clear labels separating verified reporting from our analysis." />
      <div className="container-x py-12">
        <div className="mb-8 flex items-center gap-3 rounded-xl border border-bear/40 bg-bear/10 px-4 py-3 text-sm">
          <span className="rounded bg-bear px-2 py-0.5 text-xs font-bold uppercase">Breaking</span>
          <span className="font-medium">{lead.title}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {rest.concat(lead).map((n) => (
              <article key={n.title} className="card flex flex-col gap-3 p-5 transition hover:border-gold/40 sm:flex-row sm:gap-6 sm:p-6">
                <span className="num text-sm text-muted sm:w-14 sm:shrink-0">{n.time}</span>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold leading-snug">{n.title}</h2>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <Badge>{n.category}</Badge>
                    <Badge tone={n.label === "Analysis" ? "gold" : "info"}>{n.label === "Analysis" ? "Analysis · Opinion" : "✓ Verified report"}</Badge>
                    <span className="text-muted">Source: {n.source}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside id="calendar" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
            <div className="card overflow-hidden">
              <div className="border-b border-line p-5">
                <h2 className="font-semibold">Economic calendar</h2>
                <p className="text-sm text-muted">Times in GMT</p>
              </div>
              {events.map((e) => (
                <div key={e.event} className="border-b border-line p-5 last:border-0">
                  <div className="flex items-center justify-between text-xs">
                    <span className="num text-muted">{e.date}</span>
                    <span className={cn("font-semibold", e.impact === "High" ? "text-red-400" : "text-gold")}>{e.impact} impact</span>
                  </div>
                  <p className="mt-2 font-semibold">{e.country} · {e.event}</p>
                  <p className="num mt-1 text-xs text-muted">Forecast {e.forecast} · Previous {e.previous}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
