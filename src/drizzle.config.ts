import type { Config } from "drizzle-kit";

export default {
  schema: "./db/drizzleschema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  dialect: "mysql",
  strict: true,
} satisfies Config;