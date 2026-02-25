'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlog } from '../../blogActions';
import Link from 'next/link';

export default function NewBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.target);
        const result = await createBlog(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else {
            router.push('/hot-admin/dashboard/blogs');
        }
    }

    return (
        <div style={{ padding: '40px', maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <Link href="/hot-admin/dashboard/blogs" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '1.2rem' }}>←</Link>
                <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--neon-cyan)', margin: 0 }}>CREATE_BLOG</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--bg-surface)', padding: '30px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                {error && <div style={{ color: '#ef4444', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '4px' }}>[ERROR] {error}</div>}

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>TITLE</span>
                    <input name="title" required style={inputStyle} placeholder="Post Title" />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>SLUG (URL path)</span>
                    <input name="slug" required style={inputStyle} placeholder="my-awesome-post" />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>FEATURED IMAGE URL (16:9 recommended)</span>
                    <input name="imageUrl" style={inputStyle} placeholder="https://example.com/image.jpg" />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>CONTENT (Markdown/HTML supported)</span>
                    <textarea name="content" required style={{ ...inputStyle, minHeight: '300px', resize: 'vertical' }} placeholder="Write your content here..." />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" name="published" style={{ width: '18px', height: '18px', accentColor: 'var(--neon-cyan)' }} />
                    <span style={{ color: 'var(--text-primary)' }}>PUBLISH IMMEDIATELY</span>
                </label>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" disabled={loading} style={{ padding: '12px 30px', background: 'var(--neon-cyan)', color: 'black', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-mono)', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'WRITING TO DB...' : 'SAVE TO DB'}
                    </button>
                </div>
            </form>
        </div>
    );
}

const inputStyle = {
    padding: '12px',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
};
