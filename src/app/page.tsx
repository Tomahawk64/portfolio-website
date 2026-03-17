import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import projects from '@/data/projects.json';

export const metadata: Metadata = {
  title: 'Prince Kushwaha — Full Stack Developer',
  description:
    'Full Stack Developer based in New Delhi. Building scalable web applications with Next.js, React, Node.js, and MongoDB.',
};

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <HeroSection />

      {/* Featured Projects preview */}
      <section className="py-24 bg-gray-50 dark:bg-slate-800/50" aria-labelledby="featured-projects-title">
        <div className="container-wide">
          <h2 id="featured-projects-title" className="section-title">
            Featured Projects
          </h2>
          <p className="section-subtitle text-gray-600 dark:text-slate-400">
            A selection of production projects built end-to-end.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/projects" className="btn-secondary">
              View All Projects
            </a>
          </div>
        </div>
      </section>

      {/* Skills preview */}
      <section className="py-24" aria-labelledby="skills-preview-title">
        <div className="container-wide">
          <h2 id="skills-preview-title" className="section-title">
            What I Work With
          </h2>
          <p className="section-subtitle text-gray-600 dark:text-slate-400">
            Technologies and tools I use to build products.
          </p>
          <div className="flex flex-wrap gap-3">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Python', 'FastAPI',
              'MongoDB Atlas', 'MySQL', 'AWS EC2', 'AWS S3', 'Nginx', 'PM2', 'Tailwind CSS',
              'Git', 'GitHub'].map((skill) => (
              <span key={skill} className="tag text-sm">
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <a href="/skills" className="btn-ghost text-accent-600 dark:text-accent-400 pl-0">
              View full skill set →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
