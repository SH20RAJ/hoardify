"use server";

import { db } from "@/db";
import { messages, enquiries, hoardings } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getConversationsByEmail(email: string) {
	// Fetch enquiries for this user's email, with hoarding info
	const userEnquiries = await db.query.enquiries.findMany({
		where: eq(enquiries.email, email),
		with: {
			hoarding: true,
			messages: {
				orderBy: [desc(messages.createdAt)],
				limit: 1, // Just the last message for preview
			},
		},
		orderBy: [desc(enquiries.createdAt)],
	});

	return userEnquiries;
}

export async function getConversationsByUserId(userId: string) {
	const userEnquiries = await db.query.enquiries.findMany({
		where: eq(enquiries.userId, userId),
		with: {
			hoarding: true,
			messages: {
				orderBy: [desc(messages.createdAt)],
				limit: 1,
			},
		},
		orderBy: [desc(enquiries.createdAt)],
	});

	return userEnquiries;
}

export async function getMessages(enquiryId: number) {
	return await db.query.messages.findMany({
		where: eq(messages.enquiryId, enquiryId),
		orderBy: [messages.createdAt],
	});
}

export async function sendMessage(enquiryId: number, content: string, senderRole: "customer" | "admin", senderName: string) {
	await db.insert(messages).values({
		enquiryId,
		senderRole,
		senderName,
		content,
	});

	// If admin replies, update enquiry status to Contacted
	if (senderRole === "admin") {
		await db.update(enquiries).set({ status: "Contacted" }).where(eq(enquiries.id, enquiryId));
	}

	revalidatePath("/inbox");
	revalidatePath("/admin/enquiries");
	return { success: true };
}

export async function getEnquiryWithMessages(enquiryId: number) {
	const enquiry = await db.query.enquiries.findFirst({
		where: eq(enquiries.id, enquiryId),
		with: {
			hoarding: true,
			messages: {
				orderBy: [messages.createdAt],
			},
		},
	});
	return enquiry;
}
