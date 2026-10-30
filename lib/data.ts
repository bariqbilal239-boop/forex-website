// Sample content for the design phase. All market values are illustrative, not live quotes.
// Replace with API calls once the Node.js backend is built.

export type Market = { symbol: string; name: string; price: string; change: number; seed: number };
export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  minutes: number;
  label: string;
  /** HTML from the CMS; sample articles use the built-in template body instead. */
  body?: string;
};
export type NewsItem = { time: string; title: string; category: string; label: "Verified report" | "Analysis"; source: string };
export type CalendarEvent = { date: string; country: string; event: string; impact: "High" | "Medium" | "Low"; forecast: string; previous: string };

export const categories = [
  "Gold Analysis",
  "Forex Trading",
  "Bitcoin & Crypto",
  "Technical Analysis",
  "Fundamental Analysis",
  "Trading Education",
  "Market Psychology",
] as const;
export type Category = (typeof categories)[number];

export const authors = {
  SM: { name: "Sarah Mitchell", role: "Senior Gold Strategist" },
  JL: { name: "James Lowe", role: "Head of FX Research" },
  DK: { name: "Daniel Kim", role: "Crypto Analyst" },
  AR: { name: "Aisha Rahman", role: "Technical Analyst" },
  PN: { name: "Priya Nair", role: "Trading Educator" },
} as const;
export type AuthorId = keyof typeof authors;

export const markets: Market[] = [
  { symbol: "XAU/USD", name: "Gold Spot", price: "2,748.30", change: 0.67, seed: 7 },
  { symbol: "BTC/USD", name: "Bitcoin", price: "71,420", change: 2.14, seed: 11 },
  { symbol: "EUR/USD", name: "Euro / Dollar", price: "1.0832", change: -0.21, seed: 3 },
  { symbol: "GBP/USD", name: "Pound / Dollar", price: "1.3021", change: 0.08, seed: 5 },
  { symbol: "DXY", name: "US Dollar Index", price: "104.62", change: -0.34, seed: 13 },
];

export const tickerItems: Pick<Market, "symbol" | "price" | "change">[] = [
  ...markets,
  { symbol: "XAG/USD", price: "32.84", change: 1.12 },
  { symbol: "USD/JPY", price: "152.31", change: 0.41 },
  { symbol: "ETH/USD", price: "2,634", change: -1.08 },
  { symbol: "WTI", price: "69.42", change: -0.86 },
];

const sampleArticles: (Omit<Article, "author"> & { author: AuthorId })[] = [
  { slug: "central-banks-buying-gold", category: "Gold Analysis", title: "Why central banks keep buying gold — and what it means for price floors", excerpt: "Official-sector demand has reshaped gold's downside. We quantify the effect.", author: "SM", date: "Oct 30, 2026", minutes: 8, label: "Analysis" },
  { slug: "eurusd-policy-divergence", category: "Forex Trading", title: "EUR/USD: policy divergence returns as ECB signals faster easing", excerpt: "Rate expectations are pulling the euro toward the bottom of its range.", author: "JL", date: "Oct 29, 2026", minutes: 6, label: "Analysis" },
  { slug: "bitcoin-etf-flows", category: "Bitcoin & Crypto", title: "Spot Bitcoin ETF flows: reading the signal through the noise", excerpt: "Daily flow data is volatile. A rolling view tells a clearer story.", author: "DK", date: "Oct 28, 2026", minutes: 7, label: "Analysis" },
  { slug: "support-resistance-framework", category: "Technical Analysis", title: "Support and resistance that actually works: a practical framework", excerpt: "How to identify levels the market respects, with worked XAU/USD examples.", author: "AR", date: "Oct 27, 2026", minutes: 10, label: "Education" },
  { slug: "real-yields-and-gold", category: "Fundamental Analysis", title: "Real yields and gold: is the inverse relationship breaking down?", excerpt: "The correlation weakened in 2024–25. Here's why it may be returning.", author: "SM", date: "Oct 26, 2026", minutes: 9, label: "Analysis" },
  { slug: "position-sizing-101", category: "Trading Education", title: "Position sizing 101: the 1% rule and why it keeps traders solvent", excerpt: "A step-by-step guide to sizing trades around risk, not conviction.", author: "PN", date: "Oct 25, 2026", minutes: 6, label: "Education" },
  { slug: "fomo-revenge-trades", category: "Market Psychology", title: "FOMO, revenge trades and the discipline gap", excerpt: "The behavioural traps that cost traders most — and simple checks to avoid them.", author: "PN", date: "Oct 24, 2026", minutes: 5, label: "Education" },
  { slug: "gold-local-premium", category: "Gold Analysis", title: "Gold in Pakistan and India: what drives the local premium?", excerpt: "Import duties, FX and seasonal demand explain the gap with spot.", author: "AR", date: "Oct 23, 2026", minutes: 7, label: "Analysis" },
  { slug: "usdjpy-intervention-map", category: "Forex Trading", title: "USD/JPY near intervention territory: a risk map", excerpt: "Where Japanese authorities have stepped in before and what to watch now.", author: "JL", date: "Oct 22, 2026", minutes: 6, label: "Analysis" },
  { slug: "bitcoin-vs-gold-hedge", category: "Bitcoin & Crypto", title: "Bitcoin vs. gold as a hedge: what the data shows", excerpt: "Comparing drawdowns and correlations across five stress periods.", author: "DK", date: "Oct 21, 2026", minutes: 11, label: "Analysis" },
];

