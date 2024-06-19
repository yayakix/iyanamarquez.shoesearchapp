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

export const addFavoriteShoeToUser = async (userId: string, shoeId: string) => {
  // Create a user and shoe relationship
  prisma.usersToShoesFavorites.create({
    data: {
      userId: userId,
      shoeId: shoeId,
    },
  });
};
