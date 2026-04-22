import { pgTable, text, serial, integer, decimal, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
	id: text("id").primaryKey(), // Matches Stack Auth User ID
	email: text("email").notNull(),
	name: text("name"),
	imageUrl: text("image_url"),
	role: text("role", { enum: ["Admin", "Customer", "Owner"] }).default("Customer").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	bookings: many(bookings),
}));

export const hoardings = pgTable("hoardings", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	imageUrl: text("image_url").notNull(),
	images: jsonb("images").$type<string[]>().default([]).notNull(),
	videoUrl: text("video_url"),
	price: integer("price").notNull(),
	location: text("location").notNull(),
	lat: decimal("lat", { precision: 10, scale: 7 }).notNull(),
	lng: decimal("lng", { precision: 10, scale: 7 }).notNull(),
	views: text("views"),
	status: text("status", { enum: ["For Rent", "Booked", "Maintenance"] }).default("For Rent").notNull(),
	features: jsonb("features").$type<string[]>().default([]).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const hoardingsRelations = relations(hoardings, ({ many }) => ({
	bookings: many(bookings),
	enquiries: many(enquiries),
}));

export const enquiries = pgTable("enquiries", {
	id: serial("id").primaryKey(),
	hoardingId: integer("hoarding_id").references(() => hoardings.id),
	userId: text("user_id"),
	name: text("name").notNull(),
	phone: text("phone").notNull(),
	email: text("email").notNull(),
	message: text("message").notNull(),
	status: text("status", { enum: ["New", "Contacted", "Closed"] }).default("New").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const enquiriesRelations = relations(enquiries, ({ one, many }) => ({
	hoarding: one(hoardings, {
		fields: [enquiries.hoardingId],
		references: [hoardings.id],
	}),
	messages: many(messages),
}));

export const messages = pgTable("messages", {
	id: serial("id").primaryKey(),
	enquiryId: integer("enquiry_id").references(() => enquiries.id).notNull(),
	senderRole: text("sender_role", { enum: ["customer", "admin"] }).notNull(),
	senderName: text("sender_name").notNull(),
	content: text("content").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
	enquiry: one(enquiries, {
		fields: [messages.enquiryId],
		references: [enquiries.id],
	}),
}));

export const bookings = pgTable("bookings", {
	id: serial("id").primaryKey(),
	hoardingId: integer("hoarding_id").references(() => hoardings.id),
	userId: text("user_id").references(() => users.id).notNull(), 
	startDate: timestamp("start_date").notNull(),
	endDate: timestamp("end_date").notNull(),
	pricePaid: integer("price_paid").notNull(),
	status: text("status", { enum: ["Pending", "Confirmed", "Cancelled"] }).default("Pending").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookingsRelations = relations(bookings, ({ one }) => ({
	user: one(users, {
		fields: [bookings.userId],
		references: [users.id],
	}),
	hoarding: one(hoardings, {
		fields: [bookings.hoardingId],
		references: [hoardings.id],
	}),
}));
