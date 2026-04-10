"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Heart, MapPin, Calendar, CreditCard, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import SelectDates from "@/components/ui/SelectDates";
import GoogleMapWrapper from "@/components/maps/GoogleMapWrapper";
import { HOARDINGS } from "@/lib/mock-data";
import { notFound, useParams } from "next/navigation";
import { useNavbar } from "@/components/layout/NavbarContext";
import { useEffect, useState } from "react";

export default function HoardingDetailPage() {
	const params = useParams();
	const id = params.id as string;
	const hoarding = HOARDINGS.find((h) => h.id === id);
	const { setConfig } = useNavbar();

	useEffect(() => {
		if (hoarding) {
			setConfig({
				title: hoarding.title,
				showBack: true,
				isLogo: false,
				rightAction: (
					<div className="flex gap-2">
						<button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-sunken transition-all active:scale-90">
							<Share2 size={18} />
						</button>
						<button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-sunken transition-all active:scale-90 text-brand">
							<Heart size={18} fill="currentColor" />
						</button>
					</div>
				)
			});
		}
	}, [hoarding, setConfig]);

	if (!hoarding) return notFound();

	return (
		<div className="flex flex-col min-h-screen bg-background pb-32">
			<div className="max-w-7xl mx-auto w-full px-4 md:px-6 mt-4 md:mt-8">
				<div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
					
					{/* Left Column: Image Gallery (and Map on Mobile) */}
					<div className="w-full lg:w-[60%] flex flex-col gap-6">
						<div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] shadow-xl shadow-black/5 group">
							<Image src={hoarding.imageUrl} alt={hoarding.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority unoptimized />
							<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent md:hidden" />
							
							{/* Mobile Back Button (Inside image on mobile) */}
							<Link href="/" className="md:hidden absolute top-6 left-6 h-12 w-12 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-lg text-text-primary z-20">
								<ArrowLeft size={24} />
							</Link>

							{/* Image indicator */}
							<div className="absolute bottom-6 right-6 px-3 py-1.5 rounded-full glass-effect text-[10px] font-bold uppercase tracking-widest text-text-primary shadow-lg border border-glass-border">
								Premium Placement
							</div>
						</div>

						{/* Desktop Map (Visible on Desktop here) */}
						<div className="hidden lg:block w-full">
							<h2 className="text-xl font-black tracking-tight mb-4 flex items-center gap-2">
								<MapPin size={20} className="text-brand" /> Accurate Location
							</h2>
							<div className="w-full h-80 bg-surface-sunken rounded-[2rem] relative overflow-hidden border border-border-subtle shadow-inner">
								<GoogleMapWrapper 
									hoardings={[hoarding]} 
									center={hoarding.coordinates} 
									zoom={15} 
									disableUI={false} 
								/>
							</div>
						</div>
					</div>

					{/* Right Column: Key Info & Booking */}
					<div className="w-full lg:w-[40%] flex flex-col gap-8">
						<div>
							<div className="flex items-center gap-2 mb-3">
								<span className="px-3 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-black uppercase tracking-widest border border-brand/10">
									{hoarding.status}
								</span>
								<span className="px-3 py-1 rounded-full bg-surface-sunken text-text-tertiary text-[10px] font-bold uppercase tracking-widest">
									Verified
								</span>
							</div>
							<h1 className="text-4xl font-black tracking-tighter leading-[1.1] text-text-primary mb-4">{hoarding.title}</h1>
							<p className="text-lg font-medium text-text-secondary">{hoarding.location}</p>
						</div>

						<div className="card-premium p-6 border-brand/20 bg-brand/[0.02]">
							<div className="flex items-center justify-between mb-6">
								<div className="flex flex-col">
									<span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-1">Rental Price</span>
									<span className="text-3xl font-black tracking-tighter text-text-primary">{formatCurrency(hoarding.price)}</span>
								</div>
								<div className="text-right">
									<span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-1">Duration</span>
									<span className="block text-sm font-bold text-text-secondary italic">Per Month</span>
								</div>
							</div>
							<button className="btn-brand w-full !py-4 text-sm shadow-brand/40">
								Request Booking Now
							</button>
							<p className="text-[10px] text-center mt-4 font-bold uppercase tracking-widest text-text-tertiary">
								No cancellation fees for first 48h
							</p>
						</div>

						{/* Date Selection */}
						<div>
							<h3 className="text-xl font-black tracking-tight mb-6 flex items-center gap-2">
								<Calendar size={20} className="text-brand" /> Availability Calendar
							</h3>
							<SelectDates />
						</div>

						{/* Features Grid */}
						<div className="grid grid-cols-2 gap-4">
							{hoarding.features.map((feature, i) => (
								<div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-surface-sunken border border-border-subtle transition-all hover:bg-white hover:shadow-lg hover:border-brand/20">
									<ShieldCheck size={18} className="text-brand shrink-0" />
									<span className="text-xs font-bold leading-tight text-text-secondary">{feature}</span>
								</div>
							))}
						</div>

						{/* Mobile Map Preview */}
						<div className="lg:hidden w-full">
							<h2 className="text-xl font-black tracking-tight mb-4 flex items-center gap-2">
								<MapPin size={20} className="text-brand" /> Location Details
							</h2>
							<div className="w-full h-56 bg-surface-sunken rounded-[2rem] relative overflow-hidden border border-border-subtle shadow-inner">
								<GoogleMapWrapper 
									hoardings={[hoarding]} 
									center={hoarding.coordinates} 
									zoom={15} 
									disableUI={true} 
									gestureHandling="none" 
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
