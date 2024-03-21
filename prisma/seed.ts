// seed note data for prisma
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const note1 = await prisma.note.create({
    data: {
      title: 'Note 1',
      content: 'This is the first note',
    },
  });
  const note2 = await prisma.note.create({
    data: {
      title: 'Note 2',
      content: 'This is the second note',
    },
  });
  const note3 = await prisma.note.create({
    data: {
      title: 'Note 3',
      content: 'This is the third note',
    },
  });
  console.log({ note1, note2, note3 });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
