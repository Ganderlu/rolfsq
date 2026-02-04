"use server";

import { adminDb } from "../../firebase/firebaseAdmin";
import { auth } from "@/lib/auth/server";

export async function placeTrade({
  uid,
  asset,
  direction,
  amount,
  duration,
  payout,
  price,
}: any) {
  if (!uid) throw new Error("Unauthorized");

  const userRef = adminDb.doc(`users/${uid}`);
  const userSnap = await userRef.get();
  const user = userSnap.data();

  if (!user) throw new Error("User not found");

  const mode = user.mode || "demo";
  const balanceField = mode === "demo" ? "balanceDemo" : "usdtBalance";
  const currentBalance = user[balanceField] || 0;

  if (currentBalance < amount) {
    throw new Error("Insufficient balance");
  }

  // 🔻 Deduct balance immediately
  await userRef.update({
    [balanceField]: currentBalance - amount,
  });

  const expiresAt = new Date(Date.now() + duration * 1000);

  const tradeRef = await adminDb.collection("trades").add({
    uid,
    asset,
    direction,
    amount,
    payout,
    mode,
    openPrice: price,
    closePrice: null,
    openedAt: new Date(),
    expiresAt,
    status: "open",
  });

  return { tradeId: tradeRef.id };
}
