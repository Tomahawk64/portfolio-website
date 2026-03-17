import type { Metadata } from 'next';
import Timeline from '@/components/Timeline';
import resume from '@/data/resume.json';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Work experience of Prince Kushwaha — Full Stack Developer at Reddington Global Consultancy and ML intern at Skolar.',
  openGraph: {
    title: 'Experience — Prince Kushwaha',
    description:
      'Full Stack Developer at Reddington Global Consultancy. Machine Learning intern at Skolar.',
  },
};

export default function ExperiencePage() {
  return (
    <div className="pt-16">
      <section className="py-24" aria-labelledby="experience-title">
        <div className="container-narrow">
          <h1 id="experience-title" className="section-title">
            Experience
          </h1>
          <p className="section-subtitle">
            My professional journey — full-time roles and internships.
          </p>

          <Timeline entries={resume.experience} />
        </div>
      </section>
    </div>
  );
}
