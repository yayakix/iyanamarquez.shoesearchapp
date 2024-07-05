import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seed = async () => {
  await prisma.tags.deleteMany({
    where: {},
  });
  await prisma.usersToShoesFavorites.deleteMany({
    where: {},
  });
  await prisma.user.deleteMany({
    where: {},
  });
  await prisma.shoe.deleteMany({
    where: {},
  });
  await prisma.user.createMany({
    data: [
      {
        id: "1",
        name: "Bob",
        email: "BobMail@mail.com",
        avatar_url: "fakeimg.url",
        username: "Bob",
        clerkId: "1",
      },
      {
        id: "2",
        name: "Jerald",
        email: "JeraldMail@mail.com",
        avatar_url: "fakeimg.url",
        username: "Jerald",
        clerkId: "2",
      },
      {
        id: "3",
        name: "Ryan",
        email: "RyanMail@mail.com",
        avatar_url: "fakeimg.url",
        username: "Ryan",
        clerkId: "3",
      },
    ],
  });

  await prisma.shoe.createMany({
    data: [
      {
        id: "1",
        name: "nike",
        description: "normal brand shoe",
        price: "300",
        url: "url@Link.com",
        image: "imglink.com",
        createdById: "1",
      },
      {
        id: "2",
        name: "adidas",
        description: "lines on the shoe",
        createdById: "2",
        price: "350",
        url: "url@Link.com",
        image: "imglink.com",
      },
      {
        id: "3",
        name: "sketchers",
        description: "for the fast people",
        createdById: "3",
        price: "200",
        url: "url@Link.com",
        image: "imglink.com",
      },
    ],
  });
};

export default seed;
