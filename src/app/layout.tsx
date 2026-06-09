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

export const viewport = {
	themeColor: "#082390",
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export const metadata: Metadata = {
	metadataBase: new URL("https://hoardify.in"),
	alternates: {
		canonical: "/",
	},
	title: {
		default: "Hoardify | Outdoor Advertising Marketplace",
		template: "%s | Hoardify",
	},
	description: "Discover, compare, and book premium hoardings, billboards, and outdoor advertising spaces in Ranchi & across India with transparent pricing.",
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "Hoardify",
	},
	openGraph: {
		title: "Hoardify | Discover & Book Billboards Online",
		description: "Discover, compare, and book premium hoardings and outdoor ads with transparent pricing and verification in Ranchi & across India.",
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
		description: "Book hoardings (billboards) like you book hotels. The Google Ads of Ranchi's offline advertising.",
		images: ["/og-image.png"],
	},
	icons: [
		{
			rel: "icon",
			url: "/new-logo.png",
			type: "image/png",
		}
	],
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

