import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma";
import { env } from "../config/env";

<<<<<<< HEAD
const adapter = new PrismaMariaDb({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
=======
const dbUrl = new URL(env.DATABASE_URL!);

const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: Number(dbUrl.port) || 3306,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace(/^\//, ""),
>>>>>>> c97ec9c6f179aa1d6d198eeea1e6472b25fea050
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

export { prisma };