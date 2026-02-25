import { logoutAction } from '../actions';
import {
    getAbout, getSkills, getExperience, getEducation, getProjects, getAchievements, getLeadership,
    updateAbout, addSkill, deleteSkill, addExperience, deleteExperience, addEducation, deleteEducation,
    addProject, deleteProject, addAchievement, deleteAchievement, addLeadership, deleteLeadership
} from './actions';
import Accordion from './Accordion';

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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>

                {/* ABOUT SECTION */}
                <Accordion title="1. Profile & Contacts" defaultOpen={true}>
                    <form action={updateAbout} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <label>Name: <input name="name" defaultValue={about.name} className="admin-input" required /></label>
                            <label>Tagline: <input name="tagline" defaultValue={about.tagline} className="admin-input" required /></label>
                        </div>
                        <label>Subtitle (Hero): <textarea name="subtitle" defaultValue={about.subtitle} className="admin-input" style={{ height: '60px' }} required /></label>
                        <label>Bio (Supports HTML): <textarea name="bio" defaultValue={about.bio} className="admin-input" style={{ height: '100px', resize: 'vertical' }} required /></label>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <label>Email: <input name="email" defaultValue={about.email} className="admin-input" required /></label>
                            <label>Phone: <input name="phone" defaultValue={about.phone} className="admin-input" required /></label>
                            <label>GitHub UI: <input name="github" defaultValue={about.github} className="admin-input" required /></label>
                            <label>LinkedIn UI: <input name="linkedin" defaultValue={about.linkedin} className="admin-input" required /></label>
                            <label>Portfolio URL: <input name="portfolio" defaultValue={about.portfolio} className="admin-input" required /></label>
                            <label style={{ gridColumn: 'span 2' }}>
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
                    </form>
                </Accordion>

                {/* SKILLS SECTION */}
                <Accordion title="2. Skills">
                    <form action={addSkill} style={{ display: 'flex', gap: '10px', marginTop: '15px', marginBottom: '20px' }}>
                        <select name="category" className="admin-input" required>
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="data">Data/AI</option>
                            <option value="tools">Tools</option>
                        </select>
                        <input name="name" placeholder="Skill name (e.g. Next.js)" className="admin-input" required />
                        <button type="submit" className="admin-btn">Add</button>
                    </form>

                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {skills.map(skill => (
                            <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--border)' }}>
                                <span><strong style={{ color: 'var(--neon-cyan)' }}>['{skill.category}']</strong> {skill.name}</span>
                                <form action={deleteSkill}><input type="hidden" name="id" value={skill.id} /><button type="submit" className="admin-del-btn">✖</button></form>
                            </div>
                        ))}
                    </div>
                </Accordion>

                {/* EXPERIENCE & EDUCATION SECTION */}
                <Accordion title="3. Experience">
                    <form action={addExperience} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px', marginBottom: '20px' }}>
                        <input name="role" placeholder="Role (e.g. Software Engineer)" className="admin-input" required />
                        <input name="company" placeholder="Company (e.g. Google)" className="admin-input" required />
                        <input name="duration" placeholder="Duration (e.g. 2023 - Present)" className="admin-input" required />
                        <textarea name="description" placeholder="Description/Bullets" className="admin-input" style={{ height: '60px' }} required />
                        <button type="submit" className="admin-btn">Add Exp</button>
                    </form>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {experience.map(exp => (
                            <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                                <div><strong>{exp.role}</strong> at {exp.company}</div>
                                <form action={deleteExperience}><input type="hidden" name="id" value={exp.id} /><button type="submit" className="admin-del-btn">✖</button></form>
                            </div>
                        ))}
                    </div>
                </Accordion>

                <Accordion title="4. Education">
                    <form action={addEducation} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px', marginBottom: '20px' }}>
                        <input name="degree" placeholder="Degree" className="admin-input" required />
                        <input name="institution" placeholder="Institution" className="admin-input" required />
                        <input name="year" placeholder="Year" className="admin-input" required />
                        <button type="submit" className="admin-btn">Add Edu</button>
                    </form>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {education.map(edu => (
                            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                                <div><strong>{edu.degree}</strong>, {edu.year}</div>
                                <form action={deleteEducation}><input type="hidden" name="id" value={edu.id} /><button type="submit" className="admin-del-btn">✖</button></form>
                            </div>
                        ))}
                    </div>
                </Accordion>

                {/* PROJECTS SECTION */}
                <Accordion title="5. Projects">
                    <form action={addProject} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px', marginBottom: '20px' }}>
                        <input name="title" placeholder="Project Title" className="admin-input" required />
                        <textarea name="desc" placeholder="Project Description" className="admin-input" style={{ height: '60px' }} required />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <input name="link" placeholder="URL (e.g. https://...)" className="admin-input" required />
                            <input name="linkLabel" placeholder="URL Label" className="admin-input" required />
                        </div>
                        <input name="tags" placeholder="Tags (e.g. React:, MySQL:emerald, NLP:purple)" className="admin-input" required />
                        <label style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><input type="checkbox" name="span" /> Make Tile Large (Span 2x Width)</label>
                        <button type="submit" className="admin-btn">Add Project</button>
                    </form>

                    <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                        {projects.map(proj => (
                            <div key={proj.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--border)' }}>
                                <span><strong>{proj.title}</strong></span>
                                <form action={deleteProject}><input type="hidden" name="id" value={proj.id} /><button type="submit" className="admin-del-btn">✖</button></form>
                            </div>
                        ))}
                    </div>
                </Accordion>

                {/* ACHIEVEMENTS & LEADERSHIP */}
                <Accordion title="6. Achievements">
                    <form action={addAchievement} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px', marginBottom: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                            <input name="number" placeholder="Number (e.g. AIR 1)" className="admin-input" required />
                            <input name="label" placeholder="Description label" className="admin-input" required />
                        </div>
                        <label style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><input type="checkbox" name="span" /> Extra Large Tile</label>
                        <button type="submit" className="admin-btn">Add Achievement</button>
                    </form>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {achievements.map(ach => (
                            <div key={ach.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--border)' }}>
                                <span><strong>{ach.number}</strong>: {ach.label}</span>
                                <form action={deleteAchievement}><input type="hidden" name="id" value={ach.id} /><button type="submit" className="admin-del-btn">✖</button></form>
                            </div>
                        ))}
                    </div>
                </Accordion>

                <Accordion title="7. Leadership">
                    <form action={addLeadership} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px', marginBottom: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <input name="role" placeholder="Role (e.g. President)" className="admin-input" required />
                            <input name="org" placeholder="Organization" className="admin-input" required />
                        </div>
                        <input name="period" placeholder="Duration (e.g. Oct 2024 - 2025)" className="admin-input" required />
                        <textarea name="points" placeholder="Bullet points separated by newlines" className="admin-input" style={{ height: '70px' }} required />
                        <button type="submit" className="admin-btn">Add Leadership</button>
                    </form>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {leadership.map(l => (
                            <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--border)' }}>
                                <span><strong>{l.role}</strong> at {l.org}</span>
                                <form action={deleteLeadership}><input type="hidden" name="id" value={l.id} /><button type="submit" className="admin-del-btn">✖</button></form>
                            </div>
                        ))}
                    </div>
                </Accordion>

            </div>
        </div>
    );
}


