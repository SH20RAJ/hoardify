import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShieldAlert } from "lucide-react";
import { syncUserToDb, isUserAdmin } from "@/actions/user_sync";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// 1. Must be logged in
	let user = null;
	try {
		user = await stackServerApp.getUser();
	} catch {
		// Auth service unavailable
	}
	
	if (!user) {
		// Not logged in — redirect to sign-in
		return redirect("/handler/sign-in");
	}

	// 2. Sync user to DB (creates if first time)
	await syncUserToDb({
		id: user.id,
		primaryEmail: user.primaryEmail,
		displayName: user.displayName,
		profileImageUrl: user.profileImageUrl,
	});

	// 3. Check admin role in DB
	const hasAdmin = await isUserAdmin(user.id);

	if (!hasAdmin) {
		// Not an admin — show access denied
		return (
			<div className="flex items-center justify-center min-h-screen bg-[#f7f7f7] px-6">
				<div className="max-w-md w-full text-center">
					<div className="h-16 w-16 mx-auto rounded-2xl bg-blue-50 border border-red-100 flex items-center justify-center mb-6">
						<ShieldAlert size={32} className="text-blue-600" />
					</div>
					<h1 className="text-2xl font-bold text-[#222222] mb-2">Access Denied</h1>
					<p className="text-sm text-[#717171] mb-2">
						You don&apos;t have admin privileges.
					</p>
					<p className="text-xs text-[#b0b0b0] mb-8">
						Logged in as <span className="font-semibold">{user.primaryEmail}</span>
					</p>
					<div className="flex gap-3 justify-center">
						<Link href="/" className="px-6 py-2.5 bg-[#222222] text-white rounded-xl text-sm font-bold hover:bg-black transition-colors">
							Go Home
						</Link>
						<Link href="/handler/sign-out" className="px-6 py-2.5 border border-[#dddddd] rounded-xl text-sm font-bold text-[#222222] hover:bg-[#f7f7f7] transition-colors">
							Sign Out
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-screen bg-white">
			<AdminSidebar signOutUrl="/handler/sign-out" />

			{/* Main Content Area */}
			<main className="flex-1 overflow-y-auto flex flex-col bg-[#f7f7f7]">
				<header className="h-16 bg-white border-b border-[#ebebeb] flex items-center justify-between px-8 sticky top-0 z-10">
					<h1 className="text-lg font-semibold text-[#222222]">Admin Management</h1>
					
					<div className="flex items-center gap-4">
						<div className="flex flex-col items-end">
							<span className="text-xs font-semibold text-[#222222]">{user.displayName || user.primaryEmail?.split('@')[0] || "Admin"}</span>
							<span className="text-[10px] text-[#082390] font-bold uppercase tracking-wider">Admin</span>
						</div>
						<div className="h-8 w-8 rounded-full bg-[#f7f7f7] border border-[#dddddd] overflow-hidden">
							{user.profileImageUrl ? (
								<Image src={user.profileImageUrl} alt="Admin" width={32} height={32} className="w-full h-full object-cover" unoptimized />
							) : (
								<div className="w-full h-full flex items-center justify-center text-[#082390] font-bold text-xs">
									{user.primaryEmail?.[0].toUpperCase() || "A"}
								</div>
							)}
						</div>
					</div>
				</header>
				
				<div className="p-8 max-w-6xl mx-auto w-full">
					{children}
				</div>
			</main>
		</div>
	);
}
