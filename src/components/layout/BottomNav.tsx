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
		<nav className="absolute bottom-0 w-full border-t border-gray-200 bg-white pb-safe pt-2 dark:border-gray-800 dark:bg-black z-50">
			<div className="flex justify-around px-2 pb-2">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href;

					return (
						<Link
							key={item.name}
							href={item.href}
							className={`flex w-full flex-col items-center justify-center gap-1 ${
								isActive ? "text-brand" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
							}`}
						>
							<Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-brand" : ""} />
							<span className="text-[10px] font-medium">{item.name}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
