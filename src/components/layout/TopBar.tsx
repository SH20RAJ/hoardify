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
		<div className="sticky top-0 z-40 flex h-14 w-full items-center justify-between bg-white px-4 py-2 dark:bg-black">
			<div className="flex items-center gap-3">
				{showBack && (
					<Link href={backHref} className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-900">
						<ChevronLeft size={20} />
					</Link>
				)}
				{isLogo ? (
					<div className="flex flex-col">
						<span className="text-xl font-bold leading-tight flex items-center gap-1">
							<div className="bg-brand text-white p-1 rounded-md mb-1 pb-0 pt-0 text-sm">H</div>
							hoardify
						</span>
						{title && <span className="text-2xl font-extrabold">{title}</span>}
					</div>
				) : (
					<h1 className="text-lg font-semibold">{title}</h1>
				)}
			</div>
			{rightAction && <div>{rightAction}</div>}
		</div>
	);
}
