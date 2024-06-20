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
      },
      {
        id: "2",
        name: "Jerald",
        email: "JeraldMail@mail.com",
        avatar_url: "fakeimg.url",
      },
      {
        id: "3",
        name: "Ryan",
        email: "RyanMail@mail.com",
        avatar_url: "fakeimg.url",
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
      },
      {
        id: "2",
        name: "adidas",
        description: "lines on the shoe",
        price: "350",
        url: "url@Link.com",
        image: "imglink.com",
      },
      {
        id: "3",
        name: "sketchers",
        description: "for the fast people",
        price: "200",
        url: "url@Link.com",
        image: "imglink.com",
      },
    ],
  });
};

export default seed;
