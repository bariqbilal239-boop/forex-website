import type { Metadata } from "next";
import { Avatar, PageHeader } from "@/components/ui";
import { authors, type AuthorId } from "@/lib/data";

export const metadata: Metadata = { title: "About Us" };

const values = [
  ["Independent", "No broker ownership. Our research isn't written to sell you a trade."],
  ["Transparent", "Every piece is labelled as verified reporting, analysis or education."],
  ["Practical", "Clear levels, scenarios and risks — not vague predictions."],
];

const standards = [
  "Reporting is sourced and labelled “Verified report”; opinion is labelled “Analysis”.",
  "Sample or delayed data is always marked — we never present it as live.",
  "Analysts disclose any personal positions in instruments they cover.",
  "Corrections are made openly and noted at the top of the article.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About Aurum Markets" title="Clear, independent analysis for people who take markets seriously." text="We help traders and investors understand gold, currencies and crypto — with research that explains the why, not just the what." />
      <div className="container-x space-y-20 py-16">
        <section className="grid gap-6 md:grid-cols-3">
          {values.map(([t, d], i) => (
            <div key={t} className="card p-7">
              <span className="num text-sm text-gold">0{i + 1}</span>
              <h2 className="mt-3 text-xl font-bold">{t}</h2>
              <p className="mt-2 text-muted">{d}</p>
            </div>
          ))}
        </section>

        <section>
          <span className="eyebrow">Our team</span>
          <h2 className="mt-3 mb-8 text-3xl font-bold tracking-tight">The research desk</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {(Object.keys(authors) as AuthorId[]).map((id) => (
              <div key={id} className="card flex items-center gap-4 p-5 lg:flex-col lg:text-center">
                <Avatar id={id} size="lg" />
                <div>
                  <b>{authors[id].name}</b>
                  <p className="text-sm text-muted">{authors[id].role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="standards" className="card grid scroll-mt-24 gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="eyebrow">Editorial standards</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">How we keep our research honest</h2>
          </div>
          <ul className="space-y-4">
            {standards.map((s) => (
              <li key={s} className="flex gap-3 text-muted">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-xs text-gold">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
