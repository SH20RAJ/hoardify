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
		<div className="relative flex h-[calc(100vh-144px)] flex-col overflow-hidden bg-white">
			{/* Desktop Layout: Side-by-side */}
			<div className="hidden md:flex flex-1 w-full overflow-hidden">
				<div className="w-[400px] xl:w-[480px] h-full overflow-y-auto px-6 py-6 border-r border-[#ebebeb] bg-white">
					<div className="flex items-center justify-between mb-8">
						<h1 className="text-xl font-bold text-[#222222]">Inventory in Ranchi</h1>
						<span className="text-xs font-medium text-[#717171]">{hoardings.length} results</span>
					</div>
					<div className="flex flex-col gap-10">
						{hoardings.map(hoarding => (
							<HoardingCard key={hoarding.id} {...hoarding} variant="large" />
						))}
					</div>
				</div>
				<div className="flex-1 h-full bg-[#f7f7f7]">
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
							<div className="flex items-center gap-3 bg-white px-4 py-3 shadow-[0_6px_16px_rgba(0,0,0,0.12)] rounded-full border border-[#ebebeb]">
								<Search size={18} className="text-[#222222]" />
								<input 
									type="text" 
									placeholder="Search area..." 
									className="flex-1 bg-transparent outline-none text-sm font-medium text-[#222222]"
									defaultValue="Ranchi, JH"
								/>
								<Link href="/filters" className="border-l border-[#ebebeb] pl-3">
									<SlidersHorizontal size={18} className="text-[#222222]" />
								</Link>
							</div>
						</div>
						<div className="absolute bottom-6 w-full z-10 px-4 left-0">
							<div className="bg-white rounded-2xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.15)] border border-[#ebebeb]">
								<div className="w-10 h-1 bg-[#dddddd] rounded-full mx-auto mb-4"></div>
								<div className="flex items-center justify-between mb-4">
									<h2 className="text-sm font-bold text-[#222222]">Nearby</h2>
									<button className="text-xs font-semibold underline text-[#222222]">See all</button>
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
					<div className="flex-1 overflow-y-auto px-6 py-6 bg-white">
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
