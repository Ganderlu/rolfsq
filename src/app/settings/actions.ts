"use server";

import { adminDb } from "../firebase/firebaseAdmin";
import { auth } from "@/lib/auth/server";

export async function switchMode(mode: "demo" | "live") {
  const session = await auth();
  await adminDb.doc(`users/${session.uid}`).update({ mode });
}
