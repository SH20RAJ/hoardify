"use client";

import React from "react";

interface ChannelCardProps {
	icon: React.ReactNode;
	label: string;
	active?: boolean;
	onClick?: () => void;
	count?: number | string;
}

export default function ChannelCard({
	icon,
	label,
	active = false,
	onClick,
}: ChannelCardProps) {
	return (
		<button
			onClick={onClick}
			type="button"
			className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all min-w-[140px] ${
				active 
					? "border-[#222222] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.18)]" 
					: "border-[#dddddd] bg-white hover:border-[#222222]"
			}`}
		>
			<div className={`mb-3 transition-colors ${
				active ? "text-[#ff385c]" : "text-[#717171]"
			}`}>
				{icon}
			</div>
			
			<span className={`text-sm font-semibold tracking-tight ${
				active ? "text-[#222222]" : "text-[#717171]"
			}`}>
				{label}
			</span>
		</button>
	);
}
