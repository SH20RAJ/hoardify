"use server";

import { db } from "@/db";
import { bookings } from "@/db/schema";
import { stackServerApp } from "@/stack/server";
import { revalidatePath } from "next/cache";

export async function createBooking(hoardingId: number, price: number) {
	const user = await stackServerApp.getUser();
	if (!user) {
		throw new Error("You must be logged in to book a hoarding.");
	}

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
