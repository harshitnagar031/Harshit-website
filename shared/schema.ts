import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  stars: text("stars").notNull(),
  language: text("language"),
  topics: jsonb("topics").notNull().$type<string[]>(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({ 
  id: true 
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
