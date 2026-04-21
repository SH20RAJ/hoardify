import { Metadata } from "next";
import NavbarSync from "@/components/layout/NavbarSync";

export const metadata: Metadata = {
	title: "Inbox | Hoardify",
	description: "Communicate with hoarding owners and manage your direct inquiries on Hoardify.",
};

export default function InboxPage() {
	return (
		<div className="flex flex-col min-h-screen pb-32 bg-white">
			<NavbarSync title="Inbox" isLogo={false} />
			<div className="max-w-2xl mx-auto w-full px-6 py-12">
				<h1 className="text-3xl font-bold text-[#222222] mb-12">Inbox</h1>
				
				<div className="py-20 flex flex-col items-center justify-center text-center border-t border-[#ebebeb]">
					<h2 className="text-xl font-semibold text-[#222222] mb-2">No messages yet</h2>
					<p className="text-base text-[#717171] max-w-[320px]">
						When you contact hoarding owners or start a campaign, your conversations will appear here.
					</p>
				</div>
			</div>
		</div>
	);
}
