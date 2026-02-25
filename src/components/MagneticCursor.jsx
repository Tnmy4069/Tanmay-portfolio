'use client';

import { useEffect, useRef } from 'react';

export default function MagneticCursor() {
    const cursorRef = useRef(null);
    const dotRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });
    const isHovering = useRef(false);

    useEffect(() => {
        // Hide on touch devices
        if ('ontouchstart' in window) return;

        const cursor = cursorRef.current;
        const dot = dotRef.current;
        if (!cursor || !dot) return;

        const onMouseMove = (e) => {
            target.current = { x: e.clientX, y: e.clientY };

            // Check for magnetic elements
            const magneticEls = document.querySelectorAll(
                'a, button, .hero-link, .contact-link, .project-link, .magnetic'
            );

            let isMagnetic = false;
            magneticEls.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
                const threshold = Math.max(rect.width, rect.height) * 0.8;

                if (dist < threshold) {
                    isMagnetic = true;
                    // Magnetic pull toward center
                    const pullStrength = 0.3;
                    target.current = {
                        x: e.clientX + (centerX - e.clientX) * pullStrength,
                        y: e.clientY + (centerY - e.clientY) * pullStrength,
                    };
                }
            });

            isHovering.current = isMagnetic;
        };

        const animate = () => {
            const lerp = 0.12;
            pos.current.x += (target.current.x - pos.current.x) * lerp;
            pos.current.y += (target.current.y - pos.current.y) * lerp;

            cursor.style.left = `${pos.current.x}px`;
            cursor.style.top = `${pos.current.y}px`;
            dot.style.left = `${target.current.x}px`;
            dot.style.top = `${target.current.y}px`;

            if (isHovering.current) {
                cursor.classList.add('hovering');
            } else {
                cursor.classList.remove('hovering');
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove);
        const raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor" />
            <div ref={dotRef} className="cursor-dot" />
        </>
    );
}
