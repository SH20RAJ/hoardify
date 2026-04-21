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
		<section className="py-24 bg-white border-t border-[#ebebeb]">
			<div className="container mx-auto px-6 max-w-3xl">
				<h2 className="text-3xl font-semibold text-[#222222] mb-12">
					Common Questions
				</h2>

				<div className="space-y-8">
					{faqs.map((faq, index) => (
						<div key={index}>
							<h3 className="text-lg font-semibold text-[#222222] mb-3">
								{faq.q}
							</h3>
							<p className="text-[#6a6a6a] leading-relaxed">
								{faq.a}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
