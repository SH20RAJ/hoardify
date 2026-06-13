import { Metadata } from "next";
import { Share2, Heart, MapPin, ShieldCheck, ArrowRight, Compass } from "lucide-react";
import GoogleMapWrapper from "@/components/maps/GoogleMapWrapper";
import { getHoardingById, getHoardings } from "@/actions/hoardings";
import { notFound } from "next/navigation";
import BookingCard from "@/components/hoardings/BookingCard";
import NavbarSync from "@/components/layout/NavbarSync";
import AudienceInsights from "@/components/hoardings/AudienceInsights";
import HoardingCard from "@/components/hoardings/HoardingCard";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";
import HeroImage from "@/components/hoardings/HeroImage";

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
		<div className="flex flex-col min-h-screen bg-white pb-28 md:pb-32">
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

			<div className="max-w-7xl mx-auto w-full px-3 md:px-6 mt-4 md:mt-10">
				<div className="flex flex-col lg:flex-row gap-8 md:gap-12">
					
					{/* Left Column: Details */}
					<div className="w-full lg:w-[60%]">
						<section className="mb-6 md:mb-10">
							<HeroImage src={hoarding.imageUrl} alt={hoarding.title} id={hoarding.id} images={hoarding.images} videoUrl={hoarding.videoUrl} />
						</section>

						<section className="border-b border-[#ebebeb] pb-6 md:pb-10">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
								<div className="flex flex-col">
									<h1 className="text-2xl md:text-3xl font-semibold text-[#222222] mb-2">{hoarding.title}</h1>
									<div className="flex items-center gap-2 text-[#222222] font-normal">
										<MapPin size={16} />
										<span className="text-base md:text-lg underline underline-offset-4 font-semibold">{hoarding.location}</span>
									</div>
								</div>
								<a
									href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${hoarding.lat},${hoarding.lng}`}
									target="_blank"
									rel="noopener noreferrer"
									className="flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#ebebeb] hover:bg-[#f7f7f7] text-xs font-bold uppercase tracking-widest text-[#222222] transition-all duration-200 shadow-sm hover:shadow shrink-0"
								>
									<Compass size={16} />
									See in 3D
								</a>
							</div>
						</section>

						<section className="py-6 md:py-10 border-b border-[#ebebeb]">
							<h3 className="text-xl md:text-2xl font-semibold text-[#222222] mb-4 md:mb-6">What this place offers</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
								{hoarding.category && (
									<div className="flex items-center gap-3 md:gap-4 text-[#222222]">
										<ShieldCheck size={24} className="text-[#717171]" />
										<span className="text-base">Type: {hoarding.category}</span>
									</div>
								)}
								{hoarding.lighting && (
									<div className="flex items-center gap-3 md:gap-4 text-[#222222]">
										<ShieldCheck size={24} className="text-[#717171]" />
										<span className="text-base">Lighting: {hoarding.lighting}</span>
									</div>
								)}
								{hoarding.dimensions && (
									<div className="flex items-center gap-3 md:gap-4 text-[#222222]">
										<ShieldCheck size={24} className="text-[#717171]" />
										<span className="text-base">Size: {hoarding.dimensions}</span>
									</div>
								)}
								{hoarding.features.map((feature, i) => (
									<div key={i} className="flex items-center gap-4 text-[#222222]">
										<ShieldCheck size={24} className="text-[#717171]" />
										<span className="text-base">{feature}</span>
									</div>
								))}
							</div>
						</section>

						{hoarding.description && (
						<section className="py-6 md:py-10 border-b border-[#ebebeb]">
							<h3 className="text-xl md:text-2xl font-semibold text-[#222222] mb-4 md:mb-6">About this placement</h3>
								<p className="text-[#222222] leading-relaxed whitespace-pre-wrap">
									{hoarding.description}
								</p>
							</section>
						)}

						<section className="py-6 md:py-10 border-b border-[#ebebeb]">
							<h3 className="text-xl md:text-2xl font-semibold text-[#222222] mb-4 md:mb-6">Reach & Impact</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
								<div className="p-4 md:p-6 rounded-2xl bg-[#f7f7f7] border border-[#ebebeb]">
									<p className="text-sm text-[#717171] font-semibold uppercase tracking-wider mb-1">Estimated Reach</p>
									<p className="text-3xl font-bold text-[#222222]">{hoarding.trafficCount ? hoarding.trafficCount.toLocaleString() : "50,000+"}</p>
									<p className="text-xs text-[#717171] mt-1">Monthly impressions (local data)</p>
								</div>
								<div className="p-4 md:p-6 rounded-2xl bg-[#f7f7f7] border border-[#ebebeb]">
									<p className="text-sm text-[#717171] font-semibold uppercase tracking-wider mb-1">Audience View</p>
									<p className="text-3xl font-bold text-[#222222]">{hoarding.views || "100%"}</p>
									<p className="text-xs text-[#717171] mt-1">Direct line-of-sight visibility</p>
								</div>
							</div>
						</section>

						<section className="py-6 md:py-10">
							<h3 className="text-xl md:text-2xl font-semibold text-[#222222] mb-4 md:mb-6">Where you&apos;ll be seen</h3>
							<div className="w-full h-[320px] sm:h-[400px] md:h-[450px] bg-[#f7f7f7] rounded-2xl relative overflow-hidden border border-[#ebebeb]">
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

					{/* Right Column: Sticky Booking Card & Calendar */}
					<div className="w-full lg:w-[40%]">
					<div className="lg:sticky lg:top-32">
						<BookingCard price={hoarding.price} hoardingId={hoarding.id} />

						<div className="mt-4 md:mt-8 flex items-center justify-center gap-2 p-4 md:p-6 rounded-2xl bg-[#f7f7f7] border border-[#ebebeb]">
								<div className="h-2 w-2 rounded-full bg-[#008a05]" />
								<p className="text-sm font-semibold text-[#222222]">
									This is a rare find. It&apos;s usually booked.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Recommended Section */}
				<section className="mt-12 md:mt-24 pt-10 md:pt-16 border-t border-[#ebebeb]">
					<div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-10 gap-4">
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
							<HoardingCard key={h.id} id={h.id} title={h.title} imageUrl={h.imageUrl} images={h.images} price={h.price} location={h.location} views={h.views} lat={h.lat} lng={h.lng} />
						))}
					</HorizontalScrollList>
				</section>
			</div>

			{/* Dynamic Structured Data / JSON-LD for Search Engines */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify([
						{
							"@context": "https://schema.org",
							"@type": "Product",
							"name": hoarding.title,
							"image": hoarding.imageUrl,
							"description": hoarding.description || `Premium outdoor advertising billboard space located at ${hoarding.location}.`,
							"sku": `HOARD-${hoarding.id}`,
							"mpn": hoarding.id.toString(),
							"brand": {
								"@type": "Brand",
								"name": "Hoardify"
							},
							"offers": {
								"@type": "Offer",
								"url": `https://hoardify.in/hoardings/${hoarding.id}`,
								"priceCurrency": "INR",
								"price": hoarding.price,
								"priceValidUntil": "2027-12-31",
								"itemCondition": "https://schema.org/NewCondition",
								"availability": "https://schema.org/InStock",
								"seller": {
									"@type": "Organization",
									"name": "Hoardify",
									"url": "https://hoardify.in"
								}
							},
							"additionalProperty": [
								{
									"@type": "PropertyValue",
									"name": "Location",
									"value": hoarding.location
								},
								{
									"@type": "PropertyValue",
									"name": "Media Type",
									"value": hoarding.category || "Billboard"
								},
								{
									"@type": "PropertyValue",
									"name": "Lighting",
									"value": hoarding.lighting || "Non-lit"
								},
								{
									"@type": "PropertyValue",
									"name": "Dimensions",
									"value": hoarding.dimensions || "N/A"
								},
								{
									"@type": "PropertyValue",
									"name": "Latitude",
									"value": hoarding.lat
								},
								{
									"@type": "PropertyValue",
									"name": "Longitude",
									"value": hoarding.lng
								},
								{
									"@type": "PropertyValue",
									"name": "Monthly Traffic Estimate",
									"value": hoarding.trafficCount ? hoarding.trafficCount.toString() : "50000"
								}
							]
						},
						{
							"@context": "https://schema.org",
							"@type": "LocalBusiness",
							"name": hoarding.title,
							"image": hoarding.imageUrl,
							"priceRange": `₹${hoarding.price}`,
							"telephone": "+91-0000000000",
							"address": {
								"@type": "PostalAddress",
								"streetAddress": hoarding.location,
								"addressLocality": "Ranchi",
								"addressRegion": "Jharkhand",
								"addressCountry": "IN"
							},
							"geo": {
								"@type": "GeoCoordinates",
								"latitude": parseFloat(hoarding.lat),
								"longitude": parseFloat(hoarding.lng)
							},
							"url": `https://hoardify.in/hoardings/${hoarding.id}`
						}
					])
				}}
			/>
		</div>
	);
}
