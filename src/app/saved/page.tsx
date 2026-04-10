"use client";

import HoardingCard from "@/components/hoardings/HoardingCard";
import { HOARDINGS } from "@/lib/mock-data";
import { Heart } from "lucide-react";
import { useNavbar } from "@/components/layout/NavbarContext";
import { useEffect } from "react";

export default function SavedPage() {
	const savedHoardings = HOARDINGS.slice(0, 2);
	const { setConfig } = useNavbar();

	useEffect(() => {
		setConfig({
			title: "Saved Hoardings",
			isLogo: false
		});
	}, [setConfig]);

	return (
		<div className="flex flex-col min-h-screen pb-32 bg-background">
			<div className="px-4 mt-4">
				{savedHoardings.length > 0 ? (
					<div className="flex flex-col gap-4">
						{savedHoardings.map(hoarding => (
							<HoardingCard key={hoarding.id} {...hoarding} variant="banner" />
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center pt-24 text-center">
						<Heart size={48} className="text-gray-200 mb-4 dark:text-gray-800" strokeWidth={1.5} />
						<p className="text-gray-500 font-medium">No saved hoardings yet.</p>
					</div>
				)}
			</div>
		</div>
	);
}
