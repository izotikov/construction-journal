import "dotenv/config";
<<<<<<< HEAD
import { defineConfig, env } from "prisma/config";

=======
import dotenv from "dotenv";
import path from "path";
import { defineConfig, env } from "prisma/config";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

>>>>>>> c97ec9c6f179aa1d6d198eeea1e6472b25fea050
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
<<<<<<< HEAD
    url: env("DATABASE_URL"),
=======
    url: `mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
>>>>>>> c97ec9c6f179aa1d6d198eeea1e6472b25fea050
  },
});