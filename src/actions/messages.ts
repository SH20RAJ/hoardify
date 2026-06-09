"use server";

import { db } from "@/db";
import { messages, enquiries, hoardings } from "@/db/schema";
import { eq, desc, and, or, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { stackServerApp } from "@/stack/server";
import { syncUserToDb } from "@/actions/user_sync";

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

async function getExistingAdminConversation(userId: string, email?: string) {
	if (!userId && !email) return null;

	return await db.query.enquiries.findFirst({
		where: (table, { and, eq }) => {
			const conditions = [isNull(table.hoardingId)];
			if (userId) conditions.push(eq(table.userId, userId));
			if (email) conditions.push(eq(table.email, email));
			return and(...conditions);
		},
		orderBy: [desc(enquiries.createdAt)],
	});
}

export async function getOrCreateAdminConversation(userId: string, email: string, name: string) {
	const normalizedEmail = email || "unknown@hoardify.com";

	const existingConversation = await getExistingAdminConversation(userId, normalizedEmail);
	if (existingConversation) {
		return existingConversation;
	}

	await syncUserToDb({
		id: userId,
		primaryEmail: normalizedEmail,
		displayName: name,
		profileImageUrl: null,
	});

	await db.insert(enquiries).values({
		hoardingId: null,
		userId,
		name: name || "Hoardify user",
		phone: "unknown",
		email: normalizedEmail,
		message: "Hi Admin, I want to chat about my account and hoarding inquiries.",
		status: "New",
	});

	revalidatePath("/inbox");

	return await getExistingAdminConversation(userId, normalizedEmail);
}

export async function createHoardingEnquiry(hoardingId: number, startDate: Date, endDate: Date) {
	let user;
	try {
		user = await stackServerApp.getUser();
	} catch {
		throw new Error("Authentication service unavailable. Please try again.");
	}

	if (!user) {
		throw new Error("You must be logged in to check availability.");
	}

	await syncUserToDb({
		id: user.id,
		primaryEmail: user.primaryEmail,
		displayName: user.displayName,
		profileImageUrl: user.profileImageUrl,
	});

	const email = user.primaryEmail || "unknown@hoardify.com";
	const formattedStart = startDate.toLocaleDateString();
	const formattedEnd = endDate.toLocaleDateString();

	// Ensure admin chat exists for this user (platform/admin panel)
	// Inbox will always have a "Chat with Admin" option; this makes sure it is provisioned
	// when user starts a hoarding availability request.
	await getOrCreateAdminConversation(user.id, email, user.displayName || "Hoardify user");

	const existing = await db.query.enquiries.findFirst({
		where: (table, { and, eq }) => and(eq(table.hoardingId, hoardingId), eq(table.userId, user.id)),
		orderBy: [desc(enquiries.createdAt)],
	});

	if (existing) {
		// Still revalidate inbox and hoarding detail
		revalidatePath("/inbox");
		revalidatePath(`/hoardings/${hoardingId}`);
		return existing;
	}

	const enquiryMessage = `Hi team, I want to check availability for this hoarding from ${formattedStart} to ${formattedEnd}. Please share the next steps.`;

	await db.insert(enquiries).values({
		hoardingId,
		userId: user.id,
		name: user.displayName || "Hoardify user",
		phone: "unknown",
		email,
		message: enquiryMessage,
		status: "New",
	});

	revalidatePath("/inbox");
	revalidatePath(`/hoardings/${hoardingId}`);

	// Return the created enquiry (or latest) for this hoarding & user.
	// Important: keep this as a findFirst so existing unit tests that mock
	// findFirst return values continue to pass.
	return await db.query.enquiries.findFirst({
		where: (table, { and, eq }) => and(eq(table.hoardingId, hoardingId), eq(table.userId, user.id)),
		orderBy: [desc(enquiries.createdAt)],
	});
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
