'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({
    value = '0',
    duration = 2000,
    className = '',
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        if (!isInView) return;

        // Extract numeric part and prefix/suffix
        const match = value.match(/^([^\d]*)([\d]+)([^\d]*)$/);
        if (!match) {
            setDisplayValue(value);
            return;
        }

        const prefix = match[1];
        const numericTarget = parseInt(match[2], 10);
        const suffix = match[3];

        let startTime = null;
        let animFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * numericTarget);

            setDisplayValue(`${prefix}${current}${suffix}`);

            if (progress < 1) {
                animFrame = requestAnimationFrame(animate);
            }
        };

        animFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animFrame);
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className={className}>
            {displayValue}
        </span>
    );
}
