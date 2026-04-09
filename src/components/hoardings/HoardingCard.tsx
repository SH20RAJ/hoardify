import Image from "next/image";
import Link from "next/link";
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
	const handleImageError = () => {
		// Fallback handled by Next Image placeholder or could add state
	};

	if (variant === "compact") {
		return (
			<Link href={`/hoardings/${id}`} className="block flex-shrink-0 max-w-[260px] w-full snaps-center transition-transform active:scale-[0.98] hover:shadow-card hover:-translate-y-0.5">
				<div className="card-surface flex flex-col overflow-hidden rounded-xl">
					<div className="relative aspect-[4/3] w-full">
						<Image 
							src={imageUrl} 
							alt={title} 
							fill 
							className="object-cover"
							onError={handleImageError}
						/>
						{price && (
							<div className="absolute bottom-2 left-2 rounded-lg bg-background/95 px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-sm border border-border">
								{formatCurrency(price)}
							</div>
						)}
					</div>
					<div className="p-3">
						<h3 className="line-clamp-1 text-sm font-semibold text-foreground leading-tight">{title}</h3>
						{location && <p className="line-clamp-1 text-xs text-text-secondary mt-1">{location}</p>}
					</div>
				</div>
			</Link>
		);
	}

	if (variant === "banner") {
		return (
			<Link href={`/hoardings/${id}`} className="block w-full transition-transform active:scale-[0.98] hover:shadow-hover">
				<div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl card-surface">
					<Image src={imageUrl} alt={title} fill className="object-cover" priority />
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
					<div className="absolute bottom-4 left-4 text-white">
						<h3 className="text-xl font-bold leading-tight drop-shadow-lg">{title}</h3>
					</div>
				</div>
			</Link>
		);
	}

	// large variant (default)
	return (
		<Link href={`/hoardings/${id}`} className="block flex-shrink-0 max-w-[320px] w-full transition-transform active:scale-[0.98] hover:shadow-hover hover:-translate-y-0.5">
			<div className="card-surface group relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
				<Image 
					src={imageUrl} 
					alt={title} 
					fill 
					className="object-cover transition-transform duration-300 group-hover:scale-105"
					onError={handleImageError}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
				
				{views && (
					<div className="absolute top-3 left-3 rounded-lg bg-background/95 px-2.5 py-1.5 text-[10px] font-semibold text-foreground shadow-sm backdrop-blur-sm border border-border">
						{views} views
					</div>
				)}
				
				<div className="absolute bottom-4 left-4 right-4 text-white">
					<h3 className="text-lg font-semibold leading-tight mb-1 drop-shadow-md">{title}</h3>
					{location && <p className="text-sm text-white/90 drop-shadow">{location}</p>}
				</div>
				
				{price && (
					<div className="absolute top-3 right-3 rounded-lg bg-brand px-2.5 py-1 text-xs font-bold text-white shadow-md">
						{formatCurrency(price).replace('₹', '')}
					</div>
				)}
			</div>
		</Link>
	);
}
