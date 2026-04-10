"use client";

import { Search, SlidersHorizontal, Map as MapIcon, List as ListIcon } from "lucide-react";
import HoardingCard from "@/components/hoardings/HoardingCard";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";
import GoogleMapWrapper from "@/components/maps/GoogleMapWrapper";
import Link from "next/link";
import { HOARDINGS } from "@/lib/mock-data";
import { useNavbar } from "@/components/layout/NavbarContext";
import { useEffect, useState } from "react";

export default function SearchMapPage() {
	const { setConfig } = useNavbar();
	const [viewMode, setViewMode] = useState<"map" | "list">("map");

	useEffect(() => {
		setConfig({
			title: "Search Results",
			showBack: true,
			isLogo: false,
			rightAction: (
				<button 
					onClick={() => setViewMode(prev => prev === "map" ? "list" : "map")}
					className="flex items-center gap-2 bg-text-primary text-background px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all active:scale-95"
				>
					{viewMode === "map" ? <><ListIcon size={14} /> List View</> : <><MapIcon size={14} /> Map View</>}
				</button>
			)
		});
	}, [setConfig, viewMode]);

	return (
		<div className="relative flex h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] flex-col overflow-hidden bg-background">
			{/* Desktop Layout: Side-by-side */}
			<div className="hidden md:flex flex-1 w-full overflow-hidden">
				{/* Sidebar results */}
				<div className="w-[400px] xl:w-[480px] h-full overflow-y-auto px-6 py-6 border-r border-border-subtle bg-white dark:bg-black">
					<div className="flex items-center justify-between mb-8">
						<h1 className="text-2xl font-black tracking-tighter">Nearby results</h1>
						<span className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary">32 FOUND</span>
					</div>
					
					<div className="flex flex-col gap-8">
						{HOARDINGS.map(hoarding => (
							<HoardingCard key={hoarding.id} {...hoarding} variant="large" />
						))}
					</div>
				</div>

				{/* Expanded Map */}
				<div className="flex-1 h-full bg-surface-sunken">
					<GoogleMapWrapper hoardings={HOARDINGS} />
				</div>
			</div>

			{/* Mobile Layout: Immersive Map with Overlays */}
			<div className="md:hidden flex-1 relative flex flex-col">
				{/* Map is always background in map view */}
				{viewMode === "map" ? (
					<>
						<div className="absolute inset-0 z-0">
							<GoogleMapWrapper hoardings={HOARDINGS} />
						</div>

						{/* Search Overlay for Mobile Map */}
						<div className="relative z-10 p-4 pt-4">
							<div className="flex items-center gap-3 glass-effect px-4 py-3 shadow-xl rounded-full pointer-events-auto">
								<Search size={18} className="text-text-tertiary" />
								<input 
									type="text" 
									placeholder="Search area..." 
									className="flex-1 bg-transparent outline-none text-sm font-bold tracking-tight text-text-primary"
									defaultValue="Mumbai, MH"
								/>
								<Link href="/filters" className="border-l border-border-subtle pl-3">
									<SlidersHorizontal size={18} className="text-brand" />
								</Link>
							</div>
						</div>

						{/* Bottom Card Area */}
						<div className="absolute bottom-6 w-full z-10 px-4 left-0">
							<div className="glass-effect rounded-[2.5rem] p-5 shadow-2xl border border-glass-border">
								<div className="w-12 h-1.5 bg-text-tertiary/20 rounded-full mx-auto mb-4"></div>
								<div className="flex items-center justify-between mb-4 px-2">
									<h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Featured Nearby</h2>
									<button className="text-[10px] font-black uppercase tracking-widest text-brand">See all</button>
								</div>
								<HorizontalScrollList className="pb-2">
									{HOARDINGS.slice(0, 4).map(hoarding => (
										<HoardingCard key={hoarding.id} {...hoarding} variant="compact" />
									))}
								</HorizontalScrollList>
							</div>
						</div>
					</>
				) : (
					/* Mobile List View */
					<div className="flex-1 overflow-y-auto px-6 py-6 bg-background">
						<div className="flex flex-col gap-6">
							{HOARDINGS.map(hoarding => (
								<HoardingCard key={hoarding.id} {...hoarding} variant="banner" />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
