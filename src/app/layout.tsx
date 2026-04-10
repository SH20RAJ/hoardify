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
	openGraph: {
		title: "Hoardify | Discovery & Booking",
		description: "Discover, compare, and book hoardings with transparency and analytics.",
		type: "website",
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
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<script dangerouslySetInnerHTML={{
					__html: `
						(function() {
							const savedTheme = localStorage.getItem('theme');
							const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
							const theme = savedTheme || systemTheme;
							if (theme === 'dark') {
								document.documentElement.classList.add('dark');
							} else {
								document.documentElement.classList.remove('dark');
							}
						})()
					`
				}} />
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
			</body>

		</html>
	);
}

