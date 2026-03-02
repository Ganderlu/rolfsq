"use server";

import { adminDb } from "../firebase/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export async function enrollInMatrix(userId: string, plan: any) {
  if (!adminDb) {
    throw new Error("Firebase Admin not initialized. Check .env.local and restart the server.");
  }

  if (!userId || !plan) {
    throw new Error("Invalid matrix enrollment parameters");
  }

  const userRef = adminDb.doc(`users/${userId}`);
  const userSnap = await userRef.get();
  
  if (!userSnap.exists) {
    throw new Error("User not found");
  }

  const userData = userSnap.data();
  const currentBalance = userData?.usdtBalance || 0;
  const price = plan.price;

  if (currentBalance < price) {
    throw new Error("Insufficient balance for this matrix plan");
  }

  // 1️⃣ Deduct balance from user
  await userRef.update({
    usdtBalance: FieldValue.increment(-price)
  });

  // 2️⃣ Create matrix enrollment record
  const enrollmentRef = await adminDb.collection("matrixEnrollments").add({
    userId,
    planTitle: plan.title,
    amount: price,
    reward: plan.reward,
    commission: plan.commission,
    cashback: plan.cashback,
    status: "active",
    createdAt: FieldValue.serverTimestamp(),
  });

  // 3️⃣ Pay referral reward (Straightforward Referral Reward)
  if (userData?.referredBy) {
    // Parse reward (e.g., "$2" -> 2)
    const rewardAmount = parseFloat(plan.reward.replace("$", "")) || 0;

    if (rewardAmount > 0) {
      // Update Referrer Balance
      await adminDb.doc(`users/${userData.referredBy}`).update({
        usdtBalance: FieldValue.increment(rewardAmount)
      });

      // Log Referral Reward
      await adminDb.collection("referralRewards").add({
        userId: userData.referredBy,
        referredUserId: userId,
        referredUserEmail: userData.email || "",
        amount: rewardAmount,
        type: "matrix_commission",
        planTitle: plan.title,
        timestamp: new Date()
      });
    }
  }

  return { success: true, enrollmentId: enrollmentRef.id };
}
