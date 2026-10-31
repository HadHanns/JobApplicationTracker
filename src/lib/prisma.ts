import { PrismaClient } from "@prisma/client";

/** Creates a Prisma client using local SQLite for development. */
export function getDb() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}
