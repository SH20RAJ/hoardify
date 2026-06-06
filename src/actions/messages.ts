"use server";

import { db } from "@/db";
import { messages, enquiries, hoardings } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getConversationsByEmail(email: string) {
	try {
		const userEnquiries = await db.query.enquiries.findMany({
			where: eq(enquiries.email, email),
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
	} catch (error) {
		console.error("Failed to fetch conversations by email:", error);
		return [];
	}
}

export async function getConversationsByUserId(userId: string) {
	try {
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
	} catch (error) {
		console.error("Failed to fetch conversations by user ID:", error);
		return [];
	}
}

export async function getUserConversations(userId?: string, email?: string) {
	if (!userId && !email) return [];
	
	try {
		const result = await db.query.enquiries.findMany({
			where: (table, { or, eq }) => {
				const conditions = [];
				if (userId) conditions.push(eq(table.userId, userId));
				if (email) conditions.push(eq(table.email, email));
				return or(...conditions);
			},
			with: {
				hoarding: true,
				messages: {
					orderBy: [desc(messages.createdAt)],
					limit: 1,
				},
			},
			orderBy: [desc(enquiries.createdAt)],
		});
		return result;
	} catch (error) {
		console.error("Failed to fetch user conversations:", error);
		return [];
	}
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
	revalidatePath(`/admin/enquiries/${enquiryId}`);
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
