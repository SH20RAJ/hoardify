import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import React from "react";

export default function WebsiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col relative bg-background transition-colors duration-300">
			{/* Public discovery Navbar */}
			<TopBar />

			{/* Discovery Content Wrapper */}
			<div className="mx-auto w-full max-w-7xl flex-1 flex flex-col relative">
				<main className="flex-1 relative w-full px-4 md:px-0">
					{children}
				</main>
			</div>

			{/* Mobile-only Bottom Navigation */}
			<BottomNav />
		</div>
	);
}
