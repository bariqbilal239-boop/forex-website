"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { NewsletterForm } from "./layout";
import { ArticleCard, cn } from "./ui";
import { categories, type Article } from "@/lib/data";

const PAGE_SIZE = 6;

export function BlogBrowser({ posts }: { posts: Article[] }) {
  const initial = useSearchParams().get("category");
  const [category, setCategory] = useState<string>(initial && (categories as readonly string[]).includes(initial) ? initial : "All");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((a) => (category === "All" || a.category === category) && (a.title + a.excerpt).toLowerCase().includes(q));
  }, [posts, category, query]);

  const pick = (c: string) => {
    setCategory(c);
    setShown(PAGE_SIZE);
  };

  return (
    <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0">
        <div className="mb-8 flex flex-col gap-4">
          <label className="relative block">
            <span className="sr-only">Search articles</span>
            <svg className="absolute top-1/2 left-4 -translate-y-1/2 text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="input pl-11" placeholder="Search analysis, pairs, topics…" />
          </label>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                onClick={() => pick(c)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
                  c === category ? "border-gold bg-gold text-navy" : "border-line text-muted hover:border-gold/50 hover:text-ink"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {list.length ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {list.slice(0, shown).map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        ) : (
          <div className="card px-6 py-16 text-center">
            <p className="text-lg font-semibold">No articles found</p>
            <p className="mt-2 text-muted">Try another category or search term.</p>
            <button onClick={() => { pick("All"); setQuery(""); }} className="btn-ghost mt-6">Reset filters</button>
          </div>
        )}
        {list.length > shown && (
          <div className="mt-10 text-center">
            <button onClick={() => setShown(shown + PAGE_SIZE)} className="btn-ghost">Load more articles</button>
          </div>
        )}
      </div>

      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div className="card p-6">
          <h2 className="font-semibold">Categories</h2>
          <ul className="mt-4 space-y-1">
            {categories.map((c) => (
              <li key={c}>
                <button onClick={() => pick(c)} className={cn("flex w-full justify-between rounded-lg px-3 py-2 text-sm hover:bg-white/5", c === category && "text-gold")}>
                  {c}
                  <span className="num text-muted">{posts.filter((a) => a.category === c).length}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="card border-gold/30 bg-gradient-to-br from-[#2a2615] to-card p-6">
          <h2 className="font-semibold">The Daily Gold Brief</h2>
          <p className="mt-2 mb-4 text-sm text-muted">Levels, catalysts and analysis — every trading morning.</p>
          <NewsletterForm compact />
        </div>
      </aside>
    </div>
  );
}
