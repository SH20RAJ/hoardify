export default function HoardingDetailLoading() {
	return (
		<div className="flex flex-col min-h-screen bg-white dark:bg-black">
			{/* Banner Skeleton */}
			<div className="relative h-64 w-full sm:h-80 bg-gray-200 animate-pulse dark:bg-gray-900 rounded-b-3xl">
				{/* Top actions skeleton */}
				<div className="absolute top-4 w-full flex justify-between px-4">
					<div className="w-10 h-10 bg-white/50 rounded-full dark:bg-gray-800/50" />
					<div className="flex gap-2">
						<div className="w-10 h-10 bg-white/50 rounded-full dark:bg-gray-800/50" />
						<div className="w-10 h-10 bg-white/50 rounded-full dark:bg-gray-800/50" />
					</div>
				</div>
			</div>

			<div className="px-5 mt-6 space-y-6 animate-pulse">
				{/* Title and Price */}
				<div className="flex justify-between items-start">
					<div className="space-y-2 flex-1">
						<div className="h-7 w-3/4 bg-gray-200 rounded-md dark:bg-gray-800" />
						<div className="h-6 w-1/3 bg-gray-200 rounded-md dark:bg-gray-800" />
					</div>
					<div className="h-10 w-32 bg-gray-200 rounded-full ml-4 dark:bg-gray-800 shrink-0" />
				</div>
				
				<div className="h-5 w-24 bg-gray-200 rounded-md dark:bg-gray-800" />

				{/* Features list */}
				<div className="space-y-2">
					<div className="h-4 w-1/2 bg-gray-200 rounded cursor-wait dark:bg-gray-800" />
					<div className="h-4 w-2/3 bg-gray-200 rounded cursor-wait dark:bg-gray-800" />
					<div className="h-4 w-1/3 bg-gray-200 rounded cursor-wait dark:bg-gray-800" />
				</div>

				{/* Location / Map */}
				<div className="space-y-3">
					<div className="h-6 w-32 bg-gray-200 rounded-md dark:bg-gray-800" />
					<div className="h-40 w-full bg-gray-200 rounded-xl dark:bg-gray-900" />
				</div>

				{/* Dates */}
				<div className="space-y-3">
					<div className="h-6 w-32 bg-gray-200 rounded-md dark:bg-gray-800" />
					<div className="flex gap-2">
						<div className="h-[70px] w-[60px] bg-gray-200 rounded-xl dark:bg-gray-800" />
						<div className="h-[70px] w-[60px] bg-gray-200 rounded-xl dark:bg-gray-800" />
						<div className="h-[70px] w-[60px] bg-gray-200 rounded-xl dark:bg-gray-800" />
						<div className="h-[70px] w-[60px] bg-gray-200 rounded-xl dark:bg-gray-800" />
					</div>
				</div>
			</div>
		</div>
	);
}
