import type { Metadata } from 'next';
import resume from '@/data/resume.json';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Technical skills of Prince Kushwaha — React, Next.js, Node.js, MongoDB, AWS, Nginx and more.',
  openGraph: {
    title: 'Skills — Prince Kushwaha',
    description:
      'Frontend, backend, database, DevOps and tooling skills of Prince Kushwaha.',
  },
};

const skillGroups = [
  {
    title: 'Frontend',
    icon: '🎨',
    color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800',
    titleColor: 'text-blue-700 dark:text-blue-300',
    skills: resume.skills.frontend,
  },
  {
    title: 'Backend',
    icon: '⚙️',
    color: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800',
    titleColor: 'text-green-700 dark:text-green-300',
    skills: resume.skills.backend,
  },
  {
    title: 'Database',
    icon: '🗄️',
    color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800',
    titleColor: 'text-purple-700 dark:text-purple-300',
    skills: resume.skills.database,
  },
  {
    title: 'DevOps & Cloud',
    icon: '☁️',
    color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800',
    titleColor: 'text-orange-700 dark:text-orange-300',
    skills: resume.skills.devops,
  },
  {
    title: 'Tools',
    icon: '🔧',
    color: 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700',
    titleColor: 'text-slate-700 dark:text-slate-300',
    skills: resume.skills.tools,
  },
];

export default function SkillsPage() {
  return (
    <div className="pt-16">
      <section className="py-24" aria-labelledby="skills-title">
        <div className="container-wide">
          <h1 id="skills-title" className="section-title">
            Skills
          </h1>
          <p className="section-subtitle">
            Technologies and tools I use to design, build, and ship products.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <article
                key={group.title}
                className={`rounded-2xl border p-6 ${group.color}`}
                aria-label={`${group.title} skills`}
              >
                <h2 className={`font-bold text-lg mb-4 flex items-center gap-2 ${group.titleColor}`}>
                  <span role="img" aria-label={group.title}>{group.icon}</span>
                  {group.title}
                </h2>
                <ul className="flex flex-wrap gap-2" role="list">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-sm font-medium shadow-sm border border-gray-100 dark:border-slate-700"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
