'use client';

import { motion } from 'framer-motion';
import FloatingCard from '../components/FloatingCard';

function getAccent(category) {
    const map = {
        frontend: '',
        backend: 'accent-purple',
        data: 'accent-emerald',
        tools: '',
    };
    return map[category?.toLowerCase()] || '';
}

export default function AboutSection({ about, skills, education }) {
    // Optional fallback if DB is empty
    const displayBio = about?.bio || `Project management professional with strong experience in executing technology programs, coordinating multi-stakeholder teams, and delivering digital systems at scale.\n\nProven ability to manage timelines, reporting, and compliance-oriented workflows across education, governance, and AI-enabled platforms. Passionate about responsible AI, Safe & Trust initiatives, and large-scale public technology missions.`;
    const fallbackSkills = {
        frontend: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'JavaScript (ES6+)'],
        backend: ['Node.js', 'Express.js', 'Python'],
        data: ['MySQL', 'PostgreSQL', 'MongoDB'],
        tools: ['Git', 'GitHub', 'Figma']
    };
    const activeSkills = Object.keys(skills || {}).length > 0 ? skills : fallbackSkills;
    const activeEducation = education && education.length > 0 ? education : [
        { degree: 'B.Tech in Computer Science & Design', institution: 'MET\'s Institute of Technology', year: '2026' }
    ];

    return (
        <section className="section" id="about">
            <div className="section-inner">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-label">About</p>
                    <h2 className="section-title">Designing &amp; Building at Scale</h2>
                </motion.div>

                <div className="about-content">
                    <FloatingCard delay={0.1} driftIntensity={0.4} repulsionStrength={40}>
                        <div className="about-text">
                            {displayBio.split('\n').filter(p => p.trim() !== '').map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                            <div style={{ marginTop: '20px' }}>
                                {activeEducation.map((edu, idx) => (
                                    <p key={idx} style={{ color: 'var(--neon-cyan)', opacity: 0.7, fontSize: '0.85rem', marginBottom: '4px' }}>
                                        {edu.degree} — {edu.institution} ({edu.year})
                                    </p>
                                ))}
                            </div>
                        </div>
                    </FloatingCard>

                    <div>
                        {Object.entries(activeSkills).map(([category, items], ci) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + ci * 0.1, duration: 0.6 }}
                                style={{ marginBottom: '20px' }}
                            >
                                <p
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '0.6rem',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        color: 'var(--text-muted)',
                                        marginBottom: '10px',
                                    }}
                                >
                                    {category}
                                </p>
                                <div className="skills-cloud">
                                    {items.map((skill) => (
                                        <span
                                            key={skill}
                                            className={`skill-pill ${getAccent(category)}`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
