'use client';

import { motion } from 'framer-motion';
import TiltCard from '../components/TiltCard';
import RevealText from '../components/RevealText';

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

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.06, delayChildren: 0.1 },
        },
    };

    const skillPillVariant = {
        hidden: { opacity: 0, scale: 0.6, y: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 200, damping: 15 },
        },
    };

    return (
        <section className="section" id="about">
            <div className="section-inner">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="section-label">About</p>
                    <h2 className="section-title">Designing &amp; Building at Scale</h2>
                </motion.div>

                <div className="about-content">
                    <TiltCard delay={0.1} glowColor="rgba(0, 240, 255, 0.12)">
                        <div className="about-text">
                            {displayBio.split('\n').filter(p => p.trim() !== '').map((paragraph, idx) => (
                                <RevealText
                                    key={idx}
                                    text={paragraph}
                                    className="about-paragraph"
                                    delay={0.1 * idx}
                                    staggerDelay={0.02}
                                />
                            ))}
                            <div style={{ marginTop: '20px' }}>
                                {activeEducation.map((edu, idx) => (
                                    <motion.p
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 0.7, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                                        style={{ color: 'var(--neon-cyan)', fontSize: '0.85rem', marginBottom: '4px' }}
                                    >
                                        {edu.degree} — {edu.institution} ({edu.year})
                                    </motion.p>
                                ))}
                            </div>
                        </div>
                    </TiltCard>

                    <div>
                        {Object.entries(activeSkills).map(([category, items], ci) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 + ci * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                                <motion.div
                                    className="skills-cloud"
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    {items.map((skill) => (
                                        <motion.span
                                            key={skill}
                                            className={`skill-pill ${getAccent(category)}`}
                                            variants={skillPillVariant}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
