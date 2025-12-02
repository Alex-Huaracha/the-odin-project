import { prisma } from './client.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('🌱 Starting seeding for Spotter...');

  await prisma.like.deleteMany();
  await prisma.post.deleteMany();
  await prisma.follows.deleteMany();
  await prisma.user.deleteMany();

  console.log('Database cleared.');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123456', salt);

  const guestUser = await prisma.user.create({
    data: {
      username: 'guest',
      email: 'guest@spotter.com',
      password: hashedPassword,
      bio: 'Tech recruiter visiting Spotter. Looking for Full Stack talent. 💻💪',
      gymGoals: 'Hire Developers',
      experience: 'Coach',
      avatarUrl: 'https://api.dicebear.com/9.x/bottts/svg?seed=Liam',
    },
  });
  console.log('Guest User created.');

  // 4. Create Random Users
  const randomUsers = [];
  const gymGoals = [
    'Hypertrophy',
    'Strength',
    'Fat loss',
    'Endurance',
    'Calisthenics',
    'Crossfit',
  ];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Coach'];

  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    const username =
      faker.internet.username({ firstName }).toLowerCase() +
      Math.floor(Math.random() * 100);

    const user = await prisma.user.create({
      data: {
        username,
        email: faker.internet.email({ firstName }),
        password: hashedPassword,
        bio: faker.lorem.sentence(),
        gymGoals: gymGoals[Math.floor(Math.random() * gymGoals.length)],
        experience: levels[Math.floor(Math.random() * levels.length)],
        avatarUrl: faker.image.avatar(),
      },
    });
    randomUsers.push(user);
  }
  console.log(`${randomUsers.length} random users created.`);

  // MERGE ALL USERS (Guest + Randoms)
  const allUsers = [guestUser, ...randomUsers];

  // 6. Create Posts
  const posts = [];
  const gymTopics = [
    'Leg day today and I can’t walk! 💀',
    'New bench PR: 100kg! Let’s go 💪',
    'Has anyone tried this brand’s creatine monohydrate?',
    'Post-workout recipe: Oats, whey, and banana. 🥞',
    'Active rest day. Important for growth.',
    'I hate Bulgarian split squats. End of statement.',
    'Looking for a workout partner for mornings.',
  ];

  await prisma.post.create({
    data: {
      content: 'Hello everyone! Testing this application.',
      authorId: guestUser.id,
    },
  });

  for (const user of allUsers) {
    const numPosts = Math.floor(Math.random() * 4) + 1; // Between 1 and 4 posts
    for (let j = 0; j < numPosts; j++) {
      const post = await prisma.post.create({
        data: {
          content: `${
            gymTopics[Math.floor(Math.random() * gymTopics.length)]
          } ${faker.lorem.sentence()}`,
          authorId: user.id,
        },
      });
      posts.push(post);
    }
  }
  console.log(`Posts created.`);

  // Create Follows (Social Web) 🕸️
  for (const user of allUsers) {
    // Exclude self
    const possibleTargets = allUsers.filter((u) => u.id !== user.id);

    // This code makes the Guest follow exactly 5 users to showcase suggestions
    // Other users follow between 1 and 4 random users
    const isGuest = user.id === guestUser.id;
    const followingCount = isGuest ? 5 : Math.floor(Math.random() * 4) + 1;

    // Shuffle and take N users
    const toFollow = possibleTargets
      .sort(() => 0.5 - Math.random())
      .slice(0, followingCount);

    for (const target of toFollow) {
      await prisma.follows.create({
        data: {
          followerId: user.id,
          followingId: target.id,
        },
      });
    }
  }

  const randomPosts = posts.sort(() => 0.5 - Math.random()).slice(0, 5);
  for (const post of randomPosts) {
    await prisma.like.create({
      data: {
        userId: guestUser.id,
        postId: post.id,
      },
    });
  }

  console.log(`Follows & Likes created.`);
  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
