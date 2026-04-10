"use client";

import Link from "next/link";
import { Compass, MapPinOff } from "lucide-react";
import { useNavbar } from "@/components/layout/NavbarContext";
import { useEffect } from "react";

export default function NotFound() {
	const { setConfig } = useNavbar();

	useEffect(() => {
		setConfig({
			isLogo: true,
			showBack: true
		});
	}, [setConfig]);

	return (
		<div className="flex flex-col min-h-screen bg-background pb-32">
			<div className="flex flex-1 flex-col items-center justify-center p-6 text-center px-8">
				<div className="bg-brand/10 p-6 rounded-full mb-6">
					<MapPinOff size={64} className="text-brand" strokeWidth={1.5} />
				</div>
				<h1 className="text-4xl font-extrabold tracking-tight mb-2 text-gray-900 dark:text-white">404</h1>
				<h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Lost in the city?</h2>
				<p className="text-gray-500 mb-8 max-w-[280px] dark:text-gray-400">
					We couldn&apos;t find the page or hoarding you&apos;re looking for. It might have been moved or removed.
				</p>
				<Link 
					href="/" 
					className="flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
				>
					<Compass size={20} />
					Explore Hoardings
				</Link>
			</div>
		</div>
	);
}
