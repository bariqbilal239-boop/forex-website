import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogBrowser } from "@/components/blog-browser";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Market Analysis & Blog" };

export default function BlogPage() {
  return (
    <>
      <PageHeader eyebrow="Research library" title="Market Analysis & Blog" text="Technical and fundamental analysis, trading education and market psychology from our research desk." />
      <Suspense>
        <BlogBrowser />
      </Suspense>
    </>
  );
}
