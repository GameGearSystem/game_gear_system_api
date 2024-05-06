import { PrismaClient } from '@prisma/client';

import { startSeed } from './seeds/games';

const prisma = new PrismaClient();

async function main() {
  await startSeed(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });