import NavbarSync from "@/components/layout/NavbarSync";
import LandingHero from "@/components/landing/LandingHero";
import AdvantageSection from "@/components/landing/AdvantageSection";
import ValueProps from "@/components/landing/ValueProps";
import ProcessWorkflow from "@/components/landing/ProcessWorkflow";
import StatsBanner from "@/components/landing/StatsBanner";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";

export default function LandingPage() {
	return (
		<div className="flex flex-col min-h-screen bg-background selection:bg-brand/30">
			<NavbarSync isLogo title="Hoardify" />

			{/* Immersive Landing Sections */}
			<LandingHero />
			
			<StatsBanner />
			
			<AdvantageSection />
			
			<ValueProps />
			
			<ProcessWorkflow />
			
			<FAQSection />
			
			<CTASection />
			
			{/* Simple Footer */}
			<footer className="py-12 border-t border-border-subtle bg-surface-sunken">
				<div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
					<div className="flex items-center gap-3">
						<div className="h-8 w-8 bg-brand rounded-lg flex items-center justify-center text-white font-black italic">H</div>
						<span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-primary italic">Hoardify Intelligence</span>
					</div>
					
					<div className="flex items-center gap-10">
						<span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Privacy Node</span>
						<span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Terms of Deployment</span>
						<span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary">© 2026 Ranchi_HQ</span>
					</div>
				</div>
			</footer>
		</div>
	);
}
