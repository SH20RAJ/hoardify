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
		<div className="flex flex-col min-h-screen pb-40 bg-white">
			<NavbarSync isLogo title="Intelligence Explore" />

			<div className="pt-12">
				<AirbnbSearchBar />
			</div>

			{/* Trending Showcase */}
			<section className="mb-32 mt-12">
				<div className="px-8 mb-12 flex items-end justify-between">
					<div>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand text-[9px] font-black uppercase tracking-widest mb-3">
							Market Pulse
						</div>
						<h2 className="text-3xl font-black text-[#111111] tracking-tight">Trending Placements</h2>
						<p className="text-sm text-text-secondary mt-2">Most impactful nodes captured this week.</p>
					</div>
					<Link href="/search" className="text-[10px] font-black uppercase tracking-widest text-brand hover:underline underline-offset-8">
						Explore Full Map
					</Link>
				</div>
				<HorizontalScrollList className="px-8 scroll-px-8 gap-10 no-scrollbar">
					{trending.map(hoarding => (
						<HoardingCard key={hoarding.id} id={hoarding.id} title={hoarding.title} imageUrl={hoarding.imageUrl} images={hoarding.images} price={hoarding.price} location={hoarding.location} views={hoarding.views} lat={hoarding.lat} lng={hoarding.lng} />
					))}
				</HorizontalScrollList>
			</section>

			{/* Nearby: Geo-Context Grid */}
			<section className="mb-32 px-8">
				<div className="flex items-end justify-between mb-12">
					<div>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008a05]/5 border border-[#008a05]/10 text-[#008a05] text-[9px] font-black uppercase tracking-widest mb-3">
							Proximity Intelligence
						</div>
						<h2 className="text-3xl font-black text-[#111111] tracking-tight">Inventory Near You</h2>
						<p className="text-sm text-text-secondary mt-2">High-impact visibility nodes in your immediate area.</p>
					</div>
					<Link href="/filters" className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-border-subtle hover:border-brand hover:bg-brand/5 transition-all active:scale-95 group">
						<Settings2 size={16} className="text-text-tertiary group-hover:text-brand transition-colors" />
						<span className="text-xs font-bold text-[#111111]">Advanced Filters</span>
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{nearby.map(hoarding => (
						<HoardingCard key={hoarding.id} id={hoarding.id} title={hoarding.title} imageUrl={hoarding.imageUrl} images={hoarding.images} price={hoarding.price} location={hoarding.location} views={hoarding.views} variant="banner" lat={hoarding.lat} lng={hoarding.lng} />
					))}
				</div>
			</section>

			{/* Why Brands Use Hoardify */}
			<section className="mt-32 mb-32 px-6 max-w-7xl mx-auto w-full">
				<div className="text-center mb-20">
					<h2 className="text-4xl font-extrabold text-[#222222] tracking-tight">Why Brands Use Hoardify</h2>
					<p className="text-base text-[#6a6a6a] mt-4 max-w-2xl mx-auto leading-relaxed">
						The modern outdoor advertising marketplace built for speed, analytics, and 100% transparency.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
					<div className="group p-10 rounded-[2rem] border border-[#ebebeb] bg-white hover:border-[#082390]/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2">
						<div className="w-14 h-14 rounded-2xl bg-[#f7f7f7] flex items-center justify-center text-[#082390] mb-8 group-hover:scale-110 group-hover:bg-[#082390] group-hover:text-white transition-all duration-500">
							<ShieldCheck size={28} strokeWidth={1.5} />
						</div>
						<h3 className="text-xl font-bold text-[#222222] mb-4">100% Verified Locations</h3>
						<p className="text-[#6a6a6a] leading-relaxed">
							Every single listing is physically inspected and verified for coordinate accuracy, visibility angles, and local traffic profiles.
						</p>
					</div>

					<div className="group p-10 rounded-[2rem] border border-[#ebebeb] bg-white hover:border-[#082390]/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2">
						<div className="w-14 h-14 rounded-2xl bg-[#f7f7f7] flex items-center justify-center text-[#082390] mb-8 group-hover:scale-110 group-hover:bg-[#082390] group-hover:text-white transition-all duration-500">
							<BadgePercent size={28} strokeWidth={1.5} />
						</div>
						<h3 className="text-xl font-bold text-[#222222] mb-4">Transparent Pricing</h3>
						<p className="text-[#6a6a6a] leading-relaxed">
							No broker markups, no hidden commissions. View direct owner rental rates and make informed planning decisions with upfront details.
						</p>
					</div>

					<div className="group p-10 rounded-[2rem] border border-[#ebebeb] bg-white hover:border-[#082390]/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2">
						<div className="w-14 h-14 rounded-2xl bg-[#f7f7f7] flex items-center justify-center text-[#082390] mb-8 group-hover:scale-110 group-hover:bg-[#082390] group-hover:text-white transition-all duration-500">
							<BarChart3 size={28} strokeWidth={1.5} />
						</div>
						<h3 className="text-xl font-bold text-[#222222] mb-4">Impact Analytics</h3>
						<p className="text-[#6a6a6a] leading-relaxed">
							Estimate monthly impressions, view audience demographics, and track coverage metrics across Ranchi to optimize your budget.
						</p>
					</div>
				</div>
			</section>

			{/* Frequently Asked Questions */}
			<section className="mb-40 px-8 max-w-5xl mx-auto w-full">
				<div className="mb-20 text-center">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-sunken border border-border-subtle text-text-tertiary text-[9px] font-black uppercase tracking-widest mb-3">
						Support & Intelligence
					</div>
					<h2 className="text-4xl font-black text-[#111111] tracking-tight">Common Inquiries</h2>
					<p className="text-base text-text-secondary mt-4 max-w-xl mx-auto leading-relaxed">Everything you need to know about deploying outdoor media on our system.</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
					{[
						{
							q: "How do I book a hoarding on Hoardify?",
							a: "Browse our intelligence-mapped inventory, select your preferred dates, and submit a request. Our system validates availability and guides you through the deployment lifecycle."
						},
						{
							q: "Are the listing rates final?",
							a: "Rates are direct from owners. For high-volume deployments or long-term multi-node campaigns, our intelligence team can negotiate bulk-buy optimization."
						},
						{
							q: "How does verification work?",
							a: "Every node is physically audited by field agents. We verify coordinates, visibility scores, and traffic profiles to ensure data integrity and prevent fraud."
						},
						{
							q: "Can I list my own inventory?",
							a: "Yes. Owners can integrate their inventory into the Hoardify ecosystem through the Agency Portal to receive direct high-intent leads."
						}
					].map((faq, idx) => (
						<div key={idx} className="group flex flex-col gap-4">
							<h3 className="text-lg font-bold text-[#111111] group-hover:text-brand transition-colors">{faq.q}</h3>
							<p className="text-sm text-text-secondary leading-relaxed font-medium">{faq.a}</p>
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
