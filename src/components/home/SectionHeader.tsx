interface SectionHeaderProps {
	title: string;
	subtitle?: string;
	action?: React.ReactNode;
}

export default function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
	return (
		<div className="mb-4 flex items-end justify-between gap-3">
			<div>
				<h2 className="text-xl font-semibold text-[#222222]">{title}</h2>
				{subtitle && <p className="mt-1 text-sm text-[#6a6a6a]">{subtitle}</p>}
			</div>
			{action}
		</div>
	);
}
