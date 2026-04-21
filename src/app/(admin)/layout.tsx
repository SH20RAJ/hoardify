import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Megaphone, Inbox, Settings, LogOut, Users, ExternalLink } from "lucide-react";
import PasscodeGate from "@/components/admin/PasscodeGate";
import ThemeToggle from "@/components/layout/ThemeToggle";

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

	const navItems = [
		{ name: "Dashboard", href: "/admin", icon: LayoutDashboard },
		{ name: "Inventory", href: "/admin/hoardings", icon: Megaphone },
		{ name: "Enquiries", href: "/admin/enquiries", icon: Inbox },
		{ name: "Users", href: "/admin/users", icon: Users },
		{ name: "Settings", href: "/admin/settings", icon: Settings },
	];


	return (
		<PasscodeGate>
			<div className="flex h-screen bg-surface-sunken">
				{/* Premium Admin Sidebar */}
				<aside className="w-72 bg-surface-raised border-r border-border-subtle flex flex-col shadow-[20px_0_40px_-20px_rgba(0,0,0,0.05)] z-20">
					<div className="p-8 border-b border-border-subtle flex items-center justify-between">
						<Link href="/" className="flex items-center gap-3 group">
							<div className="h-10 w-10 bg-brand rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-brand/20 italic transform group-hover:rotate-12 transition-transform">H</div>
							<div className="flex flex-col">
								<span className="font-black tracking-tighter text-text-primary text-lg leading-none uppercase italic">Admin</span>
								<span className="text-[9px] font-bold text-text-tertiary uppercase tracking-widest mt-1">Management v7</span>
							</div>
						</Link>
					</div>
					
					<nav className="flex-1 p-6 flex flex-col gap-2">
						<div className="text-[10px] font-black uppercase tracking-[0.3em] text-text-tertiary mb-4 px-4">Navigation</div>
						{navItems.map((item) => {
							const Icon = item.icon;
							return (
								<Link 
									key={item.href}
									href={item.href}
									className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest text-text-secondary hover:bg-surface-sunken hover:text-brand transition-all group relative overflow-hidden"
								>
									<Icon size={18} className="transition-transform group-hover:scale-110 group-hover:rotate-6" />
									{item.name}
									<div className="absolute left-0 top-0 bottom-0 w-1 bg-brand transform -translate-x-full group-hover:translate-x-0 transition-transform" />
								</Link>
							);
						})}
						
						<div className="mt-8 border-t border-border-subtle pt-8">
							<div className="text-[10px] font-black uppercase tracking-[0.3em] text-text-tertiary mb-4 px-4">Operations</div>
							<Link href="/" className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest text-text-secondary hover:bg-surface-sunken hover:text-text-primary transition-all group">
								<ExternalLink size={18} />
								Public View
							</Link>
						</div>
					</nav>

					<div className="p-6 border-t border-border-subtle bg-surface-sunken/30">
						<Link 
							href={stackServerApp.urls.signOut}
							className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5"
						>
							<LogOut size={16} />
							Terminate Session
						</Link>
					</div>
				</aside>

				{/* High-Fidelity Main Content */}
				<main className="flex-1 overflow-y-auto flex flex-col bg-background">
					<header className="h-24 bg-surface-raised/80 backdrop-blur-xl border-b border-border-subtle flex items-center justify-between px-10 sticky top-0 z-10">
						<div>
							<h1 className="text-2xl font-black tracking-tighter uppercase italic text-text-primary">System Dashboard</h1>
							<p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mt-1">Real-time Node: Ranchi_West_Inventory</p>
						</div>
						
						<div className="flex items-center gap-8">
							<ThemeToggle />
							
							<div className="flex items-center gap-4 border-l border-border-subtle pl-8">
								<div className="flex flex-col items-end">
									<span className="text-xs font-black uppercase tracking-widest text-text-primary">{user.primaryEmail?.split('@')[0]}</span>
									<span className="text-[9px] font-bold text-text-tertiary uppercase tracking-widest">Master Admin</span>
								</div>
								<div className="h-12 w-12 rounded-2xl bg-surface-sunken border border-border-subtle overflow-hidden shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
									{user.profileImageUrl ? (
										<Image src={user.profileImageUrl} alt="Admin" width={48} height={48} className="w-full h-full object-cover" unoptimized />
									) : (
										<div className="w-full h-full flex items-center justify-center bg-brand/10 text-brand font-black">
											{user.primaryEmail?.[0].toUpperCase()}
										</div>
									)}
								</div>
							</div>
						</div>
					</header>
					
					<div className="p-10 max-w-7xl mx-auto w-full">
						{children}
					</div>
				</main>
			</div>
		</PasscodeGate>
	);
}

