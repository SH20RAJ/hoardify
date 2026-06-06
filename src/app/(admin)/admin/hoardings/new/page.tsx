import { getAgencies } from "@/actions/agencies";
import { NewHoardingForm } from "@/components/admin/NewHoardingForm";

export default async function NewHoardingPage() {
	const agencies = await getAgencies();
	
	return (
		<div className="p-8">
			<NewHoardingForm agencies={agencies} />
		</div>
	);
}
