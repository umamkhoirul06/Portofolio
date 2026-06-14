import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
  json,
  pgEnum,
} from "drizzle-orm/pg-core";

// ─── ENUMs ────────────────────────────────────────────────────────────────────
export const proficiencyEnum = pgEnum("proficiency_level", [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
]);

// ─── TABLE: projects ──────────────────────────────────────────────────────────
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  clientOrType: varchar("client_or_type", { length: 100 }).notNull(),
  description: text("description").notNull(),
  problem: text("problem"),
  solution: text("solution"),
  techStackJson: json("tech_stack_json").$type<string[]>().notNull().default([]),
  imageUrl: varchar("image_url", { length: 255 }),
  liveLink: varchar("live_link", { length: 255 }),
  githubLink: varchar("github_link", { length: 255 }),
  isFeatured: integer("is_featured").default(0),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── TABLE: skills ────────────────────────────────────────────────────────────
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 50 }).notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  iconSlug: varchar("icon_slug", { length: 50 }),
  proficiencyLevel: proficiencyEnum("proficiency_level").notNull().default("intermediate"),
  proficiencyScore: integer("proficiency_score").default(80),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── TABLE: inquiries ─────────────────────────────────────────────────────────
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  recruiterName: varchar("recruiter_name", { length: 100 }).notNull(),
  company: varchar("company", { length: 100 }),
  email: varchar("email", { length: 150 }).notNull(),
  message: text("message").notNull(),
  isRead: integer("is_read").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
