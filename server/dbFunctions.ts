import { PrismaClient } from "@prisma/client";
import { User } from "../types/types.types";

const prisma = new PrismaClient();

// export async function main() {
export const createNewUser = async (user: User) => {
  await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
    },
  });
};
// getAllShoes
export const getAllShoes = async () => {
  return await prisma.shoe.findMany();
};

// Get all of a users favorite shoes
export const getFavoriteShoes = async (userId: string) => {
  return await prisma.shoe.findMany({
    where: {
      favoritedBy: {
        some: { userId: userId },
      },
    },
  });
};
export const getOneShoe = async (shoeId: string) => {
  return await prisma.shoe.findFirst({
    where: { id: shoeId },
  });
};

export const addFavoriteShoeToUser = async (userId: string, shoeId: string) => {
  // Create a user and shoe relationship
  await prisma.usersToShoesFavorites.create({
    data: {
      userId: userId,
      shoeId: shoeId,
    },
  });
};

export const removeFavoriteShoeFromUser = async (
  userId: string,
  shoeId: string
) => {
  // Create a user and shoe relationship
  const relationship = await prisma.usersToShoesFavorites.findFirst({
    where: {
      user: {
        id: userId,
      },
      shoe: {
        id: shoeId,
      },
    },
  });
  const relationshipId = relationship?.id;
  await prisma.usersToShoesFavorites.delete({
    where: {
      id: relationshipId,
    },
  });
};
