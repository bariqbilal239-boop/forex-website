// Server-side client for the Node.js backend (forex-front-end repo).
// If the backend can't be reached, pages fall back to the sample content in lib/data.ts.
import "server-only";
import { articles as sampleArticles, getArticle as getSampleArticle, type Article } from "./data";
import { sampleMarkets, type MarketData } from "./markets";

const API_URL = process.env.API_URL ?? "http://localhost:5173";
const REVALIDATE_SECONDS = 30;

type ApiPost = {
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  author?: string;
  label?: string;
  date?: string;
  mins?: number;
  body?: string;
};

export type SiteContent = {
  hero?: { eyebrow?: string; headline?: string; highlight?: string; text?: string; button?: string; link?: string; stats?: string[] };
  disclaimer?: string;
  social?: Record<string, string>;
  email?: string;
};

/** `undefined` = backend unreachable, `null` = backend answered with an error (e.g. 404). */
async function get<T>(path: string): Promise<T | null | undefined> {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: REVALIDATE_SECONDS } });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return undefined;
  }
}

const formatDate = (d?: string) =>
  d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" }) : "";

const toArticle = (p: ApiPost): Article => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.subtitle ?? "",
  category: p.category || "Market Analysis",
  author: p.author || "Aurum Research",
  label: (p.label || "Analysis").split(" /")[0],
  date: formatDate(p.date),
  minutes: p.mins || 1,
  body: p.body,
});

export async function getPosts(): Promise<Article[]> {
  const posts = await get<ApiPost[]>("/api/public/posts");
  return posts ? posts.map(toArticle) : sampleArticles;
}

export async function getPost(slug: string): Promise<Article | undefined> {
  const post = await get<ApiPost>(`/api/public/posts/${encodeURIComponent(slug)}`);
  if (post) return toArticle(post);
  return post === undefined ? getSampleArticle(slug) : undefined;
}

/** Cached prices from the backend. Falls back to clearly labelled sample values. */
export async function getMarkets(): Promise<MarketData> {
  const data = await get<MarketData>("/api/public/markets");
  return data?.quotes?.length ? data : sampleMarkets;
}

export async function getSite(): Promise<SiteContent> {
  return (await get<SiteContent>("/api/public/site")) ?? {};
}
