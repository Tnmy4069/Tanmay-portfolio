'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '../actions';

export default function AdminDashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { href: '/hot-admin/dashboard', label: 'System Profile' },
        { href: '/hot-admin/dashboard/blogs', label: 'Blog Manager' },
    ];

    return (
        <div className="admin-layout">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="admin-sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="admin-sidebar-header">
                    <h2 className="admin-sidebar-title">_HOT ADMIN</h2>
                    <button
                        className="admin-sidebar-close"
                        onClick={() => setSidebarOpen(false)}
                    >
                        ✕
                    </button>
                </div>
                <nav className="admin-sidebar-nav">
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`admin-nav-link ${pathname === item.href ? 'active' : ''}`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="admin-main">
                {/* Top Bar */}
                <header className="admin-topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                            className="admin-hamburger"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span /><span /><span />
                        </button>
                        <span className="admin-topbar-label">Root Terminal_ DASHBOARD</span>
                    </div>
                    <form action={logoutAction}>
                        <button type="submit" className="admin-logout-btn">
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
