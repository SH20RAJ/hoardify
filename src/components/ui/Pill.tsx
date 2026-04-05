import React from "react";

interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean;
	icon?: React.ReactNode;
	label: string | React.ReactNode;
	variant?: "outline" | "solid" | "category";
}

export default function Pill({ active = false, icon, label, variant = "outline", className = "", ...props }: PillProps) {
	const baseStyles = "inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-colors whitespace-nowrap";
	
	const variants = {
		outline: active
			? "border-2 border-brand text-brand font-medium bg-brand/5"
			: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-black dark:text-gray-300",
		solid: active
			? "bg-brand text-white font-medium"
			: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200",
		category: active
			? "border-b-2 border-brand text-brand font-semibold rounded-none pb-2 px-1"
			: "text-gray-500 font-medium hover:text-gray-900 rounded-none pb-2 px-1 dark:text-gray-400"
	};

	return (
		<button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
			{icon && <span className="flex-shrink-0">{icon}</span>}
			<span>{label}</span>
		</button>
	);
}
