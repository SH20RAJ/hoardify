"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";

export default function SignOutButton() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleSignOut = async () => {
		setLoading(true);
		try {
			// Stack Auth client-side sign out
			const { stackClientApp } = await import("@/stack/client");
			await stackClientApp.signOut();
			router.push("/landing");
			router.refresh();
		} catch {
			alert("Failed to sign out");
		} finally {
			setLoading(false);
		}
	};

	return (
		<button
			onClick={handleSignOut}
			disabled={loading}
			className="flex items-center gap-3 w-full py-4 text-left text-red-500 hover:text-red-600 transition-colors"
		>
			{loading ? <Loader2 size={20} className="animate-spin" /> : <LogOut size={20} />}
			<span className="text-base font-medium">{loading ? "Signing out..." : "Log out"}</span>
		</button>
	);
}
