"use server";

import { db } from "@/db";
import { bookings, hoardings } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getRecentBookings(limit = 10) {
	return await db.query.bookings.findMany({
		limit,
		orderBy: [desc(bookings.createdAt)],
		with: {
			user: true,
			hoarding: true,
		}
	});
}

export async function getAdminMetrics() {
	// In a real app, these would be physical aggregates
	// db.select({ count: count() }).from(hoardings)
	
	const allHoardings = await db.select().from(hoardings);
	const allBookings = await db.select().from(bookings);
	
	return {
		totalPlacements: allHoardings.length,
		activeBookings: allBookings.length,
		totalReach: "1.2M", // Placeholder for complex calculated metric
		newEnquiries: 12,   // Placeholder
	};
}
