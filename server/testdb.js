import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.shoe.deleteMany();
  const user = await prisma.shoe.delete({});
  console.log(user);
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
  // const shoeData = [
  //   {
  //     price: "120",
  //     name: "Nike Air Max 90",
  //     description: "Iconic Nike sneakers with Air Max technology.",
  //     url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/4d940df5-63ff-4a06-9ba0-6e2b13e5eac7/air-max-90-mens-shoes-m9VlZZ.jpg",
  //   },
  //   {
  //     price: "180",
  //     name: "Adidas Ultraboost 21",
  //     description: "High-performance running shoes with Boost cushioning.",
  //     url: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/6832504c372e4cf9a61aac87010e5c3a_9366/Ultraboost_21_Shoes_Black_FY0374_01_standard.jpg",
  //   },
  //   {
  //     price: "150",
  //     name: "New Balance Fresh Foam 1080v11",
  //     description: "Comfortable and supportive running shoes.",
  //     url: "https://nb.scene7.com/is/image/NB/m1080f11_nb_02_i?$pdpflexf2$&fmt=webp",
  //   },
  //   {
  //     price: "110",
  //     name: "Puma RS-X3",
  //     description: "Modern sneakers with retro styling and RS cushioning.",
  //     url: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/373215/01/fnd/IND/fmt/png/RS-X3_Soft_Mens_Sneakers_PNG1.png",
  //   },
  //   {
  //     price: "85",
  //     name: "Converse Chuck Taylor All Star",
  //     description: "Classic canvas sneakers with timeless style.",
  //     url: "https://www.converse.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-converse-master-catalog/default/dw44650031/images/a_107/169034C_A_107X1.jpg?sw=978",
  //   },
  // ];
  // shoeData.forEach(async (shoe) => {
  //   const shoecreation = await prisma.shoe.create({
  //     data: {
  //       price: shoe.price,
  //       name: shoe.name,
  //       description: shoe.description,
  //       url: shoe.url,
  //     },
  //   });
  // });
  //   const shoecreation = await prisma.shoe.create({
  //     data: {
  //       price: "700",
  //       name: "hulk 400s",
  //       description: "may increase overall strength",
  //       url: "https://i.ebayimg.com/images/g/ZL0AAOSwYiRlJMZc/s-l1600.webp",
  //     },
  //   });
  //   console.log(shoecreation);
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
