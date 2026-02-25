'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ReadingProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            style={{
                scaleX,
                position: 'absolute',
                bottom: '-1px',
                left: 0,
                right: 0,
                height: '2px',
                background: 'var(--neon-cyan)',
                originX: 0,
                boxShadow: '0 0 8px var(--neon-cyan), 0 0 15px var(--neon-cyan)',
                zIndex: 101
            }}
        />
    );
}
