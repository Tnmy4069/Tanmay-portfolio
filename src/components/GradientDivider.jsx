'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function GradientDivider({ color1 = 'var(--neon-cyan)', color2 = 'var(--neon-purple)' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-20px' });

    return (
        <div ref={ref} className="gradient-divider-wrapper">
            <motion.div
                className="gradient-divider"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    background: `linear-gradient(90deg, transparent, ${color1}, ${color2}, transparent)`,
                }}
            />
        </div>
    );
}
