import { getHoardingById } from "@/actions/hoardings";
import { getAgencies } from "@/actions/agencies";
import { EditHoardingForm } from "@/components/admin/EditHoardingForm";
import { notFound } from "next/navigation";

export default async function AdminEditHoardingPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const hoardingId = parseInt(id, 10);
	
	if (isNaN(hoardingId)) notFound();

	const [hoarding, agencies] = await Promise.all([
		getHoardingById(hoardingId),
		getAgencies()
	]);

	if (!hoarding) notFound();

	return (
		<div className="p-8">
			<EditHoardingForm hoarding={hoarding} agencies={agencies} backUrl="/admin/hoardings" />
		</div>
	);
}
