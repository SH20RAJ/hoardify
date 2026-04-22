"use server";

import { cookies } from "next/headers";

export async function validateAdminPasscode(passcode: string) {
	if (passcode === "17092006") {
		const cookieStore = await cookies();
		cookieStore.set("admin_unlocked", "true", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24, // 24 hours
			path: "/",
		});
		return { success: true };
	}
	return { success: false };
}

export async function isAdminUnlocked() {
	const cookieStore = await cookies();
	return cookieStore.get("admin_unlocked")?.value === "true";
}

export async function clearAdminSession() {
	const cookieStore = await cookies();
	cookieStore.delete("admin_unlocked");
}
