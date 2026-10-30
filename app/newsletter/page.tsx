import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/layout";

export const metadata: Metadata = { title: "Newsletter", robots: { index: false } };

// The backend redirects here after confirm / unsubscribe links in emails.
const states = {
  confirmed: { icon: "✓", title: "You're subscribed", text: "Your email is confirmed. The Daily Gold Brief arrives every trading morning — a welcome email is on its way." },
  unsubscribed: { icon: "👋", title: "You've been unsubscribed", text: "You won't receive any more newsletter emails from us. Changed your mind? You can subscribe again below." },
  invalid: { icon: "!", title: "This link has expired", text: "The confirmation link is invalid or was already used. Enter your email below to get a new one." },
} as const;

type Props = { searchParams: Promise<{ status?: string }> };

export default async function NewsletterPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const state = states[status as keyof typeof states];

  return (
    <div className="container-x flex min-h-[60vh] items-center justify-center py-20">
      <div className="card w-full max-w-lg p-8 text-center sm:p-10">
        {state ? (
          <>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-2xl text-gold">{state.icon}</span>
            <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">{state.title}</h1>
            <p className="mt-3 text-muted">{state.text}</p>
          </>
        ) : (
          <>
            <span className="eyebrow">The Daily Gold Brief</span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Levels and catalysts, every trading morning</h1>
          </>
        )}
        {status !== "confirmed" && (
          <div className="mt-8 text-left">
            <NewsletterForm />
          </div>
        )}
        <Link href="/blog" className="btn-ghost mt-6">Read the latest analysis</Link>
      </div>
    </div>
  );
}
