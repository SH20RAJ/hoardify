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
	if (variant === "compact") {
		return (
			<Link href={`/hoardings/${id}`} className="block flex-shrink-0 w-[240px] snaps-center transition-all active:scale-[0.98]">
				<div className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
					<div className="relative h-28 w-full">
						<Image src={imageUrl} alt={title} fill className="object-cover" />
						{price && (
							<div className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-0.5 text-xs font-bold text-black shadow-sm">
								{formatCurrency(price)}
							</div>
						)}
					</div>
					<div className="p-2">
						<h3 className="line-clamp-1 text-sm font-semibold">{title}</h3>
						<p className="line-clamp-1 text-xs text-gray-500">{location}</p>
					</div>
				</div>
			</Link>
		);
	}

	if (variant === "banner") {
		return (
			<Link href={`/hoardings/${id}`} className="block w-full transition-all active:scale-[0.98]">
				<div className="relative h-32 w-full overflow-hidden rounded-xl">
					<Image src={imageUrl} alt={title} fill className="object-cover" />
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
					<div className="absolute bottom-3 left-3 text-white">
						<h3 className="text-lg font-bold">{title}</h3>
					</div>
				</div>
			</Link>
		);
	}

	// large variant
	return (
		<Link href={`/hoardings/${id}`} className="block flex-shrink-0 w-[280px] transition-all active:scale-[0.98]">
			<div className="relative h-48 w-full overflow-hidden rounded-2xl shadow-md">
				<Image src={imageUrl} alt={title} fill className="object-cover" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
				
				{views && (
					<div className="absolute bottom-2 left-2 rounded-full bg-white/20 px-2 py-1 text-[10px] text-white backdrop-blur-md border border-white/30">
						{views} views
					</div>
				)}
				
				<div className="absolute bottom-8 left-3 right-3 text-white">
					<h3 className="text-lg font-bold leading-tight">{title}</h3>
				</div>
				
				<div className="absolute bottom-2 right-2 flex gap-1">
					<div className="h-1.5 w-1.5 rounded-full bg-white opacity-100" />
					<div className="h-1.5 w-1.5 rounded-full bg-white opacity-50" />
					<div className="h-1.5 w-1.5 rounded-full bg-white opacity-50" />
				</div>
			</div>
		</Link>
	);
}
