import NavbarSync from "@/components/layout/NavbarSync";
import LandingHero from "@/components/landing/LandingHero";
import AdvantageSection from "@/components/landing/AdvantageSection";
import ValueProps from "@/components/landing/ValueProps";
import ProcessWorkflow from "@/components/landing/ProcessWorkflow";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";

export default function LandingPage() {
	return (
		<div className="flex flex-col min-h-screen bg-background selection:bg-brand/30">
			<NavbarSync isLogo title="Hoardify" />

			{/* Immersive Landing Sections */}
			<LandingHero />
			
			<AdvantageSection />
			
			<ValueProps />
			
			<ProcessWorkflow />
			
			<FAQSection />
			
			<CTASection />
			
			{/* Simple Footer */}
			<footer className="py-20 border-t border-border-subtle bg-surface-sunken">
				<div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-12">
					<div className="flex items-center gap-4 group">
						<div className="h-10 w-10 bg-brand rounded-xl flex items-center justify-center text-white font-black italic shadow-premium-md group-hover:scale-110 transition-transform">H</div>
						<div className="flex flex-col">
							<span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#111111] italic">Hoardify Intelligence</span>
							<span className="text-[9px] text-text-tertiary font-bold uppercase tracking-widest mt-0.5">Deployment Node Alpha — Ranchi_HQ</span>
						</div>
					</div>
					
					<div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
						<Link href="#" className="text-[9px] font-black uppercase tracking-[0.3em] text-text-tertiary hover:text-brand transition-colors">Privacy Protocol</Link>
						<Link href="#" className="text-[9px] font-black uppercase tracking-[0.3em] text-text-tertiary hover:text-brand transition-colors">Service Level Agreement</Link>
						<Link href="#" className="text-[9px] font-black uppercase tracking-[0.3em] text-text-tertiary hover:text-brand transition-colors">© 2026 Intelligence_Systems</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
