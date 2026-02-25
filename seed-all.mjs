import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Clearing old data...");
    await prisma.about.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.experience.deleteMany();
    await prisma.education.deleteMany();
    await prisma.project.deleteMany();
    await prisma.achievement.deleteMany();
    await prisma.leadership.deleteMany();

    console.log("Inserting About data...");
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

    console.log("Inserting Education data...");
    await prisma.education.create({
        data: {
            degree: 'B.Tech in Computer Science & Design',
            institution: 'MET\'s Institute of Technology',
            year: '2026'
        }
    });

    console.log("Inserting Skills data...");
    const skillsObj = {
        frontend: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'JavaScript (ES6+)', 'Tailwind CSS', 'Bootstrap'],
        backend: ['Node.js', 'Express.js', 'Flask', 'PHP', 'Laravel', 'CodeIgniter', 'Python', 'Streamlit'],
        data: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'NLP', 'AI/LLM APIs', 'Ridge Regression'],
        tools: ['Git', 'GitHub', 'Postman', 'Figma', 'Jira', 'Notion', 'CI/CD', 'Docker']
    };

    for (const [category, arr] of Object.entries(skillsObj)) {
        for (const name of arr) {
            await prisma.skill.create({ data: { category, name } });
        }
    }

    console.log("Inserting Projects data...");
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
            },
            {
                title: 'ECell MET Landing Page',
                desc: 'Landing page for E-Cell MET\'s Institute of Technology with modern design and event information.',
                tags: 'React:, Next.js:purple',
                link: 'https://ecell-met.tech',
                linkLabel: 'ecell-met.tech',
                span: false,
            },
            {
                title: 'MahaDBT ScholarSync Portal',
                desc: 'Role-based scholarship portal with secure authentication, admin filters, and management of 500+ submissions across PHP and React versions.',
                tags: 'React:, PHP:pink, MySQL:emerald',
                link: '#',
                linkLabel: 'Live Portal',
                span: true,
            },
            {
                title: 'IPC-BNS Law Finder',
                desc: 'AI-powered legal research assistant with NLP-driven query interpretation, keyword extraction, and sentence ranking over 500+ pages of law content.',
                tags: 'Flask:, NLP:purple, PyPDF2:emerald',
                link: '#',
                linkLabel: 'Third Year Project',
                span: false,
            },
            {
                title: 'FWI Predictor',
                desc: 'ML-based system to predict forest fire risk using weather indices. Ridge Regression with Flask web app deployment for real-time prediction.',
                tags: 'Python:, ML:purple, Flask:emerald',
                link: '#',
                linkLabel: 'Infosys Selected',
                span: false,
            },
            {
                title: 'BATUExams.in',
                desc: 'Online exam system with PDF generation, result analysis, and exam scheduling used by 800+ students across departments.',
                tags: 'PHP:pink, MySQL:emerald, Automation:purple',
                link: 'https://batuexams.in',
                linkLabel: 'batuexams.in',
                span: false,
            }
        ]
    });

    console.log("Inserting Experience data...");
    await prisma.experience.createMany({
        data: [
            {
                role: 'Project Managing Intern: Web Dev & System Design',
                company: 'VPNSecCon, Mumbai',
                duration: 'NOV 2025 – PRESENT',
                description: 'Designing and implementing a full-scale Community Connecting Platform with NextJS, Node JS and Firebase\nEnabling dynamic filtering, admin workflows, and connections features\nNormalized legacy databases and improved data integrity during large-scale migrations\nMentoring 14+ developers on schema design, UI refactors, and system consistency'
            },
            {
                role: 'AI & Data Science Intern',
                company: 'Infosys SpringBoard, India',
                duration: 'NOV 2025 – PRESENT',
                description: 'Built Tempest – Fire Weather Index (FWI) Predictor, an end-to-end ML system\nPerformed data preprocessing and EDA to analyze correlations among FWI, ISI, BUI, and DMC\nTrained Ridge Regression model with feature scaling to handle multicollinearity'
            },
            {
                role: 'Technical Intern – System Design & PHP Dev',
                company: 'BluePlanet Solutions, Livingston, NJ',
                duration: 'MAR 2024 – SEPT 2025',
                description: 'Modernized StartupWorld and SmartCookie platforms from PHP to NextJS + Node JS stack\nDesigned a full-scale ATS with MongoDB, PostgreSQL, and React with dynamic filtering\nNormalized legacy databases and guided 40+ developers in data migration and UI improvement'
            }
        ]
    });

    console.log("Inserting Achievements data...");
    await prisma.achievement.createMany({
        data: [
            { number: 'AIR 1', label: 'IIT Bombay E-Summit 2025 — National Entrepreneurship Challenge', span: true },
            { number: '2nd', label: 'KIT E-Cell Kolhapur — Western Entrepreneurship Challenge', span: false },
            { number: 'AIR 5', label: 'IIT Bombay E-Summit 2024 — Basic Track', span: false },
            { number: '800+', label: 'Students on BATUExams.in', span: false },
            { number: '1000+', label: 'Participants at Aarambh 24 Fest', span: false },
            { number: '500+', label: 'Scholarship submissions managed', span: false },
            { number: '40+', label: 'Developers mentored', span: false },
            { number: '7+', label: 'Startups mentored in biotech, agri, ed-tech', span: true },
        ]
    });

    console.log("Inserting Leadership data...");
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

    console.log("Database seeded successfully!");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
