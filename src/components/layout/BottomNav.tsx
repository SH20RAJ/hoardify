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

	if (pathname.startsWith("/hoardings/")) return null;

	return (
		<nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#ebebeb] px-4 pb-[env(safe-area-inset-bottom)]" aria-label="Main navigation">
			<div className="flex justify-around items-center h-16">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href;

					return (
						<Link
							key={item.name}
							href={item.href}
							className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
								isActive ? "text-[#ff385c]" : "text-[#717171]"
							}`}
						>
							<Icon size={20} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
							<span className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}>{item.name}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
