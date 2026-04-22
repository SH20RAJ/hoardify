import { clearAdminSession } from "@/actions/admin_auth";
import { redirect } from "next/navigation";

export async function POST() {
	await clearAdminSession();
	return redirect("/admin");
}
