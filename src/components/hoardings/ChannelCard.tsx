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
	count
}: ChannelCardProps) {
	return (
		<button
			onClick={onClick}
			type="button"
			className={`relative group flex flex-col items-start p-6 rounded-[2rem] transition-all duration-500 min-w-[200px] border-2 ${
				active 
					? "bg-brand border-brand shadow-2xl shadow-brand/20 scale-105" 
					: "bg-surface-sunken border-transparent hover:border-border-subtle hover:bg-white dark:hover:bg-zinc-900"
			}`}
		>
			<div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 ${
				active ? "bg-white/20 text-white" : "bg-surface-raised text-text-secondary group-hover:text-brand"
			}`}>
				{icon}
			</div>
			
			<div className="flex flex-col items-start text-left">
				<span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${
					active ? "text-white/60" : "text-text-tertiary"
				}`}>
					Category
				</span>
				<span className={`text-sm font-black uppercase tracking-widest ${
					active ? "text-white" : "text-text-primary"
				}`}>
					{label}
				</span>
			</div>

			{count !== undefined && (
				<div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black tracking-widest ${
					active ? "bg-white/20 text-white" : "bg-brand/5 text-brand"
				}`}>
					{count}
				</div>
			)}
			
			{active && (
				<div className="absolute bottom-4 right-6">
					<div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
				</div>
			)}
		</button>
	);
}
