/** Browser-side POST to the Node.js backend through the /api/backend proxy. */
export async function postToBackend(path: "messages" | "subscribers", data: Record<string, string>) {
  const res = await fetch(`/api/backend/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Something went wrong. Please try again.");
  }
}
