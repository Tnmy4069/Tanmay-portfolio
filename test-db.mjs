import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const blog = await prisma.blog.findFirst({ where: { published: true }});
  console.log(blog?.slug);
}
main().catch(console.error).finally(() => prisma.$disconnect());
