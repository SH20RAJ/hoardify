"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Megaphone, Inbox, Users, Settings, ExternalLink, LogOut, LucideIcon } from "lucide-react";

interface NavItem {
	name: string;
	href: string;
	icon: LucideIcon;
}

interface AdminSidebarProps {
	signOutUrl: string;
}

export default function AdminSidebar({ signOutUrl }: AdminSidebarProps) {
	const pathname = usePathname();

	const navItems: NavItem[] = [
		{ name: "Dashboard", href: "/admin", icon: LayoutDashboard },
		{ name: "Inventory", href: "/admin/hoardings", icon: Megaphone },
		{ name: "Enquiries", href: "/admin/enquiries", icon: Inbox },
		{ name: "Users", href: "/admin/users", icon: Users },
		{ name: "Settings", href: "/admin/settings", icon: Settings },
	];

	return (
		<aside className="w-64 bg-white border-r border-[#ebebeb] flex flex-col shrink-0">
			<div className="p-6 border-b border-[#ebebeb]">
				<Link href="/" className="flex items-center gap-2">
					<div className="h-8 w-8 bg-[#ff385c] rounded-lg flex items-center justify-center text-white font-bold italic">H</div>
					<span className="font-bold text-xl text-[#ff385c]">hoardify</span>
				</Link>
			</div>
			
			<nav className="flex-1 p-4 flex flex-col gap-1">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
					return (
						<Link 
							key={item.href}
							href={item.href}
							className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
								isActive 
									? "bg-[#fff8f6] text-[#ff385c]" 
									: "text-[#717171] hover:bg-[#f7f7f7] hover:text-[#222222]"
							}`}
						>
							<Icon size={18} className={isActive ? "text-[#ff385c]" : "text-[#717171]"} />
							{item.name}
						</Link>
					);
				})}
				
				<div className="mt-6 pt-6 border-t border-[#ebebeb]">
					<Link 
						href="/" 
						className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-[#717171] hover:bg-[#f7f7f7] hover:text-[#222222] transition-all duration-200"
					>
						<ExternalLink size={18} />
						Public View
					</Link>
				</div>
			</nav>

			<div className="p-4 border-t border-[#ebebeb]">
				<Link 
					href={signOutUrl}
					className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-[#ff385c] hover:bg-[#fff8f6] transition-all duration-200"
				>
					<LogOut size={18} />
					Sign Out
				</Link>
			</div>
		</aside>
	);
}
