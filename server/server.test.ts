import { describe, expect, expectTypeOf, test } from "vitest";
import { PrismaClient } from "@prisma/client";

const url = process.env.URL;

describe("Request server data", () => {
  test("Gets all shoes", () => {
    async () => {
      const response = await fetch(`${url}/shoes`);
      const body = await response.json();
      expectTypeOf(body).toBeArray;
      expect(response.status).toBe(200);
    };
  });
  test("Gets a string message back", () => {
    async () => {
      const response = await fetch(`${url}/favorite/shoe`);
      const body = await response.json();
      expectTypeOf(body).toBeString;
      expect(response.status).toBe(200);
    };
  });
});
