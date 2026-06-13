"use client";

import Link from "next/link";
import { Mail, ArrowUpRight, Globe, Shield } from "lucide-react";

export default function Footer() {
	return (
		<footer className="w-full bg-background border-t border-border-subtle pt-16 md:pt-24 pb-12 mt-20 md:mt-40 transition-colors duration-300">
			<div className="container mx-auto px-6 max-w-7xl">
				<div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 mb-16 md:mb-24">
					{/* Brand Column */}
					<div className="md:col-span-2">
						<Link href="/" className="flex items-center gap-3 mb-6 md:mb-8 group">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-premium-md group-hover:scale-110 transition-transform duration-500">
								<img src="/new-logo.png" alt="" className="h-full w-full object-contain p-1.5" />
							</div>
							<span className="text-2xl font-black tracking-tighter text-text-primary">hoardify</span>
						</Link>
						<p className="text-base text-text-secondary max-w-xs leading-relaxed mb-8 md:mb-10 font-medium">
							Ranchi&apos;s premier outdoor advertising marketplace. We verify every location to ensure your brand dominates the city skyline.
						</p>
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-3 px-4 py-2 rounded-full bg-surface-sunken w-fit border border-border-subtle">
								<Globe size={14} className="text-brand" />
								<span className="text-[10px] font-black uppercase tracking-widest text-text-primary">Active in Jharkhand</span>
							</div>
							<div className="flex items-center gap-3 px-4 py-2 rounded-full bg-surface-sunken w-fit border border-border-subtle">
								<Shield size={14} className="text-[#008a05]" />
								<span className="text-[10px] font-black uppercase tracking-widest text-text-primary">100% Verified Inventory</span>
							</div>
						</div>
					</div>

					{/* Platform Links */}
					<div className="mt-4 md:mt-0">
						<h4 className="text-[10px] font-black text-text-tertiary uppercase tracking-[0.3em] mb-6 md:mb-8">Ecosystem</h4>
						<ul className="space-y-4">
							{[
								{ name: "Interactive Map", href: "/search" },
								{ name: "Premium Inventory", href: "/hoardings" },
								{ name: "Advanced Filters", href: "/filters" },
								{ name: "Agency Portal", href: "/agency" },
							].map((link) => (
								<li key={link.name}>
									<Link href={link.href} className="text-sm font-bold text-text-secondary hover:text-brand flex items-center gap-1 group transition-colors">
										{link.name}
										<ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Trust & Contact */}
					<div className="md:col-span-2 mt-4 md:mt-0">
						<h4 className="text-[10px] font-black text-text-tertiary uppercase tracking-[0.3em] mb-6 md:mb-8">Corporate Headquarters</h4>
						<div className="bg-surface-sunken p-6 md:p-8 rounded-2xl md:rounded-3xl border border-border-subtle">
							<ul className="space-y-6">
								<li className="flex flex-col gap-1">
									<span className="text-[9px] font-black text-text-tertiary uppercase tracking-widest">Connect</span>
									<a href="mailto:hello@hoardify.in" className="text-base font-black text-text-primary hover:text-brand transition-colors flex items-center gap-2">
										hello@hoardify.in
										<Mail size={16} strokeWidth={2.5} />
									</a>
								</li>
								<li className="flex flex-col gap-1">
									<span className="text-[9px] font-black text-text-tertiary uppercase tracking-widest">Registration</span>
									<span className="text-sm font-black text-text-primary uppercase tracking-tight">CIN: U73100JH2025PTC026007</span>
								</li>
								<li className="flex flex-col gap-1">
									<span className="text-[9px] font-black text-text-tertiary uppercase tracking-widest">Location</span>
									<span className="text-sm font-bold text-text-secondary leading-relaxed">
										Hoardify Private Limited, Ranchi, Jharkhand, India
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Bottom section */}
				<div className="pt-12 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-8">
					<div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
						<p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">
							&copy; {new Date().getFullYear()} Ranchi_HQ
						</p>
						<div className="h-1 w-1 rounded-full bg-border-strong hidden sm:block" />
						<p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">
							Engineered with Intelligence
						</p>
					</div>
					<div className="flex gap-6 md:gap-8">
						<Link href="#" className="text-[10px] font-black text-text-tertiary uppercase tracking-[0.2em] hover:text-text-primary transition-colors">
							Privacy Node
						</Link>
						<Link href="#" className="text-[10px] font-black text-text-tertiary uppercase tracking-[0.2em] hover:text-text-primary transition-colors">
							Terms of Deployment
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
