import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogBrowser } from "@/components/blog-browser";
import { PageHeader } from "@/components/ui";
import { getPosts } from "@/lib/api";

export const metadata: Metadata = { title: "Market Analysis & Blog" };

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHeader eyebrow="Research library" title="Market Analysis & Blog" text="Technical and fundamental analysis, trading education and market psychology from our research desk." />
      <Suspense>
        <BlogBrowser posts={posts} />
      </Suspense>
    </>
  );
}
