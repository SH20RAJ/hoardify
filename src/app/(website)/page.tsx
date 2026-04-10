import { Metadata } from "next";
import { db } from "@/db";
import { hoardings } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Monitor, Smartphone, Video, Grid, Settings2, MapPin, ArrowRight, Sparkles } from "lucide-react";
import HoardingCard from "@/components/hoardings/HoardingCard";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";
import Link from "next/link";
import NavbarSync from "@/components/layout/NavbarSync";
import HoardingHero from "@/components/hoardings/HoardingHero";
import MapBridge from "@/components/hoardings/MapBridge";
import Pill from "@/components/ui/Pill";

export const metadata: Metadata = {
	title: "Hoardify | The Operating System for Outdoor Advertising",
	description: "Discover, analyze and book premium high-traffic billboards. The most transparent outdoor advertising platform.",
};

export default async function ExplorePage() {
	// Fetch real-time data from PostgreSQL via Drizzle
	const [trending, nearby] = await Promise.all([
		db.select().from(hoardings).orderBy(desc(hoardings.createdAt)).limit(6),
		db.select().from(hoardings).limit(4)
	]);

	return (
		<div className="flex flex-col min-h-screen pb-32 bg-background selection:bg-brand/30">
			<NavbarSync isLogo title="Discovery" />

			{/* Immersive Hero Section */}
			<HoardingHero />

			{/* Strategy / Product Focus - NEW billion dollar section */}
			<section className="mt-20 px-6">
				<div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand text-[10px] font-black uppercase tracking-widest mb-6">
						<Sparkles size={12} fill="currentColor" /> Premium Context 7 Deployment
					</div>
					<h2 className="text-4xl md:text-5xl font-black tracking-tighter text-text-primary leading-[0.9] mb-6">
						Data-Driven <br />
						<span className="text-brand">Outdoor Intelligence.</span>
					</h2>
					<p className="text-sm font-medium text-text-secondary leading-relaxed">
						Stop guessing where your audience lives. Hoardify uses traffic intelligence to surface the most impactful placements in Ranchi.
					</p>
				</div>
			</section>

			{/* Categories: Minimalist Channel Switcher */}
			<section className="overflow-hidden mb-20">
				<div className="flex items-center justify-between px-6 mb-8">
					<div className="flex flex-col">
						<h2 className="text-xl font-bold tracking-tight text-text-primary">Premium Channels</h2>
						<p className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary">Curated Inventory</p>
					</div>
					<Link href="/filters" className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-sunken hover:bg-brand/5 group transition-all">
						<ArrowRight size={18} className="text-text-tertiary group-hover:text-brand transition-colors" />
					</Link>
				</div>
				<HorizontalScrollList className="px-6 scroll-px-6">
					<Pill variant="category" active icon={<Monitor size={18} />} label="Lit Billboards" className="flex-col !gap-2 !py-6 !px-8 text-[9px] font-black uppercase tracking-widest border-2" />
					<Pill variant="category" icon={<Grid size={18} />} label="Unipoles" className="flex-col !gap-2 !py-6 !px-8 text-[9px] font-black uppercase tracking-widest border-2" />
					<Pill variant="category" icon={<Video size={18} />} label="Digital OOH" className="flex-col !gap-2 !py-6 !px-8 text-[9px] font-black uppercase tracking-widest border-2" />
					<Pill variant="category" icon={<Smartphone size={18} />} label="Transit" className="flex-col !gap-2 !py-6 !px-8 text-[9px] font-black uppercase tracking-widest border-2" />
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

