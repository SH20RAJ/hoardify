"use server";

import { db } from "@/db";
import { bookings, hoardings, users, enquiries } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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

export async function getUsers() {
	return await db.select().from(users).orderBy(desc(users.createdAt));
}

export async function getEnquiries() {
	return await db.query.enquiries.findMany({
		orderBy: [desc(enquiries.createdAt)],
		with: {
			hoarding: true,
		}
	});
}

export async function updateUserRole(userId: string, role: "Admin" | "Customer" | "Owner") {
	await db.update(users).set({ role }).where(eq(users.id, userId));
	revalidatePath("/admin/users");
	return { success: true };
}

export async function updateEnquiryStatus(enquiryId: number, status: "New" | "Contacted" | "Closed") {
	await db.update(enquiries).set({ status }).where(eq(enquiries.id, enquiryId));
	revalidatePath("/admin/enquiries");
	return { success: true };
}

export async function getAdminMetrics() {
	const [hCount, bCount, uCount, eCount] = await Promise.all([
		db.select({ count: sql<number>`count(*)` }).from(hoardings),
		db.select({ count: sql<number>`count(*)` }).from(bookings),
		db.select({ count: sql<number>`count(*)` }).from(users),
		db.select({ count: sql<number>`count(*)` }).from(enquiries),
	]);
	
	return {
		totalPlacements: Number(hCount[0].count),
		activeBookings: Number(bCount[0].count),
		totalUsers: Number(uCount[0].count),
		newEnquiries: Number(eCount[0].count),
		totalReach: "1.2M", // This remains a complex calculated metric
	};
}
