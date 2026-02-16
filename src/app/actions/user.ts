"use server";

import { adminDb } from "../firebase/firebaseAdmin";
import { auth } from "@/lib/auth/server";

export async function toggleUserMode(uid: string, mode: "demo" | "live") {
  if (!uid) throw new Error("Unauthorized");

  if (!adminDb) {
    throw new Error(
      "Firebase Admin not initialized. Check .env.local and restart the server.",
    );
  }

  await adminDb.doc(`users/${uid}`).update({
    mode,
  });

  return { success: true };
}
