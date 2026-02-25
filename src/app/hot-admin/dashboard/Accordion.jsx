'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Accordion({ title, defaultOpen = false, children }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div style={{ background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: '20px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: isOpen ? 'rgba(0, 240, 255, 0.05)' : 'transparent',
                    border: 'none',
                    color: isOpen ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    textAlign: 'left',
                    transition: 'all 0.3s ease'
                }}
            >
                <span>{title}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: 'var(--neon-cyan)', fontSize: '0.9rem' }}
                >
                    ▼
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div style={{ padding: '20px', borderTop: '1px solid var(--border)' }}>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
