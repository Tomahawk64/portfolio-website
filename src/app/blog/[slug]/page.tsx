import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const posts: Record<string, {
  title: string;
  date: string;
  tags: string[];
  readTime: string;
  content: string;
}> = {
  'how-i-built-rg-consultancy-website': {
    title: 'How I Built the RG Consultancy Website',
    date: '2025-07-15',
    tags: ['Next.js', 'MongoDB', 'VPS', 'Nginx'],
    readTime: '8 min read',
    content: `
## The Problem

Reddington Global Consultancy needed a modern, fast, and SEO-friendly corporate website that could capture leads and integrate with their CRM system. The previous website was built on a page builder and suffered from poor performance (LCP > 4s, poor mobile experience) and no backend integration.

## Architecture Decisions

### Next.js 14 with App Router

We chose **Next.js 14** with the App Router for several reasons:

- **Static Generation (SSG)** for marketing pages — blazing fast load times
- **Server Components** for data fetching without client-side JavaScript overhead
- **API Routes** for the lead capture backend
- **Built-in Image Optimization** for team photos and service images

### MongoDB Atlas

Lead capture data needed a flexible schema (fields vary by service type) and MongoDB Atlas was the natural fit. We created a \`leads\` collection with compound indexes on \`email\` and \`createdAt\` for fast lookups.

### Hostinger VPS Deployment

The site is served from a Hostinger VPS (2 vCPU, 4GB RAM) with:

- **Nginx** as reverse proxy + SSL termination
- **PM2** for Node.js process management with auto-restart
- **Let's Encrypt** for free SSL certificates

## Key Implementation Details

### Lead Capture Form with Rate Limiting

\`\`\`typescript
// API route with honeypot + rate limiting
export async function POST(req: NextRequest) {
  const { name, email, website } = await req.json();
  
  // Honeypot check
  if (website) return NextResponse.json({ ok: true }); // silent discard
  
  // Rate limit: 5 requests per 15 min per IP
  const { allowed } = await checkRateLimit(req);
  if (!allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  
  // Store to MongoDB
  const { db } = await connectToDatabase();
  await db.collection('leads').insertOne({ name, email, createdAt: new Date() });
  
  return NextResponse.json({ ok: true });
}
\`\`\`

### Performance Results

After launching the new website:

- **Lighthouse Performance**: 94/100 (up from 52)
- **LCP**: 1.2s (down from 4.1s)
- **Lead form conversion rate**: +25% in the first month
- **Organic search impressions**: +60% after 3 months

## Lessons Learned

1. **Static generation is king** for marketing sites — pre-render everything you can
2. **Honeypot fields** are surprisingly effective against simple bots
3. **PM2 cluster mode** doubled throughput on the VPS without any code changes
4. Always set up **Nginx rate limiting at the proxy level** in addition to application-level rate limiting

## What's Next

We're planning to add a multi-language version using Next.js i18n routing to target South Asian markets.

---

_Have questions about the architecture or want to build something similar? [Get in touch](/contact)._
    `.trim(),
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = posts[params.slug];
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: `${post.title} — by Prince Kushwaha`,
    openGraph: {
      title: `${post.title} — Prince Kushwaha`,
      description: `Read about ${post.title} on Prince Kushwaha's blog.`,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];

  if (!post) notFound();

  // Simple Markdown-to-HTML for the stub post (no remark/rehype dependency)
  const htmlContent = post.content
    .replace(/^## (.*)$/gm, '<h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">$1</h2>')
    .replace(/^### (.*)$/gm, '<h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code class="font-mono text-sm bg-gray-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-accent-700 dark:text-accent-300">$1</code>')
    .replace(/```typescript\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-300 rounded-xl p-4 overflow-x-auto text-sm font-mono my-4"><code>$1</code></pre>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-300 rounded-xl p-4 overflow-x-auto text-sm font-mono my-4"><code>$1</code></pre>')
    .replace(/^- (.*)/gm, '<li class="ml-4 list-disc text-gray-600 dark:text-slate-400">$1</li>')
    .replace(/^\d+\. (.*)/gm, '<li class="ml-4 list-decimal text-gray-600 dark:text-slate-400">$1</li>')
    .replace(/<\/li>\n<li/g, '</li><li')
    .replace(/(_.*?_)/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent-600 dark:text-accent-400 hover:underline">$1</a>')
    .replace(/\n\n/g, '</p><p class="text-gray-600 dark:text-slate-400 leading-relaxed my-4">')
    .replace(/^---$/gm, '<hr class="my-8 border-gray-200 dark:border-slate-700" />');

  return (
    <div className="pt-16">
      <article className="py-24" aria-labelledby="post-title">
        <div className="container-narrow max-w-2xl">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 mb-8 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="tag text-xs">{tag}</span>
              ))}
            </div>
            <h1 id="post-title" className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-400">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose-content text-gray-600 dark:text-slate-400 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Written by{' '}
              <Link href="/about" className="text-accent-600 dark:text-accent-400 hover:underline">
                Prince Kushwaha
              </Link>{' '}
              — Full Stack Developer, New Delhi.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
