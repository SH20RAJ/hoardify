import React from "react";

interface HorizontalScrollListProps {
	children: React.ReactNode;
	className?: string;
}

export default function HorizontalScrollList({ children, className = "" }: HorizontalScrollListProps) {
	return (
		<div className={`flex gap-4 overflow-x-auto pb-4 no-scrollbar ${className}`}>
			{children}
		</div>
	);
}
