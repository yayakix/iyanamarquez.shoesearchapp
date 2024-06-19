import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a user
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Tyler",
  //     email: "tyler@prisma.io",
  //     avatar_url: "tylerspfp.com",
  //   },
  // });
  // console.log(user);
  // Create a shoe
  // const shoecreation = await prisma.shoe.create({
  //   data: {
  //     price: "700",
  //     name: "hulk 400s",
  //     description: "may increase overall strength",
  //     url: "https://i.ebayimg.com/images/g/ZL0AAOSwYiRlJMZc/s-l1600.webp",
  //   },
  // });
  // console.log(shoecreation);
}

// Create a Tag
// const tagCreation = await prisma.tags.create({
//   data: {
//     text: "swag",
//   },
// });
// console.log(tagCreation);

// Favorite a shoe as a user
// shoeid  clxm4lptj0000riqvdjflcnfi
// userid clxm4hnxg0000127n543sm1js

// const updateUsers = await prisma.usersToShoesFavorites.create({
//   data: {
//     userId: "clxm4hnxg0000127n543sm1js",
//     shoeId: "clxm4lptj0000riqvdjflcnfi",
//   },
// });
// console.log(updateUsers);
// }

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
