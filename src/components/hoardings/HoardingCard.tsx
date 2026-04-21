"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { MapPin } from "lucide-react";

export type HoardingVariant = "large" | "compact" | "banner";

interface HoardingCardProps {
	id: string | number;
	title: string;
	imageUrl: string;
	price?: number;
	location?: string;
	views?: string | null;
	variant?: HoardingVariant;
}

export default function HoardingCard({
	id,
	title,
	imageUrl,
	price,
	location,
	variant = "large",
}: HoardingCardProps) {
	const [hasError, setHasError] = useState(false);

	const handleImageError = () => {
		setHasError(true);
	};

	if (variant === "compact") {
		return (
			<Link href={`/hoardings/${id}`} className="block flex-shrink-0 w-60 group">
				<div className="flex flex-col gap-3">
					<div className="relative aspect-square w-full overflow-hidden rounded-xl border border-[#ebebeb]">
						{hasError ? (
							<div className="w-full h-full bg-[#f7f7f7] flex items-center justify-center">
								<span className="text-[#929292] text-[10px] font-bold uppercase tracking-wider">No Image</span>
							</div>
						) : (
							<Image 
								src={imageUrl} 
								alt={title} 
								fill 
								className="object-cover"
								onError={handleImageError}
								unoptimized
							/>
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
						{hasError ? (
							<div className="w-full h-full bg-[#f7f7f7] flex items-center justify-center">
								<span className="text-[#929292] text-xs font-bold uppercase tracking-widest">Image Unavailable</span>
							</div>
						) : (
							<Image src={imageUrl} alt={title} fill className="object-cover" priority unoptimized />
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
					{hasError ? (
						<div className="w-full h-full bg-[#f7f7f7] flex items-center justify-center">
							<span className="text-[#929292] text-[10px] font-bold uppercase tracking-wider">No Image</span>
						</div>
					) : (
						<Image 
							src={imageUrl} 
							alt={title} 
							fill 
							className="object-cover"
							onError={handleImageError}
							unoptimized
						/>
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
