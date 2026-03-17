import type { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import projects from '@/data/projects.json';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Portfolio projects by Prince Kushwaha — RG Consultancy Website, RG Care NGO, RG US Debt Website, Lead Management System.',
  openGraph: {
    title: 'Projects — Prince Kushwaha',
    description:
      'Production projects built with Next.js, React, Node.js, and MongoDB Atlas.',
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <section className="py-24" aria-labelledby="projects-title">
        <div className="container-wide">
          <h1 id="projects-title" className="section-title">
            Projects
          </h1>
          <p className="section-subtitle">
            End-to-end production projects — click any card for the full case study.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-accent-50 dark:bg-accent-900/20 border border-accent-100 dark:border-accent-800">
            <p className="text-sm text-accent-700 dark:text-accent-300">
              <strong>Note:</strong> Live and GitHub links are placeholders — update them in{' '}
              <code className="font-mono text-xs bg-accent-100 dark:bg-accent-800 px-1.5 py-0.5 rounded">
                src/data/projects.json
              </code>{' '}
              with your actual project URLs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
