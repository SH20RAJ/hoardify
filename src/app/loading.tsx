

export default function GlobalLoading() {
	return (
		<div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black pt-16">
			{/* Mock TopBar */}
			<div className="fixed top-0 left-0 w-full z-50">
				<div className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
					<div className="flex items-center gap-2">
						<div className="h-8 w-8 rounded-lg bg-gray-200 animate-pulse dark:bg-gray-800" />
						<div className="h-5 w-24 rounded bg-gray-200 animate-pulse dark:bg-gray-800" />
					</div>
					<div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse dark:bg-gray-800" />
				</div>
			</div>

			<div className="px-4 py-4 space-y-8 animate-pulse">
				{/* Most Viewed Skeleton */}
				<div>
					<div className="h-6 w-32 bg-gray-200 rounded-md mb-3 dark:bg-gray-800"></div>
					<div className="flex gap-4 overflow-hidden">
						<div className="h-48 min-w-[280px] bg-gray-200 rounded-2xl dark:bg-gray-800" />
						<div className="h-48 min-w-[280px] bg-gray-200 rounded-2xl dark:bg-gray-800" />
					</div>
				</div>

				{/* Categories Skeleton */}
				<div>
					<div className="h-6 w-28 bg-gray-200 rounded-md mb-3 dark:bg-gray-800"></div>
					<div className="flex gap-4 overflow-hidden">
						<div className="h-20 w-20 bg-gray-200 rounded-2xl dark:bg-gray-800" />
						<div className="h-20 w-20 bg-gray-200 rounded-2xl dark:bg-gray-800" />
						<div className="h-20 w-20 bg-gray-200 rounded-2xl dark:bg-gray-800" />
					</div>
				</div>

				{/* Nearby Skeleton */}
				<div>
					<div className="h-6 w-36 bg-gray-200 rounded-md mb-3 dark:bg-gray-800"></div>
					<div className="space-y-4">
						<div className="h-32 w-full bg-gray-200 rounded-2xl dark:bg-gray-800" />
						<div className="h-32 w-full bg-gray-200 rounded-2xl dark:bg-gray-800" />
					</div>
				</div>
			</div>
		</div>
	);
}
