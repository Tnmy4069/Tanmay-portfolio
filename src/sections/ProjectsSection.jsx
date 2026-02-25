import FloatingCard from '../components/FloatingCard';

const defaultProjects = [
    {
        title: 'HKLearning Platform',
        desc: 'Custom LMS and fund tracking system with dashboards, analytics, automated receipt generation, and course progress tracking for 200+ learners.',
        tags: 'React:, Tailwind:purple, MySQL:emerald',
        link: 'https://vighnahartas.com',
        linkLabel: 'vighnahartas.com',
        span: true,
    },
    {
        title: 'AI Financial Health App',
        desc: 'Web-based financial analytics dashboard to visualize personal/business financial health with real-time data loading and metric visualization.',
        tags: 'Next.js:, AI:purple, Vercel:emerald',
        link: 'https://sunhack-three.vercel.app',
        linkLabel: 'Hackathon Finalist',
        span: false,
    }
];

export default function ProjectsSection({ projects }) {
    const activeProjects = projects && projects.length > 0 ? projects : defaultProjects;

    const parseTags = (tagString) => {
        if (!tagString) return [];
        return tagString.split(',').map(t => {
            const parts = t.split(':');
            return {
                label: parts[0] ? parts[0].trim() : '',
                color: parts[1] ? parts[1].trim() : ''
            };
        });
    };

    return (
        <section className="section" id="projects">
            <div className="section-inner">
                <p className="section-label">Projects</p>
                <h2 className="section-title">Systems I've Built</h2>

                <div className="bento-grid">
                    {activeProjects.map((project, i) => (
                        <div
                            key={project.id || project.title}
                            className={`bento-item ${project.span ? 'span-2' : ''}`}
                        >
                            <FloatingCard
                                delay={0.05 * i}
                                driftIntensity={0.5}
                                repulsionStrength={60}
                            >
                                <div style={{ marginBottom: '12px' }}>
                                    {parseTags(project.tags).map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className={`project-tag ${tag.color}`}
                                        >
                                            {tag.label}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.desc}</p>
                                <a
                                    href={project.link}
                                    className="project-link magnetic"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {project.linkLabel} <span>→</span>
                                </a>
                            </FloatingCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
