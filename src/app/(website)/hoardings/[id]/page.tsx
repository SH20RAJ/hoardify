import { Metadata } from "next";
import Image from "next/image";
import { Share2, Heart, MapPin, Calendar, ShieldCheck, ArrowRight } from "lucide-react";
import SelectDates from "@/components/ui/SelectDates";
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
		title: `${hoarding.title} at ${hoarding.location} | Hoardify`,
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
		<div className="flex flex-col min-h-screen bg-background pb-32">
			<NavbarSync 
				title={hoarding.title}
				showBack
				isLogo={false}
				rightAction={
					<div className="flex gap-2">
						<button className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm transition-all active:scale-90 border border-border-subtle">
							<Share2 size={18} />
						</button>
						<button className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm transition-all active:scale-90 text-brand border border-border-subtle">
							<Heart size={18} fill="currentColor" />
						</button>
					</div>
				}
			/>

			<div className="max-w-7xl mx-auto w-full px-4 md:px-6 mt-4 md:mt-8">
				<div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
					
					{/* Left Column: Image Gallery, Insights, Location */}
					<div className="w-full lg:w-[60%] flex flex-col gap-12">
						<section>
							<div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-black/5 group">
								<Image src={hoarding.imageUrl} alt={hoarding.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority unoptimized />
								<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent md:hidden" />
								
								{/* Image indicator */}
								<div className="absolute bottom-8 right-8 px-4 py-2 rounded-full glass-effect text-[11px] font-black uppercase tracking-widest text-text-primary shadow-xl border border-glass-border">
									Live Premium Placement
								</div>
							</div>
						</section>

						{/* Identity & Features */}
						<section>
							<div className="flex flex-col mb-8">
								<div className="flex items-center gap-2 mb-4">
									<span className="px-3 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-black uppercase tracking-widest border border-brand/5">
										{hoarding.status}
									</span>
									<span className="px-3 py-1 rounded-full bg-surface-sunken text-text-tertiary text-[10px] font-bold uppercase tracking-widest">
										Instant Booking Available
									</span>
								</div>
								<h1 className="text-5xl font-black tracking-tighter leading-none text-text-primary mb-4">{hoarding.title}</h1>
								<div className="flex items-center gap-2 text-text-secondary font-bold">
									<MapPin size={18} className="text-brand" />
									<span className="text-lg">{hoarding.location}</span>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								{hoarding.features.map((feature, i) => (
									<div key={i} className="flex items-center gap-3 p-5 rounded-3xl bg-surface-sunken border border-border-subtle transition-all hover:bg-white hover:shadow-xl hover:border-brand/20">
										<ShieldCheck size={20} className="text-brand shrink-0" />
										<span className="text-sm font-bold leading-tight text-text-secondary">{feature}</span>
									</div>
								))}
							</div>
						</section>

						{/* Audience Intelligence Component */}
						<AudienceInsights />

						{/* Location Details Section */}
						<section>
							<h3 className="text-xl font-black tracking-tight mb-6 flex items-center gap-2">
								Placement Strategy
							</h3>
							<p className="text-base text-text-secondary font-medium leading-relaxed mb-8">
								This high-visibility placement is situated at one of the city&apos;s most critical junctions, ensuring maximum dwell time and repeated exposure for daily commuters and premium travelers.
							</p>
							<div className="w-full h-96 bg-surface-sunken rounded-[2.5rem] relative overflow-hidden border border-border-subtle shadow-inner group">
								<GoogleMapWrapper 
									hoardings={[hoarding]} 
									center={{
										lat: parseFloat(hoarding.lat),
										lng: parseFloat(hoarding.lng)
									}} 
									zoom={15} 
									disableUI={false} 
								/>

								<div className="absolute top-6 left-6 pointer-events-none">
									<div className="glass-effect px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-text-primary shadow-lg">
										Intersection View
									</div>
								</div>
							</div>
						</section>
					</div>

					{/* Right Column: Sticky Booking Card & Calendar */}
					<div className="w-full lg:w-[40%]">
						<div className="lg:sticky lg:top-32 flex flex-col gap-8">
							<BookingCard price={hoarding.price} />

							{/* Date Selection */}
							<div className="p-6 bg-white rounded-[2rem] border border-border-subtle shadow-sm">
								<h3 className="text-sm font-black uppercase tracking-widest text-text-tertiary mb-6 flex items-center gap-2">
									<Calendar size={16} /> Campaign Window
								</h3>
								<SelectDates />
							</div>
							
							<div className="p-6 bg-brand/[0.03] rounded-[2rem] border border-brand/5 border-dashed">
								<p className="text-[11px] font-bold text-brand leading-relaxed">
									Campaigns starting within 7 days get an complimentary artwork inspection by our design experts.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Recommended Section at the bottom */}
				<section className="mt-24 pt-12 border-t border-border-subtle">
					<div className="flex items-center justify-between mb-8 overflow-hidden">
						<div>
							<h2 className="text-3xl font-black tracking-tighter text-text-primary">Recommended Nearby</h2>
							<p className="text-xs font-bold uppercase tracking-widest text-text-tertiary mt-1">Boost your coverage reach</p>
						</div>
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-sunken">
							<ArrowRight size={20} className="text-text-primary" />
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
