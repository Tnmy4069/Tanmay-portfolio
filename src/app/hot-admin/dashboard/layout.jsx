import Link from 'next/link';
import { logoutAction } from '../actions';

export default function AdminDashboardLayout({ children }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>

            {/* Sidebar */}
            <aside style={{ width: '250px', background: 'var(--bg-surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--neon-cyan)', margin: 0, fontSize: '1.2rem' }}>
                        _HOT ADMIN
                    </h2>
                </div>
                <nav style={{ flex: 1, padding: '20px 0' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <li>
                            <Link href="/hot-admin/dashboard" style={navLinkStyle}>
                                System Profile
                            </Link>
                        </li>
                        <li>
                            <Link href="/hot-admin/dashboard/blogs" style={navLinkStyle}>
                                Blog Manager
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

                {/* Navbar */}
                <header style={{ height: '70px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Root Terminal_ DASHBOARD
                    </div>
                    <form action={logoutAction}>
                        <button type="submit" style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '1px' }}>
                            TERMINATE SESSION
                        </button>
                    </form>
                </header>

                {/* Page Content */}
                <main style={{ flex: 1, overflowY: 'auto' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}

const navLinkStyle = {
    display: 'block',
    padding: '10px 20px',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    borderLeft: '4px solid transparent',
    transition: 'all 0.2s ease',
};

// Add global styles for active or hover effects internally or dynamically
