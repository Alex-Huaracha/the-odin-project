import { prisma } from './client.js';
import bcrypt from 'bcrypt';

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const userNormal = await prisma.user.create({
    data: {
      username: 'gymrat',
      password: hashedPassword,
      role: 'USER',
    },
  });

  await prisma.post.create({
    data: {
      title: 'Hypertrophy vs Strength: Which one to choose?',
      content: 'For aesthetics, the range of 8-12 repetitions...',
      published: true,
      authorId: admin.id,
      comments: {
        create: [
          {
            content: 'Great article! It helped me a lot.',
            authorId: userNormal.id,
          },
        ],
      },
    },
  });

  console.log('Seed updated and executed successfully 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
