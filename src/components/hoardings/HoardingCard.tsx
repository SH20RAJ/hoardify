"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { formatCurrency } from "@/lib/utils";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export type HoardingVariant = "large" | "compact" | "banner";

interface HoardingCardProps {
	id: string | number;
	title: string;
	imageUrl: string;
	images?: string[];
	price?: number;
	location?: string;
	views?: string | null;
	variant?: HoardingVariant;
	lat?: string | number;
	lng?: string | number;
}

export default function HoardingCard({
	id,
	title,
	imageUrl,
	images = [],
	price,
	location,
	variant = "large",
	lat,
	lng,
}: HoardingCardProps) {
	const allImages = [imageUrl, ...images].filter(Boolean);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

	const handleImageError = useCallback((index: number) => {
		setImgErrors(prev => new Set(prev).add(index));
	}, []);

	const getImgSrc = useCallback((index: number) => {
		if (imgErrors.has(index)) return `https://picsum.photos/seed/${id}-${index}/800/600`;
		return allImages[index];
	}, [imgErrors, allImages, id]);

	const prev = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentIndex(i => (i - 1 + allImages.length) % allImages.length);
	}, [allImages.length]);

	const next = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentIndex(i => (i + 1) % allImages.length);
	}, [allImages.length]);

	const hasMultiple = allImages.length > 1;

	if (variant === "compact") {
		return (
			<Link href={`/hoardings/${id}`} className="block flex-shrink-0 w-64 group active:scale-95 transition-all duration-500">
				<div className="flex flex-col gap-5">
					<div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] border border-border-subtle group-hover:shadow-premium-lg transition-all duration-700">
						<Image
							src={getImgSrc(currentIndex)}
							alt={title}
							fill
							className="object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
							sizes="240px"
							onError={() => handleImageError(currentIndex)}
						/>
						{hasMultiple && (
							<>
								<button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-premium-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-white active:scale-90">
									<ChevronLeft size={14} strokeWidth={3} />
								</button>
								<button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-premium-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-white active:scale-90">
									<ChevronRight size={14} strokeWidth={3} />
								</button>
								<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
									{allImages.slice(0, 5).map((_, i) => (
										<div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? "bg-white w-4 shadow-sm" : "bg-white/40 w-1"}`} />
									))}
								</div>
							</>
						)}
					</div>
					<div className="px-1">
						<h3 className="text-base font-bold text-[#111111] line-clamp-1 group-hover:text-brand transition-colors">{title}</h3>
						{location && (
							<div className="flex items-center gap-1.5 mt-1 text-text-tertiary">
								<MapPin size={12} strokeWidth={2.5} />
								<p className="text-[11px] font-bold uppercase tracking-widest truncate">{location}</p>
							</div>
						)}
						<div className="mt-4 flex items-center justify-between">
							{price && (
								<p className="text-sm font-black text-[#111111]">
									{formatCurrency(price)} <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-tighter">/ mo</span>
								</p>
							)}
							{lat && lng && (
								<div className="flex h-6 w-6 rounded-full bg-surface-sunken items-center justify-center group-hover:bg-brand group-hover:text-white transition-all duration-500">
									<ArrowRight size={12} strokeWidth={3} />
								</div>
							)}
						</div>
					</div>
				</div>
			</Link>
		);
	}

	if (variant === "banner") {
		return (
			<Link href={`/hoardings/${id}`} className="block w-full group active:scale-[0.99] transition-all duration-500">
				<div className="flex flex-col gap-6">
					<div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] border border-border-subtle shadow-premium-sm group-hover:shadow-premium-xl group-hover:-translate-y-2 transition-all duration-700">
						<Image
							src={getImgSrc(currentIndex)}
							alt={title}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
							priority
							sizes="100vw"
							onError={() => handleImageError(currentIndex)}
						/>
						{hasMultiple && (
							<>
								<button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 shadow-premium-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white active:scale-90">
									<ChevronLeft size={18} strokeWidth={3} />
								</button>
								<button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 shadow-premium-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white active:scale-90">
									<ChevronRight size={18} strokeWidth={3} />
								</button>
								<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
									{allImages.slice(0, 5).map((_, i) => (
										<div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? "bg-white w-6 shadow-sm" : "bg-white/40 w-1.5"}`} />
									))}
								</div>
							</>
						)}
					</div>
					<div className="px-4">
						<div className="flex justify-between items-start gap-8">
							<div className="flex-1">
								<h3 className="text-2xl font-black text-[#111111] tracking-tight group-hover:text-brand transition-colors">{title}</h3>
								{location && (
									<div className="flex items-center gap-2 mt-2 text-text-secondary">
										<MapPin size={14} strokeWidth={2.5} className="text-brand" />
										<p className="text-sm font-bold uppercase tracking-widest">{location}</p>
									</div>
								)}
							</div>
							{price && (
								<div className="text-right flex flex-col items-end">
									<div className="px-3 py-1 bg-brand/5 border border-brand/10 rounded-full mb-2">
										<p className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Premium Tier</p>
									</div>
									<p className="text-2xl font-black text-[#111111] tracking-tighter">{formatCurrency(price)}</p>
									<p className="text-[10px] text-text-tertiary font-bold uppercase tracking-[0.3em] mt-1">Per Month Deployment</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</Link>
		);
	}

	// large variant (default)
	return (
		<Link href={`/hoardings/${id}`} className="block flex-shrink-0 w-[340px] group active:scale-[0.98] transition-all duration-500">
			<div className="flex flex-col gap-6">
				<div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border border-border-subtle shadow-premium-md group-hover:shadow-premium-xl group-hover:-translate-y-2 transition-all duration-700">
					<Image
						src={getImgSrc(currentIndex)}
						alt={title}
						fill
						className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
						onError={() => handleImageError(currentIndex)}
						unoptimized
					/>
					{hasMultiple && (
						<>
							<button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-[#111111] shadow-premium-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white active:scale-90">
								<ChevronLeft size={16} strokeWidth={3} />
							</button>
							<button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-[#111111] shadow-premium-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white active:scale-90">
								<ChevronRight size={16} strokeWidth={3} />
							</button>
							<div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
								{allImages.slice(0, 5).map((_, i) => (
									<div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? "bg-white w-5 shadow-sm" : "bg-white/40 w-1.5"}`} />
								))}
							</div>
						</>
					)}
					<div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
						<div className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full border border-white/20">
							<p className="text-[9px] font-black text-brand uppercase tracking-widest">Verified Intelligence</p>
						</div>
					</div>
				</div>
				
				<div className="px-2">
					<div className="flex justify-between items-start gap-4">
						<h3 className="text-xl font-black text-[#111111] tracking-tight line-clamp-2 group-hover:text-brand transition-colors leading-tight">{title}</h3>
					</div>
					{location && (
						<div className="flex items-center gap-2 mt-3 text-text-tertiary">
							<MapPin size={14} strokeWidth={2.5} />
							<p className="text-[11px] font-bold uppercase tracking-[0.2em] truncate">{location}</p>
						</div>
					)}
					<div className="mt-6 pt-6 border-t border-border-subtle flex items-center justify-between">
						{price && (
							<div className="flex flex-col">
								<span className="text-[9px] font-bold text-text-tertiary uppercase tracking-widest">Monthly Deployment</span>
								<p className="text-xl font-black text-[#111111] tracking-tighter">
									{formatCurrency(price)}
								</p>
							</div>
						)}
						{lat && lng && (
							<button 
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									window.open(`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`, '_blank');
								}}
								className="h-10 px-6 rounded-full bg-surface-sunken text-[10px] font-black uppercase tracking-[0.2em] text-[#111111] hover:bg-brand hover:text-white transition-all active:scale-95 shadow-premium-sm"
							>
								Intelligence 3D
							</button>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
}
