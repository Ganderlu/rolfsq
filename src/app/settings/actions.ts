"use server";

import { adminDb } from "../firebase/firebaseAdmin";
import { auth } from "@/lib/auth/server";

export async function switchMode(mode: "demo" | "live") {
  const session = await auth();
  if (!session?.uid) {
    throw new Error("Unauthorized");
  }

  if (!adminDb) {
    throw new Error(
      "Firebase Admin not initialized. Check .env.local and restart the server.",
    );
  }

  await adminDb.doc(`users/${session.uid}`).update({ mode });
}
