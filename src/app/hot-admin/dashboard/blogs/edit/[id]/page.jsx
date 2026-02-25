'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBlogById, updateBlog } from '../../../blogActions';
import Link from 'next/link';

// Use React.use hook workaround for Next.js 15 route params if necessary, but we'll try standard params first.
// If error occurs, we handle it natively.
import { use } from 'react';

export default function EditBlogPage({ params }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        async function fetchBlog() {
            setFetching(true);
            const data = await getBlogById(id);
            if (data) {
                setBlog(data);
            } else {
                setError("Blog not found.");
            }
            setFetching(false);
        }
        fetchBlog();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.target);
        const result = await updateBlog(id, formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else {
            router.push('/hot-admin/dashboard/blogs');
        }
    }

    if (fetching) {
        return <div style={{ padding: '40px', color: 'var(--text-muted)' }}>LOADING RECORD...</div>;
    }

    if (!blog) {
        return <div style={{ padding: '40px', color: '#ef4444' }}>[ERROR] Record not found.</div>;
    }

    return (
        <div style={{ padding: '40px', maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <Link href="/hot-admin/dashboard/blogs" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '1.2rem' }}>←</Link>
                <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--neon-purple)', margin: 0 }}>EDIT_BLOG</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--bg-surface)', padding: '30px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                {error && <div style={{ color: '#ef4444', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '4px' }}>[ERROR] {error}</div>}

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>TITLE</span>
                    <input name="title" defaultValue={blog.title} required style={inputStyle} />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>SLUG (URL path)</span>
                    <input name="slug" defaultValue={blog.slug} required style={inputStyle} />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>FEATURED IMAGE URL</span>
                    <input name="imageUrl" defaultValue={blog.imageUrl} style={inputStyle} placeholder="https://example.com/image.jpg" />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>CONTENT (Markdown/HTML supported)</span>
                    <textarea name="content" defaultValue={blog.content} required style={{ ...inputStyle, minHeight: '300px', resize: 'vertical' }} />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" name="published" defaultChecked={blog.published} style={{ width: '18px', height: '18px', accentColor: 'var(--neon-purple)' }} />
                    <span style={{ color: 'var(--text-primary)' }}>PUBLISHED</span>
                </label>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        ID: {blog.id}
                    </div>
                    <button type="submit" disabled={loading} style={{ padding: '12px 30px', background: 'var(--neon-purple)', color: 'black', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-mono)', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'UPDATING DB...' : 'UPDATE DB'}
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
