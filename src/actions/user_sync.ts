"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Syncs a Stack Auth user to our local database.
 * Called on every authenticated page load. Creates user on first visit, updates on subsequent visits.
 */
export async function syncUserToDb(stackUser: {
	id: string;
	primaryEmail: string | null;
	displayName: string | null;
	profileImageUrl: string | null;
}) {
	const email = stackUser.primaryEmail || "unknown@hoardify.com";
	
	const existing = await db.select().from(users).where(eq(users.id, stackUser.id)).limit(1);
	
	if (existing.length === 0) {
		// Determine role: shaswatraj3@gmail.com gets Admin by default
		const isDefaultAdmin = email.toLowerCase() === "shaswatraj3@gmail.com";
		
		await db.insert(users).values({
			id: stackUser.id,
			email,
			name: stackUser.displayName,
			imageUrl: stackUser.profileImageUrl,
			role: isDefaultAdmin ? "Admin" : "Customer",
		});
		
		return { created: true, role: isDefaultAdmin ? "Admin" as const : "Customer" as const };
	}
	
	// Update existing user info (name/image may change)
	await db.update(users).set({
		name: stackUser.displayName,
		imageUrl: stackUser.profileImageUrl,
		email,
		updatedAt: new Date(),
	}).where(eq(users.id, stackUser.id));
	
	return { created: false, role: existing[0].role as "Admin" | "Customer" | "Owner" };
}

/**
 * Check if a user has admin role in our DB.
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
	const result = await db.select({ role: users.role }).from(users).where(eq(users.id, userId)).limit(1);
	return result.length > 0 && result[0].role === "Admin";
}

/**
 * Get user's DB role.
 */
export async function getUserRole(userId: string): Promise<string | null> {
	const result = await db.select({ role: users.role }).from(users).where(eq(users.id, userId)).limit(1);
	return result.length > 0 ? result[0].role : null;
}
