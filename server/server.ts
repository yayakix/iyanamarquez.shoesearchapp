import bodyParser, { json } from "body-parser";
import {
  addFavoriteShoeToUser,
  createNewShoe,
  deleteShoe,
  getAllShoes,
  getFavoriteShoes,
  getOneShoe,
  removeFavoriteShoeFromUser,
} from "./dbFunctions";
import cors from "cors";
import { Shoe } from "../types/types.types";

import "dotenv/config"; // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
// clerk auth
import {
  clerkClient,
  ClerkExpressRequireAuth,
  ClerkExpressWithAuth,
  LooseAuthProp,
  RequireAuthProp,
  WithAuthProp,
} from "@clerk/clerk-sdk-node";
import express, { Application, Request, Response } from "express";

import {
  createNewTag,
  createTagOnShoe,
  deleteTag,
  getAllTags,
  getTagsOnShoe,
} from "./tagDb";
import { create } from "domain";
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
  ClerkExpressRequireAuth({
    // Add options here
    // See the Middleware options section for more details
  }),
  optionalUser,
  async (req, res) => {
    console.log("req", req.user);
    const shoes = await getAllShoes();
    // send all shoes
    res.json(shoes);
  }
);

app.post("/shoes", (req, res) => {
  // post a new shoe to list
  res.send("new shoe created");
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
    const userId = req.user.id;
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
    const userId = req.user.id;
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
    const userId: string = req.user.id;
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
    const userId: string = req.user.id;
    const shoeId: string = req.body.shoeId;

    await removeFavoriteShoeFromUser(userId, shoeId);
    // Add shoe as a favorite for the user
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
