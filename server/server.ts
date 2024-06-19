import bodyParser, { json } from "body-parser";
import {
  addFavoriteShoeToUser,
  getAllShoes,
  getFavoriteShoes,
  getOneShoe,
} from "./dbFunctions";
import cors from "cors";

const express = require("express");
const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/shoes", async (req, res) => {
  const shoes = await getAllShoes();
  console.log(shoes);
  // send all shoes
  res.json(shoes);
});

app.post("/shoes", (req, res) => {
  // post a new shoe to list
  res.send("new shoe created");
});

app.get("/shoes/:id", async (req, res) => {
  const shoeId = req.params.id;
  console.log(shoeId);
  const shoe = await getOneShoe(shoeId);
  console.log(shoe);
  // send details for one shoe
  res.json(shoe);
});

app.post("/favorites", async (req, res) => {
  const userId = req.body.id;
  const shoes = await getFavoriteShoes(userId);
  // send details for all favorite shoes
  res.json(shoes);
});

app.post("/shoes/:id", (req, res) => {
  // Update details for a specific shoe
  res.send("updated shoe");
});

app.post("/favorite/user/shoe", async (req, res) => {
  const userId = req.body.userId;
  const shoeId = req.body.shoeId;

  await addFavoriteShoeToUser(userId, shoeId);
  // Add shoe as a favorite for the user
  res.send("favorited shoe");
});

app.get("/user/:id", (req, res) => {
  // send details about the user
  // shoes include details about their favorites
  res.send("User details");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
