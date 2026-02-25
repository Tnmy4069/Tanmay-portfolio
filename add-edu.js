import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.education.create({
        data: {
            degree: 'B.Tech in Computer Science & Design',
            institution: "MET's Institute of Technology",
            year: '2026'
        }
    });
    console.log("Education added.");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
