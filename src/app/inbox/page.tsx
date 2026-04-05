import TopBar from "@/components/layout/TopBar";
import { Inbox as InboxIcon } from "lucide-react";

export default function InboxPage() {
	return (
		<div className="flex flex-col min-h-screen pb-24 dark:bg-black">
			<TopBar title="Inbox" />
			<div className="px-4 mt-4 flex flex-1 flex-col items-center justify-center text-center">
				<div className="bg-brand/10 p-5 rounded-full mb-4">
					<InboxIcon size={32} className="text-brand" />
				</div>
				<h2 className="text-lg font-bold mb-1">No Messages</h2>
				<p className="text-sm text-gray-500 font-medium max-w-[250px]">
					When you contact hoarding owners, your conversations will appear here.
				</p>
			</div>
		</div>
	);
}
