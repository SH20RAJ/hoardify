"use client";

import { useState } from "react";
import { Edit2, Trash2, X, Save, Loader2 } from "lucide-react";
import { updateHoarding, deleteHoarding } from "@/actions/hoardings";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

interface HoardingData {
	id: number;
	title: string;
	price: number;
	location: string;
	status: string;
	imageUrl: string;
	views: string | null;
}

export function EditHoardingButton({ hoarding }: { hoarding: HoardingData }) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		title: hoarding.title,
		price: hoarding.price,
		location: hoarding.location,
		status: hoarding.status as "For Rent" | "Booked" | "Maintenance",
	});
	const router = useRouter();

	const handleSubmit = async () => {
		setLoading(true);
		try {
			await updateHoarding(hoarding.id, form);
			setOpen(false);
			router.refresh();
		} catch {
			alert("Failed to update hoarding");
		} finally {
			setLoading(false);
		}
	};

	if (!open) {
		return (
			<button
				onClick={() => setOpen(true)}
				className="p-2 rounded-lg bg-[#f7f7f7] text-[#717171] hover:text-blue-500 transition-colors"
				title="Edit"
			>
				<Edit2 size={16} />
			</button>
		);
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8" onClick={e => e.stopPropagation()}>
				<div className="flex items-center justify-between mb-8">
					<h3 className="text-xl font-bold text-[#222222]">Edit Placement</h3>
					<button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-[#f7f7f7]">
						<X size={18} />
					</button>
				</div>

				<div className="space-y-5">
					<div>
						<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Title</label>
						<input
							value={form.title}
							onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
							className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Price (₹/mo)</label>
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
					</div>
					<div>
						<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Location</label>
						<input
							value={form.location}
							onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
							className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
						/>
					</div>
				</div>

				<div className="flex gap-3 mt-8">
					<button
						onClick={() => setOpen(false)}
						className="flex-1 h-12 rounded-xl border border-[#dddddd] text-sm font-bold text-[#222222] hover:bg-[#f7f7f7] transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						disabled={loading}
						className="flex-1 h-12 rounded-xl bg-[#222222] text-white text-sm font-bold hover:bg-[#000000] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
					>
						{loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
						{loading ? "Saving..." : "Save Changes"}
					</button>
				</div>
			</div>
		</div>
	);
}

export function DeleteHoardingButton({ id, title }: { id: number; title: string }) {
	const [confirming, setConfirming] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		setLoading(true);
		try {
			await deleteHoarding(id);
			router.refresh();
		} catch {
			alert("Failed to delete hoarding");
		} finally {
			setLoading(false);
			setConfirming(false);
		}
	};

	if (!confirming) {
		return (
			<button
				onClick={() => setConfirming(true)}
				className="p-2 rounded-lg bg-red-50 text-red-400 hover:text-red-600 transition-colors"
				title="Delete"
			>
				<Trash2 size={16} />
			</button>
		);
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setConfirming(false)}>
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 text-center" onClick={e => e.stopPropagation()}>
				<div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
					<Trash2 size={20} className="text-red-500" />
				</div>
				<h3 className="text-lg font-bold text-[#222222] mb-2">Delete Placement</h3>
				<p className="text-sm text-[#717171] mb-6">
					Are you sure you want to delete <strong>&ldquo;{title}&rdquo;</strong>? This action cannot be undone.
				</p>
				<div className="flex gap-3">
					<button
						onClick={() => setConfirming(false)}
						className="flex-1 h-11 rounded-xl border border-[#dddddd] text-sm font-bold text-[#222222] hover:bg-[#f7f7f7] transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={handleDelete}
						disabled={loading}
						className="flex-1 h-11 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
					>
						{loading ? <Loader2 size={16} className="animate-spin" /> : null}
						{loading ? "Deleting..." : "Delete"}
					</button>
				</div>
			</div>
		</div>
	);
}
