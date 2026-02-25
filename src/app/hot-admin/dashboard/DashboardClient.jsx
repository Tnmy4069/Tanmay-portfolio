'use client';

import { ToastProvider } from '../../../components/Toast';
import { ToastForm } from './ToastForm';
import Accordion from './Accordion';

export default function DashboardClient({
    about, skills, experience, education, projects, achievements, leadership,
    updateAbout, addSkill, deleteSkill, addExperience, deleteExperience,
    addEducation, deleteEducation, addProject, deleteProject,
    addAchievement, deleteAchievement, addLeadership, deleteLeadership,
}) {
    return (
        <ToastProvider>
            <div className="admin-page">
                <div className="admin-container">

                    {/* ABOUT SECTION */}
                    <Accordion title="1. Profile & Contacts" defaultOpen={true}>
                        <ToastForm action={updateAbout} successMessage="Profile updated!" className="admin-col-form" style={{ marginTop: '15px' }}>
                            <div className="admin-grid-2">
                                <label>Name: <input name="name" defaultValue={about.name} className="admin-input" required /></label>
                                <label>Tagline: <input name="tagline" defaultValue={about.tagline} className="admin-input" required /></label>
                            </div>
                            <label>Subtitle (Hero): <textarea name="subtitle" defaultValue={about.subtitle} className="admin-input" style={{ height: '60px' }} required /></label>
                            <label>Bio (Supports HTML): <textarea name="bio" defaultValue={about.bio} className="admin-input" style={{ height: '100px', resize: 'vertical' }} required /></label>

                            <div className="admin-grid-2">
                                <label>Email: <input name="email" defaultValue={about.email} className="admin-input" required /></label>
                                <label>Phone: <input name="phone" defaultValue={about.phone} className="admin-input" required /></label>
                                <label>GitHub UI: <input name="github" defaultValue={about.github} className="admin-input" required /></label>
                                <label>LinkedIn UI: <input name="linkedin" defaultValue={about.linkedin} className="admin-input" required /></label>
                                <label>Portfolio URL: <input name="portfolio" defaultValue={about.portfolio} className="admin-input" required /></label>
                                <label className="span-2">
                                    Global Theme:
                                    <select name="theme" defaultValue={about.theme || 'cyan'} className="admin-input" style={{ marginTop: '5px' }}>
                                        <option value="cyan">Default (Cyan)</option>
                                        <option value="matrix">Matrix (Green)</option>
                                        <option value="synthwave">Synthwave (Magenta)</option>
                                        <option value="amber">Amber (Gold)</option>
                                        <option value="ruby">Ruby (Red)</option>
                                        <option value="emerald">Emerald (Electric)</option>
                                    </select>
                                </label>
                            </div>
                            <button type="submit" className="admin-btn">Save About</button>
                        </ToastForm>
                    </Accordion>

                    {/* SKILLS SECTION */}
                    <Accordion title="2. Skills">
                        <ToastForm action={addSkill} successMessage="Skill added!" resetOnSuccess={true} className="admin-flex-form" style={{ marginTop: '15px', marginBottom: '20px' }}>
                            <select name="category" className="admin-input" required>
                                <option value="frontend">Frontend</option>
                                <option value="backend">Backend</option>
                                <option value="data">Data/AI</option>
                                <option value="tools">Tools</option>
                            </select>
                            <input name="name" placeholder="Skill name (e.g. Next.js)" className="admin-input" required />
                            <button type="submit" className="admin-btn" style={{ whiteSpace: 'nowrap' }}>Add</button>
                        </ToastForm>

                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {skills.map(skill => (
                                <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--border-glass)' }}>
                                    <span><strong style={{ color: 'var(--neon-cyan)' }}>[{skill.category}]</strong> {skill.name}</span>
                                    <ToastForm action={deleteSkill} successMessage="Skill deleted!">
                                        <input type="hidden" name="id" value={skill.id} />
                                        <button type="submit" className="admin-del-btn">✖</button>
                                    </ToastForm>
                                </div>
                            ))}
                        </div>
                    </Accordion>

                    {/* EXPERIENCE SECTION */}
                    <Accordion title="3. Experience">
                        <ToastForm action={addExperience} successMessage="Experience added!" resetOnSuccess={true} className="admin-col-form" style={{ marginTop: '15px', marginBottom: '20px' }}>
                            <input name="role" placeholder="Role (e.g. Software Engineer)" className="admin-input" required />
                            <input name="company" placeholder="Company (e.g. Google)" className="admin-input" required />
                            <input name="duration" placeholder="Duration (e.g. 2023 - Present)" className="admin-input" required />
                            <textarea name="description" placeholder="Description/Bullets" className="admin-input" style={{ height: '60px' }} required />
                            <button type="submit" className="admin-btn">Add Exp</button>
                        </ToastForm>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {experience.map(exp => (
                                <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid var(--border-glass)', fontSize: '0.9rem', gap: '8px' }}>
                                    <div style={{ minWidth: 0 }}><strong>{exp.role}</strong> at {exp.company}</div>
                                    <ToastForm action={deleteExperience} successMessage="Experience deleted!">
                                        <input type="hidden" name="id" value={exp.id} />
                                        <button type="submit" className="admin-del-btn">✖</button>
                                    </ToastForm>
                                </div>
                            ))}
                        </div>
                    </Accordion>

                    {/* EDUCATION SECTION */}
                    <Accordion title="4. Education">
                        <ToastForm action={addEducation} successMessage="Education added!" resetOnSuccess={true} className="admin-col-form" style={{ marginTop: '15px', marginBottom: '20px' }}>
                            <input name="degree" placeholder="Degree" className="admin-input" required />
                            <input name="institution" placeholder="Institution" className="admin-input" required />
                            <input name="year" placeholder="Year" className="admin-input" required />
                            <button type="submit" className="admin-btn">Add Edu</button>
                        </ToastForm>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {education.map(edu => (
                                <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid var(--border-glass)', fontSize: '0.9rem', gap: '8px' }}>
                                    <div style={{ minWidth: 0 }}><strong>{edu.degree}</strong>, {edu.year}</div>
                                    <ToastForm action={deleteEducation} successMessage="Education deleted!">
                                        <input type="hidden" name="id" value={edu.id} />
                                        <button type="submit" className="admin-del-btn">✖</button>
                                    </ToastForm>
                                </div>
                            ))}
                        </div>
                    </Accordion>

                    {/* PROJECTS SECTION */}
                    <Accordion title="5. Projects">
                        <ToastForm action={addProject} successMessage="Project added!" resetOnSuccess={true} className="admin-col-form" style={{ marginTop: '15px', marginBottom: '20px' }}>
                            <input name="title" placeholder="Project Title" className="admin-input" required />
                            <textarea name="desc" placeholder="Project Description" className="admin-input" style={{ height: '60px' }} required />
                            <div className="admin-grid-2">
                                <input name="link" placeholder="URL (e.g. https://...)" className="admin-input" required />
                                <input name="linkLabel" placeholder="URL Label" className="admin-input" required />
                            </div>
                            <input name="tags" placeholder="Tags (e.g. React:, MySQL:emerald, NLP:purple)" className="admin-input" required />
                            <label style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><input type="checkbox" name="span" /> Make Tile Large (Span 2x Width)</label>
                            <button type="submit" className="admin-btn">Add Project</button>
                        </ToastForm>

                        <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                            {projects.map(proj => (
                                <div key={proj.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid var(--border-glass)', gap: '8px' }}>
                                    <span style={{ minWidth: 0 }}><strong>{proj.title}</strong></span>
                                    <ToastForm action={deleteProject} successMessage="Project deleted!">
                                        <input type="hidden" name="id" value={proj.id} />
                                        <button type="submit" className="admin-del-btn">✖</button>
                                    </ToastForm>
                                </div>
                            ))}
                        </div>
                    </Accordion>

                    {/* ACHIEVEMENTS SECTION */}
                    <Accordion title="6. Achievements">
                        <ToastForm action={addAchievement} successMessage="Achievement added!" resetOnSuccess={true} className="admin-col-form" style={{ marginTop: '15px', marginBottom: '20px' }}>
                            <div className="admin-grid-2">
                                <input name="number" placeholder="Number (e.g. AIR 1)" className="admin-input" required />
                                <input name="label" placeholder="Description label" className="admin-input" required />
                            </div>
                            <label style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><input type="checkbox" name="span" /> Extra Large Tile</label>
                            <button type="submit" className="admin-btn">Add Achievement</button>
                        </ToastForm>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {achievements.map(ach => (
                                <div key={ach.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid var(--border-glass)', gap: '8px' }}>
                                    <span style={{ minWidth: 0 }}><strong>{ach.number}</strong>: {ach.label}</span>
                                    <ToastForm action={deleteAchievement} successMessage="Achievement deleted!">
                                        <input type="hidden" name="id" value={ach.id} />
                                        <button type="submit" className="admin-del-btn">✖</button>
                                    </ToastForm>
                                </div>
                            ))}
                        </div>
                    </Accordion>

                    {/* LEADERSHIP SECTION */}
                    <Accordion title="7. Leadership">
                        <ToastForm action={addLeadership} successMessage="Leadership added!" resetOnSuccess={true} className="admin-col-form" style={{ marginTop: '15px', marginBottom: '20px' }}>
                            <div className="admin-grid-2">
                                <input name="role" placeholder="Role (e.g. President)" className="admin-input" required />
                                <input name="org" placeholder="Organization" className="admin-input" required />
                            </div>
                            <input name="period" placeholder="Duration (e.g. Oct 2024 - 2025)" className="admin-input" required />
                            <textarea name="points" placeholder="Bullet points separated by newlines" className="admin-input" style={{ height: '70px' }} required />
                            <button type="submit" className="admin-btn">Add Leadership</button>
                        </ToastForm>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {leadership.map(l => (
                                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid var(--border-glass)', gap: '8px' }}>
                                    <span style={{ minWidth: 0 }}><strong>{l.role}</strong> at {l.org}</span>
                                    <ToastForm action={deleteLeadership} successMessage="Leadership deleted!">
                                        <input type="hidden" name="id" value={l.id} />
                                        <button type="submit" className="admin-del-btn">✖</button>
                                    </ToastForm>
                                </div>
                            ))}
                        </div>
                    </Accordion>

                </div>
            </div>
        </ToastProvider>
    );
}
