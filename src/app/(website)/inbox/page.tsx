import { Metadata } from "next";
import NavbarSync from "@/components/layout/NavbarSync";
import InboxClient from "@/components/inbox/InboxClient";
import { stackServerApp } from "@/stack/server";
import { getMessages, getUserConversations } from "@/actions/messages";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Inbox | Hoardify",
	description: "Communicate with hoarding owners and manage your direct inquiries on Hoardify.",
};

export default async function InboxPage() {
	let user = null;
	try {
		user = await stackServerApp.getUser();
	} catch {
		// Auth unavailable
	}

	if (!user) {
		return (
			<div className="flex flex-col min-h-screen pb-32 bg-white">
				<NavbarSync title="Inbox" isLogo={false} />
				<div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
					<h1 className="text-2xl md:text-3xl font-bold text-[#222222] mb-6 md:mb-8">Inbox</h1>
					<div className="py-20 flex flex-col items-center justify-center text-center border-t border-[#ebebeb]">
						<h2 className="text-xl font-semibold text-[#222222] mb-2">Sign in to see your messages</h2>
						<p className="text-base text-[#717171] max-w-[320px] mb-6">
							Log in to view and respond to your hoarding enquiries.
						</p>
						<Link href="/handler/sign-in" className="px-8 py-3 bg-[#222222] text-white rounded-lg font-bold hover:bg-black transition-colors">
							Log In
						</Link>
					</div>
				</div>
			</div>
		);
	}

	// Fetch conversations for this user
	const conversations = await getUserConversations(user.id, user.primaryEmail || undefined);

	return (
		<div className="flex flex-col min-h-screen pb-32 bg-white">
			<NavbarSync title="Inbox" isLogo={false} />
			<div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 md:py-8">
				<h1 className="text-2xl font-bold text-[#222222] mb-6">Messages</h1>
				<InboxClient
					conversations={conversations}
					userId={user.id}
					userName={user.displayName || "User"}
					userEmail={user.primaryEmail || ""}
				/>
			</div>
		</div>
	);
}
