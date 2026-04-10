"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bookmark, Compass, Inbox, User } from "lucide-react";

export default function BottomNav() {
	const pathname = usePathname();

	const navItems = [
		{ name: "Search", href: "/search", icon: Search },
		{ name: "Saved", href: "/saved", icon: Bookmark },
		{ name: "Explore", href: "/", icon: Compass },
		{ name: "Inbox", href: "/inbox", icon: Inbox },
		{ name: "Profile", href: "/profile", icon: User },
	];

	if (pathname.startsWith("/hoardings/")) return null;

	return (
		<nav className="md:hidden fixed bottom-6 left-4 right-4 z-50 glass-effect rounded-2xl shadow-xl shadow-black/10 overflow-hidden" aria-label="Main navigation">
			<div className="flex justify-around items-end h-16 px-2 pb-1">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href;

					return (
						<Link
							key={item.name}
							href={item.href}
							className={`relative flex flex-1 flex-col items-center justify-center h-full transition-all duration-300 ${
								isActive ? "text-brand" : "text-text-tertiary hover:text-text-primary"
							}`}
						>
							<div className={`flex flex-col items-center gap-1 transition-transform duration-300 ${isActive ? "scale-110 -translate-y-1" : ""}`}>
								<Icon size={20} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
								<span className="text-[9px] font-bold uppercase tracking-wider">{item.name}</span>
							</div>
							
							{isActive && (
								<div className="absolute bottom-1 w-1 h-1 rounded-full bg-brand shadow-[0_0_8px_rgba(255,56,92,0.8)]" />
							)}
						</Link>
					);
				})}
			</div>
			<div className="h-[env(safe-area-inset-bottom)]" />
		</nav>
	);
}
