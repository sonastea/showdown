import { connect } from "@planetscale/database";
import { InferModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { meme, vote } from "drizzle/schema";

const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});

export type Meme = InferModel<typeof meme>;
export type Vote = InferModel<typeof vote>;

export const db = drizzle(connection);
