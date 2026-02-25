import Link from 'next/link';

export default function BlogLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#050510] text-[#e8e8ef]">
            {/* Minimal Header for Public Blogs */}
            <header style={{
                height: '70px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" style={{
                        fontFamily: 'var(--font-display)',
                        color: 'var(--neon-cyan)',
                        textDecoration: 'none',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        letterSpacing: '2px'
                    }}>
                        ⬡ TANMAY_
                    </Link>
                    <Link href="/" style={{
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        border: '1px solid var(--border-glass)',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        transition: 'all 0.3s ease'
                    }} className="hover:border-[#00f0ff] hover:text-[#00f0ff]">
                        _RETURN_TO_ROOT
                    </Link>
                </div>
            </header>

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
                {children}
            </main>

            <footer style={{
                textAlign: 'center',
                padding: '60px 24px',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.1em'
            }}>
                &copy; {new Date().getFullYear()} TANMAY HIRODKAR // SYSTEM_GEN_4069
            </footer>
        </div>
    );
}
