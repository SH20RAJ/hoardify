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
		<header className="sticky top-0 z-40 border-b border-[#0000000d] bg-white/90 px-4 py-3 backdrop-blur-lg">
			<div className="mx-auto flex h-12 w-full items-center justify-between">
				<div className="flex min-w-0 items-center gap-3">
					{showBack && (
						<Link href={backHref} className="btn-circle-modern" aria-label="Go back">
							<ChevronLeft size={20} className="text-[#222222]" />
						</Link>
					)}
					{isLogo ? (
						<div className="flex min-w-0 flex-col">
							<span className="flex items-center gap-2 text-xl font-semibold tracking-tight text-[#141414]">
								<span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ff385c] text-sm font-bold text-white shadow-sm">H</span>
								hoardify
							</span>
							{title && <span className="truncate text-xs text-[#6f6f6f]">{title}</span>}
						</div>
					) : (
						<h1 className="truncate text-lg font-semibold text-[#202020]">{title}</h1>
					)}
				</div>
				{rightAction && <div className="shrink-0">{rightAction}</div>}
			</div>
		</header>
	);
}
