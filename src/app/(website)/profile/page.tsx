import { Metadata } from "next";
import { User, Settings, FileText, ChevronRight, HelpCircle, Shield, BookOpen, Calendar, MapPin } from "lucide-react";
import NavbarSync from "@/components/layout/NavbarSync";
import SignOutButton from "@/components/profile/SignOutButton";
import { stackServerApp } from "@/stack/server";
import { db } from "@/db";
import { bookings, hoardings } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Profile | Hoardify",
	description: "Manage your account, view bookings, and update your preferences on Hoardify.",
};

export default async function ProfilePage() {
	let user = null;
	try {
		user = await stackServerApp.getUser();
	} catch {
		// Auth unavailable
	}

	// Fetch user's bookings if authenticated
	let userBookings: Array<{
		id: number;
		startDate: Date;
		endDate: Date;
		pricePaid: number;
		status: string;
		hoarding: { id: number; title: string; imageUrl: string; location: string } | null;
	}> = [];
	
	if (user) {
		try {
			userBookings = await db.query.bookings.findMany({
				where: eq(bookings.userId, user.id),
				with: { hoarding: true },
				orderBy: [desc(bookings.createdAt)],
			});
		} catch {
			// DB unavailable
		}
	}

	return (
		<div className="flex flex-col min-h-screen pb-32 bg-white">
			<NavbarSync title="Profile" isLogo={false} />
			
			<div className="max-w-2xl mx-auto w-full px-6 py-10">
				{user ? (
					<>
						{/* Authenticated User Header */}
						<div className="flex items-center justify-between mb-10">
							<div>
								<h1 className="text-3xl font-bold text-[#222222]">{user.displayName || "User"}</h1>
								<p className="text-base text-[#717171] mt-1">{user.primaryEmail}</p>
							</div>
							<div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#ebebeb] relative bg-[#f7f7f7]">
								{user.profileImageUrl ? (
									<Image src={user.profileImageUrl} alt="" fill className="object-cover" unoptimized />
								) : (
									<div className="w-full h-full flex items-center justify-center bg-[#ff385c] text-white text-2xl font-bold">
										{(user.displayName || user.primaryEmail || "U")[0].toUpperCase()}
									</div>
								)}
							</div>
						</div>

						{/* Bookings Section */}
						<div className="mb-10">
							<h3 className="text-xl font-semibold text-[#222222] mb-4 flex items-center gap-2">
								<BookOpen size={20} />
								Your Bookings
							</h3>
							{userBookings.length > 0 ? (
								<div className="space-y-4">
									{userBookings.map((booking) => (
										<Link key={booking.id} href={booking.hoarding ? `/hoardings/${booking.hoarding.id}` : "#"} className="block">
											<div className="flex gap-4 p-4 rounded-2xl border border-[#ebebeb] hover:shadow-md transition-shadow">
												{booking.hoarding && (
													<div className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#ebebeb] shrink-0">
														<Image src={booking.hoarding.imageUrl} alt="" fill className="object-cover" unoptimized />
													</div>
												)}
												<div className="flex-1 min-w-0">
													<h4 className="font-semibold text-[#222222] truncate">{booking.hoarding?.title || "Unknown"}</h4>
													<div className="flex items-center gap-1 text-xs text-[#717171] mt-1">
														<MapPin size={12} />
														<span className="truncate">{booking.hoarding?.location}</span>
													</div>
													<div className="flex items-center gap-1 text-xs text-[#717171] mt-1">
														<Calendar size={12} />
														<span>{new Date(booking.startDate).toLocaleDateString()} – {new Date(booking.endDate).toLocaleDateString()}</span>
													</div>
												</div>
												<div className="text-right shrink-0">
													<p className="font-bold text-[#222222]">{formatCurrency(booking.pricePaid)}</p>
													<span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
														booking.status === "Confirmed" ? "bg-green-50 text-green-600" :
														booking.status === "Pending" ? "bg-amber-50 text-amber-600" :
														"bg-red-50 text-red-500"
													}`}>
														{booking.status}
													</span>
												</div>
											</div>
										</Link>
									))}
								</div>
							) : (
								<div className="py-12 text-center border border-dashed border-[#dddddd] rounded-2xl">
									<p className="text-sm text-[#717171]">No bookings yet. Start exploring hoardings!</p>
									<Link href="/" className="inline-block mt-4 px-6 py-2.5 bg-[#222222] text-white rounded-xl text-sm font-bold hover:bg-black transition-colors">
										Explore
									</Link>
								</div>
							)}
						</div>

						{/* Settings */}
						<div className="space-y-6">
							<h3 className="text-xl font-semibold text-[#222222]">Account</h3>
							<div className="divide-y divide-[#ebebeb]">
								<Link href="/inbox" className="flex items-center justify-between w-full py-4 group">
									<div className="flex items-center gap-4 text-[#222222]">
										<FileText size={22} />
										<span className="text-base">Messages & Enquiries</span>
									</div>
									<ChevronRight size={20} className="text-[#b0b0b0]" />
								</Link>
								<Link href="/saved" className="flex items-center justify-between w-full py-4 group">
									<div className="flex items-center gap-4 text-[#222222]">
										<Shield size={22} />
										<span className="text-base">Saved Hoardings</span>
									</div>
									<ChevronRight size={20} className="text-[#b0b0b0]" />
								</Link>
							</div>
						</div>

						{/* Support */}
						<div className="mt-10 space-y-6">
							<h3 className="text-xl font-semibold text-[#222222]">Support</h3>
							<div className="divide-y divide-[#ebebeb]">
								<button className="flex items-center justify-between w-full py-4">
									<div className="flex items-center gap-4 text-[#222222]">
										<HelpCircle size={22} />
										<span className="text-base">How Hoardify works</span>
									</div>
									<ChevronRight size={20} className="text-[#b0b0b0]" />
								</button>
								<button className="flex items-center justify-between w-full py-4">
									<div className="flex items-center gap-4 text-[#222222]">
										<Settings size={22} />
										<span className="text-base">Give us feedback</span>
									</div>
									<ChevronRight size={20} className="text-[#b0b0b0]" />
								</button>
								<SignOutButton />
							</div>
						</div>
					</>
				) : (
					<>
						{/* Guest View */}
						<div className="flex items-center justify-between mb-12">
							<div>
								<h1 className="text-3xl font-bold text-[#222222]">Profile</h1>
								<p className="text-lg text-[#717171]">Guest User</p>
							</div>
							<div className="w-16 h-16 bg-[#717171] rounded-full flex items-center justify-center text-white text-2xl font-bold">
								G
							</div>
						</div>

						<div className="bg-white rounded-2xl border border-[#dddddd] shadow-[0_6px_16px_rgba(0,0,0,0.12)] p-6 mb-12">
							<h3 className="text-xl font-bold text-[#222222] mb-2">Hoardify your brand</h3>
							<p className="text-[#6a6a6a] mb-6">It&apos;s easy to start a campaign and reach thousands.</p>
							<Link href="/handler/sign-in" className="inline-block px-6 py-3 bg-[#ff385c] text-white rounded-lg font-bold hover:bg-[#e00b41] transition-colors">
								Log in
							</Link>
						</div>

						<div className="space-y-6">
							<h3 className="text-xl font-semibold text-[#222222]">Support</h3>
							<div className="divide-y divide-[#ebebeb]">
								<button className="flex items-center justify-between w-full py-4 group">
									<div className="flex items-center gap-4 text-[#222222]">
										<HelpCircle size={22} />
										<span className="text-base">How Hoardify works</span>
									</div>
									<ChevronRight size={20} className="text-[#b0b0b0]" />
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
