import { PrismaClient } from "@prisma/client";
import { User, Shoe } from "@prisma/client";
const prisma = new PrismaClient();

// export async function main() {
export const createNewUser = async (user: User) => {
  await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
      username: user.username,
      clerkId: user.clerkId,
    },
  });
};
// Create new shoes
export const createNewShoe = async (shoe: Shoe, userId: string) => {
  return await prisma.shoe.create({
    data: {
      name: shoe.name,
      description: shoe.description,
      price: shoe.price,
      url: shoe.url,
      image: shoe.image,
      createdBy: {
        connect: { id: userId },
      },
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
  console.log("attempting to make user shoes relationship");
  return await prisma.usersToShoesFavorites.create({
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

export const searchShoes = async (query: string): Promise<Shoe[]> => {
  return await prisma.shoe.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        {
          tags: {
            some: { tag: { text: { contains: query, mode: "insensitive" } } },
          },
        },
      ],
    },
    include: {
      tags: true, // Include tags in the result if needed
    },
  });
};
