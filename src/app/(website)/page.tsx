import { Monitor, Smartphone, Video, Grid, Settings2 } from "lucide-react";
import HoardingCard from "@/components/hoardings/HoardingCard";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";
import Link from "next/link";
import NavbarSync from "@/components/layout/NavbarSync";
import HoardingHero from "@/components/hoardings/HoardingHero";
import MapBridge from "@/components/hoardings/MapBridge";
import ChannelCard from "@/components/hoardings/ChannelCard";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

import { getTrendingHoardings, getNearbyHoardings, getCategoryCounts } from "@/actions/hoardings";

export default async function ExplorePage() {
	let user = null;
	try {
		user = await stackServerApp.getUser();
	} catch {
		// Auth service unavailable — redirect to landing
	}
	if (!user) {
		return redirect("/landing");
	}

	// Fetch real-time data from PostgreSQL via Server Actions
	const [trending, nearby, counts] = await Promise.all([
		getTrendingHoardings(6),
		getNearbyHoardings(4),
		getCategoryCounts()
	]);

	return (
		<div className="flex flex-col min-h-screen pb-32 bg-white">
			<NavbarSync isLogo title="Explore" />

			{/* Immersive Hero Section */}
			<HoardingHero />

			{/* Categories: Minimalist Channel Switcher */}
			<section className="mt-20 overflow-hidden mb-24">
				<div className="px-6 mb-10">
					<h2 className="text-2xl font-bold text-[#222222]">Browse by channel</h2>
					<p className="text-sm text-[#6a6a6a] mt-1">Curated inventory network in Ranchi</p>
				</div>
				<HorizontalScrollList className="px-6 scroll-px-6 pb-6">
					<ChannelCard active icon={<Monitor size={24} />} label="Lit Billboards" count={counts.lit} />
					<ChannelCard icon={<Grid size={24} />} label="Unipoles" count={counts.unipole} />
					<ChannelCard icon={<Video size={24} />} label="Digital OOH" count={counts.digital} />
					<ChannelCard icon={<Smartphone size={24} />} label="Transit OOH" count={counts.transit} />
				</HorizontalScrollList>
			</section>

			{/* Trending Showcase */}
			<section className="mb-24">
				<div className="px-6 mb-10 flex items-end justify-between">
					<div>
						<h2 className="text-2xl font-bold text-[#222222]">Trending now</h2>
						<p className="text-sm text-[#6a6a6a] mt-1">Most viewed placements this week</p>
					</div>
					<Link href="/search" className="text-sm font-semibold text-[#222222] underline underline-offset-4">Explore Map</Link>
				</div>
				<HorizontalScrollList className="px-6 scroll-px-6 gap-8">
					{trending.map(hoarding => (
						<HoardingCard key={hoarding.id} {...hoarding} />
					))}
				</HorizontalScrollList>
			</section>

			{/* Nearby: Geo-Context Grid */}
			<section className="mb-24 px-6">
				<div className="flex items-end justify-between mb-10">
					<div>
						<h2 className="text-2xl font-bold text-[#222222]">Inventory near you</h2>
						<p className="text-sm text-[#6a6a6a] mt-1">High-impact nodes in your area</p>
					</div>
					<Link href="/filters" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#dddddd] hover:border-[#222222] transition-colors">
						<Settings2 size={16} />
						<span className="text-sm font-semibold">Filters</span>
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{nearby.map(hoarding => (
						<HoardingCard key={hoarding.id} {...hoarding} variant="banner" />
					))}
				</div>
			</section>

			{/* Call to action Map Bridge */}
			<div className="mt-12">
				<MapBridge />
			</div>
		</div>
	);
}
