'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BlogsSection({ blogs }) {
    if (!blogs || blogs.length === 0) return null;

    return (
        <section className="section" id="blogs">
            <div className="section-inner">
                <p className="section-label">Journal</p>
                <h2 className="section-title">Deep Dives & Insights</h2>

                <div className="bento-grid">
                    {blogs.map((blog, i) => (
                        <motion.div
                            key={blog.id}
                            className={`bento-item ${i === 0 ? 'span-2' : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: 0.1 * i, duration: 0.6 }}
                        >
                            <Link href={`/b/${blog.slug}`} className="glass-card" style={{
                                display: 'block',
                                height: '100%',
                                textDecoration: 'none',
                                padding: 0,
                                overflow: 'hidden'
                            }}>
                                {blog.imageUrl && (
                                    <div style={{ width: '100%', height: i === 0 ? '300px' : '200px', overflow: 'hidden' }}>
                                        <img
                                            src={blog.imageUrl}
                                            alt={blog.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                            className="blog-card-image"
                                        />
                                    </div>
                                )}
                                <div style={{ padding: '24px' }}>
                                    <div style={{
                                        fontFamily: 'var(--font-display)',
                                        color: 'var(--neon-cyan)',
                                        fontSize: '0.65rem',
                                        letterSpacing: '0.2em',
                                        marginBottom: '12px'
                                    }}>
                                        {new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                    </div>
                                    <h3 style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: i === 0 ? '1.5rem' : '1.1rem',
                                        color: 'var(--text-primary)',
                                        marginBottom: '12px',
                                        lineHeight: '1.3'
                                    }}>
                                        {blog.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.85rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.6',
                                        display: '-webkit-box',
                                        WebkitLineClamp: i === 0 ? 3 : 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {blog.content.replace(/[#*`]/g, '').slice(0, 200)}...
                                    </p>
                                    <div style={{ marginTop: '20px', color: 'var(--neon-cyan)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                                        READ_FULL_SEQUENCE →
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
