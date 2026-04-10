"use client";

import { Inbox as InboxIcon } from "lucide-react";
import { useNavbar } from "@/components/layout/NavbarContext";
import { useEffect } from "react";

export default function InboxPage() {
	const { setConfig } = useNavbar();

	useEffect(() => {
		setConfig({
			title: "Inbox",
			isLogo: false
		});
	}, [setConfig]);

	return (
		<div className="flex flex-col min-h-screen pb-32 bg-background">
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
