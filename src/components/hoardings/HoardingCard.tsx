"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { formatCurrency } from "@/lib/utils";
import { MapPin, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

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
			<Link href={`/hoardings/${id}`} className="block flex-shrink-0 w-56 sm:w-64 group active:scale-95 transition-all duration-500">
				<div className="flex flex-col gap-4 sm:gap-5">
					<div className="relative aspect-square w-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] border border-border-subtle group-hover:shadow-premium-lg transition-all duration-700">
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
								<button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/90 text-text-primary shadow-premium-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-background active:scale-90">
									<ChevronLeft size={14} strokeWidth={3} />
								</button>
								<button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/90 text-text-primary shadow-premium-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-background active:scale-90">
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
						<h3 className="text-sm sm:text-base font-bold text-text-primary line-clamp-1 group-hover:text-brand transition-colors">{title}</h3>
						{location && (
							<div className="flex items-center gap-1.5 mt-1 text-text-tertiary">
								<MapPin size={10} sm:size={12} strokeWidth={2.5} />
								<p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest truncate">{location}</p>
							</div>
						)}
						<div className="mt-3 sm:mt-4 flex items-center justify-between">
							{price && (
								<p className="text-sm font-black text-text-primary">
									{formatCurrency(price)} <span className="text-[9px] sm:text-[10px] font-bold text-text-tertiary uppercase tracking-tighter">/ mo</span>
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
				<div className="flex flex-col gap-4 md:gap-6">
					<div className="relative aspect-[4/3] md:aspect-[21/9] w-full overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-border-subtle shadow-premium-sm group-hover:shadow-premium-xl group-hover:-translate-y-1 md:group-hover:-translate-y-2 transition-all duration-700">
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
								<button onClick={prev} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full bg-background/90 text-text-primary shadow-premium-md opacity-0 group-hover:opacity-100 transition-all hover:bg-background active:scale-90">
									<ChevronLeft size={16} md:size={18} strokeWidth={3} />
								</button>
								<button onClick={next} className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full bg-background/90 text-text-primary shadow-premium-md opacity-0 group-hover:opacity-100 transition-all hover:bg-background active:scale-90">
									<ChevronRight size={16} md:size={18} strokeWidth={3} />
								</button>
								<div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
									{allImages.slice(0, 5).map((_, i) => (
										<div key={i} className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? "bg-white w-4 md:w-6 shadow-sm" : "bg-white/40 w-1 md:w-1.5"}`} />
									))}
								</div>
							</>
						)}
					</div>
					<div className="px-1 md:px-4">
						<div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-8">
							<div className="flex-1">
								<h3 className="text-xl md:text-2xl font-black text-text-primary tracking-tight group-hover:text-brand transition-colors">{title}</h3>
								{location && (
									<div className="flex items-center gap-2 mt-1.5 md:mt-2 text-text-secondary">
										<MapPin size={12} md:size={14} strokeWidth={2.5} className="text-brand" />
										<p className="text-xs md:text-sm font-bold uppercase tracking-widest">{location}</p>
									</div>
								)}
							</div>
							{price && (
								<div className="text-right flex flex-col items-start md:items-end w-full md:w-auto mt-1 md:mt-0">
									<div className="px-2 py-0.5 md:px-3 md:py-1 bg-brand/5 border border-brand/10 rounded-full mb-1.5 md:mb-2">
										<p className="text-[9px] md:text-[10px] font-black text-brand uppercase tracking-[0.2em]">Premium Tier</p>
									</div>
									<p className="text-xl md:text-2xl font-black text-text-primary tracking-tighter">{formatCurrency(price)}</p>
									<p className="text-[9px] md:text-[10px] text-text-tertiary font-bold uppercase tracking-[0.3em] mt-0.5 md:mt-1">Per Month Deployment</p>
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
		<Link href={`/hoardings/${id}`} className="block flex-shrink-0 w-[82vw] max-w-[340px] group active:scale-[0.98] transition-all duration-500">
			<div className="flex flex-col gap-4 md:gap-6">
				<div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-border-subtle shadow-premium-md group-hover:shadow-premium-xl group-hover:-translate-y-1 md:group-hover:-translate-y-2 transition-all duration-700">
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
							<button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-background/90 text-text-primary shadow-premium-md opacity-0 group-hover:opacity-100 transition-all hover:bg-background active:scale-90">
								<ChevronLeft size={16} strokeWidth={3} />
							</button>
							<button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-background/90 text-text-primary shadow-premium-md opacity-0 group-hover:opacity-100 transition-all hover:bg-background active:scale-90">
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
						<div className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full border border-border-subtle">
							<p className="text-[9px] font-black text-brand uppercase tracking-widest">Verified Intelligence</p>
						</div>
					</div>
				</div>
				
				<div className="px-1 md:px-2">
					<div className="flex justify-between items-start gap-4">
						<h3 className="text-lg md:text-xl font-black text-text-primary tracking-tight line-clamp-2 group-hover:text-brand transition-colors leading-tight">{title}</h3>
					</div>
					{location && (
						<div className="flex items-center gap-2 mt-2 md:mt-3 text-text-tertiary">
							<MapPin size={12} md:size={14} strokeWidth={2.5} />
							<p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] truncate">{location}</p>
						</div>
					)}
					<div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border-subtle flex items-center justify-between">
						{price && (
							<div className="flex flex-col">
								<span className="text-[8px] md:text-[9px] font-bold text-text-tertiary uppercase tracking-widest">Monthly Deployment</span>
								<p className="text-lg md:text-xl font-black text-text-primary tracking-tighter">
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
								className="h-8 md:h-10 px-4 md:px-6 rounded-full bg-surface-sunken text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-text-primary hover:bg-brand hover:text-white transition-all active:scale-95 shadow-premium-sm"
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
