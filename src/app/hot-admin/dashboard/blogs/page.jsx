import Link from 'next/link';
import { getBlogs, deleteBlog } from '../blogActions';

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <div className="admin-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', gap: '12px', flexWrap: 'wrap' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--neon-cyan)', margin: 0, fontSize: 'clamp(1.2rem, 3vw, 1.6rem)' }}>_BLOGS DB</h1>
                <Link href="/hot-admin/dashboard/blogs/new" style={{ padding: '10px 20px', background: 'var(--neon-cyan)', color: 'black', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px', fontFamily: 'var(--font-display)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                    INITIALIZE NEW_
                </Link>
            </div>

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: '8px', overflow: 'hidden' }}>
                {blogs.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        NO RECORDS FOUND IN DATABASE.
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="blog-table-wrapper">
                            <table className="blog-table">
                                <thead style={{ background: 'rgba(0,0,0,0.5)' }}>
                                    <tr>
                                        <th>TITLE</th>
                                        <th>SLUG</th>
                                        <th>STATUS</th>
                                        <th>CREATED</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs.map(blog => (
                                        <tr key={blog.id}>
                                            <td>
                                                <strong style={{ color: 'var(--text-primary)' }}>{blog.title}</strong>
                                            </td>
                                            <td>
                                                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--neon-purple)' }}>/{blog.slug}</span>
                                            </td>
                                            <td>
                                                {blog.published ?
                                                    <span style={{ color: 'var(--neon-emerald)', fontSize: '0.8rem', border: '1px solid var(--neon-emerald)', padding: '2px 8px', borderRadius: '12px' }}>PUBLISHED</span> :
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', border: '1px solid var(--text-muted)', padding: '2px 8px', borderRadius: '12px' }}>DRAFT</span>
                                                }
                                            </td>
                                            <td>
                                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                                    {new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <Link href={`/b/${blog.slug}`} target="_blank" style={{ color: 'var(--neon-emerald)', textDecoration: 'none', fontSize: '0.85rem' }}>VIEW</Link>
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
                        </div>

                        {/* Mobile Card View */}
                        <div className="blog-cards-mobile">
                            {blogs.map(blog => (
                                <div key={blog.id} className="blog-card-mobile">
                                    <div className="blog-card-mobile-title">{blog.title}</div>
                                    <div className="blog-card-mobile-slug">/{blog.slug}</div>
                                    <div className="blog-card-mobile-meta">
                                        {blog.published ?
                                            <span style={{ color: 'var(--neon-emerald)', fontSize: '0.75rem', border: '1px solid var(--neon-emerald)', padding: '2px 8px', borderRadius: '12px' }}>PUBLISHED</span> :
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', border: '1px solid var(--text-muted)', padding: '2px 8px', borderRadius: '12px' }}>DRAFT</span>
                                        }
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                                            {new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="blog-card-mobile-actions">
                                        <Link href={`/b/${blog.slug}`} target="_blank" style={{ color: 'var(--neon-emerald)', textDecoration: 'none', fontSize: '0.85rem' }}>VIEW</Link>
                                        <Link href={`/hot-admin/dashboard/blogs/edit/${blog.id}`} style={{ color: 'var(--neon-cyan)', textDecoration: 'none', fontSize: '0.85rem' }}>EDIT</Link>
                                        <form action={deleteBlog}>
                                            <input type="hidden" name="id" value={blog.id} />
                                            <button type="submit" style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem', padding: 0 }}>DELETE</button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
