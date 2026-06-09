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
	} = config;

	const navItems = [
		{ name: "Explore", href: "/", icon: Compass },
		{ name: "Saved", href: "/saved", icon: Bookmark },
		{ name: "Inbox", href: "/inbox", icon: Inbox },
		{ name: "Profile", href: "/profile", icon: UserIcon },
	];

	return (
		<nav className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-2xl border-b border-border-subtle h-20 flex items-center shadow-premium-sm">
			<div className="container mx-auto px-8 flex items-center justify-between">
				{/* Left: Logo */}
				<div className="flex items-center gap-6">
					{showBack && (
						<Link href={backHref} className="p-2.5 hover:bg-surface-sunken rounded-xl transition-all active:scale-90 text-[#111111]">
							<ChevronLeft size={20} strokeWidth={2.5} />
						</Link>
					)}
					
					<Link href="/" className="flex items-center gap-3 group">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-premium-md group-hover:scale-110 transition-transform duration-500">
							<img src="/new-logo.png" alt="" className="h-full w-full object-contain p-1.5" />
						</div>
						<span className="text-2xl font-black tracking-tighter text-[#111111] hidden sm:block">hoardify</span>
					</Link>
				</div>

				{/* Middle: Search bar (simplified) */}
				<div className="hidden md:flex flex-1 max-w-sm mx-12">
					<Link href="/search" className="flex items-center w-full h-12 bg-surface-sunken border border-border-subtle rounded-full px-5 hover:shadow-premium-md hover:border-brand/20 transition-all cursor-pointer group">
						<span className="text-sm font-bold text-text-tertiary group-hover:text-text-primary transition-colors flex-1">Start your campaign...</span>
						<div className="bg-[#111111] p-2 rounded-full text-white group-hover:bg-brand transition-colors">
							<Search size={14} strokeWidth={3} />
						</div>
					</Link>
				</div>

				{/* Right: Nav items */}
				<div className="flex items-center gap-4">
					<div className="hidden md:flex items-center gap-2 mr-4">
						{navItems.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link 
									key={item.href} 
									href={item.href}
									className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-tight transition-all active:scale-95 ${
										isActive 
											? "text-[#111111] bg-surface-sunken" 
											: "text-text-tertiary hover:text-[#111111] hover:bg-surface-sunken"
									}`}
								>
									{item.name}
								</Link>
							);
						})}
					</div>
					
					<div className="h-6 w-px bg-border-subtle mx-2 hidden md:block" />
					
					<ThemeToggle />
					
					{user ? (
						<div className="flex items-center gap-4">
							<Link href="/profile" className="flex items-center gap-3 p-1.5 pl-4 border border-border-strong rounded-full hover:shadow-premium-md hover:border-brand/20 transition-all active:scale-95 group">
								<span className="text-xs font-bold text-[#111111] hidden lg:block">Intelligence Profile</span>
								{user.profileImageUrl ? (
									<Image src={user.profileImageUrl} alt="User" width={32} height={32} className="w-8 h-8 rounded-full object-cover shadow-sm" unoptimized />
								) : (
									<div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center text-white text-xs font-black">
										{user.primaryEmail?.[0].toUpperCase()}
									</div>
								)}
							</Link>
						</div>
					) : (
						<Link 
							href={stackClientApp.urls.signIn}
							className="px-8 py-2.5 rounded-full bg-brand text-white font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-premium-md"
						>
							Log In
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}
