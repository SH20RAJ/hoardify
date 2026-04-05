import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Heart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import SelectDates from "@/components/ui/SelectDates";
import GoogleMapWrapper from "@/components/maps/GoogleMapWrapper";
import { HOARDINGS } from "@/lib/mock-data";
import { notFound } from "next/navigation";

// Mock data fetcher
async function getHoarding(id: string) {
	const hoarding = HOARDINGS.find((h) => h.id === id);
	if (!hoarding) return null;
	return hoarding;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
	const p = await params;
	const hoarding = await getHoarding(p.id);
	
	if (!hoarding) return { title: "Not Found" };

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

	if (!hoarding) return notFound();

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
					1/1
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
					
					{/* Real Map Preview */}
					<div className="w-full h-40 bg-gray-100 rounded-xl relative overflow-hidden border border-gray-200 shadow-inner dark:bg-gray-800 dark:border-gray-700">
						<GoogleMapWrapper 
							hoardings={[hoarding]} 
							center={hoarding.coordinates} 
							zoom={15} 
							disableUI={true} 
							gestureHandling="none" 
						/>
					</div>
				</div>

				{/* Select Dates */}
				<div className="mb-6">
					<h2 className="text-lg font-bold mb-3">Select Dates</h2>
					<SelectDates />
				</div>
			</div>
		</div>
	);
}
