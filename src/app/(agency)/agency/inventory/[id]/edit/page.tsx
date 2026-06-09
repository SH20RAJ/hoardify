import { getHoardingById } from "@/actions/hoardings";
import { EditHoardingForm } from "@/components/admin/EditHoardingForm";
import { notFound, redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function AgencyEditHoardingPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const hoardingId = parseInt(id, 10);
	
	if (isNaN(hoardingId)) notFound();

	const stackUser = await stackServerApp.getUser();
	if (!stackUser) return redirect("/handler/sign-in");

	const dbUser = await db.query.users.findFirst({
		where: eq(users.id, stackUser.id)
	});

	if (!dbUser || !dbUser.agencyId) return notFound();

	const hoarding = await getHoardingById(hoardingId);

	if (!hoarding) notFound();
	
	// Ensure the agency can only edit their own hoardings
	if (hoarding.agencyId !== dbUser.agencyId) {
		return notFound();
	}

	return (
		<div className="space-y-8">
			<EditHoardingForm hoarding={hoarding} backUrl="/agency/inventory" />
		</div>
	);
}
