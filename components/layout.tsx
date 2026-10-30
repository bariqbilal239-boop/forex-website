"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { tickerItems } from "@/lib/data";
import { cn } from "./ui";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gold", label: "Gold Rates" },
  { href: "/blog", label: "Analysis" },
  { href: "/news", label: "Market News" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight" aria-label="Aurum Markets home">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-gold-light to-gold-dark text-sm text-navy">Au</span>
      <span className="text-lg">
        Aurum<span className="ml-1 text-xs font-semibold uppercase tracking-widest text-muted">Markets</span>
      </span>
    </Link>
  );
}

export function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="overflow-hidden border-b border-line bg-midnight text-xs" aria-label="Sample market ticker">
      <div className="animate-ticker flex w-max gap-8 py-2 pl-4">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-2 whitespace-nowrap">
            <b>{m.symbol}</b>
            <span className="num text-muted">{m.price}</span>
            <span className={cn("num", m.change >= 0 ? "text-green-400" : "text-red-400")}>
              {m.change >= 0 ? "+" : ""}
              {m.change.toFixed(2)}%
            </span>
            {i % tickerItems.length === tickerItems.length - 1 && <span className="text-muted/70">· Illustrative sample data</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-navy/85 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center gap-6">
        <Logo />
        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn("rounded-lg px-3 py-2 text-sm font-medium transition hover:text-ink", isActive(path, l.href) ? "text-gold" : "text-muted")}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/#subscribe" className="btn-gold hidden h-10 sm:inline-flex">
            Get Market Updates
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-navy p-4 lg:hidden" aria-label="Mobile">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn("flex items-center justify-between border-b border-line py-4 text-lg font-semibold", isActive(path, l.href) && "text-gold")}
            >
              {l.label}
              <span className="text-muted">→</span>
            </Link>
          ))}
          <Link href="/#subscribe" className="btn-gold mt-6 w-full">
            Get Market Updates
          </Link>
        </nav>
      )}
    </header>
  );
}

const tabs = [
  { href: "/", label: "Home", icon: "M3 11l9-8 9 8v10H3z" },
  { href: "/gold", label: "Gold", icon: "M4 18h16l-3-8H7zM9 10l1-4h4l1 4" },
  { href: "/blog", label: "Analysis", icon: "M4 19V5M4 19h16M8 15l4-4 3 3 5-6" },
  { href: "/news", label: "News", icon: "M4 5h13v14H4zM17 9h3v10H6M7 9h7M7 13h7" },
  { href: "/contact", label: "Contact", icon: "M3 6h18v12H3zM3 6l9 7 9-7" },
];

export function MobileTabBar() {
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-navy/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden" aria-label="Quick navigation">
      {tabs.map((t) => (
        <Link key={t.href} href={t.href} className={cn("flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium", isActive(path, t.href) ? "text-gold" : "text-muted")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
            <path d={t.icon} />
          </svg>
          {t.label}
        </Link>
      ))}
    </nav>
  );
}

export function NewsletterForm({ compact }: { compact?: boolean }) {
  const [state, setState] = useState<"idle" | "ok" | "error">("idle");
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        setState(ok ? "ok" : "error");
        if (ok) input.value = "";
      }}
    >
      <div className={cn("flex gap-3", compact ? "flex-col" : "flex-col sm:flex-row")}>
        <input name="email" type="email" className={cn("input", state === "error" && "border-bear")} placeholder="Enter your email address" aria-label="Email address" />
        <button className="btn-gold shrink-0">Subscribe</button>
      </div>
      <p role="status" className={cn("mt-3 text-sm", state === "ok" ? "text-green-400" : "text-red-400")}>
        {state === "ok" && "You're subscribed. Check your inbox to confirm."}
        {state === "error" && "Please enter a valid email address."}
      </p>
    </form>
  );
}
