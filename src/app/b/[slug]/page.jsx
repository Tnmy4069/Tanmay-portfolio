
import { getBlogBySlug } from '../../hot-admin/dashboard/blogActions';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default async function BlogPage({ params }) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    // If blog doesn't exist or isn't published, return 404
    if (!blog || !blog.published) {
        notFound();
    }

    return (
        <article style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '20px' }}>
                <div style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--neon-cyan)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    marginBottom: '12px'
                }}>
                    [ BLOG_DATABASE_RECORD ]
                </div>
                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    lineHeight: '1.2',
                    margin: '0 0 16px 0',
                    background: 'linear-gradient(135deg, #fff 0%, var(--neon-cyan) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {blog.title}
                </h1>
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem'
                }}>
                    <span>DATE: {new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                    <span>SLUG: /{blog.slug}</span>
                </div>
            </div>

            {blog.imageUrl && (
                <div style={{ marginBottom: '40px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
                    <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>
            )}

            <div className="blog-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                >
                    {blog.content}
                </ReactMarkdown>
            </div>

            <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--border-glass)', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    --- END_OF_TRANSMISSION ---
                </p>
            </div>
        </article>
    );
}
