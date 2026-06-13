"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronLeft, Search, Bookmark, Compass, Inbox, User as UserIcon } from "lucide-react";
import { useNavbar } from "./NavbarContext";
import { stackClientApp } from "@/stack/client";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
	const pathname = usePathname();
	const { config } = useNavbar();
	const user = stackClientApp.useUser();
	
	const {
		showBack = false,
		backHref = "/",
		rightAction,
	} = config;

	const navItems = [
		{ name: "Explore", href: "/", icon: Compass },
		{ name: "Saved", href: "/saved", icon: Bookmark },
		{ name: "Inbox", href: "/inbox", icon: Inbox },
		{ name: "Profile", href: "/profile", icon: UserIcon },
	];

	return (
		<nav className="sticky top-0 z-[100] w-full bg-background/80 backdrop-blur-2xl border-b border-border-subtle h-16 md:h-20 flex items-center shadow-premium-sm transition-colors duration-300">
			<div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
				{/* Left: Logo */}
				<div className="flex items-center gap-3 min-w-0">
					{showBack && (
						<Link href={backHref} className="p-2 hover:bg-surface-sunken rounded-xl transition-all active:scale-90 text-text-primary shrink-0">
							<ChevronLeft size={20} strokeWidth={2.5} />
						</Link>
					)}
					
					<Link href="/" className="flex items-center gap-3 group shrink-0">
						<div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-brand text-white shadow-premium-md group-hover:scale-110 transition-transform duration-500">
							<img src="/new-logo.png" alt="" className="h-full w-full object-contain p-1.5" />
						</div>
						<span className="text-xl md:text-2xl font-black tracking-tighter text-text-primary hidden sm:block">hoardify</span>
					</Link>
				</div>

				{/* Mobile center title */}
				<div className="min-w-0 flex-1 text-center md:hidden absolute left-14 right-14">
					<div className="truncate text-sm font-bold text-text-primary">{config.title}</div>
				</div>

				{/* Middle: Search bar (simplified) */}
				<div className="hidden md:flex flex-1 max-w-sm mx-12">
					<Link href="/search" className="flex items-center w-full h-12 bg-surface-sunken border border-border-subtle rounded-full px-5 hover:shadow-premium-md hover:border-brand/20 transition-all cursor-pointer group">
						<span className="text-sm font-bold text-text-tertiary group-hover:text-text-primary transition-colors flex-1">Start your campaign...</span>
						<div className="bg-text-primary p-2 rounded-full text-background group-hover:bg-brand transition-colors">
							<Search size={14} strokeWidth={3} />
						</div>
					</Link>
				</div>

				{/* Right: Nav items */}
				<div className="flex items-center gap-2 md:gap-4 shrink-0">
					<div className="hidden md:flex items-center gap-2 mr-4">
						{navItems.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link 
									key={item.href} 
									href={item.href}
									className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-tight transition-all active:scale-95 ${
										isActive 
											? "text-text-primary bg-surface-sunken" 
											: "text-text-tertiary hover:text-text-primary hover:bg-surface-sunken"
									}`}
								>
									{item.name}
								</Link>
							);
						})}
					</div>
					
					<div className="h-6 w-px bg-border-subtle mx-2 hidden md:block" />
					
					<ThemeToggle />
					
					{rightAction && <div className="hidden md:flex items-center">{rightAction}</div>}
					
					{user ? (
						<div className="flex items-center gap-3">
							<Link href="/profile" className="flex items-center gap-2 p-1.5 border border-border-strong rounded-full hover:shadow-premium-md hover:border-brand/20 transition-all active:scale-95 group">
								{user.profileImageUrl ? (
									<Image src={user.profileImageUrl} alt="User" width={32} height={32} className="w-8 h-8 rounded-full object-cover shadow-sm" unoptimized />
								) : (
									<div className="w-8 h-8 rounded-full bg-text-primary flex items-center justify-center text-background text-xs font-black">
										{user.primaryEmail?.[0].toUpperCase()}
									</div>
								)}
								<span className="text-xs font-bold text-text-primary hidden lg:block">Intelligence Profile</span>
							</Link>
						</div>
					) : (
						<Link 
							href={stackClientApp.urls.signIn}
							className="px-4 md:px-8 py-2 rounded-full bg-brand text-white font-bold text-xs md:text-sm hover:scale-105 active:scale-95 transition-all shadow-premium-md"
						>
							Log In
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}
