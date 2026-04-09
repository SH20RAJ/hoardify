import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface TopBarProps {
	title?: string | React.ReactNode;
	showBack?: boolean;
	backHref?: string;
	rightAction?: React.ReactNode;
	isLogo?: boolean;
}

export default function TopBar({
	title,
	showBack = false,
	backHref = "/",
	rightAction,
	isLogo = false,
}: TopBarProps) {
	return (
		<div className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-background px-4 py-3 shadow-sm border-b border-border">
			<div className="flex items-center gap-3">
				{showBack && (
					<Link href={backHref} className="btn-circle flex items-center justify-center bg-surface" aria-label="Go back">
						<ChevronLeft size={22} className="text-foreground" />
					</Link>
				)}
				{isLogo ? (
					<div className="flex flex-col">
						<span className="text-2xl font-bold leading-tight flex items-center gap-2">
							<div className="bg-brand text-white p-1.5 rounded-lg shadow-sm">H</div>
							<span className="text-foreground">hoardify</span>
						</span>
						{title && <span className="text-sm font-semibold text-text-secondary mt-0.5">{title}</span>}
					</div>
				) : (
					<h1 className="text-lg font-semibold text-foreground">{title}</h1>
				)}
			</div>
			{rightAction && <div>{rightAction}</div>}
		</div>
	);
}
