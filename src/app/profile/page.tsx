import { Metadata } from "next";
import { User, Settings, FileText, ChevronRight } from "lucide-react";
import NavbarSync from "@/components/layout/NavbarSync";

export const metadata: Metadata = {
	title: "Profile | Hoardify",
	description: "Manage your account, view bookings, and update your preferences on Hoardify.",
};

export default function ProfilePage() {
	return (
		<div className="flex flex-col min-h-screen pb-32 bg-background">
			<NavbarSync title="Profile" isLogo={false} />
			
			<div className="px-4 mt-6">
				{/* Avatar / Identity */}
				<div className="bg-white p-5 rounded-3xl shadow-sm flex items-center gap-4 border border-border-subtle dark:bg-zinc-900">
					<div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center dark:bg-zinc-800">
						<User size={32} className="text-zinc-400" />
					</div>
					<div>
						<h1 className="text-xl font-bold">Guest User</h1>
						<p className="text-sm text-brand font-medium">Log in to manage bookings</p>
					</div>
				</div>

				{/* Options List */}
				<div className="mt-8 flex flex-col gap-2">
					<button className="flex items-center justify-between w-full bg-white p-4 rounded-2xl shadow-sm border border-border-subtle active:scale-[0.98] transition-transform dark:bg-zinc-900">
						<div className="flex items-center gap-3 font-semibold text-text-secondary">
							<FileText className="text-zinc-400" size={20} /> My Bookings
						</div>
						<ChevronRight className="text-zinc-300" size={20} />
					</button>

					<button className="flex items-center justify-between w-full bg-white p-4 rounded-2xl shadow-sm border border-border-subtle active:scale-[0.98] transition-transform dark:bg-zinc-900">
						<div className="flex items-center gap-3 font-semibold text-text-secondary">
							<Settings className="text-zinc-400" size={20} /> Settings
						</div>
						<ChevronRight className="text-zinc-300" size={20} />
					</button>
				</div>
			</div>
		</div>
	);
}
