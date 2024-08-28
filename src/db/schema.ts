import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const testing = pgTable("testing", {
  id: text("id").primaryKey(),
  name: varchar("name"),
});
