import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request) {
    try {
        const body = await request.json();
        // Check against environment variable instead of a hardcoded string
        if (body.password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // About
        await prisma.about.create({
            data: {
                name: 'TANMAY HIRODKAR',
                tagline: 'Project Management • AI & Digital Systems',
                subtitle: 'Building scalable systems, leading technology programs, and crafting digital experiences that bridge AI, cloud, and human-centered design.',
                bio: 'Project management professional with strong experience in executing technology programs, coordinating multi-stakeholder teams, and delivering digital systems at scale.\n\nProven ability to manage timelines, reporting, and compliance-oriented workflows across education, governance, and AI-enabled platforms. Passionate about responsible AI, Safe & Trust initiatives, and large-scale public technology missions.',
                email: 'tnmy.web@gmail.com',
                phone: '+91 83800 66588',
                github: 'https://github.com/Tnmy4069',
                linkedin: 'https://linkedin.com/in/hirodkar',
                portfolio: 'https://tnmyh.vercel.app'
            }
        });

        // Skills
        const skillsObj = {
            frontend: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'JavaScript (ES6+)'],
            backend: ['Node.js', 'Express.js', 'Python'],
            data: ['MySQL', 'PostgreSQL', 'MongoDB'],
            tools: ['Git', 'GitHub', 'Figma']
        };

        for (const [category, arr] of Object.entries(skillsObj)) {
            for (const name of arr) {
                await prisma.skill.create({ data: { category, name } });
            }
        }

        // Leadership
        await prisma.leadership.createMany({
            data: [
                {
                    role: 'President',
                    org: 'SACSDE (Students\' Association of CSD Engineering)',
                    period: 'Oct 2024 – 2025',
                    points: 'Led Aarambh 24, MET\'s first major BTech Fest — 1000+ participants\nLaunched technical bootcamps and coding events with 95% batch participation\nBuilt a custom internal task tracker and scaled student outreach programs'
                },
                {
                    role: 'Vice President',
                    org: 'E-Cell, MET\'s Institute of Technology',
                    period: 'Sept 2023 – 2025',
                    points: 'Elevated E-Cell to Advanced Track under IIT-B mentoring\nExecuted 5+ incubation drives and Eureka 2024 event management\nMentored 7+ startups across biotech, agriculture, and ed-tech domains'
                }
            ]
        });

        // Achievements
        await prisma.achievement.createMany({
            data: [
                { number: 'AIR 1', label: 'IIT Bombay E-Summit 2025 — National Entrepreneurship Challenge', span: true },
                { number: '2nd', label: 'KIT E-Cell Kolhapur — Western Entrepreneurship Challenge', span: false },
                { number: 'AIR 5', label: 'IIT Bombay E-Summit 2024 — Basic Track', span: false },
                { number: '800+', label: 'Students on BATUExams.in', span: false },
                { number: '1000+', label: 'Participants at Aarambh 24 Fest', span: false },
                { number: '500+', label: 'Scholarship submissions managed', span: false },
                { number: '40+', label: 'Developers mentored', span: false },
                { number: '7+', label: 'Startups mentored in biotech, agri, ed-tech', span: true }
            ]
        });

        // Projects
        await prisma.project.createMany({
            data: [
                {
                    title: 'HKLearning Platform',
                    desc: 'Custom LMS and fund tracking system with dashboards, analytics, automated receipt generation, and course progress tracking for 200+ learners.',
                    tags: 'React:, Tailwind:purple, MySQL:emerald',
                    link: 'https://vighnahartas.com',
                    linkLabel: 'vighnahartas.com',
                    span: true,
                },
                {
                    title: 'AI Financial Health App',
                    desc: 'Web-based financial analytics dashboard to visualize personal/business financial health with real-time data loading and metric visualization.',
                    tags: 'Next.js:, AI:purple, Vercel:emerald',
                    link: 'https://sunhack-three.vercel.app',
                    linkLabel: 'Hackathon Finalist',
                    span: false,
                }
            ]
        });

        // Experience
        await prisma.experience.createMany({
            data: [
                {
                    duration: 'NOV 2025 – PRESENT',
                    role: 'Project Managing Intern: Web Dev & System Design',
                    company: 'VPNSecCon, Mumbai',
                    description: 'Designing and implementing a full-scale Community Connecting Platform with NextJS, Node JS and Firebase\nEnabling dynamic filtering, admin workflows, and connections features\nNormalized legacy databases and improved data integrity during large-scale migrations\nMentoring 14+ developers on schema design, UI refactors, and system consistency'
                }
            ]
        });

        return NextResponse.json({ success: true, message: 'Seeded DB!' });

    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
