"use server";

import { adminDb } from "../firebase/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export async function createInvestment(userId: string, plan: any, amount: number) {
  if (!adminDb) {
    throw new Error("Firebase Admin not initialized. Check .env.local and restart the server.");
  }

  if (!userId || !plan || !amount || amount <= 0) {
    throw new Error("Invalid investment parameters");
  }

  const userRef = adminDb.doc(`users/${userId}`);
  const userSnap = await userRef.get();
  
  if (!userSnap.exists) {
    throw new Error("User not found");
  }

  const userData = userSnap.data();
  const currentBalance = userData?.usdtBalance || 0;

  if (currentBalance < amount) {
    throw new Error("Insufficient balance for this investment");
  }

  // 1️⃣ Deduct balance from user
  await userRef.update({
    usdtBalance: FieldValue.increment(-amount)
  });

  // 2️⃣ Create investment record
  const startAt = new Date();
  const durationDays = parseInt(plan.duration) || 0;
  const matureAt = new Date(startAt.getTime() + durationDays * 24 * 60 * 60 * 1000);

  // Parse interest (e.g., "2%" -> 0.02)
  const interestRate = parseFloat(plan.interest) / 100 || 0;
  const totalProfit = amount * interestRate * durationDays;

  const investmentRef = await adminDb.collection("investments").add({
    userId,
    planName: plan.title,
    duration: plan.duration,
    interest: plan.interest,
    amount: amount,
    profit: totalProfit,
    status: "running",
    startAt,
    matureAt,
    createdAt: FieldValue.serverTimestamp(),
  });

  // 3️⃣ Pay referral commission (5% on investment amount)
  if (userData?.referredBy) {
    const commissionRate = 0.05; 
    const commissionAmount = amount * commissionRate;

    if (commissionAmount > 0) {
      // Update Referrer Balance
      await adminDb.doc(`users/${userData.referredBy}`).update({
        usdtBalance: FieldValue.increment(commissionAmount)
      });

      // Log Referral Reward
      await adminDb.collection("referralRewards").add({
        userId: userData.referredBy,
        referredUserId: userId,
        referredUserEmail: userData.email || "",
        amount: commissionAmount,
        type: "investment_commission",
        investmentAmount: amount,
        planName: plan.title,
        timestamp: new Date()
      });
    }
  }

  return { success: true, investmentId: investmentRef.id };
}
