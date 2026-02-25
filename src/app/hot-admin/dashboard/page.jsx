import { logoutAction } from '../actions';
import {
    getAbout, getSkills, getExperience, getEducation, getProjects, getAchievements, getLeadership,
    updateAbout, addSkill, deleteSkill, addExperience, deleteExperience, addEducation, deleteEducation,
    addProject, deleteProject, addAchievement, deleteAchievement, addLeadership, deleteLeadership
} from './actions';

export default async function DashboardPage() {
    const about = await getAbout();
    const skills = await getSkills();
    const experience = await getExperience();
    const education = await getEducation();
    const projects = await getProjects();
    const achievements = await getAchievements();
    const leadership = await getLeadership();

    return (
        <div style={{ padding: '40px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>

                {/* ABOUT SECTION */}
                <section style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <h2 style={{ color: 'var(--text-secondary)' }}>1. Profile & Contacts</h2>
                    <form action={updateAbout} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <label>Name: <input name="name" defaultValue={about.name} style={inputStyle} required /></label>
                            <label>Tagline: <input name="tagline" defaultValue={about.tagline} style={inputStyle} required /></label>
                        </div>
                        <label>Subtitle (Hero): <textarea name="subtitle" defaultValue={about.subtitle} style={{ ...inputStyle, height: '60px' }} required /></label>
                        <label>Bio (Supports HTML): <textarea name="bio" defaultValue={about.bio} style={{ ...inputStyle, height: '100px', resize: 'vertical' }} required /></label>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <label>Email: <input name="email" defaultValue={about.email} style={inputStyle} required /></label>
                            <label>Phone: <input name="phone" defaultValue={about.phone} style={inputStyle} required /></label>
                            <label>GitHub UI: <input name="github" defaultValue={about.github} style={inputStyle} required /></label>
                            <label>LinkedIn UI: <input name="linkedin" defaultValue={about.linkedin} style={inputStyle} required /></label>
                            <label>Portfolio URL: <input name="portfolio" defaultValue={about.portfolio} style={inputStyle} required /></label>
                        </div>
                        <button type="submit" style={btnStyle}>Save About</button>
                    </form>
                </section>

                {/* SKILLS SECTION */}
                <section style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <h2 style={{ color: 'var(--text-secondary)' }}>2. Skills</h2>
                    <form action={addSkill} style={{ display: 'flex', gap: '10px', marginTop: '15px', marginBottom: '20px' }}>
                        <select name="category" style={inputStyle} required>
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="data">Data/AI</option>
                            <option value="tools">Tools</option>
                        </select>
                        <input name="name" placeholder="Skill name (e.g. Next.js)" style={inputStyle} required />
                        <button type="submit" style={btnStyle}>Add</button>
                    </form>

                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {skills.map(skill => (
                            <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--border)' }}>
                                <span><strong style={{ color: 'var(--neon-cyan)' }}>['{skill.category}']</strong> {skill.name}</span>
                                <form action={deleteSkill}><input type="hidden" name="id" value={skill.id} /><button type="submit" style={delBtn}>✖</button></form>
                            </div>
                        ))}
                    </div>
                </section>

                {/* EXPERIENCE & EDUCATION SECTION */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <section style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <h2 style={{ color: 'var(--text-secondary)' }}>3. Experience</h2>
                        <form action={addExperience} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px', marginBottom: '20px' }}>
                            <input name="role" placeholder="Role (e.g. Software Engineer)" style={inputStyle} required />
                            <input name="company" placeholder="Company (e.g. Google)" style={inputStyle} required />
                            <input name="duration" placeholder="Duration (e.g. 2023 - Present)" style={inputStyle} required />
                            <textarea name="description" placeholder="Description/Bullets" style={{ ...inputStyle, height: '60px' }} required />
                            <button type="submit" style={btnStyle}>Add Exp</button>
                        </form>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {experience.map(exp => (
                                <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                                    <div><strong>{exp.role}</strong> at {exp.company}</div>
                                    <form action={deleteExperience}><input type="hidden" name="id" value={exp.id} /><button type="submit" style={delBtn}>✖</button></form>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <h2 style={{ color: 'var(--text-secondary)' }}>4. Education</h2>
                        <form action={addEducation} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px', marginBottom: '20px' }}>
                            <input name="degree" placeholder="Degree" style={inputStyle} required />
                            <input name="institution" placeholder="Institution" style={inputStyle} required />
                            <input name="year" placeholder="Year" style={inputStyle} required />
                            <button type="submit" style={btnStyle}>Add Edu</button>
                        </form>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {education.map(edu => (
                                <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                                    <div><strong>{edu.degree}</strong>, {edu.year}</div>
                                    <form action={deleteEducation}><input type="hidden" name="id" value={edu.id} /><button type="submit" style={delBtn}>✖</button></form>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* PROJECTS SECTION */}
                <section style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <h2 style={{ color: 'var(--text-secondary)' }}>5. Projects</h2>
                    <form action={addProject} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px', marginBottom: '20px' }}>
                        <input name="title" placeholder="Project Title" style={inputStyle} required />
                        <textarea name="desc" placeholder="Project Description" style={{ ...inputStyle, height: '60px' }} required />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <input name="link" placeholder="URL (e.g. https://...)" style={inputStyle} required />
                            <input name="linkLabel" placeholder="URL Label" style={inputStyle} required />
                        </div>
                        <input name="tags" placeholder="Tags (e.g. React:, MySQL:emerald, NLP:purple)" style={inputStyle} required />
                        <label style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><input type="checkbox" name="span" /> Make Tile Large (Span 2x Width)</label>
                        <button type="submit" style={btnStyle}>Add Project</button>
                    </form>

                    <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                        {projects.map(proj => (
                            <div key={proj.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--border)' }}>
                                <span><strong>{proj.title}</strong></span>
                                <form action={deleteProject}><input type="hidden" name="id" value={proj.id} /><button type="submit" style={delBtn}>✖</button></form>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ACHIEVEMENTS & LEADERSHIP */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <section style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <h2 style={{ color: 'var(--text-secondary)' }}>6. Achievements</h2>
                        <form action={addAchievement} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px', marginBottom: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                                <input name="number" placeholder="Number (e.g. AIR 1)" style={inputStyle} required />
                                <input name="label" placeholder="Description label" style={inputStyle} required />
                            </div>
                            <label style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><input type="checkbox" name="span" /> Extra Large Tile</label>
                            <button type="submit" style={btnStyle}>Add Achievement</button>
                        </form>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {achievements.map(ach => (
                                <div key={ach.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--border)' }}>
                                    <span><strong>{ach.number}</strong>: {ach.label}</span>
                                    <form action={deleteAchievement}><input type="hidden" name="id" value={ach.id} /><button type="submit" style={delBtn}>✖</button></form>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <h2 style={{ color: 'var(--text-secondary)' }}>7. Leadership</h2>
                        <form action={addLeadership} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px', marginBottom: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <input name="role" placeholder="Role (e.g. President)" style={inputStyle} required />
                                <input name="org" placeholder="Organization" style={inputStyle} required />
                            </div>
                            <input name="period" placeholder="Duration (e.g. Oct 2024 - 2025)" style={inputStyle} required />
                            <textarea name="points" placeholder="Bullet points separated by newlines" style={{ ...inputStyle, height: '70px' }} required />
                            <button type="submit" style={btnStyle}>Add Leadership</button>
                        </form>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {leadership.map(l => (
                                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--border)' }}>
                                    <span><strong>{l.role}</strong> at {l.org}</span>
                                    <form action={deleteLeadership}><input type="hidden" name="id" value={l.id} /><button type="submit" style={delBtn}>✖</button></form>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}

const inputStyle = { padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)', color: 'white', borderRadius: '4px', width: '100%', boxSizing: 'border-box' };
const btnStyle = { ...inputStyle, background: 'var(--neon-cyan)', color: 'black', fontWeight: 'bold', cursor: 'pointer' };
const delBtn = { background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem' };
