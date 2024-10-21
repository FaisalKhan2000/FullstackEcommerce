import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";

// enum
const roleEnum = pgEnum("role", ["user", "admin", "super-admin"]);
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: roleEnum().default("user"),
  name: varchar({ length: 255 }),
  address: text(),
  isVerified: boolean().default(false),
});
