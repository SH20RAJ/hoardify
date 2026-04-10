interface HorizontalScrollListProps {
	children: React.ReactNode;
	className?: string;
	"aria-label"?: string;
}

export default function HorizontalScrollList({ children, className = "", "aria-label": ariaLabel }: HorizontalScrollListProps) {
	return (
		<div className={`flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory ${className}`} aria-label={ariaLabel}>
			{children}
		</div>
	);
}

