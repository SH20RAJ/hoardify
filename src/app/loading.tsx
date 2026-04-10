

export default function GlobalLoading() {
	return (
		<div className="flex flex-col min-h-screen bg-background pt-24 pb-32">
			{/* Mock Floating TopBar */}
			<div className="fixed top-0 left-0 w-full z-50 px-4 pt-4">
				<div className="flex h-16 w-full items-center justify-between rounded-2xl glass-effect px-4 shadow-sm border border-glass-border">
					<div className="flex items-center gap-2">
						<div className="h-9 w-9 rounded-xl bg-surface-sunken animate-pulse" />
						<div className="h-4 w-24 rounded bg-surface-sunken animate-pulse" />
					</div>
					<div className="h-10 w-10 rounded-full bg-surface-sunken animate-pulse" />
				</div>
			</div>

			<div className="px-6 space-y-12 animate-pulse">
				{/* Hero Skeleton */}
				<div className="h-48 w-full rounded-[2rem] bg-surface-sunken" />

				{/* Categories Skeleton */}
				<div>
					<div className="h-6 w-32 bg-surface-sunken rounded-md mb-6"></div>
					<div className="flex gap-4 overflow-hidden">
						<div className="h-20 w-16 bg-surface-sunken rounded-2xl shrink-0" />
						<div className="h-20 w-16 bg-surface-sunken rounded-2xl shrink-0" />
						<div className="h-20 w-16 bg-surface-sunken rounded-2xl shrink-0" />
						<div className="h-20 w-16 bg-surface-sunken rounded-2xl shrink-0" />
						<div className="h-20 w-16 bg-surface-sunken rounded-2xl shrink-0" />
					</div>
				</div>

				{/* Trending Skeleton */}
				<div>
					<div className="h-6 w-40 bg-surface-sunken rounded-md mb-6"></div>
					<div className="flex gap-4 overflow-hidden">
						<div className="h-64 w-52 bg-surface-sunken rounded-3xl shrink-0" />
						<div className="h-64 w-52 bg-surface-sunken rounded-3xl shrink-0" />
					</div>
				</div>

				{/* Nearby Skeleton */}
				<div>
					<div className="h-6 w-48 bg-surface-sunken rounded-md mb-6"></div>
					<div className="space-y-6">
						<div className="h-40 w-full bg-surface-sunken rounded-2xl" />
						<div className="h-40 w-full bg-surface-sunken rounded-2xl" />
					</div>
				</div>
			</div>
		</div>
	);
}

