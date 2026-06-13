import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShieldAlert, LayoutDashboard, Megaphone, Inbox, LogOut, ExternalLink, Building2 } from "lucide-react";
import { syncUserToDb, getUserRole } from "@/actions/user_sync";
import { db } from "@/db";
import { users, agencies } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function AgencyLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// 1. Must be logged in
	let stackUser = null;
	try {
		stackUser = await stackServerApp.getUser();
	} catch {
		// Auth service unavailable
	}
	
	if (!stackUser) {
		return redirect("/handler/sign-in");
	}

	// 2. Sync and get DB user
	const syncResult = await syncUserToDb({
		id: stackUser.id,
		primaryEmail: stackUser.primaryEmail,
		displayName: stackUser.displayName,
		profileImageUrl: stackUser.profileImageUrl,
	});

	// Get the full user record from DB to get agencyId
	const dbUser = await db.query.users.findFirst({
		where: eq(users.id, stackUser.id),
		with: { agency: true }
	});

	if (!dbUser || (dbUser.role !== "Owner" && dbUser.role !== "Admin")) {
		// Not an owner or admin — show access denied
		return (
			<div className="flex items-center justify-center min-h-screen bg-[#f7f7f7] px-6">
				<div className="max-w-md w-full text-center">
					<div className="h-16 w-16 mx-auto rounded-2xl bg-blue-50 border border-red-100 flex items-center justify-center mb-6">
						<ShieldAlert size={32} className="text-blue-600" />
					</div>
					<h1 className="text-2xl font-bold text-[#222222] mb-2">Access Denied</h1>
					<p className="text-sm text-[#717171] mb-2">
						You need an Agency Owner account to access this dashboard.
					</p>
					<div className="flex gap-3 justify-center mt-8">
						<Link href="/" className="px-6 py-2.5 bg-[#222222] text-white rounded-xl text-sm font-bold hover:bg-black transition-colors">
							Go Home
						</Link>
					</div>
				</div>
			</div>
		);
	}

	if (dbUser.role === "Owner" && !dbUser.agencyId) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-[#f7f7f7] px-6">
				<div className="max-w-md w-full text-center">
					<div className="h-16 w-16 mx-auto rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-6">
						<Building2 size={32} className="text-amber-600" />
					</div>
					<h1 className="text-2xl font-bold text-[#222222] mb-2">Setup Required</h1>
					<p className="text-sm text-[#717171] mb-2">
						Your account is not yet linked to an agency. Please contact the administrator.
					</p>
					<Link href="/" className="inline-block mt-8 px-6 py-2.5 bg-[#222222] text-white rounded-xl text-sm font-bold hover:bg-black transition-colors">
						Go Home
					</Link>
				</div>
			</div>
		);
	}

	const agency = dbUser.agency;

	return (
		<div className="flex h-screen bg-white">
			{/* Agency Sidebar */}
			<aside className="hidden md:flex w-64 bg-white border-r border-[#ebebeb] flex flex-col shrink-0">
				<div className="p-6 border-b border-[#ebebeb]">
					<Link href="/" className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#082390] font-black text-white italic">
							<img src="/new-logo.png" alt="Hoardify" className="h-full w-full object-contain p-1" />
						</div>
						<span className="font-bold text-xl text-[#082390]">hoardify</span>
					</Link>
				</div>
				
				<nav className="flex-1 p-4 flex flex-col gap-1">
					<Link href="/agency" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-[#717171] hover:bg-[#f7f7f7] hover:text-[#222222] transition-all">
						<LayoutDashboard size={18} />
						Dashboard
					</Link>
					<Link href="/agency/inventory" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-[#717171] hover:bg-[#f7f7f7] hover:text-[#222222] transition-all">
						<Megaphone size={18} />
						My Inventory
					</Link>
					<Link href="/agency/enquiries" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-[#717171] hover:bg-[#f7f7f7] hover:text-[#222222] transition-all">
						<Inbox size={18} />
						Enquiries
					</Link>
					
					<div className="mt-6 pt-6 border-t border-[#ebebeb]">
						<Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-[#717171] hover:bg-[#f7f7f7] hover:text-[#222222] transition-all">
							<ExternalLink size={18} />
							Public Site
						</Link>
					</div>
				</nav>

				<div className="p-4 border-t border-[#ebebeb]">
					<Link href="/handler/sign-out" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-[#082390] hover:bg-blue-50 transition-all">
						<LogOut size={18} />
						Sign Out
					</Link>
				</div>
			</aside>

			{/* Main Content Area */}
			<main className="flex-1 overflow-y-auto flex flex-col bg-[#f7f7f7]">
				<header className="h-16 bg-white border-b border-[#ebebeb] flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
					<div className="flex items-center gap-3 min-w-0">
						<div className="h-8 w-8 rounded-lg bg-[#f7f7f7] border border-[#ebebeb] overflow-hidden flex items-center justify-center shrink-0">
							{agency?.logoUrl ? <img src={agency.logoUrl} className="h-full w-full object-contain p-1" /> : <Building2 size={16} className="text-[#b0b0b0]" />}
						</div>
						<h1 className="text-xs sm:text-sm font-bold text-[#222222] uppercase tracking-wider truncate">{agency?.name || "Agency Portal"}</h1>
					</div>
					
					<div className="hidden sm:flex items-center gap-4">
						<div className="flex flex-col items-end min-w-0">
							<span className="text-xs font-semibold text-[#222222] truncate">{dbUser.name || stackUser.primaryEmail?.split('@')[0]}</span>
							<span className="text-[10px] text-[#717171] font-bold uppercase tracking-wider">Agency Owner</span>
						</div>
					</div>
				</header>
				
				<div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
					{children}
				</div>
			</main>

			<nav className="md:hidden fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3 right-3 z-[60]">
				<div className="grid grid-cols-4 h-16 bg-white/90 backdrop-blur-2xl border border-[#e5e5e5] rounded-full shadow-premium-lg px-1">
					<Link href="/agency" className="flex flex-col items-center justify-center gap-0.5 rounded-full text-[9px] font-bold text-[#717171]"><LayoutDashboard size={18} />Dash</Link>
					<Link href="/agency/inventory" className="flex flex-col items-center justify-center gap-0.5 rounded-full text-[9px] font-bold text-[#717171]"><Megaphone size={18} />Stock</Link>
					<Link href="/agency/enquiries" className="flex flex-col items-center justify-center gap-0.5 rounded-full text-[9px] font-bold text-[#717171]"><Inbox size={18} />Leads</Link>
					<Link href="/" className="flex flex-col items-center justify-center gap-0.5 rounded-full text-[9px] font-bold text-[#717171]"><ExternalLink size={18} />Site</Link>
				</div>
			</nav>
		</div>
	);
}
