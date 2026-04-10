import { Metadata } from "next";
import { Inbox as InboxIcon } from "lucide-react";
import NavbarSync from "@/components/layout/NavbarSync";

export const metadata: Metadata = {
	title: "Inbox | Hoardify",
	description: "Communicate with hoarding owners and manage your direct inquiries on Hoardify.",
};

export default function InboxPage() {
	return (
		<div className="flex flex-col min-h-screen pb-32 bg-background">
			<NavbarSync title="Inbox" isLogo={false} />
			<div className="px-4 mt-4 flex flex-1 flex-col items-center justify-center text-center">
				<div className="bg-brand/10 p-5 rounded-full mb-4">
					<InboxIcon size={32} className="text-brand" />
				</div>
				<h2 className="text-lg font-bold mb-1">No Messages</h2>
				<p className="text-sm text-zinc-500 font-medium max-w-[250px]">
					When you contact hoarding owners, your conversations will appear here.
				</p>
			</div>
		</div>
	);
}