export const news: NewsItem[] = [
  { time: "14:05", title: "Fed holds rates; Powell says December decision is “data dependent”", category: "Global Economy", label: "Verified report", source: "Federal Reserve" },
  { time: "13:30", title: "Gold climbs to session high as Treasury yields slip", category: "Gold", label: "Verified report", source: "Aurum News Desk" },
  { time: "12:15", title: "Euro slides after eurozone inflation undershoots forecasts", category: "Forex", label: "Verified report", source: "Eurostat" },
  { time: "11:40", title: "Bitcoin ETFs record second day of net outflows", category: "Bitcoin", label: "Verified report", source: "Fund filings" },
  { time: "09:20", title: "Oil steadies as OPEC+ signals output discipline", category: "Commodities", label: "Verified report", source: "OPEC+ statement" },
  { time: "08:15", title: "Why gold dips keep getting bought", category: "Gold", label: "Analysis", source: "Aurum Research" },
];

export const events: CalendarEvent[] = [
  { date: "Oct 31 · 12:30", country: "US", event: "Core PCE Price Index (MoM)", impact: "High", forecast: "0.2%", previous: "0.3%" },
  { date: "Nov 01 · 12:30", country: "US", event: "Non-Farm Payrolls", impact: "High", forecast: "140K", previous: "254K" },
  { date: "Nov 05 · 15:00", country: "US", event: "ISM Services PMI", impact: "Medium", forecast: "53.8", previous: "54.9" },
  { date: "Nov 06 · 13:15", country: "EU", event: "ECB Interest Rate Decision", impact: "High", forecast: "3.15%", previous: "3.40%" },
  { date: "Nov 07 · 12:00", country: "UK", event: "BoE Interest Rate Decision", impact: "High", forecast: "4.75%", previous: "5.00%" },
];

export const fxLevels = [
  { pair: "EUR/USD", trend: "Bearish", support: "1.0780", resistance: "1.0900" },
  { pair: "GBP/USD", trend: "Neutral", support: "1.2950", resistance: "1.3100" },
  { pair: "USD/JPY", trend: "Bullish", support: "150.80", resistance: "153.20" },
  { pair: "AUD/USD", trend: "Bearish", support: "0.6550", resistance: "0.6680" },
  { pair: "USD/CAD", trend: "Neutral", support: "1.3780", resistance: "1.3920" },
] as const;

export const articles: Article[] = sampleArticles.map((a) => ({ ...a, author: authors[a.author].name }));

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
