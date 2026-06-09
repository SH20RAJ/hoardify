import { relations } from "drizzle-orm/relations";
import { hoardings, bookings, users, enquiries, messages, agencies } from "./schema";

export const bookingsRelations = relations(bookings, ({one}) => ({
	hoarding: one(hoardings, {
		fields: [bookings.hoardingId],
		references: [hoardings.id]
	}),
	user: one(users, {
		fields: [bookings.userId],
		references: [users.id]
	}),
}));

export const hoardingsRelations = relations(hoardings, ({one, many}) => ({
	bookings: many(bookings),
	enquiries: many(enquiries),
	agency: one(agencies, {
		fields: [hoardings.agencyId],
		references: [agencies.id]
	}),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	bookings: many(bookings),
	agency: one(agencies, {
		fields: [users.agencyId],
		references: [agencies.id]
	}),
}));

export const enquiriesRelations = relations(enquiries, ({one, many}) => ({
	hoarding: one(hoardings, {
		fields: [enquiries.hoardingId],
		references: [hoardings.id]
	}),
	messages: many(messages),
}));

export const messagesRelations = relations(messages, ({one}) => ({
	enquiry: one(enquiries, {
		fields: [messages.enquiryId],
		references: [enquiries.id]
	}),
}));

export const agenciesRelations = relations(agencies, ({many}) => ({
	hoardings: many(hoardings),
	users: many(users),
}));