import "dotenv/config";
import dotenv from "dotenv";
import path from "path";
import { defineConfig, env } from "prisma/config";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: `mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  },
});