'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function TiltCard({
    children,
    className = '',
    delay = 0,
    maxTilt = 8,
    glowColor = 'rgba(0, 240, 255, 0.15)',
    style = {},
}) {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setTilt({
            x: (y - 0.5) * -maxTilt * 2,
            y: (x - 0.5) * maxTilt * 2,
        });
        setGlowPos({ x: x * 100, y: y * 100 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`glass-card tilt-card ${className}`}
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                ...style,
            }}
        >
            {/* Dynamic cursor glow */}
            <div
                className="tilt-card-glow"
                style={{
                    background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 60%)`,
                    opacity: isHovered ? 1 : 0,
                }}
            />
            {/* Shimmer border */}
            <div
                className="tilt-card-shimmer"
                style={{
                    background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, var(--neon-cyan), transparent 50%)`,
                    opacity: isHovered ? 0.6 : 0,
                }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
                {children}
            </div>
        </motion.div>
    );
}
