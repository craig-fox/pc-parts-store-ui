import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4">Sorry, we couldn't find that page.</p>

      <Link
        to="/"
        className="mt-6 inline-block rounded bg-blue-600 px-4 py-2 text-white"
      >
        Return Home
      </Link>
    </div>
  );
}
