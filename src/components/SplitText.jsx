'use client';

import { motion } from 'framer-motion';

export default function SplitText({
    text = '',
    className = '',
    delay = 0,
    staggerDelay = 0.035,
}) {
    const chars = text.split('');

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    const charVariants = {
        hidden: {
            opacity: 0,
            y: 40,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                damping: 20,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.span
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            aria-label={text}
            style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
            {chars.map((char, i) => (
                <motion.span
                    key={`${char}-${i}`}
                    variants={charVariants}
                    style={{
                        display: 'inline-block',
                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.span>
    );
}
