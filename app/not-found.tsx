import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-32 text-center">
      <p className="num text-6xl font-extrabold text-gold">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">The page you're looking for doesn't exist or has moved.</p>
      <Link href="/" className="btn-gold mt-8">Back to home</Link>
    </div>
  );
}
