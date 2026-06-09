import { pgTable, foreignKey, serial, integer, text, timestamp, numeric, jsonb } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const bookings = pgTable("bookings", {
	id: serial().primaryKey().notNull(),
	hoardingId: integer("hoarding_id"),
	userId: text("user_id").notNull(),
	startDate: timestamp("start_date", { mode: 'string' }).notNull(),
	endDate: timestamp("end_date", { mode: 'string' }).notNull(),
	pricePaid: integer("price_paid").notNull(),
	status: text().default('Pending').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.hoardingId],
			foreignColumns: [hoardings.id],
			name: "bookings_hoarding_id_hoardings_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "bookings_user_id_users_id_fk"
		}),
]);

export const enquiries = pgTable("enquiries", {
	id: serial().primaryKey().notNull(),
	hoardingId: integer("hoarding_id"),
	name: text().notNull(),
	phone: text().notNull(),
	email: text().notNull(),
	message: text().notNull(),
	status: text().default('New').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	userId: text("user_id"),
}, (table) => [
	foreignKey({
			columns: [table.hoardingId],
			foreignColumns: [hoardings.id],
			name: "enquiries_hoarding_id_hoardings_id_fk"
		}),
]);

export const messages = pgTable("messages", {
	id: serial().primaryKey().notNull(),
	enquiryId: integer("enquiry_id").notNull(),
	senderRole: text("sender_role").notNull(),
	senderName: text("sender_name").notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.enquiryId],
			foreignColumns: [enquiries.id],
			name: "messages_enquiry_id_enquiries_id_fk"
		}),
]);

export const hoardings = pgTable("hoardings", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	imageUrl: text("image_url").notNull(),
	price: integer().notNull(),
	location: text().notNull(),
	lat: numeric({ precision: 10, scale:  7 }).notNull(),
	lng: numeric({ precision: 10, scale:  7 }).notNull(),
	views: text(),
	status: text().default('For Rent').notNull(),
	features: jsonb().default([]).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	images: jsonb().default([]).notNull(),
	videoUrl: text("video_url"),
	description: text(),
	dimensions: text(),
	category: text(),
	lighting: text(),
	trafficCount: integer("traffic_count"),
	agencyId: integer("agency_id"),
}, (table) => [
	foreignKey({
			columns: [table.agencyId],
			foreignColumns: [agencies.id],
			name: "hoardings_agency_id_agencies_id_fk"
		}),
]);

export const agencies = pgTable("agencies", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	logoUrl: text("logo_url"),
	email: text(),
	phone: text(),
	address: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	email: text().notNull(),
	name: text(),
	imageUrl: text("image_url"),
	role: text().default('Customer').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	agencyId: integer("agency_id"),
}, (table) => [
	foreignKey({
			columns: [table.agencyId],
			foreignColumns: [agencies.id],
			name: "users_agency_id_agencies_id_fk"
		}),
]);
