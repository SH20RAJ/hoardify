import { Metadata } from "next";
import Image from "next/image";
import { Share2, Heart, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import GoogleMapWrapper from "@/components/maps/GoogleMapWrapper";
import { getHoardingById, getHoardings } from "@/actions/hoardings";
import { notFound } from "next/navigation";
import BookingCard from "@/components/hoardings/BookingCard";
import NavbarSync from "@/components/layout/NavbarSync";
import AudienceInsights from "@/components/hoardings/AudienceInsights";
import HoardingCard from "@/components/hoardings/HoardingCard";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
	const p = await params;
	const hoarding = await getHoardingById(p.id);
	
	if (!hoarding) return { title: "Not Found" };

	return {
		title: `${hoarding.title} | Hoardify`,
		description: `Rent this premium billboard at ${hoarding.location}.`,
		openGraph: {
			images: [{ url: hoarding.imageUrl }],
		}
	};
}

export default async function HoardingDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const p = await params;
	const hoarding = await getHoardingById(p.id);

	if (!hoarding) return notFound();
	
	const all = await getHoardings();
	const relatedHoardings = all.filter(h => h.id !== hoarding.id).slice(0, 4);

	return (
		<div className="flex flex-col min-h-screen bg-white pb-32">
			<NavbarSync 
				title={hoarding.title}
				showBack
				isLogo={false}
				rightAction={
					<div className="flex gap-4">
						<button className="flex items-center gap-2 underline font-semibold text-sm text-[#222222]">
							<Share2 size={16} /> Share
						</button>
						<button className="flex items-center gap-2 underline font-semibold text-sm text-[#222222]">
							<Heart size={16} /> Save
						</button>
					</div>
				}
			/>

			<div className="max-w-7xl mx-auto w-full px-4 md:px-6 mt-6 md:mt-10">
				<div className="flex flex-col lg:flex-row gap-12">
					
					{/* Left Column: Details */}
					<div className="w-full lg:w-[60%]">
						<section className="mb-10">
							<div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#ebebeb]">
								<Image src={hoarding.imageUrl} alt={hoarding.title} fill className="object-cover" priority unoptimized />
							</div>
						</section>

						<section className="border-b border-[#ebebeb] pb-10">
							<div className="flex flex-col">
								<h1 className="text-3xl font-semibold text-[#222222] mb-2">{hoarding.title}</h1>
								<div className="flex items-center gap-2 text-[#222222] font-normal">
									<MapPin size={18} />
									<span className="text-lg underline underline-offset-4 font-semibold">{hoarding.location}</span>
								</div>
							</div>
						</section>

						<section className="py-10 border-b border-[#ebebeb]">
							<h3 className="text-2xl font-semibold text-[#222222] mb-6">What this place offers</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{hoarding.features.map((feature, i) => (
									<div key={i} className="flex items-center gap-4 text-[#222222]">
										<ShieldCheck size={24} className="text-[#717171]" />
										<span className="text-base">{feature}</span>
									</div>
								))}
							</div>
						</section>

						<AudienceInsights views={hoarding.views} />

						<section className="py-10">
							<h3 className="text-2xl font-semibold text-[#222222] mb-6">Where you&apos;ll be seen</h3>
							<div className="w-full h-[450px] bg-[#f7f7f7] rounded-2xl relative overflow-hidden border border-[#ebebeb]">
								<GoogleMapWrapper 
									hoardings={[hoarding]} 
									center={{
										lat: parseFloat(hoarding.lat),
										lng: parseFloat(hoarding.lng)
									}} 
									zoom={15} 
									disableUI={false} 
								/>
							</div>
						</section>
					</div>

					{/* Right Column: Sticky Booking Card */}
					<div className="w-full lg:w-[40%]">
						<div className="lg:sticky lg:top-32">
							<BookingCard price={hoarding.price} />
							
							<div className="mt-8 flex items-center justify-center gap-2 p-6 rounded-2xl bg-[#f7f7f7] border border-[#ebebeb]">
								<div className="h-2 w-2 rounded-full bg-[#008a05]" />
								<p className="text-sm font-semibold text-[#222222]">
									This is a rare find. It&apos;s usually booked.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Recommended Section */}
				<section className="mt-24 pt-16 border-t border-[#ebebeb]">
					<div className="flex items-end justify-between mb-10">
						<div>
							<h2 className="text-2xl font-semibold text-[#222222]">Explore other options nearby</h2>
							<p className="text-sm text-[#717171] mt-1">Boost your reach with multi-node deployments</p>
						</div>
						<div className="hidden md:flex gap-2">
							<div className="p-2 border border-[#dddddd] rounded-full hover:shadow-md transition-shadow cursor-pointer">
								<ArrowRight size={20} className="rotate-180" />
							</div>
							<div className="p-2 border border-[#dddddd] rounded-full hover:shadow-md transition-shadow cursor-pointer">
								<ArrowRight size={20} />
							</div>
						</div>
					</div>
					<HorizontalScrollList className="px-0">
						{relatedHoardings.map(h => (
							<HoardingCard key={h.id} {...h} />
						))}
					</HorizontalScrollList>
				</section>
			</div>
		</div>
	);
}
