'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';

const defaultAchievements = [
    { number: 'AIR 1', label: 'IIT Bombay E-Summit 2025 — National Entrepreneurship Challenge', span: true },
    { number: '2nd', label: 'KIT E-Cell Kolhapur — Western Entrepreneurship Challenge', span: false },
    { number: 'AIR 5', label: 'IIT Bombay E-Summit 2024 — Basic Track', span: false },
    { number: '800+', label: 'Students on BATUExams.in', span: false },
    { number: '1000+', label: 'Participants at Aarambh 24 Fest', span: false },
    { number: '500+', label: 'Scholarship submissions managed', span: false },
    { number: '40+', label: 'Developers mentored', span: false },
    { number: '7+', label: 'Startups mentored in biotech, agri, ed-tech', span: true },
];

export default function ImpactSection({ achievements }) {
    const activeAchievements = achievements && achievements.length > 0 ? achievements : defaultAchievements;

    return (
        <section className="section" id="achievements">
            <div className="section-inner">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="section-label">Impact</p>
                    <h2 className="section-title">Numbers That Matter</h2>
                </motion.div>

                <div className="achievement-grid">
                    {activeAchievements.map((ach, i) => (
                        <motion.div
                            key={ach.id || i}
                            className={ach.span ? 'span-2' : ''}
                            initial={{ opacity: 0, scale: 0.7, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{
                                delay: 0.06 * i,
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <div className={`glass-card achievement-card ${ach.span ? 'span-2' : ''}`}>
                                <div className="achievement-number">
                                    <AnimatedCounter
                                        value={ach.number}
                                        duration={2000 + i * 200}
                                    />
                                </div>
                                <p className="achievement-label">{ach.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
