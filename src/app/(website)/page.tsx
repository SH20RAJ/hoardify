import { Monitor, Smartphone, Video, Grid, Settings2 } from "lucide-react";
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
		<div className="flex flex-col min-h-screen pb-32 bg-white">
			<NavbarSync isLogo title="Explore" />

			<AirbnbSearchBar />

			{/* Trending Showcase */}
			<section className="mb-24">
				<div className="px-6 mb-10 flex items-end justify-between">
					<div>
						<h2 className="text-2xl font-bold text-[#222222]">Trending now</h2>
						<p className="text-sm text-[#6a6a6a] mt-1">Most viewed placements this week</p>
					</div>
					<Link href="/search" className="text-sm font-semibold text-[#222222] underline underline-offset-4">Explore Map</Link>
				</div>
				<HorizontalScrollList className="px-6 scroll-px-6 gap-8">
					{trending.map(hoarding => (
						<HoardingCard key={hoarding.id} id={hoarding.id} title={hoarding.title} imageUrl={hoarding.imageUrl} images={hoarding.images} price={hoarding.price} location={hoarding.location} views={hoarding.views} lat={hoarding.lat} lng={hoarding.lng} />
					))}
				</HorizontalScrollList>
			</section>

			{/* Nearby: Geo-Context Grid */}
			<section className="mb-24 px-6">
				<div className="flex items-end justify-between mb-10">
					<div>
						<h2 className="text-2xl font-bold text-[#222222]">Inventory near you</h2>
						<p className="text-sm text-[#6a6a6a] mt-1">High-impact nodes in your area</p>
					</div>
					<Link href="/filters" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#dddddd] hover:border-[#222222] transition-colors">
						<Settings2 size={16} />
						<span className="text-sm font-semibold">Filters</span>
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{nearby.map(hoarding => (
						<HoardingCard key={hoarding.id} id={hoarding.id} title={hoarding.title} imageUrl={hoarding.imageUrl} images={hoarding.images} price={hoarding.price} location={hoarding.location} views={hoarding.views} variant="banner" lat={hoarding.lat} lng={hoarding.lng} />
					))}
				</div>
			</section>

			{/* Why Brands Use Hoardify */}
			<section className="mt-24 mb-24 px-6 max-w-7xl mx-auto w-full">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-[#222222]">Why Brands Use Hoardify</h2>
					<p className="text-sm text-[#6a6a6a] mt-2">The modern outdoor advertising marketplace built for speed, analytics, and transparency</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="p-8 rounded-2xl border border-[#ebebeb] bg-[#f7f7f7] hover:shadow-md transition-shadow">
						<div className="text-[#ff385c] text-3xl mb-4">📍</div>
						<h3 className="text-lg font-bold text-[#222222] mb-2">100% Verified Locations</h3>
						<p className="text-sm text-[#6a6a6a] leading-relaxed">
							Every single listing on Hoardify is physically inspected and verified for coordinate accuracy, visibility angles, and local traffic profiles.
						</p>
					</div>
					<div className="p-8 rounded-2xl border border-[#ebebeb] bg-[#f7f7f7] hover:shadow-md transition-shadow">
						<div className="text-[#ff385c] text-3xl mb-4">💳</div>
						<h3 className="text-lg font-bold text-[#222222] mb-2">Transparent Pricing</h3>
						<p className="text-sm text-[#6a6a6a] leading-relaxed">
							No broker markups, no hidden commissions. View direct owner rental rates and make informed planning decisions with upfront details.
						</p>
					</div>
					<div className="p-8 rounded-2xl border border-[#ebebeb] bg-[#f7f7f7] hover:shadow-md transition-shadow">
						<div className="text-[#ff385c] text-3xl mb-4">📊</div>
						<h3 className="text-lg font-bold text-[#222222] mb-2">Impact Analytics</h3>
						<p className="text-sm text-[#6a6a6a] leading-relaxed">
							Estimate monthly impressions, view audience demographics, and track coverage metrics across Ranchi to optimize your campaign budget.
						</p>
					</div>
				</div>
			</section>

			{/* Frequently Asked Questions */}
			<section className="mb-24 px-6 max-w-4xl mx-auto w-full">
				<div className="mb-12">
					<h2 className="text-3xl font-bold text-[#222222]">Frequently Asked Questions</h2>
					<p className="text-sm text-[#6a6a6a] mt-2">Everything you need to know about booking outdoor media in Ranchi</p>
				</div>
				<div className="space-y-6">
					{[
						{
							q: "How do I book a hoarding/billboard on Hoardify?",
							a: "Simply browse our map or inventory list, select your preferred dates, and submit a booking request. Our team will verify availability with the media owner and guide you through the setup and printing process."
						},
						{
							q: "Are the listing rates final?",
							a: "Prices listed on Hoardify are direct rates from the media owners. For long-term campaigns (3+ months) or multi-node bookings, reach out to hello@hoardify.in for campaign discounts."
						},
						{
							q: "How does verification work?",
							a: "Every hoarding is verified by our field agents. We verify coordinates, check lighting systems (lit/non-lit/unipole), dimensions, and record visibility scores to prevent fraud."
						},
						{
							q: "How can I list my hoarding as an owner?",
							a: "Go to the profile page and sign up. You can manage your inventory and receive direct enquiry leads from advertisers through our dashboard."
						}
					].map((faq, idx) => (
						<div key={idx} className="pb-6 border-b border-[#ebebeb]">
							<h3 className="text-lg font-semibold text-[#222222] mb-2">{faq.q}</h3>
							<p className="text-sm text-[#6a6a6a] leading-relaxed">{faq.a}</p>
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
