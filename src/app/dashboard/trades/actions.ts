"use server";

import { adminDb } from "../../lib/firebaseAdmin";
import { auth } from "@/lib/auth/server";

export async function placeTrade({
  asset,
  direction,
  amount,
  duration,
  payout,
  price,
}: any) {
  const session = await auth();
  if (!session?.uid) throw new Error("Unauthorized");

  const userRef = adminDb.doc(`users/${session.uid}`);
  const userSnap = await userRef.get();
  const user = userSnap.data();

  if (!user) throw new Error("User not found");

  const balanceField = user.mode === "demo" ? "balanceDemo" : "balanceLive";

  if (user[balanceField] < amount) {
    throw new Error("Insufficient balance");
  }

  // 🔻 Deduct balance immediately
  await userRef.update({
    [balanceField]: user[balanceField] - amount,
  });

  const expiresAt = new Date(Date.now() + duration * 1000);

  const tradeRef = await adminDb.collection("trades").add({
    uid: session.uid,
    asset,
    direction,
    amount,
    payout,
    mode: user.mode,
    openPrice: price,
    closePrice: null,
    openedAt: new Date(),
    expiresAt,
    status: "open",
  });

  return { tradeId: tradeRef.id };
}
