import type { Metadata } from "next";
import { GoldCalculator, GoldChart } from "@/components/gold-tools";
import { TradingViewPrice } from "@/components/tradingview-chart";
import { ArticleCard, Badge } from "@/components/ui";
import { getMarkets, getPosts } from "@/lib/api";
import { findQuote, sampleMarkets } from "@/lib/markets";

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

export default async function GoldPage() {
  const [posts, market] = await Promise.all([getPosts(), getMarkets()]);
  const gold = findQuote(market, "XAU/USD") ?? sampleMarkets.quotes[0];
  const goldPosts = posts.filter((a) => /gold/i.test(a.category + a.title));
  return (
    <>
      <section className="border-b border-line bg-[radial-gradient(circle_at_80%_0%,rgb(212_175_55/0.14),transparent_55%)]">
        <div className="container-x py-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">XAU/USD · Spot gold</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-bull/15 px-2.5 py-1 text-xs font-semibold text-green-400"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />Live</span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Gold Rates &amp; Analysis</h1>
          <TradingViewPrice symbol="OANDA:XAUUSD" className="mt-4 h-[190px] max-w-3xl sm:h-[220px]" />
          <p className="mt-2 text-xs text-muted">Live price by TradingView · for information only, not for trading</p>
        </div>
      </section>

      <div className="container-x space-y-10 py-12">
        <GoldChart />
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
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
          <GoldCalculator spot={gold.price} fx={market.fx} delayed={market.mode === "delayed"} />
        </div>

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
            {(goldPosts.length ? goldPosts : posts).slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>

        <p className="rounded-xl border border-line p-5 text-xs leading-relaxed text-muted">
          <b className="text-ink">Educational disclaimer:</b> Gold analysis on this page is for educational purposes only. Scenarios and levels are not guarantees of future performance. The live chart is provided by TradingView; other prices on this page are delayed or sample values and must not be used for trading.
        </p>
      </div>
    </>
  );
}
