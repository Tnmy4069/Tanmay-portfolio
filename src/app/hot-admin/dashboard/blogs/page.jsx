import Link from 'next/link';
import { getBlogs, deleteBlog } from '../blogActions';

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--neon-cyan)', margin: 0 }}>_BLOGS DB</h1>
                <Link href="/hot-admin/dashboard/blogs/new" style={{ padding: '10px 20px', background: 'var(--neon-cyan)', color: 'black', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    INITIALIZE NEW_
                </Link>
            </div>

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                {blogs.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        NO RECORDS FOUND IN DATABASE.
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'var(--font-sans)' }}>
                        <thead style={{ background: 'rgba(0,0,0,0.5)' }}>
                            <tr>
                                <th style={thStyle}>TITLE</th>
                                <th style={thStyle}>SLUG</th>
                                <th style={thStyle}>STATUS</th>
                                <th style={thStyle}>CREATED</th>
                                <th style={thStyle}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map(blog => (
                                <tr key={blog.id} style={{ borderTop: '1px solid var(--border)' }}>
                                    <td style={tdStyle}>
                                        <strong style={{ color: 'var(--text-primary)' }}>{blog.title}</strong>
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--neon-purple)' }}>/{blog.slug}</span>
                                    </td>
                                    <td style={tdStyle}>
                                        {blog.published ?
                                            <span style={{ color: 'var(--neon-emerald)', fontSize: '0.8rem', border: '1px solid var(--neon-emerald)', padding: '2px 8px', borderRadius: '12px' }}>PUBLISHED</span> :
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', border: '1px solid var(--text-muted)', padding: '2px 8px', borderRadius: '12px' }}>DRAFT</span>
                                        }
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <Link href={`/hot-admin/dashboard/blogs/edit/${blog.id}`} style={{ color: 'var(--neon-cyan)', textDecoration: 'none', fontSize: '0.85rem' }}>EDIT</Link>
                                            <form action={deleteBlog}>
                                                <input type="hidden" name="id" value={blog.id} />
                                                <button type="submit" style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem', padding: 0 }}>DELETE</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

const thStyle = { padding: '16px 20px', color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '1px' };
const tdStyle = { padding: '16px 20px' };
