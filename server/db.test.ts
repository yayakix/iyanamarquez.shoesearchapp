import { describe, expect, expectTypeOf, test, it } from "vitest";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const url = process.env.URL;

describe("Test DB is loaded", () => {
  it("has the right test URL", () => {
    expect(process.env.DATABASE_URL).toBe(
      "postgresql://postgres:postgres@localhost:10069/postgres"
    );
  });
});
