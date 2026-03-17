import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Prince Kushwaha — Full Stack Developer',
    template: '%s | Prince Kushwaha',
  },
  description:
    'Full Stack Developer based in New Delhi. Building scalable web applications with Next.js, React, Node.js, and MongoDB.',
  keywords: [
    'Full Stack Developer',
    'Next.js',
    'React',
    'Node.js',
    'MongoDB',
    'TypeScript',
    'New Delhi',
    'Prince Kushwaha',
  ],
  authors: [{ name: 'Prince Kushwaha', url: siteUrl }],
  creator: 'Prince Kushwaha',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Prince Kushwaha Portfolio',
    title: 'Prince Kushwaha — Full Stack Developer',
    description:
      'Full Stack Developer based in New Delhi. Building scalable web applications with Next.js, React, Node.js, and MongoDB.',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Prince Kushwaha - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prince Kushwaha — Full Stack Developer',
    description: 'Full Stack Developer based in New Delhi.',
    images: ['/images/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          {/* Skip to main content */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
