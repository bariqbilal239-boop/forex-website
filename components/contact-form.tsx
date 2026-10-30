"use client";

import { useState } from "react";
import { postToBackend } from "@/lib/submit";
import { cn } from "./ui";

type Field = "name" | "email" | "category" | "subject" | "message";

const rules: Record<Field, [(v: string) => boolean, string]> = {
  name: [(v) => v.trim().length > 0, "Please enter your name."],
  email: [(v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Please enter a valid email."],
  category: [(v) => v.length > 0, "Please choose a category."],
  subject: [(v) => v.trim().length > 0, "Please add a subject."],
  message: [(v) => v.trim().length >= 20, "Message must be at least 20 characters."],
};

const categories = ["General question", "Editorial submission", "Partnership", "Advertising", "Technical support"];

export function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<Field, string>;
    const next: Partial<Record<Field, string>> = {};
    (Object.keys(rules) as Field[]).forEach((f) => {
      if (!rules[f][0](data[f] ?? "")) next[f] = rules[f][1];
    });
    setErrors(next);
    setSent(false);
    if (Object.keys(next).length) return;
    setSending(true);
    setFailure("");
    try {
      await postToBackend("messages", data);
      setSent(true);
      form.reset();
    } catch (err) {
      setFailure((err as Error).message);
    } finally {
      setSending(false);
    }
  }

  const field = (name: Field, label: string, input: React.ReactNode) => (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium">{label} *</span>
      {input}
      {errors[name] && <span className="mt-1.5 block text-xs text-red-400">{errors[name]}</span>}
    </label>
  );
  const cls = (name: Field) => cn("input", errors[name] && "border-bear");

  return (
    <form noValidate onSubmit={submit} className="card space-y-5 p-6 sm:p-8">
      {sent && <p role="status" className="rounded-xl border border-bull/40 bg-bull/10 p-4 text-sm text-green-300">Thanks — your message has been sent. We'll reply within one business day.</p>}
      {failure && <p role="alert" className="rounded-xl border border-bear/40 bg-bear/10 p-4 text-sm text-red-300">{failure}</p>}
      {Object.keys(errors).length > 0 && <p role="alert" className="rounded-xl border border-bear/40 bg-bear/10 p-4 text-sm text-red-300">Please fix the highlighted fields.</p>}
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Full name", <input name="name" className={cls("name")} placeholder="Jane Doe" autoComplete="name" />)}
        {field("email", "Email", <input name="email" type="email" className={cls("email")} placeholder="you@example.com" autoComplete="email" />)}
      </div>
      {field(
        "category",
        "Inquiry category",
        <select name="category" className={cls("category")} defaultValue="">
          <option value="" disabled>Select a category</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      )}
      {field("subject", "Subject", <input name="subject" className={cls("subject")} placeholder="How can we help?" />)}
      {field("message", "Message", <textarea name="message" rows={6} className={cn(cls("message"), "h-auto py-3")} placeholder="Tell us more…" />)}
      <button disabled={sending} className="btn-gold w-full sm:w-auto">{sending ? "Sending…" : "Send message"}</button>
    </form>
  );
}
