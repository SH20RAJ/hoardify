import { Metadata } from "next";
import HoardingCard from "@/components/hoardings/HoardingCard";
import { HOARDINGS } from "@/lib/mock-data";
import { Heart } from "lucide-react";
import NavbarSync from "@/components/layout/NavbarSync";

export const metadata: Metadata = {
	title: "Saved Hoardings | Hoardify",
	description: "View and manage your saved hoardings and billboards for future campaigns.",
};

export default function SavedPage() {
	const savedHoardings = HOARDINGS.slice(0, 2);

	return (
		<div className="flex flex-col min-h-screen pb-32 bg-background">
			<NavbarSync title="Saved Hoardings" isLogo={false} />
			<div className="px-4 mt-4">
				{savedHoardings.length > 0 ? (
					<div className="flex flex-col gap-4">
						{savedHoardings.map(hoarding => (
							<HoardingCard key={hoarding.id} {...hoarding} variant="banner" />
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center pt-24 text-center">
						<Heart size={48} className="text-zinc-200 mb-4 dark:text-zinc-800" strokeWidth={1.5} />
						<p className="text-zinc-500 font-medium">No saved hoardings yet.</p>
					</div>
				)}
			</div>
		</div>
	);
}
