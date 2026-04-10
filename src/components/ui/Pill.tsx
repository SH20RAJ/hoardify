"use client";

import React from "react";

interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean;
	icon?: React.ReactNode;
	label: string | React.ReactNode;
	variant?: "outline" | "solid" | "category";
}

export default function Pill({ 
	active = false, 
	icon, 
	label, 
	variant = "outline", 
	className = "", 
	...props 
}: PillProps) {
	const baseStyles = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 active:scale-95 whitespace-nowrap";
	
	const variants = {
		outline: active
			? "bg-brand text-white shadow-lg shadow-brand/20 border border-brand/20"
			: "bg-surface-sunken text-text-secondary border border-border-subtle hover:border-border-strong hover:bg-zinc-100 dark:hover:bg-zinc-900",
		solid: active
			? "bg-text-primary text-background shadow-md"
			: "bg-surface-sunken text-text-secondary hover:bg-zinc-200 dark:hover:bg-zinc-800",
		category: active
			? "text-brand border-b-2 border-brand font-bold rounded-none pb-3 px-2 transition-transform scale-105"
			: "text-text-tertiary font-bold hover:text-text-primary rounded-none pb-3 px-2 hover:-translate-y-0.5",
	};

	return (
		<button 
			type="button"
			className={`${baseStyles} ${variants[variant]} ${className}`} 
			{...props}
		>
			{icon && (
				<span className={`flex-shrink-0 transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}>
					{icon}
				</span>
			)}
			<span className="tracking-tight">{label}</span>
		</button>
	);
}

