"use server";

import { db } from "@/db";
import { hoardings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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
	const all = await db.select().from(hoardings);
	
	return {
		lit: all.filter(h => h.features.includes("LED Integrated") || h.features.includes("High-Traffic")).length,
		unipole: all.length,
		digital: 0,
		transit: 0
	};
}

// --- Admin CRUD Actions ---

export async function updateHoarding(
	id: number,
	data: {
		title?: string;
		price?: number;
		location?: string;
		status?: "For Rent" | "Booked" | "Maintenance";
		imageUrl?: string;
		views?: string;
		features?: string[];
		lat?: string;
		lng?: string;
	}
) {
	await db.update(hoardings).set(data).where(eq(hoardings.id, id));
	revalidatePath("/admin/hoardings");
	revalidatePath("/");
	revalidatePath(`/hoardings/${id}`);
	return { success: true };
}

export async function deleteHoarding(id: number) {
	await db.delete(hoardings).where(eq(hoardings.id, id));
	revalidatePath("/admin/hoardings");
	revalidatePath("/");
	return { success: true };
}

export async function createHoarding(data: {
	title: string;
	imageUrl: string;
	price: number;
	location: string;
	lat: string;
	lng: string;
	views?: string;
	status?: "For Rent" | "Booked" | "Maintenance";
	features?: string[];
}) {
	await db.insert(hoardings).values({
		...data,
		status: data.status || "For Rent",
		features: data.features || [],
	});
	revalidatePath("/admin/hoardings");
	revalidatePath("/");
	return { success: true };
}

