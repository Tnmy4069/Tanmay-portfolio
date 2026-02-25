'use client';

import { motion } from 'framer-motion';

export default function ContactSection({ about }) {
    const email = about?.email || 'tnmy.web@gmail.com';
    const phone = about?.phone || '+91 83800 66588';
    const portfolio = about?.portfolio || 'https://tnmyh.vercel.app';
    const github = about?.github || 'https://github.com/Tnmy4069';
    const linkedin = about?.linkedin || 'https://linkedin.com/in/hirodkar';

    return (
        <section className="section contact-section" id="contact">
            <div className="section-inner">
                <motion.div
                    className="glass-card contact-card"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="contact-title">Let's Build Something</h2>
                    <p className="contact-subtitle">
                        Looking for a project manager or developer who can bridge technology
                        and execution? Let's connect.
                    </p>

                    <div className="contact-links">
                        <a
                            href={`mailto:${email}`}
                            className="contact-link magnetic"
                        >
                            <span>✉</span> {email}
                        </a>
                        <a
                            href={`tel:${phone.replace(/\s+/g, '')}`}
                            className="contact-link magnetic"
                        >
                            <span>☎</span> {phone}
                        </a>
                        <a
                            href={portfolio}
                            className="contact-link magnetic"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>◈</span> Portfolio
                        </a>
                        <a
                            href={github}
                            className="contact-link magnetic"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>⬡</span> GitHub
                        </a>
                        <a
                            href={linkedin}
                            className="contact-link magnetic"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>◇</span> LinkedIn
                        </a>
                    </div>
                </motion.div>
            </div>


        </section>
    );
}
