import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Heart, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Mock data fetcher
async function getHoarding(id: string) {
	return {
		id,
		title: "Billboard",
		price: 50000,
		status: "For Rent",
		features: ["Classic Billboard", "Large 14x48 ft", "High visibility", "Weather proof"],
		location: "Sujata Chowk, M.G. Road",
		imageUrl: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd"
	};
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
	const p = await params;
	const hoarding = await getHoarding(p.id);
	
	return {
		title: `${hoarding.title} at ${hoarding.location} | Hoardify`,
		description: `Rent this ${hoarding.features.join(", ")} billboard located at ${hoarding.location}.`,
		openGraph: {
			images: [{ url: hoarding.imageUrl }],
		}
	};
}

export default async function HoardingDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const p = await params;
	const hoarding = await getHoarding(p.id);

	return (
		<div className="flex flex-col min-h-screen bg-white dark:bg-black pb-8">
			{/* Image Header with Actions */}
			<div className="relative h-64 w-full sm:h-80">
				<Image src={hoarding.imageUrl} alt={hoarding.title} fill className="object-cover" priority />
				<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
				
				{/* Top Actions */}
				<div className="absolute top-4 w-full flex justify-between px-4 z-10">
					<Link href="/" className="bg-white/90 p-2 rounded-full shadow-md text-black dark:text-black">
						<ArrowLeft size={20} />
					</Link>
					<div className="flex gap-2">
						<button className="bg-white/90 p-2 rounded-full shadow-md text-black">
							<Share2 size={20} />
						</button>
						<button className="bg-white/90 p-2 rounded-full shadow-md text-black">
							<Heart size={20} />
						</button>
					</div>
				</div>

				{/* Image indicator */}
				<div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
					1/9
				</div>
			</div>

			<div className="px-5 mt-5">
				{/* Header Info */}
				<div className="flex justify-between items-start mb-2">
					<div>
						<h1 className="text-2xl font-bold">{hoarding.title}</h1>
						<div className="text-lg font-semibold mt-1 flex items-center gap-2">
							{formatCurrency(hoarding.price)}
						</div>
					</div>
					<button className="bg-brand text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md shrink-0">
						Contact Owner
					</button>
				</div>
				<div className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mb-4 dark:bg-green-900/30 dark:text-green-400">
					{hoarding.status}
				</div>

				{/* Features List */}
				<ul className="flex flex-col gap-1.5 mb-6 text-sm text-gray-600 dark:text-gray-300 font-medium">
					{hoarding.features.map((feature, i) => (
						<li key={i}>{feature}</li>
					))}
				</ul>

				{/* Location Details */}
				<div className="mb-6">
					<h2 className="text-lg font-bold mb-2">Location</h2>
					<p className="text-sm text-gray-600 mb-3 font-medium dark:text-gray-300">{hoarding.location}</p>
					
					{/* Map Preview */}
					<div className="w-full h-32 bg-gray-100 rounded-xl relative overflow-hidden border border-gray-200 shadow-inner dark:bg-gray-800 dark:border-gray-700">
						<div className="w-full h-full opacity-30" style={{ backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
							<div className="bg-black text-white p-2 text-xs rounded-md mb-1 px-3 shadow-md border border-gray-700 whitespace-nowrap">
								{hoarding.location}
							</div>
							<div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-black"></div>
						</div>
					</div>
				</div>

				{/* Select Dates */}
				<div className="mb-6">
					<h2 className="text-lg font-bold mb-3">Select Dates</h2>
					{/* Horizontal Calendar Mock */}
					<div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-y border-gray-100 py-3 dark:border-gray-800">
						{["16 July", "17 July", "18 July", "19 July", "20 July"].map((date, i) => (
							<div key={i} className={`flex flex-col items-center justify-center border rounded-xl min-w-[60px] h-[70px] ${i === 0 ? "border-brand bg-brand/5 text-brand" : "border-gray-200 text-gray-400 dark:border-gray-800"}`}>
								<span className="text-xs uppercase font-semibold">{date.split(" ")[1]}</span>
								<span className="text-xl font-bold">{date.split(" ")[0]}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
