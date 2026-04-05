import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Hoardify | Outdoor Advertising Marketplace",
	description: "Book hoardings (billboards) like you book hotels. The Google Ads of the offline world.",
	openGraph: {
		title: "Hoardify | Discovery & Booking",
		description: "Discover, compare, and book hoardings with transparency and analytics.",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<div className="mx-auto flex h-[100dvh] max-w-md flex-col overflow-hidden bg-background shadow-2xl sm:border-x sm:border-gray-200 dark:sm:border-gray-800 relative">
					<main className="flex-1 overflow-y-auto pb-16 no-scrollbar relative w-full h-full">
						{children}
					</main>
					<BottomNav />
				</div>
			</body>
		</html>
	);
}
