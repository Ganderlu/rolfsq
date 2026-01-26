"use server";

export async function switchMode(mode: "demo" | "live") {
  const session = await auth();
  await adminDb.doc(`users/${session.uid}`).update({ mode });
}
