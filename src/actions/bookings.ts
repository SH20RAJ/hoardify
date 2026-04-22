"use server";

import { db } from "@/db";
import { bookings, users } from "@/db/schema";
import { stackServerApp } from "@/stack/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

async function ensureUserSynced(stackUser: { id: string; primaryEmail: string | null; displayName: string | null; profileImageUrl: string | null }) {
	// Check if user exists in our DB
	const existing = await db.select().from(users).where(eq(users.id, stackUser.id)).limit(1);
	if (existing.length === 0) {
		// Create user record on first interaction
		await db.insert(users).values({
			id: stackUser.id,
			email: stackUser.primaryEmail || "unknown@hoardify.com",
			name: stackUser.displayName,
			imageUrl: stackUser.profileImageUrl,
			role: "Customer",
		});
	}
}

export async function createBooking(hoardingId: number, price: number) {
	let user;
	try {
		user = await stackServerApp.getUser();
	} catch {
		throw new Error("Authentication service unavailable. Please try again.");
	}
	
	if (!user) {
		throw new Error("You must be logged in to book a hoarding.");
	}

	// Sync user to our DB (creates record if first-time)
	await ensureUserSynced({
		id: user.id,
		primaryEmail: user.primaryEmail,
		displayName: user.displayName,
		profileImageUrl: user.profileImageUrl,
	});

	const startDate = new Date();
	const endDate = new Date();
	endDate.setMonth(endDate.getMonth() + 1); // Default 1 month

	await db.insert(bookings).values({
		hoardingId,
		userId: user.id,
		startDate,
		endDate,
		pricePaid: price,
		status: "Pending",
	});

	revalidatePath(`/hoardings/${hoardingId}`);
	revalidatePath("/profile");
	
	return { success: true };
}
