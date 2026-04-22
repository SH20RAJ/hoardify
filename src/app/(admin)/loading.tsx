export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
			<div className="h-12 w-12 border-4 border-[#ff385c] border-t-transparent rounded-full animate-spin" />
			<p className="text-sm font-semibold text-[#717171] uppercase tracking-widest animate-pulse">
				Loading Intelligence...
			</p>
		</div>
	);
}
