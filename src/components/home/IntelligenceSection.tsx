import { Eye, Map, TrendingUp } from "lucide-react";

export default function IntelligenceSection() {
	return (
		<section className="py-24 bg-white">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid lg:grid-cols-2 gap-20 items-center">
					<div>
						<h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#222222] mb-6">
							Data-driven <br />
							<span className="text-[#ff385c]">OOH intelligence.</span>
						</h2>
						<p className="text-lg text-[#6a6a6a] mb-12 leading-relaxed">
							We are building the intelligence layer for the physical world. Our platform uses advanced traffic signals and device density estimates to provide real-world campaign analytics.
						</p>
						
						<div className="grid sm:grid-cols-2 gap-10">
							<div className="flex flex-col gap-4">
								<Eye size={28} className="text-[#222222]" />
								<div>
									<h4 className="font-semibold text-[#222222] mb-1">Visual Dwell-Time</h4>
									<p className="text-sm text-[#717171] leading-relaxed">Predictive models to estimate how long subjects engage with your ad.</p>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<Map size={28} className="text-[#222222]" />
								<div>
									<h4 className="font-semibold text-[#222222] mb-1">Catchment Mapping</h4>
									<p className="text-sm text-[#717171] leading-relaxed">Geospatial heatmaps showing where your target audience commutes.</p>
								</div>
							</div>
						</div>
					</div>
					
					<div className="relative">
						<div className="aspect-square bg-[#f7f7f7] rounded-2xl border border-[#ebebeb] p-8 shadow-sm flex flex-col justify-between">
							<div className="flex items-center justify-between">
								<div className="h-2 w-24 bg-[#dddddd] rounded-full" />
								<div className="flex gap-2">
									<div className="h-6 w-6 rounded-md bg-[#ff385c]/10 border border-[#ff385c]/20" />
									<div className="h-6 w-6 rounded-md bg-[#dddddd]" />
								</div>
							</div>
							
							<div className="flex flex-col gap-4">
								<div className="h-4 w-full bg-[#ebebeb] rounded-md" />
								<div className="h-4 w-2/3 bg-[#ebebeb] rounded-md" />
								<div className="h-4 w-1/2 bg-[#ebebeb] rounded-md" />
							</div>
							
							<div className="p-6 rounded-xl bg-white border border-[#ebebeb] shadow-sm">
								<div className="flex items-center justify-between mb-2">
									<span className="text-[10px] font-bold uppercase text-[#717171] tracking-wider">Traffic Prediction</span>
									<TrendingUp size={14} className="text-[#ff385c]" />
								</div>
								<div className="text-2xl font-bold text-[#222222]">84,500 <span className="text-xs text-[#717171] font-normal ml-2">Vehicles / Day</span></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
