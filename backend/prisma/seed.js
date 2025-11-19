import { prisma } from './client.js';
import bcrypt from 'bcrypt';

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  const author = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      role: 'ADMIN',
      posts: {
        create: [
          {
            title: 'Hypertrophy vs Strength: Which to Choose?',
            content:
              'For aesthetics, the range of 8-12 repetitions is usually ideal...',
            published: true,
            comments: {
              create: [
                {
                  content: 'Great article! It helped me a lot.',
                  username: 'GymNewbie2025',
                },
              ],
            },
          },
          {
            title: 'The Truth About Creatine',
            content:
              'It is the supplement with the most scientific evidence...',
            published: false,
          },
        ],
      },
    },
  });

  console.log('Seed executed successfully 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
