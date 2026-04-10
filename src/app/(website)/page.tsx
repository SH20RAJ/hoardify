import { Monitor, Smartphone, Video, Grid, Settings2, Sparkles } from "lucide-react";
import HoardingCard from "@/components/hoardings/HoardingCard";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";
import Link from "next/link";
import NavbarSync from "@/components/layout/NavbarSync";
import HoardingHero from "@/components/hoardings/HoardingHero";
import MapBridge from "@/components/hoardings/MapBridge";
import ChannelCard from "@/components/hoardings/ChannelCard";

import { getTrendingHoardings, getNearbyHoardings, getCategoryCounts } from "@/actions/hoardings";

export default async function ExplorePage() {
	// Fetch real-time data from PostgreSQL via Server Actions
	const [trending, nearby, counts] = await Promise.all([
		getTrendingHoardings(6),
		getNearbyHoardings(4),
		getCategoryCounts()
	]);


	return (
		<div className="flex flex-col min-h-screen pb-32 bg-background selection:bg-brand/30">
			<NavbarSync isLogo title="Discovery" />

			{/* Immersive Hero Section */}
			<HoardingHero />

			{/* Strategy / Product Focus - NEW billion dollar section */}
			<section className="mt-24 px-6">
				<div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand text-[10px] font-black uppercase tracking-widest mb-6">
						<Sparkles size={12} fill="currentColor" /> Intelligence V7.2
					</div>
					<h2 className="text-4xl md:text-6xl font-black tracking-tighter text-text-primary leading-[0.9] mb-8">
						Strategic <br />
						<span className="text-brand">OOH Intelligence.</span>
					</h2>
					<p className="text-sm md:text-base font-medium text-text-secondary leading-relaxed max-w-lg">
						Stop guessing where your audience lives. Hoardify uses localized traffic intelligence to surface the most impactful placements in the city.
					</p>
				</div>
			</section>

			{/* Categories: Minimalist Channel Switcher */}
			<section className="overflow-hidden mb-32">
				<div className="px-6 mb-12 flex items-end justify-between">
					<div className="flex flex-col">
						<h2 className="text-2xl font-black tracking-tighter text-text-primary uppercase italic">Premium Channels</h2>
						<p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">Curated Network</p>
					</div>
					<Link href="/filters" className="text-[10px] font-black uppercase tracking-widest text-brand border-b-2 border-brand/20 hover:border-brand transition-all pb-1">View Full Channel List</Link>
				</div>
				<HorizontalScrollList className="px-6 scroll-px-6 pb-6">
					<ChannelCard active icon={<Monitor size={24} />} label="Lit Billboards" count={counts.lit} />
					<ChannelCard icon={<Grid size={24} />} label="Unipoles" count={counts.unipole} />
					<ChannelCard icon={<Video size={24} />} label="Digital OOH" count={counts.digital} />
					<ChannelCard icon={<Smartphone size={24} />} label="Transit OOH" count={counts.transit} />
				</HorizontalScrollList>
			</section>


			{/* Trending: Pulse Showcase */}
			<section className="mt-12 mb-24">
				<div className="px-6 mb-10 flex items-baseline justify-between select-none">
					<div>
						<h2 className="text-3xl font-black tracking-tighter text-text-primary">Trending Now</h2>
						<div className="flex items-center gap-1.5 mt-1">
							<div className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
							<p className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary">Real-time Volume Analysis</p>
						</div>
					</div>
					<Link href="/search" className="text-[10px] font-black uppercase tracking-widest text-brand border-b-2 border-brand/20 hover:border-brand transition-all pb-1">Explore Map</Link>
				</div>
				<HorizontalScrollList className="px-6 scroll-px-6 gap-8">
					{trending.map(hoarding => (
						<HoardingCard key={hoarding.id} {...hoarding} />
					))}
				</HorizontalScrollList>
			</section>

			{/* Nearby: Geo-Context Grid */}
			<section className="mt-12 px-6">
				<div className="flex items-center justify-between mb-12">
					<div>
						<h2 className="text-3xl font-black tracking-tighter text-text-primary">Inventory Near You</h2>
						<p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mt-1">Localized Reach</p>
					</div>
					<Link href="/filters" className="flex h-12 items-center gap-3 rounded-full bg-surface-sunken px-6 hover:bg-zinc-200 transition-all active:scale-95">
						<Settings2 size={16} className="text-text-primary" />
						<span className="text-[10px] font-black uppercase tracking-widest text-text-primary">Refine Search</span>
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{nearby.map(hoarding => (
						<HoardingCard key={hoarding.id} {...hoarding} variant="banner" />
					))}
				</div>
			</section>

			{/* Call to action Map Bridge */}
			<div className="mt-32">
				<MapBridge />
			</div>
		</div>
	);
}

