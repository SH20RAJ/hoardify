"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { HoardingType } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

interface GoogleMapWrapperProps {
	hoardings?: HoardingType[];
	center?: { lat: number; lng: number };
	zoom?: number;
	disableUI?: boolean;
	gestureHandling?: "cooperative" | "greedy" | "none" | "auto";
}

export default function GoogleMapWrapper({
	hoardings = [],
	center = { lat: 23.3441, lng: 85.3096 }, // Default to Ranchi center
	zoom = 12,
	disableUI = true,
	gestureHandling = "auto",
}: GoogleMapWrapperProps) {
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	if (!apiKey) {
		return (
			<div className="w-full h-full flex items-center justify-center bg-surface">
				<div className="text-center p-6">
					<p className="text-text-secondary mb-2">Map unavailable</p>
					<p className="text-sm text-text-disabled">Google Maps API key not configured</p>
				</div>
			</div>
		);
	}

	return (
		<APIProvider apiKey={apiKey}>
			<Map
				mapId="hoardify_map_base"
				defaultCenter={center}
				defaultZoom={zoom}
				gestureHandling={gestureHandling}
				disableDefaultUI={disableUI}
				className="w-full h-full"
			>
				{hoardings.map((hoarding) => (
					<AdvancedMarker key={hoarding.id} position={hoarding.coordinates}>
						<div className="flex flex-col items-center">
							<div className="bg-brand text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg border border-white whitespace-nowrap">
								{formatCurrency(hoarding.price)}
							</div>
							<div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-white mt-[1px]"></div>
						</div>
					</AdvancedMarker>
				))}
			</Map>
		</APIProvider>
	);
}
