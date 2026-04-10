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
		<div className="sticky top-0 z-50 w-full px-4 pt-4 pb-2">
			<div className="glass-effect flex h-16 w-full items-center justify-between rounded-2xl px-4 shadow-lg shadow-black/5">
				<div className="flex items-center gap-3">
					{showBack && (
						<Link href={backHref} className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-sunken transition-all active:scale-90" aria-label="Go back">
							<ChevronLeft size={20} className="text-text-primary" />
						</Link>
					)}
					{isLogo ? (
						<Link href="/" className="flex items-center gap-2 group">
							<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand font-bold text-white shadow-lg shadow-brand/20 transition-transform group-hover:scale-105">
								H
							</div>
							<div className="flex flex-col">
								<span className="text-lg font-bold tracking-tight text-text-primary">hoardify</span>
								{title && <span className="text-[10px] font-bold uppercase tracking-widest text-brand -mt-1">{title}</span>}
							</div>
						</Link>
					) : (
						<h1 className="text-lg font-bold tracking-tight text-text-primary">{title}</h1>
					)}
				</div>
				{rightAction && <div className="flex items-center">{rightAction}</div>}
			</div>
		</div>
	);
}

