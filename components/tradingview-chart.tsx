"use client";

import { useEffect, useRef } from "react";
import { cn } from "./ui";

const EMBED_URL = "https://s3.tradingview.com/external-embedding/embed-widget-";

/**
 * Embeds any TradingView widget (https://www.tradingview.com/widget-docs/).
 * The size lives on the outer wrapper because TradingView's script forces `height: 100%` on its container.
 */
export function TradingViewWidget({ widget, config, className }: { widget: string; config: Record<string, unknown>; className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const json = JSON.stringify(config);

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    el.innerHTML = "";

    const inner = document.createElement("div");
    inner.className = "tradingview-widget-container__widget";
    inner.style.height = "100%";
    inner.style.width = "100%";

    const script = document.createElement("script");
    script.src = `${EMBED_URL}${widget}.js`;
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = json;

    el.append(inner, script);
    return () => {
      el.innerHTML = "";
    };
  }, [widget, json]);

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div ref={container} className="tradingview-widget-container h-full w-full" />
    </div>
  );
}

/** Full interactive chart. */
export function TradingViewChart({ symbol = "OANDA:XAUUSD", interval = "15", className }: { symbol?: string; interval?: string; className?: string }) {
  return (
    <TradingViewWidget
      widget="advanced-chart"
      className={cn("rounded-xl bg-midnight", className)}
      config={{
        autosize: true,
        symbol,
        interval,
        timezone: "Asia/Karachi",
        theme: "dark",
        style: "1",
        locale: "en",
        backgroundColor: "rgba(17, 24, 39, 1)",
        gridColor: "rgba(36, 48, 68, 0.6)",
        allow_symbol_change: true,
        calendar: false,
        support_host: "https://www.tradingview.com",
      }}
    />
  );
}

/** Live price, change and mini chart for one symbol. */
export function TradingViewPrice({ symbol = "OANDA:XAUUSD", range = "1D", className }: { symbol?: string; range?: string; className?: string }) {
  return (
    <TradingViewWidget
      widget="mini-symbol-overview"
      className={className}
      config={{
        symbol,
        width: "100%",
        height: "100%",
        locale: "en",
        dateRange: range,
        colorTheme: "dark",
        isTransparent: true,
        autosize: true,
        largeChartUrl: "",
        chartOnly: false,
        noTimeScale: false,
        trendLineColor: "rgba(212, 175, 55, 1)",
        underLineColor: "rgba(212, 175, 55, 0.25)",
        underLineBottomColor: "rgba(212, 175, 55, 0)",
      }}
    />
  );
}

/** TradingView symbols used across the site. */
export const LIVE_SYMBOLS = [
  { proName: "OANDA:XAUUSD", title: "Gold" },
  { proName: "OANDA:XAGUSD", title: "Silver" },
  { proName: "FX:EURUSD", title: "EUR/USD" },
  { proName: "FX:GBPUSD", title: "GBP/USD" },
  { proName: "FX:USDJPY", title: "USD/JPY" },
  { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
  { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
  { proName: "TVC:DXY", title: "US Dollar Index" },
];

/** Scrolling live price strip shown at the top of every page. */
export function TradingViewTicker({ className }: { className?: string }) {
  return (
    <TradingViewWidget
      widget="ticker-tape"
      className={cn("h-[46px] border-b border-line bg-midnight", className)}
      config={{
        symbols: LIVE_SYMBOLS,
        showSymbolLogo: true,
        isTransparent: true,
        displayMode: "adaptive",
        colorTheme: "dark",
        locale: "en",
      }}
    />
  );
}
