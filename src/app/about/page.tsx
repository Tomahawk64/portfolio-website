import type { Metadata } from 'next';
import Image from 'next/image';
import resume from '@/data/resume.json';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Prince Kushwaha — Full Stack Developer with B.Tech from IILM, building production web apps at Reddington Global Consultancy.',
  openGraph: {
    title: 'About — Prince Kushwaha',
    description:
      'Full Stack Developer with B.Tech from IILM, building production web apps at Reddington Global Consultancy.',
  },
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="py-24" aria-labelledby="about-title">
        <div className="container-narrow">
          {/* Header */}
          <div className="mb-16">
            <h1 id="about-title" className="section-title">
              About Me
            </h1>
            <p className="section-subtitle">
              A little about my background, education, and what drives me.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Avatar / image */}
            <div className="lg:col-span-1">
              <div className="relative w-56 h-56 mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/30 dark:to-accent-800/30 shadow-lg">
                <Image
                  src="/images/profile.jpg"
                  alt="Prince Kushwaha profile photo"
                  fill
                  className="object-cover"
                  sizes="224px"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-extrabold text-accent-600/30 dark:text-accent-400/30 select-none">PK</span>
                </div>
              </div>

              {/* Contact card */}
              <div className="mt-6 card lg:mx-0">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider">Contact</h3>
                <ul className="space-y-2 text-sm" role="list">
                  <li>
                    <a href={`mailto:${resume.email}`} className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      {resume.email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${resume.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.98 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      {resume.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 dark:text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {resume.location}
                  </li>
                </ul>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {resume.name}
                  <span className="block text-lg font-medium text-accent-600 dark:text-accent-400 mt-1">{resume.title}</span>
                </h2>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">{resume.summary}</p>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Education</h2>
                {resume.education.map((edu, i) => (
                  <div key={i} className="card">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{edu.institution}</h3>
                        <p className="text-accent-600 dark:text-accent-400 text-sm mt-0.5">{edu.degree} — {edu.field}</p>
                        <p className="text-gray-500 dark:text-slate-400 text-sm mt-0.5">{edu.location}</p>
                      </div>
                      <time className="text-sm text-gray-500 dark:text-slate-400 flex-shrink-0">{edu.period}</time>
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              {resume.certifications && resume.certifications.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Certifications</h2>
                  <ul className="space-y-2" role="list">
                    {resume.certifications.map((cert, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-accent-500" aria-hidden="true" />
                        <span className="text-gray-700 dark:text-slate-300 text-sm">
                          <strong>{cert.name}</strong> — {cert.issuer}, {cert.year}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Download CV */}
              <div>
                <a
                  href="/Prince_Kushwaha_CV.pdf"
                  download
                  className="btn-primary inline-flex"
                  aria-label="Download Prince Kushwaha's CV (PDF)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
