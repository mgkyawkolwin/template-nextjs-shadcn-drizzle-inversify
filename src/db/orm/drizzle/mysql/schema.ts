import { mysqlTable, int, varchar, serial, timestamp, tinyint } from "drizzle-orm/mysql-core";


// Users table
export const user = mysqlTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 20 }).unique(),
  password: varchar("password", { length: 50 }).notNull(),
  isActive: tinyint("isActive").default(1),
  isVerified: tinyint("isVerified").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// Posts table (example with foreign key)
// export const posts = mysqlTable("posts", {
//   id: serial("id").primaryKey(),
//   title: varchar("title", { length: 255 }).notNull(),
//   userId: int("user_id").references(() => user.id),
// });

// Export TypeScript types
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert; // For INSERT queries