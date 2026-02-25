'use client';

import FloatingCard from '../components/FloatingCard';

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
    );
}
