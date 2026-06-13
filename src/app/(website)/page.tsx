import { Monitor, Smartphone, Video, Grid, Settings2, ShieldCheck, BadgePercent, BarChart3 } from "lucide-react";
import HoardingCard from "@/components/hoardings/HoardingCard";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";
import Link from "next/link";
import NavbarSync from "@/components/layout/NavbarSync";
import AirbnbSearchBar from "@/components/home/AirbnbSearchBar";
import MapBridge from "@/components/hoardings/MapBridge";
import ChannelCard from "@/components/hoardings/ChannelCard";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { syncUserToDb } from "@/actions/user_sync";

import { getTrendingHoardings, getNearbyHoardings, getCategoryCounts } from "@/actions/hoardings";

export default async function ExplorePage() {
	let user = null;
	try {
		user = await stackServerApp.getUser();
	} catch {
		// Auth service unavailable
	}

	if (user) {
		// Sync user to local DB on every visit if authenticated
		await syncUserToDb({
			id: user.id,
			primaryEmail: user.primaryEmail,
			displayName: user.displayName,
			profileImageUrl: user.profileImageUrl,
		});
	}

	// Fetch real-time data from PostgreSQL via Server Actions
	const [trending, nearby, counts] = await Promise.all([
		getTrendingHoardings(6),
		getNearbyHoardings(4),
		getCategoryCounts()
	]);

	return (
		<div className="flex flex-col min-h-screen pb-24 md:pb-40 bg-background transition-colors duration-300">
			<NavbarSync isLogo title="Explore" />

			<div className="pt-4 md:pt-12">
				<AirbnbSearchBar />
			</div>

			{/* Trending Showcase */}
			<section className="mb-12 md:mb-32">
				<div className="px-4 md:px-8 mb-6 md:mb-12 flex items-end justify-between">
					<div>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand text-[9px] font-black uppercase tracking-widest mb-3">
							Trending
						</div>
						<h2 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">Popular Locations</h2>
						<p className="text-sm text-text-secondary mt-1 md:mt-2">Most viewed billboards this week.</p>
					</div>
					<Link href="/search" className="text-[10px] font-black uppercase tracking-widest text-brand hover:underline underline-offset-8">
						See All on Map
					</Link>
				</div>
				<HorizontalScrollList className="px-4 md:px-8 scroll-px-4 md:scroll-px-8 gap-4 md:gap-10 no-scrollbar">
					{trending.map(hoarding => (
						<HoardingCard key={hoarding.id} id={hoarding.id} title={hoarding.title} imageUrl={hoarding.imageUrl} images={hoarding.images} price={hoarding.price} location={hoarding.location} views={hoarding.views} lat={hoarding.lat} lng={hoarding.lng} />
					))}
				</HorizontalScrollList>
			</section>

			{/* Nearby: Geo-Context Grid */}
			<section className="mb-12 md:mb-32 px-4 md:px-8">
				<div className="flex flex-col gap-6 md:flex md:items-end md:justify-between mb-8 md:mb-12">
					<div>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008a05]/5 border border-[#008a05]/10 text-[#008a05] text-[9px] font-black uppercase tracking-widest mb-3">
							Near You
						</div>
						<h2 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">Available Near You</h2>
						<p className="text-sm text-text-secondary mt-1 md:mt-2">Best spots in your current area.</p>
					</div>
					<Link href="/filters" className="flex w-full md:w-auto items-center justify-center md:justify-start gap-3 px-5 md:px-6 py-3 rounded-2xl border border-border-subtle hover:border-brand hover:bg-brand/5 transition-all active:scale-95 group">
						<Settings2 size={16} className="text-text-tertiary group-hover:text-brand transition-colors" />
						<span className="text-xs font-bold text-text-primary">More Filters</span>
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
					{nearby.map(hoarding => (
						<HoardingCard key={hoarding.id} id={hoarding.id} title={hoarding.title} imageUrl={hoarding.imageUrl} images={hoarding.images} price={hoarding.price} location={hoarding.location} views={hoarding.views} variant="banner" lat={hoarding.lat} lng={hoarding.lng} />
					))}
				</div>
			</section>

			{/* Why Brands Use Hoardify */}
			<section className="mt-12 md:mt-32 mb-12 md:mb-32 px-4 md:px-6 max-w-7xl mx-auto w-full">
				<div className="text-center mb-10 md:mb-20">
					<h2 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">Why Choose Hoardify?</h2>
					<p className="text-sm md:text-base text-text-secondary mt-4 max-w-2xl mx-auto leading-relaxed">
						The easiest way to find and book outdoor ads with clear pricing and verified spots.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
					<div className="group p-6 md:p-10 rounded-[2rem] border border-border-subtle bg-surface-raised hover:border-brand/20 hover:shadow-premium-md transition-all duration-500 hover:-translate-y-2">
						<div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-surface-sunken flex items-center justify-center text-brand mb-5 md:mb-8 group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all duration-500">
							<ShieldCheck size={28} strokeWidth={1.5} />
						</div>
						<h3 className="text-xl font-bold text-text-primary mb-4">Verified Spots</h3>
						<p className="text-text-secondary leading-relaxed font-medium">
							Every location is checked by us for accuracy and visibility. No fake listings.
						</p>
					</div>

					<div className="group p-6 md:p-10 rounded-[2rem] border border-border-subtle bg-surface-raised hover:border-brand/20 hover:shadow-premium-md transition-all duration-500 hover:-translate-y-2">
						<div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-surface-sunken flex items-center justify-center text-brand mb-5 md:mb-8 group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all duration-500">
							<BadgePercent size={28} strokeWidth={1.5} />
						</div>
						<h3 className="text-xl font-bold text-text-primary mb-4">Clear Pricing</h3>
						<p className="text-text-secondary leading-relaxed font-medium">
							No hidden fees or extra costs. You see the same price that the owners offer.
						</p>
					</div>

					<div className="group p-6 md:p-10 rounded-[2rem] border border-border-subtle bg-surface-raised hover:border-brand/20 hover:shadow-premium-md transition-all duration-500 hover:-translate-y-2">
						<div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-surface-sunken flex items-center justify-center text-brand mb-5 md:mb-8 group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all duration-500">
							<BarChart3 size={28} strokeWidth={1.5} />
						</div>
						<h3 className="text-xl font-bold text-text-primary mb-4">Real Results</h3>
						<p className="text-text-secondary leading-relaxed font-medium">
							Get estimates on how many people will see your ad and who your audience is.
						</p>
					</div>
				</div>
			</section>

			{/* Frequently Asked Questions */}
			<section className="mb-20 md:mb-40 px-4 md:px-8 max-w-5xl mx-auto w-full">
				<div className="mb-10 md:mb-20 text-center">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-sunken border border-border-subtle text-text-tertiary text-[9px] font-black uppercase tracking-widest mb-3">
						Help Center
					</div>
					<h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight">Common Questions</h2>
					<p className="text-sm md:text-base text-text-secondary mt-4 max-w-xl mx-auto leading-relaxed">Everything you need to know about booking with us.</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-6 md:gap-y-12">
					{[
						{
							q: "How do I book a spot?",
							a: "Browse our map, pick your dates, and send a request. We'll check availability and help you set up your ad."
						},
						{
							q: "Are the prices final?",
							a: "Yes, these are direct prices from owners. For large or long-term bookings, we can help you get better deals."
						},
						{
							q: "How do you verify spots?",
							a: "Our team visits every location to check coordinates, visibility, and traffic. This ensures you get what you pay for."
						},
						{
							q: "Can I list my own billboards?",
							a: "Yes! If you own billboards, you can list them in our Agency Portal to get direct leads from advertisers."
						}
					].map((faq, idx) => (
						<div key={idx} className="group flex flex-col gap-3 md:gap-4">
							<h3 className="text-base md:text-lg font-bold text-text-primary group-hover:text-brand transition-colors">{faq.q}</h3>
							<p className="text-xs md:text-sm text-text-secondary leading-relaxed font-medium">{faq.a}</p>
						</div>
					))}
				</div>
			</section>

			{/* Call to action Map Bridge */}
			<div className="mt-12">
				<MapBridge />
			</div>

			{/* Structured Data / JSON-LD */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@graph": [
							{
								"@type": "Organization",
								"@id": "https://hoardify.in/#organization",
								"name": "Hoardify",
								"url": "https://hoardify.in",
								"logo": "https://hoardify.in/logo.png",
								"description": "Outdoor advertising marketplace for discovering and booking hoardings, billboards, and OOH media spaces.",
								"email": "hello@hoardify.in",
								"address": {
									"@type": "PostalAddress",
									"addressLocality": "Ranchi",
									"addressRegion": "Jharkhand",
									"addressCountry": "IN"
								}
							},
							{
								"@type": "WebSite",
								"@id": "https://hoardify.in/#website",
								"url": "https://hoardify.in",
								"name": "Hoardify",
								"description": "Discover, compare, and book premium hoardings, billboards, and outdoor advertising spaces in Ranchi & across India.",
								"publisher": {
									"@id": "https://hoardify.in/#organization"
								},
								"potentialAction": [
									{
										"@type": "SearchAction",
										"target": {
											"@type": "EntryPoint",
											"urlTemplate": "https://hoardify.in/search?q={search_term_string}"
										},
										"query-input": "required name=search_term_string"
									}
								]
							},
							{
								"@type": "FAQPage",
								"mainEntity": [
									{
										"@type": "Question",
										"name": "How do I book a hoarding/billboard on Hoardify?",
										"acceptedAnswer": {
											"@type": "Answer",
											"text": "Simply browse our map or inventory list, select your preferred dates, and submit a booking request. Our team will verify availability with the media owner and guide you through the setup and printing process."
										}
									},
									{
										"@type": "Question",
										"name": "Are the listing rates final?",
										"acceptedAnswer": {
											"@type": "Answer",
											"text": "Prices listed on Hoardify are direct rates from the media owners. For long-term campaigns (3+ months) or multi-node bookings, reach out to hello@hoardify.in for campaign discounts."
										}
									},
									{
										"@type": "Question",
										"name": "How does verification work?",
										"acceptedAnswer": {
											"@type": "Answer",
											"text": "Every hoarding is verified by our field agents. We verify coordinates, check lighting systems (lit/non-lit/unipole), dimensions, and record visibility scores to prevent fraud."
										}
									},
									{
										"@type": "Question",
										"name": "How can I list my hoarding as an owner?",
										"acceptedAnswer": {
											"@type": "Answer",
											"text": "Go to the profile page and sign up. You can manage your inventory and receive direct enquiry leads from advertisers through our dashboard."
										}
									}
								]
							}
						]
					})
				}}
			/>
		</div>
	);
}
