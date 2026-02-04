"use server";

import { adminDb } from "../firebase/firebaseAdmin";
import { auth } from "@/lib/auth/server";

export async function toggleUserMode(uid: string, mode: "demo" | "live") {
  if (!uid) throw new Error("Unauthorized");

  await adminDb.doc(`users/${uid}`).update({
    mode,
  });

  return { success: true };
}