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
	// Use the key provided by the user in .env
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyCfP3hhYQj09osM63W3sKCjGF_F-77aXts";

	if (!apiKey) {
		return (
			<div className="w-full h-full flex items-center justify-center bg-surface-sunken">
				<div className="text-center p-6 glass-effect rounded-[2rem] border border-border-subtle">
					<p className="text-text-secondary font-bold mb-2">Map Engine Offline</p>
					<p className="text-[10px] uppercase font-black tracking-widest text-text-tertiary">API Configuration Required</p>
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
				// 2026 Immersive View Controls
				defaultTilt={45}
				defaultHeading={0}
				mapTypeId="roadmap"
				renderingType="VECTOR"
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
