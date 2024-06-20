import { describe, expect, expectTypeOf, test, it, beforeEach } from "vitest";
import { PrismaClient } from "@prisma/client";
import seed from "./seed";
import supertest from "supertest";
import app from "./server";
const prisma = new PrismaClient();

const url = process.env.URL;

beforeEach(async () => {
  await seed();
});

describe("Test DB is loaded", () => {
  it("has the right DB test URL", async () => {
    expect(process.env.DATABASE_URL).toBe(
      "postgresql://postgres:postgres@localhost:10069/postgres"
    );
  });
});

describe("Test env URL is correct", () => {
  it("has the right test URL", async () => {
    expect(url).toBe("http://localhost:4000");
  });
});

describe("User to Shoe Relationship ", () => {
  const data = {
    userId: "1",
    shoeId: "1",
  };
  it("creates a user to shoe relationship, verifies creation", async () => {
    const response = await supertest(app)
      .post("/favorite/user/shoe")
      .set({ "Content-Type": "application/json" })
      .send(data);

    expect(response.status).toBe(200);
    const usersfavshoes = prisma.usersToShoesFavorites.findMany();
    expect((await usersfavshoes).length).toBe(1);
  });
});
