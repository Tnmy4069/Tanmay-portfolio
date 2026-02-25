'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TiltCard from '../components/TiltCard';

export default function ExperienceSection({ experiences }) {
    const timelineRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 80%', 'end 20%'],
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

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
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="section-label">Experience</p>
                    <h2 className="section-title">Professional Journey</h2>
                </motion.div>

                <div className="timeline" ref={timelineRef}>
                    <motion.div
                        className="timeline-line-animated"
                        style={{ height: lineHeight }}
                    />
                    {activeExperiences.map((exp, i) => (
                        <motion.div
                            className="timeline-item"
                            key={i}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: 0.1 + i * 0.15,
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <TiltCard delay={0} maxTilt={4} glowColor="rgba(168, 85, 247, 0.1)">
                                <p className="timeline-date">{exp.date}</p>
                                <h3 className="timeline-role">{exp.role}</h3>
                                <p className="timeline-company">{exp.company}</p>
                                <ul className="timeline-desc">
                                    {exp.points.map((point, j) => (
                                        <motion.li
                                            key={j}
                                            initial={{ opacity: 0, x: -15 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + i * 0.15 + j * 0.06, duration: 0.4 }}
                                        >
                                            {point}
                                        </motion.li>
                                    ))}
                                </ul>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
