"use client";

import { useState } from "react";
import { updateEnquiryStatus } from "@/actions/admin";
import { useRouter } from "next/navigation";
import { MessageSquare, Loader2 } from "lucide-react";
import Link from "next/link";

const STAGES = ["New", "Contacted", "Closed"] as const;

export function ReplyButton({ id }: { id: number }) {
	return (
		<Link 
			href={`/admin/enquiries/${id}`}
			className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222222] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-black transition-colors"
		>
			<MessageSquare size={12} />
			Reply
		</Link>
	);
}

export function UpdateEnquiryButton({ id, currentStatus }: { id: number; currentStatus: string }) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const nextStatus = STAGES[(STAGES.indexOf(currentStatus as typeof STAGES[number]) + 1) % STAGES.length];

	const handleUpdate = async (status: typeof STAGES[number]) => {
		setLoading(true);
		try {
			await updateEnquiryStatus(id, status);
			setOpen(false);
			router.refresh();
		} catch {
			alert("Failed to update status");
		} finally {
			setLoading(false);
		}
	};

	if (!open) {
		return (
			<button
				onClick={() => setOpen(true)}
				className="text-[10px] font-black uppercase tracking-widest text-[#ff385c] hover:underline"
			>
				Update Stage
			</button>
		);
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs mx-4 p-6" onClick={e => e.stopPropagation()}>
				<h3 className="text-base font-bold text-[#222222] mb-4">Update Pipeline Stage</h3>
				<div className="space-y-2">
					{STAGES.map(stage => (
						<button
							key={stage}
							onClick={() => handleUpdate(stage)}
							disabled={loading || stage === currentStatus}
							className={`w-full h-10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
								stage === currentStatus
									? "bg-[#f7f7f7] text-[#b0b0b0] cursor-default border border-[#ebebeb]"
									: "bg-white border border-[#dddddd] text-[#222222] hover:border-[#222222] hover:bg-[#f7f7f7]"
							}`}
						>
							{loading ? <Loader2 size={12} className="animate-spin" /> : null}
							{stage} {stage === currentStatus ? "(current)" : ""}
						</button>
					))}
				</div>
				<button
					onClick={() => setOpen(false)}
					className="w-full mt-4 h-10 rounded-xl border border-[#dddddd] text-xs font-bold text-[#717171] hover:bg-[#f7f7f7] transition-colors"
				>
					Cancel
				</button>
			</div>
		</div>
	);
}
