import { getAdminMetrics } from "@/actions/admin";
import { Database, Globe, Shield, Bell, Palette, Code } from "lucide-react";

export default async function AdminSettingsPage() {
	const metrics = await getAdminMetrics();

	const settingSections = [
		{
			title: "General",
			items: [
				{ icon: Globe, label: "Platform Name", value: "Hoardify", description: "Display name across the platform" },
				{ icon: Palette, label: "Theme", value: "Light", description: "Default appearance for admin panel" },
			]
		},
		{
			title: "Security",
			items: [
				{ icon: Shield, label: "Admin Passcode", value: "••••••••", description: "Access code for admin panel" },
				{ icon: Bell, label: "Notifications", value: "Enabled", description: "Email alerts for new enquiries" },
			]
		},
		{
			title: "System",
			items: [
				{ icon: Database, label: "Database", value: "Neon PostgreSQL", description: `${metrics.totalPlacements} placements, ${metrics.totalUsers} users` },
				{ icon: Code, label: "Runtime", value: "Cloudflare Workers", description: "Edge deployment via OpenNext" },
			]
		},
	];

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-2xl font-bold text-[#222222]">Settings</h2>
				<p className="text-sm text-[#717171] mt-1">Platform configuration and system info</p>
			</div>

			{settingSections.map((section) => (
				<div key={section.title} className="bg-white rounded-2xl border border-[#ebebeb] shadow-sm overflow-hidden">
					<div className="px-6 py-4 bg-[#f7f7f7] border-b border-[#ebebeb]">
						<h3 className="text-xs font-bold uppercase tracking-widest text-[#717171]">{section.title}</h3>
					</div>
					<div className="divide-y divide-[#f0f0f0]">
						{section.items.map((item) => {
							const Icon = item.icon;
							return (
								<div key={item.label} className="px-6 py-5 flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="h-10 w-10 rounded-xl bg-[#f7f7f7] flex items-center justify-center text-[#717171]">
											<Icon size={18} />
										</div>
										<div>
											<p className="text-sm font-semibold text-[#222222]">{item.label}</p>
											<p className="text-xs text-[#717171] mt-0.5">{item.description}</p>
										</div>
									</div>
									<span className="text-sm font-medium text-[#717171]">{item.value}</span>
								</div>
							);
						})}
					</div>
				</div>
			))}

			<div className="bg-white rounded-2xl border border-[#ebebeb] shadow-sm p-6">
				<p className="text-xs text-[#b0b0b0] text-center">
					Hoardify v0.1.0 · Next.js 16.1.5 · Drizzle ORM · Cloudflare Workers · Neon PostgreSQL
				</p>
			</div>
		</div>
	);
}
