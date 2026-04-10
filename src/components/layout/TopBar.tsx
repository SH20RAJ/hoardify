"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, Search, Bookmark, Compass, Inbox, User } from "lucide-react";
import { useNavbar } from "./NavbarContext";

export default function TopBar() {
	const pathname = usePathname();
	const { config } = useNavbar();
	
	const {
		title,
		showBack = false,
		backHref = "/",
		rightAction,
		isLogo = false,
	} = config;

	const navItems = [
		{ name: "Explore", href: "/", icon: Compass },
		{ name: "Saved", href: "/saved", icon: Bookmark },
		{ name: "Inbox", href: "/inbox", icon: Inbox },
		{ name: "Profile", href: "/profile", icon: User },
	];

	const renderNavbarFull = (isDesktopOnly: boolean) => (
		<div className={`${isDesktopOnly ? "hidden md:flex" : "flex"} glass-effect mx-auto h-16 w-full max-w-7xl items-center justify-between rounded-2xl px-4 md:px-6 shadow-lg shadow-black/5`}>
			{/* Left side: Logo & Back Button */}
			<div className="flex items-center gap-4">
				{showBack && (
					<Link href={backHref} className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-sunken transition-all active:scale-90" aria-label="Go back">
						<ChevronLeft size={20} className="text-text-primary" />
					</Link>
				)}
				
				<Link href="/" className="flex items-center gap-2 group">
					<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand font-bold text-white shadow-lg shadow-brand/20 transition-transform group-hover:scale-105">
						H
					</div>
					<div className="hidden md:flex flex-col">
						<span className="text-lg font-bold tracking-tight text-text-primary">hoardify</span>
						<span className="text-[10px] font-bold uppercase tracking-widest text-brand -mt-1 leading-none">Marketplace</span>
					</div>
				</Link>

				{/* Custom Title (Mobile only or Desktop page-specific) */}
				{!isLogo && title && (
					<h1 className="text-lg font-bold tracking-tight text-text-primary md:hidden">{title}</h1>
				)}
			</div>

			{/* Middle: Desktop Search Bar */}
			<div className="hidden md:flex flex-1 max-w-md mx-8">
				<div className="relative w-full group">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary transition-colors group-hover:text-brand" size={18} />
					<input 
						type="text" 
						placeholder="Search for billboards anywhere..." 
						className="w-full h-11 bg-surface-sunken rounded-xl pl-10 pr-4 text-sm font-medium border border-transparent focus:border-brand/30 focus:bg-white transition-all outline-none"
					/>
				</div>
			</div>

			{/* Right side: Desktop Nav Links & Custom Right Action */}
			<div className="flex items-center gap-2 md:gap-6">
				{/* Desktop Menu */}
				<div className="hidden md:flex items-center gap-1">
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive = pathname === item.href;
						return (
							<Link 
								key={item.href} 
								href={item.href}
								className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
									isActive 
										? "bg-brand/10 text-brand" 
										: "text-text-secondary hover:bg-surface-sunken hover:text-text-primary"
								}`}
							>
								<Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
								<span>{item.name}</span>
							</Link>
						);
					})}
				</div>

				{/* Mobile/Global Right Action */}
				{rightAction ? (
					<div className="flex items-center">{rightAction}</div>
				) : (
					<Link href="/search" className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-text-primary shadow-lg shadow-black/20 transition-all active:scale-90">
						<Search size={18} className="text-background" />
					</Link>
				)}
				
				<div className="hidden md:flex items-center border-l border-border-subtle pl-6 ml-2">
					<Link href="/search" className="btn-brand !px-6 text-xs !py-3">
						Start Planning
					</Link>
				</div>
			</div>
		</div>
	);

	return (
		<nav className="sticky top-0 z-50 w-full px-4 pt-4 pb-2">
			{renderNavbarFull(false)}
		</nav>
	);

}
