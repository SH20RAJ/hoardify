"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bookmark, Compass, Inbox, User } from "lucide-react";

export default function BottomNav() {
	const pathname = usePathname();

	const navItems = [
		{ name: "Explore", href: "/", icon: Compass },
		{ name: "Saved", href: "/saved", icon: Bookmark },
		{ name: "Search", href: "/search", icon: Search },
		{ name: "Inbox", href: "/inbox", icon: Inbox },
		{ name: "Profile", href: "/profile", icon: User },
	];

	// Hide on detail pages for more immersive look
	if (pathname.startsWith("/hoardings/")) return null;

	return (
		<nav className="md:hidden fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3 right-3 z-[60]" aria-label="Main navigation">
			<div className="flex justify-around items-center h-16 bg-[#ffffff]/80 backdrop-blur-2xl border border-[#e5e5e5] rounded-full shadow-premium-lg px-2">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href;

					return (
						<Link
							key={item.name}
							href={item.href}
							className={`flex flex-col items-center justify-center gap-1 flex-1 h-12 rounded-full transition-all active:scale-90 ${
								isActive 
									? "text-brand bg-brand/5 scale-110" 
									: "text-text-tertiary hover:text-text-primary"
							}`}
						>
							<Icon size={18} strokeWidth={isActive ? 3 : 2} aria-hidden="true" className="transition-all" />
							{isActive && <div className="h-1 w-1 rounded-full bg-brand" />}
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
