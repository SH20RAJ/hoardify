import { Search, SlidersHorizontal } from "lucide-react";
import HoardingCard from "@/components/hoardings/HoardingCard";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";
import GoogleMapWrapper from "@/components/maps/GoogleMapWrapper";
import Link from "next/link";
import { hoardings } from "@/db/schema";

type DBHoarding = typeof hoardings.$inferSelect;

interface MapListViewProps {
	viewMode: "map" | "list";
	hoardings: DBHoarding[];
}

export default function MapListView({ viewMode, hoardings }: MapListViewProps) {
	return (
		<div className="relative flex h-[calc(100vh-144px)] flex-col overflow-hidden bg-background transition-colors duration-300">
			{/* Desktop Layout: Side-by-side */}
			<div className="hidden md:flex flex-1 w-full overflow-hidden">
				<div className="w-[400px] xl:w-[480px] h-full overflow-y-auto px-6 py-8 border-r border-border-subtle bg-background">
					<div className="flex items-center justify-between mb-8">
						<h1 className="text-xl font-black text-text-primary tracking-tight">Inventory in Ranchi</h1>
						<span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">{hoardings.length} results found</span>
					</div>
					<div className="flex flex-col gap-10">
						{hoardings.map(hoarding => (
							<HoardingCard key={hoarding.id} {...hoarding} variant="large" />
						))}
					</div>
				</div>
				<div className="flex-1 h-full bg-surface-sunken">
					<GoogleMapWrapper hoardings={hoardings} />
				</div>
			</div>

			{/* Mobile Layout */}
			<div className="md:hidden flex-1 relative flex flex-col">
				{viewMode === "map" ? (
					<>
						<div className="absolute inset-0 z-0">
							<GoogleMapWrapper hoardings={hoardings} />
						</div>
						<div className="relative z-10 p-4">
							<div className="flex items-center gap-3 bg-background/90 backdrop-blur-md px-5 py-3.5 shadow-premium-lg rounded-full border border-border-subtle">
								<Search size={18} className="text-brand" />
								<input 
									type="text" 
									placeholder="Search area..." 
									className="flex-1 bg-transparent outline-none text-sm font-bold text-text-primary placeholder:text-text-tertiary"
									defaultValue="Ranchi, JH"
								/>
								<Link href="/filters" className="border-l border-border-subtle pl-4 ml-1">
									<SlidersHorizontal size={18} className="text-text-primary" />
								</Link>
							</div>
						</div>
						<div className="absolute bottom-4 w-full z-10 px-4 left-0">
							<div className="bg-background/95 backdrop-blur-xl rounded-[2rem] p-4 shadow-premium-xl border border-border-subtle max-h-[45vh] overflow-y-auto">
								<div className="w-10 h-1.5 bg-border-strong rounded-full mx-auto mb-5"></div>
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-sm font-black text-text-primary uppercase tracking-tight">Nearby Nodes</h2>
									<button className="text-[10px] font-black underline underline-offset-4 text-brand uppercase tracking-widest">See all</button>
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
					<div className="flex-1 overflow-y-auto px-4 py-6 bg-background">
						<div className="flex flex-col gap-10">
							{hoardings.map(hoarding => (
								<HoardingCard key={hoarding.id} {...hoarding} variant="banner" />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
