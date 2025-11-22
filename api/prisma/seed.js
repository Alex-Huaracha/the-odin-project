import { prisma } from './client.js';

async function main() {
  const level = await prisma.level.create({
    data: {
      name: 'Pokemon Cafe',
      characters: {
        create: [
          { name: 'Magikarp', minX: 1.33, maxX: 4.53, minY: 5.49, maxY: 9.2 },
          { name: 'Weedle', minX: 87.38, maxX: 90.13, minY: 95.6, maxY: 99.73 },
          { name: 'Seadra', minX: 0.71, maxX: 4.36, minY: 55.63, maxY: 69.64 },
          {
            name: 'Magnemite',
            minX: 75.2,
            maxX: 79.11,
            minY: 6.46,
            maxY: 8.65,
          },
        ],
      },
    },
  });
  console.log('Data inserted:', level);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
