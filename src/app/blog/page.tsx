import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles and insights by Prince Kushwaha on full-stack development, web performance, and software engineering.',
  openGraph: {
    title: 'Blog — Prince Kushwaha',
    description: 'Articles and insights on full-stack development and software engineering.',
  },
};

const posts = [
  {
    slug: 'how-i-built-rg-consultancy-website',
    title: 'How I Built the RG Consultancy Website',
    date: '2025-07-15',
    excerpt:
      'A deep dive into building a full-featured corporate website with Next.js, Tailwind CSS, and MongoDB — from architecture decisions to deployment on a VPS.',
    tags: ['Next.js', 'MongoDB', 'VPS', 'Nginx'],
    readTime: '8 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="pt-16">
      <section className="py-24" aria-labelledby="blog-title">
        <div className="container-narrow">
          <h1 id="blog-title" className="section-title">
            Blog
          </h1>
          <p className="section-subtitle">
            Thoughts on web development, architecture, and lessons from production.
          </p>

          {posts.length === 0 ? (
            <div className="text-center py-16 text-gray-500 dark:text-slate-400">
              <p className="text-lg">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="card hover:shadow-md transition-shadow"
                  aria-label={`Blog post: ${post.title}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <time
                      dateTime={post.date}
                      className="text-sm text-gray-500 dark:text-slate-400"
                    >
                      {new Date(post.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="text-xs text-gray-400 dark:text-slate-500">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
