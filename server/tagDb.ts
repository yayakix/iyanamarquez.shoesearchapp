import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createNewTag = async (name: string) => {
  await prisma.tags.create({
    data: {
      text: name,
    },
  });
};
