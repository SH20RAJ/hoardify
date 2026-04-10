"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Map as MapIcon, List as ListIcon, Sparkles, Send } from "lucide-react";
import HoardingCard from "@/components/hoardings/HoardingCard";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";
import GoogleMapWrapper from "@/components/maps/GoogleMapWrapper";
import Link from "next/link";
import NavbarSync from "@/components/layout/NavbarSync";
import { HoardingType } from "@/lib/mock-data";

interface SearchClientContainerProps {
	hoardings: HoardingType[];
}

export default function SearchClientContainer({ hoardings }: SearchClientContainerProps) {
	const [viewMode, setViewMode] = useState<"map" | "list">("map");
	const [activeContext, setActiveContext] = useState<string>("All");
	const [isAIChatOpen, setIsAIChatOpen] = useState(false);
	const [aiQuery, setAiQuery] = useState("");

	const contexts = [
		{ label: "All", count: hoardings.length },
		{ label: "High-Traffic", count: 12 },
		{ label: "Retail Focus", count: 8 },
		{ label: "Corporate Hubs", count: 5 },
		{ label: "Transit", count: 4 },
	];

	return (
		<>
			<NavbarSync 
				title={
					<div className="flex items-center gap-2">
						<span>Explore Contexts</span>
						<div className="bg-brand/10 text-brand text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">AI Active</div>
					</div>
				}
				showBack
				isLogo={false}
				rightAction={
					<button 
						onClick={() => setViewMode(prev => prev === "map" ? "list" : "map")}
						className="flex items-center gap-2 bg-text-primary text-background px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all active:scale-95"
					>
						{viewMode === "map" ? <><ListIcon size={14} /> List View</> : <><MapIcon size={14} /> Map View</>}
					</button>
				}
			/>

			{/* Search Context Bar (Context 7 Style) */}
			<div className="bg-white border-b border-border-subtle px-4 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
				{/* AI Trigger */}
				<button
					onClick={() => setIsAIChatOpen(!isAIChatOpen)}
					className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
						isAIChatOpen 
							? "bg-text-primary text-background border-text-primary" 
							: "bg-surface-sunken text-brand border-brand/20 animate-pulse hover:bg-brand/5"
					}`}
				>
					<Sparkles size={12} fill="currentColor" />
					Ask Hoardify
				</button>
				
				<div className="h-6 w-[1px] bg-border-subtle mx-1" />

				{contexts.map((ctx) => (
					<button
						key={ctx.label}
						onClick={() => setActiveContext(ctx.label)}
						className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
							activeContext === ctx.label 
								? "bg-brand text-white shadow-lg shadow-brand/20" 
								: "bg-surface-sunken text-text-tertiary border border-transparent hover:border-brand/20"
						}`}
					>
						{ctx.label}
						<span className={`opacity-50 ${activeContext === ctx.label ? "text-white" : "text-text-tertiary"}`}>{ctx.count}</span>
					</button>
				))}
			</div>

			{/* AI Conversational Interface Overlay */}
			{isAIChatOpen && (
				<div className="absolute top-32 left-4 right-4 z-[60] md:left-6 md:w-[400px]">
					<div className="glass-effect p-4 border-2 border-brand/30 shadow-2xl rounded-[2rem] animate-in slide-in-from-top-4 duration-300">
						<div className="flex items-center gap-2 mb-4">
							<div className="h-8 w-8 rounded-full bg-brand flex items-center justify-center text-white">
								<Sparkles size={14} fill="currentColor" />
							</div>
							<div>
								<h3 className="text-xs font-black uppercase tracking-widest text-text-primary">Gemini Search Context</h3>
								<p className="text-[10px] font-medium text-text-tertiary">Real-time localized intelligence active</p>
							</div>
						</div>
						
						<div className="bg-surface-sunken p-3 rounded-2xl mb-4 text-xs font-medium text-text-secondary leading-relaxed border border-border-subtle">
							&quot;Find me a high-traffic spot near Ranchi Main Road that would be visible to morning commuters heading to the station.&quot;
						</div>

						<div className="relative">
							<input 
								type="text" 
								value={aiQuery}
								onChange={(e) => setAiQuery(e.target.value)}
								placeholder="Describe your target audience..." 
								className="w-full h-12 bg-white rounded-xl pl-4 pr-12 text-sm font-medium border border-border-subtle focus:border-brand outline-none transition-all"
							/>
							<button className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-brand text-white rounded-lg flex items-center justify-center transition-transform active:scale-95">
								<Send size={14} />
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="relative flex h-[calc(100vh-128px)] md:h-[calc(100vh-148px)] flex-col overflow-hidden bg-background">


				{/* Desktop Layout: Side-by-side */}
				<div className="hidden md:flex flex-1 w-full overflow-hidden">
					{/* Sidebar results */}
					<div className="w-[400px] xl:w-[480px] h-full overflow-y-auto px-6 py-6 border-r border-border-subtle bg-white dark:bg-black">
						<div className="flex items-center justify-between mb-8">
							<h1 className="text-2xl font-black tracking-tighter">Nearby results</h1>
							<span className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary">{hoardings.length} FOUND</span>
						</div>
						
						<div className="flex flex-col gap-8">
							{hoardings.map(hoarding => (
								<HoardingCard key={hoarding.id} {...hoarding} variant="large" />
							))}
						</div>
					</div>

					{/* Expanded Map */}
					<div className="flex-1 h-full bg-surface-sunken">
						<GoogleMapWrapper hoardings={hoardings} />
					</div>
				</div>

				{/* Mobile Layout: Immersive Map with Overlays */}
				<div className="md:hidden flex-1 relative flex flex-col">
					{/* Map is always background in map view */}
					{viewMode === "map" ? (
						<>
							<div className="absolute inset-0 z-0">
								<GoogleMapWrapper hoardings={hoardings} />
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
										{hoardings.slice(0, 4).map(hoarding => (
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
								{hoardings.map(hoarding => (
									<HoardingCard key={hoarding.id} {...hoarding} variant="banner" />
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
