"use server";

import { db } from "@/db";
import { hoardings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getHoardings() {
	return await db.select().from(hoardings).orderBy(desc(hoardings.createdAt));
}

export async function getHoardingById(id: number | string) {
	const numericId = typeof id === "string" ? parseInt(id, 10) : id;
	if (isNaN(numericId)) return null;

	const result = await db.select().from(hoardings).where(eq(hoardings.id, numericId)).limit(1);
	return result[0] || null;
}

export async function getTrendingHoardings(limit = 6) {
	return await db.select().from(hoardings).orderBy(desc(hoardings.createdAt)).limit(limit);
}

export async function getNearbyHoardings(limit = 4) {
	// For now just random subset since we don't have geo-queries yet
	return await db.select().from(hoardings).limit(limit);
}

export async function getCategoryCounts() {
	// A more complex implementation would use a join or group by if categories were a separate column
	// Since features are JSONB, we can use JSONB containment or just count the specific status/types
	
	// For now, let's just return counts based on features if applicable, or total
	const all = await db.select().from(hoardings);
	
	return {
		lit: all.filter(h => h.features.includes("LED Integrated") || h.features.includes("High-Traffic")).length,
		unipole: all.length, // Placeholder logic
		digital: 0,
		transit: 0
	};
}

