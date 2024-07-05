import bodyParser from "body-parser";
import {
  addFavoriteShoeToUser,
  createNewShoe,
  deleteShoe,
  getAllShoes,
  getFavoriteShoes,
  getOneShoe,
  removeFavoriteShoeFromUser,
  searchShoes,
} from "./dbFunctions";
import cors from "cors";
import { Shoe } from "@prisma/client";

import "dotenv/config"; // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
// clerk auth
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";

import {
  createNewTag,
  createTagOnShoe,
  deleteTag,
  getAllTags,
  getTagsOnShoe,
} from "./tagDb";

import optionalUser from "./middleware";
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get(
  "/shoes",
  // ClerkExpressRequireAuth({}),
  // optionalUser,
  async (req, res) => {
    const shoes = await getAllShoes();
    // send all shoes
    res.json(shoes);
  }
);

app.get("/shoes/search", async (req, res) => {
  const query = req.query.query as string;
  console.log("query issssss", query);
  if (!query) {
    return res.json({ error: "Query parameter is required" });
  }

  // Implement your search logic here
  const shoes = await searchShoes(query); // Assume searchShoes is a function that searches shoes based on the query
  if (shoes.length === 0) {
    return res.json({ message: "No shoes found" });
  }
  res.json(shoes);
});

app.get("/shoes/:id", async (req, res) => {
  const shoeId: string = req.params.id;
  const shoe: Shoe | null = await getOneShoe(shoeId);
  // send details for one shoe
  res.json(shoe);
});

app.post(
  "/createShoe",
  ClerkExpressRequireAuth({}),
  optionalUser,
  async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized, no User ID" });
    }
    const shoeDetails: Shoe = req.body.shoe;
    const newShoe: Shoe | null = await createNewShoe(shoeDetails, userId);
    // create a new shoe
    res.json(newShoe);
  }
);

app.post(
  "/favorites",
  ClerkExpressRequireAuth({}),
  optionalUser,
  async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized, no User ID" });
    }
    const shoes = await getFavoriteShoes(userId);
    // send details for all favorite shoes
    res.json(shoes);
  }
);

app.post("/shoes/:id", (req, res) => {
  // Update details for a specific shoe
  res.send("updated shoe");
});

app.post(
  "/favorite/user/shoe",
  ClerkExpressRequireAuth({}),
  optionalUser,
  async (req, res) => {
    const userId: string | undefined = req?.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized, no User ID" });
    }
    const shoeId: string = req.body.shoeId;
    await addFavoriteShoeToUser(userId, shoeId);
    console.log("erm that didnt wortk");
    // Add shoe as a favorite for the user
    res.send("favorited shoe");
  }
);

app.post(
  "/remove/favorite/user/shoe",
  ClerkExpressRequireAuth({}),
  optionalUser,
  async (req, res) => {
    const userId: string | undefined = req?.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized, no User ID" });
    }
    const shoeId: string = req.body.shoeId;

    await removeFavoriteShoeFromUser(userId, shoeId);
    res.send("removed shoe from favorites");
  }
);

app.get("/user/:id", (req, res) => {
  // send details about the user
  // shoes include details about their favorites
  res.send("User details");
});

app.post("/delete/shoe/:id", async (req, res) => {
  const shoeId: string = req.params.id;
  await deleteShoe(shoeId);
  // Update details for a specific shoe
  res.send("deleted shoe");
});

app.post("/createTag", async (req, res) => {
  const tagName: string = req.body.name.name;
  await createNewTag(tagName);
  // create tag
  res.send("deleted shoe");
});

app.get("/tags", async (req, res) => {
  const tags = await getAllTags();
  // send all tags
  res.json(tags);
});

app.get("/tags/:id", async (req, res) => {
  const shoeId = req.params.id;
  const tags = await getTagsOnShoe(shoeId);
  console.log(shoeId);
  // send all tags on a specific shoe
  res.json(tags);
});

app.post("/delete/tags/:id", async (req, res) => {
  const tagId = req.params.id;
  await deleteTag(tagId);
  // delete tag
  res.send("tag deleted");
});

app.post("/createTagOnShoe", async (req, res) => {
  const shoeId: string = req.body.shoeId;
  const tagId: string = req.body.tagId;
  console.log("hey there");
  console.log(shoeId, tagId);

  await createTagOnShoe(shoeId, tagId);
  // create tag on a shoe
  res.send("deleted shoe");
});

export default app;
