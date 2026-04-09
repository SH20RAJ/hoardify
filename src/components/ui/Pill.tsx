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
	const baseStyles = "inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-colors whitespace-nowrap";
	
	const variants = {
		outline: active
			? "border-2 border-brand text-brand font-medium bg-brand/5"
			: "border border-border text-text-secondary bg-background hover:bg-surface",
		solid: active
			? "bg-brand text-white font-medium"
			: "bg-surface text-foreground hover:bg-surface-hover",
		category: active
			? "border-b-2 border-brand text-brand font-semibold rounded-none pb-2 px-1"
			: "text-text-secondary font-medium hover:text-foreground rounded-none pb-2 px-1",
	};

	return (
		<button 
			type="button"
			className={`${baseStyles} ${variants[variant]} ${className}`} 
			{...props}
		>
			{icon && <span className="flex-shrink-0">{icon}</span>}
			<span>{label}</span>
		</button>
	);
}
