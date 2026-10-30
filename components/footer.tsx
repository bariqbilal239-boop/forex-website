import Link from "next/link";
import { getSite } from "@/lib/api";
import { Logo } from "./layout";

const columns = [
  { title: "Markets", links: [["Gold Rates", "/gold"], ["Bitcoin & Crypto", "/blog?category=Bitcoin%20%26%20Crypto"], ["Forex", "/blog?category=Forex%20Trading"], ["Economic Calendar", "/news#calendar"]] },
  { title: "Research", links: [["Market Analysis", "/blog"], ["Trading Education", "/blog?category=Trading%20Education"], ["Market News", "/news"]] },
  { title: "Company", links: [["About Us", "/about"], ["Editorial Standards", "/about#standards"], ["Contact", "/contact"]] },
];

const DEFAULT_DISCLAIMER =
  "Trading foreign exchange, gold, cryptocurrencies and other leveraged products carries a high level of risk and may not be suitable for all investors. You could lose some or all of your capital. Content on this website is for educational and informational purposes only and is not investment advice.";

export async function Footer() {
  const site = await getSite();
  return (
    <footer className="mt-24 border-t border-line bg-midnight pb-24 md:pb-0">
      <div className="container-x py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">Independent research on gold, Forex, Bitcoin and global markets.</p>
            <div className="mt-5 flex gap-2">
              {["X", "in", "▶", "✈"].map((s) => (
                <span key={s} className="grid h-9 w-9 place-items-center rounded-lg border border-line text-sm text-muted">{s}</span>
              ))}
            </div>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-semibold">{c.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-gold">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 rounded-xl border border-line p-5 text-xs leading-relaxed text-muted">
          <b className="text-ink">Risk disclaimer:</b> {site.disclaimer || DEFAULT_DISCLAIMER} Prices shown are illustrative samples, not live quotes.
        </p>
        <div className="mt-8 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:justify-between">
          <span>© 2026 Aurum Markets. All rights reserved.</span>
          <span>Privacy · Terms · Cookies · Disclosures</span>
        </div>
      </div>
    </footer>
  );
}
