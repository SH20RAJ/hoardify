interface HorizontalScrollListProps {
	children: React.ReactNode;
	className?: string;
	"aria-label"?: string;
}

export default function HorizontalScrollList({ children, className = "", "aria-label": ariaLabel }: HorizontalScrollListProps) {
	return (
		<div className={`flex gap-4 overflow-x-auto pb-4 no-scrollbar ${className}`} aria-label={ariaLabel}>
			{children}
		</div>
	);
}
