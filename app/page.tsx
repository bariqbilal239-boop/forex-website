import Link from "next/link";
import { NewsletterForm } from "@/components/layout";
import { TradingViewPrice } from "@/components/tradingview-chart";
import { ArticleCard, Badge, Change, LineChart, MarketNote, SectionHeading, Thumb, cn } from "@/components/ui";
import { getMarkets, getPosts, getSite } from "@/lib/api";
import { events, fxLevels, news } from "@/lib/data";
import { findQuote, formatPrice } from "@/lib/markets";

const OVERVIEW = ["XAU/USD", "BTC/USD", "EUR/USD", "GBP/USD", "USD/JPY"];

const statLabels = ["Years of coverage", "Published analyses", "Newsletter readers"];
const defaultStats = ["12+", "2,400+", "85k"];

/** Admin links are stored like "/gold"; external links pass through. */
const toHref = (link?: string) => (link && ((link.startsWith("/") && !link.startsWith("//")) || link.startsWith("https://")) ? link : "/gold");

export default async function HomePage() {
  const [posts, site, market] = await Promise.all([getPosts(), getSite(), getMarkets()]);
  const overview = OVERVIEW.map((s) => findQuote(market, s)).filter((q) => q !== undefined);
  const hero = site.hero ?? {};
  const stats = statLabels.map((label, i) => [hero.stats?.[i] || defaultStats[i], label]);
  const featured = posts[0];
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgb(212_175_55/0.16),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.025)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-x relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
          <div>
            <span className="eyebrow">{hero.eyebrow || "Gold · Forex · Bitcoin · Global Macro"}</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {hero.headline || "Trade Smarter."}
              <br />
              <em className="bg-gradient-to-r from-gold-light to-gold bg-clip-text not-italic text-transparent">{hero.highlight || "Understand the Markets."}</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              {hero.text || "Institutional-grade research on gold, Bitcoin and major currency pairs — daily technical analysis, macro context and the news that moves prices."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={toHref(hero.link)} className="btn-gold">{hero.button || "Explore Gold Analysis"} →</Link>
              <Link href="/news" className="btn-ghost">Latest Market News</Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              {stats.map(([v, l]) => (
                <div key={l}>
                  <dt className="num text-2xl font-bold">{v}</dt>
                  <dd className="mt-1 text-xs text-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted">XAU/USD · Spot Gold</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-bull/15 px-2.5 py-1 text-xs font-semibold text-green-400"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />Live</span>
            </div>
            <TradingViewPrice symbol="OANDA:XAUUSD" className="mt-3 h-[300px] sm:h-[340px]" />
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
              <span>Live price by TradingView</span>
              <Link href="/gold" className="font-semibold text-gold">Full gold dashboard →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Market overview */}
      <section className="container-x py-16 sm:py-20">
        <SectionHeading eyebrow="Market overview" title="Key markets at a glance" action={<MarketNote market={market} />} />
        <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {overview.map((m, i) => (
            <div key={m.symbol} className="card min-w-[72%] snap-start p-5 sm:min-w-0">
              <div className="flex items-center justify-between">
                <b>{m.symbol}</b>
                <Change value={m.change} />
              </div>
              <p className="text-xs text-muted">{m.name}</p>
              <p className="num mt-3 text-2xl font-bold">{formatPrice(m.symbol, m.price)}</p>
              <div className="mt-3 h-14">
                <LineChart seed={i * 4 + 3} points={40} up={m.change >= 0} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured gold analysis */}
      {featured && (
      <section className="container-x">
        <Link href={`/blog/${featured.slug}`} className="card group grid overflow-hidden lg:grid-cols-2">
          <Thumb category={featured.category} className="min-h-56 lg:min-h-full" />
          <div className="p-6 sm:p-10">
            <span className="eyebrow">Featured gold analysis</span>
            <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight group-hover:text-gold sm:text-3xl">{featured.title}</h2>
            <p className="mt-4 text-muted">{featured.excerpt}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[["Resistance", "2,790"], ["Support", "2,705"], ["Bias", "Bullish"], ["Horizon", "2–4 wks"]].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line bg-midnight p-3">
                  <p className="text-xs text-muted">{k}</p>
                  <p className="num mt-1 font-semibold">{v}</p>
                </div>
              ))}
            </div>
            <span className="mt-8 inline-flex font-semibold text-gold">Read the full analysis →</span>
          </div>
        </Link>
      </section>
      )}

      {/* Forex table */}
      <section className="container-x py-16 sm:py-20">
        <SectionHeading eyebrow="Forex" title="Technical levels for major pairs" text="Key support and resistance from our FX desk, updated each session." />
        <div className="card overflow-hidden">
          <div className="hidden grid-cols-4 border-b border-line px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted sm:grid">
            <span>Pair</span><span>Trend</span><span>Support</span><span>Resistance</span>
          </div>
          {fxLevels.map((r) => (
            <div key={r.pair} className="grid grid-cols-2 gap-y-2 border-b border-line px-5 py-4 last:border-0 sm:grid-cols-4 sm:px-6">
              <b>{r.pair}</b>
              <span className="justify-self-end sm:justify-self-start">
                <Badge tone={r.trend === "Bullish" ? "bull" : r.trend === "Bearish" ? "bear" : "default"}>{r.trend}</Badge>
              </span>
              <span className="num text-sm"><span className="text-muted sm:hidden">S </span>{r.support}</span>
              <span className="num justify-self-end text-sm sm:justify-self-start"><span className="text-muted sm:hidden">R </span>{r.resistance}</span>
            </div>
          ))}
        </div>
      </section>

      {/* News + calendar */}
      <section className="container-x grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <SectionHeading eyebrow="Latest news" title="What's moving markets" action={<Link href="/news" className="text-sm font-semibold text-gold">All news →</Link>} />
          <div className="card divide-y divide-line">
            {news.slice(0, 4).map((n) => (
              <article key={n.title} className="flex gap-4 p-5">
                <span className="num w-12 shrink-0 text-sm text-muted">{n.time}</span>
                <div>
                  <h3 className="font-semibold leading-snug">{n.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge>{n.category}</Badge>
                    <Badge tone={n.label === "Analysis" ? "gold" : "info"}>{n.label}</Badge>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Calendar" title="High-impact events" />
          <div className="card divide-y divide-line">
            {events.map((e) => (
              <div key={e.event} className="flex items-center gap-3 p-4">
                <span className={cn("h-2 w-2 shrink-0 rounded-full", e.impact === "High" ? "bg-bear" : "bg-gold")} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{e.event}</p>
                  <p className="num text-xs text-muted">{e.country} · {e.date}</p>
                </div>
                <span className="num text-xs text-muted">F {e.forecast}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="container-x py-16 sm:py-20">
        <SectionHeading eyebrow="Research library" title="Latest analysis" action={<Link href="/blog" className="text-sm font-semibold text-gold">View all →</Link>} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1, 4).map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
      </section>

      {/* Newsletter */}
      <section id="subscribe" className="container-x scroll-mt-24">
        <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-[#2a2615] via-card to-midnight p-8 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="eyebrow">The Daily Gold Brief</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">Levels, catalysts and analysis — every trading morning.</h2>
              <p className="mt-3 text-muted">Free. No spam. Unsubscribe anytime.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
