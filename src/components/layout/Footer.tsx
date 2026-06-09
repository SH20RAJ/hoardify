"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
	return (
		<footer className="w-full bg-[#f7f7f7] border-t border-[#ebebeb] pt-16 pb-24 md:pb-16 mt-20">
			<div className="container mx-auto px-6 max-w-7xl">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
					{/* Brand Column */}
					<div className="md:col-span-2">
						<div className="flex items-center gap-2 mb-4">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#082390] font-black text-white italic">
								H
							</div>
							<span className="text-xl font-bold tracking-tight text-[#082390]">hoardify</span>
						</div>
						<p className="text-sm text-[#717171] max-w-sm leading-relaxed mb-6">
							Ranchi&apos;s premier outdoor advertising marketplace. We bring transparency, verify locations, and streamline bookings for billboards, hoardings, transit media, and digital OOH.
						</p>
						<div className="flex items-center gap-3 text-xs text-[#717171]">
							<span className="inline-block h-2.5 w-2.5 rounded-full bg-[#008a05]" />
							<span>Active &amp; Verified Ranchi Inventory</span>
						</div>
					</div>

					{/* Platform Links */}
					<div>
						<h4 className="text-sm font-semibold text-[#222222] uppercase tracking-wider mb-4 font-mono">Explore</h4>
						<ul className="space-y-3">
							<li>
								<Link href="/search" className="text-sm text-[#717171] hover:text-[#222222] transition-colors">
									Interactive Map
								</Link>
							</li>
							<li>
								<Link href="/hoardings" className="text-sm text-[#717171] hover:text-[#222222] transition-colors">
									All Billboards
								</Link>
							</li>
							<li>
								<Link href="/filters" className="text-sm text-[#717171] hover:text-[#222222] transition-colors">
									Custom Filters
								</Link>
							</li>
						</ul>
					</div>

					{/* Trust & Contact */}
					<div>
						<h4 className="text-sm font-semibold text-[#222222] uppercase tracking-wider mb-4 font-mono">Company &amp; Trust</h4>
						<ul className="space-y-3">
							<li className="flex items-center gap-2 text-sm text-[#717171]">
								<Mail size={16} />
								<a href="mailto:hello@hoardify.in" className="hover:text-[#222222] transition-colors">
									hello@hoardify.in
								</a>
							</li>
							<li className="text-sm text-[#717171] font-medium">
								CIN: U73100JH2025PTC026007
							</li>
							<li className="text-xs text-[#717171] leading-relaxed">
								Hoardify Private Limited<br />
								Registered in Ranchi, Jharkhand, India
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom section */}
				<div className="border-t border-[#ebebeb] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-xs text-[#717171]">
						&copy; {new Date().getFullYear()} Hoardify Private Limited. All rights reserved.
					</p>
					<div className="flex gap-6 text-xs text-[#717171]">
						<Link href="#" className="hover:text-[#222222] transition-colors">
							Terms &amp; Conditions
						</Link>
						<Link href="#" className="hover:text-[#222222] transition-colors">
							Privacy Policy
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
