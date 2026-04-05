import { Search, SlidersHorizontal } from "lucide-react";
import HoardingCard from "@/components/hoardings/HoardingCard";
import Link from "next/link";

const MAP_NEARBY = [
	{
		id: "5",
		title: "Ranchi Main Road",
		imageUrl: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd",
		price: 75000,
		location: "Main Road",
	},
	{
		id: "6",
		title: "Overbridge Banner",
		imageUrl: "https://images.unsplash.com/photo-1563212036-7c9fa19020bd",
		price: 90000,
		location: "Ranchi Overbridge",
	},
];

export default function SearchMapPage() {
	return (
		<div className="relative flex h-full flex-col bg-gray-100 overflow-hidden dark:bg-gray-900 pb-[74px]">
			{/* Mock Map Background */}
			<div className="absolute inset-0 z-0 bg-[#e5e3df] dark:bg-[#242f3e]">
				{/* Map grid lines simulation */}
				<div className="w-full h-full opacity-20" style={{ backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
				
				{/* Mock Pins */}
				<div className="absolute top-[30%] left-[40%] flex flex-col items-center">
					<div className="p-2 bg-brand/20 rounded-full animate-pulse">
						<div className="p-2 bg-brand rounded-full shadow-lg"></div>
					</div>
				</div>
				<div className="absolute top-[50%] left-[20%] flex flex-col items-center">
					<div className="p-2 bg-brand rounded-full shadow-lg border-2 border-white"></div>
				</div>
				<div className="absolute top-[60%] right-[30%] flex flex-col items-center">
					<div className="p-2 bg-brand rounded-full shadow-lg border-2 border-white"></div>
				</div>
			</div>

			{/* Search Header Overlay */}
			<div className="relative z-10 p-4 pt-10">
				<div className="flex items-center gap-3 bg-white px-4 py-3 shadow-lg rounded-full dark:bg-gray-800">
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
				<div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar py-1">
					<button className="whitespace-nowrap px-4 py-1.5 bg-white shadow-sm rounded-full text-xs font-semibold dark:bg-gray-800">Price ∨</button>
					<button className="whitespace-nowrap px-4 py-1.5 bg-white shadow-sm rounded-full text-xs font-semibold dark:bg-gray-800">Category ∨</button>
					<button className="whitespace-nowrap px-4 py-1.5 bg-white shadow-sm rounded-full text-xs font-semibold dark:bg-gray-800">Features ∨</button>
				</div>
			</div>

			{/* Bottom Action Area */}
			<div className="absolute bottom-[2px] w-full z-10 px-4 left-0">
				<div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-gray-100 dark:bg-gray-900/90 dark:border-gray-800 relative bottom-3">
					<div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3 dark:bg-gray-700"></div>
					<h2 className="text-sm font-bold text-center mb-3">Billboards for rent Nearby</h2>
					<div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
						{MAP_NEARBY.map(hoarding => (
							<HoardingCard key={hoarding.id} {...hoarding} variant="compact" />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
