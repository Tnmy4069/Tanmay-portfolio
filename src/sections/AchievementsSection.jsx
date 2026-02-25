'use client';

import { motion } from 'framer-motion';
import FloatingCard from '../components/FloatingCard';

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

export default function AchievementsSection({ achievements, leadership }) {
    const activeAchievements = achievements && achievements.length > 0 ? achievements : defaultAchievements;
    const activeLeadership = leadership && leadership.length > 0 ? leadership : defaultLeadership;

    return (
        <>
            {/* ── Achievements ── */}
            <section className="section" id="achievements">
                <div className="section-inner">
                    <p className="section-label">Impact</p>
                    <h2 className="section-title">Numbers That Matter</h2>

                    <div className="achievement-grid">
                        {activeAchievements.map((ach, i) => (
                            <motion.div
                                key={ach.id || i}
                                className={ach.span ? 'span-2' : ''}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-30px' }}
                                transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className={`glass-card achievement-card ${ach.span ? 'span-2' : ''}`}>
                                    <div className="achievement-number">{ach.number}</div>
                                    <p className="achievement-label">{ach.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Leadership ── */}
            <section className="section" id="leadership">
                <div className="section-inner">
                    <p className="section-label">Leadership</p>
                    <h2 className="section-title">Leading From the Front</h2>

                    <div className="leadership-grid">
                        {activeLeadership.map((lead, i) => (
                            <div className="leadership-card" key={lead.id || i}>
                                <FloatingCard delay={0.15 * i} driftIntensity={0.3} repulsionStrength={40}>
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
                                            <li key={j}>{point}</li>
                                        ))}
                                    </ul>
                                </FloatingCard>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
