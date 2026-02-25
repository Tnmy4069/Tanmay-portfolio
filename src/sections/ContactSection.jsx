'use client';

import { motion } from 'framer-motion';

export default function ContactSection({ about }) {
    const email = about?.email || 'tnmy.web@gmail.com';
    const phone = about?.phone || '+91 83800 66588';
    const portfolio = about?.portfolio || 'https://tnmyh.vercel.app';
    const github = about?.github || 'https://github.com/Tnmy4069';
    const linkedin = about?.linkedin || 'https://linkedin.com/in/hirodkar';

    const contactLinks = [
        { href: `mailto:${email}`, icon: '✉', label: email },
        { href: `tel:${phone.replace(/\s+/g, '')}`, icon: '☎', label: phone },
        { href: portfolio, icon: '◈', label: 'Portfolio', external: true },
        { href: github, icon: '⬡', label: 'GitHub', external: true },
        { href: linkedin, icon: '◇', label: 'LinkedIn', external: true },
    ];

    return (
        <section className="section contact-section" id="contact">
            <div className="section-inner">
                <motion.div
                    className="glass-card contact-card"
                    initial={{ opacity: 0, y: 60, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="contact-card-glow" />

                    <motion.h2
                        className="contact-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Let&apos;s Build Something
                    </motion.h2>
                    <motion.p
                        className="contact-subtitle"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35, duration: 0.6 }}
                    >
                        Looking for a project manager or developer who can bridge technology
                        and execution? Let&apos;s connect.
                    </motion.p>

                    <div className="contact-links">
                        {contactLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                className="contact-link magnetic"
                                target={link.external ? '_blank' : undefined}
                                rel={link.external ? 'noopener noreferrer' : undefined}
                                initial={{ opacity: 0, y: 20, scale: 0.85 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: 0.4 + i * 0.07,
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    y: -3,
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <span>{link.icon}</span> {link.label}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
