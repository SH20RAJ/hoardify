import { getEnquiryWithMessages } from "@/actions/messages";
import { stackServerApp } from "@/stack/server";
import { notFound, redirect } from "next/navigation";
import AdminChatClient from "@/components/admin/AdminChatClient";
import { isUserAdmin } from "@/actions/user_sync";

interface Props {
	params: Promise<{ id: string }>;
}

export default async function AdminEnquiryDetailPage({ params }: Props) {
	const { id } = await params;
	const enquiryId = parseInt(id);

	if (isNaN(enquiryId)) notFound();

	// Auth & RBAC Check
	let stackUser = null;
	try {
		stackUser = await stackServerApp.getUser();
	} catch {
		// Auth service down
	}

	if (!stackUser) redirect("/handler/sign-in");
	
	const hasAdmin = await isUserAdmin(stackUser.id);
	if (!hasAdmin) redirect("/");

	// Fetch Enquiry with Messages
	const enquiry = await getEnquiryWithMessages(enquiryId);
	if (!enquiry) notFound();

	return (
		<div className="space-y-6">
			<div className="mb-2">
				<h2 className="text-2xl font-bold text-[#222222]">Enquiry Context</h2>
				<p className="text-sm text-[#717171] mt-1">Review lead details and manage conversation</p>
			</div>

			<AdminChatClient 
				enquiry={enquiry as any} 
				adminName={stackUser.displayName || stackUser.primaryEmail || "Admin"} 
			/>
		</div>
	);
}
