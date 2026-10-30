import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard, Avatar, LineChart, Thumb } from "@/components/ui";
import { getPost, getPosts } from "@/lib/api";
import { authors } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await getPost((await params).slug);
  return a ? { title: a.title, description: a.excerpt } : {};
}

const toc = ["Summary", "Macro backdrop", "Technical picture", "Scenarios", "What to watch"];
const anchor = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export default async function ArticlePage({ params }: Props) {
  const a = await getPost((await params).slug);
  if (!a) notFound();
  const role = Object.values(authors).find((x) => x.name === a.author)?.role ?? "Aurum Markets";
  const related = (await getPosts()).filter((x) => x.slug !== a.slug).sort((x) => (x.category === a.category ? -1 : 1)).slice(0, 3);

  return (
    <div className="bg-slate-50 text-navy">
      <div className="container-x py-10 sm:py-14">
        <nav className="flex flex-wrap gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-navy">Home</Link>/<Link href="/blog" className="hover:text-navy">Blog</Link>/<span>{a.category}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[auto_minmax(0,720px)] lg:justify-center xl:gap-16">
          <aside className={a.body ? "hidden" : "hidden lg:block"}>
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">On this page</p>
              <ul className="mt-4 space-y-2 border-l border-slate-200 text-sm">
                {toc.map((t) => (
                  <li key={t}><a href={`#${anchor(t)}`} className="-ml-px block border-l-2 border-transparent pl-4 text-slate-600 hover:border-gold hover:text-navy">{t}</a></li>
                ))}
              </ul>
            </div>
          </aside>

          <article>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{a.category}</span>
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">{a.label}</span>
            </div>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{a.title}</h1>
            <p className="mt-4 text-lg text-slate-600">{a.excerpt}</p>
            <div className="mt-6 flex items-center gap-3 border-y border-slate-200 py-4 text-sm text-slate-500">
              <Avatar name={a.author} />
              <div>
                <b className="text-navy">{a.author}</b> · {role}
                <br />
                {a.date} · {a.minutes} min read
              </div>
            </div>
            <Thumb category={a.category} className="mt-8 aspect-[16/9] rounded-2xl" />

            {a.body ? (
              // Post HTML is sanitised by the backend when it is saved.
              <div className="prose-article mt-10" dangerouslySetInnerHTML={{ __html: a.body }} />
            ) : (
            <div className="prose-article mt-10">
              <h2 id="summary">Summary</h2>
              <p>Gold has consolidated in a tight range just above $2,700 an ounce, supported by easing real yields and persistent official-sector demand. Momentum has slowed, however, and positioning suggests much of the good news may already be reflected in price.</p>
              <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-[15px] leading-7 text-slate-700">
                <b className="text-navy">Key takeaways</b>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Bias remains constructive while price holds above 2,705.</li>
                  <li>A daily close above 2,790 would open the way toward 2,850.</li>
                  <li>A hawkish FOMC surprise is the main downside risk.</li>
                </ul>
              </div>
              <h2 id="macro-backdrop">Macro backdrop</h2>
              <p>Ten-year real yields have fallen from their September highs, reducing the opportunity cost of holding a non-yielding asset. At the same time, the US dollar index has stalled near resistance.</p>
              <blockquote>“Central-bank buying has turned gold from a trade into a structural allocation.”</blockquote>
              <h2 id="technical-picture">Technical picture</h2>
              <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="h-56"><LineChart seed={7} start={2650} light /></div>
                <p className="mt-2 text-xs text-slate-500">XAU/USD daily · illustrative sample data</p>
              </div>
              <p>Price continues to respect the rising 50-day moving average. Daily RSI has cooled from overbought territory without breaking trend structure.</p>
              <h2 id="scenarios">Scenarios</h2>
              <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white text-sm">
                {[["Bullish", "Close above 2,790", "2,850", "text-green-700"], ["Bearish", "Close below 2,705", "2,640", "text-red-700"]].map(([s, t, g, c]) => (
                  <div key={s} className="grid grid-cols-3 gap-2 border-b border-slate-200 p-4 last:border-0">
                    <b className={c}>{s}</b><span className="text-slate-600">{t}</span><span className="num text-right">{g}</span>
                  </div>
                ))}
              </div>
              <h2 id="what-to-watch">What to watch</h2>
              <p>US CPI, the FOMC decision and quarterly central-bank reserve data are the key catalysts over the next three weeks.</p>
            </div>
            )}
            <p className="mt-8 rounded-xl bg-slate-100 p-5 text-sm text-slate-600">This article is educational market commentary and is not investment advice. Past performance is not a reliable indicator of future results.</p>
            <div className="mt-8 flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
              <Avatar name={a.author} size="lg" />
              <div>
                <b>{a.author}</b>
                <p className="text-sm text-slate-500">{role}</p>
                
              </div>
            </div>
          </article>
        </div>

        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-bold">Related articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <ArticleCard key={r.slug} article={r} light />)}
          </div>
        </section>
      </div>
    </div>
  );
}
