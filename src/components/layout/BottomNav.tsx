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
		<nav className="md:hidden absolute bottom-0 w-full border-t border-border bg-background pb-safe pt-2 z-50" aria-label="Main navigation">
			<div className="flex justify-around px-2 pb-2">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href;

					return (
						<Link
							key={item.name}
							href={item.href}
							className={`flex w-full flex-col items-center justify-center gap-1 ${
								isActive ? "text-brand" : "text-text-secondary hover:text-foreground"
							}`}
						>
							<Icon size={24} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
							<span className="text-[10px] font-medium">{item.name}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
