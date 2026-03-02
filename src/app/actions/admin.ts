"use server";

import { adminDb } from "../firebase/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export async function updateUserBalance(uid: string, amount: number) {
  if (!adminDb) throw new Error("Admin DB not initialized");

  await adminDb.doc(`users/${uid}`).update({
    usdtBalance: FieldValue.increment(amount),
  });

  return { success: true };
}

export async function updateUserStatus(
  uid: string,
  status: "active" | "inactive",
) {
  if (!adminDb) throw new Error("Admin DB not initialized");

  await adminDb.doc(`users/${uid}`).update({
    status,
  });

  return { success: true };
}

export async function deleteUser(uid: string) {
  if (!adminDb) throw new Error("Admin DB not initialized");

  await adminDb.doc(`users/${uid}`).delete();

  return { success: true };
}

export async function approveDeposit(deposit: any) {
  if (!adminDb) throw new Error("Admin DB not initialized");

  const { id: depositId, userId, amount } = deposit;

  // 1️⃣ Update deposit status
  await adminDb.doc(`deposits/${depositId}`).update({
    status: "approved",
    approvedAt: new Date(),
  });

  // 2️⃣ Update depositor balance
  const userRef = adminDb.doc(`users/${userId}`);
  const userSnap = await userRef.get();

  await userRef.update({
    usdtBalance: FieldValue.increment(amount),
  });

  // 3️⃣ Check for referral commission
  if (userSnap.exists) {
    const userData = userSnap.data();
    if (userData?.referredBy) {
      const commissionRate = 0.1; // 10% commission on deposits
      const commissionAmount = amount * commissionRate;

      // Update Referrer Balance
      await adminDb.doc(`users/${userData.referredBy}`).update({
        usdtBalance: FieldValue.increment(commissionAmount),
      });

      // Log Referral Reward
      await adminDb.collection("referralRewards").add({
        userId: userData.referredBy,
        referredUserId: userId,
        referredUserEmail: userData.email || "",
        amount: commissionAmount,
        type: "deposit_commission",
        depositAmount: amount,
        timestamp: new Date(),
      });
    }
  }

  // 4️⃣ Send notification
  await adminDb.collection("notifications").add({
    userId,
    type: "deposit-approved",
    title: "Deposit Approved",
    message: `Your deposit of $${amount} has been approved and added to your balance.`,
    read: false,
    createdAt: new Date(),
  });

  return { success: true };
}

export async function rejectDeposit(depositId: string) {
  if (!adminDb) throw new Error("Admin DB not initialized");

  await adminDb.doc(`deposits/${depositId}`).update({
    status: "rejected",
    rejectedAt: new Date(),
  });

  return { success: true };
}

export async function approvePinRecharge(rechargeId: string) {
  if (!adminDb) throw new Error("Admin DB not initialized");

  const rechargeRef = adminDb.doc(`pinRecharges/${rechargeId}`);
  const rechargeSnap = await rechargeRef.get();

  if (!rechargeSnap.exists) throw new Error("Recharge record not found");

  const data = rechargeSnap.data();
  if (data?.status !== "pending") throw new Error("Recharge already processed");

  const { userId, netCredit } = data;

  // 1️⃣ Update user balance
  await adminDb.doc(`users/${userId}`).update({
    usdtBalance: FieldValue.increment(netCredit),
  });

  // 2️⃣ Update recharge status
  await rechargeRef.update({
    status: "approved",
    approvedAt: new Date(),
  });

  // 3️⃣ Send notification
  await adminDb.collection("notifications").add({
    userId,
    type: "recharge-approved",
    title: "Recharge Approved",
    message: `Your InstaPIN recharge of $${netCredit.toFixed(2)} has been approved.`,
    read: false,
    createdAt: new Date(),
  });

  return { success: true };
}

export async function rejectPinRecharge(rechargeId: string) {
  if (!adminDb) throw new Error("Admin DB not initialized");

  await adminDb.doc(`pinRecharges/${rechargeId}`).update({
    status: "rejected",
    rejectedAt: new Date(),
  });

  return { success: true };
}
