'use client';

import { motion } from 'framer-motion';

export default function RevealText({
    text = '',
    className = '',
    delay = 0,
    staggerDelay = 0.04,
}) {
    const words = text.split(' ');

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    const wordVariants = {
        hidden: {
            opacity: 0.05,
            y: 8,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.span
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}
        >
            {words.map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    variants={wordVariants}
                    style={{ display: 'inline-block' }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}
