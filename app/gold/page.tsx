import type { Metadata } from "next";
import { GoldCalculator, GoldChart } from "@/components/gold-tools";
import { ArticleCard, Badge, Change, SampleNote } from "@/components/ui";
import { articles } from "@/lib/data";

export const metadata: Metadata = { title: "Gold Rates & Analysis" };

const levels = [
  ["R2", "2,850", "text-red-400"],
  ["R1", "2,790", "text-red-400"],
  ["Pivot", "2,748", "text-gold"],
  ["S1", "2,705", "text-green-400"],
  ["S2", "2,640", "text-green-400"],
];

const factors = [
  ["Real yields", "Falling yields lower the cost of holding gold.", "Supportive"],
  ["US dollar", "DXY stalling near resistance.", "Neutral"],
  ["Central banks", "Record official-sector buying.", "Supportive"],
  ["ETF flows", "Modest inflows over four weeks.", "Supportive"],
  ["Positioning", "Speculative longs near highs.", "Risk"],
  ["Geopolitics", "Safe-haven demand elevated.", "Supportive"],
];

export default function GoldPage() {
  return (
    <>
      <section className="border-b border-line bg-[radial-gradient(circle_at_80%_0%,rgb(212_175_55/0.14),transparent_55%)]">
        <div className="container-x py-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">XAU/USD · Spot gold</span>
            <Badge tone="info">Illustrative sample</Badge>
          </div>
          <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-2">
            <h1 className="num text-5xl font-extrabold tracking-tight sm:text-6xl">2,748.30</h1>
            <div className="pb-2"><Change value={0.67} /> <span className="num text-sm text-muted">+18.30 today</span></div>
          </div>
          <SampleNote className="mt-3" />
        </div>
      </section>

      <div className="container-x space-y-10 py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <GoldChart />
          <div className="card p-6">
            <h2 className="font-semibold">Key levels</h2>
            <ul className="mt-4 space-y-2">
              {levels.map(([k, v, c]) => (
                <li key={k} className="flex items-center justify-between rounded-xl bg-midnight px-4 py-3">
                  <span className={`text-sm font-semibold ${c}`}>{k}</span>
                  <span className="num">{v}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">Trend: <b className="text-green-400">Bullish</b> above 2,705.</p>
          </div>
        </div>

        <GoldCalculator />

        <section>
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Scenarios</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card border-bull/40 p-6">
              <Badge tone="bull">Bullish scenario</Badge>
              <p className="mt-4 font-semibold">Daily close above 2,790</p>
              <p className="mt-2 text-sm text-muted">Opens a move toward 2,850 as real yields keep easing and central-bank demand holds.</p>
            </div>
            <div className="card border-bear/40 p-6">
              <Badge tone="bear">Bearish scenario</Badge>
              <p className="mt-4 font-semibold">Daily close below 2,705</p>
              <p className="mt-2 text-sm text-muted">Exposes 2,640 if a hawkish FOMC lifts the dollar and yields.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold tracking-tight">What's driving gold</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {factors.map(([t, d, s]) => (
              <div key={t} className="card p-5">
                <div className="flex items-center justify-between">
                  <b>{t}</b>
                  <Badge tone={s === "Supportive" ? "bull" : s === "Risk" ? "bear" : "default"}>{s}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Latest gold analysis</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.filter((a) => a.category.includes("Gold") || a.category === "Fundamental Analysis").slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>

        <p className="rounded-xl border border-line p-5 text-xs leading-relaxed text-muted">
          <b className="text-ink">Educational disclaimer:</b> Gold analysis on this page is for educational purposes only. Scenarios and levels are not guarantees of future performance. Prices are illustrative samples, not live quotes.
        </p>
      </div>
    </>
  );
}
