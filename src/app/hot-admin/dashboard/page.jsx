import { logoutAction } from '../actions';
import {
    getAbout, getSkills, getExperience, getEducation, getProjects, getAchievements, getLeadership,
    updateAbout, addSkill, deleteSkill, addExperience, deleteExperience, addEducation, deleteEducation,
    addProject, deleteProject, addAchievement, deleteAchievement, addLeadership, deleteLeadership
} from './actions';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
    const about = await getAbout();
    const skills = await getSkills();
    const experience = await getExperience();
    const education = await getEducation();
    const projects = await getProjects();
    const achievements = await getAchievements();
    const leadership = await getLeadership();

    return (
        <DashboardClient
            about={about}
            skills={skills}
            experience={experience}
            education={education}
            projects={projects}
            achievements={achievements}
            leadership={leadership}
            updateAbout={updateAbout}
            addSkill={addSkill}
            deleteSkill={deleteSkill}
            addExperience={addExperience}
            deleteExperience={deleteExperience}
            addEducation={addEducation}
            deleteEducation={deleteEducation}
            addProject={addProject}
            deleteProject={deleteProject}
            addAchievement={addAchievement}
            deleteAchievement={deleteAchievement}
            addLeadership={addLeadership}
            deleteLeadership={deleteLeadership}
        />
    );
}
