import { users } from "@/db/schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";

export const usersData = [
  {
    id: "1",
    email: "kpop_enthusiast@kpopshowdown.com",
    username: "kpop_enthusiast",
    name: "K-Pop Fan",
    image: null,
    createdAt: new Date("2024-12-01T08:00:00Z"),
    updatedAt: new Date("2024-12-01T08:00:00Z"),
  },
  {
    id: "2",
    email: "twice_forever@kpopshowdown.com",
    username: "twice_forever",
    name: "TWICE Fan",
    image: null,
    createdAt: new Date("2024-12-05T10:15:00Z"),
    updatedAt: new Date("2024-12-05T10:15:00Z"),
  },
  {
    id: "3",
    email: "kpop_thoughts@kpopshowdown.com",
    username: "kpop_thoughts",
    name: "K-Pop Critic",
    image: null,
    createdAt: new Date("2024-12-10T14:30:00Z"),
    updatedAt: new Date("2024-12-10T14:30:00Z"),
  },
  {
    id: "4",
    email: "bp_forever@kpopshowdown.com",
    username: "bp_forever",
    name: "BLINK4Life",
    image: null,
    createdAt: new Date("2024-12-15T19:45:00Z"),
    updatedAt: new Date("2024-12-15T19:45:00Z"),
  },
  {
    id: "5",
    email: "redvelvet_stan@kpopshowdown.com",
    username: "redvelvet_stan",
    name: "ReVeluv",
    image: null,
    createdAt: new Date("2024-12-20T22:00:00Z"),
    updatedAt: new Date("2024-12-20T22:00:00Z"),
  },
];

export const insertUsersData = async (db: NodePgDatabase<typeof schema>) => {
  console.log("Seeding users...");

  for (const user of usersData) {
    await db.insert(users).values(user);
  }

  console.log("Users seeded successfully!");
};
