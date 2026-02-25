import Scene3D from '../components/Scene3D';
import MagneticCursor from '../components/MagneticCursor';
import RealtimeRefresh from '../components/RealtimeRefresh';
import GradientDivider from '../components/GradientDivider';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ProjectsSection from '../sections/ProjectsSection';
import ExperienceSection from '../sections/ExperienceSection';
import ImpactSection from '../sections/ImpactSection';
import BlogsSection from '../sections/BlogsSection';
import LeadershipSection from '../sections/LeadershipSection';
import ContactSection from '../sections/ContactSection';
import { prisma } from '../lib/prisma';

export default async function Page() {
    const aboutData = await prisma.about.findFirst() || {};

    const rawSkills = await prisma.skill.findMany();
    const skillsData = rawSkills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill.name);
        return acc;
    }, {});

    const experienceData = await prisma.experience.findMany({ orderBy: { id: 'desc' } });
    const educationData = await prisma.education.findMany({ orderBy: { id: 'desc' } });
    const projectData = await prisma.project.findMany({ orderBy: { id: 'desc' } });
    const achievementData = await prisma.achievement.findMany({ orderBy: { id: 'desc' } });
    const leadershipData = await prisma.leadership.findMany({ orderBy: { id: 'desc' } });
    const blogData = await prisma.blog.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        take: 3
    });

    return (
        <>
            <Scene3D />
            <div className="mesh-gradient" />
            <MagneticCursor />
            <div className="content-wrapper">
                <RealtimeRefresh initialVersion={aboutData.updatedAt?.toISOString() || null} />
                <HeroSection about={aboutData} />
                <GradientDivider />
                <AboutSection about={aboutData} skills={skillsData} education={educationData} />
                <GradientDivider color1="var(--neon-purple)" color2="var(--neon-emerald)" />
                <ProjectsSection projects={projectData} />
                <GradientDivider />
                <ExperienceSection experiences={experienceData} />
                <GradientDivider color1="var(--neon-emerald)" color2="var(--neon-cyan)" />
                <ImpactSection achievements={achievementData} />
                <GradientDivider color1="var(--neon-purple)" color2="var(--neon-cyan)" />
                <BlogsSection blogs={blogData} />
                <GradientDivider />
                <LeadershipSection leadership={leadershipData} />
                <GradientDivider color1="var(--neon-cyan)" color2="var(--neon-purple)" />
                <ContactSection about={aboutData} />
            </div>
        </>
    );
}
