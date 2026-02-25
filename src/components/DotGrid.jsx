'use client';

import { useRef, useEffect, useCallback } from 'react';

export default function DotGrid({
    dotSize = 2.4,
    gap = 33,
    baseColor = '#271E37',
    activeColor = '#5227FF',
    proximity = 170,
    shockRadius = 50,
    shockStrength = 1,
    resistance = 800,
    returnDuration = 0.5,
}) {
    const canvasRef = useRef(null);
    const dotsRef = useRef([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const animRef = useRef(null);
    const dimensionsRef = useRef({ w: 0, h: 0 });

    const initDots = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const w = canvas.width;
        const h = canvas.height;
        dimensionsRef.current = { w, h };

        const dots = [];
        const spacing = dotSize + gap;
        const cols = Math.ceil(w / spacing) + 1;
        const rows = Math.ceil(h / spacing) + 1;
        const offsetX = (w - (cols - 1) * spacing) / 2;
        const offsetY = (h - (rows - 1) * spacing) / 2;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                dots.push({
                    ox: offsetX + c * spacing, // original x
                    oy: offsetY + r * spacing, // original y
                    x: offsetX + c * spacing,
                    y: offsetY + r * spacing,
                    vx: 0,
                    vy: 0,
                    scale: 1,
                    intensity: 0,
                });
            }
        }
        dotsRef.current = dots;
    }, [dotSize, gap]);

    const parseColor = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    };

    const lerpColor = (c1, c2, t) => {
        return {
            r: Math.round(c1.r + (c2.r - c1.r) * t),
            g: Math.round(c1.g + (c2.g - c1.g) * t),
            b: Math.round(c1.b + (c2.b - c1.b) * t),
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const base = parseColor(baseColor);
        const active = parseColor(activeColor);

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const dpr = window.devicePixelRatio || 1;
            const rect = parent.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.scale(dpr, dpr);
            dimensionsRef.current = { w: rect.width, h: rect.height };
            initDots();
        };

        resize();
        window.addEventListener('resize', resize);

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 };
        };

        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            // Apply shock wave
            dotsRef.current.forEach((dot) => {
                const dx = dot.ox - clickX;
                const dy = dot.oy - clickY;
                const dist = Math.hypot(dx, dy);

                if (dist < shockRadius * 3) {
                    const force = Math.max(0, 1 - dist / (shockRadius * 3)) * shockStrength * 15;
                    const angle = Math.atan2(dy, dx);
                    dot.vx += Math.cos(angle) * force;
                    dot.vy += Math.sin(angle) * force;
                }
            });
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('click', handleClick);

        const animate = () => {
            const { w, h } = dimensionsRef.current;
            ctx.clearRect(0, 0, w, h);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const dt = 1 / 60; // ~60fps timestep
            const springK = 1 / returnDuration * 4; // spring constant
            const damping = 0.85;

            dotsRef.current.forEach((dot) => {
                const dx = mx - dot.ox;
                const dy = my - dot.oy;
                const dist = Math.hypot(dx, dy);

                // Mouse proximity — push dots away
                if (dist < proximity && dist > 0) {
                    const force = (1 - dist / proximity) * (resistance / 100);
                    const angle = Math.atan2(dy, dx);
                    dot.vx -= Math.cos(angle) * force * 0.3;
                    dot.vy -= Math.sin(angle) * force * 0.3;
                    dot.intensity = Math.min(1, dot.intensity + (1 - dist / proximity) * 0.15);
                } else {
                    dot.intensity *= 0.95;
                }

                // Spring back to original position
                const restoreX = (dot.ox - dot.x) * springK * dt;
                const restoreY = (dot.oy - dot.y) * springK * dt;
                dot.vx = (dot.vx + restoreX) * damping;
                dot.vy = (dot.vy + restoreY) * damping;

                dot.x += dot.vx;
                dot.y += dot.vy;

                // Scale based on proximity
                const targetScale = dist < proximity ? 1 + (1 - dist / proximity) * 1.5 : 1;
                dot.scale += (targetScale - dot.scale) * 0.1;

                // Draw the dot
                const color = lerpColor(base, active, dot.intensity);
                const radius = (dotSize / 2) * dot.scale;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
                ctx.fill();

                // Glow for active dots
                if (dot.intensity > 0.3) {
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, radius * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${active.r}, ${active.g}, ${active.b}, ${dot.intensity * 0.15})`;
                    ctx.fill();
                }
            });

            animRef.current = requestAnimationFrame(animate);
        };

        animRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('click', handleClick);
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [dotSize, gap, baseColor, activeColor, proximity, shockRadius, shockStrength, resistance, returnDuration, initDots]);

    return (
        <canvas
            ref={canvasRef}
            className="dot-grid-canvas"
        />
    );
}
