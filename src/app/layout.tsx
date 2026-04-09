import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import ErrorBoundaryProvider from "@/components/error-boundary-provider";

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
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#ffffff]`}>
				{/* Mobile-first container: full width on mobile, constrained on desktop */}
				<div className="flex min-h-screen flex-col relative">
					{/* Desktop: centered container with max-width */}
					<div className="mx-auto w-full max-w-7xl flex min-h-screen flex-col relative">
						<main className="flex-1 relative w-full overflow-hidden">
							<ErrorBoundaryProvider>
								{children}
							</ErrorBoundaryProvider>
						</main>
						{/* Bottom nav only on mobile */}
						<BottomNav />
					</div>
				</div>
			</body>
		</html>
	);
}
