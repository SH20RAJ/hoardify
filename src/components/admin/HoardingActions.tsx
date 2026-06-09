"use client";

import { useState } from "react";
import { Edit2, Trash2, X, Save, Loader2, Building2 } from "lucide-react";
import { updateHoarding, deleteHoarding } from "@/actions/hoardings";
import { moveHoarding } from "@/actions/admin";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HoardingData {
	id: number;
	title: string;
	price: number;
	location: string;
	status: string;
	imageUrl: string;
	views: string | null;
	description?: string | null;
	dimensions?: string | null;
	category?: string | null;
	lighting?: string | null;
	trafficCount?: number | null;
}

export function EditHoardingButton({ 
	hoardingId, 
	basePath = "/admin/hoardings" 
}: { 
	hoardingId: number; 
	basePath?: string; 
}) {
	return (
		<Link
			href={`${basePath}/${hoardingId}/edit`}
			className="p-2 rounded-lg bg-[#f7f7f7] text-[#717171] hover:text-blue-500 transition-colors"
			title="Edit"
		>
			<Edit2 size={16} />
		</Link>
	);
}

export function CreateHoardingButton() {
	return (
		<Link 
			href="/admin/hoardings/new"
			className="px-6 py-3 bg-[#222222] text-white rounded-xl text-sm font-bold hover:bg-black transition-colors flex items-center gap-2 shadow-sm"
		>
			<Edit2 size={18} className="rotate-45" />
			<span>Add New Placement</span>
		</Link>
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
				className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:text-blue-700 transition-colors"
				title="Delete"
			>
				<Trash2 size={16} />
			</button>
		);
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setConfirming(false)}>
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 text-center" onClick={e => e.stopPropagation()}>
				<div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
					<Trash2 size={20} className="text-blue-600" />
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
						className="flex-1 h-11 rounded-xl bg-blue-500 text-white text-sm font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
					>
						{loading ? <Loader2 size={16} className="animate-spin" /> : null}
						{loading ? "Deleting..." : "Delete"}
					</button>
				</div>
			</div>
		</div>
	);
}

export function MoveHoardingButton({ 
	hoardingId, 
	currentAgencyId, 
	agencies 
}: { 
	hoardingId: number; 
	currentAgencyId: number | null; 
	agencies: any[] 
}) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleMove = async (agencyId: number) => {
		setLoading(true);
		try {
			await moveHoarding(hoardingId, agencyId);
			setOpen(false);
			router.refresh();
		} catch {
			alert("Failed to move hoarding");
		} finally {
			setLoading(false);
		}
	};

	const currentAgency = agencies.find(a => a.id === currentAgencyId);

	if (!open) {
		return (
			<button
				onClick={() => setOpen(true)}
				className="flex items-center gap-2 group"
			>
				<div className="flex items-center gap-2 text-xs text-[#717171] hover:text-[#222222] transition-colors">
					<Building2 size={14} className="text-[#b0b0b0]" />
					<span className="font-medium truncate max-w-[120px]">
						{currentAgency ? currentAgency.name : "Direct/None"}
					</span>
				</div>
			</button>
		);
	}

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 overflow-y-auto max-h-[80vh]" onClick={e => e.stopPropagation()}>
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-lg font-bold text-[#222222]">Move to Agency</h3>
					<button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-[#f7f7f7]">
						<X size={18} />
					</button>
				</div>

				<div className="space-y-3">
					{agencies.map(agency => (
						<button
							key={agency.id}
							onClick={() => handleMove(agency.id)}
							disabled={loading || currentAgencyId === agency.id}
							className={`w-full p-4 rounded-xl border transition-all text-left flex items-center justify-between ${
								currentAgencyId === agency.id
									? "bg-blue-50 border-blue-200"
									: "border-[#dddddd] hover:border-[#222222] bg-white"
							}`}
						>
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-lg bg-[#f7f7f7] flex items-center justify-center shrink-0">
									{agency.logoUrl ? (
										<img src={agency.logoUrl} alt="" className="h-full w-full object-contain p-1" />
									) : (
										<Building2 size={16} className="text-[#b0b0b0]" />
									)}
								</div>
								<div className="min-w-0">
									<p className="text-sm font-bold text-[#222222] truncate">{agency.name}</p>
									<p className="text-xs text-[#717171] truncate">{agency.email}</p>
								</div>
							</div>
							{currentAgencyId === agency.id && (
								<span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Current</span>
							)}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
