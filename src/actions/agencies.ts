"use server";
import { db } from "@/db";
import { agencies } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAgencies() {
  return await db.select().from(agencies).orderBy(desc(agencies.createdAt));
}

export async function createAgency(data: any) {
  const res = await db.insert(agencies).values(data).returning();
  revalidatePath("/admin/agencies");
  return res[0];
}

export async function updateAgency(id: number, data: any) {
  await db.update(agencies).set(data).where(eq(agencies.id, id));
  revalidatePath("/admin/agencies");
}

export async function deleteAgency(id: number) {
  await db.delete(agencies).where(eq(agencies.id, id));
  revalidatePath("/admin/agencies");
}
