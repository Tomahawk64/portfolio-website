import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center" aria-labelledby="not-found-title">
      <div className="text-center px-4">
        <h1
          id="not-found-title"
          className="text-8xl font-extrabold text-accent-600 dark:text-accent-400 mb-4"
          aria-label="404 error"
        >
          404
        </h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
