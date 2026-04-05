import { Search, SlidersHorizontal } from "lucide-react";
import HoardingCard from "@/components/hoardings/HoardingCard";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";
import GoogleMapWrapper from "@/components/maps/GoogleMapWrapper";
import Link from "next/link";
import { HOARDINGS } from "@/lib/mock-data";

export default function SearchMapPage() {
	return (
		<div className="relative flex h-[100dvh] flex-col overflow-hidden pb-[74px]">
			{/* Real Google Map Background */}
			<div className="absolute inset-0 z-0 bg-gray-100 dark:bg-gray-900">
				<GoogleMapWrapper hoardings={HOARDINGS} />
			</div>

			{/* Search Header Overlay */}
			<div className="relative z-10 p-4 pt-10 pointer-events-none">
				<div className="flex items-center gap-3 bg-white px-4 py-3 shadow-lg rounded-full dark:bg-gray-800 pointer-events-auto">
					<Link href="/">
						<Search size={20} className="text-gray-400" />
					</Link>
					<input 
						type="text" 
						placeholder="Nearby" 
						className="flex-1 bg-transparent outline-none text-sm font-medium"
						defaultValue="Nearby"
					/>
					<Link href="/filters" className="border-l pl-3 dark:border-gray-700">
						<SlidersHorizontal size={18} className="text-gray-500" />
					</Link>
				</div>
				
				{/* Map Quick Filters */}
				<div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar py-1 pointer-events-auto">
					<button className="whitespace-nowrap px-4 py-1.5 bg-white shadow-sm rounded-full text-xs font-semibold dark:bg-gray-800">Price ∨</button>
					<button className="whitespace-nowrap px-4 py-1.5 bg-white shadow-sm rounded-full text-xs font-semibold dark:bg-gray-800">Category ∨</button>
					<button className="whitespace-nowrap px-4 py-1.5 bg-white shadow-sm rounded-full text-xs font-semibold dark:bg-gray-800">Features ∨</button>
				</div>
			</div>

			{/* Bottom Action Area */}
			<div className="absolute bottom-[2px] w-full z-10 px-4 left-0 pointer-events-none">
				<div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-gray-100 dark:bg-gray-900/90 dark:border-gray-800 relative bottom-3 pointer-events-auto">
					<div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3 dark:bg-gray-700"></div>
					<h2 className="text-sm font-bold text-center mb-3">Billboards for rent Nearby</h2>
					<HorizontalScrollList className="pb-1">
						{HOARDINGS.slice(0, 4).map(hoarding => (
							<HoardingCard key={hoarding.id} {...hoarding} variant="compact" />
						))}
					</HorizontalScrollList>
				</div>
			</div>
		</div>
	);
}
