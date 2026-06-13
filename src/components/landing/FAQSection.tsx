const faqs = [
	{
		q: "How does Hoardify estimate impressions?",
		a: "We utilize localized traffic intelligence, combining GPS density data, road classifications, and physical visibility angles to project accurate monthly reach for every node."
	},
	{
		q: "Are the listed prices final?",
		a: "Yes. Our pricing is 100% transparent. The price you see includes the rental for the selected duration. Printing and installation are calculated based on your specifications."
	},
	{
		q: "Do you handle the actual printing and installation?",
		a: "Absolutely. We are an end-to-end platform. Once you submit your creative assets, our verified local partners handle the high-resolution printing and physical deployment."
	},
	{
		q: "How quickly can my campaign go live?",
		a: "Standard deployment occurs within 48 hours of final creative approval. We've removed the weeks of standard industry delays."
	}
];

export default function FAQSection() {
	return (
		<section className="py-20 md:py-32 bg-white border-t border-border-subtle">
			<div className="container mx-auto px-4 sm:px-6 max-w-4xl">
				<div className="text-center mb-14 md:mb-24">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-sunken border border-border-subtle text-text-tertiary text-[9px] font-black uppercase tracking-widest mb-6">
						Intelligence FAQ
					</div>
					<h2 className="text-4xl md:text-5xl font-black text-[#111111] tracking-tight mb-6">
						Common Questions
					</h2>
					<p className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed font-medium">
						Everything you need to know about our data protocols and deployment lifecycle.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-8 md:gap-y-16">
					{faqs.map((faq, index) => (
						<div key={index} className="group">
							<h3 className="text-xl font-bold text-[#111111] mb-4 group-hover:text-brand transition-colors">
								{faq.q}
							</h3>
							<p className="text-text-secondary text-base leading-relaxed font-medium">
								{faq.a}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
