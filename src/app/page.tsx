import { Search, Monitor, Smartphone, Video, Grid, Settings2 } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import HoardingCard from "@/components/hoardings/HoardingCard";
import Pill from "@/components/ui/Pill";
import Link from "next/link";

// Mock Data
const MOST_VIEWED = [
	{
		id: "1",
		title: "Billboards in M.G. Road",
		imageUrl: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd",
		price: 50000,
		location: "Sujata Chowk",
		views: "150,000+",
	},
	{
		id: "2",
		title: "Digital display near Airport",
		imageUrl: "https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a",
		price: 120000,
		location: "Airport Road",
		views: "200,000+",
	},
];

const NEARBY = [
	{
		id: "3",
		title: "Ratu Road Junction",
		imageUrl: "https://images.unsplash.com/photo-1563212036-7c9fa19020bd",
		price: 45000,
		location: "Ratu Road",
	},
	{
		id: "4",
		title: "Gantries on Circular Road",
		imageUrl: "https://images.unsplash.com/photo-1623945952611-64547bebb948",
		price: 80000,
		location: "Circular Road",
	},
];

export default function ExplorePage() {
	return (
		<div className="flex flex-col pb-6">
			<TopBar 
				isLogo 
				rightAction={
					<Link href="/search" className="rounded-full bg-brand p-2 text-white shadow-md">
						<Search size={20} />
					</Link>
				} 
			/>

			{/* Most Viewed Section */}
			<section className="mt-4 px-4">
				<h2 className="mb-3 text-lg font-bold">Most Viewed</h2>
				<div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
					{MOST_VIEWED.map(hoarding => (
						<HoardingCard key={hoarding.id} {...hoarding} />
					))}
				</div>
			</section>

			{/* Categories Section */}
			<section className="mt-4">
				<h2 className="mb-3 px-4 text-lg font-bold">Categories</h2>
				<div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar">
					<Pill variant="category" active icon={<Monitor size={20} className="mb-1 block mx-auto" />} label="Lit Billboards" className="flex-col !gap-0 text-xs" />
					<Pill variant="category" icon={<Grid size={20} className="mb-1 block mx-auto" />} label="Non-lit Billboards" className="flex-col !gap-0 text-xs" />
					<Pill variant="category" icon={<Video size={20} className="mb-1 block mx-auto" />} label="Digital" className="flex-col !gap-0 text-xs" />
					<Pill variant="category" icon={<Smartphone size={20} className="mb-1 block mx-auto" />} label="Mobile" className="flex-col !gap-0 text-xs" />
				</div>
			</section>

			{/* Nearby Section */}
			<section className="mt-6 px-4">
				<div className="flex items-center justify-between mb-3">
					<h2 className="text-lg font-bold">Nearby you</h2>
					<Link href="/filters" className="text-xs text-brand font-medium flex items-center gap-1">
						<Settings2 size={14} /> Filter
					</Link>
				</div>
				<div className="flex flex-col gap-4">
					{NEARBY.map(hoarding => (
						<HoardingCard key={hoarding.id} {...hoarding} variant="banner" />
					))}
				</div>
			</section>
		</div>
	);
}
