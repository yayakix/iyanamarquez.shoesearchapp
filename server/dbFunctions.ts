import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { User } from "../types/types.types";

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
// Create new shoes
export const createNewShoe = async (shoe) => {
  await prisma.shoe.create({
    data: {
      name: shoe.name,
      description: shoe.description,
      price: shoe.price,
      url: shoe.link,
      image: shoe.imgUrl,
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

export const deleteShoe = async (shoeId: string) => {
  // Delete a shoe
  await prisma.shoe.delete({
    where: {
      id: shoeId,
    },
  });
};
