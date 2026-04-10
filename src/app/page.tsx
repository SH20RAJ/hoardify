import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import HoardingCard from "@/components/hoardings/HoardingCard";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";
import { HOARDINGS } from "@/lib/mock-data";
import HomeHero from "@/components/home/HomeHero";
import SectionHeader from "@/components/home/SectionHeader";
import CategoryRail from "@/components/home/CategoryRail";
import ExploreMapCard from "@/components/home/ExploreMapCard";

export default function ExplorePage() {
	const featured = HOARDINGS.slice(0, 4);
	const trending = HOARDINGS.slice(4, 7);

	return (
		<div className="flex flex-col pb-28">
			<TopBar
				isLogo
				title="Outdoor inventory marketplace"
				rightAction={
					<Link
						href="/search"
						className="btn-circle-modern"
						aria-label="Open search"
					>
						<Search size={18} className="text-[#212121]" />
					</Link>
				}
			/>

			<HomeHero />

			<section className="mt-8 px-4">
				<SectionHeader
					title="Featured locations"
					subtitle="Hand-picked high-visibility hoardings"
					action={<button className="text-sm font-semibold text-[#ff385c]">View all</button>}
				/>
				<HorizontalScrollList>
					{featured.map((hoarding) => (
						<HoardingCard key={hoarding.id} {...hoarding} />
					))}
				</HorizontalScrollList>
			</section>

			<section className="mt-8">
				<div className="px-4">
					<SectionHeader title="Browse by category" subtitle="Choose inventory format that fits your campaign." />
				</div>
				<CategoryRail />
			</section>

			<section className="mt-8 px-4">
				<SectionHeader
					title="Trending near you"
					subtitle="Performance-ready spaces in your region"
					action={
						<Link
							href="/filters"
							className="inline-flex items-center gap-2 rounded-full border border-[#00000014] bg-white px-3 py-1.5 text-xs font-semibold text-[#222]"
						>
							<SlidersHorizontal size={14} />
							Filters
						</Link>
					}
				/>
				<div className="flex flex-col gap-4">
					{trending.map((hoarding) => (
						<HoardingCard key={hoarding.id} {...hoarding} variant="banner" />
					))}
				</div>
			</section>

			<ExploreMapCard />
		</div>
	);
}
