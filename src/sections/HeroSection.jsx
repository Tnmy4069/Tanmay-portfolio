'use client';

import { motion } from 'framer-motion';

export default function HeroSection({ about }) {
    const displayTagline = about?.tagline || 'Project Management • AI & Digital Systems';
    const name = about?.name || 'TANMAY HIRODKAR';
    const subtitle = about?.subtitle || 'Building scalable systems, leading technology programs, and crafting digital experiences that bridge AI, cloud, and human-centered design.';
    const githubLink = about?.github || 'https://github.com/Tnmy4069';
    const linkedinLink = about?.linkedin || 'https://linkedin.com/in/hirodkar';
    const portfolioLink = about?.portfolio || 'https://tnmyh.vercel.app';

    return (
        <section className="hero" id="hero">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <motion.p
                    className="hero-tagline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    {displayTagline}
                </motion.p>

                <h1 className="hero-name">{name}</h1>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    {subtitle}
                </motion.p>

                <motion.div
                    className="hero-links"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <a
                        href="#projects"
                        className="hero-link primary magnetic"
                    >
                        <span>⬡</span> Explore Work
                    </a>
                    <a
                        href={githubLink}
                        className="hero-link secondary magnetic"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>◈</span> GitHub
                    </a>
                    <a
                        href={linkedinLink}
                        className="hero-link secondary magnetic"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>◇</span> LinkedIn
                    </a>
                </motion.div>
            </motion.div>

            <div className="scroll-indicator">
                <span>Scroll Down</span>
                <div className="chevron" />
            </div>
        </section>
    );
}
