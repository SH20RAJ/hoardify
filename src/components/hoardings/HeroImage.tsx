"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, X, Grid2X2 } from "lucide-react";

interface HeroImageProps {
	src: string;
	alt: string;
	id: number;
	images?: string[];
	videoUrl?: string | null;
}

export default function HeroImage({ src, alt, id, images = [], videoUrl }: HeroImageProps) {
	// Combine main image + additional images
	const allImages = [src, ...images].filter(Boolean);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showGallery, setShowGallery] = useState(false);
	const [showVideo, setShowVideo] = useState(false);
	const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

	const handleImageError = (index: number) => {
		setImgErrors(prev => new Set(prev).add(index));
	};

	const getImgSrc = (index: number) => {
		if (imgErrors.has(index)) return `https://picsum.photos/seed/${id}-${index}/1200/800`;
		return allImages[index];
	};

	const prev = () => setCurrentIndex(i => (i - 1 + allImages.length) % allImages.length);
	const next = () => setCurrentIndex(i => (i + 1) % allImages.length);

	// Video fullscreen modal
	if (showVideo && videoUrl) {
		return (
			<div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
				<button onClick={() => setShowVideo(false)} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 z-10">
					<X size={24} />
				</button>
				<iframe
					src={videoUrl}
					className="w-full max-w-4xl aspect-video rounded-xl"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
		);
	}

	// Fullscreen gallery modal
	if (showGallery) {
		return (
			<div className="fixed inset-0 z-50 bg-black flex flex-col">
				<div className="flex items-center justify-between p-4">
					<span className="text-white text-sm font-medium">{currentIndex + 1} / {allImages.length}</span>
					<button onClick={() => setShowGallery(false)} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20">
						<X size={20} />
					</button>
				</div>
				<div className="flex-1 flex items-center justify-center relative px-4">
					<button onClick={prev} className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 z-10">
						<ChevronLeft size={24} />
					</button>
					<div className="relative w-full max-w-4xl aspect-[16/10]">
						<Image
							src={getImgSrc(currentIndex)}
							alt={`${alt} ${currentIndex + 1}`}
							fill
							className="object-contain"
							unoptimized
							onError={() => handleImageError(currentIndex)}
						/>
					</div>
					<button onClick={next} className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 z-10">
						<ChevronRight size={24} />
					</button>
				</div>
				{/* Thumbnail strip */}
				<div className="flex gap-2 p-4 justify-center overflow-x-auto">
					{allImages.map((_, i) => (
						<button
							key={i}
							onClick={() => setCurrentIndex(i)}
							className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
								i === currentIndex ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-80"
							}`}
						>
							<Image src={getImgSrc(i)} alt="" fill className="object-cover" unoptimized onError={() => handleImageError(i)} />
						</button>
					))}
				</div>
			</div>
		);
	}

	// Inline gallery — Airbnb-style grid
	if (allImages.length >= 5) {
		return (
			<div className="relative">
				<div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[400px]" onClick={() => setShowGallery(true)} role="button" tabIndex={0}>
					{/* Main large image */}
					<div className="col-span-2 row-span-2 relative cursor-pointer">
						<Image src={getImgSrc(0)} alt={alt} fill className="object-cover hover:brightness-90 transition-all" priority unoptimized onError={() => handleImageError(0)} />
					</div>
					{/* 4 smaller images */}
					{[1, 2, 3, 4].map(i => (
						<div key={i} className="relative cursor-pointer">
							<Image src={getImgSrc(i)} alt={`${alt} ${i + 1}`} fill className="object-cover hover:brightness-90 transition-all" unoptimized onError={() => handleImageError(i)} />
						</div>
					))}
				</div>
				{/* Show all photos button */}
				<button
					onClick={() => setShowGallery(true)}
					className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#222222] text-sm font-semibold text-[#222222] hover:bg-[#f7f7f7] transition-colors"
				>
					<Grid2X2 size={14} />
					Show all photos
				</button>
				{videoUrl && (
					<button
						onClick={(e) => { e.stopPropagation(); setShowVideo(true); }}
						className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-semibold text-[#222222] hover:bg-white transition-colors"
					>
						<Play size={14} fill="#222" />
						Watch Video
					</button>
				)}
			</div>
		);
	}

	// Fallback: single image with arrows
	return (
		<div className="relative">
			<div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#ebebeb] cursor-pointer" onClick={() => setShowGallery(true)}>
				<Image
					src={getImgSrc(currentIndex)}
					alt={alt}
					fill
					className="object-cover"
					priority
					unoptimized
					onError={() => handleImageError(currentIndex)}
				/>
				{allImages.length > 1 && (
					<>
						<button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-[#222222] hover:bg-white shadow-sm">
							<ChevronLeft size={16} />
						</button>
						<button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-[#222222] hover:bg-white shadow-sm">
							<ChevronRight size={16} />
						</button>
						{/* Dots */}
						<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
							{allImages.map((_, i) => (
								<div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? "bg-white w-3" : "bg-white/60"}`} />
							))}
						</div>
					</>
				)}
			</div>
			{videoUrl && (
				<button
					onClick={() => setShowVideo(true)}
					className="absolute bottom-16 left-4 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-semibold text-[#222222] hover:bg-white transition-colors"
				>
					<Play size={14} fill="#222" />
					Watch Video
				</button>
			)}
		</div>
	);
}
