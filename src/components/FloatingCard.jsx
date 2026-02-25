'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingCard({
    children,
    className = '',
    delay = 0,
    driftIntensity = 1,
    repulsionStrength = 80,
    style = {},
    ...props
}) {
    const cardRef = useRef(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const mousePos = useRef({ x: 0, y: 0 });
    const animId = useRef(null);

    // Random drift parameters
    const driftParams = useRef({
        yAmp: (Math.random() * 8 + 4) * driftIntensity,
        yFreq: Math.random() * 0.0008 + 0.0004,
        xAmp: (Math.random() * 3 + 1) * driftIntensity,
        xFreq: Math.random() * 0.0006 + 0.0003,
        phase: Math.random() * Math.PI * 2,
    });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        const startTime = Date.now();

        const animate = () => {
            const card = cardRef.current;
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = mousePos.current.x - centerX;
            const dy = mousePos.current.y - centerY;
            const dist = Math.hypot(dx, dy);

            // Repulsion
            let repX = 0, repY = 0;
            const repulsionRadius = 300;
            if (dist < repulsionRadius && dist > 0) {
                const force = (1 - dist / repulsionRadius) * repulsionStrength;
                repX = -(dx / dist) * force;
                repY = -(dy / dist) * force;
            }

            // Drift
            const t = Date.now() - startTime;
            const dp = driftParams.current;
            const driftX = Math.sin(t * dp.xFreq + dp.phase) * dp.xAmp;
            const driftY = Math.sin(t * dp.yFreq + dp.phase) * dp.yAmp;

            setOffset({
                x: driftX + repX,
                y: driftY + repY,
            });

            animId.current = requestAnimationFrame(animate);
        };

        animId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animId.current) cancelAnimationFrame(animId.current);
        };
    }, [repulsionStrength]);

    return (
        <motion.div
            ref={cardRef}
            className={`glass-card ${className}`}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                ...style,
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
