// Market data shape shared by server pages and client components.

export type Quote = { symbol: string; name: string; price: number; change: number; high: number | null; low: number | null };

export type MarketData = {
  /** "sample" = illustrative values; "delayed" = real provider data with a delay. */
  mode: "sample" | "delayed";
  source: string;
  updated: string | null;
  quotes: Quote[];
  /** USD → currency rates for the gold calculator */
  fx: Record<string, number>;
};

export const sampleMarkets: MarketData = {
  mode: "sample",
  source: "Illustrative sample data",
  updated: null,
  quotes: [
    { symbol: "XAU/USD", name: "Gold Spot", price: 2748.3, change: 0.67, high: 2756.1, low: 2731.4 },
    { symbol: "XAG/USD", name: "Silver Spot", price: 32.84, change: 1.12, high: 33.02, low: 32.41 },
    { symbol: "EUR/USD", name: "Euro / Dollar", price: 1.0832, change: -0.21, high: 1.0861, low: 1.0815 },
    { symbol: "GBP/USD", name: "Pound / Dollar", price: 1.3021, change: 0.08, high: 1.3044, low: 1.2992 },
    { symbol: "USD/JPY", name: "Dollar / Yen", price: 152.31, change: 0.41, high: 152.6, low: 151.7 },
    { symbol: "BTC/USD", name: "Bitcoin", price: 71420, change: 2.14, high: 71980, low: 69850 },
    { symbol: "ETH/USD", name: "Ethereum", price: 2634, change: -1.08, high: 2671, low: 2605 },
  ],
  fx: { USD: 1, PKR: 278.5, INR: 83.9, AED: 3.6725, EUR: 0.92 },
};

/** Price formatting by instrument: FX pairs to 4 decimals, JPY pairs to 2, large prices without decimals. */
export function formatPrice(symbol: string, price: number | null) {
  if (price === null || !Number.isFinite(price)) return "—";
  const decimals = symbol.endsWith("/JPY") ? 2 : price >= 10000 ? 0 : price >= 100 ? 2 : price >= 10 ? 2 : 4;
  return price.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function marketLabel(m: Pick<MarketData, "mode" | "source" | "updated">) {
  if (m.mode !== "delayed") return "Illustrative sample values — not live quotes";
  const time = m.updated ? new Date(m.updated).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }) + " GMT" : "";
  return `Delayed data from ${m.source}${time ? ` · updated ${time}` : ""} · not for trading`;
}

export const findQuote = (m: MarketData, symbol: string) => m.quotes.find((q) => q.symbol === symbol);
