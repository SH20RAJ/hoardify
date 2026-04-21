import { Metadata } from "next";
import HoardingCard from "@/components/hoardings/HoardingCard";
import { getTrendingHoardings } from "@/actions/hoardings";
import NavbarSync from "@/components/layout/NavbarSync";

export const metadata: Metadata = {
	title: "Saved | Hoardify",
	description: "View and manage your saved hoardings and billboards for future campaigns.",
};

export default async function SavedPage() {
	const savedHoardings = await getTrendingHoardings(2);

	return (
		<div className="flex flex-col min-h-screen pb-32 bg-white">
			<NavbarSync title="Wishlist" isLogo={false} />
			<div className="max-w-7xl mx-auto w-full px-6 py-12">
				<h1 className="text-3xl font-bold text-[#222222] mb-12">Wishlist</h1>
				
				{savedHoardings.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
						{savedHoardings.map(hoarding => (
							<HoardingCard key={hoarding.id} {...hoarding} />
						))}
					</div>
				) : (
					<div className="py-24 flex flex-col items-center justify-center text-center border-t border-[#ebebeb]">
						<h2 className="text-xl font-semibold text-[#222222] mb-2">Create your first wishlist</h2>
						<p className="text-base text-[#717171] max-w-[320px] mb-8">
							As you browse, tap the heart icon to save your favorite placements to a wishlist.
						</p>
						<button className="px-8 py-3 bg-[#222222] text-white rounded-lg font-bold">Start exploring</button>
					</div>
				)}
			</div>
		</div>
	);
}
