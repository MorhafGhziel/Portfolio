import { PrismaClient } from "@prisma/client";

/**
 * A single PrismaClient for the whole process.
 *
 * Next's dev server re-evaluates modules on every hot reload. Without this
 * global, each reload would open a fresh pool and the database would refuse
 * connections after a few dozen edits.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
