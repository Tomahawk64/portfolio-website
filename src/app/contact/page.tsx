import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Prince Kushwaha for project collaborations, freelance work, or full-time opportunities.',
  openGraph: {
    title: 'Contact — Prince Kushwaha',
    description:
      'Reach out for project collaborations, freelance work, or full-time opportunities.',
  },
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <section className="py-24" aria-labelledby="contact-title">
        <div className="container-narrow">
          <h1 id="contact-title" className="section-title">
            Contact
          </h1>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? Feel free to reach out.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <aside className="lg:col-span-2 space-y-6" aria-label="Contact information">
              <div className="card">
                <h2 className="font-semibold text-gray-900 dark:text-white mb-5">
                  Let&apos;s Work Together
                </h2>
                <ul className="space-y-4 text-sm" role="list">
                  <li>
                    <a
                      href="mailto:princekkushwaha@outlook.com"
                      className="flex items-start gap-3 text-gray-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                    >
                      <span className="mt-0.5 p-2 rounded-lg bg-accent-50 dark:bg-accent-900/30">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-600 dark:text-accent-400" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </span>
                      <span>
                        <strong className="block text-gray-900 dark:text-white">Email</strong>
                        princekkushwaha@outlook.com
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+919999631770"
                      className="flex items-start gap-3 text-gray-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                    >
                      <span className="mt-0.5 p-2 rounded-lg bg-accent-50 dark:bg-accent-900/30">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-600 dark:text-accent-400" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.98 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      </span>
                      <span>
                        <strong className="block text-gray-900 dark:text-white">Phone</strong>
                        +91-9999631770
                      </span>
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 dark:text-slate-400">
                    <span className="mt-0.5 p-2 rounded-lg bg-accent-50 dark:bg-accent-900/30">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-600 dark:text-accent-400" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                    <span>
                      <strong className="block text-gray-900 dark:text-white">Location</strong>
                      New Delhi, India
                    </span>
                  </li>
                </ul>
              </div>

              {/* Social links */}
              <div className="card">
                <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h2>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/prince-kushwaha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
                    aria-label="GitHub (opens in new tab)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/prince-kushwaha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium"
                    aria-label="LinkedIn (opens in new tab)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* CV download */}
              <div className="card bg-accent-50 dark:bg-accent-900/20 border-accent-100 dark:border-accent-800">
                <h2 className="font-semibold text-accent-700 dark:text-accent-300 mb-2">Download CV</h2>
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
                  Download my resume for a complete overview of my experience and skills.
                </p>
                <a
                  href="/Prince_Kushwaha_CV.pdf"
                  download
                  className="btn-primary text-sm py-2"
                  aria-label="Download CV PDF"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download CV
                </a>
              </div>
            </aside>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
