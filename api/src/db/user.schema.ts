import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// enum
const roleEnum = pgEnum("role", ["user", "admin", "seller"]);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: roleEnum().default("user"),
  name: varchar({ length: 255 }),
  address: text(),
  isVerified: boolean().default(false),
});

export const createUserSchema = createInsertSchema(usersTable).omit({
  id: true,
  role: true,
  isVerified: true,
});

export const loginUserSchema = createInsertSchema(usersTable).pick({
  email: true,
  password: true,
});
