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

  if (!adminDb) {
    throw new Error(
      "Firebase Admin not initialized. Check .env.local and restart the server.",
    );
  }

  const userRef = adminDb.doc(`users/${uid}`);
  const userSnap = await userRef.get();
  let user = userSnap.data();

  // 🛠️ AUTO-FIX: Create user profile if missing (for legacy or broken auth)
  if (!user) {
    console.warn(`User ${uid} profile missing. Creating default demo profile.`);
    const defaultProfile = {
      uid,
      username: "User",
      email: "user@example.com", // Placeholder
      mode: "demo",
      balanceDemo: 10000,
      balanceLive: 0,
      usdtBalance: 0,
      createdAt: new Date(),
    };
    await userRef.set(defaultProfile);
    user = defaultProfile;
  }

  const mode = user?.mode || "demo";
  const balanceField = mode === "demo" ? "balanceDemo" : "usdtBalance";
  
  // 🛠️ AUTO-FIX: Ensure balance exists for demo
  let currentBalance = user?.[balanceField];
  
  if (currentBalance === undefined || currentBalance === null) {
      if (mode === "demo") {
          currentBalance = 10000;
          await userRef.update({ balanceDemo: 10000 });
      } else {
          currentBalance = 0;
      }
  }

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
