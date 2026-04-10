import { Search, Monitor, Smartphone, Video, Grid, Settings2, MapPin, ArrowRight } from "lucide-react";
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
		<div className="flex flex-col pb-32">
			<TopBar 
				isLogo 
				title="Discovery"
				rightAction={
					<Link href="/search" className="flex h-10 w-10 items-center justify-center rounded-full bg-text-primary shadow-lg shadow-black/20 transition-all active:scale-90">
						<Search size={18} className="text-background" />
					</Link>
				} 
			/>

			{/* Hero / Promo Section */}
			<section className="mt-6 px-4">
				<div className="relative overflow-hidden rounded-[2rem] bg-zinc-950 p-8 text-white shadow-2xl shadow-zinc-950/20">
					<div className="relative z-10 max-w-[240px]">
						<h1 className="text-3xl font-black leading-[1.1] tracking-tight">
							Book the world&apos;s <span className="text-brand">biggest</span> stages.
						</h1>
						<p className="mt-3 text-sm font-medium text-zinc-400">
							Premium billboards in high-traffic locations. 
						</p>
						<Link href="/search" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-black uppercase tracking-widest text-zinc-950 transition-all hover:scale-105 active:scale-95">
							Start Exploring <ArrowRight size={14} />
						</Link>
					</div>
					
					{/* Abstract UI Elements for "Startup" feel */}
					<div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand opacity-20 blur-[80px]" />
					<div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-500 opacity-20 blur-[80px]" />
				</div>
			</section>

			{/* Categories Section - Moved up for better discovery */}
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

			{/* Most Viewed Section */}
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

			{/* Premium Map Bridge */}
			<section className="mt-12 px-6">
				<div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-100 to-zinc-200 p-8 dark:from-zinc-900 dark:to-zinc-800 border border-border-subtle">
					<div className="relative z-10">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-xl shadow-brand/30 mb-6">
							<MapPin size={24} />
						</div>
						<h3 className="text-2xl font-black tracking-tight text-text-primary mb-2">Visual Planning</h3>
						<p className="text-sm font-medium text-text-secondary mb-8 max-w-[200px]">
							Use our interactive map to plan your city-wide coverage effortlessly.
						</p>
						<Link href="/search" className="btn-primary w-full">
							Open Intelligence Map
						</Link>
					</div>
					
					{/* Decorative Map Pattern or Mesh */}
					<div className="absolute -bottom-10 -right-10 h-48 w-48 opacity-10 rotate-12">
						<Grid size={120} className="text-text-primary" />
					</div>
				</div>
			</section>
		</div>
	);
}
