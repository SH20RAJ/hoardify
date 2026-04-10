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
		<nav
			className="fixed inset-x-0 bottom-0 z-50 border-t border-[#00000012] bg-white/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur md:hidden"
			aria-label="Main navigation"
		>
			<div className="mx-auto flex w-full max-w-2xl items-center justify-around px-2">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href;

					return (
						<Link
							key={item.name}
							href={item.href}
							className={`flex min-h-14 w-full flex-col items-center justify-center gap-1 rounded-xl transition ${
								isActive ? "text-[#ff385c]" : "text-[#787878] hover:text-[#1f1f1f]"
							}`}
						>
							<Icon size={20} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
							<span className="text-[11px] font-medium leading-none">{item.name}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
