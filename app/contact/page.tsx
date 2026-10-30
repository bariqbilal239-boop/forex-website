import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Contact Us" };

const info = [
  ["Email", "hello@aurummarkets.example"],
  ["Hours", "Mon–Fri, 08:00–18:00 GMT"],
  ["Response time", "Within one business day"],
];

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch" text="Questions, editorial submissions, partnerships or advertising — our team usually replies within one business day." />
      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1.5fr_1fr]">
        <ContactForm />
        <aside className="space-y-4">
          {info.map(([k, v]) => (
            <div key={k} className="card p-6">
              <p className="text-sm text-muted">{k}</p>
              <p className="mt-1 font-semibold">{v}</p>
            </div>
          ))}
          <p className="text-sm text-muted">We can't give personal investment advice by email.</p>
        </aside>
      </div>
    </>
  );
}
