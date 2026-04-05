import { Search, Monitor, Smartphone, Video, Grid, Settings2 } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import HoardingCard from "@/components/hoardings/HoardingCard";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";
import Pill from "@/components/ui/Pill";
import Link from "next/link";
import { HOARDINGS } from "@/lib/mock-data";

export default function ExplorePage() {
	// Let's feature specific hoardings for the main page
	const mostViewed = HOARDINGS.slice(0, 3);
	const nearby = HOARDINGS.slice(3, 5);

	return (
		<div className="flex flex-col pb-6">
			<TopBar 
				isLogo 
				rightAction={
					<Link href="/search" className="rounded-full bg-brand p-2 text-white shadow-md">
						<Search size={20} />
					</Link>
				} 
			/>

			{/* Most Viewed Section */}
			<section className="mt-4 px-4">
				<h2 className="mb-3 text-lg font-bold">Most Viewed</h2>
				<HorizontalScrollList>
					{mostViewed.map(hoarding => (
						<HoardingCard key={hoarding.id} {...hoarding} />
					))}
				</HorizontalScrollList>
			</section>

			{/* Categories Section */}
			<section className="mt-4">
				<h2 className="mb-3 px-4 text-lg font-bold">Categories</h2>
				<HorizontalScrollList className="px-4">
					<Pill variant="category" active icon={<Monitor size={20} className="mb-1 block mx-auto" />} label="Lit Billboards" className="flex-col !gap-0 text-xs" />
					<Pill variant="category" icon={<Grid size={20} className="mb-1 block mx-auto" />} label="Non-lit Billboards" className="flex-col !gap-0 text-xs" />
					<Pill variant="category" icon={<Video size={20} className="mb-1 block mx-auto" />} label="Digital" className="flex-col !gap-0 text-xs" />
					<Pill variant="category" icon={<Smartphone size={20} className="mb-1 block mx-auto" />} label="Mobile" className="flex-col !gap-0 text-xs" />
				</HorizontalScrollList>
			</section>

			{/* Nearby Section */}
			<section className="mt-6 px-4">
				<div className="flex items-center justify-between mb-3">
					<h2 className="text-lg font-bold">Nearby you</h2>
					<Link href="/filters" className="text-xs text-brand font-medium flex items-center gap-1">
						<Settings2 size={14} /> Filter
					</Link>
				</div>
				<div className="flex flex-col gap-4">
					{nearby.map(hoarding => (
						<HoardingCard key={hoarding.id} {...hoarding} variant="banner" />
					))}
				</div>
			</section>
		</div>
	);
}
