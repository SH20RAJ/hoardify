"use client";

import { useState } from "react";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import { updateHoarding } from "@/actions/hoardings";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ImageUploader } from "@/components/ui/ImageUploader";

interface HoardingData {
	id: number;
	agencyId: number | null;
	title: string;
	price: number;
	location: string;
	status: string;
	imageUrl: string;
	images?: string[] | null;
	views: string | null;
	description?: string | null;
	dimensions?: string | null;
	category?: string | null;
	lighting?: string | null;
	trafficCount?: number | null;
}

interface Agency {
	id: number;
	name: string;
}

export function EditHoardingForm({ 
	hoarding, 
	agencies, 
	backUrl 
}: { 
	hoarding: HoardingData; 
	agencies?: Agency[];
	backUrl: string;
}) {
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		agencyId: hoarding.agencyId || 0,
		title: hoarding.title || "",
		price: hoarding.price || 0,
		location: hoarding.location || "",
		status: (hoarding.status as "For Rent" | "Booked" | "Maintenance") || "For Rent",
		imageUrl: hoarding.imageUrl || "",
		images: hoarding.images || [],
		description: hoarding.description || "",
		dimensions: hoarding.dimensions || "",
		category: hoarding.category || "",
		lighting: hoarding.lighting || "",
		trafficCount: hoarding.trafficCount || 0,
	});
	const router = useRouter();

	const handleSubmit = async () => {
		if (!form.title || !form.location || !form.price || !form.imageUrl) {
			alert("Please fill in the required fields (Title, Location, Price, at least 1 Image)");
			return;
		}
		setLoading(true);
		try {
			await updateHoarding(hoarding.id, {
				...form,
				agencyId: form.agencyId || null,
			});
			router.push(backUrl);
			router.refresh();
		} catch {
			alert("Failed to update hoarding");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-4xl mx-auto">
			<div className="mb-8 flex items-center gap-4">
				<Link 
					href={backUrl}
					className="p-2 rounded-lg hover:bg-[#f7f7f7] text-[#717171] transition-colors"
				>
					<ArrowLeft size={20} />
				</Link>
				<div>
					<h1 className="text-2xl font-bold text-[#222222]">Edit Placement</h1>
					<p className="text-sm text-[#717171]">Update details for &ldquo;{hoarding.title}&rdquo;</p>
				</div>
			</div>

			<div className="bg-white rounded-2xl shadow-sm border border-[#dddddd] p-8">
				<div className="space-y-8">
					{/* Basic Information */}
					<section>
						<h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider mb-6 pb-2 border-b border-[#f7f7f7]">
							Basic Information
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="md:col-span-2">
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Title *</label>
								<input
									value={form.title}
									onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
									placeholder="e.g. Premium Unipole at Main Road"
								/>
							</div>
							{agencies && (
								<div>
									<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Agency</label>
									<select
										value={form.agencyId}
										onChange={e => setForm(p => ({ ...p, agencyId: Number(e.target.value) }))}
										className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium bg-white transition-colors"
									>
										<option value={0}>Direct / No Agency</option>
										{agencies.map(agency => (
											<option key={agency.id} value={agency.id}>
												{agency.name}
											</option>
										))}
									</select>
								</div>
							)}
							<div className={!agencies ? "md:col-span-2" : ""}>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Location *</label>
								<input
									value={form.location}
									onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
									placeholder="e.g. Lalpur Chowk, Ranchi"
								/>
							</div>
						</div>
					</section>

					{/* Pricing & Status */}
					<section>
						<h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider mb-6 pb-2 border-b border-[#f7f7f7]">
							Pricing & Status
						</h3>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Price (₹/mo) *</label>
								<input
									type="number"
									value={form.price}
									onChange={e => setForm(p => ({ ...p, price: Number(e.target.value) }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Status</label>
								<select
									value={form.status}
									onChange={e => setForm(p => ({ ...p, status: e.target.value as typeof form.status }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium bg-white transition-colors"
								>
									<option value="For Rent">For Rent</option>
									<option value="Booked">Booked</option>
									<option value="Maintenance">Maintenance</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Category</label>
								<input
									value={form.category}
									onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
									placeholder="e.g. Unipole"
								/>
							</div>
						</div>
					</section>

					{/* Technical Specifications */}
					<section>
						<h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider mb-6 pb-2 border-b border-[#f7f7f7]">
							Technical Specifications
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Dimensions</label>
								<input
									value={form.dimensions}
									onChange={e => setForm(p => ({ ...p, dimensions: e.target.value }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
									placeholder="e.g. 40ft x 20ft"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Lighting</label>
								<input
									value={form.lighting}
									onChange={e => setForm(p => ({ ...p, lighting: e.target.value }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
									placeholder="e.g. Front-lit LED"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Monthly Traffic</label>
								<input
									type="number"
									value={form.trafficCount}
									onChange={e => setForm(p => ({ ...p, trafficCount: Number(e.target.value) }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
								/>
							</div>
						</div>
					</section>

					{/* Media & Details */}
					<section>
						<h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider mb-6 pb-2 border-b border-[#f7f7f7]">
							Media & Details
						</h3>
						<div className="space-y-6">
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Images *</label>
								<ImageUploader 
									urls={[form.imageUrl, ...form.images].filter(Boolean)} 
									onChange={(urls) => setForm(p => ({ ...p, imageUrl: urls[0] || "", images: urls.slice(1) }))} 
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Description</label>
								<textarea
									value={form.description}
									onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
									className="w-full min-h-[120px] p-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors resize-none"
									placeholder="Describe the placement's advantages, visibility, and surrounding area..."
								/>
							</div>
						</div>
					</section>
				</div>

				<div className="flex gap-4 mt-12 pt-8 border-t border-[#f7f7f7]">
					<Link
						href={backUrl}
						className="flex-1 h-12 rounded-xl border border-[#dddddd] text-sm font-bold text-[#222222] hover:bg-[#f7f7f7] transition-colors flex items-center justify-center"
					>
						Cancel
					</Link>
					<button
						onClick={handleSubmit}
						disabled={loading}
						className="flex-[2] h-12 rounded-xl bg-[#222222] text-white text-sm font-bold hover:bg-[#000000] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
					>
						{loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
						{loading ? "Saving..." : "Save Changes"}
					</button>
				</div>
			</div>
		</div>
	);
}
