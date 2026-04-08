import { Search, Monitor, Smartphone, Video, Grid, Settings2, MapPin } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import HoardingCard from "@/components/hoardings/HoardingCard";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";
import Pill from "@/components/ui/Pill";
import Link from "next/link";
import { HOARDINGS } from "@/lib/mock-data";

export default function ExplorePage() {
	const mostViewed = HOARDINGS.slice(0, 3);
	const nearby = HOARDINGS.slice(3, 6);

	return (
		<div className="flex flex-col pb-6">
			<TopBar 
				isLogo 
				rightAction={
					<Link href="/search" className="btn-circle bg-[#222222] flex items-center justify-center shadow-md">
						<Search size={20} className="text-white" />
					</Link>
				} 
			/>

			{/* Most Viewed Section */}
			<section className="mt-6 px-4">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-bold text-[#222222]">Most Viewed</h2>
					<button className="text-sm font-medium text-[#ff385c]">See all</button>
				</div>
				<HorizontalScrollList>
					{mostViewed.map(hoarding => (
						<HoardingCard key={hoarding.id} {...hoarding} />
					))}
				</HorizontalScrollList>
			</section>

			{/* Categories Section */}
			<section className="mt-8">
				<h2 className="mb-4 px-4 text-xl font-bold text-[#222222]">Categories</h2>
				<HorizontalScrollList className="px-4">
					<Pill variant="category" active icon={<Monitor size={22} className="mb-1 block mx-auto" />} label="Lit Billboards" className="flex-col !gap-0 text-xs font-semibold" />
					<Pill variant="category" icon={<Grid size={22} className="mb-1 block mx-auto" />} label="Non-lit" className="flex-col !gap-0 text-xs font-semibold" />
					<Pill variant="category" icon={<Video size={22} className="mb-1 block mx-auto" />} label="Digital" className="flex-col !gap-0 text-xs font-semibold" />
					<Pill variant="category" icon={<Smartphone size={22} className="mb-1 block mx-auto" />} label="Mobile" className="flex-col !gap-0 text-xs font-semibold" />
				</HorizontalScrollList>
			</section>

			{/* Nearby Section */}
			<section className="mt-8 px-4">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-bold text-[#222222]">Nearby you</h2>
					<Link href="/filters" className="text-sm font-medium text-[#222222] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f2f2f2] hover:bg-gray-200 transition-colors">
						<Settings2 size={16} /> Filter
					</Link>
				</div>
				<div className="flex flex-col gap-4">
					{nearby.map(hoarding => (
						<HoardingCard key={hoarding.id} {...hoarding} variant="banner" />
					))}
				</div>
			</section>

			{/* Featured Map Preview Section */}
			<section className="mt-8 px-4">
				<div className="card-surface rounded-2xl p-4 bg-gradient-to-br from-[#fff0f3] to-white border border-[#ff385c]/10">
					<div className="flex items-center gap-3 mb-3">
						<div className="w-10 h-10 rounded-full bg-[#ff385c] flex items-center justify-center">
							<MapPin size={20} className="text-white" />
						</div>
						<div>
							<h3 className="font-bold text-[#222222]">Explore on Map</h3>
							<p className="text-xs text-[#6a6a6a]">Find hoardings near you</p>
						</div>
					</div>
					<Link href="/search" className="block w-full btn-primary text-center">
						Open Map View
					</Link>
				</div>
			</section>
		</div>
	);
}
