"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth/session";

/**
 * Server actions are public HTTP endpoints — Next generates a callable route
 * for each one. The session is therefore re-checked here rather than relying on
 * the fact that the form only renders inside an authenticated layout.
 */
async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorised");
  return user;
}

export async function toggleRead(id: string, read: boolean) {
  await requireAdmin();
  await prisma.contactMessage.update({ where: { id }, data: { read } });
  revalidatePath("/admin/messages");
}

export async function toggleReplied(id: string, replied: boolean) {
  await requireAdmin();
  await prisma.contactMessage.update({
    where: { id },
    // Marking a message replied implies it was read.
    data: { replied, ...(replied ? { read: true } : {}) },
  });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
