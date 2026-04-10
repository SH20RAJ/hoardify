import { Metadata } from "next";
import { Monitor, Smartphone, Video, Grid, Settings2, MapPin, ArrowRight } from "lucide-react";
import HoardingCard from "@/components/hoardings/HoardingCard";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";
import Pill from "@/components/ui/Pill";
import Link from "next/link";
import { HOARDINGS } from "@/lib/mock-data";
import NavbarSync from "@/components/layout/NavbarSync";
import HoardingHero from "@/components/hoardings/HoardingHero";
import MapBridge from "@/components/hoardings/MapBridge";

export const metadata: Metadata = {
	title: "Hoardify | Premium Billboard Marketplace",
	description: "Discover and book premium high-traffic billboards. The most transparent outdoor advertising platform.",
};

export default function ExplorePage() {
	const mostViewed = HOARDINGS.slice(0, 3);
	const nearby = HOARDINGS.slice(3, 6);

	return (
		<div className="flex flex-col pb-32">
			<NavbarSync isLogo title="Discovery" />

			{/* Hero / Promo Section */}
			<HoardingHero />

			{/* Categories Section */}
			<section className="mt-10 overflow-hidden">
				<div className="flex items-center justify-between px-6 mb-6">
					<h2 className="text-xl font-bold tracking-tight text-text-primary">Premium Channels</h2>
					<Link href="/filters" className="text-xs font-bold uppercase tracking-widest text-brand">View All</Link>
				</div>
				<HorizontalScrollList className="px-6 scroll-px-6">
					<Pill variant="category" active icon={<Monitor size={20} />} label="Lit Billboards" className="flex-col !gap-2 text-[10px] font-bold uppercase tracking-widest" />
					<Pill variant="category" icon={<Grid size={20} />} label="Unipoles" className="flex-col !gap-2 text-[10px] font-bold uppercase tracking-widest" />
					<Pill variant="category" icon={<Video size={20} />} label="Digital OOH" className="flex-col !gap-2 text-[10px] font-bold uppercase tracking-widest" />
					<Pill variant="category" icon={<Smartphone size={20} />} label="Transit" className="flex-col !gap-2 text-[10px] font-bold uppercase tracking-widest" />
					<Pill variant="category" icon={<Monitor size={20} />} label="Wall Wraps" className="flex-col !gap-2 text-[10px] font-bold uppercase tracking-widest" />
				</HorizontalScrollList>
			</section>

			{/* Trending Section */}
			<section className="mt-12">
				<div className="px-6 mb-6">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-black tracking-tight text-text-primary">Trending Now</h2>
						<span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-sunken">
							<ArrowRight size={16} className="text-text-tertiary" />
						</span>
					</div>
					<p className="text-xs font-bold uppercase tracking-widest text-text-tertiary mt-1">High Impact Inventory</p>
				</div>
				<HorizontalScrollList className="px-6 scroll-px-6">
					{mostViewed.map(hoarding => (
						<HoardingCard key={hoarding.id} {...hoarding} />
					))}
				</HorizontalScrollList>
			</section>

			{/* Nearby Section */}
			<section className="mt-12 px-6">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h2 className="text-2xl font-black tracking-tight text-text-primary">Inventory Near You</h2>
						<div className="flex items-center gap-1.5 mt-1">
							<div className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
							<p className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary">Real-time availability</p>
						</div>
					</div>
					<Link href="/filters" className="flex items-center gap-2 rounded-full bg-surface-sunken px-4 py-2 hover:bg-zinc-200 transition-all active:scale-95">
						<Settings2 size={14} className="text-text-primary" />
						<span className="text-[10px] font-bold uppercase tracking-widest">Filters</span>
					</Link>
				</div>
				<div className="flex flex-col gap-6">
					{nearby.map(hoarding => (
						<HoardingCard key={hoarding.id} {...hoarding} variant="banner" />
					))}
				</div>
			</section>

			{/* Map Bridge */}
			<MapBridge />
		</div>
	);
}
