import { prisma } from './client.js';

async function main() {
  const level = await prisma.level.create({
    data: {
      name: 'Pokemon Cafe',
      characters: {
        create: [
          { name: 'Seadra', minX: 0, maxX: 10, minY: 0, maxY: 10 },
          { name: 'Weedle', minX: 0, maxX: 10, minY: 0, maxY: 10 },
          { name: 'Magikarp', minX: 0, maxX: 10, minY: 0, maxY: 10 },
        ],
      },
    },
  });
  console.log('Data inserted:', level);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
