import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Megaphone, Inbox, Settings, LogOut } from "lucide-react";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await stackServerApp.getUser();

	// Protection Logic: Redirect to login if not authenticated
	if (!user) {
		return redirect(stackServerApp.urls.signIn);
	}

	// Admin Authorization Check (Replace with your actual admin logic)
	// Example: check for a specific email or metadata flag
	/*
	if (user.primaryEmail !== "admin@hoardify.com") {
		return redirect("/");
	}
	*/

	const navItems = [
		{ name: "Dashboard", href: "/admin", icon: LayoutDashboard },
		{ name: "Inventory", href: "/admin/hoardings", icon: Megaphone },
		{ name: "Enquiries", href: "/admin/enquiries", icon: Inbox },
		{ name: "Users", href: "/admin/users", icon: Users },
		{ name: "Settings", href: "/admin/settings", icon: Settings },
	];


	return (
		<div className="flex h-screen bg-surface-sunken">
			{/* Admin Sidebar */}
			<aside className="w-64 bg-white border-r border-border-subtle flex flex-col">
				<div className="p-6 border-b border-border-subtle">
					<Link href="/" className="flex items-center gap-2 group">
						<div className="h-8 w-8 bg-brand rounded-lg flex items-center justify-center text-white font-bold">H</div>
						<span className="font-black tracking-tighter text-text-primary text-xl">Admin</span>
					</Link>
				</div>
				
				<nav className="flex-1 p-4 flex flex-col gap-1">
					{navItems.map((item) => {
						const Icon = item.icon;
						return (
							<Link 
								key={item.href}
								href={item.href}
								className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-text-secondary hover:bg-surface-sunken hover:text-brand transition-all group"
							>
								<Icon size={18} className="transition-transform group-hover:scale-110" />
								{item.name}
							</Link>
						);
					})}
				</nav>

				<div className="p-4 border-t border-border-subtle">
					<Link 
						href={stackServerApp.urls.signOut}
						className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
					>
						<LogOut size={18} />
						Sign Out
					</Link>
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 overflow-y-auto">
				<header className="h-20 bg-white border-b border-border-subtle flex items-center justify-between px-8">
					<h1 className="text-xl font-black tracking-tight">System Management</h1>
					<div className="flex items-center gap-4">
						<span className="text-xs font-bold text-text-tertiary">{user.primaryEmail}</span>
						<div className="h-8 w-8 rounded-full bg-surface-sunken border border-border-subtle overflow-hidden">
							{user.profileImageUrl && <img src={user.profileImageUrl} alt="Admin" className="w-full h-full object-cover" />}
						</div>
					</div>
				</header>
				<div className="p-8">
					{children}
				</div>
			</main>
		</div>
	);
}
