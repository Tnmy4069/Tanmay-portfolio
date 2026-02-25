'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitText from '../components/SplitText';
import DotGrid from '../components/DotGrid';

export default function HeroSection({ about }) {
    const displayTagline = about?.tagline || 'Project Management • AI & Digital Systems';
    const fullName = about?.name || 'TANMAY HIRODKAR';
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const subtitle = about?.subtitle || 'Building scalable systems, leading technology programs, and crafting digital experiences that bridge AI, cloud, and human-centered design.';
    const githubLink = about?.github || 'https://github.com/Tnmy4069';
    const linkedinLink = about?.linkedin || 'https://linkedin.com/in/hirodkar';

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
    const y = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

    return (
        <section className="hero" id="hero" ref={heroRef}>
            <DotGrid
                dotSize={12}
                gap={33}
                baseColor="#271E37"
                activeColor="#5227FF"
                proximity={170}
                shockRadius={50}
                shockStrength={1}
                resistance={300}
                returnDuration={0.1}
            />
            <motion.div
                style={{ opacity, scale, y }}
                className="hero-inner"
            >
                {/* Floating orbs behind text */}
                <div className="hero-orbs">
                    <motion.div
                        className="hero-orb orb-1"
                        animate={{
                            x: [0, 30, -20, 0],
                            y: [0, -25, 15, 0],
                            scale: [1, 1.15, 0.9, 1],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="hero-orb orb-2"
                        animate={{
                            x: [0, -35, 25, 0],
                            y: [0, 20, -30, 0],
                            scale: [1, 0.85, 1.2, 1],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="hero-orb orb-3"
                        animate={{
                            x: [0, 20, -15, 0],
                            y: [0, -15, 25, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                <motion.p
                    className="hero-tagline"
                    initial={{ opacity: 0, y: 20, letterSpacing: '0.2em' }}
                    animate={{ opacity: 0.9, y: 0, letterSpacing: '0.5em' }}
                    transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    {displayTagline}
                </motion.p>

                <h1 className="hero-name">
                    <span className="hero-name-wrapper">
                        <SplitText
                            text={firstName}
                            delay={0.4}
                            staggerDelay={0.04}
                        />
                        <span className="hero-name-space">&nbsp;</span>
                        <SplitText
                            text={lastName}
                            delay={0.4 + firstName.length * 0.04}
                            staggerDelay={0.04}
                        />
                    </span>
                </h1>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    {subtitle}
                </motion.p>

                <motion.div
                    className="hero-links"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <a href="#projects" className="hero-link primary magnetic">
                        <span className="btn-glow" />
                        <span className="btn-content">⬡ Explore Work</span>
                    </a>
                    <a href={githubLink} className="hero-link secondary magnetic" target="_blank" rel="noopener noreferrer">
                        <span className="btn-content">◈ GitHub</span>
                    </a>
                    <a href={linkedinLink} className="hero-link secondary magnetic" target="_blank" rel="noopener noreferrer">
                        <span className="btn-content">◇ LinkedIn</span>
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 2.2, duration: 1 }}
            >
                <span>Scroll Down</span>
                <div className="chevron" />
            </motion.div>
        </section>
    );
}
