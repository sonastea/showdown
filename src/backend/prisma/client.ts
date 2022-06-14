import { Prisma, PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma:
    | PrismaClient<
        Prisma.PrismaClientOptions,
        "query" | "info" | "warn" | "error"
      >
    | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
    ],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

prisma.$on("query", (e: Prisma.QueryEvent) => {
  console.log("Query: " + e.query + " [Duration: " + e.duration + "ms]");
});
