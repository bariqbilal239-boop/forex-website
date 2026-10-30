"use client";

import { useState } from "react";
import { TradingViewChart } from "./tradingview-chart";

export function GoldChart() {
  return (
    <div className="card p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-1 pb-3">
        <h2 className="font-semibold">XAU/USD live chart</h2>
        <span className="flex items-center gap-2 text-xs text-muted">
          <span className="h-2 w-2 animate-pulse rounded-full bg-bull" />
          Live from TradingView
        </span>
      </div>
      <TradingViewChart symbol="OANDA:XAUUSD" className="h-[420px] sm:h-[520px] lg:h-[600px]" />
      <p className="px-2 pt-3 text-xs text-muted">
        <a href="https://www.tradingview.com/symbols/XAUUSD/?exchange=OANDA" target="_blank" rel="noopener nofollow" className="text-gold hover:underline">XAU/USD chart</a> by TradingView
      </p>
    </div>
  );
}

const units = { oz: 1, g: 1 / 31.1035, tola: 11.6638 / 31.1035, kg: 1000 / 31.1035 };
const karats = { "24K": 1, "22K": 22 / 24, "18K": 18 / 24 };

export function GoldCalculator({ spot, fx, delayed }: { spot: number; fx: Record<string, number>; delayed: boolean }) {
  const [qty, setQty] = useState("1");
  const [unit, setUnit] = useState<keyof typeof units>("tola");
  const [cur, setCur] = useState(fx.PKR ? "PKR" : "USD");
  const [karat, setKarat] = useState<keyof typeof karats>("24K");

  const amount = Number(qty);
  const value = Number.isFinite(amount) && amount > 0 ? spot * units[unit] * (fx[cur] ?? 1) * karats[karat] * amount : 0;

  return (
    <section className="card grid gap-8 p-6 sm:p-8 xl:grid-cols-[1fr_1fr]">
      <div>
        <span className="eyebrow">Gold calculator</span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">Convert gold to your local price</h2>
        <p className="mt-2 text-sm text-muted">{delayed ? "Based on the delayed spot price from our data feed." : "Uses a sample spot price until a market-data key is added — not the live chart price."} Local dealer prices include premiums and taxes.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1.5 block text-muted">Quantity</span>
            <input className="input num" inputMode="decimal" value={qty} onChange={(e) => setQty(e.target.value)} />
          </label>
          <Select label="Unit" value={unit} options={Object.keys(units)} onChange={(v) => setUnit(v as keyof typeof units)} />
          <Select label="Currency" value={cur} options={Object.keys(fx)} onChange={setCur} />
          <Select label="Purity" value={karat} options={Object.keys(karats)} onChange={(v) => setKarat(v as keyof typeof karats)} />
        </div>
      </div>
      <div className="flex flex-col justify-center rounded-2xl border border-gold/30 bg-gradient-to-br from-[#2a2615] to-midnight p-6 sm:p-8">
        <p className="text-sm text-muted">{qty || 0} {unit} of {karat} gold ≈</p>
        <p className="num mt-2 break-all text-4xl font-extrabold text-gold sm:text-5xl">
          {value.toLocaleString("en-US", { maximumFractionDigits: 2 })} <span className="text-2xl">{cur}</span>
        </p>
        <p className="mt-4 text-xs text-muted">{delayed ? "Estimate from delayed data" : "Sample calculation"} — not a quote.</p>
      </div>
    </section>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="text-sm">
      <span className="mb-1.5 block text-muted">{label}</span>
      <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
