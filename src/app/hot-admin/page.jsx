'use client';

import { useState } from 'react';
import { loginAction } from './actions';
import { motion } from 'framer-motion';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Convert to FormData to pass to server action
        const formData = new FormData();
        formData.append('password', password);

        const result = await loginAction(formData);
        if (result?.error) {
            setError(result.error);
        }

        setLoading(false);
    }

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary)'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    padding: '40px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-primary)',
                    width: '400px',
                    maxWidth: '90%'
                }}
            >
                <h2 style={{ marginBottom: '5px', color: 'var(--neon-cyan)', fontFamily: 'var(--font-display)' }}>_HOT ADMIN</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '30px' }}>Enter sequence to access database root.</p>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="ACCESS CODE"
                        required
                        style={{
                            padding: '12px',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-mono)',
                            outline: 'none',
                            letterSpacing: '2px'
                        }}
                    />
                    {error && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>[ERROR]: {error}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '12px',
                            marginTop: '10px',
                            background: 'transparent',
                            border: '1px solid var(--neon-cyan)',
                            color: 'var(--neon-cyan)',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            fontFamily: 'var(--font-mono)',
                            textTransform: 'uppercase',
                            opacity: loading ? 0.5 : 1
                        }}
                    >
                        {loading ? 'AUTHENTICATING...' : 'INITIALIZE SEQUENCE'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
