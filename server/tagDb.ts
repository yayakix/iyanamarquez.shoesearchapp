import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createNewTag = async (name: string) => {
  await prisma.tags.create({
    data: {
      text: name,
    },
  });
};

export const getTagIdFromTagName = async (name: string) => {
  return await prisma.tags.findFirst({
    where: { text: name },
  });
};

export const createTagOnShoe = async (shoeId: string, tagId: string) => {
  await prisma.shoesToTags.create({
    data: {
      tagId: tagId,
      shoeId: shoeId,
    },
  });
};

export const getAllTags = async () => {
  return await prisma.tags.findMany();
};

export const getTagsOnShoe = async (shoeId: string) => {
  return await prisma.tags.findMany({
    where: {
      shoes: {
        some: {
          shoeId: shoeId,
        },
      },
    },
  });
};

export const deleteTag = async (tagId: string) => {
  await prisma.shoesToTags.delete({
    where: {
      id: tagId,
    },
  });
};
