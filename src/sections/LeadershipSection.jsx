'use client';

import { motion } from 'framer-motion';
import TiltCard from '../components/TiltCard';

const defaultLeadership = [
    {
        role: 'President',
        org: 'SACSDE (Students\' Association of CSD Engineering)',
        period: 'Oct 2024 – 2025',
        points: 'Led Aarambh 24, MET\'s first major BTech Fest — 1000+ participants\nLaunched technical bootcamps and coding events with 95% batch participation\nBuilt a custom internal task tracker and scaled student outreach programs'
    },
    {
        role: 'Vice President',
        org: 'E-Cell, MET\'s Institute of Technology',
        period: 'Sept 2023 – 2025',
        points: 'Elevated E-Cell to Advanced Track under IIT-B mentoring\nExecuted 5+ incubation drives and Eureka 2024 event management\nMentored 7+ startups across biotech, agriculture, and ed-tech domains'
    },
];

export default function LeadershipSection({ leadership }) {
    const activeLeadership = leadership && leadership.length > 0 ? leadership : defaultLeadership;

    return (
        <section className="section" id="leadership">
            <div className="section-inner">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="section-label">Leadership</p>
                    <h2 className="section-title">Leading From the Front</h2>
                </motion.div>

                <div className="leadership-grid">
                    {activeLeadership.map((lead, i) => (
                        <motion.div
                            className="leadership-card"
                            key={lead.id || i}
                            initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -2 : 2 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: 0.12 * i,
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <TiltCard
                                delay={0}
                                maxTilt={5}
                                glowColor={i % 2 === 0 ? 'rgba(0, 240, 255, 0.1)' : 'rgba(168, 85, 247, 0.1)'}
                            >
                                <p className="leadership-role">{lead.role}</p>
                                <h3 className="leadership-org">{lead.org}</h3>
                                <p style={{
                                    fontSize: '0.7rem',
                                    fontFamily: 'var(--font-display)',
                                    letterSpacing: '0.1em',
                                    color: 'var(--text-muted)',
                                    marginBottom: '12px',
                                }}>
                                    {lead.period}
                                </p>
                                <ul className="leadership-desc">
                                    {(lead.points ? lead.points.split('\n') : []).map((point, j) => (
                                        <motion.li
                                            key={j}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 + i * 0.1 + j * 0.05, duration: 0.4 }}
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
