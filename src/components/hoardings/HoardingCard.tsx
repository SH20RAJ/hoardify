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
}

export default function HoardingCard({
	id,
	title,
	imageUrl,
	images = [],
	price,
	location,
	variant = "large",
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
			<Link href={`/hoardings/${id}`} className="block flex-shrink-0 w-60 group">
				<div className="flex flex-col gap-3">
					<div className="relative aspect-square w-full overflow-hidden rounded-xl border border-[#ebebeb]">
						<Image
							src={getImgSrc(currentIndex)}
							alt={title}
							fill
							className="object-cover"
							onError={() => handleImageError(currentIndex)}
							unoptimized
						/>
						{hasMultiple && (
							<>
								<button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/90 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
									<ChevronLeft size={14} />
								</button>
								<button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/90 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
									<ChevronRight size={14} />
								</button>
								<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
									{allImages.slice(0, 5).map((_, i) => (
										<div key={i} className={`w-1 h-1 rounded-full transition-all ${i === currentIndex ? "bg-white w-2" : "bg-white/60"}`} />
									))}
								</div>
							</>
						)}
					</div>
					<div>
						<h3 className="text-sm font-semibold text-[#222222] line-clamp-1">{title}</h3>
						{location && (
							<div className="flex items-center gap-1 text-[#6a6a6a]">
								<MapPin size={12} />
								<p className="text-xs line-clamp-1">{location}</p>
							</div>
						)}
						{price && (
							<p className="mt-1 text-sm font-bold text-[#222222]">
								{formatCurrency(price)} <span className="font-normal text-[#6a6a6a]">/ mo</span>
							</p>
						)}
					</div>
				</div>
			</Link>
		);
	}

	if (variant === "banner") {
		return (
			<Link href={`/hoardings/${id}`} className="block w-full group">
				<div className="flex flex-col gap-4">
					<div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-[#ebebeb] shadow-sm group-hover:shadow-md transition-shadow">
						<Image
							src={getImgSrc(currentIndex)}
							alt={title}
							fill
							className="object-cover"
							priority
							unoptimized
							onError={() => handleImageError(currentIndex)}
						/>
						{hasMultiple && (
							<>
								<button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
									<ChevronLeft size={16} />
								</button>
								<button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
									<ChevronRight size={16} />
								</button>
								<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
									{allImages.slice(0, 5).map((_, i) => (
										<div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? "bg-white w-3" : "bg-white/60"}`} />
									))}
								</div>
							</>
						)}
					</div>
					<div className="px-1">
						<div className="flex justify-between items-start gap-4">
							<div>
								<h3 className="text-lg font-semibold text-[#222222]">{title}</h3>
								{location && <p className="text-sm text-[#6a6a6a] mt-1">{location}</p>}
							</div>
							{price && (
								<div className="text-right">
									<p className="text-lg font-bold text-[#222222]">{formatCurrency(price)}</p>
									<p className="text-[10px] text-[#6a6a6a] font-medium uppercase tracking-wider">Per Month</p>
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
		<Link href={`/hoardings/${id}`} className="block flex-shrink-0 w-[300px] group">
			<div className="flex flex-col gap-4">
				<div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#ebebeb] shadow-sm group-hover:shadow-md transition-shadow">
					<Image
						src={getImgSrc(currentIndex)}
						alt={title}
						fill
						className="object-cover"
						onError={() => handleImageError(currentIndex)}
						unoptimized
					/>
					{hasMultiple && (
						<>
							<button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 text-[#222222] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
								<ChevronLeft size={16} />
							</button>
							<button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 text-[#222222] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
								<ChevronRight size={16} />
							</button>
							<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
								{allImages.slice(0, 5).map((_, i) => (
									<div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? "bg-white w-3" : "bg-white/60"}`} />
								))}
							</div>
						</>
					)}
				</div>
				
				<div className="px-1">
					<div className="flex justify-between items-start gap-2">
						<h3 className="text-base font-semibold text-[#222222] line-clamp-2">{title}</h3>
					</div>
					{location && (
						<div className="flex items-center gap-1 mt-1 text-[#6a6a6a]">
							<MapPin size={14} />
							<p className="text-sm line-clamp-1">{location}</p>
						</div>
					)}
					{price && (
						<p className="mt-2 text-base font-bold text-[#222222]">
							{formatCurrency(price)} <span className="font-normal text-[#6a6a6a]">/ month</span>
						</p>
					)}
				</div>
			</div>
		</Link>
	);
}
