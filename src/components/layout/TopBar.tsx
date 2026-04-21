"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, Search, Bookmark, Compass, Inbox, User } from "lucide-react";
import { useNavbar } from "./NavbarContext";

export default function TopBar() {
	const pathname = usePathname();
	const { config } = useNavbar();
	
	const {
		showBack = false,
		backHref = "/",
	} = config;

	const navItems = [
		{ name: "Explore", href: "/", icon: Compass },
		{ name: "Saved", href: "/saved", icon: Bookmark },
		{ name: "Inbox", href: "/inbox", icon: Inbox },
		{ name: "Profile", href: "/profile", icon: User },
	];

	return (
		<nav className="sticky top-0 z-50 w-full bg-white border-b border-[#ebebeb] h-20 flex items-center">
			<div className="container mx-auto px-6 flex items-center justify-between">
				{/* Left: Logo */}
				<div className="flex items-center gap-4">
					{showBack && (
						<Link href={backHref} className="p-2 hover:bg-[#f7f7f7] rounded-full transition-colors">
							<ChevronLeft size={20} className="text-[#222222]" />
						</Link>
					)}
					
					<Link href="/" className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff385c] font-black text-white italic">
							H
						</div>
						<span className="text-xl font-bold tracking-tight text-[#ff385c] hidden sm:block">hoardify</span>
					</Link>
				</div>

				{/* Middle: Search bar (simplified) */}
				<div className="hidden md:flex flex-1 max-w-sm mx-8">
					<div className="flex items-center w-full h-12 border border-[#dddddd] rounded-full px-4 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow cursor-pointer">
						<span className="text-sm font-medium text-[#222222] flex-1">Start your campaign...</span>
						<div className="bg-[#ff385c] p-2 rounded-full text-white">
							<Search size={16} />
						</div>
					</div>
				</div>

				{/* Right: Nav items */}
				<div className="flex items-center gap-2">
					<div className="hidden md:flex items-center gap-1 mr-4">
						{navItems.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link 
									key={item.href} 
									href={item.href}
									className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
										isActive 
											? "text-[#222222] font-semibold" 
											: "text-[#6a6a6a] hover:bg-[#f7f7f7]"
									}`}
								>
									{item.name}
								</Link>
							);
						})}
					</div>
					
					<Link href="/profile" className="flex items-center gap-2 p-2 border border-[#dddddd] rounded-full hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow">
						<div className="text-[#6a6a6a] ml-1">
							<User size={20} />
						</div>
						<div className="w-8 h-8 rounded-full bg-[#717171] flex items-center justify-center text-white text-xs font-bold">
							A
						</div>
					</Link>
				</div>
			</div>
		</nav>
	);
}
