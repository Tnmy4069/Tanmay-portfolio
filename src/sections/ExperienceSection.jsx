import FloatingCard from '../components/FloatingCard';

export default function ExperienceSection({ experiences }) {
    // Fallback if db is empty
    const fallbackExperiences = [
        {
            date: 'NOV 2025 – PRESENT',
            role: 'Project Managing Intern: Web Dev & System Design',
            company: 'VPNSecCon, Mumbai',
            points: [
                'Designing and implementing a full-scale Community Connecting Platform with NextJS, Node JS and Firebase',
                'Enabling dynamic filtering, admin workflows, and connections features',
                'Normalized legacy databases and improved data integrity during large-scale migrations',
                'Mentoring 14+ developers on schema design, UI refactors, and system consistency',
            ],
        }
    ];

    const activeExperiences = experiences && experiences.length > 0
        ? experiences.map(exp => ({
            date: exp.duration,
            role: exp.role,
            company: exp.company,
            points: exp.description ? exp.description.split('\n').filter(p => p.trim() !== '') : []
        }))
        : fallbackExperiences;

    return (
        <section className="section" id="experience">
            <div className="section-inner">
                <p className="section-label">Experience</p>
                <h2 className="section-title">Professional Journey</h2>

                <div className="timeline">
                    {activeExperiences.map((exp, i) => (
                        <div className="timeline-item" key={i}>
                            <FloatingCard
                                delay={0.1 * i}
                                driftIntensity={0.3}
                                repulsionStrength={40}
                            >
                                <p className="timeline-date">{exp.date}</p>
                                <h3 className="timeline-role">{exp.role}</h3>
                                <p className="timeline-company">{exp.company}</p>
                                <ul className="timeline-desc">
                                    {exp.points.map((point, j) => (
                                        <li key={j}>{point}</li>
                                    ))}
                                </ul>
                            </FloatingCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
