import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  thumbnailUrl: text("thumbnail_url").notNull(),
  videoUrl: text("video_url").notNull(),
  type: text("type", { enum: ["self_hosted", "youtube", "external"] }).notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
});

export const insertMovieSchema = createInsertSchema(movies).omit({ id: true });
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertUserSchema = createInsertSchema(users).omit({ id: true });

export type Movie = typeof movies.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type User = typeof users.$inferSelect;

export type InsertMovie = z.infer<typeof insertMovieSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
