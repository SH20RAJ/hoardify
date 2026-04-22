"use client";

import Image from "next/image";
import { useState } from "react";

interface HeroImageProps {
	src: string;
	alt: string;
	id: number;
}

export default function HeroImage({ src, alt, id }: HeroImageProps) {
	const [imgSrc, setImgSrc] = useState(src);

	const handleImageError = () => {
		setImgSrc(`https://picsum.photos/seed/${id}/1200/800`);
	};

	return (
		<div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#ebebeb]">
			<Image 
				src={imgSrc || `https://picsum.photos/seed/${id}/1200/800`} 
				alt={alt} 
				fill 
				className="object-cover" 
				priority 
				unoptimized 
				onError={handleImageError}
			/>
		</div>
	);
}
