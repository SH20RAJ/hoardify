import { BrainCircuit, Eye, Map, TrendingUp } from "lucide-react";

export default function IntelligenceSection() {
	return (
		<section className="py-24 bg-text-primary text-background overflow-hidden relative">
			{/* Decorative Elements */}
			<div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 blur-[120px] rounded-full -mr-48 -mt-48" />
			<div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 blur-[100px] rounded-full -ml-40 -mb-40" />
			
			<div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					<div>
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-black uppercase tracking-widest mb-8">
							<BrainCircuit size={14} /> Intelligence Phase 4
						</div>
						<h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-8">
							Data-Driven <br />
							<span className="text-brand">OOH Intelligence</span>
						</h2>
						<p className="text-lg text-zinc-400 font-medium mb-12 leading-relaxed">
							We are building the Google Ads layer for the physical world. Our platform uses advanced traffic signals and computer vision estimates to provide real-world campaign analytics.
						</p>
						
						<div className="grid sm:grid-cols-2 gap-8">
							<div className="flex gap-4">
								<div className="h-10 w-10 shrink-0 border border-zinc-700 rounded-xl flex items-center justify-center text-zinc-300">
									<Eye size={18} />
								</div>
								<div>
									<h4 className="font-bold mb-1">Visual Dwell-Time</h4>
									<p className="text-sm text-zinc-500 leading-snug">Predictive models to estimate how long subjects engage with your ad.</p>
								</div>
							</div>
							<div className="flex gap-4">
								<div className="h-10 w-10 shrink-0 border border-zinc-700 rounded-xl flex items-center justify-center text-zinc-300">
									<Map size={18} />
								</div>
								<div>
									<h4 className="font-bold mb-1">Catchment Mapping</h4>
									<p className="text-sm text-zinc-500 leading-snug">Geospatial heatmaps showing where your target audience commutes.</p>
								</div>
							</div>
						</div>
					</div>
					
					<div className="relative">
						<div className="aspect-square bg-zinc-900 rounded-[3rem] border border-zinc-800 p-8 shadow-2xl relative overflow-hidden group">
							{/* Mock Map UI Animation */}
							<div className="absolute inset-0 opacity-40">
								<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-transparent to-transparent" />
							</div>
							
							<div className="relative flex flex-col h-full justify-between">
								<div className="flex items-center justify-between">
									<div className="h-2 w-24 bg-zinc-700 rounded-full" />
									<div className="flex gap-2">
										<div className="h-6 w-6 rounded-lg bg-brand/20 border border-brand/30" />
										<div className="h-6 w-6 rounded-lg bg-zinc-800" />
									</div>
								</div>
								
								<div className="flex flex-col gap-4">
									<div className="h-4 w-full bg-zinc-800 rounded-lg animate-pulse" />
									<div className="h-4 w-2/3 bg-zinc-800 rounded-lg animate-pulse delay-75" />
									<div className="h-4 w-1/2 bg-zinc-800 rounded-lg animate-pulse delay-150" />
								</div>
								
								<div className="p-6 rounded-2xl bg-zinc-800/80 backdrop-blur-md border border-zinc-700">
									<div className="flex items-center justify-between mb-2">
										<span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">Traffic Prediction</span>
										<TrendingUp size={14} className="text-brand" />
									</div>
									<div className="text-2xl font-black text-white">84.5k <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest ml-2">Vehicles/Hr</span></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
