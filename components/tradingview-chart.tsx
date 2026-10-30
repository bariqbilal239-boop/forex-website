"use client";

import { useEffect, useRef } from "react";
import { cn } from "./ui";

type Props = {
  symbol?: string;
  interval?: string;
  className?: string;
};

/** Live TradingView Advanced Chart. Loads TradingView's embed script in the browser only. */
export function TradingViewChart({ symbol = "OANDA:XAUUSD", interval = "15", className }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    el.innerHTML = "";

    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    widget.style.height = "100%";
    widget.style.width = "100%";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
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
    });

    el.append(widget, script);
    return () => {
      el.innerHTML = "";
    };
  }, [symbol, interval]);

  // TradingView's script forces `height: 100%` on its container, so the size lives on this outer wrapper.
  return (
    <div className={cn("w-full overflow-hidden rounded-xl bg-midnight", className)}>
      <div ref={container} className="tradingview-widget-container h-full w-full" />
    </div>
  );
}
