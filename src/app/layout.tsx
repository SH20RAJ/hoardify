import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
	manifest: "/manifest.json",
	themeColor: "#ff385c",
	viewport: "width=device-width, initial-scale=1, maximum-scale=1",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "Hoardify",
	},
	openGraph: {
		title: "Hoardify | Discovery & Booking",
		description: "Discover, compare, and book hoardings with transparency and analytics.",
		type: "website",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Hoardify - Outdoor Advertising Marketplace",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Hoardify | Outdoor Advertising Marketplace",
		description: "Book hoardings (billboards) like you book hotels.",
		images: ["/og-image.png"],
	},
};

import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "@/stack/client";
import { NavbarProvider } from "@/components/layout/NavbarContext";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://maps.googleapis.com" />
				<link rel="preconnect" href="https://maps.gstatic.com" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/icon-192.png" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<script
					id="theme-init"
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})()`
					}}
				/>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<StackProvider app={stackClientApp}>
					<StackTheme>
						<NavbarProvider>
							<ErrorBoundaryProvider>
								{children}
							</ErrorBoundaryProvider>
						</NavbarProvider>
					</StackTheme>
				</StackProvider>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							if ('serviceWorker' in navigator) {
								window.addEventListener('load', function() {
									navigator.serviceWorker.register('/sw.js');
								});
							}
						`
					}}
				/>
			</body>

		</html>
	);
}

