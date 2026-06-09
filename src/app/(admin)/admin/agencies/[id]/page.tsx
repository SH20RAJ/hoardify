import { getAgencyById } from "@/actions/agencies";
import { getHoardings } from "@/actions/hoardings";
import { notFound } from "next/navigation";
import { Building2, MapPin, Mail, Phone, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import HoardingCard from "@/components/hoardings/HoardingCard";

export default async function AgencyDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const agencyId = parseInt(id, 10);
	
	if (isNaN(agencyId)) notFound();

	const [agency, hoardings] = await Promise.all([
		getAgencyById(agencyId),
		getHoardings({ agencyId })
	]);

	if (!agency) notFound();

	return (
		<div className="space-y-8">
			<div className="flex items-center gap-4">
				<Link 
					href="/admin/agencies"
					className="p-2 rounded-lg hover:bg-[#f7f7f7] text-[#717171] transition-colors"
				>
					<ArrowLeft size={20} />
				</Link>
				<div>
					<h1 className="text-2xl font-bold text-[#222222]">{agency.name}</h1>
					<p className="text-sm text-[#717171]">Agency Profile & Inventory</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Agency Profile Card */}
				<div className="bg-white rounded-2xl border border-[#ebebeb] p-6 shadow-sm h-fit">
					<div className="flex flex-col items-center text-center mb-6">
						<div className="h-24 w-24 rounded-2xl bg-[#f7f7f7] flex items-center justify-center overflow-hidden border border-[#ebebeb] mb-4">
							{agency.logoUrl ? (
								<img src={agency.logoUrl} alt="" className="h-full w-full object-contain p-2" />
							) : (
								<Building2 size={40} className="text-[#b0b0b0]" />
							)}
						</div>
						<h2 className="text-xl font-bold text-[#222222]">{agency.name}</h2>
						<div className="flex items-center gap-1.5 text-sm text-[#717171] mt-1">
							<MapPin size={14} />
							<span>{agency.address || "No address provided"}</span>
						</div>
					</div>

					<div className="space-y-4 pt-6 border-t border-[#f7f7f7]">
						{agency.email && (
							<div className="flex items-center gap-3">
								<div className="h-9 w-9 rounded-lg bg-[#f7f7f7] flex items-center justify-center shrink-0">
									<Mail size={16} className="text-[#717171]" />
								</div>
								<div className="flex flex-col min-w-0">
									<span className="text-[10px] font-bold text-[#717171] uppercase tracking-wider">Email</span>
									<span className="text-sm text-[#222222] truncate">{agency.email}</span>
								</div>
							</div>
						)}
						{agency.phone && (
							<div className="flex items-center gap-3">
								<div className="h-9 w-9 rounded-lg bg-[#f7f7f7] flex items-center justify-center shrink-0">
									<Phone size={16} className="text-[#717171]" />
								</div>
								<div className="flex flex-col min-w-0">
									<span className="text-[10px] font-bold text-[#717171] uppercase tracking-wider">Phone</span>
									<span className="text-sm text-[#222222]">{agency.phone}</span>
								</div>
							</div>
						)}
						<div className="flex items-center gap-3">
							<div className="h-9 w-9 rounded-lg bg-[#f7f7f7] flex items-center justify-center shrink-0">
								<Building2 size={16} className="text-[#717171]" />
							</div>
							<div className="flex flex-col min-w-0">
								<span className="text-[10px] font-bold text-[#717171] uppercase tracking-wider">Total Inventory</span>
								<span className="text-sm text-[#222222] font-semibold">{hoardings.length} Placements</span>
							</div>
						</div>
					</div>
				</div>

				{/* Inventory List */}
				<div className="lg:col-span-2 space-y-6">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-bold text-[#222222]">Agency Inventory</h3>
						<Link 
							href="/admin/hoardings/new"
							className="text-sm font-bold text-[#082390] hover:underline"
						>
							+ Add for this agency
						</Link>
					</div>

					{hoardings.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{hoardings.map(hoarding => (
								<div key={hoarding.id} className="relative group">
									<HoardingCard 
										id={hoarding.id} 
										title={hoarding.title} 
										imageUrl={hoarding.imageUrl} 
										images={hoarding.images} 
										price={hoarding.price} 
										location={hoarding.location} 
										views={hoarding.views} 
										lat={hoarding.lat} 
										lng={hoarding.lng} 
									/>
									<div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
										<Link 
											href={`/hoardings/${hoarding.id}`}
											target="_blank"
											className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform"
										>
											<ExternalLink size={18} className="text-[#222222]" />
										</Link>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="bg-[#f7f7f7] rounded-2xl p-12 text-center border-2 border-dashed border-[#ebebeb]">
							<Building2 size={40} className="text-[#b0b0b0] mx-auto mb-4" />
							<p className="text-[#717171] font-medium">No hoardings linked to this agency yet</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
