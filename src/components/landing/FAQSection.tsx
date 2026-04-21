// Static FAQ data extraction for render optimization
const faqs = [
	{
		q: "How does Hoardify estimate impressions?",
		a: "We utilize localized traffic intelligence, combining GPS density data, road classifications, and physical visibility angles to project accurate monthly reach for every node."
	},
	{
		q: "Are the listed prices final?",
		a: "Yes. Our pricing is 100% transparent. The price you see includes the rental for the selected duration. Printing and installation are calculated separately during checkout based on your exact specifications."
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
		<section className="py-32 bg-background border-t border-border-subtle/50">
			<div className="container mx-auto px-6 max-w-4xl">
				<div className="flex flex-col items-start mb-16">
					<div className="text-brand text-[10px] font-black uppercase tracking-[0.4em] mb-4">Clarity</div>
					<h2 className="text-3xl md:text-5xl font-black tracking-tighter text-text-primary uppercase italic">
						Common <br className="md:hidden" /> Questions.
					</h2>
				</div>

				<div className="divide-y divide-border-subtle">
					{faqs.map((faq, index) => (
						<details key={index} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
							<summary className="flex cursor-pointer items-center justify-between font-black uppercase tracking-widest text-text-primary outline-none hover:text-brand transition-colors text-sm md:text-base">
								{faq.q}
								<span className="ml-6 flex h-6 w-6 items-center justify-center rounded-full bg-surface-sunken text-text-tertiary transition-transform duration-300 group-open:rotate-180 group-open:bg-brand/10 group-open:text-brand">
									<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								</span>
							</summary>
							<div className="mt-4 text-sm font-medium text-text-secondary leading-relaxed pr-12 animate-fade-in">
								{faq.a}
							</div>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
