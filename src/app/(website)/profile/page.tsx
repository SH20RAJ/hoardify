import { Metadata } from "next";
import { User, Settings, FileText, ChevronRight, HelpCircle, Shield } from "lucide-react";
import NavbarSync from "@/components/layout/NavbarSync";

export const metadata: Metadata = {
	title: "Profile | Hoardify",
	description: "Manage your account, view bookings, and update your preferences on Hoardify.",
};

export default function ProfilePage() {
	return (
		<div className="flex flex-col min-h-screen pb-32 bg-white">
			<NavbarSync title="Profile" isLogo={false} />
			
			<div className="max-w-2xl mx-auto w-full px-6 py-10">
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
					<button className="px-6 py-3 bg-[#ff385c] text-white rounded-lg font-bold">Log in</button>
				</div>

				<div className="space-y-6">
					<h3 className="text-2xl font-semibold text-[#222222]">Settings</h3>
					<div className="divide-y divide-[#ebebeb]">
						<button className="flex items-center justify-between w-full py-4 group">
							<div className="flex items-center gap-4 text-[#222222]">
								<User size={24} className="text-[#222222]" />
								<span className="text-base font-normal">Personal information</span>
							</div>
							<ChevronRight size={20} className="text-[#222222]" />
						</button>
						<button className="flex items-center justify-between w-full py-4 group">
							<div className="flex items-center gap-4 text-[#222222]">
								<Shield size={24} className="text-[#222222]" />
								<span className="text-base font-normal">Login & security</span>
							</div>
							<ChevronRight size={20} className="text-[#222222]" />
						</button>
						<button className="flex items-center justify-between w-full py-4 group">
							<div className="flex items-center gap-4 text-[#222222]">
								<FileText size={24} className="text-[#222222]" />
								<span className="text-base font-normal">Payments & payouts</span>
							</div>
							<ChevronRight size={20} className="text-[#222222]" />
						</button>
					</div>
				</div>

				<div className="mt-12 space-y-6">
					<h3 className="text-2xl font-semibold text-[#222222]">Support</h3>
					<div className="divide-y divide-[#ebebeb]">
						<button className="flex items-center justify-between w-full py-4 group">
							<div className="flex items-center gap-4 text-[#222222]">
								<HelpCircle size={24} className="text-[#222222]" />
								<span className="text-base font-normal">How Hoardify works</span>
							</div>
							<ChevronRight size={20} className="text-[#222222]" />
						</button>
						<button className="flex items-center justify-between w-full py-4 group">
							<div className="flex items-center gap-4 text-[#222222]">
								<Settings size={24} className="text-[#222222]" />
								<span className="text-base font-normal">Give us feedback</span>
							</div>
							<ChevronRight size={20} className="text-[#222222]" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
