"use client";

import { User, Settings, FileText, ChevronRight } from "lucide-react";
import { useNavbar } from "@/components/layout/NavbarContext";
import { useEffect } from "react";

export default function ProfilePage() {
	const { setConfig } = useNavbar();

	useEffect(() => {
		setConfig({
			title: "Profile",
			isLogo: false
		});
	}, [setConfig]);

	return (
		<div className="flex flex-col min-h-screen pb-32 bg-background">
			
			<div className="px-4 mt-6">
				{/* Avatar / Identity */}
				<div className="bg-white p-5 rounded-3xl shadow-sm flex items-center gap-4 border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
					<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center dark:bg-gray-800">
						<User size={32} className="text-gray-400" />
					</div>
					<div>
						<h1 className="text-xl font-bold">Guest User</h1>
						<p className="text-sm text-brand font-medium">Log in to manage bookings</p>
					</div>
				</div>

				{/* Options List */}
				<div className="mt-8 flex flex-col gap-2">
					<button className="flex items-center justify-between w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-50 active:scale-[0.98] transition-transform dark:bg-gray-900 dark:border-gray-800">
						<div className="flex items-center gap-3 font-semibold text-gray-800 dark:text-gray-200">
							<FileText className="text-gray-400" size={20} /> My Bookings
						</div>
						<ChevronRight className="text-gray-300" size={20} />
					</button>

					<button className="flex items-center justify-between w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-50 active:scale-[0.98] transition-transform dark:bg-gray-900 dark:border-gray-800">
						<div className="flex items-center gap-3 font-semibold text-gray-800 dark:text-gray-200">
							<Settings className="text-gray-400" size={20} /> Settings
						</div>
						<ChevronRight className="text-gray-300" size={20} />
					</button>
				</div>
			</div>
		</div>
	);
}
