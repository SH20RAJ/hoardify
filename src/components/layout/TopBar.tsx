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
		<div className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-white px-4 py-3 shadow-sm border-b border-gray-100 dark:bg-black dark:border-gray-800">
			<div className="flex items-center gap-3">
				{showBack && (
					<Link href={backHref} className="btn-circle flex items-center justify-center bg-[#f2f2f2] hover:shadow-md">
						<ChevronLeft size={22} className="text-[#222222]" />
					</Link>
				)}
				{isLogo ? (
					<div className="flex flex-col">
						<span className="text-2xl font-bold leading-tight flex items-center gap-2">
							<div className="bg-[#ff385c] text-white p-1.5 rounded-lg shadow-sm">H</div>
							<span className="text-[#222222]">hoardify</span>
						</span>
						{title && <span className="text-sm font-semibold text-[#6a6a6a] mt-0.5">{title}</span>}
					</div>
				) : (
					<h1 className="text-lg font-semibold text-[#222222]">{title}</h1>
				)}
			</div>
			{rightAction && <div>{rightAction}</div>}
		</div>
	);
}
