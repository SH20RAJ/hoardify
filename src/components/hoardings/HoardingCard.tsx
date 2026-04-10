"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";

export type HoardingVariant = "large" | "compact" | "banner";

interface HoardingCardProps {
	id: string;
	title: string;
	imageUrl: string;
	price?: number;
	location?: string;
	views?: string;
	variant?: HoardingVariant;
}

export default function HoardingCard({
	id,
	title,
	imageUrl,
	price,
	location,
	views,
	variant = "large",
}: HoardingCardProps) {
	const [hasError, setHasError] = useState(false);

	const handleImageError = () => {
		setHasError(true);
	};

	if (variant === "compact") {
		return (
			<Link href={`/hoardings/${id}`} className="block flex-shrink-0 max-w-[240px] w-full snaps-center group transition-all duration-300">
				<div className="card-premium h-full flex flex-col overflow-hidden bg-surface-raised border border-border-subtle rounded-2xl shadow-sm hover:shadow-premium hover:-translate-y-1">
					<div className="relative aspect-[1/1] w-full overflow-hidden">
						{hasError ? (
							<div className="w-full h-full bg-surface-sunken flex items-center justify-center">
								<span className="text-text-tertiary text-[10px] font-bold uppercase tracking-wider">Missing Image</span>
							</div>
						) : (
							<Image 
								src={imageUrl} 
								alt={title} 
								fill 
								className="object-cover transition-transform duration-500 group-hover:scale-110"
								onError={handleImageError}
								unoptimized
							/>
						)}
						{price && (
							<div className="absolute top-2 right-2 rounded-full glass-effect px-2 py-1 text-[10px] font-bold text-text-primary shadow-sm border border-glass-border">
								{formatCurrency(price)}
							</div>
						)}
					</div>
					<div className="p-3">
						<h3 className="line-clamp-1 text-sm font-bold text-text-primary tracking-tight leading-tight">{title}</h3>
						{location && (
							<div className="flex items-center gap-1 mt-1">
								<p className="line-clamp-1 text-[11px] text-text-secondary font-medium">{location}</p>
							</div>
						)}
					</div>
				</div>
			</Link>
		);
	}

	if (variant === "banner") {
		return (
			<Link href={`/hoardings/${id}`} className="block w-full group transition-all duration-300">
				<div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl card-premium shadow-md group-hover:shadow-premium group-hover:-translate-y-1">
					{hasError ? (
						<div className="w-full h-full bg-surface-sunken flex items-center justify-center">
							<span className="text-text-tertiary text-xs font-bold uppercase tracking-widest">Image Unavailable</span>
						</div>
					) : (
						<Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority unoptimized />
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
					<div className="absolute bottom-4 left-5 right-5 text-white">
						<div className="flex items-center justify-between gap-4">
							<h3 className="text-lg font-bold leading-tight tracking-tight drop-shadow-lg">{title}</h3>
							<div className="shrink-0 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-brand/40">
								Featured
							</div>
						</div>
					</div>
				</div>
			</Link>
		);
	}

	// large variant (default)
	return (
		<Link href={`/hoardings/${id}`} className="block flex-shrink-0 max-w-[300px] w-full group transition-all duration-300">
			<div className="card-premium relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-md group-hover:shadow-premium group-hover:-translate-y-1.5">
				{hasError ? (
					<div className="w-full h-full bg-surface-sunken flex items-center justify-center">
						<span className="text-text-tertiary text-[10px] font-bold uppercase tracking-wider">No Image</span>
					</div>
				) : (
					<Image 
						src={imageUrl} 
						alt={title} 
						fill 
						className="object-cover transition-transform duration-700 group-hover:scale-110"
						onError={handleImageError}
						unoptimized
					/>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
				
				{views && (
					<div className="absolute top-4 left-4 rounded-full glass-effect px-3 py-1.5 text-[10px] font-bold text-text-primary shadow-lg border border-glass-border">
						{views} <span className="text-brand ml-0.5">Views</span>
					</div>
				)}
				
				<div className="absolute bottom-5 left-5 right-5 text-white">
					<h3 className="text-xl font-bold leading-tight mb-1 drop-shadow-xl tracking-tight">{title}</h3>
					{location && <p className="text-xs text-white/80 font-medium drop-shadow-md">{location}</p>}
					
					{price && (
						<div className="mt-3 flex items-center gap-2">
							<span className="text-lg font-black tracking-tighter">{formatCurrency(price).replace('₹', '₹ ')}</span>
							<span className="text-[10px] font-bold uppercase tracking-widest text-white/60">/ Monthly</span>
						</div>
					)}
				</div>
				
				<div className="absolute top-4 right-4 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
					<div className="bg-brand text-white p-2 rounded-full shadow-lg shadow-brand/30">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
					</div>
				</div>
			</div>
		</Link>
	);
}

